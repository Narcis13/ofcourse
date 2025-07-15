"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Award, 
  Globe, 
  Calendar,
  CheckCircle2,
  PlayCircle,
  Download,
  Share2,
  Heart,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
  BarChart3,
  Video,
  FileText,
  Code,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface CourseHeroProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  previewVideoUrl?: string;
  instructor: {
    name: string;
    avatar?: string;
    title?: string;
    courseCount?: number;
    studentCount?: number;
  };
  price: number;
  originalPrice?: number;
  category: {
    name: string;
    color?: string;
  };
  subcategory?: string;
  duration: number; // in minutes
  moduleCount: number;
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  lastUpdated: Date;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  features?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  hasCertificate?: boolean;
  hasLifetimeAccess?: boolean;
  onEnroll?: () => void;
  isEnrolled?: boolean;
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
  
  if (hours === 0) return `${mins} minutes`;
  if (mins === 0) return `${hours} hours`;
  return `${hours} hours ${mins} minutes`;
}

export default function CourseHero({
  title,
  description,
  thumbnail,
  previewVideoUrl,
  instructor,
  price,
  originalPrice,
  category,
  subcategory,
  duration,
  moduleCount,
  enrollmentCount,
  rating,
  reviewCount,
  lastUpdated,
  language,
  difficulty,
  tags = [],
  features = [],
  prerequisites = [],
  learningOutcomes = [],
  isNew = false,
  isBestseller = false,
  hasCertificate = true,
  hasLifetimeAccess = true,
  onEnroll,
  isEnrolled = false,
}: CourseHeroProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  
  const difficultyInfo = difficultyConfig[difficulty];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      <div className="container relative mx-auto px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Breadcrumb & Badges */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{category.name}</span>
              {subcategory && (
                <>
                  <span>/</span>
                  <span>{subcategory}</span>
                </>
              )}
              {(isNew || isBestseller) && (
                <>
                  <span className="mx-2">•</span>
                  <div className="flex gap-2">
                    {isNew && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    )}
                    {isBestseller && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Bestseller
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              {description}
            </motion.p>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 text-sm"
            >
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(rating) 
                          ? "fill-amber-400 text-amber-400" 
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({reviewCount.toLocaleString()} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{enrollmentCount.toLocaleString()} students</span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated {new Date(lastUpdated).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </div>
            </motion.div>

            {/* Instructor */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Created by {instructor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {instructor.title && `${instructor.title} • `}
                  {instructor.courseCount && `${instructor.courseCount} Courses • `}
                  {instructor.studentCount && `${instructor.studentCount.toLocaleString()} Students`}
                </p>
              </div>
            </motion.div>

            {/* Learning Outcomes */}
            {learningOutcomes.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <h3 className="font-semibold text-lg">What you'll learn</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2"
              >
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            {/* Video Preview / Thumbnail */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  {thumbnail ? (
                    <>
                      <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                      {previewVideoUrl && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button
                            size="lg"
                            variant="secondary"
                            className="gap-2"
                            onClick={() => setShowVideo(true)}
                          >
                            <PlayCircle className="h-5 w-5" />
                            Preview this course
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-primary/20 via-primary/10 to-background flex items-center justify-center">
                      <Video className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Price & Enroll Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 space-y-4">
                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${price}</span>
                    {hasDiscount && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
                        <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                      </>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-sm text-muted-foreground">
                      <Zap className="inline h-3 w-3 mr-1" />
                      Limited time offer
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={onEnroll}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        Enrolled
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Enroll Now
                      </>
                    )}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="flex-1"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={cn(
                        "h-5 w-5",
                        isWishlisted && "fill-current text-red-500"
                      )} />
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="space-y-2 pt-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    30-Day Money-Back Guarantee
                  </p>
                  {hasLifetimeAccess && (
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Full Lifetime Access
                    </p>
                  )}
                  {hasCertificate && (
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Certificate of Completion
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Course Info Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 space-y-4">
                <h3 className="font-semibold">This course includes:</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDuration(duration)} of content</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>{moduleCount} modules</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span>Hands-on exercises</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Downloadable resources</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span>Projects & assignments</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Badge 
                    variant="outline" 
                    className={cn("w-full justify-center", difficultyInfo.color)}
                  >
                    <span className="mr-1">{difficultyInfo.icon}</span>
                    {difficultyInfo.label} Level
                  </Badge>
                  
                  <Badge 
                    variant="outline" 
                    className="w-full justify-center"
                    style={{ 
                      backgroundColor: `${category.color}10`,
                      borderColor: `${category.color}30`,
                      color: category.color 
                    }}
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    {category.name}
                  </Badge>
                </div>
              </Card>
            </motion.div>

            {/* Prerequisites */}
            {prerequisites.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6 space-y-3">
                  <h3 className="font-semibold">Prerequisites</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {prerequisites.map((prereq, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}