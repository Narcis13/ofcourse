import { auth } from '@clerk/nextjs/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Trophy,
  PlayCircle,
  CheckCircle2,
  Calendar,
  Zap,
  ArrowRight,
  Sparkles,
  GraduationCap
} from 'lucide-react'
import Link from 'next/link'
import { getUserCourses } from '@/actions/courses'
import { redirect } from 'next/navigation'

// Helper function for formatting last accessed time
function formatLastAccessed(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}

export default async function Page() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/login')
  }

  // Fetch user's courses
  const userCoursesList = await getUserCourses(userId)
  
  // Calculate stats from real data
  const stats = {
    totalCourses: userCoursesList.length,
    completedCourses: userCoursesList.filter((c) => c.userCourse.progress === 100).length,
    totalHours: userCoursesList.reduce((sum, c) => sum + (c.course.estimatedHours || 0), 0),
    currentStreak: 7 // This would need a separate tracking system
  }

  // Get recent courses (last 2 accessed)
  const recentCourses = userCoursesList
    .sort((a, b) => {
      const dateA = a.userCourse.lastAccessedAt || a.userCourse.enrolledAt
      const dateB = b.userCourse.lastAccessedAt || b.userCourse.enrolledAt
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 2)
    .map((courseData) => ({
      id: courseData.course.id,
      title: courseData.course.title,
      progress: courseData.userCourse.progress || 0,
      lastAccessed: formatLastAccessed(courseData.userCourse.lastAccessedAt || courseData.userCourse.enrolledAt),
      thumbnail: courseData.course.thumbnailUrl || '/api/placeholder/400/200',
      duration: `${courseData.course.estimatedHours || 0}h`,
      category: courseData.category?.name || 'Uncategorized'
    }))

  // Mock upcoming lessons - this would need module/lesson tracking
  const upcomingLessons = recentCourses.length > 0 ? [
    { title: 'Next Lesson', time: 'Today, 3:00 PM', course: recentCourses[0]?.title || 'Course' },
    { title: 'Review Session', time: 'Tomorrow, 10:00 AM', course: recentCourses[0]?.title || 'Course' }
  ] : []

  return (
    <div className="space-y-8">
      {/* Welcome Section with gradient */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold tracking-tight">Welcome back! 👋</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {stats.totalCourses > 0 
              ? "Continue your learning journey and track your progress."
              : "Start your learning journey today!"}
          </p>
        </div>
        <Sparkles className="absolute -top-4 -right-4 h-24 w-24 text-primary/10" />
      </div>

      {/* Stats Cards with hover effects */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedCourses} completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHours}h</div>
            <p className="text-xs text-muted-foreground">
              Total course content
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up! 🔥
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Trophy className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalCourses > 0 
                ? Math.round((stats.completedCourses / stats.totalCourses) * 100)
                : 0}%
            </div>
            <Progress 
              value={stats.totalCourses > 0 
                ? (stats.completedCourses / stats.totalCourses) * 100
                : 0} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Continue Learning Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Continue Learning</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick up where you left off</p>
            </div>
            {recentCourses.length > 0 && (
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/courses">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {recentCourses.length > 0 ? (
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="grid md:grid-cols-[240px_1fr] gap-0">
                    <div className="relative aspect-video md:aspect-[4/3] bg-muted">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <Badge variant="secondary" className="bg-white/90">
                          {course.category}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold text-xl line-clamp-1">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </span>
                          <span>•</span>
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{course.progress}% complete</span>
                          <span className="text-muted-foreground">
                            {Math.floor((course.progress / 100) * 12)} of 12 lessons
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <Button asChild className="w-full sm:w-auto">
                        <Link href={`/dashboard/courses/${course.id}`}>
                          Continue Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Start Your Learning Journey</h3>
                <p className="text-muted-foreground max-w-sm">
                  Browse our catalog of courses and begin learning new skills today.
                </p>
                <Button asChild>
                  <Link href="/courses">
                    Browse Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Lessons */}
          {upcomingLessons.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingLessons.map((lesson, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.course}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {lesson.time}
                    </Badge>
                    {index < upcomingLessons.length - 1 && (
                      <div className="border-t pt-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Jump right back into learning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  My Courses
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/courses">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Browse Catalog
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/certificates">
                  <Trophy className="mr-2 h-4 w-4" />
                  My Certificates
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/progress">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Progress Report
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Learning Tips */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                Learning Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Set aside dedicated time each day for learning. Consistency is key to mastering new skills!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}