"use server"

import { db } from "@/db"
import { progress, modules, courses } from "@/db/schema"
import { eq, and, sql } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

export interface ModuleProgressData {
  completed?: boolean
  timeSpent?: number
  videoProgress?: number
  quizScore?: number
  attemptCount?: number
  interactionData?: any
}

export interface CourseProgressSummary {
  totalModules: number
  completedModules: number
  percentComplete: number
  totalTimeSpent: number
  lastAccessedAt: Date | null
  isComplete: boolean
  nextModuleId?: string
}

// Get progress for a specific module
export async function getModuleProgress(moduleId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const [result] = await db
      .select()
      .from(progress)
      .where(
        and(
          eq(progress.userId, userId),
          eq(progress.moduleId, moduleId)
        )
      )
      .limit(1)

    return result || null
  } catch (error) {
    console.error("Error fetching module progress:", error)
    throw new Error("Failed to fetch module progress")
  }
}

// Update progress for a module
export async function updateModuleProgress(
  moduleId: string,
  courseId: string,
  data: ModuleProgressData
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Check if progress record exists
    const existing = await getModuleProgress(moduleId)

    if (existing) {
      // Update existing record
      const [updated] = await db
        .update(progress)
        .set({
          ...data,
          updatedAt: new Date(),
          lastAccessedAt: new Date()
        })
        .where(
          and(
            eq(progress.userId, userId),
            eq(progress.moduleId, moduleId)
          )
        )
        .returning()

      return updated
    } else {
      // Create new progress record
      const [created] = await db
        .insert(progress)
        .values({
          userId,
          courseId,
          moduleId,
          ...data,
          lastAccessedAt: new Date()
        })
        .returning()

      return created
    }
  } catch (error) {
    console.error("Error updating module progress:", error)
    throw new Error("Failed to update module progress")
  }
}

// Mark a module as complete
export async function markModuleComplete(moduleId: string, courseId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const [updated] = await db
      .insert(progress)
      .values({
        userId,
        courseId,
        moduleId,
        completed: true,
        completedAt: new Date(),
        lastAccessedAt: new Date()
      })
      .onConflictDoUpdate({
        target: [progress.userId, progress.moduleId],
        set: {
          completed: true,
          completedAt: new Date(),
          lastAccessedAt: new Date(),
          updatedAt: new Date()
        }
      })
      .returning()

    return updated
  } catch (error) {
    console.error("Error marking module complete:", error)
    throw new Error("Failed to mark module as complete")
  }
}

// Get overall course progress
export async function getCourseProgress(courseId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Get all modules for the course
    const courseModules = await db
      .select()
      .from(modules)
      .where(eq(modules.courseId, courseId))

    if (courseModules.length === 0) {
      return {
        totalModules: 0,
        completedModules: 0,
        percentComplete: 0,
        totalTimeSpent: 0,
        lastAccessedAt: null,
        moduleProgress: []
      }
    }

    // Get progress for all modules
    const moduleIds = courseModules.map(m => m.id)
    const progressRecords = await db
      .select()
      .from(progress)
      .where(
        and(
          eq(progress.userId, userId),
          eq(progress.courseId, courseId)
        )
      )

    // Calculate stats
    const completedModules = progressRecords.filter(p => p.completed).length
    const totalTimeSpent = progressRecords.reduce((sum, p) => sum + (p.timeSpent || 0), 0)
    const lastAccessed = progressRecords
      .map(p => p.lastAccessedAt)
      .filter(date => date !== null)
      .sort((a, b) => b.getTime() - a.getTime())[0] || null

    // Create progress map
    const progressMap = new Map(
      progressRecords.map(p => [p.moduleId, p])
    )

    // Combine module info with progress
    const moduleProgress = courseModules.map(module => ({
      module,
      progress: progressMap.get(module.id) || null
    }))

    return {
      totalModules: courseModules.length,
      completedModules,
      percentComplete: Math.round((completedModules / courseModules.length) * 100),
      totalTimeSpent,
      lastAccessedAt: lastAccessed,
      moduleProgress
    }
  } catch (error) {
    console.error("Error fetching course progress:", error)
    throw new Error("Failed to fetch course progress")
  }
}

// Reset progress for a module
export async function resetModuleProgress(moduleId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    await db
      .delete(progress)
      .where(
        and(
          eq(progress.userId, userId),
          eq(progress.moduleId, moduleId)
        )
      )

    return { success: true }
  } catch (error) {
    console.error("Error resetting module progress:", error)
    throw new Error("Failed to reset module progress")
  }
}

