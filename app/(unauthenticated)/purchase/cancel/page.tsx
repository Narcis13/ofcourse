import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react"

interface CancelPageProps {
  searchParams: Promise<{
    type?: "course" | "bundle"
    id?: string
  }>
}

export default async function CancelPage({ searchParams }: CancelPageProps) {
  const params = await searchParams
  const type = params.type || "course"
  const backUrl = type === "bundle" ? "/bundles" : "/courses"

  return (
    <div className="container max-w-3xl py-16">
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <XCircle className="h-8 w-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl">Purchase Canceled</CardTitle>
          <CardDescription className="text-base">
            Your payment was not completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-3 font-semibold">What happened?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Your purchase was canceled and you were not charged. This could happen for several reasons:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You clicked the back button or closed the payment window</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your payment method was declined</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The session timed out</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start">
              <HelpCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Need help?</p>
                <p className="mt-1 text-blue-700">
                  If you're experiencing issues with payment, please{" "}
                  <Link href="/dashboard/support" className="underline">
                    contact our support team
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href={backUrl}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse {type === "bundle" ? "Bundles" : "Courses"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>No charges were made to your payment method.</p>
            <p className="mt-1">You can try again whenever you're ready.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}