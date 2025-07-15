import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { eq, and, sql } from "drizzle-orm";
import { courses, categories, instructors, modules, userCourses } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { 
  Star, 
  Clock, 
  Users, 
  Award, 
  Play, 
  CheckCircle2, 
  Globe, 
  BarChart3,
  Target,
  BookOpen,
  Video,
  FileText,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Heart
} from "lucide-react";

interface PageProps {
  params: Promise<{ category: string; courseSlug: string }>;
}

async function getCourseDetails(categorySlug: string, courseSlug: string) {
  const course = await db
    .select({
      course: courses,
      category: categories,
      instructor: instructors,
    })
    .from(courses)
    .leftJoin(categories, eq(courses.categoryId, categories.id))
    .leftJoin(instructors, eq(courses.instructorId, instructors.id))
    .where(
      and(
        eq(categories.slug, categorySlug),
        eq(courses.slug, courseSlug)
      )
    )
    .limit(1);

  if (!course[0]) {
    return null;
  }

  // Get modules for this course
  const courseModules = await db
    .select()
    .from(modules)
    .where(eq(modules.courseId, course[0].course.id))
    .orderBy(modules.orderIndex);

  // Check if user has access
  const { userId } = await auth();
  let hasAccess = false;
  
  if (userId) {
    const access = await db
      .select()
      .from(userCourses)
      .where(
        and(
          eq(userCourses.userId, userId),
          eq(userCourses.courseId, course[0].course.id)
        )
      )
      .limit(1);
    
    hasAccess = access.length > 0;
  }

  // Get enrollment count
  const enrollmentCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(userCourses)
    .where(eq(userCourses.courseId, course[0].course.id))
    .then((res) => res[0]?.count || 0);

  return {
    ...course[0],
    modules: courseModules,
    hasAccess,
    enrollmentCount,
  };
}

