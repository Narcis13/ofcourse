"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MarkCompleteButton } from "./mark-complete-button"
import { updateModuleProgress, updateVideoProgress } from "@/actions/progress"
import { PlayCircle, PauseCircle, RotateCcw, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ModulePlayerProps {
  module: {
    id: string
    title: string
    videoUrl?: string | null
    duration?: number | null
    interactiveType?: string | null
    interactiveConfig?: any
  }
  courseId: string
  progress?: {
    completed: boolean
    videoProgress: number
    timeSpent: number
    lastAccessedAt: Date
  } | null
  onComplete?: () => void
  className?: string
}

export function ModulePlayer({
  module,
  courseId,
  progress: initialProgress,
  onComplete,
  className
}: ModulePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialProgress?.videoProgress || 0)
  const [duration, setDuration] = useState(module.duration || 0)
  const [isCompleted, setIsCompleted] = useState(initialProgress?.completed || false)
  const [timeSpent, setTimeSpent] = useState(initialProgress?.timeSpent || 0)

  // Simulate video playback (in real app, this would be video player events)
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTime < duration) {
      interval = setInterval(async () => {
        const newTime = Math.min(currentTime + 1, duration)
        setCurrentTime(newTime)
        setTimeSpent(prev => prev + 1)

        // Update progress every 5 seconds
        if (newTime % 5 === 0) {
          try {
            await updateVideoProgress(module.id, courseId, newTime, duration)
          } catch (error) {
            console.error("Error updating video progress:", error)
          }
        }

        // Auto-complete when video is 90% watched
        if (!isCompleted && newTime >= duration * 0.9) {
          setIsCompleted(true)
          setIsPlaying(false)
          toast.success("Module completed! Great job!")
          if (onComplete) onComplete()
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentTime, duration, module.id, courseId, isCompleted, onComplete])

  // Update module access time on mount
  useEffect(() => {
    const updateAccess = async () => {
      try {
        await updateModuleProgress(module.id, courseId, {
          lastAccessedAt: new Date()
        })
      } catch (error) {
        console.error("Error updating module access:", error)
      }
    }
    updateAccess()
  }, [module.id, courseId])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{module.title}</span>
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Video Player Placeholder */}
        {module.videoUrl && (
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-20 w-20 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <PauseCircle className="h-12 w-12 text-white" />
                    ) : (
                      <PlayCircle className="h-12 w-12 text-white" />
                    )}
                  </Button>
                  <p className="text-white/70 text-sm">
                    {isPlaying ? "Playing..." : "Click to play"}
                  </p>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  <Progress
                    value={progressPercentage}
                    className="h-1 bg-white/20"
                  />
                  <div className="flex items-center justify-between text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <>
                      <PauseCircle className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  disabled={currentTime === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(timeSpent)} spent
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Content (placeholder for quiz, assignments, etc.) */}
        {module.interactiveType && !module.videoUrl && (
          <div className="p-8 bg-secondary/50 rounded-lg text-center">
            <p className="text-muted-foreground">
              {module.interactiveType} content will be displayed here
            </p>
          </div>
        )}

        {/* Mark Complete Button */}
        {!isCompleted && (
          <div className="pt-4 border-t">
            <MarkCompleteButton
              moduleId={module.id}
              courseId={courseId}
              onComplete={() => {
                setIsCompleted(true)
                if (onComplete) onComplete()
              }}
              className="w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}