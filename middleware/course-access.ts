import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { userCourses, purchases, bundles } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export async function hasAccessToCourse(userId: string, courseId: string): Promise<boolean> {
  try {
    // Check direct course access
    const directAccess = await db
      .select()
      .from(userCourses)
      .where(
        and(
          eq(userCourses.userId, userId),
          eq(userCourses.courseId, courseId)
        )
      )
      .limit(1);

    if (directAccess.length > 0) {
      return true;
    }

    // Check if user has purchased a bundle containing this course
    const bundlePurchases = await db
      .select({
        bundle: bundles,
        purchase: purchases
      })
      .from(purchases)
      .innerJoin(bundles, eq(purchases.itemId, bundles.id))
      .where(
        and(
          eq(purchases.userId, userId),
          eq(purchases.purchaseType, "bundle")
        )
      );

    // Check if any purchased bundle contains the course
    for (const { bundle } of bundlePurchases) {
      if (bundle.courseIds.includes(courseId)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking course access:", error);
    return false;
  }
}

export async function requireCourseAccess(courseId: string) {
  const { userId } = await auth();
  
  if (!userId) {
    return {
      authorized: false,
      error: "Unauthorized",
      redirectTo: "/login"
    };
  }

  const hasAccess = await hasAccessToCourse(userId, courseId);
  
  if (!hasAccess) {
    return {
      authorized: false,
      error: "Access Denied",
      redirectTo: `/courses/${courseId}` // Redirect to course page to show paywall
    };
  }

  return {
    authorized: true,
    userId
  };
}

export async function getUserCourseAccess(userId: string) {
  try {
    const courses = await db
      .select({
        courseId: userCourses.courseId,
        grantedVia: userCourses.grantedVia,
        grantedAt: userCourses.grantedAt
      })
      .from(userCourses)
      .where(eq(userCourses.userId, userId));

    return courses;
  } catch (error) {
    console.error("Error fetching user course access:", error);
    return [];
  }
}

export async function grantBundleAccess(userId: string, bundleId: string) {
  try {
    // Get the bundle details
    const bundle = await db
      .select()
      .from(bundles)
      .where(eq(bundles.id, bundleId))
      .limit(1);

    if (!bundle[0] || !bundle[0].courseIds.length) {
      console.error("Bundle not found or has no courses");
      return false;
    }

    // Grant access to each course in the bundle
    const accessRecords = bundle[0].courseIds.map(courseId => ({
      userId,
      courseId,
      grantedVia: `bundle:${bundleId}`,
      grantedAt: new Date()
    }));

    // Insert access records, ignoring duplicates
    for (const record of accessRecords) {
      try {
        await db.insert(userCourses).values(record);
      } catch (error: any) {
        // Ignore duplicate key errors (user already has access)
        if (!error.message?.includes('duplicate key')) {
          console.error(`Error granting access to course ${record.courseId}:`, error);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error granting bundle access:", error);
    return false;
  }
}