function CourseHero({
  course,
  category,
  hasAccess,
  enrollmentCount,
}: {
  course: typeof courses.$inferSelect;
  category: typeof categories.$inferSelect | null;
  hasAccess: boolean;
  enrollmentCount: number;
}) {
  const features = [
    { icon: Clock, label: `${course.estimatedHours || 0} hours of content` },
    { icon: Users, label: `${enrollmentCount} enrolled students` },
    { icon: Award, label: "Certificate of completion" },
    { icon: Globe, label: "Lifetime access" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]" />
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      
      <SectionWrapper className="relative py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/courses/${category?.slug}`}>
                    {category?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{course.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div>
              <div className="mb-4 flex items-center gap-3">
                {category && (
                  <Badge 
                    variant="secondary" 
                    className="px-3 py-1"
                    style={{
                      backgroundColor: `hsl(var(--${category.colorScheme || "primary"}) / 0.1)`,
                      color: `hsl(var(--${category.colorScheme || "primary"}))`,
                    }}
                  >
                    {category.name}
                  </Badge>
                )}
                {course.subcategory && (
                  <Badge variant="outline" className="px-3 py-1">
                    {course.subcategory}
                  </Badge>
                )}
                <Badge className="gap-1 bg-yellow-500 text-white">
                  <TrendingUp className="h-3 w-3" />
                  Trending
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {course.title}
              </h1>
              
              <p className="mt-4 text-lg text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">4.8</span>
                <span className="text-muted-foreground">(243 reviews)</span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>

              {course.tags && course.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Card className="overflow-hidden border-2 shadow-2xl">
              {course.previewVideoUrl ? (
                <div className="relative aspect-video bg-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Play className="h-5 w-5" />
                      Watch Preview
                    </Button>
                  </div>
                  <Image
                    src={course.thumbnailUrl || "/placeholder-course.jpg"}
                    alt={course.title}
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
              ) : course.thumbnailUrl ? (
                <div className="relative aspect-video">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-3xl font-bold">{formatPrice(course.price)}</p>
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  </div>
                  {parseFloat(course.price) > 0 && (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      30-day money back guarantee
                    </Badge>
                  )}
                </div>

                {hasAccess ? (
                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/dashboard/courses/${course.id}`}>
                      Continue Learning
                      <Zap className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="w-full gap-2">
                      <Shield className="h-4 w-4" />
                      Enroll Now
                    </Button>
                    <Button size="lg" variant="outline" className="w-full gap-2">
                      <Heart className="h-4 w-4" />
                      Add to Wishlist
                    </Button>
                  </>
                )}

                <div className="space-y-3 pt-4 border-t">
                  <p className="font-semibold">This course includes:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Access on mobile and desktop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>AI-powered learning assistant</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

function CourseContent({
  course,
  modules: courseModules,
  instructor,
}: {
  course: typeof courses.$inferSelect;
  modules: typeof modules.$inferSelect[];
  instructor: typeof instructors.$inferSelect | null;
}) {
  const totalDuration = courseModules.reduce((acc, mod) => acc + (mod.duration || 0), 0);
  const totalLessons = courseModules.length;

  return (
    <SectionWrapper className="py-12">
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    What you'll learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Master the fundamentals and advanced concepts",
                      "Build real-world projects from scratch",
                      "Learn industry best practices and patterns",
                      "Get hands-on experience with practical exercises",
                      "Understand the theory behind the practice",
                      "Gain confidence to tackle complex problems",
                    ].map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {course.prerequisites && course.prerequisites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Prerequisites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-sm">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{course.description}</p>
                  <p className="mt-4">
                    This comprehensive course is designed to take you from beginner to advanced level,
                    with a focus on practical, real-world applications. You'll work on hands-on projects,
                    solve challenging problems, and build a strong foundation that will serve you
                    throughout your career.
                  </p>
                  <p>
                    Our unique approach combines video lessons, interactive exercises, and AI-powered
                    assistance to ensure you not only learn the concepts but truly understand and can
                    apply them in real scenarios.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Course Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-semibold">{course.estimatedHours || 0} hours</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Lessons</span>
                      <span className="font-semibold">{totalLessons} lessons</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Skill Level</span>
                      <Badge>Beginner to Advanced</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Language</span>
                      <span className="font-semibold">English</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Certificate</span>
                      <Badge className="bg-green-500 text-white">Yes</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Learn at your own pace</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Access course materials anytime, anywhere. Our platform is designed to fit
                    your schedule and learning style.
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <Zap className="h-4 w-4" />
                    <span className="font-semibold">AI-Powered Assistant Available 24/7</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Course Curriculum</h2>
            <p className="text-muted-foreground mt-2">
              {totalLessons} lessons • {Math.floor(totalDuration / 60)} hours {totalDuration % 60} minutes
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {courseModules.length > 0 ? (
              courseModules.map((module, index) => (
                <Card key={module.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            {module.videoUrl && (
                              <span className="flex items-center gap-1">
                                <Video className="h-3.5 w-3.5" />
                                Video
                              </span>
                            )}
                            {module.interactiveType && (
                              <span className="flex items-center gap-1">
                                <Zap className="h-3.5 w-3.5" />
                                {module.interactiveType}
                              </span>
                            )}
                            {module.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {module.duration} min
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Course curriculum will be available soon
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="instructor" className="space-y-6">
          {instructor ? (
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                      {instructor.name?.charAt(0).toUpperCase() || "I"}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{instructor.name || "Course Instructor"}</h3>
                      {instructor.title && (
                        <p className="text-muted-foreground mt-1">{instructor.title}</p>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" />
                          {instructor.verified ? "Verified Instructor" : "Instructor"}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">4.8</span>
                          <span className="text-muted-foreground">(156 reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {instructor.bio && (
                    <p className="text-muted-foreground">{instructor.bio}</p>
                  )}
                  
                  {instructor.expertise && instructor.expertise.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {instructor.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">15K+</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center max-w-4xl mx-auto">
              <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Instructor information coming soon
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 text-center">
              <Star className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reviews Coming Soon</h3>
              <p className="text-muted-foreground">
                Student reviews will be available once the course launches
              </p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </SectionWrapper>
  );
}

export default async function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseData = await getCourseDetails(
    resolvedParams.category,
    resolvedParams.courseSlug
  );

  if (!courseData) {
    notFound();
  }

  const { course, category, instructor, modules, hasAccess, enrollmentCount } = courseData;

  return (
    <>
      <CourseHero
        course={course}
        category={category}
        hasAccess={hasAccess}
        enrollmentCount={enrollmentCount}
      />
      <CourseContent
        course={course}
        modules={modules}
        instructor={instructor}
      />
    </>
  );
}