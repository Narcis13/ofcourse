"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Users, 
  BookOpen, 
  Award, 
  Briefcase,
  GraduationCap,
  Globe,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Mail,
  BarChart3,
  Trophy,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Heart,
  Share2,
  ExternalLink,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface InstructorCourse {
  id: string;
  title: string;
  thumbnail?: string;
  rating: number;
  studentCount: number;
  price: number;
  category: string;
}

export interface InstructorBioProps {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  experience?: string;
  education?: string[];
  certifications?: string[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  courseCount: number;
  responseTime?: string;
  responseRate?: number;
  languages?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  courses?: InstructorCourse[];
  isVerified?: boolean;
  joinedDate?: Date;
  className?: string;
}

const statsConfig = [
  { 
    icon: Star, 
    format: (val: number) => val.toFixed(1),
    label: "Rating",
    color: "text-amber-600"
  },
  { 
    icon: Users, 
    format: (val: number) => val.toLocaleString(),
    label: "Students",
    color: "text-blue-600"
  },
  { 
    icon: BookOpen, 
    format: (val: number) => val.toString(),
    label: "Courses",
    color: "text-green-600"
  },
  { 
    icon: MessageCircle, 
    format: (val: number) => val.toLocaleString(),
    label: "Reviews",
    color: "text-purple-600"
  },
];

export default function InstructorBio({
  id,
  name,
  title,
  avatar,
  bio,
  expertise,
  experience,
  education = [],
  certifications = [],
  rating,
  reviewCount,
  studentCount,
  courseCount,
  responseTime,
  responseRate,
  languages = [],
  socialLinks,
  courses = [],
  isVerified = false,
  joinedDate,
  className
}: InstructorBioProps) {
  const [showFullBio, setShowFullBio] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const stats = [
    { value: rating, ...statsConfig[0] },
    { value: studentCount, ...statsConfig[1] },
    { value: courseCount, ...statsConfig[2] },
    { value: reviewCount, ...statsConfig[3] },
  ];

  const truncatedBio = bio.length > 300 ? bio.substring(0, 300) + "..." : bio;
  const displayBio = showFullBio ? bio : truncatedBio;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About the Instructor</h2>
      </div>

      {/* Main Instructor Card */}
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-shrink-0"
              >
                <Avatar className="h-32 w-32 md:h-40 md:w-40 ring-4 ring-background shadow-xl">
                  <AvatarImage src={avatar} alt={name} className="object-cover" />
                  <AvatarFallback className="text-2xl md:text-3xl font-semibold bg-gradient-to-br from-primary/20 to-primary/10">
                    {name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isVerified && (
                  <div className="flex justify-center mt-3">
                    <Badge className="gap-1 bg-primary/10 text-primary border-primary/20">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Instructor
                    </Badge>
                  </div>
                )}
              </motion.div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-2xl md:text-3xl font-bold"
                  >
                    {name}
                  </motion.h3>
                  {title && (
                    <motion.p 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg text-muted-foreground mt-1"
                    >
                      {title}
                    </motion.p>
                  )}
                </div>

                {/* Stats Grid */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Icon className={cn("h-5 w-5 mr-1", stat.color)} />
                          <span className="text-2xl font-bold">{stat.format(stat.value)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2"
                >
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    variant={isFollowing ? "outline" : "default"}
                    className="gap-2"
                  >
                    {isFollowing ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Bio */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className="relative">
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-muted-foreground/20" />
                <p className="text-muted-foreground pl-6 whitespace-pre-wrap">
                  {displayBio}
                </p>
              </div>
              {bio.length > 300 && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="p-0 h-auto"
                >
                  {showFullBio ? "Show less" : "Read more"}
                </Button>
              )}
            </motion.div>

            {/* Expertise Tags */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <h4 className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Areas of Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Additional Info Grid */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t"
            >
              {/* Experience */}
              {experience && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Experience
                  </h4>
                  <p className="text-sm text-muted-foreground">{experience}</p>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    Education
                  </h4>
                  <ul className="space-y-1">
                    {education.map((edu, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    Certifications
                  </h4>
                  <ul className="space-y-1">
                    {certifications.map((cert, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Languages
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {languages.join(", ")}
                  </p>
                </div>
              )}

              {/* Response Stats */}
              {(responseTime || responseRate) && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    Communication
                  </h4>
                  <div className="space-y-1">
                    {responseTime && (
                      <p className="text-sm text-muted-foreground">
                        Responds in {responseTime}
                      </p>
                    )}
                    {responseRate && (
                      <p className="text-sm text-muted-foreground">
                        {responseRate}% response rate
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Member Since */}
              {joinedDate && (
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                    Member Since
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(joinedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Social Links */}
            {socialLinks && Object.keys(socialLinks).length > 0 && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-3 pt-6 border-t"
              >
                <span className="text-sm font-medium">Connect:</span>
                <div className="flex gap-2">
                  {socialLinks.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.twitter && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.youtube && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.website && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Other Courses */}
      {courses.length > 0 && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              More courses by {name.split(' ')[0]}
            </h3>
            <Button variant="link" asChild className="gap-1">
              <Link href={`/instructors/${id}`}>
                View all
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.slice(0, 3).map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/courses/${course.category.toLowerCase()}/${course.id}`}>
                  <div className="aspect-video relative bg-muted">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold line-clamp-2 mb-2">{course.title}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>{course.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({course.studentCount.toLocaleString()})
                        </span>
                      </div>
                      <span className="font-semibold">${course.price}</span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}