// Update video progress
export async function updateVideoProgress(
  moduleId: string,
  courseId: string,
  currentTime: number,
  duration: number
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Calculate if video is complete (watched 90% or more)
    const percentWatched = (currentTime / duration) * 100
    const isComplete = percentWatched >= 90

    const data: ModuleProgressData = {
      videoProgress: Math.floor(currentTime),
      completed: isComplete
    }

    if (isComplete) {
      data.completedAt = new Date()
    }

    return await updateModuleProgress(moduleId, courseId, data)
  } catch (error) {
    console.error("Error updating video progress:", error)
    throw new Error("Failed to update video progress")
  }
}

// Record quiz attempt
export async function recordQuizAttempt(
  moduleId: string,
  courseId: string,
  score: number,
  answers: any
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    // Get current progress to increment attempt count
    const currentProgress = await getModuleProgress(moduleId)
    const attemptCount = (currentProgress?.attemptCount || 0) + 1

    const data: ModuleProgressData = {
      quizScore: score,
      attemptCount,
      completed: score >= 70, // 70% passing grade
      interactionData: {
        lastAttempt: {
          score,
          answers,
          timestamp: new Date()
        }
      }
    }

    if (data.completed) {
      data.completedAt = new Date()
    }

    return await updateModuleProgress(moduleId, courseId, data)
  } catch (error) {
    console.error("Error recording quiz attempt:", error)
    throw new Error("Failed to record quiz attempt")
  }
}

// Get course progress summary
export async function getCourseProgressSummary(courseId: string): Promise<CourseProgressSummary> {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const courseProgress = await getCourseProgress(courseId)
    
    // Find next incomplete module
    let nextModuleId: string | undefined
    const sortedModules = courseProgress.moduleProgress
      .sort((a, b) => a.module.orderIndex - b.module.orderIndex)
    
    for (const { module, progress } of sortedModules) {
      if (!progress?.completed) {
        nextModuleId = module.id
        break
      }
    }

    const isComplete = courseProgress.completedModules === courseProgress.totalModules && 
                      courseProgress.totalModules > 0

    return {
      totalModules: courseProgress.totalModules,
      completedModules: courseProgress.completedModules,
      percentComplete: courseProgress.percentComplete,
      totalTimeSpent: courseProgress.totalTimeSpent,
      lastAccessedAt: courseProgress.lastAccessedAt,
      isComplete,
      nextModuleId
    }
  } catch (error) {
    console.error("Error fetching course progress summary:", error)
    throw new Error("Failed to fetch course progress summary")
  }
}

// Get progress for multiple courses (for dashboard)
export async function getMultipleCoursesProgress(courseIds: string[]) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const progressSummaries = await Promise.all(
      courseIds.map(async (courseId) => {
        try {
          const summary = await getCourseProgressSummary(courseId)
          return { courseId, ...summary }
        } catch (error) {
          // Return default progress if error
          return {
            courseId,
            totalModules: 0,
            completedModules: 0,
            percentComplete: 0,
            totalTimeSpent: 0,
            lastAccessedAt: null,
            isComplete: false
          }
        }
      })
    )

    return progressSummaries
  } catch (error) {
    console.error("Error fetching multiple courses progress:", error)
    throw new Error("Failed to fetch multiple courses progress")
  }
}

// Calculate estimated time to complete course
export async function getEstimatedTimeToComplete(courseId: string) {
  try {
    const { userId } = await auth()
    if (!userId) {
      throw new Error("Unauthorized")
    }

    const courseProgress = await getCourseProgress(courseId)
    
    // Get total duration of incomplete modules
    const incompleteModules = courseProgress.moduleProgress.filter(
      ({ progress }) => !progress?.completed
    )
    
    const remainingDuration = incompleteModules.reduce(
      (sum, { module }) => sum + (module.duration || 0),
      0
    )

    // Calculate average time per module based on completed modules
    let averageTimePerModule = 0
    if (courseProgress.completedModules > 0) {
      averageTimePerModule = courseProgress.totalTimeSpent / courseProgress.completedModules
    }

    return {
      remainingModules: incompleteModules.length,
      estimatedMinutes: Math.round(remainingDuration / 60),
      averageTimePerModule: Math.round(averageTimePerModule / 60)
    }
  } catch (error) {
    console.error("Error calculating estimated time:", error)
    throw new Error("Failed to calculate estimated time")
  }
}