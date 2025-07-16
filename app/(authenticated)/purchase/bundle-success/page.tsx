import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { bundles, courses, userCourses, purchases } from "@/db/schema"
import { eq, and, inArray } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Package, BookOpen, ArrowRight } from "lucide-react"

interface BundleSuccessPageProps {
  searchParams: Promise<{
    bundleId?: string
    sessionId?: string
  }>
}

export default async function BundleSuccessPage({ searchParams }: BundleSuccessPageProps) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const params = await searchParams
  const bundleId = params.bundleId
  
  if (!bundleId) {
    redirect("/dashboard/courses")
  }

  // Verify user purchased the bundle
  const [purchase] = await db
    .select()
    .from(purchases)
    .where(
      and(
        eq(purchases.userId, userId),
        eq(purchases.itemId, bundleId),
        eq(purchases.purchaseType, "bundle")
      )
    )
    .limit(1)

  if (!purchase) {
    redirect("/dashboard/courses")
  }

  // Get bundle details
  const [bundle] = await db
    .select()
    .from(bundles)
    .where(eq(bundles.id, bundleId))
    .limit(1)

  if (!bundle) {
    redirect("/dashboard/courses")
  }

  // Get courses in the bundle
  const bundleCourses = bundle.courseIds.length > 0
    ? await db
        .select()
        .from(courses)
        .where(inArray(courses.id, bundle.courseIds))
    : []

  return (
    <div className="container max-w-3xl py-16">
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Bundle Purchase Successful!</CardTitle>
          <CardDescription className="text-base">
            You now have access to {bundle.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Courses Included</h3>
              <span className="flex items-center text-sm text-muted-foreground">
                <Package className="mr-1 h-4 w-4" />
                {bundleCourses.length} courses
              </span>
            </div>
            <ul className="space-y-3">
              {bundleCourses.map((course) => (
                <li key={course.id} className="flex items-start">
                  <BookOpen className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <div className="flex-1">
                    <Link 
                      href={`/dashboard/courses/${course.id}`}
                      className="font-medium hover:underline"
                    >
                      {course.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {course.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-center text-sm">
              <span className="font-semibold">You saved ${bundle.discountPercentage}%</span> with this bundle purchase!
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/courses">
                View My Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/courses">
                Browse More Bundles
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>A confirmation email has been sent to your registered email address.</p>
            <p className="mt-1">
              Need help? <Link href="/dashboard/support" className="text-primary underline">Contact support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}