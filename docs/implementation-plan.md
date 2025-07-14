# OfCourse Platform Implementation Plan

## Executive Summary

This implementation plan outlines the development of OfCourse, a premium multi-category online course platform targeting young adults (15-25) with practical skills education enhanced by AI assistance.

### Platform Overview
- **Business Model**: One-time course purchases ($50/course) with bundle options
- **Core Categories**: Technology, Finance, Business, Marketing, Life Skills
- **Key Features**: Interactive HTML modules, AI assistance, video lessons, certificates
- **MVP Timeline**: 12 weeks
- **Revenue Target**: $100,000 in 6 months

### Current Tech Stack
- **Frontend**: Next.js 15 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL (Supabase) + Drizzle ORM
- **Payments**: Stripe
- **UI Components**: Tailwind CSS + Shadcn UI
- **Existing**: Basic auth flow, customer schema, Stripe integration

### Additional Libraries Needed
- **Monaco Editor** (@monaco-editor/react) - Code editor for tech courses
- **Chart.js** (react-chartjs-2) - Financial charts and graphs
- **Video Player** (video.js or Mux Player) - Course video delivery
- **Markdown Renderer** (@uiw/react-md-editor) - Reference guides
- **AI SDK** (@ai-sdk/openai) - AI assistant functionality
- **File Upload** (uploadthing) - Instructor content uploads
- **Analytics** (posthog) - User behavior tracking
- **Email** (resend) - Transactional emails

## Phase 1: Foundation (Weeks 1-4)

### Week 1: Database Schema & Core Models

#### Database Setup
- [x] Create migrations for new tables using Drizzle
- [x] Add `categories` table with fields: id, name, slug, description, icon, color_scheme, display_order
- [x] Add `courses` table extending current schema:
  ```typescript
  - category_id (foreign key)
  - subcategory
  - price (decimal, default 50.00)
  - instructor_id
  - tags (array)
  - prerequisites (array)
  - estimated_hours
  - thumbnail_url
  - preview_video_url
  ```
- [x] Add `bundles` table: id, name, description, category_id, price, discount_percentage, course_ids[], active, featured
- [x] Add `purchases` table: id, user_id, purchase_type, item_id, price_paid, stripe_payment_intent_id, purchased_at
- [x] Add `user_courses` junction table: user_id, course_id, granted_via, granted_at
- [x] Add `instructors` table: id, user_id, bio, expertise[], verified, revenue_share
- [x] Add `modules` table: id, course_id, order_index, title, video_url, duration, interactive_type, interactive_config
- [x] Run migrations: `npm run db:migrate`
- [x] Create seed data for categories and sample courses

#### Server Actions
- [x] Create `/actions/courses.ts` with:
  - [x] `getCourses(filters)` - List courses with pagination
  - [x] `getCourseById(id)` - Get single course details
  - [x] `getCoursesByCategory(categorySlug)` - Filter by category
  - [x] `getUserCourses(userId)` - Get purchased courses
- [x] Create `/actions/categories.ts` with:
  - [x] `getAllCategories()` - List all categories
  - [x] `getCategoryBySlug(slug)` - Get category details
- [x] Create `/actions/bundles.ts` with:
  - [x] `getActiveBundles()` - List available bundles
  - [x] `getBundleById(id)` - Get bundle details
- [x] Extend `/actions/stripe.ts` with:
  - [x] `createCourseCheckout(courseId, userId)` - Single course purchase
  - [x] `createBundleCheckout(bundleId, userId)` - Bundle purchase
  - [x] `handleCoursePaymentSuccess(sessionId)` - Grant course access

### Week 2: Course Catalog & Browse Experience

#### Public Pages Structure
- [ ] Create `/app/(unauthenticated)/courses/page.tsx` - Main catalog
- [ ] Create `/app/(unauthenticated)/courses/[category]/page.tsx` - Category view
- [ ] Create `/app/(unauthenticated)/courses/[category]/[courseSlug]/page.tsx` - Course details
- [ ] Create `/app/(unauthenticated)/bundles/page.tsx` - Bundle catalog

#### Components
- [ ] Create `/components/courses/course-card.tsx` with:
  - [ ] Thumbnail image
  - [ ] Title, instructor, price
  - [ ] Category badge
  - [ ] Duration and difficulty
  - [ ] Rating stars (placeholder)
- [ ] Create `/components/courses/course-grid.tsx` - Responsive grid layout
- [ ] Create `/components/courses/category-filter.tsx` - Filter sidebar
- [ ] Create `/components/courses/course-hero.tsx` - Course detail hero section
- [ ] Create `/components/courses/course-curriculum.tsx` - Module list preview
- [ ] Create `/components/courses/instructor-bio.tsx` - Instructor section
- [ ] Create `/components/bundles/bundle-card.tsx` - Bundle display
- [ ] Create `/components/ui/price-tag.tsx` - Consistent price display

