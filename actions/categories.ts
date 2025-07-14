"use server"

import { db } from "@/db"
import { categories, courses } from "@/db/schema"
import { eq, asc, desc, sql } from "drizzle-orm"

// Get all categories sorted by display order
export async function getAllCategories() {
  try {
    const allCategories = await db
      .select({
        category: categories,
        courseCount: sql<number>`count(${courses.id})::int`
      })
      .from(categories)
      .leftJoin(courses, eq(categories.id, courses.categoryId))
      .groupBy(categories.id)
      .orderBy(asc(categories.displayOrder), asc(categories.name))

    // Transform the results to flatten the structure
    const categoriesWithCount = allCategories.map(({ category, courseCount }) => ({
      ...category,
      courseCount: Number(courseCount) || 0
    }))

    return categoriesWithCount
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

// Get category details by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const result = await db
      .select({
        category: categories,
        courseCount: sql<number>`count(${courses.id})::int`
      })
      .from(categories)
      .leftJoin(courses, eq(categories.id, courses.categoryId))
      .where(eq(categories.slug, slug))
      .groupBy(categories.id)
      .limit(1)

    if (!result.length) {
      return null
    }

    const { category, courseCount } = result[0]

    // Get some featured courses from this category (top 3 by creation date)
    const featuredCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.categoryId, category.id))
      .orderBy(desc(courses.createdAt))
      .limit(3)

    return {
      ...category,
      courseCount: Number(courseCount) || 0,
      featuredCourses
    }
  } catch (error) {
    console.error("Error fetching category by slug:", error)
    throw new Error("Failed to fetch category details")
  }
}