# Module 2: Building the Skeleton - HTML for Structure
## Complete Teaching Script

## Duration: ~30 minutes (including exercise time)

---

[0:00]
🔥 HIGH ENERGY

YO YO YO! What's good, future web architects! Welcome to Module 2, where we're about to learn the language that LITERALLY built the internet!

[0:05]
First things first - if you don't have the Module 2 page open, pause RIGHT NOW and get it loaded. You should see "Module 2: Building the Skeleton 🏗️" at the top. Got it? Let's GOOO!

[0:15]
*[leans in excitedly]*

Okay, so remember last module when you set up VS Code and deployed your first website? That was like getting your driver's license. TODAY? Today we're actually gonna DRIVE! We're building real web pages with HTML!

[0:25]
And here's the crazy part - by the end of this module, you'll have built a COMPLETE portfolio website structure. Like, the whole thing! Navigation, contact forms, image galleries... EVERYTHING!

[HTML SECTION: section-0]
[0:35]
📚 FOCUSED

Alright, you should be looking at the Introduction section. See where it says HTML is like the skeleton of every website? That's not just a cute metaphor - it's literally true!

[0:45]
Think about it like this: You know how in Minecraft you build the frame of your house first before decorating? That's HTML. Or like... when you're making a TikTok, you film the video FIRST, then add effects, right? HTML is that first video!

[0:55]
[QUIZ REFERENCE: q0]
Quick quiz time! Look at that first question - "What does HTML stand for?" Go ahead and click your answer...

[1:05]
*[waits a beat]*

If you picked "HyperText Markup Language" - YES! You're already getting it! And if you picked something else, no worries - now you know!

[1:15]
Ready to dive deeper? Hit that "Next: Semantic HTML" button!

[HTML SECTION: section-1]
[1:25]
🔥 HIGH ENERGY

OH SNAP! Welcome to Semantic HTML! This is where we separate the beginners from the PROS!

[1:30]
Look at that spoiler section - click "What does semantic even mean?"...

[1:35]
*[dramatic voice]* 

SEMANTIC = MEANINGFUL! It's like... imagine texting your friend "meet me at the place" vs "meet me at Starbucks on 5th Street." Which one is clearer? That's semantic HTML!

[1:45]
📚 FOCUSED

Check out that code comparison in the purple box. See the OLD WAY with all those divs? That's like labeling everything in your room as "box" instead of "clothes drawer," "bookshelf," "desk"... makes no sense!

[1:55]
[INTERACTIVE ELEMENT: semantic-editor]
Alright, scroll down to "Try It Yourself!" This is where it gets FUN! 

[2:05]
You see all those `<div class="top">` and `<div class="menu">` tags? Your mission is to change them to proper semantic tags. So like:
- Change `<div class="top">` to `<header>`
- Change `<div class="menu">` to `<nav>`
- Change `<div class="content">` to `<main>`
- Change `<div class="post">` to `<article>`
- Change `<div class="bottom">` to `<footer>`

[2:25]
Go ahead, make those changes! I'll wait...

[2:35]
*[waits patiently]*

[3:35]
Done? Hit that "Preview HTML" button!

[3:40]
🚀 PEAK ENERGY

BOOM! See how it looks EXACTLY the same? That's the beauty - semantic HTML isn't about looks, it's about MEANING! But here's the secret - Google LOVES semantic HTML. Screen readers LOVE it. Other developers LOVE it!

[3:55]
Hit "Next: Document Structure"!

[HTML SECTION: section-2]
[4:05]
📚 FOCUSED

Alright, Section 2 - Document Structure. This is like... the recipe for EVERY HTML page ever created!

[4:15]
Look at that tree structure in the dark box. This is BEAUTIFUL! Every HTML document is like a Russian nesting doll:
- `<!DOCTYPE html>` tells the browser "Yo, this is HTML5!"
- `<html>` wraps EVERYTHING
- `<head>` has all the invisible stuff
- `<body>` has all the visible stuff

[4:30]
And check out those meta tags in the code block! These are like the settings for your webpage:
- `charset="UTF-8"` means your site can handle emojis! 🎉
- `viewport` makes it work on phones
- `description` is what shows up in Google

