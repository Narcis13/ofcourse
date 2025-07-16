"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2 } from "lucide-react";
import { createBundleCheckout } from "@/actions/stripe";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

interface BundleCheckoutButtonProps {
  bundleId: string;
  className?: string;
}

export function BundleCheckoutButton({ bundleId, className }: BundleCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleCheckout = async () => {
    if (!isSignedIn) {
      router.push(`/login?redirect_url=/bundles`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await createBundleCheckout(bundleId);
      
      if (result.error) {
        toast.error(result.error);
      } else if (result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Bundle checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Get Bundle
        </>
      )}
    </Button>
  );
}