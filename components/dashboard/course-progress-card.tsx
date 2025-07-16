"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, TrendingUp, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseProgressCardProps {
  courseTitle: string
  progress: number
  totalLessons: number
  completedLessons: number
  estimatedTimeLeft: string
  nextLesson?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  className?: string
}

export function CourseProgressCard({
  courseTitle,
  progress,
  totalLessons,
  completedLessons,
  estimatedTimeLeft,
  nextLesson,
  difficulty = "beginner",
  className,
}: CourseProgressCardProps) {
  const difficultyColors = {
    beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  }

  const progressPercentage = Math.round(progress)

  return (
    <Card className={cn("relative overflow-hidden transition-all hover:shadow-lg", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold line-clamp-2">
              {courseTitle}
            </CardTitle>
            {nextLesson && (
              <p className="text-sm text-muted-foreground">
                Next: {nextLesson}
              </p>
            )}
          </div>
          <Badge 
            variant="secondary" 
            className={cn("capitalize", difficultyColors[difficulty])}
          >
            {difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold">{progressPercentage}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{completedLessons} of {totalLessons} lessons</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {Math.round((completedLessons / totalLessons) * 100)}% complete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">Lessons</span>
            </div>
            <p className="text-sm font-semibold">{totalLessons}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Target className="h-4 w-4" />
              <span className="text-xs">Completed</span>
            </div>
            <p className="text-sm font-semibold">{completedLessons}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Time left</span>
            </div>
            <p className="text-sm font-semibold">{estimatedTimeLeft}</p>
          </div>
        </div>

        {progress > 0 && progress < 100 && (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-secondary/50 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {100 - progressPercentage}% to go
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}