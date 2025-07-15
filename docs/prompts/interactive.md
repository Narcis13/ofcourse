# Master Prompt: Generate Interactive Learning Module HTML Page

## Core Mission
Transform the provided module outline into a fully interactive, single-page HTML learning experience for teenagers (15-18) learning web development. The output must be a complete, self-contained HTML file with embedded CSS and JavaScript that provides hands-on coding practice, quizzes, and real-time feedback.

## CRITICAL: Design System Consistency

You MUST use these EXACT CSS variables and styling patterns to ensure visual consistency across all modules:

```css
:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #a78bfa;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --dark: #1f2937;
    --light: #f3f4f6;
    --white: #ffffff;
    --code-bg: #1e293b;
    --border: #e5e7eb;
}

/* Dark mode variables */
body.dark-mode {
    --dark: #f3f4f6;
    --light: #1f2937;
    --white: #111827;
    --border: #374151;
    --code-bg: #0f172a;
    background: #0f172a;
    color: #f3f4f6;
}
```

## Required Page Structure

### 1. HTML Document Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module [X]: [Module Title]</title>
    <style>
        /* Complete CSS goes here - use provided design system */
    </style>
</head>
<body>
    <!-- Content structure below -->
</body>
</html>
```

### 2. Header Component (MUST INCLUDE)
```html
<header class="header">
    <div class="header-content">
        <div>
            <h1>Module [X]: [Catchy Title] [Relevant Emoji]</h1>
            <div class="header-subtitle">[Brief description]</div>
        </div>
        <button class="theme-toggle" onclick="toggleTheme()">
            <span class="toggle-icon">🌙</span>
        </button>
    </div>
    <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
    </div>
</header>
```

### 3. Main Layout Structure
```html
<div class="container">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
        <nav id="lessonNav">
            <!-- Generate nav items based on sections -->
        </nav>
    </aside>

    <!-- Content Area -->
    <main class="content">
        <!-- Lesson sections go here -->
    </main>
</div>
```

### 4. Achievement Popup (MUST INCLUDE)
```html
<div class="achievement" id="achievement">
    <h3>🏆 Achievement Unlocked!</h3>
    <p id="achievementText">JavaScript Master!</p>
</div>
```

## Component Templates to Use

### Interactive Code Editor
For EVERY code example that students should try:
```html
<div class="try-it-box">
    <h4>🎮 Try It Yourself!</h4>
    <p>[Instructions for the exercise]</p>
    <textarea class="code-editor" id="[unique-id]">[Starter code]</textarea>
    <button class="run-button" onclick="runCode('[unique-id]', '[output-id]')">
        ▶️ Run Code
    </button>
    <div class="output-box" id="[output-id]">Output will appear here...</div>
</div>
```

### Quiz Component
For concept checking:
```html
<div class="quiz-container">
    <div class="quiz-question">[Question text]</div>
    <label class="quiz-option" onclick="checkQuiz(this, '[correct-answer]')">
        <input type="radio" name="q[number]" value="[value]"> [Option text]
    </label>
    <!-- More options -->
    <div class="quiz-result" id="q[number]-result"></div>
</div>
```

### Spoiler/Hint Component
For additional information:
```html
<div class="spoiler">
    <div class="spoiler-header" onclick="toggleSpoiler(this)">
        💡 [Spoiler title]
    </div>
    <div class="spoiler-content">
        [Hidden content]
    </div>
</div>
```

### Code Block with Copy
For reference code:
```html
<div class="code-block">
    <button class="copy-button" onclick="copyCode(this)">Copy</button>
    <pre>[Code content]</pre>
</div>
```

## Required JavaScript Functions

Include these EXACT functions for consistency:

```javascript
// Navigation and progress tracking
function showSection(index) { /* Implementation */ }
function updateProgressBar() { /* Implementation */ }
function updateNavigation() { /* Implementation */ }

// Theme management
function toggleTheme() { /* Implementation */ }

// Code execution
function runCode(editorId, outputId) { /* Implementation */ }

// Interactive features
function copyCode(button) { /* Implementation */ }
function toggleSpoiler(header) { /* Implementation */ }
function checkQuiz(option, correctAnswer) { /* Implementation */ }
function showAchievement(text) { /* Implementation */ }

