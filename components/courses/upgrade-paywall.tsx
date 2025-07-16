"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Lock, 
  Shield, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Clock,
  Award,
  Users,
  Zap,
  Loader2
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { createCourseCheckout } from "@/actions/stripe";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  slug: string;
  estimatedHours?: number;
  thumbnailUrl?: string;
  category?: {
    name: string;
    slug: string;
    colorScheme?: string;
  };
}

interface UpgradePaywallProps {
  course: Course;
  enrollmentCount?: number;
}

export function UpgradePaywall({ course, enrollmentCount = 0 }: UpgradePaywallProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleUpgrade = async () => {
    if (!isSignedIn) {
      router.push(`/login?redirect_url=/dashboard/courses/${course.id}`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await createCourseCheckout(course.id);
      
      if (result.error) {
        toast.error(result.error);
      } else if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: CheckCircle2, text: "Full lifetime access to all course content" },
    { icon: Zap, text: "AI-powered learning assistant available 24/7" },
    { icon: Award, text: "Certificate of completion" },
    { icon: Users, text: "Access to student community" },
    { icon: Shield, text: "30-day money-back guarantee" },
  ];

  const features = [
    { icon: Clock, label: `${course.estimatedHours || 0} hours of content` },
    { icon: Users, label: `${enrollmentCount} enrolled students` },
    { icon: Award, label: "Certificate included" },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Lock className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Unlock This Course</h1>
          <p className="text-muted-foreground text-lg">
            Get instant access to all course materials and start learning today
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Course Info */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {course.category && (
                    <Badge 
                      variant="secondary"
                      style={{
                        backgroundColor: `hsl(var(--${course.category.colorScheme || "primary"}) / 0.1)`,
                        color: `hsl(var(--${course.category.colorScheme || "primary"}))`,
                      }}
                    >
                      {course.category.name}
                    </Badge>
                  )}
                  <Badge className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Popular
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <feature.icon className="h-4 w-4" />
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <benefit.icon className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm">{benefit.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Link href={`/courses/${course.category?.slug}/${course.slug}`}>
                <Button variant="link" size="sm" className="px-0">
                  View full course details
                </Button>
              </Link>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-2">
            <Card className="sticky top-6 border-2 shadow-xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground">
                  Get instant access for
                </CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{formatPrice(course.price)}</span>
                  <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full gap-2 h-12 text-base"
                  onClick={handleUpgrade}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      Unlock Course Now
                    </>
                  )}
                </Button>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                  
                  {parseFloat(course.price) > 0 && (
                    <div className="text-center">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        30-day money-back guarantee
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-center text-muted-foreground">
                By purchasing, you agree to our Terms of Service
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}