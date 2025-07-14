"use server"

import { db } from "@/db"
import { courses, categories, instructors, userCourses, modules } from "@/db/schema"
import { eq, and, ilike, desc, asc, sql } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

export interface CourseFilters {
  search?: string
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  instructorId?: string
  sortBy?: "price_asc" | "price_desc" | "newest" | "oldest" | "title"
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Get courses with pagination and filters
export async function getCourses(filters: CourseFilters = {}): Promise<PaginatedResponse<typeof courses.$inferSelect & {
  category: typeof categories.$inferSelect
  instructor: typeof instructors.$inferSelect | null
}>> {
  const {
    search,
    categoryId,
    minPrice,
    maxPrice,
    instructorId,
    sortBy = "newest",
    page = 1,
    limit = 12
  } = filters

  try {
    // Build where conditions
    const conditions = []
    
    if (search) {
      conditions.push(
        sql`(${courses.title} ILIKE ${`%${search}%`} OR ${courses.description} ILIKE ${`%${search}%`})`
      )
    }
    
    if (categoryId) {
      conditions.push(eq(courses.categoryId, categoryId))
    }
    
    if (instructorId) {
      conditions.push(eq(courses.instructorId, instructorId))
    }
    
    if (minPrice !== undefined) {
      conditions.push(sql`${courses.price} >= ${minPrice}`)
    }
    
    if (maxPrice !== undefined) {
      conditions.push(sql`${courses.price} <= ${maxPrice}`)
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Build order by
    let orderByClause
    switch (sortBy) {
      case "price_asc":
        orderByClause = asc(courses.price)
        break
      case "price_desc":
        orderByClause = desc(courses.price)
        break
      case "oldest":
        orderByClause = asc(courses.createdAt)
        break
      case "title":
        orderByClause = asc(courses.title)
        break
      case "newest":
      default:
        orderByClause = desc(courses.createdAt)
    }

    // Get total count
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(courses)
      .where(whereClause)

    const totalCount = Number(count)
    const totalPages = Math.ceil(totalCount / limit)
    const offset = (page - 1) * limit

    // Get paginated courses with joins
    const results = await db
      .select({
        course: courses,
        category: categories,
        instructor: instructors
      })
      .from(courses)
      .innerJoin(categories, eq(courses.categoryId, categories.id))
      .leftJoin(instructors, eq(courses.instructorId, instructors.userId))
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset)

    // Transform results
    const transformedData = results.map(({ course, category, instructor }) => ({
      ...course,
      category,
      instructor
    }))

    return {
      data: transformedData,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages
      }
    }
  } catch (error) {
    console.error("Error fetching courses:", error)
    throw new Error("Failed to fetch courses")
  }
}

// Get single course by ID with full details
export async function getCourseById(id: string) {
  try {
    const result = await db
      .select({
        course: courses,
        category: categories,
        instructor: instructors
      })
      .from(courses)
      .innerJoin(categories, eq(courses.categoryId, categories.id))
      .leftJoin(instructors, eq(courses.instructorId, instructors.userId))
      .where(eq(courses.id, id))
      .limit(1)

    if (!result.length) {
      return null
    }

    const { course, category, instructor } = result[0]

    // Get modules for the course
    const courseModules = await db
      .select()
      .from(modules)
      .where(eq(modules.courseId, id))
      .orderBy(asc(modules.orderIndex))

    // Check if current user has access
    const { userId } = await auth()
    let hasAccess = false
    
    if (userId) {
      const access = await db
        .select()
        .from(userCourses)
        .where(
          and(
            eq(userCourses.userId, userId),
            eq(userCourses.courseId, id)
          )
        )
        .limit(1)
      
      hasAccess = access.length > 0
    }

    return {
      ...course,
      category,
      instructor,
      modules: courseModules,
      hasAccess
    }
  } catch (error) {
    console.error("Error fetching course by ID:", error)
    throw new Error("Failed to fetch course details")
  }
}

// Get courses by category slug
export async function getCoursesByCategory(categorySlug: string) {
  try {
    // First get the category
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .limit(1)

    if (!category) {
      return {
        category: null,
        courses: []
      }
    }

    // Get courses for this category
    const coursesData = await getCourses({
      categoryId: category.id,
      sortBy: "newest"
    })

    return {
      category,
      courses: coursesData.data,
      pagination: coursesData.pagination
    }
  } catch (error) {
    console.error("Error fetching courses by category:", error)
    throw new Error("Failed to fetch courses by category")
  }
}

// Get courses purchased by a user
export async function getUserCourses(userId: string) {
  try {
    const results = await db
      .select({
        course: courses,
        category: categories,
        instructor: instructors,
        userCourse: userCourses
      })
      .from(userCourses)
      .innerJoin(courses, eq(userCourses.courseId, courses.id))
      .innerJoin(categories, eq(courses.categoryId, categories.id))
      .leftJoin(instructors, eq(courses.instructorId, instructors.userId))
      .where(eq(userCourses.userId, userId))
      .orderBy(desc(userCourses.grantedAt))

    // Transform results
    const transformedCourses = results.map(({ course, category, instructor, userCourse }) => ({
      ...course,
      category,
      instructor,
      grantedVia: userCourse.grantedVia,
      grantedAt: userCourse.grantedAt
    }))

    // Get progress for each course (placeholder for now)
    const coursesWithProgress = transformedCourses.map(course => ({
      ...course,
      progress: {
        completedModules: 0,
        totalModules: 0,
        percentComplete: 0
      }
    }))

    return coursesWithProgress
  } catch (error) {
    console.error("Error fetching user courses:", error)
    throw new Error("Failed to fetch user courses")
  }
}