# Module 1: The Coder's Toolkit
## Complete Reference Guide

### 📚 How to Use This Guide
This reference guide is designed to complement your interactive Module 1 HTML page. Use it to:
- Dive deeper into concepts you practiced online
- Review code examples with detailed explanations
- Find solutions to exercises and understand why they work
- Study offline or prepare for projects
- Get extra help with troubleshooting

---

## Table of Contents

1. [Introduction: Why Your Dev Environment Matters](#introduction)
2. [HTML Page Overview & Navigation](#html-overview)
3. [Chapter 1: VS Code - Your Code Editor](#chapter-1)
4. [Chapter 2: Mastering VS Code Shortcuts](#chapter-2)
5. [Chapter 3: Project Organization](#chapter-3)
6. [Chapter 4: Terminal Fundamentals](#chapter-4)
7. [Chapter 5: Git - Version Control Magic](#chapter-5)
8. [Chapter 6: GitHub Pages Deployment](#chapter-6)
9. [Chapter 7: Final Challenge Walkthrough](#chapter-7)
10. [Interactive Exercise Solutions](#exercise-solutions)
11. [Quiz Answer Explanations](#quiz-explanations)
12. [Quick Reference Guide](#quick-reference)
13. [Project Checklist](#project-checklist)
14. [Troubleshooting Guide](#troubleshooting)
15. [Next Steps](#next-steps)

---

## Introduction: Why Your Dev Environment Matters {#introduction}

Welcome to the complete reference guide for Module 1: The Coder's Toolkit! 🎉

Think about it - every YouTube video starts with someone setting up their camera and lighting. Every TikTok creator has their ring light positioned just right. Every gamer has their setup optimized for peak performance. As a developer, your "setup" is your development environment, and getting it right from the start will make everything else SO much easier.

### What You Built in the Interactive Module

In the HTML interactive page, you:
- ✅ Set up VS Code with essential extensions
- ✅ Practiced keyboard shortcuts that make you code faster
- ✅ Organized your first project with proper file structure
- ✅ Ran terminal commands like a hacker
- ✅ Used Git to save snapshots of your code
- ✅ Deployed your first website to the actual internet!

That's HUGE! You went from zero to having a live website in one module. 

### How This Guide Enhances Your Learning

While the interactive HTML page gave you hands-on practice, this guide provides:
- **The "why" behind everything** - Understanding not just what to do, but why it matters
- **Detailed breakdowns** of every code example and command
- **Extended examples** that go beyond the basics
- **Troubleshooting help** for when things go wrong (and they will!)
- **Pro tips** that the HTML couldn't fit
- **Offline reference** you can study anywhere

---

## HTML Page Overview & Navigation {#html-overview}

### Section-by-Section Breakdown

Your interactive HTML page is divided into 8 sections, each building on the last:

1. **Section 0: Welcome & Overview** → Sets the stage, quick quiz
2. **Section 1: VS Code Setup** → Installing and configuring your editor
3. **Section 2: Power User Shortcuts** → Keyboard magic
4. **Section 3: Project Organization** → File structure best practices
5. **Section 4: Terminal Basics** → Command line introduction
6. **Section 5: Git Fundamentals** → Version control basics
7. **Section 6: Deploy Your First Page** → Going live with GitHub Pages
8. **Section 7: Final Challenge** → Putting it all together

### Interactive Elements You Encountered

#### Code Editors:
- **vscode-demo**: Your first HTML preview
- **shortcut-practice**: Multi-cursor editing playground  
- **terminal-sim**: Safe terminal command practice
- **git-practice**: Git workflow simulation
- **deploy-html**: Website preview before deployment
- **final-challenge**: Personal card creation

#### Quizzes:
- **q0**: Why developers need special setups
- **q3**: File naming best practices
- **q7a**: VS Code shortcut recall
- **q7b**: Git command knowledge

#### Try-It Boxes:
Each section included hands-on practice that let you experiment safely before doing it "for real"

---

## Chapter 1: VS Code - Your Code Editor {#chapter-1}

### What You Discovered in Section 1

In the interactive module, you clicked through to Section 1 and found VS Code described as "Microsoft Word, but for code." You installed it, added extensions, and even wrote your first HTML that displayed in a preview. Remember that moment when you clicked "Preview HTML" and saw your message appear? That was your first taste of web development!

### The Theory Behind It

#### What IS a Code Editor?

A code editor is more than just a place to type - it's an intelligent assistant that:
- **Highlights syntax**: Colors your code so you can spot errors instantly
- **Auto-completes**: Suggests code as you type (like your phone keyboard, but smarter)
- **Manages files**: Keeps your entire project organized in one place
- **Integrates tools**: Connects to Git, terminals, debuggers, and more

Think of it like this: You could write an essay in Notepad, but why would you when Google Docs exists? Same thing here - you COULD write code in Notepad, but VS Code makes you 10x more productive.

### Breaking Down the Interactive Exercise

```html
<!-- This is the code you worked with in vscode-demo: -->
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>I'm learning to code with VS Code!</p>
</body>
</html>

<!-- Let's understand each line: -->
<!-- Line 1: <!DOCTYPE html> - Tells the browser "this is HTML5" -->
<!-- Line 2: <html> - The container for everything -->
<!-- Line 3: <head> - Invisible stuff like the title -->
<!-- Line 4: <title> - What shows in the browser tab -->
<!-- Line 6: <body> - Everything visible on the page -->
<!-- Line 7: <h1> - A main heading (biggest text) -->
<!-- Line 8: <p> - A paragraph of normal text -->
```

### Why Your Solution Worked

When you changed "I'm learning to code with VS Code!" to your own message and hit preview, several things happened:
1. VS Code recognized this as HTML (from the file extension and DOCTYPE)
2. It created a temporary web server on your computer
3. It rendered your HTML into visual elements
4. It displayed the result in an iframe (a webpage within a webpage)

This is exactly how real web development works - you write code, preview it locally, make changes, and repeat until it's perfect!

### Essential Extensions Deep Dive

In the HTML, you saw a list of extensions. Here's WHY each one matters:

#### 1. **Live Server** 
- **What it does**: Creates a local web server that auto-refreshes
- **Why you need it**: Without it, you'd have to manually refresh your browser every time you change code
- **Pro tip**: Right-click any HTML file → "Open with Live Server" 

#### 2. **Prettier**
- **What it does**: Auto-formats your code to be consistent
- **Why you need it**: Messy code = bugs. Clean code = fewer bugs
- **Pro tip**: Set it to format on save (Ctrl+, → search "format on save" → check the box)

#### 3. **Auto Rename Tag**
- **What it does**: When you change `<div>` to `<section>`, it automatically changes `</div>` to `</section>`
- **Why you need it**: HTML tags must match, and doing it manually is error-prone
- **Real scenario**: Imagine changing 50 divs to sections manually... nightmare!

#### 4. **Color Highlight**
- **What it does**: Shows actual colors in your CSS
- **Why you need it**: `#6366f1` means nothing, but seeing purple? That helps!
- **Example**: In your CSS, `background: #6366f1` will show a purple square

#### 5. **GitLens**
- **What it does**: Shows Git history inline with your code
- **Why you need it**: See who changed what and when (spoiler: it's usually you)
- **Coming up**: We'll use this heavily in Chapter 5

### Taking It Further

Now that you understand VS Code basics, try these power moves:

1. **Split Screen Editing**: Drag a tab to the side to see two files at once (HTML + CSS)
2. **Integrated Terminal**: View → Terminal (or Ctrl+`) to run commands without leaving VS Code
3. **Zen Mode**: Ctrl+K Z hides everything except your code (great for focus)

### VS Code Settings You Should Change

Go to File → Preferences → Settings (or Ctrl+,) and search for these:

```json
{
  "editor.wordWrap": "on",              // Wraps long lines
  "editor.minimap.enabled": false,      // Hides the tiny code map (confusing for beginners)
  "editor.fontSize": 16,                // Easier on the eyes
  "files.autoSave": "afterDelay",       // Auto-saves your work
  "workbench.colorTheme": "Dark+ (default dark)"  // Easy on the eyes
}
```

---

## Chapter 2: Mastering VS Code Shortcuts {#chapter-2}

### What You Discovered in Section 2

Remember in the HTML when you pressed Ctrl+D multiple times and selected multiple "console.log" statements? That blew your mind, right? That's called multi-cursor editing, and it's just the beginning of your journey to coding like you're in The Matrix.

### The Theory Behind Shortcuts

#### Why Shortcuts Matter SO Much

Every time you reach for your mouse, you lose 2-3 seconds. Doesn't sound like much? Let's do the math:
- Average coding session: 2 hours
- Mouse reaches per hour: ~100
- Time lost: 200-300 seconds = 3-5 minutes per session
- Per week: 21-35 minutes
- Per month: 1.5-2.5 HOURS

That's a whole movie worth of time just moving your hand to the mouse!

### Breaking Down the Interactive Exercise

```javascript
// This is the code you worked with in shortcut-practice:
// Try these shortcuts here!
// 1. Select this line and press Ctrl/Cmd + D to select the next "line"
// 2. Select a line and press Alt/Option + Up to move it
// 3. Type "div" and press Tab to see Emmet in action

function sayHello() {
    console.log("Hello, World!");
    console.log("Hello, World!");
    console.log("Hello, World!");
}

// What each shortcut actually does:
// Ctrl+D: Adds next occurrence to selection (multi-cursor magic)
// Alt+Up/Down: Physically moves the line (great for reorganizing)
// Tab after abbreviation: Triggers Emmet expansion
```

### The Complete Shortcut Arsenal

#### Tier 1: Use These CONSTANTLY
| Windows/Linux | Mac | What It Does | When to Use |
|---------------|-----|--------------|-------------|
| Ctrl+S | Cmd+S | Save file | After EVERY change |
| Ctrl+Z | Cmd+Z | Undo | When you mess up |
| Ctrl+/ | Cmd+/ | Toggle comment | Testing code |
| Ctrl+C/V | Cmd+C/V | Copy/Paste | Moving code around |

#### Tier 2: The Power Moves
| Windows/Linux | Mac | What It Does | Real Example |
|---------------|-----|--------------|--------------|
| Ctrl+D | Cmd+D | Select next match | Rename variables |
| Alt+Click | Option+Click | Add cursor | Edit multiple lines |
| Ctrl+Shift+L | Cmd+Shift+L | Select all matches | Change all at once |
| Alt+Up/Down | Option+Up/Down | Move line | Reorganize code |

#### Tier 3: The Pro Level
| Windows/Linux | Mac | What It Does | Mind-Blowing Use |
|---------------|-----|--------------|------------------|
| Ctrl+Shift+P | Cmd+Shift+P | Command palette | Do ANYTHING |
| Ctrl+P | Cmd+P | Quick open file | Navigate instantly |
| Ctrl+G | Cmd+G | Go to line | Jump to errors |
| F2 | F2 | Rename symbol | Rename everywhere |

### Emmet: The Hidden Superpower

Remember when the HTML mentioned typing `!` + Tab? That's Emmet, and it's INSANE:

```html
<!-- Type this: -->
!
<!-- Press Tab, get this: -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

<!-- More Emmet magic: -->
div.container>h1{Title}+p{Content}
<!-- Becomes: -->
<div class="container">
    <h1>Title</h1>
    <p>Content</p>
</div>

<!-- Create a list with 5 items: -->
ul>li*5
<!-- Becomes: -->
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

### Multi-Cursor Mastery

The HTML showed you basic multi-cursor with Ctrl+D. Here's the full power:

#### Scenario 1: Changing Multiple Variables
```javascript
// Before: You have userId in 10 places, need to change to customerId
let userId = 123;
console.log(userId);
updateUser(userId);
// ... 7 more uses of userId

// Technique:
// 1. Click on first userId
// 2. Ctrl+D nine times (selects all 10)
// 3. Type customerId
// 4. All 10 change instantly!
```

#### Scenario 2: Adding to Multiple Lines
```css
/* Before: Plain color values */
color: red;
background: blue;
border-color: green;

/* Technique:
1. Alt+Click at the end of each line
2. Type " !important;"
3. All three lines updated! */

/* After: */
color: red !important;
background: blue !important;
border-color: green !important;
```

### Practice Drills

Set a timer for 5 minutes and practice these:

1. **The Rename Drill**: Create 5 variables with bad names, rename them all at once
2. **The Comment Toggle**: Write 10 lines of code, comment out every other line using shortcuts only
3. **The Emmet Challenge**: Create a navbar with logo and 5 links using one Emmet abbreviation
4. **The Multi-Cursor Marathon**: Add semicolons to 20 lines simultaneously

---

## Chapter 3: Project Organization {#chapter-3}

### What You Discovered in Section 3

In the HTML interactive page, you learned that bad file organization is like a messy room where you can't find anything. You saw the file naming rules and that beautiful file tree structure. Now let's understand WHY these patterns exist and how they'll save you hours of frustration.

### The Theory Behind File Organization

#### Why Organization Matters More Than You Think

Imagine this: It's 2 AM, your project is due tomorrow, and you need to find that one CSS file that styles your navigation. Is it called:
- `style.css`?
- `styles2.css`?
- `nav.css`?
- `Navigation Styles.css`?
- `final-final-FINAL.css`?

Bad organization isn't just annoying - it's a productivity killer. Good organization means:
- Finding files in seconds, not minutes
- Understanding projects you haven't touched in months
- Collaborating without confusion
- Debugging faster because you know where everything lives

### Breaking Down the File Naming Rules

The HTML showed you these rules. Let's understand the WHY:

```
📋 File Naming Rules:
1. Use lowercase letters: index.html ✅ Index.HTML ❌
   WHY: Different operating systems treat case differently
   
2. No spaces! Use hyphens: my-page.html ✅ my page.html ❌
   WHY: Spaces become %20 in URLs (ugly and error-prone)
   
3. Be descriptive: contact-form.css ✅ style2.css ❌
   WHY: You'll have 50+ files eventually - which would YOU rather debug?
   
4. Use folders to group related files
   WHY: Mental organization = faster development
   
5. Keep it consistent throughout your project
   WHY: Patterns reduce cognitive load
```

### The Perfect Project Structure Explained

Remember that file tree from the HTML? Here's what each part does:

```
my-portfolio/
│
├── index.html          # The homepage - ALWAYS named index.html
├── README.md          # Project description (for GitHub)
│
├── css/               # ALL stylesheets go here
│   ├── style.css      # Main styles
│   ├── responsive.css # Mobile/tablet styles
│   └── animations.css # Keep special effects separate
│
├── js/                # ALL JavaScript files
│   ├── script.js      # Main functionality
│   ├── darkmode.js    # Feature-specific files
│   └── validation.js   # Form checking, etc.
│
├── images/            # ALL images
│   ├── hero-bg.jpg    # Descriptive names!
│   ├── profile.png    # Not IMG_1234.PNG
│   └── icons/         # Subfolders for organization
│       ├── github.svg
│       └── linkedin.svg
│
├── pages/             # Other HTML pages
│   ├── about.html
│   ├── projects.html
│   └── contact.html
│
└── assets/            # Other resources
    ├── fonts/         # Custom fonts
    └── downloads/     # PDFs, etc.
```

### Advanced Organization Patterns

#### Pattern 1: Feature-Based Structure (for larger projects)
```
src/
├── features/
│   ├── auth/
│   │   ├── login.html
│   │   ├── login.css
│   │   └── login.js
│   ├── dashboard/
│   │   ├── dashboard.html
│   │   ├── dashboard.css
│   │   └── dashboard.js
```

#### Pattern 2: Component-Based (modern approach)
```
components/
├── navbar/
│   ├── navbar.html
│   ├── navbar.css
│   └── navbar.js
├── footer/
│   ├── footer.html
│   ├── footer.css
│   └── footer.js
```

### Real-World Naming Conventions

#### For CSS Classes:
```css
/* BEM (Block Element Modifier) - Industry standard */
.card {}              /* Block */
.card__title {}       /* Element */
.card--featured {}    /* Modifier */

/* Real example: */
.nav {}              /* Navigation block */
.nav__link {}        /* Link inside nav */
.nav__link--active {} /* Active state */
```

#### For JavaScript:
```javascript
// Variables: camelCase
let userName = "Alice";
let isLoggedIn = false;

// Constants: UPPER_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";

// Functions: camelCase verbs
function calculateTotal() {}
function getUserData() {}

// Classes: PascalCase
class UserAccount {}
class ShoppingCart {}
```

### Common Mistakes and How to Fix Them

#### Mistake 1: The "Version Number" Trap
```
❌ BAD:
style.css
style2.css
style-final.css
style-final-FINAL.css
style-final-actually-final.css

✅ GOOD:
style.css (use Git for version control!)
```

#### Mistake 2: The "Everything in Root" Chaos
```
❌ BAD:
my-project/
├── index.html
├── about.html
├── style.css
├── about-style.css
├── script.js
├── about-script.js
├── hero-image.jpg
├── profile.jpg
└── (50 more files...)

✅ GOOD:
(Use the folder structure shown above)
```

### Setting Up Your First Project

Here's a script to create a perfect project structure:

```bash
# Run these commands in terminal:
mkdir my-awesome-project
cd my-awesome-project
mkdir css js images pages
touch index.html README.md
touch css/style.css
touch js/script.js
```

Or use this VS Code trick:
1. Create a new folder
2. Open it in VS Code
3. In the file explorer, right-click → New File
4. Type: `css/style.css` (creates folder AND file!)

---

## Chapter 4: Terminal Fundamentals {#chapter-4}

### What You Discovered in Section 4

In the HTML, you played with the terminal simulator and ran commands like `pwd` and `ls`. You discovered that the terminal is just "texting your computer to do things." That's actually a perfect analogy! Let's dive deeper into this powerful tool.

### The Theory Behind the Terminal

#### Terminal vs. GUI: The Real Difference

Think of it this way:
- **GUI (Graphical User Interface)**: Like using Instagram - tap, swipe, click
- **CLI (Command Line Interface)**: Like sending very specific texts - type exactly what you want

The terminal seems harder at first, but it's actually faster for many tasks:

| Task | GUI Method | Terminal Method |
|------|------------|-----------------|
| Create 10 folders | Right-click → New Folder × 10 | `mkdir folder{1..10}` |
| Find all .js files | Search → Filter → Wait... | `find . -name "*.js"` |
| Rename 50 files | Click each one... | One command with wildcards |

### Breaking Down Your Terminal Practice

```bash
# This is what you tried in terminal-sim:
pwd
# Output: /Users/student/projects/my-website
# This means: "Print Working Directory" - shows where you are

ls  
# Output: index.html  style.css  images/  README.md
# This means: "List" - shows what's in current folder

mkdir my-project
# Output: Directory created successfully
# This means: "Make Directory" - creates a new folder
```

### The Essential Command Toolkit

#### Navigation Commands
```bash
# Where am I?
pwd                    # Print working directory

# What's here?
ls                     # List files
ls -la                 # List ALL files (including hidden)
ls -lah                # Human-readable sizes

# Moving around
cd projects            # Go into 'projects' folder
cd ..                  # Go up one level
cd ~                   # Go to home directory
cd -                   # Go to previous location
```

#### File & Folder Operations
```bash
# Creating
mkdir new-folder       # Make directory
touch new-file.txt     # Create empty file
echo "Hello" > file.txt # Create file with content

# Copying
cp file.txt backup.txt # Copy file
cp -r folder backup/   # Copy folder (recursive)

# Moving/Renaming  
mv old.txt new.txt     # Rename file
mv file.txt folder/    # Move file into folder

# Deleting (BE CAREFUL!)
rm file.txt            # Remove file
rm -r folder           # Remove folder
```

### Real Terminal Scenarios

#### Scenario 1: Setting Up a New Project
```bash
# The manual way (what beginners do):
# 1. Open file explorer
# 2. Right-click → New Folder → "my-project"
# 3. Enter folder
# 4. Right-click → New Folder → "css"
# 5. Right-click → New Folder → "js"
# 6. Right-click → New Folder → "images"
# 7. Right-click → New File → "index.html"
# Time: 2-3 minutes

# The terminal way (what pros do):
mkdir my-project && cd my-project
mkdir css js images
touch index.html css/style.css js/script.js
# Time: 10 seconds
```

#### Scenario 2: Cleaning Up Downloads
```bash
# Move all PDFs to Documents
mv ~/Downloads/*.pdf ~/Documents/

# Delete all files older than 30 days
find ~/Downloads -mtime +30 -delete

# See what's taking up space
du -sh ~/Downloads/*
```

### Terminal Tips & Tricks

#### Tab Completion (THE BEST FEATURE)
```bash
# Instead of typing:
cd my-very-long-folder-name

# Type:
cd my[TAB]
# Terminal completes it for you!
```

#### Command History
```bash
# See recent commands
history

# Search history
history | grep "git"

# Re-run last command
!!

# Re-run specific command
!457  # Runs command #457 from history
```

#### Shortcuts That Save Time
| Shortcut | What It Does |
|----------|-------------|
| Ctrl+C | Cancel current command |
| Ctrl+L | Clear screen |
| Ctrl+A | Jump to start of line |
| Ctrl+E | Jump to end of line |
| Ctrl+R | Search command history |
| ↑/↓ | Navigate through history |

### Understanding File Paths

The HTML didn't explain this, but it's crucial:

#### Absolute Paths (full address)
```bash
/Users/yourname/projects/website/index.html
# Starts with / (root)
# Works from anywhere
# Like a full street address
```

#### Relative Paths (directions from here)
```bash
./index.html          # In current folder
../index.html         # In parent folder  
../../images/logo.png # Up 2 levels, then into images
# Like saying "two blocks north, then turn left"
```

### Terminal Superpowers

#### Finding Files
```bash
# Find all HTML files
find . -name "*.html"

# Find files containing "TODO"
grep -r "TODO" .

# Find and count JavaScript files
find . -name "*.js" | wc -l
```

#### Batch Operations
```bash
# Add .backup to all CSS files
for file in *.css; do cp "$file" "$file.backup"; done

# Convert all PNG to JPG (requires ImageMagick)
mogrify -format jpg *.png
```

### Common Terminal Mistakes

#### Mistake 1: Wrong Directory
```bash
# You think you're in projects/
rm -rf *  # DELETES EVERYTHING IN CURRENT FOLDER
# But you were in Documents/ 😱

# ALWAYS check with pwd first!
```

#### Mistake 2: Spaces in Names
```bash
# This fails:
cd My Projects  # Sees "My" and "Projects" as separate

# Do this instead:
cd "My Projects"  # Quotes preserve spaces
cd My\ Projects   # Or escape the space
```

---

## Chapter 5: Git - Version Control Magic {#chapter-5}

### What You Discovered in Section 5

Remember in the HTML when you ran Git commands and saw "Initialized empty Git repository"? That was the beginning of your journey with the most important tool in modern development. Git is like having infinite save points in a video game - you can always go back if something breaks!

### The Theory Behind Git

#### What Git REALLY Does

Let's break down what Git actually is:
- **Version Control System**: Tracks changes to your files over time
- **Time Machine**: Go back to any point in your project's history
- **Collaboration Tool**: Multiple people can work on the same code
- **Backup System**: Your code exists in multiple places
- **History Book**: See who changed what and when

Think of it like Google Docs' version history, but for your entire project and WAY more powerful.

### Breaking Down Your Git Practice

```bash
# This is what you did in git-practice:
git init
# What happened: Created a hidden .git folder that tracks everything

git status
# What happened: Git checked what's new/changed/deleted

git add index.html  
# What happened: Told Git "I want to save this file's current state"

git commit -m "Add homepage"
# What happened: Created a permanent snapshot with a description
```

### Git Concepts Explained Like You're 15

#### The Three States of Git

Think of Git like packing for a trip:

1. **Working Directory** (Your Room)
   - All your files as they currently exist
   - You're actively making changes here
   - Like clothes scattered on your bed

2. **Staging Area** (Your Suitcase)
   - Files you've decided to include in next commit
   - You've picked what to pack
   - `git add` moves files here

3. **Repository** (Your Locked Suitcase)
   - Permanent snapshots of your project
   - Can't be changed once committed
   - `git commit` seals the suitcase

```bash
# Visual representation:
Working Directory → Staging Area → Repository
     (edit)         (git add)     (git commit)
```

### Essential Git Commands Explained

#### Starting a Project
```bash
# Option 1: Start fresh
git init
# Creates .git folder, starts tracking

# Option 2: Clone existing
git clone https://github.com/user/repo.git
# Downloads project with all history
```

#### Daily Workflow
```bash
# 1. Check what's changed
git status
# Shows: modified files, new files, deleted files

# 2. Stage changes
git add filename.txt      # Specific file
git add .                # All changes
git add *.css           # All CSS files

# 3. Commit with message
git commit -m "Add navigation menu"
# Creates permanent snapshot

# 4. Push to GitHub
git push origin main
# Uploads to cloud
```

#### Viewing History
```bash
# See commit history
git log                  # Full details
git log --oneline       # Condensed view
git log --graph         # Visual branch structure

# See what changed
git diff                # Current changes
git diff --staged       # What's about to be committed
```

### Writing PERFECT Commit Messages

The HTML showed you good vs bad messages. Here's the complete guide:

#### The Formula
```
[Type]: [What] [Where]

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
```

#### Examples
```bash
# ✅ GOOD Messages:
git commit -m "feat: Add dark mode toggle to navbar"
git commit -m "fix: Correct form validation for email field"
git commit -m "docs: Update README with installation steps"

# ❌ BAD Messages:
git commit -m "fixed stuff"
git commit -m "asddfasdf"
git commit -m "work"
```

### Git Branching (Advanced but Important)

Branches let you work on features without breaking the main code:

```bash
# Create new branch
git branch feature-dark-mode
git checkout feature-dark-mode
# OR shortcut:
git checkout -b feature-dark-mode

# Work on feature...
# Add commits...

# Merge back to main
git checkout main
git merge feature-dark-mode
```

Think of branches like:
- Main branch = Published YouTube video
- Feature branch = Your editing timeline
- You edit separately, then publish when ready

### Common Git Scenarios

#### Scenario 1: "I Messed Up My Last Commit"
```bash
# Fix the last commit message
git commit --amend -m "Better message"

# Add forgotten file to last commit
git add forgotten-file.js
git commit --amend --no-edit
```

#### Scenario 2: "I Need to Undo Changes"
```bash
# Discard changes to specific file
git checkout -- filename.txt

# Undo last commit but keep changes
git reset --soft HEAD~1

# NUCLEAR OPTION: Undo everything
git reset --hard HEAD
```

#### Scenario 3: "I Committed Secret Data"
```bash
# If you haven't pushed yet:
git reset --soft HEAD~1
# Edit file to remove secrets
git add .
git commit -m "Add config without secrets"

# If you already pushed: 
# 1. Change the secret immediately
# 2. Use git filter-branch (advanced)
# 3. Consider the secret compromised
```

### Git + GitHub Workflow

#### First Time Setup
```bash
# 1. Configure Git
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# 2. Create repo on GitHub (via website)

# 3. Connect local to remote
git remote add origin https://github.com/yourusername/repo.git

# 4. Push code
git push -u origin main
```

#### Daily GitHub Workflow
```bash
# Morning: Get latest changes
git pull

# Work on code...

# Evening: Share your changes
git add .
git commit -m "feat: Complete login page"
git push
```

### Visual Git Workflow

```
Local Computer                    GitHub
--------------                    ------
                                        
   You Edit Files                      
        ↓                              
   git add .                           
        ↓                              
   git commit -m "msg"                 
        ↓                              
   git push ----------------------→ Updates Repository
                                           ↓
   git pull ←---------------------- Others Can See
```

### Git Best Practices

1. **Commit Often**: Small, focused commits are better than giant ones
2. **Pull Before Push**: Always get latest changes before pushing
3. **Branch for Features**: Don't work directly on main
4. **Write Clear Messages**: Your future self will thank you
5. **Don't Commit Secrets**: No passwords, API keys, etc.
6. **.gitignore is Your Friend**: Tell Git what to ignore

### The .gitignore File

Create this in your project root:

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/

# Logs
*.log
```

---

## Chapter 6: GitHub Pages Deployment {#chapter-6}

### What You Discovered in Section 6

This was the BIG moment in your HTML journey - when you clicked "Preview Your Site" and saw that gradient background with "I'm on the Internet!" You were looking at exactly what the world would see when you deployed. That excitement you felt? That's what keeps developers coding!

### The Theory Behind GitHub Pages

#### What IS GitHub Pages?

GitHub Pages is:
- **Free hosting** for static websites (HTML, CSS, JS)
- **Automatic deployment** from your repository
- **Custom domain support** (yourname.com instead of username.github.io)
- **HTTPS included** (secure by default)
- **No server management** (GitHub handles everything)

Think of it like:
- GitHub = Google Drive for code
- GitHub Pages = Automatically turning your Google Doc into a public website

### Breaking Down the Deployment Process

Remember that deployment checklist from the HTML? Here's what each step actually does:

```bash
# Step 1: Create GitHub account
# Why: GitHub hosts both your code AND your website

# Step 2: Create repository named [username].github.io
# Why: This special name tells GitHub to create a website

# Step 3: Initialize Git
git init
# Why: Start tracking your project

# Step 4: Add files
git add .
# Why: Prepare all files for upload

# Step 5: Commit
git commit -m "Initial commit"
# Why: Create snapshot to upload

# Step 6: Add remote
git remote add origin https://github.com/username/username.github.io.git
# Why: Tell Git where to upload

# Step 7: Push
git push -u origin main
# Why: Upload everything to GitHub

# Step 8: Wait... 
# GitHub builds your site (takes 1-10 minutes)

# Step 9: Visit https://username.github.io
# Your site is LIVE!
```

### The Code You Deployed

Let's understand that beautiful deploy-html code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            /* This gradient is what made it look so cool: */
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        h1 { font-size: 3em; }
        .date { opacity: 0.8; }
    </style>
</head>
<body>
    <h1>🎉 I'm on the Internet!</h1>
    <p>This is my first website, deployed with GitHub Pages!</p>
    <p class="date">Launched on: <span id="date"></span></p>
    <script>
        // This JavaScript runs when page loads:
        document.getElementById('date').textContent = new Date().toLocaleDateString();
        // Automatically shows today's date!
    </script>
</body>
</html>
```

### GitHub Pages Deep Dive

#### Repository Types

1. **User Site** (username.github.io)
   - One per account
   - Lives at https://username.github.io
   - Must be named exactly username.github.io

2. **Project Sites** (any other repo)
   - Unlimited per account
   - Lives at https://username.github.io/project-name
   - Enable in Settings → Pages

#### File Structure Requirements

```
username.github.io/
├── index.html    # MUST have this - it's your homepage
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── logo.png
└── README.md     # Optional but recommended
```

### Advanced GitHub Pages Features

#### Custom Domain Setup

Want yourname.com instead of username.github.io?

1. Buy domain (Namecheap, Google Domains, etc.)
2. Create `CNAME` file in your repo:
   ```
   yourcoolsite.com
   ```
3. Configure DNS:
   ```
   A Records → 185.199.108.153
            → 185.199.109.153
            → 185.199.110.153
            → 185.199.111.153
   ```
4. Wait 24-48 hours for propagation

#### Jekyll Integration (Static Site Generator)

GitHub Pages has Jekyll built-in:

```yaml
# _config.yml
title: My Amazing Site
description: Learning web development!
theme: minima

# Now you can use:
# - Markdown files that become HTML
# - Layouts and includes
# - Blog functionality
```

### Deployment Strategies

#### Strategy 1: Direct to Main (Simple)
```bash
# Edit files
git add .
git commit -m "Update homepage"
git push
# Site updates in ~1 minute
```

#### Strategy 2: Branch Deployment (Safer)
```bash
# Work on feature branch
git checkout -b new-feature
# Make changes...
git add .
git commit -m "Add new feature"

# Test locally first
# Open index.html in browser

# Merge to main when ready
git checkout main
git merge new-feature
git push
```

#### Strategy 3: GitHub Actions (Automated)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
```

### Troubleshooting Deployment

#### Problem: "404 Not Found"
**Causes & Solutions:**
```bash
# 1. Wrong repository name
# Must be exactly: username.github.io

# 2. No index.html
# Must have index.html in root

# 3. Not enabled in settings
# Go to Settings → Pages → Enable

# 4. Just deployed
# Wait up to 10 minutes
```

#### Problem: "Site Not Updating"
**Causes & Solutions:**
```bash
# 1. Browser cache
# Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

# 2. Git didn't push
git status  # Check for uncommitted changes
git log origin/main  # Verify push happened

# 3. Build failed
# Check Actions tab on GitHub for errors
```

### Your First Portfolio Structure

Here's a complete portfolio ready for GitHub Pages:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Web Developer</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    
    <section id="home">
        <h1>Hi, I'm [Your Name]</h1>
        <p>Future Web Developer</p>
    </section>
    
    <section id="projects">
        <h2>My Projects</h2>
        <div class="project-grid">
            <!-- Projects will go here -->
        </div>
    </section>
    
    <section id="contact">
        <h2>Get In Touch</h2>
        <a href="mailto:your.email@example.com">Email Me</a>
    </section>
    
    <script src="js/script.js"></script>
</body>
</html>
```

### Beyond Basic Deployment

#### Adding Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

#### SEO Optimization
```html
<head>
    <!-- Better search results -->
    <meta name="description" content="Web developer portfolio">
    <meta property="og:title" content="Your Name - Portfolio">
    <meta property="og:image" content="https://yoursite.com/preview.jpg">
    <meta property="og:description" content="Check out my projects!">
</head>
```

---

## Chapter 7: Final Challenge Walkthrough {#chapter-7}

### What You Discovered in Section 7

This was your victory lap! You answered quiz questions testing your shortcut knowledge and Git commands, then created a personal card component. When you saw "Challenge Master! 🎯", that was validation that you'd truly learned the material.

### Breaking Down the Quizzes

#### Quiz 1: VS Code Shortcuts
**Question**: "Which VS Code shortcut comments out a line?"
**Answer**: Ctrl+/ (or Cmd+/)

Why this matters:
- Commenting is how you temporarily disable code
- Essential for debugging ("Is this line causing the problem?")
- Faster than manually typing `//` or `<!-- -->`
- Works in every language VS Code supports

#### Quiz 2: Git Commands  
**Question**: "What Git command saves a snapshot of your code?"
**Answer**: git commit

Why this matters:
- `git commit` is the core of version control
- It's not `git save` (common beginner guess)
- It's not `git push` (that uploads to GitHub)
- Understanding this = understanding Git's purpose

### The Personal Card Challenge Deep Dive

Let's analyze what made a successful solution:

```html
<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f0f0f0;
        }
        .card {
            /* Your challenge was to style this! */
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
        }
        h1 {
            color: #6366f1;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            line-height: 1.6;
        }
        .fun-fact {
            background: #f3f4f6;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Alex Johnson</h1>
        <p>Aspiring web developer who loves creating things that live on the internet.</p>
        <div class="fun-fact">
            <strong>Fun fact:</strong> I can solve a Rubik's cube in under 2 minutes!
        </div>
    </div>
</body>
</html>
```

### Why This Challenge Tests Everything

The personal card challenge cleverly tested:

1. **HTML Structure**: Proper tags and hierarchy
2. **CSS Styling**: Making it visually appealing
3. **CSS Layout**: Flexbox for centering
4. **Design Sense**: Spacing, colors, shadows
5. **Personalization**: Adding your own content

### Taking It Further: Card Variations

#### Variation 1: Animated Card
```css
.card {
    /* Previous styles... */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}
```

#### Variation 2: Gradient Background
```css
body {
    /* Replace background: #f0f0f0 with: */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
    /* Add backdrop effect: */
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.9);
}
```

#### Variation 3: Social Links
```html
<div class="card">
    <h1>Your Name</h1>
    <p>Your description</p>
    <div class="fun-fact">
        <strong>Fun fact:</strong> Your fun fact!
    </div>
    <div class="social-links">
        <a href="#">GitHub</a>
        <a href="#">LinkedIn</a>
        <a href="#">Twitter</a>
    </div>
</div>

<style>
.social-links {
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.social-links a {
    color: #6366f1;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border: 2px solid #6366f1;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.social-links a:hover {
    background: #6366f1;
    color: white;
}
</style>
```

### Complete Module Achievement

When you clicked "Complete Module!" and saw the celebration, you had:

✅ Set up a professional development environment
✅ Learned essential keyboard shortcuts
✅ Organized files properly
✅ Used terminal commands
✅ Understood Git version control
✅ Deployed a live website
✅ Created a styled component

That's not just "learning to code" - that's becoming a developer!

---

## Interactive Exercise Solutions {#exercise-solutions}

### Exercise: First HTML Preview (vscode-demo)
**Location**: Section 1, vscode-demo editor

**The Challenge**: Modify the HTML to display your own message

**Starting Code**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>I'm learning to code with VS Code!</p>
</body>
</html>
```

**Solution Example**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>I'm Sarah and I'm building my first website!</p>
    <p>This is amazing - I can see my changes instantly!</p>
</body>
</html>
```

**Step-by-Step Explanation**:
1. Changed the paragraph text to personalize it
2. Added a second paragraph to test multiple elements
3. The preview updates showing both paragraphs
4. This demonstrates how HTML structures content

**Common Mistakes**:
- Forgetting to close tags: `<p>Text` (missing `</p>`)
- Not changing anything (the exercise asks for modification)
- Deleting essential structure tags like `<body>`

### Exercise: Shortcut Practice (shortcut-practice)
**Location**: Section 2, shortcut-practice editor

**The Challenge**: Use multi-cursor selection to edit multiple lines

**Starting Code**:
```javascript
function sayHello() {
    console.log("Hello, World!");
    console.log("Hello, World!");
    console.log("Hello, World!");
}
```

**Solution Process**:
1. Click on first "console.log"
2. Press Ctrl+D (Cmd+D) twice more
3. Type "alert" to replace all three
4. Result:
```javascript
function sayHello() {
    alert("Hello, World!");
    alert("Hello, World!");
    alert("Hello, World!");
}
```

**Why This Works**:
- Multi-cursor editing saves time
- Changes multiple identical code pieces simultaneously
- Reduces errors from manual repetition

### Exercise: Terminal Simulator (terminal-sim)
**Location**: Section 4, terminal-sim editor

**Commands to Practice**:
```bash
pwd
# Shows: /Users/student/projects/my-website

ls
# Shows: index.html  style.css  images/  README.md

mkdir my-awesome-folder
# Shows: Directory created successfully

cd my-awesome-folder
# No output (success)

pwd
# Would show: /Users/student/projects/my-website/my-awesome-folder
```

**What You Learned**:
- Navigation between directories
- Creating new folders via command line
- Checking current location
- Silent success (no news is good news)

### Exercise: Git Workflow (git-practice)
**Location**: Section 5, git-practice editor

**The Complete Workflow**:
```bash
# Initialize repository
git init
# Output: Initialized empty Git repository in /Users/student/projects/.git/

# Check what's new
git status
# Output: Untracked files: index.html, style.css

# Stage specific file
git add index.html
# No output (success)

# Commit with message
git commit -m "Add homepage"
# Output: [main (root-commit) 1a2b3c4] Add homepage
#         1 file changed, 10 insertions(+)
```

**Understanding Each Step**:
1. `git init`: Creates .git folder, starts tracking
2. `git status`: Shows Git's view of your files
3. `git add`: Selects files for next commit
4. `git commit`: Saves permanent snapshot

### Exercise: Deployment Preview (deploy-html)
**Location**: Section 6, deploy-html editor

**What Made It Special**:
- Gradient background using CSS
- Dynamic date using JavaScript
- Complete, deploy-ready structure
- Professional appearance

**Key Learning**:
This preview showed exactly what visitors would see - reinforcing that your local code becomes a real website accessible worldwide.

---

## Quiz Answer Explanations {#quiz-explanations}

### Quiz: Why Developers Need Special Setups
**Location**: Section 0, Question q0

**Question**: Why do developers need a special setup?

**Correct Answer**: To write code faster and catch mistakes early

**Why This Is Correct**:
- Development tools provide syntax highlighting (catches typos)
- Auto-completion speeds up coding
- Integrated debugging finds errors before deployment
- Version control prevents lost work

**Why Other Options Are Wrong**:
- **"Just to look cool"**: While it might look cool, that's not the purpose
- **"Because websites won't work without it"**: Technically, you could use Notepad

**Remember This Because**: Your tools are like a chef's knives - the right ones make you faster and more precise.

### Quiz: File Naming Best Practices
**Location**: Section 3, Question q3

**Question**: Which filename follows best practices?

**Correct Answer**: hero-section.css

**Why This Is Correct**:
- All lowercase (works on all systems)
- Hyphen instead of space (URL-friendly)
- Descriptive name (you know what it styles)
- Proper extension (.css for stylesheets)

**Why Other Options Are Wrong**:
- **"Hero Section.css"**: Space will become %20 in URLs
- **"herosection.css"**: Hard to read without separator
- **"HERO_SECTION.CSS"**: Uppercase can cause issues on some systems

**Remember This Because**: You'll have hundreds of files eventually - good names help you find them fast.

### Quiz: VS Code Shortcut Knowledge
**Location**: Section 7, Question q7a

**Question**: Which VS Code shortcut comments out a line?

**Correct Answer**: Ctrl+/ (or Cmd+/)

**Why This Is Correct**:
- Universal shortcut across most editors
- Works for any language (HTML, CSS, JS)
- Toggles comments on/off

**Why Other Options Are Wrong**:
- **Ctrl+C**: That's copy
- **Ctrl+X**: That's cut

**Remember This Because**: You'll comment code constantly while debugging.

### Quiz: Git Command Mastery
**Location**: Section 7, Question q7b

**Question**: What Git command saves a snapshot of your code?

**Correct Answer**: git commit

**Why This Is Correct**:
- "Commit" means "save this state permanently"
- Creates a checkpoint you can return to
- Core Git functionality

**Why Other Options Are Wrong**:
- **"git save"**: This command doesn't exist
- **"git push"**: This uploads to remote repository, doesn't create snapshot

**Remember This Because**: Commit early, commit often - it's your safety net.

---

## Quick Reference Guide {#quick-reference}

### VS Code Shortcuts Cheat Sheet
```
ESSENTIAL SHORTCUTS
Windows/Linux         Mac               Action
─────────────────────────────────────────────────
Ctrl+S               Cmd+S             Save file
Ctrl+Z               Cmd+Z             Undo
Ctrl+Shift+Z         Cmd+Shift+Z       Redo
Ctrl+/               Cmd+/             Toggle comment
Ctrl+D               Cmd+D             Select next occurrence
Ctrl+F               Cmd+F             Find
Ctrl+H               Cmd+H             Find & Replace
Alt+Up/Down          Option+Up/Down    Move line
Ctrl+Space           Cmd+Space         Trigger suggestions
Ctrl+`               Cmd+`             Toggle terminal
Ctrl+P               Cmd+P             Quick file open
Ctrl+Shift+P         Cmd+Shift+P       Command palette
```

### Terminal Commands Reference
```bash
# NAVIGATION
pwd                  # Print working directory
ls                   # List files
ls -la               # List all files (including hidden)
cd folder            # Change directory
cd ..                # Go up one level
cd ~                 # Go to home directory

# FILE OPERATIONS
touch file.txt       # Create file
mkdir folder         # Make directory
cp source dest       # Copy file
mv old new           # Move/rename
rm file              # Remove file
rm -rf folder        # Remove folder (careful!)

# VIEWING FILES
cat file.txt         # Display file contents
less file.txt        # Page through file
head -10 file.txt    # Show first 10 lines
tail -10 file.txt    # Show last 10 lines
```

### Git Commands Reference
```bash
# SETUP
git init             # Initialize repository
git clone URL        # Clone existing repo
git remote add origin URL  # Connect to GitHub

# DAILY WORKFLOW
git status           # Check changes
git add .            # Stage all changes
git add file.txt     # Stage specific file
git commit -m "msg"  # Commit with message
git push             # Upload to remote
git pull             # Download from remote

# HISTORY
git log              # View commits
git log --oneline    # Compact view
git diff             # See changes
git diff --staged    # See staged changes

# BRANCHING
git branch           # List branches
git branch name      # Create branch
git checkout name    # Switch branch
git checkout -b name # Create & switch
git merge branch     # Merge branch

# UNDOING
git checkout -- file # Discard changes
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD    # Discard all changes
```

### HTML Structure Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h1>Main Heading</h1>
            <p>Content goes here</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Your Name</p>
    </footer>
    
    <script src="js/script.js"></script>
</body>
</html>
```

### CSS Starter Template
```css
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* Layout */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Typography */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

/* Utilities */
.text-center { text-align: center; }
.mt-1 { margin-top: 1rem; }
.mt-2 { margin-top: 2rem; }
```

### File Naming Conventions
```
GOOD NAMES              BAD NAMES
──────────────────────────────────────
index.html              Index.HTML
about-us.html           about us.html
style.css               styles.CSS  
dark-mode.js            darkMode.js (inconsistent)
profile-image.jpg       IMG_1234.jpg
contact-form.css        style2.css
```

---

## Project Checklist {#project-checklist}

### Environment Setup ✓
- [ ] VS Code installed
- [ ] Essential extensions added:
  - [ ] Live Server
  - [ ] Prettier
  - [ ] Auto Rename Tag
  - [ ] Color Highlight
  - [ ] GitLens
- [ ] Settings configured (font size, auto-save, etc.)

### Skills Mastered ✓
- [ ] Can navigate VS Code interface
- [ ] Use at least 5 keyboard shortcuts fluently
- [ ] Understand file naming conventions
- [ ] Create proper project folder structure
- [ ] Run basic terminal commands
- [ ] Navigate directories in terminal

### Git Proficiency ✓
- [ ] Initialize a Git repository
- [ ] Stage and commit changes
- [ ] Write meaningful commit messages
- [ ] View Git history
- [ ] Connect to GitHub remote
- [ ] Push code to GitHub

### Deployment Success ✓
- [ ] GitHub account created
- [ ] Repository properly named (username.github.io)
- [ ] First website deployed
- [ ] Can update and redeploy
- [ ] Understand the deployment process

### Final Challenge ✓
- [ ] Completed VS Code shortcut quiz
- [ ] Completed Git command quiz
- [ ] Created personal card component
- [ ] Card includes proper HTML structure
- [ ] Card has custom CSS styling
- [ ] All module objectives achieved

---

## Troubleshooting Guide {#troubleshooting}

### VS Code Issues

#### Problem: "VS Code won't open"
**Solutions**:
1. **Windows**: Check if antivirus is blocking it
2. **Mac**: Security settings → Allow apps from identified developers
3. **All**: Reinstall from official website only

#### Problem: "Extensions aren't working"
**Solutions**:
```bash
# 1. Reload VS Code
Ctrl+Shift+P → "Reload Window"

# 2. Check extension is enabled
Extensions sidebar → Find extension → Enable

# 3. Check for conflicts
Disable all extensions, enable one by one
```

#### Problem: "Live Server not starting"
**Solutions**:
1. Make sure you're opening an HTML file
2. Check if port 5500 is already in use
3. Try: Right-click HTML → "Open with Live Server"
4. Alternative: Use Python server:
   ```bash
   python -m http.server 8000
   ```

### Terminal Issues

#### Problem: "Command not found"
**Solutions**:
```bash
# 1. Check you're in the right directory
pwd

# 2. Check the command spelling
# Common mistakes: "gti" instead of "git"

# 3. Check if program is installed
which git     # Should show path
which node    # For Node.js
```

#### Problem: "Permission denied"
**Solutions**:
```bash
# 1. Don't use sudo unless absolutely necessary

# 2. Check file ownership
ls -la filename

# 3. Fix permissions (careful!)
chmod 644 filename  # Read for all, write for owner
```

### Git Issues

#### Problem: "Git not recognized"
**Solutions**:
1. **Install Git**:
   - Windows: gitforwindows.org
   - Mac: Install Xcode Command Line Tools
   - Linux: `sudo apt-get install git`

2. **Verify installation**:
   ```bash
   git --version
   ```

#### Problem: "Failed to push to GitHub"
**Solutions**:
```bash
# 1. Check remote URL
git remote -v

# 2. Authentication issues
# Use personal access token, not password

# 3. Pull before push
git pull origin main
git push origin main

# 4. Force push (DANGEROUS - only if you're sure)
git push -f origin main
```

#### Problem: "Merge conflicts"
**Solutions**:
1. Don't panic!
2. Open conflicted files
3. Look for:
   ```
   <<<<<<< HEAD
   Your changes
   =======
   Their changes
   >>>>>>> branch-name
   ```
4. Delete the markers, keep what you want
5. Stage and commit

### GitHub Pages Issues

#### Problem: "404 Page Not Found"
**Checklist**:
```bash
# 1. Repository name MUST be: username.github.io
# 2. File MUST be: index.html (not Index.html)
# 3. Check Settings → Pages → Source is set
# 4. Wait 10 minutes for initial deployment
```

#### Problem: "CSS/JS not loading"
**Solutions**:
```html
<!-- 1. Check paths - use relative paths -->
<link rel="stylesheet" href="css/style.css">  <!-- Good -->
<link rel="stylesheet" href="/css/style.css"> <!-- May fail -->

<!-- 2. Check file names match exactly (case-sensitive) -->
<!-- If file is style.css, don't link Style.css -->

<!-- 3. Check browser console for errors -->
<!-- F12 → Console tab -->
```

### General Debugging Process

1. **Read the error message** (seriously, read it)
2. **Google the exact error** (copy-paste it)
3. **Check Stack Overflow** (someone had this problem)
4. **Try the simplest solution first**
5. **Make one change at a time**
6. **Test after each change**
7. **Keep notes on what worked**

### When All Else Fails

1. **Restart VS Code** (fixes 30% of problems)
2. **Restart your computer** (fixes another 20%)
3. **Re-clone your repository** (fresh start)
4. **Ask for help with**:
   - Exact error message
   - What you were trying to do
   - What you've already tried
   - Screenshots if possible

---

## Next Steps {#next-steps}

### Congratulations! 🎉

You've completed Module 1 and have:
- A fully configured development environment
- Your first website live on the internet
- Understanding of essential developer tools
- Foundation for everything else you'll learn

### What's Coming in Module 2

**HTML Deep Dive** - You'll learn:
- Semantic HTML elements
- Forms and inputs
- Tables and lists
- Accessibility basics
- SEO fundamentals

### Practice Projects for This Week

#### Project 1: Enhanced Personal Page
Expand your deployed website:
```html
<!-- Add these sections to your index.html -->
<section id="skills">
    <h2>Skills I'm Learning</h2>
    <ul>
        <li>HTML & CSS</li>
        <li>JavaScript</li>
        <li>Git Version Control</li>
    </ul>
</section>

<section id="goals">
    <h2>My Coding Goals</h2>
    <ol>
        <li>Build 5 websites</li>
        <li>Learn React</li>
        <li>Contribute to open source</li>
    </ol>
</section>
```

#### Project 2: Multi-Page Site
Create additional pages:
1. Create `about.html`
2. Create `projects.html`
3. Link them from `index.html`
4. Deploy updates to GitHub Pages

#### Project 3: Git Practice
1. Create a new repository called "git-practice"
2. Make 10 meaningful commits
3. Try creating and merging a branch
4. Write descriptive commit messages

### Resources for Continued Learning

#### Official Documentation
- VS Code: code.visualstudio.com/docs
- Git: git-scm.com/doc
- GitHub Pages: pages.github.com

#### Interactive Practice
- GitHub Learning Lab: lab.github.com
- VS Code Can Do That: vscodecandothat.com
- Learn Git Branching: learngitbranching.js.org

#### Community Help
- Stack Overflow (search before asking)
- Reddit: r/webdev, r/learnprogramming
- Discord servers for web developers
- Local meetups and hackathons

### Building Your Developer Mindset

1. **Code Every Day**: Even 15 minutes counts
2. **Read Others' Code**: Learn from examples
3. **Break Things**: Experiment fearlessly
4. **Fix Things**: Debugging is learning
5. **Share Progress**: Tweet, blog, or show friends
6. **Stay Curious**: Ask "How does this work?"

### Final Thoughts

Remember when you started this module and didn't know what VS Code was? Now you have:
- A professional development environment
- Version control for your code
- A live website on the internet
- Foundation skills every developer needs

You're not "learning to code" anymore - you ARE a developer. You write code, use professional tools, and deploy real websites. The only difference between you and senior developers? Experience and practice.

Keep building. Keep learning. Keep pushing that code.

Welcome to the developer community! 🚀

---

## Appendix: Additional Resources

### VS Code Themes
```json
// Try these popular themes:
"workbench.colorTheme": "One Dark Pro"
"workbench.colorTheme": "Dracula"
"workbench.colorTheme": "Material Theme"
"workbench.colorTheme": "Monokai"
```

### Git Aliases for Speed
```bash
# Add to ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    lg = log --oneline --graph
```

### Terminal Customization
```bash
# Add to ~/.bashrc or ~/.zshrc
alias ll='ls -la'
alias gs='git status'
alias gc='git commit -m'
alias gp='git push'
```

Remember: This reference guide is your companion throughout your coding journey. Come back to it whenever you need clarification, want to go deeper, or need troubleshooting help. You've got this! 💪