#### Styling & UX
- [ ] Design category color schemes (tech=blue, finance=green, etc.)
- [ ] Implement course card hover effects
- [ ] Add loading skeletons for course grids
- [ ] Create empty states for no courses
- [ ] Implement responsive design for mobile

### Week 3: Purchase Flow & Access Control

#### Stripe Integration
- [ ] Update Stripe products via API for courses
- [ ] Implement `/api/stripe/create-checkout` endpoint
- [ ] Update webhook handler for course purchases
- [ ] Add purchase success/cancel pages
- [ ] Test payment flow with test cards

#### Access Control
- [ ] Create middleware for course access: `/middleware/course-access.ts`
- [ ] Implement `hasAccessToCourse(userId, courseId)` helper
- [ ] Add access checks to course pages
- [ ] Create "Upgrade to Access" paywall component
- [ ] Handle bundle access logic

#### Purchase UI
- [ ] Create `/components/payments/course-checkout-button.tsx`
- [ ] Create `/components/payments/bundle-checkout-button.tsx`
- [ ] Add loading states during checkout
- [ ] Implement error handling for failed payments
- [ ] Create purchase confirmation email template

### Week 4: Student Dashboard

#### Dashboard Pages
- [ ] Update `/app/(authenticated)/dashboard/page.tsx` - Overview
- [ ] Create `/app/(authenticated)/dashboard/courses/page.tsx` - My courses
- [ ] Create `/app/(authenticated)/dashboard/courses/[id]/page.tsx` - Course player
- [ ] Update navigation to include courses section

#### Dashboard Components
- [ ] Create `/components/dashboard/course-progress-card.tsx`
- [ ] Create `/components/dashboard/continue-learning.tsx`
- [ ] Create `/components/dashboard/recommended-courses.tsx`
- [ ] Create `/components/dashboard/achievement-badges.tsx`
- [ ] Update sidebar navigation with course links

#### Progress Tracking
- [ ] Add `progress` table to schema
- [ ] Create progress tracking server actions
- [ ] Implement progress bar component
- [ ] Add "Mark as Complete" functionality
- [ ] Calculate course completion percentage

## Phase 2: Core Learning Experience (Weeks 5-8)

### Week 5: Video Player Integration

#### Video Infrastructure
- [ ] Choose video platform (Mux vs Cloudflare Stream)
- [ ] Set up video service account and API keys
- [ ] Install video player library (`npm install @mux/mux-player-react` or similar)
- [ ] Create `/components/video/course-player.tsx` wrapper
- [ ] Implement video upload for instructors (later phase)

#### Video Features
- [ ] Add playback speed controls
- [ ] Implement video progress tracking
- [ ] Add chapter markers support
- [ ] Create fullscreen mode
- [ ] Add keyboard shortcuts (space=pause, arrows=seek)
- [ ] Save playback position per user

### Week 6: Interactive Module System

#### Core Interactive Components
- [ ] Install Monaco Editor: `npm install @monaco-editor/react`
- [ ] Install Chart.js: `npm install react-chartjs-2 chart.js`
- [ ] Install Markdown editor: `npm install @uiw/react-md-editor`

#### Tech Course Tools
- [ ] Create `/components/interactive/code-editor.tsx` with:
  - [ ] Syntax highlighting
  - [ ] Multiple language support
  - [ ] Run code functionality (client-side)
  - [ ] Reset to default button
  - [ ] Save progress locally
- [ ] Create `/components/interactive/code-output.tsx` - Console output display
- [ ] Create `/components/interactive/code-challenge.tsx` - Test runner UI

#### Finance Course Tools
- [ ] Create `/components/interactive/budget-calculator.tsx`
- [ ] Create `/components/interactive/investment-simulator.tsx`
- [ ] Create `/components/interactive/chart-builder.tsx`
- [ ] Add financial formula helpers

#### Business Course Tools
- [ ] Create `/components/interactive/template-editor.tsx`
- [ ] Create `/components/interactive/canvas-builder.tsx` - Business model canvas
- [ ] Create `/components/interactive/swot-analysis.tsx`

#### Quiz System
- [ ] Create `/components/interactive/quiz-question.tsx`
- [ ] Support multiple choice, true/false, code completion
- [ ] Add instant feedback on answers
- [ ] Track quiz scores in database
- [ ] Create quiz results summary

### Week 7: Reference Guide System

#### Markdown Rendering
- [ ] Create `/components/content/reference-viewer.tsx`
- [ ] Style markdown content for readability
- [ ] Add syntax highlighting for code blocks
- [ ] Implement table of contents generation
- [ ] Add copy code button to code blocks
- [ ] Create print-friendly styles

#### Content Management
- [ ] Create reference guide schema in database
- [ ] Build admin UI for editing guides (basic)
- [ ] Add search within reference guides
- [ ] Implement bookmarking functionality
- [ ] Add "Download as PDF" option (future)

### Week 8: AI Assistant Integration

