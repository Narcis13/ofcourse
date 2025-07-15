import { Suspense } from "react"
import { getCourses, getCoursesByCategory } from "@/actions/courses"
import { getAllCategories } from "@/actions/categories"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionWrapper } from "@/app/(unauthenticated)/(marketing)/_components/sections/section-wrapper"
import Link from "next/link"
import Image from "next/image"

interface SearchParams {
  search?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
  page?: string
}

async function CourseCatalog({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page) || 1
  const limit = 12

  const [coursesData, categories] = await Promise.all([
    searchParams.category
      ? getCoursesByCategory(searchParams.category)
      : getCourses({
          search: searchParams.search,
          categoryId: undefined,
          minPrice: searchParams.minPrice
            ? Number(searchParams.minPrice)
            : undefined,
          maxPrice: searchParams.maxPrice
            ? Number(searchParams.maxPrice)
            : undefined,
          sortBy: (searchParams.sort === "latest"
            ? "newest"
            : searchParams.sort === "popular"
              ? "newest"
              : searchParams.sort === "rating"
                ? "newest"
                : searchParams.sort) as
            | "price_asc"
            | "price_desc"
            | "newest"
            | "oldest"
            | "title"
            | undefined,
          page,
          limit
        }),
    getAllCategories()
  ])

  const courses = "data" in coursesData ? coursesData.data : coursesData.courses
  const totalPages =
    "pagination" in coursesData && coursesData.pagination
      ? coursesData.pagination.totalPages
      : Math.ceil(courses.length / limit)
  const total =
    "pagination" in coursesData && coursesData.pagination
      ? coursesData.pagination.total
      : courses.length

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link
                href="/courses"
                className={`block rounded-md px-3 py-2 transition-colors ${
                  !searchParams.category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                All Courses
              </Link>
              {categories.map(category => (
                <Link
                  key={category.id}
                  href={`/courses?category=${category.slug}`}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    searchParams.category === category.slug
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="ml-2 text-sm opacity-70">
                    ({category.courseCount})
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
            <form className="space-y-4">
              <div>
                <Label htmlFor="minPrice">Min Price</Label>
                <Input
                  id="minPrice"
                  name="minPrice"
                  type="number"
                  placeholder="0"
                  defaultValue={searchParams.minPrice}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  placeholder="1000"
                  defaultValue={searchParams.maxPrice}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
            </form>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Sort By</h3>
            <div className="space-y-2">
              {[
                { value: "latest", label: "Latest" },
                { value: "popular", label: "Most Popular" },
                { value: "price_asc", label: "Price: Low to High" },
                { value: "price_desc", label: "Price: High to Low" },
                { value: "rating", label: "Highest Rated" }
              ].map(option => (
                <Link
                  key={option.value}
                  href={`/courses?${new URLSearchParams({
                    ...searchParams,
                    sort: option.value
                  }).toString()}`}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    searchParams.sort === option.value
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:col-span-3">
        <div className="mb-6">
          <form className="flex gap-4">
            <Input
              name="search"
              placeholder="Search courses..."
              defaultValue={searchParams.search}
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {courses.length} of {total} courses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.category?.slug || 'uncategorized'}/${course.slug || course.id}`}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-muted flex h-full w-full items-center justify-center">
                      <span className="text-muted-foreground">No preview</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <Badge variant="secondary">${course.price}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground flex items-center gap-4 text-sm">
                    <span>{course.enrollmentCount} students</span>
                    {course.rating && (
                      <span className="flex items-center gap-1">
                        ⭐ {course.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  {course.tags && course.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {course.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">
                      {course.instructor?.name}
                    </span>
                    {course.instructor?.title && (
                      <span className="text-muted-foreground">
                        • {course.instructor.title}
                      </span>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/courses?${new URLSearchParams({
                  ...searchParams,
                  page: String(page - 1)
                }).toString()}`}
              >
                <Button variant="outline">Previous</Button>
              </Link>
            )}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Link
                    key={pageNum}
                    href={`/courses?${new URLSearchParams({
                      ...searchParams,
                      page: String(pageNum)
                    }).toString()}`}
                  >
                    <Button
                      variant={pageNum === page ? "default" : "outline"}
                      size="sm"
                    >
                      {pageNum}
                    </Button>
                  </Link>
                )
              })}
              {totalPages > 5 && <span className="px-2">...</span>}
              {totalPages > 5 && (
                <Link
                  href={`/courses?${new URLSearchParams({
                    ...searchParams,
                    page: String(totalPages)
                  }).toString()}`}
                >
                  <Button variant="outline" size="sm">
                    {totalPages}
                  </Button>
                </Link>
              )}
            </div>
            {page < totalPages && (
              <Link
                href={`/courses?${new URLSearchParams({
                  ...searchParams,
                  page: String(page + 1)
                }).toString()}`}
              >
                <Button variant="outline">Next</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function CourseListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="h-full">
          <div className="bg-muted aspect-video animate-pulse rounded-t-lg" />
          <CardHeader>
            <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
            <div className="bg-muted mt-2 h-4 w-full animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function CoursesPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  return (
    <SectionWrapper className="py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Explore Our Courses</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Discover courses that will help you grow your skills and advance your
          career
        </p>
      </div>

      <Suspense fallback={<CourseListSkeleton />}>
        <CourseCatalog searchParams={searchParams} />
      </Suspense>
    </SectionWrapper>
  )
}