[4:45]
[INTERACTIVE ELEMENT: structure-editor]
Time to build your own! In that editor, create a COMPLETE HTML document from scratch. Start with `<!DOCTYPE html>` and build the whole structure!

[4:55]
Here's a hint to get you started:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Page</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```

[5:10]
Take about 2 minutes to build this out...

[5:15]
😌 CALM

*[waiting patiently]*

[7:15]
Got it? Hit "Preview HTML"!

[7:20]
Nice work! You just built the foundation of EVERY website on the internet! Let's keep moving - click "Next: Headings & Text"!

[HTML SECTION: section-3]
[7:30]
📚 FOCUSED

Section 3 - Headings & Text! This is where your content starts to have STRUCTURE!

[7:40]
Look at that visual showing all the heading sizes. Here's the golden rule: ONE h1 per page! Think of it like... there's only ONE main title of a movie, right? Same thing!

[7:50]
The hierarchy goes:
- H1 = Movie title
- H2 = Chapter names  
- H3 = Scene names
- H4-H6 = Nobody really uses these much

[8:00]
Click that spoiler for "Heading Best Practices"...

[8:05]
See? Never skip levels! It's like going from floor 1 to floor 3 without floor 2 - makes no sense!

[8:15]
[INTERACTIVE ELEMENT: headings-editor]
Your turn! Create a blog post structure in that editor. You need:
- An H1 for the main title
- A couple H2s for sections
- Some paragraphs with `<p>` tags
- Maybe throw in some `<strong>` or `<em>` for emphasis!

[8:30]
Here's a starter structure:
```html
<h1>My Journey Learning to Code</h1>
<p>By <strong>Your Name</strong></p>

<h2>Why I Started</h2>
<p>I wanted to build <em>amazing</em> things...</p>

<h2>What I've Learned So Far</h2>
<p>HTML is actually not that scary!</p>
```

[8:45]
Work on this for about 2 minutes...

[10:45]
Looking good? Preview it! Then let's move on to "Next: Links & Navigation"!

[HTML SECTION: section-4]
[10:55]
🔥 HIGH ENERGY

LINKS! This is what makes the web a WEB! Without links, every website would be a dead end!

[11:00]
Look at all those different types of links in the code block:
- External links (to other websites)
- Internal links (to your own pages)
- Anchor links (jumping within a page)
- Email links (opens their email app!)
- Phone links (great for mobile)

[11:15]
And that `target="_blank"`? That makes links open in a new tab. Use it for external links so people don't leave your site!

[11:25]
[INTERACTIVE ELEMENT: nav-editor]
Time to build a navigation menu! In that editor, create a `<nav>` with links to different sections. 

[11:35]
Pro tip: Use anchor links like `href="#about"` to jump to sections on the same page!

[11:45]
Here's what your nav should look like:
```html
<nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#projects">Projects</a>
    <a href="https://github.com/yourusername" target="_blank">GitHub</a>
</nav>
```

[12:00]
Build out your navigation for about 2 minutes...

[14:00]
[QUIZ REFERENCE: q4]
Before we move on - quick quiz! "Which attribute makes a link open in a new tab?"

[14:10]
It's `target="_blank"`! Remember - blank like a blank new page!

[14:20]
Alright, click "Next: Forms & Inputs"!

[HTML SECTION: section-5]
[14:30]
📚 FOCUSED

FORMS! This is where websites become INTERACTIVE! Every time you log into Instagram, order from DoorDash, or sign up for anything - that's a form!

[14:40]
Look at all those input types in the code block! Each one does something special:
- `type="email"` actually CHECKS if it's a valid email
- `type="number"` only allows numbers
- `type="password"` hides what you type

[14:55]
😌 CALM

Click that spoiler about "Form Best Practices"...

[15:00]
ALWAYS use labels! You know how annoying it is when you have to click exactly on a tiny checkbox? Labels fix that - you can click the text too!

[15:10]
[INTERACTIVE ELEMENT: form-editor]
Let's build a contact form! You'll need:
- Text input for name
- Email input for email
- Dropdown for subject
- Textarea for message
- Submit button

