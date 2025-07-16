"use server"

import {
  createCustomer,
  getCustomerByUserId,
  updateCustomerByStripeCustomerId,
  updateCustomerByUserId
} from "@/actions/customers"
import { SelectCustomer } from "@/db/schema/customers"
import { db } from "@/db"
import { courses, bundles, purchases, userCourses } from "@/db/schema"
import { eq, and, inArray } from "drizzle-orm"
import { stripe } from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"
import { sendPurchaseConfirmationEmail } from "@/lib/email"
import { clerkClient } from "@clerk/nextjs/server"

type MembershipStatus = SelectCustomer["membership"]

const getMembershipStatus = (
  status: Stripe.Subscription.Status,
  membership: MembershipStatus
): MembershipStatus => {
  switch (status) {
    case "active":
    case "trialing":
      return membership
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "past_due":
    case "paused":
    case "unpaid":
      return "free"
    default:
      return "free"
  }
}

const getSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"]
  })
}

export const updateStripeCustomer = async (
  userId: string,
  subscriptionId: string,
  customerId: string
) => {
  try {
    if (!userId || !subscriptionId || !customerId) {
      throw new Error("Missing required parameters for updateStripeCustomer")
    }

    const subscription = await getSubscription(subscriptionId)

    // Check if customer exists
    const existingCustomer = await getCustomerByUserId(userId)
    
    let result
    if (!existingCustomer) {
      // Create customer first
      const createResult = await createCustomer(userId)
      if (!createResult.isSuccess) {
        throw new Error("Failed to create customer profile")
      }
      
      // Then update with Stripe data
      result = await updateCustomerByUserId(userId, {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id
      })
    } else {
      // Customer exists, just update
      result = await updateCustomerByUserId(userId, {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id
      })
    }

    if (!result.isSuccess) {
      throw new Error("Failed to update customer profile")
    }

    return result.data
  } catch (error) {
    console.error("Error in updateStripeCustomer:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to update Stripe customer")
  }
}

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  productId: string
): Promise<MembershipStatus> => {
  try {
    if (!subscriptionId || !customerId || !productId) {
      throw new Error(
        "Missing required parameters for manageSubscriptionStatusChange"
      )
    }

    const subscription = await getSubscription(subscriptionId)
    const product = await stripe.products.retrieve(productId)

    const membership = product.metadata?.membership

    if (!membership || !["free", "pro"].includes(membership)) {
      throw new Error(
        `Invalid or missing membership type in product metadata: ${membership}`
      )
    }

    const validatedMembership = membership as MembershipStatus

    const membershipStatus = getMembershipStatus(
      subscription.status,
      validatedMembership
    )

    const updateResult = await updateCustomerByStripeCustomerId(customerId, {
      stripeSubscriptionId: subscription.id,
      membership: membershipStatus
    })

    if (!updateResult.isSuccess) {
      throw new Error("Failed to update subscription status")
    }

    return membershipStatus
  } catch (error) {
    console.error("Error in manageSubscriptionStatusChange:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to update subscription status")
  }
}

export const createCheckoutUrl = async (
  paymentLinkUrl: string
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { url: null, error: "User must be authenticated" }
    }

    if (!paymentLinkUrl) {
      return { url: null, error: "Payment link URL is required" }
    }

    // Add client_reference_id to the Stripe payment link
    const url = new URL(paymentLinkUrl)
    url.searchParams.set("client_reference_id", userId)

    return { url: url.toString(), error: null }
  } catch (error) {
    console.error("Error creating checkout URL:", error)
    return {
      url: null,
      error:
        error instanceof Error ? error.message : "Failed to create checkout URL"
    }
  }
}

