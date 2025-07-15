import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CourseCardSkeletonProps {
  className?: string;
  variant?: "default" | "compact" | "list";
}

export default function CourseCardSkeleton({ 
  className,
  variant = "default" 
}: CourseCardSkeletonProps) {
  if (variant === "list") {
    return (
      <Card className={cn("flex gap-4 p-4", className)}>
        <Skeleton className="h-32 w-48 rounded-md flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "overflow-hidden flex flex-col h-full",
      "animate-in fade-in-50 duration-500",
      className
    )}>
      {/* Thumbnail skeleton */}
      <div className="relative aspect-video bg-muted">
        <Skeleton className="absolute inset-0" />
        {/* Badges placeholders */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
          <Skeleton className="h-6 w-12 rounded-md" />
        </div>
        {/* Category and duration */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>

      {/* Content skeleton */}
      <CardHeader className="flex-1 space-y-3">
        {/* Title and description */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-1 pt-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        {/* Tags */}
        {variant === "default" && (
          <div className="flex gap-1 pt-2">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
          </div>
        )}
      </CardHeader>

      {/* Footer skeleton */}
      <CardFooter className="pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}