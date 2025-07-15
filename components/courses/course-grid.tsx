"use client";

import { cn } from "@/lib/utils";
import CourseCard, { CourseCardProps } from "./course-card";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Search } from "lucide-react";

interface CourseGridProps {
  courses: CourseCardProps[];
  loading?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

// Skeleton loader for course cards
function CourseCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ 
  title = "No courses found", 
  description = "Try adjusting your filters or check back later for new courses." 
}: { 
  title?: string; 
  description?: string; 
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="relative bg-background border-2 border-dashed border-muted-foreground/20 rounded-full p-6">
          <Search className="h-12 w-12 text-muted-foreground/50" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md">{description}</p>
    </div>
  );
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function CourseGrid({
  courses,
  loading = false,
  emptyStateTitle,
  emptyStateDescription,
  columns = 3,
  gap = "md",
  animate = true,
  className,
}: CourseGridProps) {
  const gridClassName = cn(
    "grid",
    columnClasses[columns],
    gapClasses[gap],
    className
  );

  // Loading state
  if (loading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="bg-card rounded-lg border overflow-hidden">
            <CourseCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!courses || courses.length === 0) {
    return (
      <div className={gridClassName}>
        <EmptyState 
          title={emptyStateTitle} 
          description={emptyStateDescription} 
        />
      </div>
    );
  }

  // Animated grid
  if (animate) {
    return (
      <motion.div
        className={gridClassName}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              layout
              className="h-full"
            >
              <CourseCard {...course} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Static grid (no animation)
  return (
    <div className={gridClassName}>
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} className="h-full" />
      ))}
    </div>
  );
}

// Export utility component for consistent section wrappers
export function CourseGridSection({
  title,
  description,
  courses,
  viewAllHref,
  viewAllText = "View all courses",
  ...gridProps
}: CourseGridProps & {
  title?: string;
  description?: string;
  viewAllHref?: string;
  viewAllText?: string;
}) {
  return (
    <section className="space-y-6">
      {(title || description) && (
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
            >
              {viewAllText} →
            </a>
          )}
        </div>
      )}
      <CourseGrid courses={courses} {...gridProps} />
    </section>
  );
}