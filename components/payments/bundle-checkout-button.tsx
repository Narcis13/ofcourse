"use client"

import { Button } from "@/components/ui/button"
import { useStripeCheckout } from "@/hooks/use-stripe-checkout"
import { Loader2, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BundleCheckoutButtonProps {
  bundleId: string
  bundleName?: string
  price: string
  originalPrice?: string
  discountPercentage?: number
  className?: string
}

export function BundleCheckoutButton({
  bundleId,
  bundleName,
  price,
  originalPrice,
  discountPercentage,
  className
}: BundleCheckoutButtonProps) {
  const { toast } = useToast()
  const { createBundleCheckout, isLoading } = useStripeCheckout({
    onError: (error) => {
      toast({
        title: "Checkout failed",
        description: error,
        variant: "destructive"
      })
    }
  })

  const handleCheckout = async () => {
    await createBundleCheckout(bundleId)
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      size="lg"
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Package className="mr-2 h-4 w-4" />
          Get Bundle for ${price}
          {originalPrice && discountPercentage && (
            <span className="ml-2 text-xs line-through opacity-70">
              ${originalPrice}
            </span>
          )}
          {bundleName && <span className="sr-only"> - {bundleName}</span>}
        </>
      )}
    </Button>
  )
}