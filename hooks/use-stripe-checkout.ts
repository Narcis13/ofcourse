"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type CheckoutType = "course" | "bundle"

interface UseStripeCheckoutOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function useStripeCheckout(options?: UseStripeCheckoutOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const createCheckout = async (type: CheckoutType, id: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, id }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }

      options?.onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong"
      setError(errorMessage)
      options?.onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const createCourseCheckout = (courseId: string) => {
    return createCheckout("course", courseId)
  }

  const createBundleCheckout = (bundleId: string) => {
    return createCheckout("bundle", bundleId)
  }

  return {
    createCourseCheckout,
    createBundleCheckout,
    isLoading,
    error,
  }
}