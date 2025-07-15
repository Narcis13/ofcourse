import { db } from "./index"
import { categories, courses, instructors, modules } from "./schema"

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function seed() {
  console.log("🌱 Seeding database...")

  try {
    // Clear existing data
    console.log("Clearing existing data...")
    await db.delete(modules)
    await db.delete(courses)
    await db.delete(instructors)
    await db.delete(categories)

    // Seed categories
    console.log("Seeding categories...")
    const categoryData = [
      {
        name: "Programming",
        slug: "programming",
        description:
          "Learn programming languages, frameworks, and software development",
        icon: "code",
        colorScheme: "blue",
        displayOrder: 1
      },
      {
        name: "Design",
        slug: "design",
        description: "Master UI/UX design, graphic design, and creative tools",
        icon: "palette",
        colorScheme: "purple",
        displayOrder: 2
      },
      {
        name: "Business",
        slug: "business",
        description: "Business strategy, marketing, and entrepreneurship",
        icon: "briefcase",
        colorScheme: "green",
        displayOrder: 3
      },
      {
        name: "Data Science",
        slug: "data-science",
        description: "Machine learning, AI, and data analysis",
        icon: "chart-bar",
        colorScheme: "orange",
        displayOrder: 4
      },
      {
        name: "Personal Development",
        slug: "personal-development",
        description: "Improve your skills and mindset",
        icon: "user",
        colorScheme: "pink",
        displayOrder: 5
      }
    ]

    const insertedCategories = await db
      .insert(categories)
      .values(categoryData)
      .returning()
    console.log(`✅ Inserted ${insertedCategories.length} categories`)

    // Seed instructors
    console.log("Seeding instructors...")
    const instructorData = [
      {
        userId: "user_sample_instructor_1",
        name: "Alex Thompson",
        title: "Senior Full-Stack Developer",
        bio: "Full-stack developer with 10+ years of experience building scalable web applications",
        expertise: ["JavaScript", "React", "Node.js", "TypeScript"],
        verified: true,
        revenueShare: "0.70"
      },
      {
        userId: "user_sample_instructor_2",
        name: "Sarah Chen",
        title: "Lead Product Designer",
        bio: "Senior UI/UX designer specializing in modern design systems and user research",
        expertise: ["UI Design", "UX Research", "Figma", "Design Systems"],
        verified: true,
        revenueShare: "0.70"
      },
      {
        userId: "user_sample_instructor_3",
        name: "Dr. Michael Rodriguez",
        title: "Data Science Educator",
        bio: "Data scientist passionate about making ML accessible to everyone",
        expertise: [
          "Python",
          "Machine Learning",
          "Data Analysis",
          "TensorFlow"
        ],
        verified: true,
        revenueShare: "0.75"
      }
    ]

    const insertedInstructors = await db
      .insert(instructors)
      .values(instructorData)
      .returning()
    console.log(`✅ Inserted ${insertedInstructors.length} instructors`)

    // Seed courses
    console.log("Seeding courses...")
    const courseDataRaw = [
      // Programming courses
      {
        title: "Complete Next.js 15 Masterclass",
        slug: createSlug("Complete Next.js 15 Masterclass"),
        description:
          "Build modern full-stack applications with Next.js 15, React 19, and TypeScript. Learn app router, server components, and deployment strategies.",
        categoryId: insertedCategories.find(c => c.slug === "programming")!.id,
        subcategory: "Web Development",
        price: "89.99",
        instructorId: insertedInstructors[0].userId,
        tags: ["Next.js", "React", "TypeScript", "Full-stack"],
        prerequisites: [
          "Basic JavaScript knowledge",
          "HTML & CSS fundamentals"
        ],
        estimatedHours: 24,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        previewVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        title: "React Native: Build iOS & Android Apps",
        description:
          "Create beautiful mobile applications using React Native. From setup to App Store deployment.",
        categoryId: insertedCategories.find(c => c.slug === "programming")!.id,
        subcategory: "Mobile Development",
        price: "79.99",
        instructorId: insertedInstructors[0].userId,
        tags: ["React Native", "Mobile", "iOS", "Android"],
        prerequisites: ["React basics", "JavaScript ES6+"],
        estimatedHours: 20,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800"
      },

      // Design courses
      {
        title: "UI/UX Design Fundamentals",
        description:
          "Master the principles of user interface and user experience design. Create stunning designs that users love.",
        categoryId: insertedCategories.find(c => c.slug === "design")!.id,
        subcategory: "UI/UX",
        price: "69.99",
        instructorId: insertedInstructors[1].userId,
        tags: ["UI Design", "UX Design", "Figma", "Design Thinking"],
        prerequisites: ["No prerequisites required"],
        estimatedHours: 16,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800"
      },
      {
        title: "Advanced Figma: Design Systems",
        description:
          "Build scalable design systems in Figma. Learn components, auto-layout, and team collaboration.",
        categoryId: insertedCategories.find(c => c.slug === "design")!.id,
        subcategory: "Design Tools",
        price: "49.99",
        instructorId: insertedInstructors[1].userId,
        tags: ["Figma", "Design Systems", "Components", "Collaboration"],
        prerequisites: ["Basic Figma knowledge"],
        estimatedHours: 12,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800"
      },

      // Business courses
      {
        title: "Digital Marketing Mastery",
        description:
          "Learn SEO, social media marketing, content strategy, and paid advertising to grow any business.",
        categoryId: insertedCategories.find(c => c.slug === "business")!.id,
        subcategory: "Marketing",
        price: "99.99",
        instructorId: insertedInstructors[0].userId,
        tags: ["Marketing", "SEO", "Social Media", "Advertising"],
        prerequisites: ["Basic business knowledge"],
        estimatedHours: 18,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
      },

      // Data Science courses
      {
        title: "Python for Data Science",
        description:
          "Master Python programming for data analysis, visualization, and machine learning applications.",
        categoryId: insertedCategories.find(c => c.slug === "data-science")!.id,
        subcategory: "Programming",
        price: "89.99",
        instructorId: insertedInstructors[2].userId,
        tags: ["Python", "Data Analysis", "Pandas", "NumPy"],
        prerequisites: ["Basic programming knowledge"],
        estimatedHours: 22,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
      },
      {
        title: "Machine Learning A-Z",
        description:
          "Comprehensive machine learning course covering supervised, unsupervised, and deep learning.",
        categoryId: insertedCategories.find(c => c.slug === "data-science")!.id,
        subcategory: "Machine Learning",
        price: "119.99",
        instructorId: insertedInstructors[2].userId,
        tags: ["Machine Learning", "Deep Learning", "AI", "TensorFlow"],
        prerequisites: ["Python basics", "Basic statistics"],
        estimatedHours: 30,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800"
      },

      // Personal Development courses
      {
        title: "Productivity Masterclass",
        description:
          "Transform your productivity with proven techniques, tools, and mindset shifts.",
        categoryId: insertedCategories.find(
          c => c.slug === "personal-development"
        )!.id,
        subcategory: "Productivity",
        price: "49.99",
        instructorId: insertedInstructors[1].userId,
        tags: ["Productivity", "Time Management", "Goal Setting", "Habits"],
        prerequisites: ["None"],
        estimatedHours: 8,
        thumbnailUrl:
          "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"
      }
    ]

    // Add slugs to all courses that don't have them
    const courseData = courseDataRaw.map(course => ({
      ...course,
      slug: course.slug || createSlug(course.title)
    }))

    const insertedCourses = await db
      .insert(courses)
      .values(courseData)
      .returning()
    console.log(`✅ Inserted ${insertedCourses.length} courses`)

    // Seed modules for the first course (Next.js Masterclass)
    console.log("Seeding sample modules...")
    const nextjsCourse = insertedCourses.find(c => c.title.includes("Next.js"))!

    const moduleData = [
      {
        courseId: nextjsCourse.id,
        orderIndex: 1,
        title: "Introduction to Next.js 15",
        videoUrl: "https://example.com/videos/intro.mp4",
        duration: 600, // 10 minutes
        interactiveType: null,
        interactiveConfig: null
      },
      {
        courseId: nextjsCourse.id,
        orderIndex: 2,
        title: "Setting Up Your Development Environment",
        videoUrl: "https://example.com/videos/setup.mp4",
        duration: 900, // 15 minutes
        interactiveType: null,
        interactiveConfig: null
      },
      {
        courseId: nextjsCourse.id,
        orderIndex: 3,
        title: "Understanding App Router",
        videoUrl: "https://example.com/videos/app-router.mp4",
        duration: 1200, // 20 minutes
        interactiveType: "quiz",
        interactiveConfig: {
          questions: [
            {
              question: "What is the main advantage of App Router?",
              options: [
                "Server Components",
                "Better routing",
                "Faster builds",
                "All of the above"
              ],
              correctAnswer: 3
            }
          ]
        }
      },
      {
        courseId: nextjsCourse.id,
        orderIndex: 4,
        title: "Server Components Deep Dive",
        videoUrl: "https://example.com/videos/server-components.mp4",
        duration: 1800, // 30 minutes
        interactiveType: "coding_exercise",
        interactiveConfig: {
          instructions:
            "Create a server component that fetches data from an API",
          starterCode: "// Your code here",
          solution: "// Solution code"
        }
      },
      {
        courseId: nextjsCourse.id,
        orderIndex: 5,
        title: "Building Your First Next.js App",
        videoUrl: "https://example.com/videos/first-app.mp4",
        duration: 2400, // 40 minutes
        interactiveType: null,
        interactiveConfig: null
      }
    ]

    const insertedModules = await db
      .insert(modules)
      .values(moduleData)
      .returning()
    console.log(`✅ Inserted ${insertedModules.length} modules`)

    console.log("\n🎉 Database seeded successfully!")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("✅ Seed completed")
    process.exit(0)
  })
  .catch(error => {
    console.error("❌ Seed failed:", error)
    process.exit(1)
  })
