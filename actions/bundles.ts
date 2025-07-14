"use server"

import { db } from "@/db"
import { bundles, categories, courses } from "@/db/schema"
import { eq, and, inArray, desc } from "drizzle-orm"

// Get all active bundles
export async function getActiveBundles() {
  try {
    const activeBundles = await db
      .select({
        bundle: bundles,
        category: categories
      })
      .from(bundles)
      .innerJoin(categories, eq(bundles.categoryId, categories.id))
      .where(eq(bundles.active, true))
      .orderBy(desc(bundles.featured), desc(bundles.createdAt))

    // Transform results and fetch courses for each bundle
    const bundlesWithDetails = await Promise.all(
      activeBundles.map(async ({ bundle, category }) => {
        // Get courses included in this bundle
        const bundleCourses = bundle.courseIds.length > 0
          ? await db
              .select()
              .from(courses)
              .where(inArray(courses.id, bundle.courseIds))
          : []

        // Calculate total value and savings
        const totalValue = bundleCourses.reduce(
          (sum, course) => sum + parseFloat(course.price),
          0
        )
        const discountAmount = (totalValue * bundle.discountPercentage) / 100
        const finalPrice = totalValue - discountAmount

        return {
          ...bundle,
          category,
          courses: bundleCourses,
          courseCount: bundleCourses.length,
          totalValue: totalValue.toFixed(2),
          discountAmount: discountAmount.toFixed(2),
          finalPrice: finalPrice.toFixed(2),
          savings: discountAmount.toFixed(2)
        }
      })
    )

    return bundlesWithDetails
  } catch (error) {
    console.error("Error fetching active bundles:", error)
    throw new Error("Failed to fetch bundles")
  }
}

// Get bundle details by ID
export async function getBundleById(id: string) {
  try {
    const result = await db
      .select({
        bundle: bundles,
        category: categories
      })
      .from(bundles)
      .innerJoin(categories, eq(bundles.categoryId, categories.id))
      .where(eq(bundles.id, id))
      .limit(1)

    if (!result.length) {
      return null
    }

    const { bundle, category } = result[0]

    // Get all courses in this bundle with their details
    const bundleCourses = bundle.courseIds.length > 0
      ? await db
          .select({
            course: courses,
            category: categories
          })
          .from(courses)
          .innerJoin(categories, eq(courses.categoryId, categories.id))
          .where(inArray(courses.id, bundle.courseIds))
      : []

    // Transform courses
    const coursesWithDetails = bundleCourses.map(({ course, category }) => ({
      ...course,
      category
    }))

    // Calculate pricing details
    const totalValue = coursesWithDetails.reduce(
      (sum, course) => sum + parseFloat(course.price),
      0
    )
    const discountAmount = (totalValue * bundle.discountPercentage) / 100
    const finalPrice = totalValue - discountAmount

    // Calculate total duration
    const totalHours = coursesWithDetails.reduce(
      (sum, course) => sum + (course.estimatedHours || 0),
      0
    )

    return {
      ...bundle,
      category,
      courses: coursesWithDetails,
      courseCount: coursesWithDetails.length,
      totalValue: totalValue.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      savings: discountAmount.toFixed(2),
      totalHours,
      perCoursePrice: coursesWithDetails.length > 0 
        ? (finalPrice / coursesWithDetails.length).toFixed(2)
        : "0.00"
    }
  } catch (error) {
    console.error("Error fetching bundle by ID:", error)
    throw new Error("Failed to fetch bundle details")
  }
}