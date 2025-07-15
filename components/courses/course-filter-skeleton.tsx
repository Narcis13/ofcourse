import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CourseFilterSkeletonProps {
  className?: string;
}

export default function CourseFilterSkeleton({ className }: CourseFilterSkeletonProps) {
  return (
    <aside className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-6 w-16" />
      </div>

      <Skeleton className="h-px w-full" />

      {/* Categories Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-3 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-5 w-8 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="h-px w-full" />

      {/* Price Range Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex gap-3">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full" />

      {/* Difficulty Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}