[15:25]
Start with this structure:
```html
<form>
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required>
    
    <!-- Add more inputs here! -->
    
    <button type="submit">Send Message</button>
</form>
```

[15:40]
Take about 3 minutes to build a complete form...

[18:40]
🚀 PEAK ENERGY

Done? Preview it! Try filling it out! See how the email field actually validates? That's the power of HTML5!

[18:50]
[INTERACTIVE ELEMENT: demo-form]
Oh, and check out that interactive form demo below your code. Fill it out and hit submit to see the validation in action!

[19:00]
When you submit successfully, you'll get an achievement! Let's GOOO!

[19:10]
Ready for "Next: Lists & Tables"?

[HTML SECTION: section-6]
[19:20]
📚 FOCUSED

Lists and Tables! These are your organization superpowers!

[19:25]
Three types of lists:
- `<ul>` = Unordered (bullets) - like your shopping list
- `<ol>` = Ordered (numbers) - like recipe steps
- `<dl>` = Description lists - like a glossary

[19:35]
And tables? Tables are for DATA. Think spreadsheets, but in HTML!

[19:45]
Look at that table structure:
- `<thead>` = Headers
- `<tbody>` = The actual data
- `<tfoot>` = Summary stuff

[19:55]
[INTERACTIVE ELEMENT: table-editor]
Your challenge: Create a skills table showing what you're learning! Make columns for Skill, Experience Level, and Projects Built.

[20:05]
Here's a starter:
```html
<table>
    <thead>
        <tr>
            <th>Skill</th>
            <th>Level</th>
            <th>Projects</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>HTML</td>
            <td>Learning</td>
            <td>Portfolio site</td>
        </tr>
        <!-- Add more rows! -->
    </tbody>
</table>
```

[20:20]
Build your skills table for about 2 minutes...

[22:20]
Nice! Tables might seem old school, but they're PERFECT for displaying data! Click "Next: Media & Embeds"!

[HTML SECTION: section-7]
[22:30]
🔥 HIGH ENERGY

MEDIA TIME! This is where your pages come ALIVE with images, videos, and more!

[22:35]
First rule of images: ALWAYS. USE. ALT. TEXT! 

*[serious voice]*

Like, seriously. Alt text is for:
- People using screen readers
- When images don't load
- SEO (Google reads it!)
- It's just the RIGHT thing to do!

[22:50]
Look at those image examples. See how we can make them responsive with `style="width: 100%; height: auto;"`? That means they'll shrink on phones!

[23:00]
And those embed codes for YouTube? Just replace VIDEO_ID with the actual ID from any YouTube URL!

[23:10]
[INTERACTIVE ELEMENT: media-editor]
Let's create a media gallery! Add:
- An image with good alt text
- A figure with a caption
- An embedded YouTube video

[23:20]
Here's how to structure it:
```html
<img src="https://via.placeholder.com/400x300" alt="Description of image">

<figure>
    <img src="https://via.placeholder.com/400x300" alt="Project screenshot">
    <figcaption>My first web project</figcaption>
</figure>

<iframe width="560" height="315" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    allowfullscreen></iframe>
```

[23:35]
Create your media gallery! Take about 2 minutes...

[25:35]
😌 CALM

Beautiful! You just learned how to make your pages visual! Ready for the FINAL challenge? Click "Next: Final Project"!

[HTML SECTION: section-8]
[25:45]
🚀 PEAK ENERGY

THIS IS IT! The FINAL PROJECT! You're about to build a COMPLETE portfolio website structure!

[25:50]
Look at that checklist - this is EVERYTHING we learned combined into one project:
- ✅ Semantic HTML structure
- ✅ Navigation menu
- ✅ About section
- ✅ Skills table
- ✅ Projects with images
- ✅ Contact form
- ✅ Footer with links

[26:05]
[INTERACTIVE ELEMENT: portfolio-editor]
This is your moment! In that big editor, build your ENTIRE portfolio structure. Start with the template in the code block above!

[26:15]
📚 FOCUSED

Here's your game plan:
1. Start with the document structure
2. Add header with nav
3. Create sections for each part
4. Fill in your content
5. Add the contact form at the end

