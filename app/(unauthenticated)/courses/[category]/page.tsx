import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { eq, and, desc, asc, sql, ilike, gte, lte } from "drizzle-orm";
import { categories, courses, instructors } from "@/db/schema";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatPrice } from "@/lib/utils";
import { Star, Users, Clock, ChevronRight, Search, Filter, BookOpen, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getCategoryWithCourses(
  categorySlug: string,
  searchParams: {
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }
) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
  });

  if (!category) {
    return null;
  }

  let query = db
    .select({
      course: courses,
      instructor: instructors,
      enrollmentCount: sql<number>`COALESCE(
        (SELECT COUNT(*) FROM user_courses WHERE course_id = ${courses.id}), 
        0
      )`.as("enrollment_count"),
    })
    .from(courses)
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .where(eq(courses.categoryId, category.id));

  if (searchParams.search) {
    query = query.where(
      and(
        eq(courses.categoryId, category.id),
        ilike(courses.title, `%${searchParams.search}%`)
      )
    );
  }

  if (searchParams.minPrice) {
    query = query.where(
      and(
        eq(courses.categoryId, category.id),
        gte(courses.price, parseFloat(searchParams.minPrice))
      )
    );
  }

  if (searchParams.maxPrice) {
    query = query.where(
      and(
        eq(courses.categoryId, category.id),
        lte(courses.price, parseFloat(searchParams.maxPrice))
      )
    );
  }

  const sortColumn = {
    latest: desc(courses.createdAt),
    popular: desc(sql`enrollment_count`),
    "price-asc": asc(courses.price),
    "price-desc": desc(courses.price),
    rating: desc(courses.averageRating),
  }[searchParams.sort || "latest"] || desc(courses.createdAt);

  const [coursesData, totalCount] = await Promise.all([
    query.orderBy(sortColumn).limit(pageSize).offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(courses)
      .where(eq(courses.categoryId, category.id))
      .then((res) => res[0]?.count || 0),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    category,
    courses: coursesData,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
    },
  };
}

function CourseCard({
  course,
  category,
  instructor,
  enrollmentCount,
}: {
  course: typeof courses.$inferSelect;
  category: typeof categories.$inferSelect;
  instructor: typeof instructors.$inferSelect | null;
  enrollmentCount: number;
}) {
  return (
    <Link href={`/courses/${category.slug}/${course.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-muted">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          {course.price === 0 && (
            <Badge className="absolute right-2 top-2 bg-green-500 text-white">
              Free
            </Badge>
          )}
        </div>
        <CardContent className="p-5 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            {course.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {course.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {course.estimatedHours && (
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{course.estimatedHours}h</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{enrollmentCount} students</span>
            </div>
            {course.averageRating && (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span>{course.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {course.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  +{course.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            {instructor && (
              <div className="flex items-center gap-2 text-sm">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {instructor.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-muted-foreground">{instructor.name}</span>
              </div>
            )}
            <span className="font-bold text-lg">
              {formatPrice(course.price)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function CourseGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video bg-muted animate-pulse" />
          <CardContent className="p-5 space-y-3">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 bg-muted rounded animate-pulse w-16" />
              <div className="h-4 bg-muted rounded animate-pulse w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const data = await getCategoryWithCourses(resolvedParams.category, {
    search: resolvedSearchParams.search as string,
    sort: resolvedSearchParams.sort as string,
    minPrice: resolvedSearchParams.minPrice as string,
    maxPrice: resolvedSearchParams.maxPrice as string,
    page: resolvedSearchParams.page as string,
  });

  if (!data) {
    notFound();
  }

  const { category, courses: coursesData, pagination } = data;

  const categoryColor = category.colorScheme || "primary";
  const categoryIcon = category.icon || "BookOpen";

  return (
    <>
      <div
        className="relative overflow-hidden border-b"
        style={{
          background: `linear-gradient(135deg, hsl(var(--${categoryColor}) / 0.1) 0%, hsl(var(--${categoryColor}) / 0.05) 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        <SectionWrapper className="relative py-16">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-start gap-6">
            <div
              className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, hsl(var(--${categoryColor})) 0%, hsl(var(--${categoryColor}) / 0.8) 100%)`,
              }}
            >
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                {category.name}
                <Sparkles className="h-8 w-8 text-yellow-500" />
              </h1>
              {category.description && (
                <p className="mt-3 text-lg text-muted-foreground max-w-3xl">
                  {category.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="px-3 py-1">
                  {pagination.totalCount} courses available
                </Badge>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper className="py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      name="search"
                      placeholder="Search courses..."
                      defaultValue={resolvedSearchParams.search}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort">Sort by</Label>
                  <Select name="sort" defaultValue={resolvedSearchParams.sort as string || "latest"}>
                    <SelectTrigger id="sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      defaultValue={resolvedSearchParams.minPrice}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      defaultValue={resolvedSearchParams.maxPrice}
                      className="w-full"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Apply Filters
                </Button>
              </form>
            </Card>
          </aside>

          <div className="flex-1">
            <Suspense fallback={<CourseGridSkeleton />}>
              {coursesData.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {coursesData.map(({ course, instructor, enrollmentCount }) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        category={category}
                        instructor={instructor}
                        enrollmentCount={enrollmentCount}
                      />
                    ))}
                  </div>

                  {pagination.totalPages > 1 && (
                    <div className="mt-12 flex justify-center gap-2">
                      {pagination.currentPage > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link
                            href={{
                              pathname: `/courses/${resolvedParams.category}`,
                              query: {
                                ...resolvedSearchParams,
                                page: pagination.currentPage - 1,
                              },
                            }}
                          >
                            Previous
                          </Link>
                        </Button>
                      )}
                      
                      <div className="flex items-center gap-2 px-4">
                        <span className="text-sm text-muted-foreground">
                          Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                      </div>

                      {pagination.currentPage < pagination.totalPages && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link
                            href={{
                              pathname: `/courses/${resolvedParams.category}`,
                              query: {
                                ...resolvedSearchParams,
                                page: pagination.currentPage + 1,
                              },
                            }}
                          >
                            Next
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Card className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/courses">
                      Browse all courses
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              )}
            </Suspense>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}