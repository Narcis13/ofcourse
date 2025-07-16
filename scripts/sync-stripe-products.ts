import { syncAllCoursesWithStripe, syncAllBundlesWithStripe } from "@/actions/stripe-sync"

async function main() {
  console.log("Starting Stripe product sync...")
  
  try {
    // Sync all courses
    console.log("\n📚 Syncing courses with Stripe...")
    const courseResults = await syncAllCoursesWithStripe()
    
    const successfulCourses = courseResults.filter(r => r.success).length
    const failedCourses = courseResults.filter(r => !r.success)
    
    console.log(`✅ Successfully synced ${successfulCourses} courses`)
    if (failedCourses.length > 0) {
      console.log(`❌ Failed to sync ${failedCourses.length} courses:`)
      failedCourses.forEach(f => {
        console.log(`  - Course ${f.courseId}: ${f.error}`)
      })
    }
    
    // Sync all bundles
    console.log("\n📦 Syncing bundles with Stripe...")
    const bundleResults = await syncAllBundlesWithStripe()
    
    const successfulBundles = bundleResults.filter(r => r.success).length
    const failedBundles = bundleResults.filter(r => !r.success)
    
    console.log(`✅ Successfully synced ${successfulBundles} bundles`)
    if (failedBundles.length > 0) {
      console.log(`❌ Failed to sync ${failedBundles.length} bundles:`)
      failedBundles.forEach(f => {
        console.log(`  - Bundle ${f.bundleId}: ${f.error}`)
      })
    }
    
    console.log("\n✨ Stripe product sync completed!")
    
  } catch (error) {
    console.error("Error during sync:", error)
    process.exit(1)
  }
}

main().catch(console.error)