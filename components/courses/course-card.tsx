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
  categoryColor?: string;
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
  categoryColor = "bg-primary",
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
  const courseHref = href || `/courses/${categoryName.toLowerCase()}/${id}`;
  const difficultyInfo = difficultyConfig[difficulty];
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      "flex flex-col h-full border-muted-foreground/10",
      className
    )}>
      {/* Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-primary/30" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 dark:bg-black/90 rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-6 w-6 text-primary fill-primary" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-wrap gap-2">
            {isNew && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md">
                <Sparkles className="h-3 w-3 mr-1" />
                New
              </Badge>
            )}
            {isBestseller && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-md">
                <TrendingUp className="h-3 w-3 mr-1" />
                Bestseller
              </Badge>
            )}
          </div>
          {hasDiscount && (
            <Badge className="bg-red-500 text-white border-0 shadow-md">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge 
            variant="secondary" 
            className={cn(
              "shadow-sm backdrop-blur-sm",
              categoryColor && `${categoryColor}/90 text-white border-0`
            )}
          >
            {categoryName}
          </Badge>
        </div>

        {/* Duration */}
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="shadow-sm backdrop-blur-sm bg-black/50 text-white border-0">
            <Clock className="h-3 w-3 mr-1" />
            {formatDuration(duration)}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardHeader className="flex-1 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-sm">
          {instructorAvatar ? (
            <Image
              src={instructorAvatar}
              alt={instructorName}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
              <User className="h-3 w-3 text-muted-foreground" />
            </div>
          )}
          <span className="text-muted-foreground">by</span>
          <span className="font-medium">{instructorName}</span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>

          {/* Enrollments */}
          {enrollmentCount > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{enrollmentCount.toLocaleString()}</span>
            </div>
          )}

          {/* Difficulty */}
          <Badge 
            variant="outline" 
            className={cn("text-xs", difficultyInfo.color)}
          >
            <span className="mr-1">{difficultyInfo.icon}</span>
            {difficultyInfo.label}
          </Badge>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
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
      <CardFooter className="pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{formatPrice(price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          
          <Button 
            asChild 
            size="sm"
            className="group/btn"
          >
            <Link href={courseHref}>
              <span>View Course</span>
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}