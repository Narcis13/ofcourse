"use client";

import { EmptyState } from "@/components/ui/empty-state";
import { 
  BookOpen, 
  Search, 
  Filter, 
  GraduationCap, 
  Sparkles,
  TrendingUp,
  Heart,
  ShoppingCart,
  Clock,
  FolderOpen,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryColorScheme } from "@/lib/category-colors";
import { EmptyStateIllustration } from "./empty-state-illustration";
import Link from "next/link";

interface CourseEmptyStateProps {
  variant?: "no-courses" | "no-results" | "no-favorites" | "no-purchases" | "coming-soon";
  searchQuery?: string;
  categoryName?: string;
  categorySlug?: string;
  onClearFilters?: () => void;
  onExploreAll?: () => void;
}

export function CourseEmptyState({ 
  variant = "no-courses",
  searchQuery,
  categoryName,
  categorySlug,
  onClearFilters,
  onExploreAll
}: CourseEmptyStateProps) {
  const categoryColors = categorySlug ? getCategoryColorScheme(categorySlug) : null;

  switch (variant) {
    case "no-results":
      return (
        <EmptyState
          icon={Search}
          iconClassName="text-muted-foreground"
          title={searchQuery ? `No courses found for "${searchQuery}"` : "No courses found"}
          description="Try adjusting your search terms or filters to find what you're looking for."
          action={
            onClearFilters ? {
              label: "Clear all filters",
              onClick: onClearFilters
            } : undefined
          }
          secondaryAction={{
            label: "Browse all courses",
            href: "/courses"
          }}
          variant="centered"
        >
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <p className="text-sm text-muted-foreground">Popular searches:</p>
            {["React", "Python", "JavaScript", "Design"].map((term) => (
              <Link
                key={term}
                href={`/courses?search=${term}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </EmptyState>
      );

    case "no-favorites":
      return (
        <EmptyState
          icon={Heart}
          iconClassName="text-pink-500"
          title="No favorite courses yet"
          description="Start exploring our courses and save your favorites for quick access."
          action={{
            label: "Explore courses",
            href: "/courses"
          }}
          variant="centered"
        />
      );

    case "no-purchases":
      return (
        <EmptyState
          icon={ShoppingCart}
          iconClassName="text-blue-500"
          title="You haven't enrolled in any courses yet"
          description="Start your learning journey today with our wide selection of courses."
          action={{
            label: "Browse courses",
            href: "/courses"
          }}
          secondaryAction={{
            label: "View free courses",
            href: "/courses?price=free"
          }}
          variant="centered"
        />
      );

    case "coming-soon":
      return (
        <EmptyState
          icon={Clock}
          iconClassName="text-orange-500"
          title="Coming soon!"
          description="We're working on adding new courses to this category. Check back soon!"
          action={{
            label: "Notify me",
            onClick: () => {
              // TODO: Implement notification signup
              alert("We'll notify you when new courses are available!");
            }
          }}
          secondaryAction={{
            label: "Explore other categories",
            href: "/courses"
          }}
          variant="centered"
        />
      );

    default:
      return (
        <EmptyState
          icon={BookOpen}
          iconClassName={categoryColors ? `text-[${categoryColors.primary}]` : "text-primary"}
          title={categoryName ? `No ${categoryName} courses available` : "No courses available"}
          description={
            categoryName 
              ? `We're currently building our ${categoryName} course collection. Check back soon!`
              : "We're adding new courses regularly. Check back soon!"
          }
          action={{
            label: "Request a course",
            onClick: () => {
              // TODO: Implement course request form
              alert("Course request feature coming soon!");
            }
          }}
          secondaryAction={{
            label: "Explore all courses",
            href: "/courses"
          }}
          variant="centered"
        />
      );
  }
}

export function CategoryEmptyState({ 
  categoryName,
  categorySlug 
}: { 
  categoryName: string;
  categorySlug: string;
}) {
  const categoryColors = getCategoryColorScheme(categorySlug);
  
  return (
    <div className="relative overflow-hidden rounded-xl border bg-card p-8 md:p-12">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${categoryColors.primary} 0%, transparent 50%),
                       radial-gradient(circle at 80% 80%, ${categoryColors.secondary} 0%, transparent 50%)`
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <EmptyStateIllustration 
            categorySlug={categorySlug} 
            variant="category" 
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-3">
          No {categoryName} courses yet
        </h2>
        
        <p className="text-muted-foreground mb-8">
          We're working hard to bring you amazing {categoryName} courses. 
          Be the first to know when they're available!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="relative overflow-hidden group"
            style={{
              background: categoryColors.gradient,
              borderColor: categoryColors.primary
            }}
          >
            <span className="relative z-10">Get notified</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/courses">Browse other courses</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {[
            { icon: GraduationCap, label: "Expert instructors" },
            { icon: Sparkles, label: "Premium content" },
            { icon: TrendingUp, label: "Career growth" }
          ].map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg"
              style={{ backgroundColor: `${categoryColors.light}50` }}
            >
              <item.icon 
                className="h-8 w-8"
                style={{ color: categoryColors.primary }}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FilterEmptyState({ 
  onClearFilters 
}: { 
  onClearFilters: () => void;
}) {
  return (
    <EmptyState
      icon={Filter}
      title="No courses match your filters"
      description="Try adjusting your filters to see more courses."
      action={{
        label: "Clear filters",
        onClick: onClearFilters
      }}
      variant="subtle"
    />
  );
}

export function ErrorEmptyState({ 
  error,
  onRetry 
}: { 
  error?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={AlertCircle}
      iconClassName="text-destructive"
      title="Something went wrong"
      description={error || "We couldn't load the courses. Please try again."}
      action={onRetry ? {
        label: "Try again",
        onClick: onRetry
      } : undefined}
      variant="centered"
    />
  );
}