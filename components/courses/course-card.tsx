"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Star, 
  Users, 
  BookOpen, 
  Play, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  User
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategoryColorScheme } from "@/lib/category-colors";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  instructorName: string;
  instructorAvatar?: string;
  price: number;
  originalPrice?: number;
  categoryName: string;
  categorySlug: string;
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  tags?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  href?: string;
  className?: string;
}

const difficultyConfig = {
  beginner: {
    label: "Beginner",
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    icon: "🌱"
  },
  intermediate: {
    label: "Intermediate",
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    icon: "🚀"
  },
  advanced: {
    label: "Advanced",
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
    icon: "⚡"
  }
};

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CourseCard({
  id,
  title,
  description,
  thumbnail,
  instructorName,
  instructorAvatar,
  price,
  originalPrice,
  categoryName,
  categorySlug,
  duration,
  difficulty,
  rating,
  reviewCount,
  enrollmentCount,
  tags = [],
  isNew = false,
  isBestseller = false,
  href,
  className
}: CourseCardProps) {
  const courseHref = href || `/courses/${categorySlug}/${id}`;
  const difficultyInfo = difficultyConfig[difficulty];
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  const categoryColors = getCategoryColorScheme(categorySlug);

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-500 ease-out",
      "flex flex-col h-full border-muted-foreground/10",
      "relative transform-gpu will-change-transform",
      "hover:shadow-2xl hover:-translate-y-2",
      "hover:border-opacity-50",
      className
    )}
    style={{
      '--category-primary': categoryColors.primary,
      '--category-secondary': categoryColors.secondary,
      '--category-light': categoryColors.light,
      '--category-dark': categoryColors.dark,
      borderColor: 'transparent',
      boxShadow: `0 0 0 1px transparent, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    } as React.CSSProperties}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = `0 0 0 2px ${categoryColors.primary}30, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 40px ${categoryColors.primary}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = `0 0 0 1px transparent, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`;
    }}>
      {/* Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary/30" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
        
        {/* Additional overlay for color accent */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${categoryColors.primary}15, transparent 70%)`
          }}
        />
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div 
            className="bg-white/95 dark:bg-black/95 rounded-full p-4 shadow-2xl transform scale-0 group-hover:scale-100 transition-all duration-500 ease-out backdrop-blur-sm"
            style={{
              boxShadow: `0 0 0 0 ${categoryColors.primary}20, 0 0 60px ${categoryColors.primary}40`,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            <Play 
              className="h-6 w-6 transform group-hover:translate-x-0.5 transition-transform duration-300" 
              style={{ 
                color: categoryColors.primary,
                fill: categoryColors.primary 
              }} 
            />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-wrap gap-2">
            {isNew && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
                <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                New
              </Badge>
            )}
            {isBestseller && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default">
                <TrendingUp className="h-3 w-3 mr-1" />
                Bestseller
              </Badge>
            )}
          </div>
          {hasDiscount && (
            <Badge className="bg-red-500 text-white border-0 shadow-md transform transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default animate-bounce">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 transform transition-all duration-300 group-hover:scale-105">
          <div 
            className={cn(
              "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-all duration-300",
              "shadow-sm backdrop-blur-sm border cursor-default",
              "hover:shadow-md",
              categoryColors.badge
            )}
            style={{
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${categoryColors.primary}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {categoryName}
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 transform transition-all duration-300 group-hover:scale-105">
          <Badge variant="secondary" className="shadow-sm backdrop-blur-sm bg-black/50 text-white border-0 transition-all duration-300 hover:bg-black/70">
            <Clock className="h-3 w-3 mr-1 group-hover:animate-spin" />
            {formatDuration(duration)}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="flex-1 space-y-3 p-4 sm:p-6">
        <div>
          <h3 
            className="font-semibold text-base sm:text-lg line-clamp-2 transition-colors"
            style={{
              '--hover-color': categoryColors.primary
            } as React.CSSProperties}
          >
            <span className="group-hover:text-[var(--hover-color)]">{title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {instructorAvatar ? (
            <Image
              src={instructorAvatar}
              alt={instructorName}
              width={24}
              height={24}
              className="rounded-full h-5 w-5 sm:h-6 sm:w-6"
            />
          ) : (
            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-muted flex items-center justify-center">
              <User className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
          <span className="text-muted-foreground hidden sm:inline">by</span>
          <span className="font-medium truncate">{instructorName}</span>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
          {/* Rating */}
          <div className="flex items-center gap-1 group/rating">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover/rating:scale-125" />
            <span className="font-medium transition-colors duration-300 group-hover/rating:text-amber-600">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground hidden sm:inline">({reviewCount})</span>
          </div>

          {/* Enrollments */}
          {enrollmentCount > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground transition-all duration-300 hover:text-foreground group/enrollment">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover/enrollment:scale-110" />
              <span className="hidden sm:inline">{enrollmentCount.toLocaleString()}</span>
              <span className="sm:hidden">{enrollmentCount > 999 ? `${(enrollmentCount/1000).toFixed(1)}k` : enrollmentCount}</span>
            </div>
          )}

          {/* Difficulty */}
          <Badge 
            variant="outline" 
            className={cn("text-[10px] sm:text-xs px-1.5 py-0 sm:px-2 sm:py-0.5", difficultyInfo.color)}
          >
            <span className="mr-0.5 sm:mr-1">{difficultyInfo.icon}</span>
            <span className="hidden sm:inline">{difficultyInfo.label}</span>
            <span className="sm:hidden">{difficultyInfo.label.slice(0, 3)}</span>
          </Badge>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="hidden sm:flex flex-wrap gap-1 pt-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-0 h-5 bg-muted-foreground/10"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-0 h-5 bg-muted-foreground/10"
              >
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      {/* Footer Section */}
      <CardFooter className="pt-0 mt-auto p-4 sm:p-6">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex items-baseline gap-1 sm:gap-2 group/price">
            <span 
              className="text-lg sm:text-2xl font-bold transition-all duration-300 group-hover/price:scale-110"
              style={{
                color: hasDiscount ? categoryColors.primary : undefined,
                transition: 'all 0.3s ease',
              }}
            >
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through opacity-75 transition-opacity duration-300 group-hover/price:opacity-100">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          
          <Button 
            asChild 
            size="sm"
            className="group/btn relative overflow-hidden transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4"
            style={{
              '--btn-hover-bg': categoryColors.primary,
            } as React.CSSProperties}
          >
            <Link href={courseHref}>
              <span className="relative z-10 transition-colors duration-300 hidden sm:inline">View Course</span>
              <span className="relative z-10 transition-colors duration-300 sm:hidden">View</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-all duration-300 group-hover/btn:translate-x-1 relative z-10" />
              <div 
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${categoryColors.primary}, ${categoryColors.secondary})`,
                }}
              />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}