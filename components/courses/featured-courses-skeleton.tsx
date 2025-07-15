import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FeaturedCoursesSkeletonProps {
  className?: string;
  count?: number;
}

export default function FeaturedCoursesSkeleton({ 
  className,
  count = 3 
}: FeaturedCoursesSkeletonProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Section Header */}
      <div className="text-center space-y-2">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* Featured Course Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-xl border bg-card"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Banner/Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Course Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Skeleton className="absolute inset-0" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Category & Duration */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-3/4" />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-1">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}