#### AI Setup
- [ ] Install Vercel AI SDK: `npm install @ai-sdk/openai ai`
- [ ] Set up OpenAI API keys
- [ ] Create `/app/api/ai/chat/route.ts` endpoint
- [ ] Implement rate limiting for AI calls
- [ ] Add usage tracking for cost management

#### AI Features
- [ ] Create `/components/ai/course-assistant.tsx` chat interface
- [ ] Implement context-aware prompts per course category
- [ ] Add "Explain this code" functionality for tech courses
- [ ] Create "Check my answer" for exercises
- [ ] Build prompt templates for each course type
- [ ] Add AI response caching for common questions

#### AI Safety
- [ ] Implement content filtering
- [ ] Prevent AI from giving direct answers to assessments
- [ ] Add user feedback on AI responses
- [ ] Create moderation queue for flagged content

## Phase 3: Polish & Launch (Weeks 9-12)

### Week 9: Certificate System

#### Certificate Generation
- [ ] Design certificate template (PDF)
- [ ] Create `/actions/certificates.ts` with generation logic
- [ ] Add unique verification codes
- [ ] Implement `/certificates/verify/[code]` public page
- [ ] Store certificates in cloud storage

#### Certificate Features
- [ ] Add student name and course details
- [ ] Include completion date and score
- [ ] Generate shareable links
- [ ] Add LinkedIn sharing integration
- [ ] Create certificate gallery in profile

### Week 10: Reviews & Social Proof

#### Review System
- [ ] Add `reviews` table to schema
- [ ] Create `/components/reviews/review-form.tsx`
- [ ] Create `/components/reviews/review-list.tsx`
- [ ] Add star rating component
- [ ] Implement helpful/unhelpful voting
- [ ] Add review moderation queue

#### Social Features
- [ ] Add course enrollment counter
- [ ] Display "Students also bought" section
- [ ] Create success story carousel
- [ ] Add instructor ratings
- [ ] Implement review notifications

### Week 11: Instructor Dashboard

#### Instructor Onboarding
- [ ] Create instructor application form
- [ ] Build admin approval workflow
- [ ] Add instructor verification badges
- [ ] Create instructor guidelines page

#### Instructor Tools
- [ ] Create `/app/(authenticated)/instructor/page.tsx` dashboard
- [ ] Add course creation wizard (basic)
- [ ] Implement sales analytics dashboard
- [ ] Add student progress viewer
- [ ] Create payout management section
- [ ] Build content upload interface

### Week 12: Launch Preparation

#### Performance Optimization
- [ ] Implement image optimization for course thumbnails
- [ ] Add lazy loading for course grids
- [ ] Optimize bundle size with dynamic imports
- [ ] Set up CDN for static assets
- [ ] Implement caching strategies

#### Testing & QA
- [ ] Complete end-to-end purchase flow testing
- [ ] Test all interactive components across browsers
- [ ] Verify mobile responsiveness
- [ ] Load test with expected traffic
- [ ] Security audit for payment flow

#### Launch Tasks
- [ ] Set up production environment variables
- [ ] Configure production database
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Create launch announcement email
- [ ] Prepare customer support documentation
- [ ] Set up analytics tracking (PostHog/GA)
- [ ] Create sitemap and robots.txt
- [ ] Submit to search engines

## Post-Launch Priority Features

### Immediate (Week 13-14)
- [ ] Email notifications for purchases and progress
- [ ] Basic search functionality
- [ ] Course wishlist feature
- [ ] Referral program setup
- [ ] Bug fixes from user feedback

### Short-term (Month 2-3)
- [ ] Advanced filtering and sorting
- [ ] Discussion forums per course
- [ ] Live session scheduling
- [ ] Mobile app development
- [ ] Multi-language support

### Long-term (Month 4-6)
- [ ] Team/corporate features
- [ ] Advanced analytics for instructors
- [ ] Gamification system
- [ ] API for third-party integrations
- [ ] White-label options

## Development Guidelines

### AI Agent Utilization
1. Use AI for boilerplate generation (components, server actions)
2. Have AI write test cases for critical paths
3. Use AI for CSS/Tailwind styling suggestions
4. Get AI help with TypeScript types and interfaces
5. Ask AI to review code for best practices

### Priority Order
1. **Critical Path**: Browse → Purchase → Access → Learn
2. **Revenue Enablers**: Payment flow, course catalog
3. **Retention Features**: Interactive tools, progress tracking
4. **Growth Features**: Reviews, referrals, certificates

### Testing Strategy
- Unit tests for server actions
- Integration tests for purchase flow
- E2E tests for critical user journeys
- Manual testing for UI/UX
- Beta testing with 50 users pre-launch

### Performance Targets
- Page load: < 3 seconds
- Time to Interactive: < 5 seconds
- Lighthouse score: > 90
- Core Web Vitals: All green

---

*This implementation plan is a living document. Update checkboxes as tasks are completed and add new tasks as discovered.*