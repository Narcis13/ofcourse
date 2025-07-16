import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserCourses } from "@/actions/courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Clock, 
  PlayCircle, 
  BookOpen, 
  Award, 
  Users, 
  Star,
  ArrowRight,
  Filter,
  Grid,
  List,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Helper function for formatting last accessed time
function formatLastAccessed(date: Date | null): string {
  if (!date) return 'Not started';
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default async function MyCoursesPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/login");
  }

  const userCourses = await getUserCourses(userId);

  // Calculate stats
  const stats = {
    total: userCourses.length,
    inProgress: userCourses.filter(c => c.userCourse.progress > 0 && c.userCourse.progress < 100).length,
    completed: userCourses.filter(c => c.userCourse.progress === 100).length,
    notStarted: userCourses.filter(c => c.userCourse.progress === 0).length
  };

  if (userCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">No Courses Yet</h2>
          <p className="text-muted-foreground max-w-md text-lg">
            Start your learning journey today. Browse our catalog to find courses that match your interests.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/courses">
            Browse Course Catalog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground mt-2">
            Track your progress and continue learning
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/courses">
            <BookOpen className="mr-2 h-4 w-4" />
            Browse More Courses
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Not Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notStarted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search your courses..."
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 border rounded-md p-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({stats.inProgress})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
          <TabsTrigger value="not-started">Not Started ({stats.notStarted})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userCourses.map((courseData) => {
              const progress = courseData.userCourse.progress || 0;
              const isCompleted = progress === 100;
              const lastAccessed = courseData.userCourse.lastAccessedAt;
              
              return (
                <Card key={courseData.course.id} className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video bg-muted">
                    {courseData.course.thumbnailUrl ? (
                      <img
                        src={courseData.course.thumbnailUrl}
                        alt={courseData.course.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/10">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {courseData.category?.name || "Uncategorized"}
                      </Badge>
                    </div>

                    {/* Completion Badge */}
                    {isCompleted && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <Award className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {courseData.course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {courseData.course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    {/* Course Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{courseData.course.estimatedHours || 0}h</span>
                      </div>
                      {courseData.instructor && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{courseData.instructor.name}</span>
                        </div>
                      )}
                      {courseData.course.averageRating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{courseData.course.averageRating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">
                          {progress > 0 ? `${progress}% Complete` : 'Not Started'}
                        </span>
                        <span className="text-muted-foreground">
                          {lastAccessed && `Last: ${formatLastAccessed(lastAccessed)}`}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button asChild className="w-full" variant={isCompleted ? "secondary" : "default"}>
                      <Link href={`/dashboard/courses/${courseData.course.id}`}>
                        {isCompleted ? (
                          <>
                            Review Course
                            <TrendingUp className="ml-2 h-4 w-4" />
                          </>
                        ) : progress > 0 ? (
                          <>
                            Continue Learning
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Start Course
                            <PlayCircle className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Other tab contents would filter the courses accordingly */}
        <TabsContent value="in-progress">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userCourses
              .filter(c => c.userCourse.progress > 0 && c.userCourse.progress < 100)
              .map((courseData) => (
                // Same card component as above
                <div key={courseData.course.id}>In Progress courses...</div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userCourses
              .filter(c => c.userCourse.progress === 100)
              .map((courseData) => (
                // Same card component as above
                <div key={courseData.course.id}>Completed courses...</div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="not-started">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userCourses
              .filter(c => c.userCourse.progress === 0)
              .map((courseData) => (
                // Same card component as above
                <div key={courseData.course.id}>Not started courses...</div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}