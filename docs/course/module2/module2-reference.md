# Module 2: Building the Skeleton - HTML for Structure
## Complete Reference Guide

### 📚 How to Use This Guide
This reference guide is designed to complement your interactive Module 2 HTML page. Use it to:
- Dive deeper into HTML concepts you practiced online
- Review all code examples with detailed explanations
- Find solutions to exercises and understand why they work
- Study offline or prepare for projects
- Get extra help with troubleshooting HTML issues

---

## Table of Contents

1. [Introduction: Why HTML is the Foundation](#introduction)
2. [HTML Page Overview & Navigation](#html-overview)
3. [Chapter 1: Understanding Semantic HTML](#chapter-1)
4. [Chapter 2: HTML Document Structure](#chapter-2)
5. [Chapter 3: Headings & Text Content](#chapter-3)
6. [Chapter 4: Links & Navigation](#chapter-4)
7. [Chapter 5: Forms & User Input](#chapter-5)
8. [Chapter 6: Lists & Tables](#chapter-6)
9. [Chapter 7: Media & Embeds](#chapter-7)
10. [Chapter 8: Building Your Portfolio](#chapter-8)
11. [Interactive Exercise Solutions](#exercise-solutions)
12. [Quiz Answer Explanations](#quiz-explanations)
13. [Quick Reference Guide](#quick-reference)
14. [Project Checklist](#project-checklist)
15. [Troubleshooting Guide](#troubleshooting)
16. [Next Steps](#next-steps)

---

## Introduction: Why HTML is the Foundation {#introduction}

Welcome to your complete HTML reference guide! 🎉

Think about your favorite website - TikTok, YouTube, Discord, whatever. Strip away all the colors, animations, and fancy features. What's left? The structure. The skeleton. That's HTML!

HTML (HyperText Markup Language) is literally the foundation of EVERY website on the internet. Without it, the web would just be one massive text file with no structure, no links, no images - basically, a digital nightmare.

### What You Built in the Interactive Module

In the HTML interactive page, you:
- ✅ Converted non-semantic HTML to semantic tags
- ✅ Built complete document structures from scratch
- ✅ Created navigation menus with different types of links
- ✅ Designed and validated forms with multiple input types
- ✅ Organized data with lists and tables
- ✅ Embedded images and videos properly
- ✅ Combined everything into a complete portfolio structure

That's not just "learning HTML" - that's becoming a web developer!

### How This Guide Enhances Your Learning

While the interactive HTML page gave you hands-on practice, this guide provides:
- **Deep understanding** of why HTML works the way it does
- **Complete code breakdowns** line by line
- **Extended examples** the HTML page couldn't fit
- **Common mistakes** and how to avoid them
- **Accessibility insights** to make your sites usable by everyone
- **SEO tips** to help Google find your content
- **Pro patterns** used by experienced developers

---

## HTML Page Overview & Navigation {#html-overview}

### Section-by-Section Breakdown

Your interactive HTML page is divided into 9 sections, each building essential skills:

1. **Section 0: Introduction to HTML** → Understanding what HTML is and does
2. **Section 1: Semantic HTML** → Writing meaningful, not just functional code
3. **Section 2: Document Structure** → The blueprint every HTML page follows
4. **Section 3: Headings & Text** → Organizing content hierarchically
5. **Section 4: Links & Navigation** → Connecting pages and sites
6. **Section 5: Forms & Inputs** → Collecting user data properly
7. **Section 6: Lists & Tables** → Structuring information clearly
8. **Section 7: Media & Embeds** → Adding visual and audio content
9. **Section 8: Final Portfolio Project** → Combining all skills

### Interactive Elements You Encountered

#### Code Editors:
- **semantic-editor**: Converting div-soup to semantic HTML
- **structure-editor**: Building complete HTML documents
- **headings-editor**: Creating blog post structures
- **nav-editor**: Building navigation menus
- **form-editor**: Designing contact forms
- **table-editor**: Creating skills tables
- **media-editor**: Working with images and videos
- **portfolio-editor**: The complete portfolio project

#### Quizzes:
- **q0**: What HTML stands for
- **q4**: Link attributes for new tabs
- **q8**: Proper navigation semantics

#### Interactive Demos:
- Form validation demonstration
- Visual semantic structure examples
- Live HTML preview functionality

---

## Chapter 1: Understanding Semantic HTML {#chapter-1}

### What You Discovered in Section 1

Remember when you clicked on the spoiler "What does semantic even mean?" and discovered it means "meaningful"? That was your first step toward writing professional HTML. You learned that semantic HTML uses tags that describe WHAT the content is, not just how it looks.

### The Theory Behind Semantic HTML

#### Why Semantics Matter More Than You Think

Semantic HTML is like the difference between:
- Labeling moving boxes as "Stuff 1," "Stuff 2," "Stuff 3" 
- vs. "Kitchen," "Bedroom," "Electronics"

Which would you rather deal with when unpacking?

Here's what semantic HTML does for you:
1. **Search Engine Optimization (SEO)**: Google understands `<article>` better than `<div class="content">`
2. **Accessibility**: Screen readers can navigate semantic structure
3. **Maintenance**: Other developers (including future you) understand the code instantly
4. **Future-proofing**: New devices/platforms can interpret semantic meaning

### Breaking Down the Interactive Exercise

```html
<!-- This is what you started with in semantic-editor: -->
<div class="top">
    <h1>Welcome to My Site</h1>
    <div class="menu">
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </div>
</div>

<div class="content">
    <div class="post">
        <h2>My First Post</h2>
        <p>This is my article content.</p>
    </div>
</div>

<div class="bottom">
    <p>&copy; 2024 My Site</p>
</div>

<!-- This is what it should become: -->
<header>
    <h1>Welcome to My Site</h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
</header>

<main>
    <article>
        <h2>My First Post</h2>
        <p>This is my article content.</p>
    </article>
</main>

<footer>
    <p>&copy; 2024 My Site</p>
</footer>
```

### Why Your Solution Worked

Each semantic tag has a specific purpose:
- `<header>`: Contains introductory content or navigation
- `<nav>`: Specifically for navigation links
- `<main>`: The main content of the page (only ONE per page!)
- `<article>`: Self-contained content that could stand alone
- `<footer>`: Footer information like copyright, links, etc.

### Complete List of Semantic HTML5 Elements

```html
<!-- Sectioning Elements -->
<header>    <!-- Page or section header -->
<nav>       <!-- Navigation links -->
<main>      <!-- Main content (one per page!) -->
<article>   <!-- Self-contained content -->
<section>   <!-- Thematic grouping of content -->
<aside>     <!-- Sidebar/related content -->
<footer>    <!-- Page or section footer -->

<!-- Text Content -->
<h1> to <h6>   <!-- Headings (hierarchy matters!) -->
<p>            <!-- Paragraphs -->
<blockquote>   <!-- Long quotations -->
<figure>       <!-- Self-contained content with caption -->
<figcaption>   <!-- Caption for figure -->

<!-- Inline Text Semantics -->
<a>          <!-- Hyperlinks -->
<em>         <!-- Emphasis (usually italic) -->
<strong>     <!-- Strong importance (usually bold) -->
<small>      <!-- Side comments/fine print -->
<cite>       <!-- Citation/reference -->
<code>       <!-- Code snippets -->
<time>       <!-- Time/date -->
<mark>       <!-- Highlighted/marked text -->

<!-- Forms -->
<form>       <!-- Form container -->
<label>      <!-- Label for form control -->
<input>      <!-- Input field -->
<button>     <!-- Clickable button -->
<select>     <!-- Dropdown list -->
<textarea>   <!-- Multi-line text input -->
<fieldset>   <!-- Group of related controls -->
<legend>     <!-- Caption for fieldset -->

<!-- Lists -->
<ul>         <!-- Unordered list -->
<ol>         <!-- Ordered list -->
<li>         <!-- List item -->
<dl>         <!-- Description list -->
<dt>         <!-- Description term -->
<dd>         <!-- Description details -->

<!-- Media -->
<img>        <!-- Images -->
<audio>      <!-- Sound content -->
<video>      <!-- Video content -->
<picture>    <!-- Responsive images container -->
```

### Real-World Semantic HTML Pattern

Here's how a real blog post would be structured:

```html
<article>
    <header>
        <h1>Learning Web Development in 2024</h1>
        <p>By <cite>Sarah Chen</cite> on <time datetime="2024-01-15">January 15, 2024</time></p>
    </header>
    
    <section>
        <h2>Why Now is the Perfect Time</h2>
        <p>The web development landscape has never been more exciting...</p>
        <blockquote>
            "The best time to plant a tree was 20 years ago. The second best time is now."
            <cite>- Chinese Proverb</cite>
        </blockquote>
    </section>
    
    <section>
        <h2>Getting Started</h2>
        <p>Here's what you'll need to begin your journey:</p>
        <ul>
            <li>A computer (any kind!)</li>
            <li>Internet connection</li>
            <li>Curiosity and persistence</li>
        </ul>
    </section>
    
    <footer>
        <p>Tagged: <mark>web development</mark>, <mark>beginner</mark>, <mark>2024</mark></p>
    </footer>
</article>
```

### Taking It Further: ARIA Labels

When semantic HTML isn't enough, ARIA (Accessible Rich Internet Applications) labels help:

```html
<!-- When you need more context -->
<nav aria-label="Main navigation">
    <!-- Main site navigation -->
</nav>

<nav aria-label="Breadcrumb">
    <!-- Breadcrumb navigation -->
</nav>

<!-- For screen reader announcements -->
<div role="alert" aria-live="polite">
    Form submitted successfully!
</div>
```

---

## Chapter 2: HTML Document Structure {#chapter-2}

### What You Discovered in Section 2

In the interactive module, you saw that tree structure showing how every HTML document is organized. You learned that it's like a recipe - certain ingredients must be present in the right order. Remember building your first complete document from scratch? That was you creating the foundation every website needs!

### The Theory Behind Document Structure

#### The Anatomy of an HTML Document

Every HTML document is like a formal letter - it has required parts in a specific order:

```html
<!DOCTYPE html>                           <!-- 1. Document type declaration -->
<html lang="en">                         <!-- 2. Root element with language -->
    <head>                               <!-- 3. Metadata container -->
        <meta charset="UTF-8">           <!-- 4. Character encoding -->
        <meta name="viewport"            <!-- 5. Responsive viewport -->
              content="width=device-width, initial-scale=1.0">
        <title>Page Title</title>        <!-- 6. Page title -->
    </head>
    <body>                               <!-- 7. Visible content -->
        <!-- All visible content goes here -->
    </body>
</html>
```

### Deep Dive: Each Component Explained

#### 1. DOCTYPE Declaration
```html
<!DOCTYPE html>
```
- Tells browsers "This is HTML5"
- Must be the VERY first line
- Not technically an HTML tag
- Case-insensitive but convention is uppercase DOCTYPE

#### 2. HTML Element
```html
<html lang="en">
```
- Root element containing everything
- `lang` attribute is CRUCIAL for:
  - Screen readers (pronunciation)
  - Search engines (language targeting)
  - Translation tools
  - Spell checkers

Common language codes:
- `en` - English
- `es` - Spanish  
- `fr` - French
- `de` - German
- `ja` - Japanese
- `zh` - Chinese

#### 3. The Head Section
The `<head>` contains metadata - data ABOUT your page:

```html
<head>
    <!-- Character Set - ALWAYS first -->
    <meta charset="UTF-8">
    
    <!-- Viewport - Makes site mobile-friendly -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page Description - Shows in search results -->
    <meta name="description" content="Learn web development with hands-on projects">
    
    <!-- Keywords - Less important now but still used -->
    <meta name="keywords" content="web development, HTML, CSS, JavaScript">
    
    <!-- Author -->
    <meta name="author" content="Your Name">
    
    <!-- Social Media Preview (Open Graph) -->
    <meta property="og:title" content="My Portfolio">
    <meta property="og:description" content="Check out my web development projects">
    <meta property="og:image" content="https://example.com/preview.jpg">
    
    <!-- Favicon (tab icon) -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Page Title - Shows in browser tab -->
    <title>My Portfolio | Web Developer</title>
</head>
```

### Complete Professional HTML Template

Here's a production-ready template combining everything:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Essential Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Portfolio of [Your Name], a web developer specializing in modern, responsive websites.">
    <meta name="keywords" content="web developer, portfolio, HTML, CSS, JavaScript">
    <meta name="author" content="Your Name">
    
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourwebsite.com/">
    <meta property="og:title" content="Your Name | Web Developer">
    <meta property="og:description" content="Check out my portfolio and recent projects.">
    <meta property="og:image" content="https://yourwebsite.com/preview.jpg">
    
    <!-- Twitter Card -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yourwebsite.com/">
    <meta property="twitter:title" content="Your Name | Web Developer">
    <meta property="twitter:description" content="Check out my portfolio and recent projects.">
    <meta property="twitter:image" content="https://yourwebsite.com/preview.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- Title -->
    <title>Your Name | Web Developer Portfolio</title>
</head>
<body>
    <!-- Skip to main content link for accessibility -->
    <a href="#main" class="skip-link">Skip to main content</a>
    
    <!-- Header -->
    <header>
        <nav aria-label="Main navigation">
            <!-- Navigation here -->
        </nav>
    </header>
    
    <!-- Main Content -->
    <main id="main">
        <!-- Page content here -->
    </main>
    
    <!-- Footer -->
    <footer>
        <!-- Footer content here -->
    </footer>
    
    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>
```

### Common Document Structure Mistakes

#### Mistake 1: Wrong Charset Placement
```html
<!-- ❌ WRONG - Title before charset -->
<head>
    <title>My Page</title>
    <meta charset="UTF-8">
</head>

<!-- ✅ CORRECT - Charset first -->
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
```

#### Mistake 2: Multiple Main Elements
```html
<!-- ❌ WRONG - Multiple mains -->
<main>Section 1</main>
<main>Section 2</main>

<!-- ✅ CORRECT - One main, multiple sections -->
<main>
    <section>Section 1</section>
    <section>Section 2</section>
</main>
```

#### Mistake 3: Missing Language Attribute
```html
<!-- ❌ WRONG - No language -->
<html>

<!-- ✅ CORRECT - Language specified -->
<html lang="en">
```

---

## Chapter 3: Headings & Text Content {#chapter-3}

### What You Discovered in Section 3

In the HTML interactive page, you saw the visual hierarchy of headings from H1 to H6. You learned the golden rule: only ONE H1 per page! You also created a blog post structure with proper headings and text formatting.

### The Theory Behind Headings

#### Headings Are Your Document Outline

Think of headings like an essay outline:
- **H1**: The essay title
- **H2**: Main sections
- **H3**: Subsections
- **H4-H6**: Further subdivisions (rarely needed)

This isn't just about size - it's about MEANING and STRUCTURE!

### Breaking Down Your Blog Post Exercise

```html
<!-- What you built in headings-editor -->
<!DOCTYPE html>
<html>
<head>
    <title>My Blog Post</title>
</head>
<body>
    <article>
        <h1>My Journey Learning to Code</h1>
        <p>By <strong>Your Name</strong> on <time>January 1, 2024</time></p>
        
        <h2>Why I Started</h2>
        <p>I wanted to build <em>amazing</em> things that could help people...</p>
        
        <h2>What I've Learned So Far</h2>
        <p>HTML is actually not that scary! It's just like writing a document.</p>
        
        <h3>The Basics</h3>
        <p>Tags, elements, attributes - they all make sense now.</p>
        
        <h2>My Goals</h2>
        <p>By the end of this year, I want to build a full web application!</p>
        
        <blockquote>
            "Every expert was once a beginner."
        </blockquote>
    </article>
</body>
</html>
```

### Complete Text Formatting Reference

#### Structural Text Elements

```html
<!-- Paragraphs - Your basic text block -->
<p>This is a paragraph. Use it for any block of text.</p>

<!-- Headings - Document structure -->
<h1>Main Page Title (ONE per page!)</h1>
<h2>Major Section</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Rarely used</h5>
<h6>Almost never used</h6>

<!-- Blockquote - For quotations -->
<blockquote cite="https://source.com">
    <p>The Web is the most powerful communication medium ever created.</p>
    <footer>— <cite>Tim Berners-Lee</cite></footer>
</blockquote>

<!-- Preformatted text - Preserves spacing -->
<pre>
    function hello() {
        console.log("Spacing is preserved!");
    }
</pre>

<!-- Horizontal rule - Thematic break -->
<hr>
```

#### Inline Text Elements

```html
<!-- Emphasis (usually italic) -->
<p>This is <em>emphasized</em> text.</p>

<!-- Strong importance (usually bold) -->
<p>This is <strong>very important</strong> text.</p>

<!-- Both together -->
<p>This is <strong><em>extremely important</em></strong>!</p>

<!-- Small print -->
<p>Regular text <small>(This is the fine print)</small></p>

<!-- Marked/highlighted text -->
<p>Search results with <mark>highlighted terms</mark></p>

<!-- Deleted and inserted text -->
<p>Price: <del>$50</del> <ins>$30</ins> (40% off!)</p>

<!-- Subscript and superscript -->
<p>H<sub>2</sub>O is water. E=mc<sup>2</sup> is Einstein's equation.</p>

<!-- Abbreviations -->
<p>Learn <abbr title="HyperText Markup Language">HTML</abbr> first.</p>

<!-- Citations -->
<p>As mentioned in <cite>The Web Developer's Guide</cite>...</p>

<!-- Code -->
<p>Use the <code>console.log()</code> function to debug.</p>

<!-- Keyboard input -->
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>

<!-- Sample output -->
<p>The program outputs: <samp>Hello, World!</samp></p>

<!-- Variables -->
<p>The <var>x</var> variable stores the user input.</p>

<!-- Time -->
<p>Published on <time datetime="2024-01-15T09:30:00">January 15, 2024 at 9:30 AM</time></p>
```

### Advanced Text Patterns

#### Pattern 1: Article Metadata
```html
<article>
    <header>
        <h1>Understanding Semantic HTML</h1>
        <p class="metadata">
            By <a href="/author/jane-doe" rel="author">Jane Doe</a>
            on <time datetime="2024-01-15">January 15, 2024</time>
            in <a href="/category/web-dev">Web Development</a>
        </p>
    </header>
    
    <p>Article content goes here...</p>
    
    <footer>
        <p>Last updated: <time datetime="2024-01-20">5 days ago</time></p>
    </footer>
</article>
```

#### Pattern 2: Definition Lists (Often Forgotten!)
```html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - the standard markup language for web pages</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets - describes how HTML elements are displayed</dd>
    
    <dt>JavaScript</dt>
    <dd>Programming language that makes web pages interactive</dd>
</dl>
```

#### Pattern 3: Accessible Abbreviations
```html
<!-- First use - spell it out -->
<p>The <abbr title="World Wide Web Consortium">W3C</abbr> sets web standards.</p>

<!-- Subsequent uses - just the abbreviation -->
<p>The W3C recommends using semantic HTML.</p>
```

### Heading Best Practices

#### DO:
```html
<!-- ✅ Logical hierarchy -->
<h1>Web Development Guide</h1>
    <h2>Frontend Technologies</h2>
        <h3>HTML Basics</h3>
        <h3>CSS Fundamentals</h3>
    <h2>Backend Technologies</h2>
        <h3>Server Languages</h3>
```

#### DON'T:
```html
<!-- ❌ Skipping levels -->
<h1>Web Development Guide</h1>
    <h3>HTML Basics</h3>  <!-- Where's h2? -->
    
<!-- ❌ Using headings for styling -->
<h3>This text needs to be bigger</h3>  <!-- Use CSS instead! -->

<!-- ❌ Multiple H1s -->
<h1>Welcome</h1>
<h1>About Us</h1>  <!-- Should be h2 -->
```

### Real-World Text Formatting Example

Here's a complete example combining multiple text elements:

```html
<article>
    <header>
        <h1>The Rise of <abbr title="Artificial Intelligence">AI</abbr> in Web Development</h1>
        <p>
            <strong>5 min read</strong> • 
            By <a href="#" rel="author">Alex Chen</a> • 
            <time datetime="2024-01-15">Jan 15, 2024</time>
        </p>
    </header>
    
    <p>The integration of <abbr>AI</abbr> tools has <em>revolutionized</em> how we write code. 
    As <cite>GitHub's 2023 Developer Survey</cite> revealed, over <strong>70% of developers</strong> 
    now use AI assistants daily.</p>
    
    <h2>Key Benefits</h2>
    <p>Let's explore the main advantages:</p>
    <ol>
        <li><strong>Speed</strong>: Write code <mark>10x faster</mark></li>
        <li><strong>Learning</strong>: Get explanations instantly</li>
        <li><strong>Debugging</strong>: Find issues in seconds</li>
    </ol>
    
    <blockquote>
        <p>"AI won't replace programmers, but programmers using AI will replace those who don't."</p>
        <footer>— <cite>Anonymous Tech Leader</cite></footer>
    </blockquote>
    
    <h2>Getting Started</h2>
    <p>To begin using AI tools, press <kbd>Ctrl</kbd> + <kbd>Space</kbd> in your editor. 
    You'll see suggestions like <samp>function calculateTotal() { ... }</samp></p>
    
    <hr>
    
    <footer>
        <small>© 2024 Tech Blog. All opinions are my own.</small>
    </footer>
</article>
```

---

## Chapter 4: Links & Navigation {#chapter-4}

### What You Discovered in Section 4

Remember building that navigation menu and discovering all the different types of links? You learned that links are what make the web a "web" - they connect everything together! The quiz about `target="_blank"` helped cement that external links should open in new tabs.

### The Theory Behind Links

#### Anatomy of a Link

Every link has three potential parts:
```html
<a href="destination" target="window" rel="relationship">Link Text</a>
```

1. **href** (required): Where the link goes
2. **target** (optional): How it opens
3. **rel** (optional): Relationship to current page

### Complete Link Reference

#### 1. Internal Links (Same Website)
```html
<!-- To another page -->
<a href="about.html">About Us</a>
<a href="/contact.html">Contact</a> <!-- Absolute path -->
<a href="../projects/web.html">Web Projects</a> <!-- Relative path -->

<!-- To page section (anchor links) -->
<a href="#skills">Jump to Skills</a>
<a href="about.html#team">Meet Our Team</a>

<!-- To homepage -->
<a href="/">Home</a>
<a href="index.html">Home</a>
```

#### 2. External Links (Other Websites)
```html
<!-- Basic external link -->
<a href="https://github.com">GitHub</a>

<!-- Open in new tab/window -->
<a href="https://twitter.com" target="_blank">Twitter</a>

<!-- Security best practice for external links -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Site
</a>

<!-- rel values explained:
     noopener: Prevents new page from accessing window.opener
     noreferrer: Doesn't send referrer information
     nofollow: Tells search engines not to follow this link
-->
```

#### 3. Communication Links
```html
<!-- Email link -->
<a href="mailto:hello@example.com">Email Me</a>

<!-- Email with subject -->
<a href="mailto:hello@example.com?subject=Portfolio%20Inquiry">
    Send Inquiry
</a>

<!-- Email with subject and body -->
<a href="mailto:hello@example.com?subject=Hi&body=I%20saw%20your%20portfolio">
    Contact Me
</a>

<!-- Phone link (great for mobile!) -->
<a href="tel:+1234567890">Call (123) 456-7890</a>

<!-- SMS link -->
<a href="sms:+1234567890">Text Me</a>

<!-- WhatsApp link -->
<a href="https://wa.me/1234567890">WhatsApp</a>
```

#### 4. Download Links
```html
<!-- Basic download -->
<a href="resume.pdf" download>Download Resume</a>

<!-- Download with different filename -->
<a href="document.pdf" download="john-doe-resume.pdf">
    Download My Resume
</a>

<!-- Force download (not view in browser) -->
<a href="image.jpg" download>Download Image</a>
```

#### 5. Special Protocol Links
```html
<!-- JavaScript (use sparingly!) -->
<a href="javascript:void(0)">Click Me</a>
<a href="#" onclick="doSomething(); return false;">Action</a>

<!-- FTP -->
<a href="ftp://files.example.com">FTP Server</a>

<!-- Skype -->
<a href="skype:username?call">Call on Skype</a>
```

### Breaking Down Your Navigation Exercise

```html
<!-- What you built in nav-editor -->
<header>
    <h1>My Portfolio</h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="https://github.com/yourusername" target="_blank">GitHub</a>
    </nav>
</header>

<main>
    <section id="home">
        <h2>Welcome!</h2>
        <p>This is my portfolio.</p>
    </section>
    
    <section id="about">
        <h2>About Me</h2>
        <p>I'm learning web development!</p>
    </section>
    
    <section id="projects">
        <h2>My Projects</h2>
        <p>Coming soon...</p>
    </section>
</main>
```

### Advanced Navigation Patterns

#### Pattern 1: Full Navigation Bar
```html
<nav aria-label="Main navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/about">About</a></li>
        <li>
            <a href="/services">Services</a>
            <!-- Dropdown submenu -->
            <ul>
                <li><a href="/services/web-design">Web Design</a></li>
                <li><a href="/services/development">Development</a></li>
            </ul>
        </li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

#### Pattern 2: Breadcrumb Navigation
```html
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/products/electronics">Electronics</a></li>
        <li aria-current="page">Laptops</li>
    </ol>
</nav>
```

#### Pattern 3: Skip Links (Accessibility!)
```html
<!-- First thing in body -->
<a href="#main" class="skip-link">Skip to main content</a>
<a href="#nav" class="skip-link">Skip to navigation</a>

<!-- Style these to be hidden but accessible -->
<style>
.skip-link {
    position: absolute;
    left: -9999px;
}
.skip-link:focus {
    left: 0;
}
</style>
```

#### Pattern 4: Footer Navigation
```html
<footer>
    <nav aria-label="Footer navigation">
        <section>
            <h3>Company</h3>
            <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/team">Our Team</a></li>
                <li><a href="/careers">Careers</a></li>
            </ul>
        </section>
        
        <section>
            <h3>Support</h3>
            <ul>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
        </section>
        
        <section>
            <h3>Connect</h3>
            <ul>
                <li><a href="https://twitter.com/company" target="_blank" rel="noopener">Twitter</a></li>
                <li><a href="https://linkedin.com/company" target="_blank" rel="noopener">LinkedIn</a></li>
                <li><a href="https://github.com/company" target="_blank" rel="noopener">GitHub</a></li>
            </ul>
        </section>
    </nav>
</footer>
```

### Link Accessibility Best Practices

#### DO:
```html
<!-- ✅ Descriptive link text -->
<a href="report.pdf">Download 2024 Annual Report (PDF, 2.5MB)</a>

<!-- ✅ Clear indication of external links -->
<a href="https://external.com" target="_blank">
    Visit External Site <span aria-label="opens in new tab">↗</span>
</a>

<!-- ✅ Skip links for keyboard navigation -->
<a href="#main" class="skip-link">Skip to content</a>

<!-- ✅ Current page indication -->
<a href="/home" aria-current="page">Home</a>
```

#### DON'T:
```html
<!-- ❌ Vague link text -->
<a href="report.pdf">Click here</a>
<a href="/more">Read more</a>

<!-- ❌ Empty links -->
<a href="#"></a>
<a href="javascript:void(0)"></a>

<!-- ❌ Using links as buttons -->
<a href="#" onclick="deletItem()">Delete</a> <!-- Use <button> instead -->
```

### Real-World Navigation Example

Here's a complete, accessible navigation structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Professional Portfolio</title>
</head>
<body>
    <!-- Skip links for accessibility -->
    <a href="#main" class="visually-hidden">Skip to main content</a>
    
    <header>
        <a href="/" class="logo">Jane Doe</a>
        
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/" aria-current="page">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/projects">Projects</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/contact">Contact</a></li>
                <li>
                    <a href="https://github.com/janedoe" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       aria-label="GitHub (opens in new tab)">
                        GitHub ↗
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    
    <main id="main">
        <!-- Page content -->
    </main>
    
    <footer>
        <nav aria-label="Footer links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="mailto:jane@example.com">jane@example.com</a>
            <a href="tel:+1234567890">(123) 456-7890</a>
        </nav>
    </footer>
</body>
</html>
```

---

## Chapter 5: Forms & User Input {#chapter-5}

### What You Discovered in Section 5

In the interactive module, you built a contact form and experienced form validation firsthand. You saw how different input types provide different keyboards on mobile and built-in validation. The interactive demo showed you validation in action!

### The Theory Behind Forms

#### Why Forms Matter

Forms are the primary way users interact with websites:
- Login/signup
- Contact forms
- Search bars
- Comments
- Shopping carts
- Settings/preferences

Every interaction beyond clicking links usually involves a form!

### Breaking Down Your Contact Form Exercise

```html
<!-- What you built in form-editor -->
<form>
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="subject">Subject:</label>
    <select id="subject" name="subject">
        <option value="">Choose...</option>
        <option value="general">General Inquiry</option>
        <option value="project">Project Proposal</option>
        <option value="feedback">Feedback</option>
    </select>
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
    
    <button type="submit">Send Message</button>
</form>
```

### Complete Form Elements Reference

#### Input Types (HTML5)

```html
<!-- Text inputs -->
<input type="text" placeholder="Enter text">
<input type="email" placeholder="email@example.com">
<input type="password" placeholder="Password">
<input type="search" placeholder="Search...">
<input type="url" placeholder="https://example.com">
<input type="tel" placeholder="(123) 456-7890">

<!-- Number inputs -->
<input type="number" min="0" max="100" step="5">
<input type="range" min="0" max="100" value="50">

<!-- Date/Time inputs -->
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="week">

<!-- Other inputs -->
<input type="color" value="#6366f1">
<input type="file" accept="image/*">
<input type="hidden" name="user_id" value="123">

<!-- Buttons -->
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click Me">
```

#### Form Controls

```html
<!-- Textarea for multiple lines -->
<textarea rows="4" cols="50" placeholder="Enter your message..."></textarea>

<!-- Select dropdown -->
<select name="country">
    <option value="">Select a country</option>
    <optgroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="mx">Mexico</option>
    </optgroup>
    <optgroup label="Europe">
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
        <option value="fr">France</option>
    </optgroup>
</select>

<!-- Radio buttons (choose one) -->
<fieldset>
    <legend>Preferred Contact Method:</legend>
    <label>
        <input type="radio" name="contact" value="email" checked>
        Email
    </label>
    <label>
        <input type="radio" name="contact" value="phone">
        Phone
    </label>
    <label>
        <input type="radio" name="contact" value="text">
        Text Message
    </label>
</fieldset>

<!-- Checkboxes (choose multiple) -->
<fieldset>
    <legend>Interests:</legend>
    <label>
        <input type="checkbox" name="interests" value="web" checked>
        Web Development
    </label>
    <label>
        <input type="checkbox" name="interests" value="mobile">
        Mobile Apps
    </label>
    <label>
        <input type="checkbox" name="interests" value="ai">
        AI/Machine Learning
    </label>
</fieldset>

<!-- Datalist (input with suggestions) -->
<label for="browser">Choose your browser:</label>
<input list="browsers" id="browser" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
</datalist>
```

### Form Attributes Deep Dive

#### Form Element Attributes
```html
<form action="/submit" method="POST" enctype="multipart/form-data" novalidate>
    <!-- 
    action: Where to send the data
    method: GET (URL params) or POST (body)
    enctype: How to encode (important for file uploads!)
    novalidate: Disable browser validation
    -->
</form>
```

#### Input Attributes
```html
<input 
    type="text"
    id="username"              <!-- For label association -->
    name="username"            <!-- Key for form data -->
    value="default"            <!-- Default value -->
    placeholder="Enter username" <!-- Hint text -->
    required                   <!-- Must fill out -->
    readonly                   <!-- Can see but not edit -->
    disabled                   <!-- Can't interact -->
    minlength="3"             <!-- Minimum characters -->
    maxlength="20"            <!-- Maximum characters -->
    pattern="[A-Za-z0-9]+"    <!-- Regex pattern -->
    autocomplete="username"    <!-- Browser autofill -->
    autofocus                 <!-- Focus on page load -->
>
```

### Advanced Form Patterns

#### Pattern 1: Complete Registration Form
```html
<form action="/register" method="POST">
    <h2>Create Your Account</h2>
    
    <!-- Personal Information -->
    <fieldset>
        <legend>Personal Information</legend>
        
        <div class="form-group">
            <label for="fullname">Full Name *</label>
            <input type="text" id="fullname" name="fullname" required 
                   autocomplete="name" minlength="2">
        </div>
        
        <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required 
                   autocomplete="email">
            <small>We'll never share your email</small>
        </div>
        
        <div class="form-group">
            <label for="birthdate">Date of Birth</label>
            <input type="date" id="birthdate" name="birthdate" 
                   max="2009-01-01" min="1900-01-01">
        </div>
    </fieldset>
    
    <!-- Account Security -->
    <fieldset>
        <legend>Account Security</legend>
        
        <div class="form-group">
            <label for="password">Password *</label>
            <input type="password" id="password" name="password" required
                   minlength="8" autocomplete="new-password"
                   aria-describedby="password-help">
            <small id="password-help">
                Must be at least 8 characters
            </small>
        </div>
        
        <div class="form-group">
            <label for="confirm-password">Confirm Password *</label>
            <input type="password" id="confirm-password" 
                   name="confirm-password" required
                   autocomplete="new-password">
        </div>
    </fieldset>
    
    <!-- Preferences -->
    <fieldset>
        <legend>Preferences</legend>
        
        <div class="form-group">
            <label>
                <input type="checkbox" name="newsletter" value="yes">
                Send me newsletter updates
            </label>
        </div>
        
        <div class="form-group">
            <label>
                <input type="checkbox" name="terms" value="accepted" required>
                I agree to the <a href="/terms">Terms of Service</a> *
            </label>
        </div>
    </fieldset>
    
    <button type="submit">Create Account</button>
    <button type="reset">Clear Form</button>
</form>
```

#### Pattern 2: Search Form with Filters
```html
<form role="search" action="/search" method="GET">
    <div class="search-bar">
        <label for="search-input" class="visually-hidden">Search</label>
        <input type="search" id="search-input" name="q" 
               placeholder="Search products..." required>
        <button type="submit" aria-label="Search">🔍</button>
    </div>
    
    <details>
        <summary>Advanced Filters</summary>
        
        <fieldset>
            <legend>Price Range</legend>
            <input type="number" name="min_price" placeholder="Min" min="0">
            <input type="number" name="max_price" placeholder="Max" min="0">
        </fieldset>
        
        <fieldset>
            <legend>Categories</legend>
            <label><input type="checkbox" name="cat" value="electronics"> Electronics</label>
            <label><input type="checkbox" name="cat" value="books"> Books</label>
            <label><input type="checkbox" name="cat" value="clothing"> Clothing</label>
        </fieldset>
    </details>
</form>
```

#### Pattern 3: Multi-Step Form
```html
<form>
    <!-- Step 1 -->
    <fieldset id="step1">
        <legend>Step 1: Basic Info</legend>
        <!-- Step 1 fields -->
        <button type="button" onclick="nextStep()">Next</button>
    </fieldset>
    
    <!-- Step 2 -->
    <fieldset id="step2" hidden>
        <legend>Step 2: Details</legend>
        <!-- Step 2 fields -->
        <button type="button" onclick="prevStep()">Back</button>
        <button type="button" onclick="nextStep()">Next</button>
    </fieldset>
    
    <!-- Step 3 -->
    <fieldset id="step3" hidden>
        <legend>Step 3: Review</legend>
        <!-- Summary -->
        <button type="button" onclick="prevStep()">Back</button>
        <button type="submit">Submit</button>
    </fieldset>
</form>
```

### Form Validation

#### HTML5 Built-in Validation
```html
<!-- Required field -->
<input type="text" required>

<!-- Length validation -->
<input type="text" minlength="3" maxlength="50">

<!-- Number ranges -->
<input type="number" min="18" max="100">

<!-- Pattern matching -->
<input type="text" pattern="[A-Z]{3}" title="Three uppercase letters">

<!-- Email validation (automatic with type="email") -->
<input type="email">

<!-- Custom validation message -->
<input type="text" required oninvalid="this.setCustomValidity('Please enter your name')" 
       oninput="this.setCustomValidity('')">
```

### Form Accessibility Best Practices

#### Always Use Labels
```html
<!-- ✅ GOOD - Explicit label -->
<label for="name">Your Name:</label>
<input type="text" id="name" name="name">

<!-- ✅ GOOD - Implicit label -->
<label>
    Your Name:
    <input type="text" name="name">
</label>

<!-- ❌ BAD - No label -->
<input type="text" placeholder="Your Name">
```

#### Group Related Fields
```html
<fieldset>
    <legend>Shipping Address</legend>
    <!-- Address fields -->
</fieldset>

<fieldset>
    <legend>Billing Address</legend>
    <!-- Address fields -->
</fieldset>
```

#### Provide Help Text
```html
<label for="password">Password</label>
<input type="password" id="password" aria-describedby="password-help">
<small id="password-help">
    Must contain at least 8 characters, including a number
</small>
```

#### Error Messages
```html
<label for="email">Email</label>
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<span id="email-error" role="alert">
    Please enter a valid email address
</span>
```

---

## Chapter 6: Lists & Tables {#chapter-6}

### What You Discovered in Section 6

You learned that lists and tables are perfect for organizing information. In the interactive exercise, you created a skills table showing your web development journey. Lists aren't just for bullet points - they're semantic elements that help structure content meaningfully!

### The Theory Behind Lists

#### Three Types of Lists, Three Different Purposes

1. **Unordered Lists (`<ul>`)**: When order doesn't matter
2. **Ordered Lists (`<ol>`)**: When sequence is important  
3. **Description Lists (`<dl>`)**: For term/definition pairs

### Breaking Down Your Skills Table Exercise

```html
<!-- What you built in table-editor -->
<table>
    <thead>
        <tr>
            <th>Skill</th>
            <th>Experience Level</th>
            <th>Projects Built</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>HTML</td>
            <td>Learning</td>
            <td>Portfolio site</td>
        </tr>
        <tr>
            <td>CSS</td>
            <td>Beginner</td>
            <td>Styled components</td>
        </tr>
        <tr>
            <td>JavaScript</td>
            <td>Starting Soon</td>
            <td>Coming next!</td>
        </tr>
    </tbody>
</table>
```

### Complete Lists Reference

#### Unordered Lists
```html
<!-- Basic unordered list -->
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

<!-- Nested lists -->
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS
                <ul>
                    <li>Flexbox</li>
                    <li>Grid</li>
                </ul>
            </li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Node.js</li>
            <li>Python</li>
        </ul>
    </li>
</ul>

<!-- List with custom styling hooks -->
<ul class="feature-list">
    <li class="completed">Set up development environment</li>
    <li class="completed">Learn HTML basics</li>
    <li class="in-progress">Master CSS styling</li>
    <li class="upcoming">Add JavaScript interactivity</li>
</ul>
```

#### Ordered Lists
```html
<!-- Basic ordered list -->
<ol>
    <li>Install VS Code</li>
    <li>Set up Git</li>
    <li>Create first HTML file</li>
    <li>Deploy to GitHub Pages</li>
</ol>

<!-- Different numbering types -->
<ol type="A">  <!-- A, B, C -->
    <li>First item</li>
    <li>Second item</li>
</ol>

<ol type="a">  <!-- a, b, c -->
    <li>First item</li>
    <li>Second item</li>
</ol>

<ol type="I">  <!-- I, II, III -->
    <li>First item</li>
    <li>Second item</li>
</ol>

<ol type="i">  <!-- i, ii, iii -->
    <li>First item</li>
    <li>Second item</li>
</ol>

<!-- Start from specific number -->
<ol start="5">
    <li>This will be 5</li>
    <li>This will be 6</li>
</ol>

<!-- Reversed list -->
<ol reversed>
    <li>This will be 3</li>
    <li>This will be 2</li>
    <li>This will be 1</li>
</ol>
```

#### Description Lists
```html
<!-- Basic description list -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - structures web content</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets - styles the appearance</dd>
    
    <dt>JavaScript</dt>
    <dd>Programming language for web interactivity</dd>
</dl>

<!-- Multiple definitions -->
<dl>
    <dt>Coffee</dt>
    <dd>Hot caffeinated beverage</dd>
    <dd>Essential developer fuel</dd>
    <dd>Best served with code</dd>
    
    <dt>Tea</dt>
    <dd>Hot beverage with many varieties</dd>
    <dd>Preferred by some developers</dd>
</dl>

<!-- Nested description lists -->
<dl>
    <dt>Web Development</dt>
    <dd>
        The process of building websites
        <dl>
            <dt>Frontend</dt>
            <dd>Client-side development</dd>
            
            <dt>Backend</dt>
            <dd>Server-side development</dd>
        </dl>
    </dd>
</dl>
```

### Complete Tables Reference

#### Basic Table Structure
```html
<table>
    <!-- Table caption (accessibility!) -->
    <caption>2024 Web Development Skills Progress</caption>
    
    <!-- Table header -->
    <thead>
        <tr>
            <th>Technology</th>
            <th>Started</th>
            <th>Proficiency</th>
            <th>Projects</th>
        </tr>
    </thead>
    
    <!-- Table body -->
    <tbody>
        <tr>
            <td>HTML</td>
            <td>January</td>
            <td>Intermediate</td>
            <td>5</td>
        </tr>
        <tr>
            <td>CSS</td>
            <td>February</td>
            <td>Beginner</td>
            <td>3</td>
        </tr>
    </tbody>
    
    <!-- Table footer -->
    <tfoot>
        <tr>
            <td colspan="3">Total Projects:</td>
            <td>8</td>
        </tr>
    </tfoot>
</table>
```

#### Advanced Table Features
```html
<!-- Column and row spanning -->
<table>
    <tr>
        <th colspan="2">Sales Report</th>  <!-- Spans 2 columns -->
    </tr>
    <tr>
        <td>Product</td>
        <td>Revenue</td>
    </tr>
    <tr>
        <td>Widgets</td>
        <td rowspan="2">$1000</td>  <!-- Spans 2 rows -->
    </tr>
    <tr>
        <td>Gadgets</td>
        <!-- Cell omitted because of rowspan above -->
    </tr>
</table>

<!-- Column groups for styling -->
<table>
    <colgroup>
        <col span="1" style="background-color: #f0f0f0">
        <col span="2" style="background-color: #e0e0e0">
    </colgroup>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <!-- ... -->
</table>

<!-- Scope attributes for accessibility -->
<table>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Score</th>
    </tr>
    <tr>
        <th scope="row">Alice</th>
        <td>95</td>
    </tr>
    <tr>
        <th scope="row">Bob</th>
        <td>87</td>
    </tr>
</table>
```

### Real-World List Patterns

#### Pattern 1: Navigation Menu
```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li>
            <a href="/services">Services</a>
            <ul>
                <li><a href="/services/web">Web Design</a></li>
                <li><a href="/services/app">App Development</a></li>
            </ul>
        </li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

#### Pattern 2: Recipe Instructions
```html
<article>
    <h2>Chocolate Chip Cookies</h2>
    
    <section>
        <h3>Ingredients</h3>
        <ul>
            <li>2¼ cups all-purpose flour</li>
            <li>1 cup butter, softened</li>
            <li>¾ cup sugar</li>
            <li>2 large eggs</li>
            <li>2 cups chocolate chips</li>
        </ul>
    </section>
    
    <section>
        <h3>Instructions</h3>
        <ol>
            <li>Preheat oven to 375°F (190°C)</li>
            <li>Mix butter and sugars until fluffy</li>
            <li>Beat in eggs and vanilla</li>
            <li>Gradually blend in flour</li>
            <li>Stir in chocolate chips</li>
            <li>Drop by spoonfuls onto baking sheet</li>
            <li>Bake 9-11 minutes until golden</li>
        </ol>
    </section>
</article>
```

#### Pattern 3: FAQ Section
```html
<section>
    <h2>Frequently Asked Questions</h2>
    <dl>
        <dt>How long does it take to learn HTML?</dt>
        <dd>Most people can learn HTML basics in 2-4 weeks with consistent practice.</dd>
        
        <dt>Do I need to be good at math?</dt>
        <dd>No! HTML is about structure and content, not calculations.</dd>
        
        <dt>What tools do I need?</dt>
        <dd>Just a text editor (like VS Code) and a web browser.</dd>
    </dl>
</section>
```

### Real-World Table Patterns

#### Pattern 1: Pricing Table
```html
<table>
    <caption>Subscription Plans</caption>
    <thead>
        <tr>
            <th scope="col">Plan</th>
            <th scope="col">Price</th>
            <th scope="col">Features</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Basic</th>
            <td>$9/month</td>
            <td>
                <ul>
                    <li>10 Projects</li>
                    <li>1 GB Storage</li>
                    <li>Email Support</li>
                </ul>
            </td>
            <td><button>Choose Plan</button></td>
        </tr>
        <tr>
            <th scope="row">Pro</th>
            <td>$19/month</td>
            <td>
                <ul>
                    <li>Unlimited Projects</li>
                    <li>10 GB Storage</li>
                    <li>Priority Support</li>
                </ul>
            </td>
            <td><button>Choose Plan</button></td>
        </tr>
    </tbody>
</table>
```

#### Pattern 2: Schedule/Timetable
```html
<table>
    <caption>Class Schedule</caption>
    <thead>
        <tr>
            <th scope="col">Time</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">9:00 AM</th>
            <td>HTML Basics</td>
            <td>CSS Styling</td>
            <td>HTML Advanced</td>
            <td>CSS Layout</td>
            <td>Project Work</td>
        </tr>
        <!-- More time slots -->
    </tbody>
</table>
```

### Lists vs Tables: When to Use Which?

#### Use Lists When:
- Order matters (steps, rankings) → `<ol>`
- Order doesn't matter (features, items) → `<ul>`
- Defining terms → `<dl>`
- Creating navigation menus
- Showing hierarchical information

#### Use Tables When:
- Displaying tabular data
- Comparing multiple items
- Showing relationships between data points
- Creating schedules or calendars
- NOT for layout (that's what CSS is for!)

---

## Chapter 7: Media & Embeds {#chapter-7}

### What You Discovered in Section 7

You learned that alt text is CRUCIAL for images (accessibility isn't optional!), discovered how to make images responsive, and embedded videos from YouTube. The interactive exercise had you create a media gallery combining all these elements.

### The Theory Behind Web Media

#### Why Media Matters

Media makes the web engaging:
- Images communicate faster than text
- Videos can explain complex concepts
- Audio adds another dimension
- Visual content is more shareable

But with great power comes great responsibility - media must be accessible and optimized!

### Breaking Down Your Media Gallery Exercise

```html
<!-- What you created in media-editor -->
<h1>Welcome to My Media Gallery</h1>

<!-- Basic image with alt text -->
<img src="https://via.placeholder.com/400x300" 
     alt="Placeholder image showing gray box with dimensions">

<!-- Figure with caption -->
<figure>
    <img src="https://via.placeholder.com/400x300" 
         alt="Screenshot of my first web project">
    <figcaption>My first web project - January 2024</figcaption>
</figure>

<!-- YouTube embed -->
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        frameborder="0" 
        allowfullscreen>
</iframe>
```

### Complete Image Reference

#### Basic Image Usage
```html
<!-- Simple image -->
<img src="photo.jpg" alt="Description of the image">

<!-- Image with dimensions (prevents layout shift) -->
<img src="photo.jpg" alt="Description" width="600" height="400">

<!-- Responsive image -->
<img src="photo.jpg" alt="Description" 
     style="max-width: 100%; height: auto;">

<!-- Image with loading optimization -->
<img src="photo.jpg" alt="Description" 
     loading="lazy"  <!-- Lazy load below the fold -->
     decoding="async">  <!-- Don't block rendering -->
```

#### Alt Text Best Practices
```html
<!-- ✅ GOOD alt text -->
<img src="team.jpg" alt="Our development team of 5 people standing in front of whiteboard">
<img src="chart.png" alt="Bar chart showing 50% growth in users from 2023 to 2024">
<img src="logo.svg" alt="TechCorp company logo">

<!-- ❌ BAD alt text -->
<img src="team.jpg" alt="Image">  <!-- Too vague -->
<img src="team.jpg" alt="">  <!-- Missing -->
<img src="team.jpg" alt="team.jpg">  <!-- Just filename -->

<!-- Decorative images (rare!) -->
<img src="decorative-border.png" alt="" role="presentation">
```

#### Figure and Figcaption
```html
<!-- Single image with caption -->
<figure>
    <img src="project-screenshot.png" 
         alt="Dashboard showing user analytics with graphs and charts">
    <figcaption>
        Final project: Analytics dashboard built with HTML, CSS, and JavaScript
    </figcaption>
</figure>

<!-- Multiple images in one figure -->
<figure>
    <img src="before.png" alt="Website before redesign - plain text on white">
    <img src="after.png" alt="Website after redesign - modern layout with colors">
    <figcaption>
        Website transformation: Before and after the redesign
    </figcaption>
</figure>

<!-- Figure with code -->
<figure>
    <pre><code>
function greet(name) {
    return `Hello, ${name}!`;
}
    </code></pre>
    <figcaption>
        Example 1: Basic JavaScript greeting function
    </figcaption>
</figure>
```

#### Responsive Images
```html
<!-- srcset for different screen sizes -->
<img src="image-small.jpg"
     srcset="image-small.jpg 400w,
             image-medium.jpg 800w,
             image-large.jpg 1200w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
     alt="Responsive image example">

<!-- Picture element for art direction -->
<picture>
    <!-- Mobile version (portrait) -->
    <source media="(max-width: 768px)" 
            srcset="hero-mobile.jpg">
    
    <!-- Tablet version -->
    <source media="(max-width: 1024px)" 
            srcset="hero-tablet.jpg">
    
    <!-- Desktop version (default) -->
    <img src="hero-desktop.jpg" 
         alt="Hero image showing city skyline">
</picture>

<!-- WebP with fallback -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.jpg" type="image/jpeg">
    <img src="image.jpg" alt="Description">
</picture>
```

### Video and Audio

#### HTML5 Video
```html
<!-- Basic video with controls -->
<video controls width="600">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <p>Your browser doesn't support HTML5 video.</p>
</video>

<!-- Video with all attributes -->
<video controls           <!-- Show controls -->
       autoplay          <!-- Start automatically -->
       muted            <!-- Muted (required for autoplay) -->
       loop             <!-- Repeat forever -->
       poster="preview.jpg"  <!-- Preview image -->
       preload="metadata"    <!-- Load metadata only -->
       width="600">
    <source src="video.mp4" type="video/mp4">
    <track kind="subtitles" 
           src="subtitles.vtt" 
           srclang="en" 
           label="English" 
           default>
</video>

<!-- Background video (no controls) -->
<video autoplay muted loop id="bgVideo">
    <source src="background.mp4" type="video/mp4">
</video>
```

#### HTML5 Audio
```html
<!-- Basic audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <p>Your browser doesn't support HTML5 audio.</p>
</audio>

<!-- Audio with attributes -->
<audio controls
       autoplay
       loop
       preload="auto">
    <source src="podcast.mp3" type="audio/mpeg">
</audio>

<!-- Audio playlist -->
<audio id="player" controls></audio>
<ul>
    <li><button onclick="playTrack('track1.mp3')">Track 1</button></li>
    <li><button onclick="playTrack('track2.mp3')">Track 2</button></li>
</ul>
```

### Embedding External Content

#### YouTube Videos
```html
<!-- Basic YouTube embed -->
<iframe width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>

<!-- Responsive YouTube embed -->
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            frameborder="0"
            allowfullscreen>
    </iframe>
</div>

<!-- YouTube with privacy mode -->
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" 
        frameborder="0" 
        allowfullscreen>
</iframe>
```

#### Other Embeds
```html
<!-- Google Maps -->
<iframe src="https://www.google.com/maps/embed?pb=..." 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
</iframe>

<!-- CodePen -->
<iframe height="300" 
        style="width: 100%;" 
        scrolling="no" 
        src="https://codepen.io/..." 
        frameborder="no" 
        allowfullscreen="true">
</iframe>

<!-- Spotify -->
<iframe src="https://open.spotify.com/embed/track/..." 
        width="300" 
        height="380" 
        frameborder="0" 
        allowtransparency="true" 
        allow="encrypted-media">
</iframe>

<!-- Twitter/X -->
<blockquote class="twitter-tweet">
    <a href="https://twitter.com/...">Tweet</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js"></script>
```

### Image Optimization Best Practices

#### File Formats Guide
- **JPEG (.jpg)**: Photos, complex images with many colors
- **PNG (.png)**: Images needing transparency, logos, screenshots
- **WebP (.webp)**: Modern format, smaller file sizes, good quality
- **SVG (.svg)**: Logos, icons, simple graphics (scalable!)
- **GIF (.gif)**: Simple animations (consider video instead)

#### Optimization Checklist
1. **Resize images** to maximum display size
2. **Compress images** (aim for under 200KB)
3. **Use appropriate formats**
4. **Implement lazy loading** for below-fold images
5. **Provide width and height** to prevent layout shift
6. **Use responsive images** for different screens
7. **Always include alt text**

### Real-World Media Gallery Pattern

```html
<section class="media-gallery">
    <h2>Project Showcase</h2>
    
    <!-- Image grid -->
    <div class="gallery-grid">
        <figure class="gallery-item">
            <a href="project1-full.jpg">
                <img src="project1-thumb.jpg" 
                     alt="E-commerce website homepage showing product grid"
                     loading="lazy">
            </a>
            <figcaption>E-commerce Platform</figcaption>
        </figure>
        
        <figure class="gallery-item">
            <a href="project2-full.jpg">
                <img src="project2-thumb.jpg" 
                     alt="Dashboard with data visualizations and charts"
                     loading="lazy">
            </a>
            <figcaption>Analytics Dashboard</figcaption>
        </figure>
        
        <figure class="gallery-item">
            <video controls poster="project3-poster.jpg">
                <source src="project3-demo.mp4" type="video/mp4">
            </video>
            <figcaption>Mobile App Demo</figcaption>
        </figure>
    </div>
    
    <!-- Featured video -->
    <div class="featured-video">
        <h3>Project Walkthrough</h3>
        <iframe width="560" 
                height="315" 
                src="https://www.youtube.com/embed/..." 
                frameborder="0" 
                allowfullscreen>
        </iframe>
    </div>
</section>
```

---

## Chapter 8: Building Your Portfolio {#chapter-8}

### What You Discovered in Section 8

This was your culminating project! You combined EVERYTHING - semantic HTML, proper structure, navigation, forms, lists, tables, and media - into a complete portfolio website. The checklist ensured you included all the essential elements.

### Your Portfolio Requirements

From the interactive module, your portfolio needed:
- ✅ Proper document structure with semantic HTML
- ✅ Navigation menu linking all sections
- ✅ About section with headings and paragraphs
- ✅ Skills table or list
- ✅ Projects section with images
- ✅ Contact form with multiple input types
- ✅ Footer with links

### Complete Portfolio Template

Here's a professional portfolio structure incorporating everything you learned:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfolio of [Your Name], aspiring web developer">
    <meta name="keywords" content="web developer, portfolio, HTML, CSS, JavaScript">
    <meta name="author" content="Your Name">
    
    <!-- Open Graph for social sharing -->
    <meta property="og:title" content="Your Name | Web Developer Portfolio">
    <meta property="og:description" content="Check out my latest web development projects">
    <meta property="og:image" content="https://yoursite.com/preview.jpg">
    <meta property="og:url" content="https://yoursite.com">
    
    <title>Your Name | Web Developer Portfolio</title>
    
    <!-- We'll add CSS in Module 3! -->
    <style>
        /* Basic reset for now */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }
    </style>
</head>
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main" class="skip-link">Skip to main content</a>
    
    <!-- Header with Navigation -->
    <header>
        <nav aria-label="Main navigation">
            <a href="#home" class="logo">Your Name</a>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
                <li>
                    <a href="https://github.com/yourusername" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        GitHub <span aria-label="opens in new tab">↗</span>
                    </a>
                </li>
            </ul>
        </nav>
    </header>
    
    <!-- Main Content -->
    <main id="main">
        <!-- Hero/Home Section -->
        <section id="home" aria-labelledby="home-heading">
            <h1 id="home-heading">Hi, I'm [Your Name] 👋</h1>
            <p>I'm an aspiring web developer passionate about creating amazing digital experiences.</p>
            <a href="#contact" class="cta-button">Get In Touch</a>
            <a href="#projects" class="cta-button secondary">View My Work</a>
        </section>
        
        <!-- About Section -->
        <section id="about" aria-labelledby="about-heading">
            <h2 id="about-heading">About Me</h2>
            
            <img src="profile-photo.jpg" 
                 alt="Professional photo of [Your Name]" 
                 width="300" 
                 height="300">
            
            <p>I'm a [age]-year-old student from [location] who discovered a passion for web development in [year]. What started as curiosity about how websites work has turned into a full-blown obsession with creating beautiful, functional web experiences.</p>
            
            <p>When I'm not coding, you can find me [hobbies/interests]. I believe that diverse interests make better developers, bringing unique perspectives to problem-solving.</p>
            
            <blockquote>
                "The best way to predict the future is to invent it." - Alan Kay
            </blockquote>
            
            <h3>My Journey</h3>
            <p>I started learning web development through [how you started - online courses, bootcamp, self-taught]. Every day brings new challenges and opportunities to grow.</p>
        </section>
        
        <!-- Skills Section -->
        <section id="skills" aria-labelledby="skills-heading">
            <h2 id="skills-heading">Technical Skills</h2>
            
            <h3>Languages & Technologies</h3>
            <table>
                <caption>My current skill levels and experience</caption>
                <thead>
                    <tr>
                        <th scope="col">Technology</th>
                        <th scope="col">Proficiency</th>
                        <th scope="col">Experience</th>
                        <th scope="col">Projects</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">HTML5</th>
                        <td>Intermediate</td>
                        <td>6 months</td>
                        <td>10+</td>
                    </tr>
                    <tr>
                        <th scope="row">CSS3</th>
                        <td>Beginner</td>
                        <td>3 months</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <th scope="row">JavaScript</th>
                        <td>Learning</td>
                        <td>1 month</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th scope="row">Git/GitHub</th>
                        <td>Beginner</td>
                        <td>2 months</td>
                        <td>All projects</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>Tools & Software</h3>
            <ul>
                <li>Visual Studio Code (Primary editor)</li>
                <li>Git & GitHub (Version control)</li>
                <li>Chrome DevTools (Debugging)</li>
                <li>Figma (Design basics)</li>
                <li>Terminal/Command Line</li>
            </ul>
            
            <h3>Currently Learning</h3>
            <ol>
                <li>Advanced CSS (Flexbox & Grid)</li>
                <li>JavaScript fundamentals</li>
                <li>Responsive web design</li>
                <li>Web accessibility standards</li>
            </ol>
        </section>
        
        <!-- Projects Section -->
        <section id="projects" aria-labelledby="projects-heading">
            <h2 id="projects-heading">Featured Projects</h2>
            
            <article class="project">
                <h3>Personal Portfolio Website</h3>
                <figure>
                    <img src="portfolio-screenshot.png" 
                         alt="Screenshot of portfolio homepage showing navigation and hero section"
                         loading="lazy">
                    <figcaption>My portfolio showcasing semantic HTML structure</figcaption>
                </figure>
                
                <p>Built with semantic HTML5, this portfolio demonstrates proper document structure, accessibility, and clean code practices.</p>
                
                <h4>Key Features:</h4>
                <ul>
                    <li>Fully semantic HTML structure</li>
                    <li>Accessible navigation</li>
                    <li>Contact form with validation</li>
                    <li>Responsive images</li>
                </ul>
                
                <p>
                    <a href="https://github.com/username/portfolio" 
                       target="_blank"
                       rel="noopener noreferrer">
                        View Code on GitHub ↗
                    </a>
                    <a href="https://username.github.io/portfolio" 
                       target="_blank"
                       rel="noopener noreferrer">
                        View Live Site ↗
                    </a>
                </p>
            </article>
            
            <article class="project">
                <h3>Local Business Website</h3>
                <figure>
                    <img src="business-site-screenshot.png" 
                         alt="Restaurant website homepage with menu and contact information"
                         loading="lazy">
                    <figcaption>Restaurant website for a local business</figcaption>
                </figure>
                
                <p>Created a multi-page website for a local restaurant, featuring their menu, location, and online reservation form.</p>
                
                <h4>Technologies Used:</h4>
                <ul>
                    <li>HTML5 semantic elements</li>
                    <li>Multi-page navigation</li>
                    <li>Google Maps embed</li>
                    <li>Contact form</li>
                </ul>
            </article>
            
            <!-- Video Demo -->
            <article class="project">
                <h3>Project Walkthrough Video</h3>
                <iframe width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        frameborder="0" 
                        allowfullscreen
                        title="Video walkthrough of my web development projects">
                </iframe>
            </article>
        </section>
        
        <!-- Contact Section -->
        <section id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Get In Touch</h2>
            
            <p>I'm always excited to connect with fellow developers and potential collaborators. Whether you have a project idea, want to chat about web development, or just say hi, I'd love to hear from you!</p>
            
            <form action="#" method="POST">
                <fieldset>
                    <legend>Contact Information</legend>
                    
                    <div class="form-group">
                        <label for="name">Your Name *</label>
                        <input type="text" 
                               id="name" 
                               name="name" 
                               required
                               autocomplete="name">
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" 
                               id="email" 
                               name="email" 
                               required
                               autocomplete="email">
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" 
                               id="phone" 
                               name="phone"
                               autocomplete="tel">
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>Your Message</legend>
                    
                    <div class="form-group">
                        <label for="subject">Subject *</label>
                        <select id="subject" name="subject" required>
                            <option value="">Choose a subject...</option>
                            <option value="project">Project Inquiry</option>
                            <option value="collaboration">Collaboration</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" 
                                  name="message" 
                                  rows="5" 
                                  required
                                  placeholder="Tell me about your project or just say hello!"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="newsletter" value="yes">
                            Send me occasional updates about your projects
                        </label>
                    </div>
                </fieldset>
                
                <button type="submit">Send Message</button>
                <button type="reset">Clear Form</button>
                
                <p><small>* Required fields</small></p>
            </form>
            
            <aside>
                <h3>Other Ways to Connect</h3>
                <dl>
                    <dt>Email</dt>
                    <dd><a href="mailto:your.email@example.com">your.email@example.com</a></dd>
                    
                    <dt>LinkedIn</dt>
                    <dd><a href="https://linkedin.com/in/yourprofile" 
                           target="_blank"
                           rel="noopener noreferrer">
                        linkedin.com/in/yourprofile ↗
                    </a></dd>
                    
                    <dt>GitHub</dt>
                    <dd><a href="https://github.com/yourusername" 
                           target="_blank"
                           rel="noopener noreferrer">
                        github.com/yourusername ↗
                    </a></dd>
                </dl>
            </aside>
        </section>
    </main>
    
    <!-- Footer -->
    <footer>
        <nav aria-label="Footer navigation">
            <a href="#home">Back to Top</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/sitemap">Sitemap</a>
        </nav>
        
        <p>
            <small>
                &copy; 2024 Your Name. Built with semantic HTML and lots of ☕
            </small>
        </p>
        
        <p>
            <small>
                Last updated: <time datetime="2024-01-15">January 15, 2024</time>
            </small>
        </p>
    </footer>
</body>
</html>
```

### Portfolio Best Practices

#### Structure & Semantics
1. Use semantic HTML throughout
2. Include skip links for accessibility
3. Proper heading hierarchy
4. Meaningful link text
5. Alt text for all images

#### Content Guidelines
1. **About Section**: Personal but professional
2. **Skills**: Honest about proficiency levels
3. **Projects**: Show variety and growth
4. **Contact**: Multiple ways to connect

#### SEO Optimization
1. Descriptive page title
2. Meta description
3. Open Graph tags for social sharing
4. Semantic markup
5. Meaningful URLs

#### Accessibility Checklist
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Links make sense out of context
- [ ] Color isn't the only indicator
- [ ] Keyboard navigation works
- [ ] ARIA labels where needed

---

## Interactive Exercise Solutions {#exercise-solutions}

### Exercise: Semantic HTML Conversion (semantic-editor)
**Location**: Section 1, semantic-editor

**The Challenge**: Convert div-based HTML to semantic HTML

**Starting Code**:
```html
<div class="top">
    <h1>Welcome to My Site</h1>
    <div class="menu">
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </div>
</div>

<div class="content">
    <div class="post">
        <h2>My First Post</h2>
        <p>This is my article content.</p>
    </div>
</div>

<div class="bottom">
    <p>&copy; 2024 My Site</p>
</div>
```

**Solution**:
```html
<header>
    <h1>Welcome to My Site</h1>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
</header>

<main>
    <article>
        <h2>My First Post</h2>
        <p>This is my article content.</p>
    </article>
</main>

<footer>
    <p>&copy; 2024 My Site</p>
</footer>
```

**Step-by-Step Explanation**:
1. `<div class="top">` → `<header>` because it contains introductory content
2. `<div class="menu">` → `<nav>` because it's navigation
3. `<div class="content">` → `<main>` because it's the main content area
4. `<div class="post">` → `<article>` because it's self-contained content
5. `<div class="bottom">` → `<footer>` because it's footer content

### Exercise: Document Structure (structure-editor)
**Location**: Section 2, structure-editor

**The Challenge**: Create a complete HTML document from scratch

**Solution**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="My first complete HTML document">
    <title>My Amazing Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Home</h2>
            <p>This is my first properly structured HTML page!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

### Exercise: Blog Post Structure (headings-editor)
**Location**: Section 3, headings-editor

**Solution**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Blog Post</title>
</head>
<body>
    <article>
        <header>
            <h1>My Journey Learning Web Development</h1>
            <p>By <strong>Sarah Johnson</strong> | <time datetime="2024-01-15">January 15, 2024</time></p>
        </header>
        
        <section>
            <h2>Why I Started</h2>
            <p>I've always been <em>fascinated</em> by how websites work. After years of being a user, I decided it was time to become a <strong>creator</strong>.</p>
            
            <p>The turning point came when I realized that coding isn't about being a math genius - it's about problem-solving and creativity.</p>
        </section>
        
        <section>
            <h2>The First Steps</h2>
            <p>My journey began with HTML, the foundation of the web. At first, all those angle brackets looked like gibberish!</p>
            
            <h3>Resources That Helped</h3>
            <p>I found some amazing free resources that made learning fun and accessible.</p>
        </section>
        
        <section>
            <h2>Challenges and Victories</h2>
            <p>Every developer faces challenges. Mine was understanding the difference between inline and block elements.</p>
            
            <blockquote>
                "Every expert was once a beginner. Every pro was once an amateur. Every icon was once an iconoclast." 
                <cite>- Robin Sharma</cite>
            </blockquote>
        </section>
        
        <footer>
            <p>Thanks for reading! Follow my journey on <a href="#">GitHub</a>.</p>
        </footer>
    </article>
</body>
</html>
```

### Exercise: Navigation Menu (nav-editor)
**Location**: Section 4, nav-editor

**Solution**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
</head>
<body>
    <header>
        <h1>My Portfolio</h1>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="https://github.com/myusername" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="home">
            <h2>Welcome!</h2>
            <p>This is my portfolio. Explore my work and get to know me!</p>
            <a href="#projects">View My Projects</a>
        </section>
        
        <section id="about">
            <h2>About Me</h2>
            <p>I'm a passionate web developer learning HTML, CSS, and JavaScript.</p>
            <a href="resume.pdf" download>Download My Resume</a>
        </section>
        
        <section id="projects">
            <h2>My Projects</h2>
            <p>Check out what I've built so far!</p>
            <a href="https://myusername.github.io/project1" target="_blank">View Project 1 ↗</a>
        </section>
        
        <section id="contact">
            <h2>Contact Me</h2>
            <p>Let's connect!</p>
            <a href="mailto:myemail@example.com">Send me an email</a>
        </section>
    </main>
</body>
</html>
```

### Exercise: Contact Form (form-editor)
**Location**: Section 5, form-editor

**Solution**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Me</title>
    <style>
        form { max-width: 400px; margin: 20px; }
        label { display: block; margin-top: 10px; }
        input, select, textarea { width: 100%; padding: 5px; margin-top: 5px; }
        button { margin-top: 10px; padding: 10px 20px; }
    </style>
</head>
<body>
    <h1>Contact Me</h1>
    
    <form action="/submit-contact" method="POST">
        <fieldset>
            <legend>Your Information</legend>
            
            <label for="name">Your Name *</label>
            <input type="text" id="name" name="name" required autocomplete="name">
            
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required autocomplete="email">
            
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" autocomplete="tel" placeholder="(123) 456-7890">
        </fieldset>
        
        <fieldset>
            <legend>Your Message</legend>
            
            <label for="subject">Subject *</label>
            <select id="subject" name="subject" required>
                <option value="">Please choose...</option>
                <option value="general">General Inquiry</option>
                <option value="project">Project Proposal</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
            </select>
            
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="5" required 
                      placeholder="Tell me what's on your mind..."></textarea>
            
            <label>
                <input type="checkbox" name="subscribe" value="yes">
                Subscribe to my newsletter
            </label>
        </fieldset>
        
        <button type="submit">Send Message</button>
        <button type="reset">Clear Form</button>
    </form>
</body>
</html>
```

### Exercise: Skills Table (table-editor)
**Location**: Section 6, table-editor

**Solution**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Skills</title>
    <style>
        table { border-collapse: collapse; margin: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>My Technical Skills</h1>
    
    <table>
        <caption>Web Development Skills Progress Tracker</caption>
        <thead>
            <tr>
                <th scope="col">Skill</th>
                <th scope="col">Experience Level</th>
                <th scope="col">Projects Built</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">HTML</th>
                <td>Intermediate</td>
                <td>Portfolio, Blog, Business Site</td>
            </tr>
            <tr>
                <th scope="row">CSS</th>
                <td>Beginner</td>
                <td>Styled Components, Layouts</td>
            </tr>
            <tr>
                <th scope="row">JavaScript</th>
                <td>Learning</td>
                <td>Interactive Forms, Animations</td>
            </tr>
            <tr>
                <th scope="row">Git/GitHub</th>
                <td>Beginner</td>
                <td>Version Control for All Projects</td>
            </tr>
            <tr>
                <th scope="row">Responsive Design</th>
                <td>Learning</td>
                <td>Mobile-First Portfolio</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Last updated: January 2024</td>
            </tr>
        </tfoot>
    </table>
    
    <h2>Learning Goals</h2>
    
    <ol>
        <li>Master CSS Grid and Flexbox layouts</li>
        <li>Learn JavaScript fundamentals and DOM manipulation</li>
        <li>Build a full-stack web application</li>
        <li>Contribute to open source projects</li>
        <li>Create accessible, semantic websites</li>
        <li>Implement responsive design patterns</li>
        <li>Learn a modern framework (React or Vue)</li>
    </ol>
</body>
</html>
```

### Exercise: Media Gallery (media-editor)
**Location**: Section 7, media-editor

**Solution**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Media Gallery</title>
</head>
<body>
    <h1>Welcome to My Media Gallery</h1>
    
    <section>
        <h2>Featured Images</h2>
        
        <img src="https://via.placeholder.com/600x400/6366f1/ffffff?text=Web+Development" 
             alt="Illustration showing web development concepts with code editor and browser"
             width="600"
             height="400">
        
        <figure>
            <img src="https://via.placeholder.com/600x400/10b981/ffffff?text=My+First+Project" 
                 alt="Screenshot of my first web project showing a personal blog with navigation and content sections">
            <figcaption>My first web project - A personal blog built with semantic HTML (January 2024)</figcaption>
        </figure>
        
        <figure>
            <img src="https://via.placeholder.com/600x400/f59e0b/ffffff?text=Responsive+Design" 
                 alt="Multiple devices showing the same website adapting to different screen sizes">
            <figcaption>Learning responsive design - Making websites work on all devices</figcaption>
        </figure>
    </section>
    
    <section>
        <h2>Video Content</h2>
        
        <h3>HTML Tutorial Series</h3>
        <iframe width="560" 
                height="315" 
                src="https://www.youtube.com/embed/UB1O30fR-EE" 
                title="HTML Tutorial for Beginners"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
        
        <h3>My Coding Journey</h3>
        <iframe width="560" 
                height="315" 
                src="https://www.youtube.com/embed/PlxWf493en4" 
                title="My Web Development Journey"
                frameborder="0" 
                allowfullscreen>
        </iframe>
    </section>
    
    <section>
        <h2>Podcast Episode</h2>
        <audio controls>
            <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
            <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
            Your browser does not support the audio element.
        </audio>
        <p>Listen to my thoughts on learning web development as a beginner.</p>
    </section>
</body>
</html>
```

---

## Quiz Answer Explanations {#quiz-explanations}

### Quiz: What HTML Stands For
**Location**: Section 0, Question q0

**Question**: What does HTML stand for?

**Correct Answer**: HyperText Markup Language

**Why This Is Correct**:
- **HyperText**: Refers to links that connect web pages
- **Markup**: Tags that mark up or structure content
- **Language**: A system with rules and syntax

**Why Other Options Are Wrong**:
- **"High Tech Modern Language"**: Made up, sounds techy but incorrect
- **"Home Tool Markup Language"**: Also made up, no connection to web

**Remember This Because**: Understanding what HTML stands for helps you understand its purpose - it's a language for marking up hypertext (linked documents).

### Quiz: Link Target Attribute
**Location**: Section 4, Question q4

**Question**: Which attribute makes a link open in a new tab?

**Correct Answer**: target="_blank"

**Why This Is Correct**:
- `target` attribute specifies where to open the link
- `_blank` value means "new blank window/tab"
- Standard HTML attribute supported by all browsers

**Why Other Options Are Wrong**:
- **target="new"**: Not a valid target value
- **new-window="true"**: This attribute doesn't exist

**Remember This Because**: External links should often open in new tabs so users don't lose your site. Always pair with `rel="noopener noreferrer"` for security!

### Quiz: Navigation Semantic Tag
**Location**: Section 8, Question q8

**Question**: Which semantic tag should wrap your main navigation?

**Correct Answer**: `<nav>`

**Why This Is Correct**:
- `<nav>` specifically designed for navigation blocks
- Semantic meaning helps screen readers
- Can have multiple `<nav>` elements (main, footer, etc.)

**Why Other Options Are Wrong**:
- **`<menu>`**: Deprecated in HTML5 for navigation
- **`<navigation>`**: This tag doesn't exist in HTML

**Remember This Because**: Semantic HTML isn't about making up logical tag names - it's about using the specific tags HTML5 provides. `<nav>` is THE tag for navigation.

---

## Quick Reference Guide {#quick-reference}

### HTML Document Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <title>Page Title</title>
</head>
<body>
    <header>
        <nav>
            <!-- Navigation -->
        </nav>
    </header>
    
    <main>
        <!-- Main content -->
    </main>
    
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
```

### Semantic Elements Quick Reference
```html
<!-- Page Structure -->
<header>    <!-- Page/section header -->
<nav>       <!-- Navigation -->
<main>      <!-- Main content (one per page!) -->
<section>   <!-- Thematic section -->
<article>   <!-- Self-contained content -->
<aside>     <!-- Sidebar/related content -->
<footer>    <!-- Page/section footer -->

<!-- Text Content -->
<h1> to <h6>    <!-- Headings -->
<p>             <!-- Paragraph -->
<blockquote>    <!-- Long quote -->
<figure>        <!-- Image/diagram with caption -->
<figcaption>    <!-- Caption for figure -->

<!-- Lists -->
<ul>    <!-- Unordered list -->
<ol>    <!-- Ordered list -->
<li>    <!-- List item -->
<dl>    <!-- Description list -->
<dt>    <!-- Term -->
<dd>    <!-- Definition -->
```

### Form Elements Cheat Sheet
```html
<!-- Input Types -->
<input type="text">        <!-- Single line text -->
<input type="email">       <!-- Email with validation -->
<input type="password">    <!-- Hidden text -->
<input type="number">      <!-- Numbers only -->
<input type="tel">         <!-- Phone number -->
<input type="url">         <!-- Web address -->
<input type="date">        <!-- Date picker -->
<input type="checkbox">    <!-- Multiple choice -->
<input type="radio">       <!-- Single choice -->
<input type="file">        <!-- File upload -->
<input type="submit">      <!-- Submit button -->

<!-- Other Form Elements -->
<textarea>     <!-- Multi-line text -->
<select>       <!-- Dropdown menu -->
<button>       <!-- Clickable button -->
<label>        <!-- Input label -->
<fieldset>     <!-- Group related inputs -->
<legend>       <!-- Fieldset caption -->
```

### Link Types Reference
```html
<!-- Internal Links -->
<a href="page.html">Other page</a>
<a href="#section">Same page section</a>
<a href="/">Homepage</a>

<!-- External Links -->
<a href="https://site.com" target="_blank" rel="noopener">External</a>

<!-- Special Links -->
<a href="mailto:email@example.com">Email</a>
<a href="tel:+1234567890">Phone</a>
<a href="file.pdf" download>Download</a>
```

### Common Attributes
```html
<!-- Global Attributes (work on any element) -->
id="unique-identifier"
class="styling-hook"
style="inline-css"
title="Tooltip text"
lang="en"
dir="ltr"

<!-- Link Attributes -->
href="destination"
target="_blank"
rel="noopener noreferrer"
download

<!-- Form Attributes -->
required
placeholder="Hint text"
autocomplete="name"
minlength="3"
maxlength="50"
min="0"
max="100"

<!-- Image Attributes -->
src="image.jpg"
alt="Description"
width="600"
height="400"
loading="lazy"
```

---

## Project Checklist {#project-checklist}

### HTML Structure ✓
- [ ] Valid DOCTYPE declaration
- [ ] HTML element with lang attribute
- [ ] Complete head section with meta tags
- [ ] Semantic body structure
- [ ] Proper heading hierarchy (one H1)
- [ ] All tags properly closed

### Semantic HTML ✓
- [ ] Header element for page header
- [ ] Nav element for navigation
- [ ] Main element for main content
- [ ] Section elements for major parts
- [ ] Article for self-contained content
- [ ] Footer element for page footer
- [ ] No div-soup!

### Navigation ✓
- [ ] Clear navigation structure
- [ ] All links have href attributes
- [ ] External links open in new tab
- [ ] External links have rel="noopener"
- [ ] Current page indication
- [ ] Skip links for accessibility

### Forms ✓
- [ ] All inputs have labels
- [ ] Required fields marked
- [ ] Appropriate input types used
- [ ] Placeholder text where helpful
- [ ] Fieldsets group related inputs
- [ ] Submit and reset buttons

### Content ✓
- [ ] Headings create clear outline
- [ ] Paragraphs for body text
- [ ] Lists for grouped items
- [ ] Tables for tabular data only
- [ ] Blockquotes for quotations
- [ ] Emphasis and strong used semantically

### Media ✓
- [ ] All images have alt text
- [ ] Images have width/height
- [ ] Responsive image considerations
- [ ] Videos have controls
- [ ] Embedded content works
- [ ] Loading optimization used

### Accessibility ✓
- [ ] Semantic HTML throughout
- [ ] ARIA labels where needed
- [ ] Color not sole indicator
- [ ] Keyboard navigation works
- [ ] Form inputs labeled
- [ ] Skip links provided

### SEO & Meta ✓
- [ ] Descriptive page title
- [ ] Meta description included
- [ ] Open Graph tags for sharing
- [ ] Semantic markup used
- [ ] Heading hierarchy logical
- [ ] Alt text descriptive

---

## Troubleshooting Guide {#troubleshooting}

### Common HTML Problems

#### Problem: "My page looks like plain text"
**Causes & Solutions**:
```html
<!-- Check 1: Missing DOCTYPE -->
<!-- ❌ Without DOCTYPE, browser may use quirks mode -->
<html>

<!-- ✅ Always start with DOCTYPE -->
<!DOCTYPE html>
<html>

<!-- Check 2: Incorrect file extension -->
<!-- Make sure file ends in .html not .txt or .htm -->

<!-- Check 3: Not opening in browser -->
<!-- Right-click → Open with → Web Browser -->
```

#### Problem: "My links don't work"
**Causes & Solutions**:
```html
<!-- Check 1: Missing href -->
<!-- ❌ -->
<a>Click here</a>

<!-- ✅ -->
<a href="page.html">Click here</a>

<!-- Check 2: Wrong path -->
<!-- ❌ -->
<a href="C:\Users\Name\page.html">Link</a>

<!-- ✅ Use relative paths -->
<a href="page.html">Link</a>
<a href="../page.html">Link</a>

<!-- Check 3: Typo in anchor -->
<a href="#about">About</a>  <!-- Link -->
<section id="abuot">  <!-- ❌ Typo! -->
```

#### Problem: "My form doesn't submit"
**Causes & Solutions**:
```html
<!-- Check 1: Missing action -->
<form>  <!-- ❌ Where does it go? -->
<form action="/submit" method="POST">  <!-- ✅ -->

<!-- Check 2: Button type -->
<button>Submit</button>  <!-- ❌ Default type is "button" -->
<button type="submit">Submit</button>  <!-- ✅ -->

<!-- Check 3: JavaScript preventing default -->
<!-- Remove any onclick="return false" -->
```

#### Problem: "Images not showing"
**Causes & Solutions**:
```html
<!-- Check 1: Wrong path -->
<img src="iamge.jpg">  <!-- ❌ Typo -->
<img src="image.jpg">  <!-- ✅ -->

<!-- Check 2: Case sensitivity -->
<img src="photo.JPG">  <!-- File is photo.jpg -->

<!-- Check 3: Missing alt (not visible but required) -->
<img src="photo.jpg">  <!-- ❌ -->
<img src="photo.jpg" alt="Description">  <!-- ✅ -->

<!-- Check 4: Hot-linking blocked -->
<!-- Download image and host locally -->
```

#### Problem: "Special characters showing weird"
**Causes & Solutions**:
```html
<!-- Check 1: Missing charset -->
<head>
    <title>Page</title>  <!-- ❌ -->
</head>

<head>
    <meta charset="UTF-8">  <!-- ✅ First thing! -->
    <title>Page</title>
</head>

<!-- Check 2: Use HTML entities -->
&copy; instead of ©
&amp; instead of &
&lt; instead of <
&gt; instead of >
```

### Validation Errors

#### Using W3C Validator
1. Go to validator.w3.org
2. Paste your HTML
3. Fix errors from top to bottom

#### Common Validation Errors:
```html
<!-- Error: Duplicate ID -->
<div id="header">...</div>
<div id="header">...</div>  <!-- ❌ IDs must be unique -->

<!-- Fix: Use classes for multiple elements -->
<div class="header">...</div>
<div class="header">...</div>  <!-- ✅ -->

<!-- Error: Unclosed tag -->
<p>This is a paragraph  <!-- ❌ Missing </p> -->
<p>Next paragraph</p>

<!-- Error: Bad nesting -->
<p>This is <strong>bold text</p></strong>  <!-- ❌ -->
<p>This is <strong>bold text</strong></p>  <!-- ✅ -->

<!-- Error: Obsolete tags -->
<center>Centered text</center>  <!-- ❌ -->
<p style="text-align: center;">Centered text</p>  <!-- ✅ -->
```

### Browser Compatibility

#### Testing Across Browsers:
1. Chrome (most popular)
2. Firefox (good dev tools)
3. Safari (Mac/iOS)
4. Edge (Windows)

#### Common Compatibility Issues:
```html
<!-- Form validation -->
<input type="email" required>  <!-- May not work in old browsers -->
<!-- Provide JavaScript fallback -->

<!-- Semantic elements -->
<main>  <!-- IE doesn't recognize -->
<!-- Solution: Include HTML5 shiv for old IE -->

<!-- Video formats -->
<video>
    <source src="video.mp4" type="video/mp4">  <!-- Most compatible -->
    <source src="video.webm" type="video/webm">  <!-- Fallback -->
</video>
```

### Performance Issues

#### Problem: "Page loads slowly"
```html
<!-- Optimize images -->
<!-- ❌ Huge unoptimized image -->
<img src="photo-4000x3000.jpg" width="400">

<!-- ✅ Properly sized image -->
<img src="photo-400x300.jpg" width="400" height="300">

<!-- Lazy load images below fold -->
<img src="photo.jpg" loading="lazy" alt="Description">

<!-- Minimize HTTP requests -->
<!-- Instead of many small images, consider CSS sprites -->
```

### Debugging Tips

1. **Use Browser DevTools**:
   - Right-click → Inspect
   - Check Console for errors
   - Use Elements tab to see HTML
   - Network tab shows loading issues

2. **Validate Your HTML**:
   - validator.w3.org
   - Fix errors top to bottom
   - Warnings can often be ignored

3. **Test Incrementally**:
   - Save and test after each change
   - Don't write 500 lines then test
   - Use Live Server extension

4. **Read Error Messages**:
   - They usually tell you exactly what's wrong
   - Google exact error messages
   - Check line numbers

---

## Next Steps {#next-steps}

### Congratulations! 🎉

You've completed Module 2 and mastered HTML! You can now:
- Write semantic, accessible HTML
- Structure complete web pages
- Create forms that collect user data  
- Build navigation systems
- Embed media properly
- Debug HTML issues

### What's Coming in Module 3

**CSS - Making It Beautiful** 🎨

You'll learn to:
- Add colors, fonts, and spacing
- Create layouts with Flexbox and Grid
- Make responsive designs
- Add animations and transitions
- Style your portfolio beautifully

### Practice Projects for This Week

#### Project 1: Build a Recipe Website
Create a 3-page recipe site:
- Homepage with recipe list
- Individual recipe pages
- Submit recipe form

Focus on:
- Semantic structure
- Proper headings
- Lists for ingredients
- Ordered lists for steps

#### Project 2: Create a Band/Artist Site
Build a site for a favorite band:
- Homepage with hero image
- Tour dates table
- Media gallery
- Contact/booking form

#### Project 3: Local Business Site
Design for a fictional business:
- Services page with descriptions
- About page with team
- Contact with map embed
- Hours table

### Resources for Continued Learning

#### Official Documentation
- MDN HTML Reference: developer.mozilla.org/HTML
- W3C HTML Spec: w3.org/TR/html52
- WHATWG Living Standard: html.spec.whatwg.org

#### Practice Platforms
- freeCodeCamp HTML Course
- Codecademy HTML Path
- W3Schools HTML Tutorial

#### HTML Tools
- W3C Validator: validator.w3.org
- HTML5 Outliner: gsnedders.html5.org/outliner
- Can I Use: caniuse.com

### Building Your HTML Mindset

1. **Structure First**: Always plan structure before styling
2. **Semantic Always**: Choose tags for meaning, not appearance
3. **Accessibility Default**: Build accessible from the start
4. **Validate Often**: Check your HTML regularly
5. **Read Specs**: MDN is your best friend
6. **Practice Daily**: Even 15 minutes helps

### Final Thoughts

HTML might seem simple compared to programming languages, but it's the FOUNDATION of the web. Every website, no matter how complex, starts with HTML.

You've learned to speak the language of the web. Your HTML creates structure that:
- Search engines can understand
- Screen readers can navigate
- Browsers can display
- CSS can style
- JavaScript can manipulate

In Module 3, you'll make your HTML beautiful with CSS. But remember - good HTML doesn't need CSS to be functional. That's the beauty of semantic markup!

Keep building. Keep learning. Keep structuring.

Welcome to the community of web developers! 🚀

---

## HTML Mastery Tips

### Think Like HTML
- Every piece of content has a purpose
- Choose tags based on meaning
- Structure creates understanding

### Code Like a Pro
- Indent consistently
- Comment complex sections
- Validate before deploying

### Build for Everyone
- Alt text isn't optional
- Labels aren't suggestions  
- Semantic HTML is universal

Remember: You're not just writing code - you're structuring information for the entire world to access. That's the power and responsibility of HTML! 💪