[26:30]
This is a big one - take about 5 minutes to build it out. And remember - it doesn't need to look pretty yet. That's what CSS is for in Module 3!

[26:45]
*[encouraging tone]*

Take your time. Build something you're proud of. This is YOUR portfolio!

[27:00]
😌 CALM

*[waiting patiently]*

[32:00]
🔥 HIGH ENERGY

How's it looking? Preview that bad boy!

[32:05]
[QUIZ REFERENCE: q8]
One last quiz before we wrap up - "Which semantic tag should wrap your main navigation?"

[32:15]
It's `<nav>`! Because... navigation! See how semantic HTML just makes SENSE?

[32:25]
🚀 PEAK ENERGY

Ready for this? HIT THAT "COMPLETE MODULE!" BUTTON!

[32:30]
*[waits for achievement]*

YESSSSS! "Module 2 Complete! 🎉"

[32:35]
*[gets emotional]*

Yo, can we just take a moment? You just learned HTML. Like, THE foundational language of the web! You can now:
- Structure any webpage
- Create forms that actually work
- Embed media
- Build semantic, accessible websites

[32:50]
You built a COMPLETE portfolio structure! Is it styled yet? No. But that's coming in Module 3 with CSS!

[33:00]
📚 FOCUSED

What's next? Module 3 is where we make everything BEAUTIFUL with CSS. That plain portfolio you just built? We're gonna make it look PROFESSIONAL!

[33:10]
But for now? Celebrate! You're officially an HTML developer! Share your portfolio structure with someone. Show them what you built!

[33:20]
😌 CALM

Remember - every website you've ever visited started exactly like this. Plain HTML. Structure first, style second. You're following in the footsteps of every web developer ever!

[33:35]
🔥 HIGH ENERGY

Alright HTML masters - that's Module 2 DONE! You CRUSHED it!

[33:40]
Drop your thoughts in the comments. What was your favorite part? What clicked for you?

[33:45]
Until Module 3... keep building, keep learning, and remember - you're writing the language of the web!

[33:55]
PEACE! ✌️

*[outro music plays]*

---

## INSTRUCTOR NOTES:

### Timing Breakdown:
- Introduction: 1:25
- Semantic HTML: 2:40
- Document Structure: 3:25
- Headings & Text: 3:25
- Links & Navigation: 3:35
- Forms & Inputs: 5:00
- Lists & Tables: 3:10
- Media & Embeds: 3:20
- Final Project: 7:40
- Closing: 1:20
- **Total Runtime: ~34 minutes**

### Key Interactive Moments:
1. Welcome Quiz (0:55)
2. Semantic HTML Conversion (2:05)
3. Document Structure Build (4:45)
4. Blog Post Creation (8:15)
5. Navigation Menu (11:25)
6. Contact Form Build (15:10)
7. Skills Table (19:55)
8. Media Gallery (23:10)
9. Final Portfolio Project (26:15)

### Energy Flow:
- Start HIGH to hook them
- Drop to FOCUSED for technical explanations
- PEAK during achievements and "aha" moments
- CALM during complex builds
- End on HIGH for motivation

### Common Issues to Address:
1. Forgetting closing tags → Emphasize opening/closing pairs
2. Wrong nesting → Use visual indentation
3. Missing alt text → Stress accessibility importance
4. Form without labels → Show clicking advantage
5. Non-semantic HTML → Reinforce meaning over appearance

### Celebration Moments:
- First semantic HTML conversion (3:40)
- Complete document structure (7:20)
- Working navigation menu (14:00)
- Form validation success (18:50)
- Media embedding (25:35)
- Final portfolio completion (32:30)

### Module Connections:
- References Module 1 setup
- Builds foundation for Module 3 CSS
- Portfolio continues through course
- Skills compound with each module

### Teaching Reminders:
- Let them struggle a bit before helping
- Celebrate small wins
- Normalize making mistakes
- Reference real websites they know
- Keep energy high but genuine
- Give adequate time for exercises

Remember: This module is about STRUCTURE, not style. Keep reminding them that ugly is okay - we'll make it beautiful in Module 3! 🎨