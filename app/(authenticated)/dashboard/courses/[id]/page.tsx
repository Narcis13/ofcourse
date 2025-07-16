import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getCourseById } from "@/actions/courses";
import { requireCourseAccess } from "@/middleware/course-access";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  PlayCircle, 
  FileText, 
  ChevronLeft, 
  Lock,
  CheckCircle,
  Download,
  MessageSquare,
  Users,
  Star,
  Award,
  BookOpen,
  Video,
  File,
  Brain,
  Target,
  BarChart3,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { UpgradePaywall } from "@/components/courses/upgrade-paywall";
import { db } from "@/db";
import { userCourses } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

interface CoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id: courseId } = await params;
  
  // First get the course details
  const course = await getCourseById(courseId);
  
  if (!course) {
    notFound();
  }
  
  // Check authentication and course access
  const accessCheck = await requireCourseAccess(courseId);
  
  // If not authorized, show the paywall
  if (!accessCheck.authorized) {
    if (accessCheck.redirectTo === "/login") {
      redirect("/login");
    }
    
    // Get enrollment count for the paywall
    const enrollmentCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(userCourses)
      .where(eq(userCourses.courseId, courseId))
      .then((res) => res[0]?.count || 0);
    
    return <UpgradePaywall course={course} enrollmentCount={enrollmentCount} />;
  }

  // Mock progress data - would come from database
  const courseProgress = 35;
  const completedModules = 4;
  const totalModules = course.modules?.length || 12;

  return (
    <div className="min-h-screen">
      {/* Course Header with Gradient Background */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-white/10"
            >
              <Link href="/dashboard/courses">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <Badge variant="secondary" className="text-sm">
                  {course.category?.name}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.estimatedHours || 0} hours
                  </span>
                  {course.instructor && (
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.instructor.name}
                    </span>
                  )}
                  {course.averageRating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {course.averageRating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Course Progress</p>
                    <p className="text-2xl font-bold">{courseProgress}% Complete</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {completedModules} of {totalModules} modules
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ~{Math.round((course.estimatedHours || 0) * (1 - courseProgress / 100))}h remaining
                    </p>
                  </div>
                </div>
                <Progress value={courseProgress} className="h-3" />
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{completedModules} Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4 text-blue-500" />
                    <span>1 In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-gray-400" />
                    <span>{totalModules - completedModules - 1} Locked</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video/Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-black relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-lg font-medium">Introduction to the Course</p>
                      <p className="text-white/70 text-sm mt-1">Click to play • 5:30</p>
                    </div>
                  </div>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                    <div className="flex-1 bg-white/20 rounded-full h-1">
                      <div className="bg-white h-1 rounded-full w-0" />
                    </div>
                    <span className="text-white text-sm">0:00 / 5:30</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Course Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="notes">My Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      About this course
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                    
                    <Separator />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* What you'll learn */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          What you'll learn
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Build production-ready applications</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Master advanced concepts and patterns</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Implement best practices and optimizations</span>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Prerequisites */}
                      {course.prerequisites && course.prerequisites.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Brain className="h-4 w-4 text-primary" />
                            Prerequisites
                          </h4>
                          <ul className="space-y-2">
                            {course.prerequisites.map((prereq, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                <span>{prereq}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {course.tags && course.tags.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            Topics covered
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="hover:bg-primary/10 transition-colors">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Course Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Course Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-primary">{totalModules}</p>
                        <p className="text-sm text-muted-foreground">Modules</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-primary">{course.estimatedHours}h</p>
                        <p className="text-sm text-muted-foreground">Duration</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-primary">1.5k</p>
                        <p className="text-sm text-muted-foreground">Students</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl font-bold text-primary">98%</p>
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Course Resources
                    </CardTitle>
                    <CardDescription>
                      Download materials and reference guides
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Course Slides", type: "PDF", size: "2.4 MB", icon: File },
                        { name: "Code Examples", type: "ZIP", size: "1.8 MB", icon: Download },
                        { name: "Cheat Sheet", type: "PDF", size: "450 KB", icon: FileText },
                        { name: "Additional Reading", type: "PDF", size: "1.2 MB", icon: BookOpen },
                      ].map((resource, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <resource.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {resource.type} • {resource.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Course Discussion
                    </CardTitle>
                    <CardDescription>
                      Connect with other students and ask questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 space-y-4">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <MessageSquare className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Discussion Coming Soon</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Connect with fellow learners and instructors
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      My Notes
                    </CardTitle>
                    <CardDescription>
                      Take notes while learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <textarea
                        className="w-full min-h-[200px] p-4 rounded-lg border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Start taking notes..."
                      />
                      <Button className="w-full sm:w-auto">
                        Save Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Course Modules */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {completedModules} of {totalModules} modules completed
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-6 pt-0 space-y-2">
                    {course.modules && course.modules.length > 0 ? (
                      course.modules.map((module, index) => {
                        const isCompleted = index < completedModules;
                        const isCurrent = index === completedModules;
                        const isLocked = index > completedModules;
                        
                        return (
                          <Card 
                            key={module.id} 
                            className={`cursor-pointer transition-all ${
                              isCurrent ? 'ring-2 ring-primary' : ''
                            } ${isLocked ? 'opacity-60' : 'hover:bg-accent'}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                  isCompleted ? 'bg-green-500 text-white' : 
                                  isCurrent ? 'bg-primary text-primary-foreground' : 
                                  'bg-gray-100 dark:bg-gray-800'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : isLocked ? (
                                    <Lock className="h-4 w-4" />
                                  ) : (
                                    index + 1
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-medium line-clamp-2 ${
                                    isCompleted ? 'text-green-600 dark:text-green-400' : ''
                                  }`}>
                                    {module.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    {module.videoUrl && (
                                      <span className="flex items-center gap-1">
                                        <Video className="h-3 w-3" />
                                        Video
                                      </span>
                                    )}
                                    {module.duration && (
                                      <span>{module.duration} min</span>
                                    )}
                                    {isCurrent && (
                                      <Badge variant="secondary" className="text-xs">
                                        Current
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-muted-foreground">
                          Course modules will be added soon
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Certificate Progress */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certificate Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="h-20 w-20 rounded-full border-4 border-primary/20 flex items-center justify-center mx-auto relative">
                      <span className="text-2xl font-bold">{courseProgress}%</span>
                      <svg className="absolute inset-0 -rotate-90 h-full w-full">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="38%"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={`${courseProgress * 2.4} 240`}
                          className="text-primary"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    Complete the course to earn your certificate
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}