// Create checkout session for a single course purchase
export const createCourseCheckout = async (
  courseId: string
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { url: null, error: "User must be authenticated" }
    }

    // Ensure customer exists
    let customer = await getCustomerByUserId(userId)
    if (!customer) {
      const result = await createCustomer(userId)
      if (!result.isSuccess || !result.data) {
        return { url: null, error: "Failed to create customer profile" }
      }
      customer = result.data
    }

    // Get course details
    const [course] = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1)

    if (!course) {
      return { url: null, error: "Course not found" }
    }

    // Check if user already has access
    const existingAccess = await db
      .select()
      .from(userCourses)
      .where(
        and(
          eq(userCourses.userId, userId),
          eq(userCourses.courseId, courseId)
        )
      )
      .limit(1)

    if (existingAccess.length > 0) {
      return { url: null, error: "You already have access to this course" }
    }

    // Create Stripe checkout session
    let lineItems
    
    if (course.stripePriceId) {
      // Use existing Stripe price
      lineItems = [
        {
          price: course.stripePriceId,
          quantity: 1
        }
      ]
    } else {
      // Fallback to creating price data on the fly
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
              images: course.thumbnailUrl ? [course.thumbnailUrl] : undefined,
              metadata: {
                type: "course",
                courseId: course.id
              }
            },
            unit_amount: Math.round(parseFloat(course.price) * 100) // Convert to cents
          },
          quantity: 1
        }
      ]
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/purchase/course-success?courseId=${courseId}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/purchase/cancel?type=course&id=${courseId}`,
      customer: customer.stripeCustomerId || undefined,
      client_reference_id: userId,
      metadata: {
        userId,
        courseId,
        type: "course"
      }
    })

    return { url: session.url, error: null }
  } catch (error) {
    console.error("Error creating course checkout:", error)
    return {
      url: null,
      error: error instanceof Error ? error.message : "Failed to create checkout"
    }
  }
}

// Create checkout session for a bundle purchase
export const createBundleCheckout = async (
  bundleId: string
): Promise<{ url: string | null; error: string | null }> => {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return { url: null, error: "User must be authenticated" }
    }

    // Ensure customer exists
    let customer = await getCustomerByUserId(userId)
    if (!customer) {
      const result = await createCustomer(userId)
      if (!result.isSuccess || !result.data) {
        return { url: null, error: "Failed to create customer profile" }
      }
      customer = result.data
    }

    // Get bundle details
    const [bundle] = await db
      .select()
      .from(bundles)
      .where(eq(bundles.id, bundleId))
      .limit(1)

    if (!bundle) {
      return { url: null, error: "Bundle not found" }
    }

    if (!bundle.active) {
      return { url: null, error: "This bundle is no longer available" }
    }

    // Get courses in bundle
    const bundleCourses = bundle.courseIds.length > 0
      ? await db
          .select()
          .from(courses)
          .where(inArray(courses.id, bundle.courseIds))
      : []

    // Create Stripe checkout session
    let lineItems
    
    if (bundle.stripePriceId) {
      // Use existing Stripe price
      lineItems = [
        {
          price: bundle.stripePriceId,
          quantity: 1
        }
      ]
    } else {
      // Fallback to calculating price on the fly
      const totalValue = bundleCourses.reduce(
        (sum, course) => sum + parseFloat(course.price),
        0
      )
      const discountAmount = (totalValue * bundle.discountPercentage) / 100
      const finalPrice = totalValue - discountAmount
      
      lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bundle.name,
              description: `${bundle.description} (${bundleCourses.length} courses, ${bundle.discountPercentage}% off)`,
              metadata: {
                type: "bundle",
                bundleId: bundle.id,
                courseIds: bundle.courseIds.join(",")
              }
            },
            unit_amount: Math.round(finalPrice * 100) // Convert to cents
          },
          quantity: 1
        }
      ]
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/purchase/bundle-success?bundleId=${bundleId}&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/purchase/cancel?type=bundle&id=${bundleId}`,
      customer: customer.stripeCustomerId || undefined,
      client_reference_id: userId,
      metadata: {
        userId,
        bundleId,
        type: "bundle",
        courseIds: bundle.courseIds.join(",")
      }
    })

    return { url: session.url, error: null }
  } catch (error) {
    console.error("Error creating bundle checkout:", error)
    return {
      url: null,
      error: error instanceof Error ? error.message : "Failed to create checkout"
    }
  }
}

// Handle successful payment and grant course access
export const handleCoursePaymentSuccess = async (sessionId: string) => {
  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"]
    })

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed")
    }

    const { userId, type, courseId, bundleId, courseIds } = session.metadata || {}

    if (!userId) {
      throw new Error("User ID not found in session metadata")
    }

    // Record the purchase
    const purchaseData = {
      userId,
      stripePaymentIntentId: session.payment_intent as string,
      pricePaid: (session.amount_total! / 100).toFixed(2) // Convert from cents
    }

    if (type === "course" && courseId) {
      // Single course purchase
      await db.insert(purchases).values({
        ...purchaseData,
        purchaseType: "course",
        itemId: courseId
      })

      // Grant access to the course
      await db.insert(userCourses).values({
        userId,
        courseId,
        grantedVia: "purchase"
      }).onConflictDoNothing()

      // Send confirmation email
      try {
        const [course] = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1)
        const user = await clerkClient.users.getUser(userId)
        
        if (course && user.emailAddresses.length > 0) {
          await sendPurchaseConfirmationEmail({
            to: user.emailAddresses[0].emailAddress,
            userName: user.firstName || user.username || "Student",
            purchaseType: "course",
            itemName: course.title,
            price: purchaseData.pricePaid,
            purchaseDate: new Date().toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            }),
            accessUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard/courses/${courseId}`
          })
        }
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
        // Don't throw - email failure shouldn't break the purchase flow
      }

    } else if (type === "bundle" && bundleId) {
      // Bundle purchase
      await db.insert(purchases).values({
        ...purchaseData,
        purchaseType: "bundle",
        itemId: bundleId
      })

      // Grant access to all courses in the bundle
      const courseIdArray = courseIds?.split(",").filter(Boolean) || []
      
      if (courseIdArray.length > 0) {
        const userCourseEntries = courseIdArray.map(courseId => ({
          userId,
          courseId,
          grantedVia: `bundle:${bundleId}`
        }))
        
        await db.insert(userCourses).values(userCourseEntries).onConflictDoNothing()
      }

      // Send confirmation email
      try {
        const [bundle] = await db.select().from(bundles).where(eq(bundles.id, bundleId)).limit(1)
        const user = await clerkClient.users.getUser(userId)
        
        if (bundle && user.emailAddresses.length > 0) {
          await sendPurchaseConfirmationEmail({
            to: user.emailAddresses[0].emailAddress,
            userName: user.firstName || user.username || "Student",
            purchaseType: "bundle",
            itemName: bundle.name,
            price: purchaseData.pricePaid,
            purchaseDate: new Date().toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            }),
            accessUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard/courses`
          })
        }
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError)
        // Don't throw - email failure shouldn't break the purchase flow
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error handling payment success:", error)
    throw error instanceof Error
      ? error
      : new Error("Failed to process payment success")
  }
}
