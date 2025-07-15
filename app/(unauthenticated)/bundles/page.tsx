import { Suspense } from "react";
import { getActiveBundles } from "@/actions/bundles";
import { getCategories } from "@/actions/categories";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package2, BookOpen, TrendingDown, Star, Users, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SectionWrapper from "@/components/section-wrapper";

async function BundleFilters() {
  const categories = await getCategories();

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Categories</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="radio" name="category" value="" defaultChecked className="text-primary" />
                <span className="group-hover:text-foreground transition-colors">All Categories</span>
              </label>
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 text-sm cursor-pointer group">
                  <input type="radio" name="category" value={category.id} className="text-primary" />
                  <span className="group-hover:text-foreground transition-colors">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Price Range</Label>
            <div className="mt-2 space-y-2">
              <div className="flex gap-2 items-center">
                <Input type="number" placeholder="Min" className="h-8 text-sm" />
                <span className="text-muted-foreground">-</span>
                <Input type="number" placeholder="Max" className="h-8 text-sm" />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Bundle Size</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="rounded border-muted-foreground/25" />
                <span className="group-hover:text-foreground transition-colors">2-3 Courses</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="rounded border-muted-foreground/25" />
                <span className="group-hover:text-foreground transition-colors">4-5 Courses</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="rounded border-muted-foreground/25" />
                <span className="group-hover:text-foreground transition-colors">6+ Courses</span>
              </label>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Discount</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="rounded border-muted-foreground/25" />
                <span className="group-hover:text-foreground transition-colors">10%+ Off</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="rounded border-muted-foreground/25" />
                <span className="group-hover:text-foreground transition-colors">20%+ Off</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input type="checkbox" className="rounded border-muted-foreground/25" />
                <span className="group-hover:text-foreground transition-colors">30%+ Off</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function BundleCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="relative">
        <div className="h-48 bg-muted" />
      </div>
      <CardHeader>
        <div className="h-6 bg-muted rounded w-3/4 mb-2" />
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="h-20 bg-muted rounded" />
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded w-full" />
      </CardFooter>
    </Card>
  );
}

async function BundleGrid() {
  const bundles = await getActiveBundles();

  if (bundles.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <Package2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No bundles available</h3>
        <p className="text-muted-foreground">Check back later for amazing course bundles!</p>
      </div>
    );
  }

  return (
    <>
      {bundles.map((bundle) => {
        const savingsPercentage = bundle.discountPercentage || 0;
        const courseCount = bundle.courses?.length || 0;
        const totalEnrollments = bundle.courses?.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0) || 0;
        const avgRating = bundle.courses?.length 
          ? (bundle.courses.reduce((sum, course) => sum + (course.rating || 0), 0) / bundle.courses.length).toFixed(1)
          : "0";

        return (
          <Card key={bundle.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-background flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                <Package2 className="h-16 w-16 text-primary/20" />
                {bundle.featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-950">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {savingsPercentage > 0 && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Save {savingsPercentage}%
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                  {bundle.name}
                </CardTitle>
              </div>
              <CardDescription className="line-clamp-2">
                {bundle.description}
              </CardDescription>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="gap-1">
                  <BookOpen className="h-3 w-3" />
                  {courseCount} {courseCount === 1 ? 'Course' : 'Courses'}
                </Badge>
                {totalEnrollments > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Users className="h-3 w-3" />
                    {totalEnrollments.toLocaleString()} enrolled
                  </Badge>
                )}
                {Number(avgRating) > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {avgRating}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Includes:</p>
                <ul className="space-y-1">
                  {bundle.courses?.slice(0, 3).map((course) => (
                    <li key={course.id} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary/50" />
                      <span className="line-clamp-1">{course.title}</span>
                    </li>
                  ))}
                  {courseCount > 3 && (
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary/50" />
                      <span>+{courseCount - 3} more courses</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-baseline justify-between">
                  <div>
                    {bundle.totalValue && bundle.finalPrice && bundle.totalValue !== bundle.finalPrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ${bundle.totalValue}
                      </p>
                    )}
                    <p className="text-2xl font-bold text-primary">
                      ${bundle.finalPrice || bundle.price}
                    </p>
                  </div>
                  {bundle.savings && Number(bundle.savings) > 0 && (
                    <Badge variant="outline" className="text-green-600 border-green-600/20 bg-green-50 dark:bg-green-950/20">
                      Save ${bundle.savings}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button asChild className="w-full group/btn">
                <Link href={`/bundles/${bundle.id}`}>
                  <span>View Bundle Details</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

export default function BundlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <SectionWrapper className="pt-24 pb-32">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Package2 className="h-3 w-3 mr-1" />
            Course Bundles
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Save Big with Course Bundles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get more value with our carefully curated course bundles. Learn comprehensive skills at discounted prices.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search bundles..." 
              className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded animate-pulse" />
                  <div className="h-32 bg-muted rounded animate-pulse" />
                  <div className="h-32 bg-muted rounded animate-pulse" />
                </div>
              }>
                <BundleFilters />
              </Suspense>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">all bundles</span>
              </p>
              <select className="text-sm border rounded-md px-3 py-1.5 bg-background">
                <option>Most Popular</option>
                <option>Highest Savings</option>
                <option>Recently Added</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Suspense fallback={
                <>
                  <BundleCardSkeleton />
                  <BundleCardSkeleton />
                  <BundleCardSkeleton />
                  <BundleCardSkeleton />
                  <BundleCardSkeleton />
                  <BundleCardSkeleton />
                </>
              }>
                <BundleGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}