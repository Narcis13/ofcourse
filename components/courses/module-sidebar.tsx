"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MarkCompleteButton } from "./mark-complete-button"
import { CheckCircle, Lock, PlayCircle, Video, FileText, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface Module {
  id: string
  title: string
  orderIndex: number
  videoUrl?: string | null
  duration?: number | null
  interactiveType?: string | null
}

interface ModuleProgress {
  moduleId: string
  completed: boolean
  videoProgress?: number
  quizScore?: number
}

interface ModuleSidebarProps {
  modules: Module[]
  courseId: string
  currentModuleId?: string
  progress?: ModuleProgress[]
  onModuleSelect?: (moduleId: string) => void
  onModuleComplete?: () => void
  className?: string
}

export function ModuleSidebar({
  modules,
  courseId,
  currentModuleId,
  progress = [],
  onModuleSelect,
  onModuleComplete,
  className
}: ModuleSidebarProps) {
  const [moduleProgress, setModuleProgress] = useState<Record<string, boolean>>(
    progress.reduce((acc, p) => ({ ...acc, [p.moduleId]: p.completed }), {})
  )

  const completedCount = Object.values(moduleProgress).filter(Boolean).length
  const totalCount = modules.length

  const getModuleIcon = (module: Module) => {
    if (module.videoUrl) return <Video className="h-3 w-3" />
    if (module.interactiveType === "quiz") return <Brain className="h-3 w-3" />
    if (module.interactiveType === "reading") return <FileText className="h-3 w-3" />
    return <PlayCircle className="h-3 w-3" />
  }

  const handleModuleComplete = (moduleId: string) => {
    setModuleProgress(prev => ({ ...prev, [moduleId]: true }))
    if (onModuleComplete) onModuleComplete()
  }

  const isModuleLocked = (index: number) => {
    // First module is always unlocked
    if (index === 0) return false
    
    // Check if previous module is completed
    const previousModule = modules[index - 1]
    return !moduleProgress[previousModule.id]
  }

  return (
    <Card className={cn("sticky top-6", className)}>
      <CardHeader className="pb-4">
        <CardTitle>Course Content</CardTitle>
        <CardDescription>
          {completedCount} of {totalCount} modules completed
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-6 pt-0 space-y-2">
            {modules.map((module, index) => {
              const isCompleted = moduleProgress[module.id]
              const isCurrent = module.id === currentModuleId
              const isLocked = isModuleLocked(index)

              return (
                <Card
                  key={module.id}
                  className={cn(
                    "cursor-pointer transition-all",
                    isCurrent && "ring-2 ring-primary",
                    isLocked && "opacity-60",
                    !isLocked && "hover:bg-accent"
                  )}
                  onClick={() => {
                    if (!isLocked && onModuleSelect) {
                      onModuleSelect(module.id)
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 dark:bg-gray-800"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          module.orderIndex + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "font-medium line-clamp-2",
                            isCompleted && "text-green-600 dark:text-green-400"
                          )}
                        >
                          {module.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          {getModuleIcon(module)}
                          {module.duration && (
                            <span>{Math.round(module.duration / 60)} min</span>
                          )}
                          {isCurrent && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        {isCurrent && !isCompleted && !isLocked && (
                          <div className="mt-3">
                            <MarkCompleteButton
                              moduleId={module.id}
                              courseId={courseId}
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onComplete={() => handleModuleComplete(module.id)}
                            >
                              Complete Module
                            </MarkCompleteButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}