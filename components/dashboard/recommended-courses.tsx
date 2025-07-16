"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Star, 
  Clock, 
  Users, 
  TrendingUp, 
  Zap,
  ChevronRight,
  Sparkles,
  Trophy,
  BarChart3
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface RecommendedCourse {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    avatar?: string
  }
  rating: number
  studentsCount: number
  duration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  price?: number
  originalPrice?: number
  category: string
  tags: string[]
  isNew?: boolean
  isTrending?: boolean
  thumbnail?: string
}

interface RecommendedCoursesProps {
  courses: RecommendedCourse[]
  className?: string
}

export function RecommendedCourses({ courses, className }: RecommendedCoursesProps) {
  const difficultyIcons = {
    beginner: <BarChart3 className="h-4 w-4 rotate-180" />,
    intermediate: <BarChart3 className="h-4 w-4" />,
    advanced: <Trophy className="h-4 w-4" />,
  }

  const difficultyColors = {
    beginner: "text-emerald-500",
    intermediate: "text-amber-500",
    advanced: "text-rose-500",
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold">Recommended for You</CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on your learning history and interests
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:-translate-y-1">
                {(course.isNew || course.isTrending) && (
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    {course.isNew && (
                      <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                        <Zap className="mr-1 h-3 w-3" />
                        New
                      </Badge>
                    )}
                    {course.isTrending && (
                      <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        Trending
                      </Badge>
                    )}
                  </div>
                )}

                {course.thumbnail ? (
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-primary/50" />
                  </div>
                )}

                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course.instructor.avatar} />
                      <AvatarFallback>
                        {course.instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {course.instructor.name}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          {course.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {formatNumber(course.studentsCount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs gap-1", difficultyColors[course.difficulty])}
                    >
                      {difficultyIcons[course.difficulty]}
                      {course.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs gap-1">
                      <Clock className="h-3 w-3" />
                      {course.duration}
                    </Badge>
                  </div>

                  {course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {course.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{course.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="space-y-1">
                      {course.originalPrice && course.price && course.originalPrice > course.price ? (
                        <>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">${course.price}</span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${course.originalPrice}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                          </Badge>
                        </>
                      ) : course.price ? (
                        <span className="text-lg font-bold">${course.price}</span>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                          Free
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="gap-1 group/btn">
                      View Course
                      <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/courses">
              Explore All Courses
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}