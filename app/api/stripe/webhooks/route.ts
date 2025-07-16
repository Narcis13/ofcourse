import {
  manageSubscriptionStatusChange,
  updateStripeCustomer,
  handleCoursePaymentSuccess
} from "@/actions/stripe"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import Stripe from "stripe"

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "payment_intent.succeeded",
  "payment_intent.payment_failed"
])

export async function POST(req: Request) {
  const body = await req.text()
  const sig = (await headers()).get("Stripe-Signature") as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) {
      throw new Error("Webhook secret or signature missing")
    }

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`
    )
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error"
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    )
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          await handleSubscriptionChange(event)
          break

        case "checkout.session.completed":
          await handleCheckoutSession(event)
          break
          
        case "payment_intent.succeeded":
          await handlePaymentIntentSucceeded(event)
          break
          
        case "payment_intent.payment_failed":
          await handlePaymentIntentFailed(event)
          break

        default:
          throw new Error("Unhandled relevant event!")
      }
    } catch (error) {
      console.error("Webhook handler failed:", error)
      return new Response(
        JSON.stringify({
          error: "Webhook handler failed. View your function logs."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      )
    }
  }

  return new Response(JSON.stringify({ received: true }))
}

async function handleSubscriptionChange(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const productId = subscription.items.data[0].price.product as string
  await manageSubscriptionStatusChange(
    subscription.id,
    subscription.customer as string,
    productId
  )
}

async function handleCheckoutSession(event: Stripe.Event) {
  const checkoutSession = event.data.object as Stripe.Checkout.Session
  
  if (checkoutSession.mode === "subscription") {
    // Handle subscription checkout
    const subscriptionId = checkoutSession.subscription as string
    const clientReferenceId = checkoutSession.client_reference_id
    const customerId = checkoutSession.customer as string

    if (!clientReferenceId) {
      throw new Error(
        "client_reference_id is required for subscription checkout"
      )
    }

    await updateStripeCustomer(clientReferenceId, subscriptionId, customerId)

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"]
    })

    const productId = subscription.items.data[0].price.product as string
    await manageSubscriptionStatusChange(
      subscription.id,
      subscription.customer as string,
      productId
    )
  } else if (checkoutSession.mode === "payment") {
    // Handle one-time payment for courses/bundles
    const sessionId = checkoutSession.id
    const metadata = checkoutSession.metadata
    
    console.log("Processing payment checkout session:", {
      sessionId,
      metadata,
      paymentStatus: checkoutSession.payment_status,
      amountTotal: checkoutSession.amount_total
    })

    // Check if this is a course or bundle purchase
    if (metadata && (metadata.type === "course" || metadata.type === "bundle")) {
      try {
        await handleCoursePaymentSuccess(sessionId)
        console.log(`Successfully processed ${metadata.type} purchase for user ${metadata.userId}`)
      } catch (error) {
        console.error(`Failed to process ${metadata.type} purchase:`, error)
        throw error
      }
    } else {
      console.warn("Payment checkout session without proper metadata:", metadata)
    }
  }
}

async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  
  console.log("Payment intent succeeded:", {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    metadata: paymentIntent.metadata
  })
  
  // Payment intents are already handled via checkout.session.completed
  // This is just for logging and monitoring purposes
}

async function handlePaymentIntentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent
  
  console.error("Payment intent failed:", {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    metadata: paymentIntent.metadata,
    lastPaymentError: paymentIntent.last_payment_error
  })
  
  // You could implement additional error handling here
  // such as sending failure notifications to the user
}
