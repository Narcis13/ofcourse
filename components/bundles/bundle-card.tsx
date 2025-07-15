"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package2, 
  BookOpen, 
  TrendingDown, 
  Star, 
  Users, 
  ArrowRight,
  Sparkles,
  Trophy,
  Zap,
  Gift,
  Clock,
  CheckCircle2,
  Layers,
  DollarSign,
  Heart
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export interface BundleCourse {
  id: string;
  title: string;
  thumbnail?: string;
  instructor: string;
  duration: number;
  rating?: number;
}

export interface BundleCardProps {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  categoryColor?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  courses: BundleCourse[];
  featured?: boolean;
  enrollmentCount?: number;
  rating?: number;
  reviewCount?: number;
  totalDuration?: number;
  savings?: number;
  href?: string;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours === 0) return `${minutes}min`;
  return `${hours}h`;
}

export default function BundleCard({
  id,
  name,
  description,
  categoryName,
  categoryColor = "bg-primary",
  price,
  originalPrice,
  discountPercentage = 0,
  courses,
  featured = false,
  enrollmentCount = 0,
  rating,
  reviewCount = 0,
  totalDuration,
  savings,
  href,
  className,
  variant = "default"
}: BundleCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const bundleHref = href || `/bundles/${id}`;
  const courseCount = courses.length;
  const calculatedSavings = savings || (originalPrice ? originalPrice - price : 0);
  const actualDiscount = discountPercentage || (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0);

  // Calculate average rating from courses if not provided
  const bundleRating = rating || (courses.length > 0 
    ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.filter(c => c.rating).length
    : 0);

  // Calculate total duration if not provided
  const bundleDuration = totalDuration || courses.reduce((sum, course) => sum + course.duration, 0);

  if (variant === "compact") {
    return (
      <Card className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {courseCount} courses bundled
              </p>
            </div>
            {actualDiscount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{actualDiscount}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold">${price}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${originalPrice}
                </span>
              )}
            </div>
            <Button size="sm" asChild>
              <Link href={bundleHref}>
                View Bundle
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-2xl",
          "bg-gradient-to-br from-primary/5 via-background to-primary/5",
          "border-primary/20",
          className
        )}>
          <div className="absolute top-0 right-0 p-4">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
              <Trophy className="h-3 w-3 mr-1" />
              Featured Bundle
            </Badge>
          </div>

          <CardHeader className="pt-16 pb-6">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-2">
                <Package2 className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {description}
              </p>
              
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span>{courseCount} Courses</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDuration(bundleDuration)}</span>
                </div>
                {bundleRating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{bundleRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-sm">Included Courses:</h4>
                <div className="space-y-2">
                  {courses.slice(0, 3).map((course, index) => (
                    <div key={course.id} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="line-clamp-1">{course.title}</span>
                    </div>
                  ))}
                  {courseCount > 3 && (
                    <p className="text-sm text-muted-foreground pl-7">
                      +{courseCount - 3} more courses
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">${price}</p>
                  {originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      ${originalPrice}
                    </p>
                  )}
                </div>
                {calculatedSavings > 0 && (
                  <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Save ${calculatedSavings}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" size="lg" asChild>
              <Link href={bundleHref}>
                <Gift className="h-5 w-5 mr-2" />
                Get This Bundle
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  // Default variant
  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      "flex flex-col h-full",
      className
    )}>
      {/* Header Image/Gradient */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        
        {/* Course Thumbnails Collage */}
        <div className="relative h-full p-6 flex items-center justify-center">
          <div className="relative">
            <motion.div 
              className="absolute -left-8 -top-4 h-20 w-28 rounded-lg overflow-hidden shadow-lg transform -rotate-6"
              whileHover={{ rotate: -3, scale: 1.05 }}
            >
              {courses[0]?.thumbnail ? (
                <Image
                  src={courses[0].thumbnail}
                  alt={courses[0].title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full bg-primary/20" />
              )}
            </motion.div>
            
            <motion.div 
              className="relative h-24 w-32 rounded-lg overflow-hidden shadow-xl z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Package2 className="h-12 w-12 text-primary/50" />
              </div>
            </motion.div>
            
            {courses[1] && (
              <motion.div 
                className="absolute -right-8 -bottom-4 h-20 w-28 rounded-lg overflow-hidden shadow-lg transform rotate-6"
                whileHover={{ rotate: 3, scale: 1.05 }}
              >
                {courses[1].thumbnail ? (
                  <Image
                    src={courses[1].thumbnail}
                    alt={courses[1].title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full bg-primary/20" />
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <Badge 
            variant="secondary"
            className={cn(
              "shadow-sm",
              categoryColor && `${categoryColor}/90 text-white border-0`
            )}
          >
            {categoryName}
          </Badge>
          <div className="flex gap-2">
            {featured && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {actualDiscount > 0 && (
              <Badge variant="destructive" className="shadow-md">
                <TrendingDown className="h-3 w-3 mr-1" />
                {actualDiscount}% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Bundle Size Indicator */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
            <Layers className="h-3 w-3 mr-1" />
            {courseCount} Courses
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="flex-1">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 text-sm">
            {bundleDuration > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(bundleDuration)} total</span>
              </div>
            )}
            {enrollmentCount > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{enrollmentCount.toLocaleString()}</span>
              </div>
            )}
            {bundleRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{bundleRating.toFixed(1)}</span>
                {reviewCount > 0 && (
                  <span className="text-muted-foreground">({reviewCount})</span>
                )}
              </div>
            )}
          </div>

          {/* Course List Preview */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Includes:
            </p>
            <ul className="space-y-1">
              {courses.slice(0, 3).map((course) => (
                <li key={course.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0" />
                  <span className="line-clamp-1 text-muted-foreground">
                    {course.title}
                  </span>
                </li>
              ))}
              {courseCount > 3 && (
                <li className="flex items-center gap-2 text-sm text-primary">
                  <Sparkles className="h-3 w-3" />
                  <span>+{courseCount - 3} more courses</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="pt-0">
        <div className="w-full space-y-3">
          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">${price}</span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
              {calculatedSavings > 0 && (
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  <Zap className="inline h-3 w-3 mr-1" />
                  Save ${calculatedSavings}
                </p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(!isWishlisted);
              }}
              className="rounded-full"
            >
              <Heart className={cn(
                "h-5 w-5",
                isWishlisted && "fill-current text-red-500"
              )} />
            </Button>
          </div>

          {/* CTA Button */}
          <Button asChild className="w-full group/btn">
            <Link href={bundleHref}>
              <span>View Bundle Details</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}