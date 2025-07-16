"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, PlayCircle, BookOpen, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ContinueLearningCourse {
  id: string
  title: string
  currentLesson: string
  progress: number
  timeToComplete: string
  thumbnail?: string
  category: string
  lastAccessedAt: Date
}

interface ContinueLearningProps {
  courses: ContinueLearningCourse[]
  className?: string
}

export function ContinueLearning({ courses, className }: ContinueLearningProps) {
  const sortedCourses = [...courses].sort(
    (a, b) => b.lastAccessedAt.getTime() - a.lastAccessedAt.getTime()
  )

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">Continue Learning</CardTitle>
            <p className="text-sm text-muted-foreground">
              Pick up where you left off
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {sortedCourses.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No courses in progress</p>
            <Button variant="outline" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        ) : (
          sortedCourses.map((course) => (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  {course.thumbnail ? (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                  )}

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <Badge variant="secondary" className="flex-shrink-0">
                          {course.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Current lesson: {course.currentLesson}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.timeToComplete}
                        </span>
                        <span className="text-xs">
                          Last accessed {getRelativeTime(course.lastAccessedAt)}
                        </span>
                      </div>

                      <Button 
                        size="sm" 
                        className="group/btn gap-2"
                        asChild
                      >
                        <Link href={`/courses/${course.id}/continue`}>
                          <PlayCircle className="h-4 w-4" />
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {sortedCourses.length > 0 && (
          <div className="pt-4 text-center">
            <Button variant="outline" asChild className="w-full">
              <Link href="/courses/in-progress">
                View All In Progress ({courses.length})
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return date.toLocaleDateString()
}