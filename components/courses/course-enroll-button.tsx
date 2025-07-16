"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { createCourseCheckout } from "@/actions/stripe";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

interface CourseEnrollButtonProps {
  courseId: string;
  price: string;
}

export function CourseEnrollButton({ courseId, price }: CourseEnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleEnroll = async () => {
    if (!isSignedIn) {
      router.push(`/login?redirect_url=/courses/${courseId}`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await createCourseCheckout(courseId);
      
      if (result.error) {
        toast.error(result.error);
      } else if (result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show button for free courses
  if (parseFloat(price) === 0) {
    return (
      <Button size="lg" className="w-full gap-2" onClick={handleEnroll} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Shield className="h-4 w-4" />
            Enroll for Free
          </>
        )}
      </Button>
    );
  }

  return (
    <Button size="lg" className="w-full gap-2" onClick={handleEnroll} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Shield className="h-4 w-4" />
          Enroll Now
        </>
      )}
    </Button>
  );
}