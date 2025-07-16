import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { courses, userCourses } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react"

interface CourseSuccessPageProps {
  searchParams: Promise<{
    courseId?: string
    sessionId?: string
  }>
}

export default async function CourseSuccessPage({ searchParams }: CourseSuccessPageProps) {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }

  const params = await searchParams
  const courseId = params.courseId
  
  if (!courseId) {
    redirect("/dashboard/courses")
  }

  // Verify user has access to the course
  const [userCourse] = await db
    .select()
    .from(userCourses)
    .where(
      and(
        eq(userCourses.userId, userId),
        eq(userCourses.courseId, courseId)
      )
    )
    .limit(1)

  if (!userCourse) {
    redirect("/dashboard/courses")
  }

  // Get course details
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1)

  if (!course) {
    redirect("/dashboard/courses")
  }

  return (
    <div className="container max-w-3xl py-16">
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Purchase Successful!</CardTitle>
          <CardDescription className="text-base">
            You now have access to {course.title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 font-semibold">What's next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <BookOpen className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Access all course materials immediately</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Complete lessons at your own pace</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Earn a certificate upon completion</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href={`/dashboard/courses/${courseId}`}>
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard/courses">
                Browse More Courses
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