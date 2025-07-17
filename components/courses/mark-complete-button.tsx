"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { markModuleComplete } from "@/actions/progress"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface MarkCompleteButtonProps {
  moduleId: string
  courseId: string
  isCompleted?: boolean
  onComplete?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function MarkCompleteButton({
  moduleId,
  courseId,
  isCompleted = false,
  onComplete,
  variant = "default",
  size = "default",
  className,
  showIcon = true,
  children
}: MarkCompleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [completed, setCompleted] = useState(isCompleted)
  const router = useRouter()

  const handleMarkComplete = async () => {
    if (completed) return

    setIsLoading(true)
    try {
      await markModuleComplete(moduleId, courseId)
      setCompleted(true)
      toast.success("Module marked as complete!")
      
      // Call parent callback if provided
      if (onComplete) {
        onComplete()
      }
      
      // Refresh the page to update progress
      router.refresh()
    } catch (error) {
      console.error("Error marking module as complete:", error)
      toast.error("Failed to mark module as complete")
    } finally {
      setIsLoading(false)
    }
  }

  if (completed) {
    return (
      <div className={cn("flex items-center gap-2 text-green-600 dark:text-green-400", className)}>
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Completed</span>
      </div>
    )
  }

  return (
    <Button
      onClick={handleMarkComplete}
      disabled={isLoading || completed}
      variant={variant}
      size={size}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Marking complete...
        </>
      ) : (
        <>
          {showIcon && <CheckCircle2 className="h-4 w-4 mr-2" />}
          {children || "Mark as Complete"}
        </>
      )}
    </Button>
  )
}