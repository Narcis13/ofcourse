"use server"

import { db } from "@/db"
import { courses, bundles } from "@/db/schema"
import { stripe } from "@/lib/stripe"
import { eq } from "drizzle-orm"
import type { SelectCourse, SelectBundle } from "@/db/schema"

export async function syncCourseWithStripe(courseId: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  })

  if (!course) {
    throw new Error("Course not found")
  }

  let product
  let price

  if (course.stripeProductId) {
    // Update existing product
    product = await stripe.products.update(course.stripeProductId, {
      name: course.title,
      description: course.description,
      metadata: {
        courseId: course.id,
        type: "course",
      },
    })

    // Check if price needs updating
    if (course.stripePriceId) {
      const existingPrice = await stripe.prices.retrieve(course.stripePriceId)
      const newPriceInCents = Math.round(parseFloat(course.price) * 100)
      
      if (existingPrice.unit_amount !== newPriceInCents) {
        // Archive old price and create new one
        await stripe.prices.update(course.stripePriceId, { active: false })
        
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: newPriceInCents,
          currency: "usd",
        })

        // Update course with new price ID
        await db
          .update(courses)
          .set({ stripePriceId: price.id })
          .where(eq(courses.id, courseId))
      } else {
        price = existingPrice
      }
    } else {
      // Create new price
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(parseFloat(course.price) * 100),
        currency: "usd",
      })

      await db
        .update(courses)
        .set({ stripePriceId: price.id })
        .where(eq(courses.id, courseId))
    }
  } else {
    // Create new product and price
    product = await stripe.products.create({
      name: course.title,
      description: course.description,
      metadata: {
        courseId: course.id,
        type: "course",
      },
    })

    price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(parseFloat(course.price) * 100),
      currency: "usd",
    })

    // Update course with Stripe IDs
    await db
      .update(courses)
      .set({
        stripeProductId: product.id,
        stripePriceId: price.id,
      })
      .where(eq(courses.id, courseId))
  }

  return { product, price }
}

export async function syncBundleWithStripe(bundleId: string) {
  const bundle = await db.query.bundles.findFirst({
    where: eq(bundles.id, bundleId),
  })

  if (!bundle) {
    throw new Error("Bundle not found")
  }

  let product
  let price

  if (bundle.stripeProductId) {
    // Update existing product
    product = await stripe.products.update(bundle.stripeProductId, {
      name: bundle.name,
      description: bundle.description,
      metadata: {
        bundleId: bundle.id,
        type: "bundle",
        courseIds: JSON.stringify(bundle.courseIds),
        discountPercentage: bundle.discountPercentage.toString(),
      },
    })

    // Check if price needs updating
    if (bundle.stripePriceId) {
      const existingPrice = await stripe.prices.retrieve(bundle.stripePriceId)
      const newPriceInCents = Math.round(parseFloat(bundle.price) * 100)
      
      if (existingPrice.unit_amount !== newPriceInCents) {
        // Archive old price and create new one
        await stripe.prices.update(bundle.stripePriceId, { active: false })
        
        price = await stripe.prices.create({
          product: product.id,
          unit_amount: newPriceInCents,
          currency: "usd",
        })

        // Update bundle with new price ID
        await db
          .update(bundles)
          .set({ stripePriceId: price.id })
          .where(eq(bundles.id, bundleId))
      } else {
        price = existingPrice
      }
    } else {
      // Create new price
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(parseFloat(bundle.price) * 100),
        currency: "usd",
      })

      await db
        .update(bundles)
        .set({ stripePriceId: price.id })
        .where(eq(bundles.id, bundleId))
    }
  } else {
    // Create new product and price
    product = await stripe.products.create({
      name: bundle.name,
      description: bundle.description,
      metadata: {
        bundleId: bundle.id,
        type: "bundle",
        courseIds: JSON.stringify(bundle.courseIds),
        discountPercentage: bundle.discountPercentage.toString(),
      },
    })

    price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(parseFloat(bundle.price) * 100),
      currency: "usd",
    })

    // Update bundle with Stripe IDs
    await db
      .update(bundles)
      .set({
        stripeProductId: product.id,
        stripePriceId: price.id,
      })
      .where(eq(bundles.id, bundleId))
  }

  return { product, price }
}

export async function syncAllCoursesWithStripe() {
  const allCourses = await db.query.courses.findMany()
  const results = []

  for (const course of allCourses) {
    try {
      const result = await syncCourseWithStripe(course.id)
      results.push({ courseId: course.id, success: true, result })
    } catch (error) {
      results.push({ courseId: course.id, success: false, error: error.message })
    }
  }

  return results
}

export async function syncAllBundlesWithStripe() {
  const allBundles = await db.query.bundles.findMany()
  const results = []

  for (const bundle of allBundles) {
    try {
      const result = await syncBundleWithStripe(bundle.id)
      results.push({ bundleId: bundle.id, success: true, result })
    } catch (error) {
      results.push({ bundleId: bundle.id, success: false, error: error.message })
    }
  }

  return results
}