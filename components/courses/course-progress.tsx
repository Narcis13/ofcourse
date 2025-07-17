"use client"

import { Progress } from "@/components/ui/progress"
import { CircularProgress } from "@/components/ui/circular-progress"
import { CheckCircle2, Clock, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseProgressProps {
  completedModules: number
  totalModules: number
  className?: string
  variant?: "bar" | "circular"
  showDetails?: boolean
}

export function CourseProgress({
  completedModules,
  totalModules,
  className,
  variant = "bar",
  showDetails = false
}: CourseProgressProps) {
  const percentage = totalModules > 0 
    ? Math.round((completedModules / totalModules) * 100)
    : 0

  const progressVariant = percentage === 100 
    ? "success" 
    : percentage >= 75 
    ? "default" 
    : percentage >= 50 
    ? "warning" 
    : "default"

  if (variant === "circular") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <CircularProgress
          value={completedModules}
          max={totalModules}
          size={80}
          strokeWidth={6}
          variant={progressVariant}
        />
        {showDetails && (
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {completedModules} of {totalModules} modules
            </p>
            <p className="text-xs text-muted-foreground">
              {percentage === 100 ? "Course completed!" : "Keep going!"}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Progress
        value={completedModules}
        max={totalModules}
        size="default"
        variant={progressVariant}
        showPercentage
        label="Course Progress"
      />
      {showDetails && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {completedModules} completed
          </span>
          <span className="flex items-center gap-1">
            <PlayCircle className="h-3 w-3" />
            {totalModules - completedModules} remaining
          </span>
        </div>
      )}
    </div>
  )
}

interface ModuleProgressItemProps {
  title: string
  completed: boolean
  timeSpent?: number
  videoProgress?: number
  videoDuration?: number
  quizScore?: number
  type?: "video" | "quiz" | "assignment" | "reading"
  onMarkComplete?: () => void
  className?: string
}

export function ModuleProgressItem({
  title,
  completed,
  timeSpent = 0,
  videoProgress = 0,
  videoDuration = 0,
  quizScore,
  type = "video",
  onMarkComplete,
  className
}: ModuleProgressItemProps) {
  const getIcon = () => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />
      case "quiz":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-lg border",
      completed ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : "bg-background",
      className
    )}>
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full",
        completed ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"
      )}>
        {getIcon()}
      </div>
      
      <div className="flex-1 space-y-1">
        <h4 className="font-medium text-sm">{title}</h4>
        
        {type === "video" && videoDuration > 0 && (
          <div className="space-y-1">
            <Progress
              value={videoProgress}
              max={videoDuration}
              size="sm"
              variant={completed ? "success" : "default"}
            />
            <p className="text-xs text-muted-foreground">
              {formatTime(videoProgress)} / {formatTime(videoDuration)}
            </p>
          </div>
        )}
        
        {type === "quiz" && quizScore !== undefined && (
          <p className="text-xs text-muted-foreground">
            Score: {quizScore}%
          </p>
        )}
        
        {timeSpent > 0 && (
          <p className="text-xs text-muted-foreground">
            Time spent: {formatTime(timeSpent)}
          </p>
        )}
      </div>
      
      {!completed && onMarkComplete && (
        <button
          onClick={onMarkComplete}
          className="text-sm text-primary hover:underline"
        >
          Mark complete
        </button>
      )}
    </div>
  )
}