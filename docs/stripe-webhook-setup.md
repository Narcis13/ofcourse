# Stripe Webhook Setup

This document explains how to set up and test the Stripe webhook for handling course and bundle purchases.

## Webhook Endpoint

The webhook endpoint is located at: `/api/stripe/webhooks`

## Events Handled

The webhook handler processes the following Stripe events:

1. **checkout.session.completed** - Main event for processing successful payments
   - Handles both subscription checkouts and one-time payments
   - Processes course and bundle purchases
   - Grants user access to purchased content

2. **customer.subscription.updated** - Updates user membership status
3. **customer.subscription.deleted** - Handles subscription cancellations
4. **payment_intent.succeeded** - Logs successful payments (monitoring)
5. **payment_intent.payment_failed** - Logs failed payments (monitoring)

## Local Development Setup

### 1. Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# or download from
# https://stripe.com/docs/stripe-cli
```

### 2. Login to Stripe

```bash
stripe login
```

### 3. Forward Events to Local Webhook

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

This will output a webhook signing secret like:
```
Ready! Your webhook signing secret is whsec_xxxx
```

### 4. Set Environment Variable

Add the webhook signing secret to your `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxx
```

### 5. Test the Webhook

Trigger test events:
```bash
# Test a successful course purchase
stripe trigger checkout.session.completed \
  --add checkout_session:mode=payment \
  --add checkout_session:metadata.type=course \
  --add checkout_session:metadata.courseId=your-course-id \
  --add checkout_session:metadata.userId=your-user-id

# Test a successful bundle purchase
stripe trigger checkout.session.completed \
  --add checkout_session:mode=payment \
  --add checkout_session:metadata.type=bundle \
  --add checkout_session:metadata.bundleId=your-bundle-id \
  --add checkout_session:metadata.userId=your-user-id \
  --add checkout_session:metadata.courseIds=course1,course2,course3
```

## Production Setup

### 1. Add Webhook Endpoint in Stripe Dashboard

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your endpoint URL: `https://yourdomain.com/api/stripe/webhooks`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 2. Get Signing Secret

After creating the endpoint, click on it to reveal the signing secret.

### 3. Set Production Environment Variable

Add the production webhook signing secret to your production environment:
```env
STRIPE_WEBHOOK_SECRET=whsec_production_xxxx
```

## Webhook Payload Structure

### Course Purchase
```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "mode": "payment",
      "metadata": {
        "type": "course",
        "courseId": "uuid",
        "userId": "clerk-user-id"
      }
    }
  }
}
```

### Bundle Purchase
```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "mode": "payment",
      "metadata": {
        "type": "bundle",
        "bundleId": "uuid",
        "userId": "clerk-user-id",
        "courseIds": "course1,course2,course3"
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Webhook signature verification failed**
   - Ensure STRIPE_WEBHOOK_SECRET is set correctly
   - Check that you're using the correct secret for your environment

2. **Metadata missing**
   - Verify that checkout sessions include proper metadata
   - Check the createCourseCheckout and createBundleCheckout functions

3. **Access not granted after purchase**
   - Check database permissions
   - Verify user_courses table constraints
   - Check for errors in webhook logs

### Monitoring

Monitor webhook events in the Stripe Dashboard:
- [Test mode webhooks](https://dashboard.stripe.com/test/webhooks)
- [Live mode webhooks](https://dashboard.stripe.com/webhooks)

Look for:
- Event delivery status
- Response times
- Error messages
- Retry attempts