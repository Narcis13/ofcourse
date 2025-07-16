"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useStripeCheckout } from "@/hooks/use-stripe-checkout"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CourseCheckoutButtonProps {
  courseId: string
  courseTitle?: string
  price: string
  className?: string
}

export function CourseCheckoutButton({
  courseId,
  courseTitle,
  price,
  className
}: CourseCheckoutButtonProps) {
  const { toast } = useToast()
  const { createCourseCheckout, isLoading } = useStripeCheckout({
    onError: (error) => {
      toast({
        title: "Checkout failed",
        description: error,
        variant: "destructive"
      })
    }
  })

  const handleCheckout = async () => {
    await createCourseCheckout(courseId)
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
          Enroll for ${price}
          {courseTitle && <span className="sr-only"> in {courseTitle}</span>}
        </>
      )}
    </Button>
  )
}