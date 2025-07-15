import CourseCardSkeleton from "./course-card-skeleton";
import { cn } from "@/lib/utils";

interface CourseGridSkeletonProps {
  count?: number;
  className?: string;
  variant?: "default" | "compact" | "list";
  columns?: 1 | 2 | 3 | 4;
}

export default function CourseGridSkeleton({ 
  count = 6,
  className,
  variant = "default",
  columns = 3
}: CourseGridSkeletonProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  };

  return (
    <div 
      className={cn(
        "grid gap-6",
        gridCols[columns],
        variant === "list" && "grid-cols-1 gap-4",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CourseCardSkeleton 
          key={index} 
          variant={variant}
          className={cn(
            "animate-in fade-in-50 fill-mode-forwards",
            `animation-delay-${(index % 3) * 100}`
          )}
          style={{
            animationDelay: `${(index % 3) * 100}ms`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}