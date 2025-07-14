import { pgTable, text, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core"
import { courses } from "./courses"

export const userCourses = pgTable("user_courses", {
  userId: text("user_id").notNull(),
  courseId: uuid("course_id").references(() => courses.id).notNull(),
  grantedVia: text("granted_via").notNull(), // 'purchase', 'bundle', 'admin_grant', etc.
  grantedAt: timestamp("granted_at").defaultNow().notNull()
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.userId, table.courseId] })
  }
})

export type InsertUserCourse = typeof userCourses.$inferInsert
export type SelectUserCourse = typeof userCourses.$inferSelect