// Module completion
function completeModule() { /* Implementation */ }
```

## Content Transformation Rules

### 1. Section Structure
Each major concept becomes a section:
```html
<section class="lesson-section" id="section-[number]">
    <h2>[Emoji] [Section Title]</h2>
    <p>[Engaging introduction paragraph]</p>
    
    <!-- Concept explanation -->
    <!-- Interactive demo -->
    <!-- Practice exercise -->
    
    <div class="nav-buttons">
        <button class="nav-button" onclick="showSection([prev])">← Previous</button>
        <button class="nav-button" onclick="showSection([next])">Next: [Topic] →</button>
    </div>
</section>
```

### 2. Concept Teaching Pattern
For each concept:
1. **Explanation**: Brief, teen-friendly paragraph
2. **Visual/Analogy**: Relatable comparison
3. **Code Example**: Interactive or copyable
4. **Try It**: Hands-on exercise
5. **Check Understanding**: Quiz or challenge

### 3. Language Adaptation
- Convert formal language to conversational
- Add excitement: "Check this out!", "This is where it gets cool!"
- Include encouragement: "You've got this!", "Great job!"
- Use emojis strategically (not excessively)

### 4. Interactive Elements Rules
- **Every code concept** → Interactive editor
- **Every new syntax** → Copy-able example
- **Every complex topic** → Spoiler with extra help
- **Every section end** → Quiz or challenge
- **Major milestones** → Achievement trigger

## Styling Requirements

### Typography
- Headers: Bold, colored with `var(--primary)`
- Body text: 1.6 line-height for readability
- Code: Monospace font, syntax-highlighted appearance

### Spacing
- Sections: 2rem padding
- Between elements: 1rem margin
- Cards/boxes: 1.5rem padding

### Visual Hierarchy
- Primary actions: `var(--primary)` background
- Success states: `var(--success)` color
- Errors: `var(--danger)` color
- Hover states: All interactive elements

### Responsive Design
- Mobile breakpoint: 768px
- Stack layout on mobile
- Touch-friendly button sizes

## Module-Specific Adaptations

Based on the module topic, include relevant:
- **HTML modules**: Live preview iframes
- **CSS modules**: Style manipulation demos
- **JavaScript modules**: Console output displays
- **Project modules**: Progress checklists

## Output Requirements

1. **Single HTML file** with all CSS and JavaScript embedded
2. **No external dependencies** (everything self-contained)
3. **Fully functional** dark mode with localStorage
4. **Progress tracking** that persists
5. **All code examples** must be runnable/testable
6. **Mobile responsive** design
7. **Achievement system** for engagement

## Quality Checklist

Before generating the final HTML, ensure:
- [ ] All interactive elements work
- [ ] Dark mode toggles properly
- [ ] Progress saves to localStorage
- [ ] Code editors have unique IDs
- [ ] Quiz answers are correct
- [ ] Navigation flows logically
- [ ] Achievements trigger appropriately
- [ ] Mobile layout is tested
- [ ] No placeholder content remains
- [ ] All emojis are appropriate

## Generation Process

1. Parse the module outline for structure
2. Create navigation based on main topics
3. Transform each topic into an interactive section
4. Add appropriate exercises for the skill level
5. Include topic-specific interactive demos
6. Ensure consistent styling throughout
7. Add progress tracking and achievements
8. Test all interactive features

---

## How to Use This Prompt

1. Copy this entire prompt
2. Add the module outline at the end
3. The AI will generate a complete HTML file
4. The output will match the Module 5 style exactly

## Input Format
```
[PASTE THE ABOVE PROMPT]

---
HERE IS THE MODULE OUTLINE TO TRANSFORM:

[PASTE YOUR MODULE CONTENT/OUTLINE HERE]
```

## Expected Output
A complete, interactive HTML file (3000-5000 lines) with:
- Polished, modern UI matching Module 5
- All concepts made interactive
- Working code editors and demos
- Progress tracking and achievements
- Fully responsive design
- Dark mode support
- Professional learning experience