# Module 7: Going Backend - Introduction to Node.js
## Complete Reference Guide

### 📚 How to Use This Guide
This reference guide is your complete companion for Module 7. Use it to:
- Understand the difference between frontend and backend development
- Master the basics of Node.js and Express
- Build your first API from scratch
- Learn how to handle real data and user requests
- Deploy your backend to the internet
- Troubleshoot common backend issues

---

## Table of Contents

1. [Introduction: Why Backend Matters](#introduction)
2. [Chapter 1: Understanding Server-Side vs. Client-Side](#chapter-1)
3. [Chapter 2: Node.js - JavaScript Everywhere](#chapter-2)
4. [Chapter 3: Express.js - Your First Web Server](#chapter-3)
5. [Chapter 4: Routes and Endpoints - Building Your API](#chapter-4)
6. [Chapter 5: Handling Requests and Responses](#chapter-5)
7. [Chapter 6: Environment Variables - Keeping Secrets Safe](#chapter-6)
8. [Chapter 7: Connecting Frontend to Backend](#chapter-7)
9. [Chapter 8: Real-World Features](#chapter-8)
10. [Chapter 9: Deployment - Going Live](#chapter-9)
11. [Quick Reference Guide](#quick-reference)
12. [Project Checklist](#project-checklist)
13. [Troubleshooting Guide](#troubleshooting)
14. [Next Steps](#next-steps)

---

## Introduction: Why Backend Matters {#introduction}

Remember how you've been building awesome websites with HTML, CSS, and JavaScript? Well, those all run in the browser - that's called the "frontend." But what happens when you fill out a contact form and hit submit? Where does that data go? Who sends you the email confirmation? That's where the backend comes in!

### The Magic Behind Your Favorite Apps

Think about Instagram for a second:
- When you post a photo, where does it get stored? (Backend!)
- When you refresh your feed, where do new posts come from? (Backend!)
- When you DM a friend, how does the message reach them? (Backend!)

The backend is like the kitchen in a restaurant. Customers (users) see the nice dining room (frontend), but all the real magic happens in the kitchen where chefs (backend code) prepare the food (data).

### What You'll Build in This Module

By the end of this module, you'll have built:
- A contact form that actually sends emails (no more fake forms!)
- An API that stores and retrieves your portfolio projects
- A visitor counter that remembers how many people visited your site
- A fully deployed backend that anyone can use

### Frontend vs. Backend: The Ultimate Team

| Frontend (What you've learned) | Backend (What you're learning) |
|-------------------------------|-------------------------------|
| Runs in the browser | Runs on a server |
| JavaScript, HTML, CSS | JavaScript (Node.js), Express |
| Shows data to users | Stores and processes data |
| Makes things look good | Makes things actually work |
| Like a TV screen | Like a cable box/streaming service |

---

## Chapter 1: Understanding Server-Side vs. Client-Side {#chapter-1}

### The Two Sides of Web Development

Imagine you're ordering pizza online:

**Client-Side (Frontend) - Your Phone/Computer:**
- Shows the menu with pictures
- Lets you pick toppings
- Calculates the price
- Shows a "Order Placed!" message

**Server-Side (Backend) - Pizza Shop's Computer:**
- Receives your order
- Saves it to their system
- Charges your card
- Sends order to the kitchen
- Texts you when it's ready

### Why Can't Everything Be Frontend?

You might wonder: "Why not just do everything in the browser?" Here's why:

1. **Security**: You can't hide secrets in frontend code
   ```javascript
   // BAD - Everyone can see this in browser!
   const API_KEY = "super-secret-key-12345";
   ```

2. **Persistence**: Browser data disappears when you close it
   ```javascript
   // This counter resets every time you refresh
   let visitorCount = 0;
   ```

3. **Power**: Browsers can't send emails, access databases, or talk to other services

4. **Trust**: Users can modify frontend code
   ```javascript
   // Users could change this in their browser console!
   let userPoints = 100;
   userPoints = 999999; // Cheat mode activated 😈
   ```

### The Request-Response Dance

Here's how frontend and backend talk to each other:

```
Your Browser                     Backend Server
     |                                |
     |  "Hey, I need user data"       |
     |  -------------------------->   |
     |                                |
     |  "Here's the data you asked for" |
     |  <--------------------------   |
     |                                |
```

Real example - Loading Instagram:
1. You open Instagram (frontend loads)
2. Frontend says "Give me the latest posts"
3. Backend checks who you follow
4. Backend gets their recent posts
5. Backend sends posts back
6. Frontend displays them prettily

### Client-Side Code Example

Here's what you've been writing:
```javascript
// This runs in the browser
const button = document.getElementById('loadPosts');
button.addEventListener('click', async () => {
    // Ask backend for data
    const response = await fetch('https://api.example.com/posts');
    const posts = await response.json();
    
    // Display it nicely
    posts.forEach(post => {
        const div = document.createElement('div');
        div.textContent = post.title;
        document.body.appendChild(div);
    });
});
```

### Server-Side Preview

Here's what you'll be writing:
```javascript
// This runs on a server
app.get('/posts', (req, res) => {
    // Get posts from database
    const posts = database.getAllPosts();
    
    // Send them to whoever asked
    res.json(posts);
});
```

### The Key Differences

| Aspect | Client-Side | Server-Side |
|--------|-------------|-------------|
| Where it runs | User's browser | Your server |
| Language | JavaScript | JavaScript (Node.js) |
| Can be modified by | Anyone | Only you |
| Has access to | DOM, browser APIs | Files, databases, secrets |
| Good for | UI, animations, interactions | Data, security, processing |

---

## Chapter 2: Node.js - JavaScript Everywhere {#chapter-2}

### What is Node.js?

Remember how JavaScript only worked in browsers? Well, some smart people thought: "What if we could run JavaScript anywhere?" That's Node.js!

Think of it like this:
- **JavaScript in Browser** = Apps on your phone
- **JavaScript in Node.js** = Apps on your computer

Node.js lets JavaScript:
- Read and write files
- Connect to databases
- Create web servers
- Send emails
- Do basically anything!

### Installing Node.js

First, let's check if you already have it:
```bash
node --version
# Should show something like: v18.17.0
```

If not, go to [nodejs.org](https://nodejs.org) and download the LTS version (like getting the stable version of an app, not the beta).

### Your First Node.js Program

Create a file called `hello.js`:
```javascript
// This is NOT running in a browser!
console.log("Hello from Node.js!");

// You can do things browsers can't
const fs = require('fs');
fs.writeFileSync('message.txt', 'Node.js is awesome!');
console.log("Created a file!");
```

Run it:
```bash
node hello.js
```

Boom! You just:
1. Ran JavaScript outside a browser
2. Created a file on your computer
3. Became a backend developer!

### Node.js Powers

Here's what Node.js can do that browsers can't:

```javascript
// 1. Work with files
const fs = require('fs');
const data = fs.readFileSync('secrets.txt', 'utf8');

// 2. Access environment info
console.log("Running on:", process.platform); // 'darwin', 'win32', etc.
console.log("Your username:", process.env.USER);

// 3. Create servers
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Hello World!');
});

// 4. Connect to databases
const database = require('some-database');
const users = database.query('SELECT * FROM users');

// 5. Send emails
const email = require('some-email-service');
email.send('friend@example.com', 'Hello!');
```

### NPM - Node Package Manager

NPM is like the App Store for Node.js. Need to send emails? There's a package. Need to work with dates? Package. Need to make your console text rainbow? Yep, package for that too!

```bash
# Initialize a new project
npm init -y

# Install a package
npm install express

# Install a fun one
npm install cowsay
```

Using a package:
```javascript
const cowsay = require('cowsay');

console.log(cowsay.say({
    text: "Node.js is moo-velous!",
    e: "oO",
    T: "U "
}));
// Outputs an ASCII cow saying your message!
```

### The package.json File

This is like your project's ID card:
```json
{
  "name": "my-awesome-backend",
  "version": "1.0.0",
  "description": "My first backend project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.0.3"
  }
}
```

### Common Node.js Patterns

1. **Requiring Modules**
```javascript
// Built-in modules
const fs = require('fs');
const path = require('path');

// Installed packages
const express = require('express');

// Your own files
const myUtils = require('./utils.js');
```

2. **Exporting Your Code**
```javascript
// In math-helpers.js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

module.exports = { add, multiply };

// In another file
const { add, multiply } = require('./math-helpers');
console.log(add(5, 3)); // 8
```

3. **Working with Async Code**
```javascript
// Callbacks (old way)
fs.readFile('data.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Promises (better way)
const readFilePromise = require('fs').promises;
readFilePromise.readFile('data.txt')
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Async/Await (best way)
async function readMyFile() {
    try {
        const data = await readFilePromise.readFile('data.txt');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}
```

### Node.js vs Browser JavaScript

| Feature | Browser JavaScript | Node.js |
|---------|-------------------|----------|
| `document` object | ✅ Yes | ❌ No |
| `window` object | ✅ Yes | ❌ No |
| `fs` (file system) | ❌ No | ✅ Yes |
| `process` object | ❌ No | ✅ Yes |
| DOM manipulation | ✅ Yes | ❌ No |
| Create servers | ❌ No | ✅ Yes |
| `require()` | ❌ No* | ✅ Yes |
| `import/export` | ✅ Yes | ✅ Yes |

*Modern browsers support ES6 modules, but not CommonJS `require()`

---

## Chapter 3: Express.js - Your First Web Server {#chapter-3}

### What is Express?

If Node.js is like having a kitchen, Express is like having all the kitchen appliances. You COULD cook everything over a campfire (raw Node.js), but why would you when you have a microwave, oven, and air fryer (Express)?

Express makes building web servers as easy as:
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000);
```

That's it! You have a working web server!

### Installing Express

```bash
npm install express
```

### Your First Express Server

Create `server.js`:
```javascript
// Import Express
const express = require('express');

// Create an app
const app = express();

// Define what happens when someone visits your site
app.get('/', (req, res) => {
    res.send('<h1>Welcome to my backend!</h1>');
});

// Start listening for visitors
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
```

Run it:
```bash
node server.js
```

Visit http://localhost:3000 in your browser. Congratulations! You're running a web server on your computer!

### Understanding the Code

Let's break down what each line does:

```javascript
const express = require('express');
// Imports Express, like adding a tool to your toolbox

const app = express();
// Creates your application, like turning on the kitchen

app.get('/', (req, res) => {
    // This runs when someone visits your homepage
    // 'req' = request (what they're asking for)
    // 'res' = response (what you send back)
    res.send('<h1>Welcome!</h1>');
});

app.listen(3000, () => {
    // Starts the server on port 3000
    // Like saying "I'm open for business!"
    console.log('Server is running!');
});
```

### Adding More Routes

Your server can handle different URLs:

```javascript
// Homepage
app.get('/', (req, res) => {
    res.send('Homepage');
});

// About page
app.get('/about', (req, res) => {
    res.send('About me page');
});

// Contact page
app.get('/contact', (req, res) => {
    res.send('Contact me page');
});

// User profiles
app.get('/user/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Profile page for ${username}`);
});
```

### Sending Different Types of Responses

```javascript
// Send HTML
app.get('/html', (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>HTML Response</h1>
                <p>This is a full HTML page!</p>
            </body>
        </html>
    `);
});

// Send JSON (for APIs)
app.get('/api/user', (req, res) => {
    res.json({
        name: 'John Doe',
        age: 17,
        hobbies: ['coding', 'gaming', 'music']
    });
});

// Send a file
app.get('/download', (req, res) => {
    res.sendFile(__dirname + '/files/document.pdf');
});

// Redirect to another page
app.get('/old-page', (req, res) => {
    res.redirect('/new-page');
});
```

### Handling Different HTTP Methods

Remember CRUD from databases? HTTP has methods for that:

```javascript
// GET - Read data
app.get('/posts', (req, res) => {
    res.json(allPosts);
});

// POST - Create new data
app.post('/posts', (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    res.json({ message: 'Post created!' });
});

// PUT - Update existing data
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    posts[id] = { ...posts[id], ...updates };
    res.json({ message: 'Post updated!' });
});

// DELETE - Remove data
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    posts.splice(id, 1);
    res.json({ message: 'Post deleted!' });
});
```

### Middleware - The Express Superpower

Middleware is code that runs BETWEEN the request and your response. Think of it like Instagram filters - the photo (request) goes through filters (middleware) before being posted (response).

```javascript
// Logger middleware - tracks all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next(); // Pass control to the next middleware
});

// Body parser - lets you read POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - serve CSS, JS, images
app.use(express.static('public'));

// Custom auth middleware
const requireAuth = (req, res, next) => {
    if (req.headers.authorization) {
        next(); // User is logged in, continue
    } else {
        res.status(401).send('Please log in first!');
    }
};

// Use on specific routes
app.get('/secret', requireAuth, (req, res) => {
    res.send('Secret data!');
});
```

### Error Handling

Things go wrong. Here's how to handle it gracefully:

```javascript
// Handle 404 - Page not found
app.use((req, res) => {
    res.status(404).send('Page not found! 🤷‍♂️');
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! 💥');
});

// In your routes
app.get('/user/:id', async (req, res, next) => {
    try {
        const user = await database.getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error); // Pass to error handler
    }
});
```

### Express Project Structure

Here's how pros organize Express apps:

```
my-app/
├── node_modules/      # Installed packages
├── public/            # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── views/             # HTML templates
├── routes/            # Route handlers
│   ├── users.js
│   └── posts.js
├── middleware/        # Custom middleware
├── config/            # Configuration files
├── .env              # Environment variables
├── .gitignore        # Files to ignore in git
├── package.json      # Project info and dependencies
└── server.js         # Main server file
```

---

## Chapter 4: Routes and Endpoints - Building Your API {#chapter-4}

### What's an API?

API stands for Application Programming Interface. That sounds scary, but it's actually simple!

Think of an API like a restaurant menu:
- The menu (API documentation) tells you what you can order
- Each dish (endpoint) has a specific name
- You order (make a request) using that name
- The kitchen (server) prepares and delivers your food (response)

### RESTful API Design

REST is a set of rules for building good APIs. It's like grammar for APIs:

```javascript
// Bad API design (confusing, inconsistent)
app.get('/getUsers', ...)
app.post('/create-new-user', ...)
app.get('/Delete_User', ...)

// Good API design (clear, consistent)
app.get('/users', ...)        // Get all users
app.get('/users/:id', ...)    // Get one user
app.post('/users', ...)       // Create user
app.put('/users/:id', ...)    // Update user
app.delete('/users/:id', ...) // Delete user
```

### Building a Complete API

Let's build a real API for a todo list app:

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Fake database (in real apps, use a real database)
let todos = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build an API', completed: false }
];
let nextId = 3;

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET /todos/:id - Get one todo
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
});

// POST /todos - Create new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = {
        id: nextId++,
        title,
        completed: false
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Update todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos[todoIndex] = {
        ...todos[todoIndex],
        ...req.body
    };
    
    res.json(todos[todoIndex]);
});

// DELETE /todos/:id - Delete todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos.splice(todoIndex, 1);
    res.status(204).send(); // 204 = Success, no content
});

app.listen(3000, () => {
    console.log('Todo API running on port 3000');
});
```

### Query Parameters

Sometimes you want to filter or sort data:

```javascript
// GET /todos?completed=true&sort=title
app.get('/todos', (req, res) => {
    let result = [...todos];
    
    // Filter by completed status
    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        result = result.filter(todo => todo.completed === completed);
    }
    
    // Sort by field
    if (req.query.sort) {
        result.sort((a, b) => {
            if (a[req.query.sort] < b[req.query.sort]) return -1;
            if (a[req.query.sort] > b[req.query.sort]) return 1;
            return 0;
        });
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedResult = result.slice(startIndex, endIndex);
    
    res.json({
        data: paginatedResult,
        total: result.length,
        page,
        totalPages: Math.ceil(result.length / limit)
    });
});
```

### API Versioning

As your API grows, you might need to make breaking changes:

```javascript
// Version 1
app.get('/api/v1/users', (req, res) => {
    res.json(users.map(u => ({
        id: u.id,
        name: u.name // v1 only has name
    })));
});

// Version 2 - Breaking change!
app.get('/api/v2/users', (req, res) => {
    res.json(users.map(u => ({
        id: u.id,
        firstName: u.firstName, // v2 splits name
        lastName: u.lastName
    })));
});
```

### Status Codes - Speaking HTTP

Status codes tell the client what happened:

```javascript
// 2xx - Success
res.status(200).json({ message: 'OK' });           // Success
res.status(201).json({ message: 'Created' });      // Created new resource
res.status(204).send();                            // Success, no content

// 4xx - Client errors
res.status(400).json({ error: 'Bad request' });    // Invalid data
res.status(401).json({ error: 'Unauthorized' });   // Not logged in
res.status(403).json({ error: 'Forbidden' });      // No permission
res.status(404).json({ error: 'Not found' });      // Resource doesn't exist

// 5xx - Server errors
res.status(500).json({ error: 'Server error' });   // Something broke
res.status(503).json({ error: 'Service unavailable' }); // Server overloaded
```

### API Documentation

Good APIs come with instructions:

```javascript
// Route: GET /api/posts
// Description: Get all posts with optional filtering
// Query params:
//   - category (string): Filter by category
//   - limit (number): Max posts to return
//   - page (number): Page number for pagination
// Response: Array of post objects
// Example: GET /api/posts?category=tech&limit=10&page=1

app.get('/api/posts', (req, res) => {
    // Implementation here
});
```

### Testing Your API

Use tools like Postman or curl:

```bash
# GET request
curl http://localhost:3000/todos

# POST request
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo"}'

# PUT request
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# DELETE request
curl -X DELETE http://localhost:3000/todos/1
```

---

## Chapter 5: Handling Requests and Responses {#chapter-5}

### The Request Object

The request (`req`) object contains everything about what the client wants:

```javascript
app.get('/example/:id', (req, res) => {
    console.log(req.params);    // URL parameters
    console.log(req.query);     // Query string
    console.log(req.body);      // POST data
    console.log(req.headers);   // Request headers
    console.log(req.method);    // GET, POST, etc.
    console.log(req.url);       // Full URL
    console.log(req.ip);        // Client's IP address
});
```

### Working with Request Data

1. **URL Parameters**
```javascript
// Route: /users/:userId/posts/:postId
app.get('/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    // userId and postId are strings from the URL
    res.json({ userId, postId });
});
```

2. **Query Strings**
```javascript
// URL: /search?q=javascript&limit=10
app.get('/search', (req, res) => {
    const { q, limit = 20 } = req.query;
    // q = "javascript", limit = "10" (strings!)
    const results = searchDatabase(q, parseInt(limit));
    res.json(results);
});
```

3. **Request Body**
```javascript
// Need middleware to parse body
app.use(express.json());

app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    
    // Validation
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Name and email are required' 
        });
    }
    
    // Create user...
});
```

4. **Headers**
```javascript
app.get('/api/data', (req, res) => {
    // Check authentication
    const token = req.headers.authorization;
    
    // Check content type
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({ 
            error: 'Content-Type must be application/json' 
        });
    }
    
    // Custom headers
    const apiVersion = req.headers['x-api-version'];
});
```

### The Response Object

The response (`res`) object is how you send data back:

```javascript
// Send text
res.send('Hello World');

// Send HTML
res.send('<h1>Welcome</h1>');

// Send JSON
res.json({ name: 'John', age: 17 });

// Set status code
res.status(404).send('Not found');

// Set headers
res.set('Content-Type', 'text/html');
res.set('X-Custom-Header', 'value');

// Chain methods
res.status(201)
   .set('Location', '/users/123')
   .json({ id: 123, name: 'New User' });
```

### Handling Form Data

HTML forms can send data in different ways:

```javascript
// URL-encoded form data (default HTML forms)
app.use(express.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Process form data...
    res.send('Thanks for contacting us!');
});

// Multipart form data (file uploads)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('photo'), (req, res) => {
    console.log(req.file); // Uploaded file info
    res.json({ 
        filename: req.file.filename,
        size: req.file.size 
    });
});
```

### Input Validation

Never trust user input! Always validate:

```javascript
app.post('/register', (req, res) => {
    const { username, email, password, age } = req.body;
    const errors = [];
    
    // Check required fields
    if (!username) errors.push('Username is required');
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    
    // Validate format
    if (email && !email.includes('@')) {
        errors.push('Invalid email format');
    }
    
    // Validate length
    if (password && password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }
    
    // Validate age
    if (age && (age < 13 || age > 120)) {
        errors.push('Age must be between 13 and 120');
    }
    
    // Check for errors
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    // All good, create user...
});
```

### Sanitizing Input

Clean user input to prevent security issues:

```javascript
// Example: Prevent XSS attacks
const sanitizeHtml = require('sanitize-html');

app.post('/comment', (req, res) => {
    const { text } = req.body;
    
    // Remove dangerous HTML
    const cleanText = sanitizeHtml(text, {
        allowedTags: ['b', 'i', 'em', 'strong'],
        allowedAttributes: {}
    });
    
    // Save clean text to database...
});

// Example: SQL injection prevention (using parameterized queries)
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    
    // BAD - SQL injection vulnerable
    // const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    
    // GOOD - Safe from SQL injection
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    res.json(user);
});
```

### Async Request Handlers

Most real-world handlers are async:

```javascript
// Using async/await
app.get('/users/:id', async (req, res) => {
    try {
        const user = await database.getUser(req.params.id);
        const posts = await database.getUserPosts(user.id);
        
        res.json({
            user,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Handling multiple async operations
app.post('/order', async (req, res) => {
    try {
        // Validate inventory
        const inStock = await checkInventory(req.body.items);
        if (!inStock) {
            return res.status(400).json({ error: 'Items out of stock' });
        }
        
        // Create order
        const order = await createOrder(req.body);
        
        // Charge payment
        const payment = await chargeCard(order.total, req.body.card);
        
        // Send confirmation email
        await sendEmail(req.body.email, 'Order confirmed!');
        
        res.json({ orderId: order.id, status: 'success' });
    } catch (error) {
        // Handle specific errors
        if (error.type === 'payment_failed') {
            res.status(402).json({ error: 'Payment failed' });
        } else {
            res.status(500).json({ error: 'Order processing failed' });
        }
    }
});
```

---

## Chapter 6: Environment Variables - Keeping Secrets Safe {#chapter-6}

### What Are Environment Variables?

Remember how you shouldn't put passwords in your code? Environment variables are the solution! They're like a secret vault for your app.

Think of it like:
- Your code = A recipe book (public)
- Environment variables = Your secret ingredients (private)

### Why Environment Variables Matter

```javascript
// NEVER DO THIS! 🚨
const apiKey = 'sk-1234567890abcdef';
const databasePassword = 'superSecretPassword123';

// DO THIS INSTEAD ✅
const apiKey = process.env.API_KEY;
const databasePassword = process.env.DB_PASSWORD;
```

### Setting Up Environment Variables

1. Install dotenv:
```bash
npm install dotenv
```

2. Create a `.env` file:
```bash
# .env file
PORT=3000
NODE_ENV=development
API_KEY=sk-1234567890abcdef
DB_HOST=localhost
DB_USER=myapp
DB_PASS=secretpassword
EMAIL_SERVICE=gmail
EMAIL_USER=myapp@gmail.com
EMAIL_PASS=appspecificpassword
```

3. Load them in your app:
```javascript
// At the very top of your main file
require('dotenv').config();

// Now you can use them
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

console.log(`Server running on port ${port}`);
```

### CRITICAL: Never Commit .env Files!

Add to `.gitignore`:
```
# .gitignore
node_modules/
.env
.env.local
.env.production
```

### Different Environments

Apps run in different places:

```javascript
// Check which environment
const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
    console.log('Running in development mode');
    // Show detailed errors
    app.use(errorHandler({ detailed: true }));
} else if (environment === 'production') {
    console.log('Running in production mode');
    // Hide error details from users
    app.use(errorHandler({ detailed: false }));
}
```

### Common Environment Variables

```bash
# Server settings
PORT=3000
NODE_ENV=development
HOST=localhost

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=dbuser
DB_PASS=dbpassword

# API Keys
STRIPE_SECRET_KEY=sk_test_abc123
SENDGRID_API_KEY=SG.abc123
OPENAI_API_KEY=sk-abc123
GOOGLE_MAPS_KEY=AIza123

# Authentication
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=myapp@gmail.com
EMAIL_PASS=app-specific-password

# URLs
CLIENT_URL=http://localhost:3001
API_URL=http://localhost:3000
```

### Using Environment Variables Safely

```javascript
// Create a config file
// config.js
module.exports = {
    port: process.env.PORT || 3000,
    database: {
        url: process.env.DATABASE_URL,
        options: {
            ssl: process.env.NODE_ENV === 'production'
        }
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h'
    }
};

// Use in your app
const config = require('./config');

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
```

### Validation

Make sure required variables exist:

```javascript
// Check required environment variables
const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'API_KEY'
];

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`Error: ${varName} is not set!`);
        process.exit(1); // Stop the app
    }
});

// Or use a validation library
const envalid = require('envalid');

const env = envalid.cleanEnv(process.env, {
    PORT: envalid.port({ default: 3000 }),
    NODE_ENV: envalid.str({ 
        choices: ['development', 'production', 'test'],
        default: 'development'
    }),
    DATABASE_URL: envalid.url(),
    API_KEY: envalid.str()
});
```

### Environment Variables in Different Platforms

**Local Development (.env file):**
```bash
API_KEY=test_key_12345
```

**Heroku:**
```bash
heroku config:set API_KEY=production_key_67890
```

**Vercel:**
```bash
vercel env add API_KEY
```

**Railway:**
Add through the dashboard UI

### Best Practices

1. **Use descriptive names**
```bash
# Bad
KEY=abc123
PASS=secret

# Good
STRIPE_API_KEY=abc123
DATABASE_PASSWORD=secret
```

2. **Group related variables**
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

3. **Provide examples**
Create `.env.example`:
```bash
# Copy this to .env and fill in your values
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
API_KEY=your_api_key_here
```

4. **Use different values for different environments**
```javascript
// Development uses test keys
if (process.env.NODE_ENV === 'development') {
    process.env.STRIPE_KEY = process.env.STRIPE_TEST_KEY;
} else {
    process.env.STRIPE_KEY = process.env.STRIPE_LIVE_KEY;
}
```

---

## Chapter 7: Connecting Frontend to Backend {#chapter-7}

### The Full Stack Connection

Now comes the exciting part - making your frontend and backend talk to each other!

```
Frontend (React/HTML/JS)    ←→    Backend (Node.js/Express)
         ↓                              ↓
    User sees UI                   Handles data
```

### CORS - Cross-Origin Resource Sharing

When your frontend and backend are on different ports/domains, you need CORS:

```javascript
// Install cors
npm install cors

// In your Express app
const cors = require('cors');

// Allow all origins (development only!)
app.use(cors());

// Or configure for production
app.use(cors({
    origin: 'https://yourfrontend.com',
    credentials: true // Allow cookies
}));
```

### Frontend: Making API Calls

Here's how to call your backend from frontend:

```javascript
// Using Fetch API
async function loadTodos() {
    try {
        const response = await fetch('http://localhost:3000/todos');
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('Failed to load todos:', error);
    }
}

// POST request with data
async function createTodo(title) {
    try {
        const response = await fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create todo');
        }
        
        const newTodo = await response.json();
        return newTodo;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### Building a Complete Feature

Let's build a contact form that actually works:

**Backend (Express):**
```javascript
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: 'All fields are required' 
        });
    }
    
    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'your-email@example.com',
        subject: `Contact form: ${name}`,
        text: `From: ${name} (${email})\n\nMessage:\n${message}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ 
            error: 'Failed to send email' 
        });
    }
});
```

**Frontend (HTML + JavaScript):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
    <style>
        .form-group { margin-bottom: 15px; }
        .error { color: red; }
        .success { color: green; }
        .loading { opacity: 0.6; }
    </style>
</head>
<body>
    <h1>Contact Us</h1>
    
    <form id="contactForm">
        <div class="form-group">
            <label>Name:</label>
            <input type="text" id="name" required>
        </div>
        
        <div class="form-group">
            <label>Email:</label>
            <input type="email" id="email" required>
        </div>
        
        <div class="form-group">
            <label>Message:</label>
            <textarea id="message" required></textarea>
        </div>
        
        <button type="submit">Send Message</button>
        
        <div id="status"></div>
    </form>

    <script>
        const form = document.getElementById('contactForm');
        const status = document.getElementById('status');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            form.classList.add('loading');
            status.textContent = 'Sending...';
            status.className = '';
            
            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    status.textContent = result.message;
                    status.className = 'success';
                    form.reset();
                } else {
                    status.textContent = result.error;
                    status.className = 'error';
                }
            } catch (error) {
                status.textContent = 'Network error. Please try again.';
                status.className = 'error';
            } finally {
                form.classList.remove('loading');
            }
        });
    </script>
</body>
</html>
```

### Authentication Flow

Here's how to add login to your app:

**Backend:**
```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fake user database
const users = [];

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Check if user exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ 
            error: 'Username already taken' 
        });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user
    const user = {
        id: users.length + 1,
        username,
        password: hashedPassword
    };
    users.push(user);
    
    // Create token
    const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    res.json({ token, username });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ 
            error: 'Invalid credentials' 
        });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ 
            error: 'Invalid credentials' 
        });
    }
    
    // Create token
    const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    res.json({ token, username });
});

// Protected route
app.get('/api/profile', authenticateToken, (req, res) => {
    res.json({ 
        message: `Hello ${req.user.username}!`,
        userId: req.user.id 
    });
});

// Middleware to check token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            error: 'Access token required' 
        });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ 
                error: 'Invalid token' 
            });
        }
        req.user = user;
        next();
    });
}
```

**Frontend:**
```javascript
// Store token after login
async function login(username, password) {
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        // Save token
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        
        // Redirect to dashboard
        window.location.href = '/dashboard.html';
    } else {
        alert(data.error);
    }
}

// Use token for protected requests
async function getProfile() {
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:3000/api/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (response.ok) {
        const profile = await response.json();
        console.log(profile);
    } else if (response.status === 401) {
        // Token expired or invalid
        localStorage.clear();
        window.location.href = '/login.html';
    }
}

// Logout
function logout() {
    localStorage.clear();
    window.location.href = '/';
}
```

### Real-time Updates with WebSockets

For features like chat or live notifications:

```javascript
// Backend
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3001"
    }
});

io.on('connection', (socket) => {
    console.log('User connected');
    
    // Join a room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-joined', socket.id);
    });
    
    // Handle chat messages
    socket.on('chat-message', (data) => {
        io.to(data.room).emit('new-message', {
            user: data.user,
            message: data.message,
            timestamp: new Date()
        });
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000);
```

```javascript
// Frontend
const socket = io('http://localhost:3000');

// Join room
socket.emit('join-room', 'general');

// Send message
function sendMessage(message) {
    socket.emit('chat-message', {
        room: 'general',
        user: currentUser,
        message: message
    });
}

// Receive messages
socket.on('new-message', (data) => {
    displayMessage(data);
});
```

---

## Chapter 8: Real-World Features {#chapter-8}

### Building a Contact Form That Sends Emails

Let's create a professional contact form:

```javascript
// Install packages
npm install nodemailer express-validator

// Backend
const { body, validationResult } = require('express-validator');

// Validation middleware
const validateContact = [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().isLength({ min: 10 }).escape()
];

app.post('/api/contact', validateContact, async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, message } = req.body;
    
    // Email template
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr>
            <p style="color: #666; font-size: 12px;">
                This email was sent from your portfolio contact form.
            </p>
        </div>
    `;
    
    try {
        // Send email
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            replyTo: email,
            to: process.env.CONTACT_EMAIL,
            subject: `Portfolio Contact: ${name}`,
            html: emailHtml
        });
        
        // Send auto-reply
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thanks for contacting me!',
            html: `
                <p>Hi ${name},</p>
                <p>Thanks for reaching out! I've received your message and will get back to you soon.</p>
                <p>Best regards,<br>Your Name</p>
            `
        });
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully!' 
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ 
            error: 'Failed to send message. Please try again.' 
        });
    }
});
```

### Building a Project API

Create a full CRUD API for portfolio projects:

```javascript
// In-memory database (replace with real DB later)
let projects = [];
let nextProjectId = 1;

// Get all projects
app.get('/api/projects', (req, res) => {
    // Filter by technology
    let filtered = [...projects];
    
    if (req.query.tech) {
        filtered = filtered.filter(p => 
            p.technologies.includes(req.query.tech)
        );
    }
    
    // Sort
    if (req.query.sort === 'date') {
        filtered.sort((a, b) => b.createdAt - a.createdAt);
    }
    
    res.json(filtered);
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    
    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
});

// Create project (protected route)
app.post('/api/projects', authenticateToken, [
    body('title').trim().isLength({ min: 3 }),
    body('description').trim().isLength({ min: 10 }),
    body('technologies').isArray({ min: 1 }),
    body('githubUrl').optional().isURL(),
    body('liveUrl').optional().isURL()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const project = {
        id: nextProjectId++,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
    };
    
    projects.push(project);
    res.status(201).json(project);
});

// Update project
app.put('/api/projects/:id', authenticateToken, async (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    
    projects[index] = {
        ...projects[index],
        ...req.body,
        updatedAt: new Date()
    };
    
    res.json(projects[index]);
});

// Delete project
app.delete('/api/projects/:id', authenticateToken, (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    
    projects.splice(index, 1);
    res.status(204).send();
});

// Track project views
app.post('/api/projects/:id/view', (req, res) => {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    
    if (project) {
        project.views++;
        res.json({ views: project.views });
    } else {
        res.status(404).json({ error: 'Project not found' });
    }
});
```

### Visitor Counter with Persistence

Track unique visitors:

```javascript
// Simple file-based storage
const fs = require('fs').promises;
const path = require('path');

const STATS_FILE = path.join(__dirname, 'stats.json');

// Load stats on startup
let stats = { totalVisits: 0, uniqueVisitors: new Set() };

async function loadStats() {
    try {
        const data = await fs.readFile(STATS_FILE, 'utf8');
        const parsed = JSON.parse(data);
        stats.totalVisits = parsed.totalVisits;
        stats.uniqueVisitors = new Set(parsed.uniqueVisitors);
    } catch (error) {
        // File doesn't exist yet
    }
}

async function saveStats() {
    const data = {
        totalVisits: stats.totalVisits,
        uniqueVisitors: Array.from(stats.uniqueVisitors)
    };
    await fs.writeFile(STATS_FILE, JSON.stringify(data, null, 2));
}

// Track visits
app.post('/api/analytics/visit', async (req, res) => {
    const visitorId = req.body.visitorId || req.ip;
    
    stats.totalVisits++;
    stats.uniqueVisitors.add(visitorId);
    
    await saveStats();
    
    res.json({
        totalVisits: stats.totalVisits,
        uniqueVisitors: stats.uniqueVisitors.size
    });
});

// Get stats
app.get('/api/analytics/stats', (req, res) => {
    res.json({
        totalVisits: stats.totalVisits,
        uniqueVisitors: stats.uniqueVisitors.size
    });
});

// Initialize
loadStats();
```

### Rate Limiting

Prevent abuse of your API:

```javascript
const rateLimit = require('express-rate-limit');

// General rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per window
    message: 'Too many requests, please try again later.'
});

// Stricter limit for contact form
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Max 3 messages per hour
    message: 'Too many messages. Please wait before sending another.'
});

app.use('/api/', limiter);
app.use('/api/contact', contactLimiter);
```

### File Uploads

Handle profile pictures or project images:

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: fileFilter
});

// Upload endpoint
app.post('/api/upload/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
        filename: req.file.filename,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`
    });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
```

---

## Chapter 9: Deployment - Going Live {#chapter-9}

### Preparing for Deployment

Before deploying, make sure your app is production-ready:

```javascript
// 1. Security headers
const helmet = require('helmet');
app.use(helmet());

// 2. Compression
const compression = require('compression');
app.use(compression());

// 3. Error logging
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// 4. Production error handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(
        process.env.NODE_ENV === 'production' 
            ? 'Something went wrong!' 
            : err.stack
    );
});
```

### Free Hosting Options

#### 1. Railway

Super easy deployment:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up
```

Add environment variables in Railway dashboard.

#### 2. Render

1. Connect GitHub repo
2. Add build command: `npm install`
3. Add start command: `node server.js`
4. Set environment variables

#### 3. Vercel

For serverless deployment:

```javascript
// api/index.js
const app = require('../server');
module.exports = app;
```

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```

#### 4. Heroku (paid now)

```bash
# Create app
heroku create your-app-name

# Deploy
git push heroku main

# Set env vars
heroku config:set API_KEY=your-key
```

### Database in Production

Use a cloud database:

**PostgreSQL (Supabase - free tier):**
```javascript
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect();
```

**MongoDB (MongoDB Atlas - free tier):**
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

### Production Checklist

```javascript
// Production config
if (process.env.NODE_ENV === 'production') {
    // Use HTTPS
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            res.redirect(`https://${req.header('host')}${req.url}`);
        } else {
            next();
        }
    });
    
    // Trust proxy
    app.set('trust proxy', 1);
    
    // Secure cookies
    app.use(session({
        cookie: {
            secure: true,
            httpOnly: true,
            sameSite: 'strict'
        }
    }));
}
```

### Monitoring Your App

Know when things go wrong:

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime()
    });
});

// Simple uptime monitoring
const checkHealth = async () => {
    try {
        const response = await fetch('https://yourapp.com/health');
        if (!response.ok) {
            console.error('App is down!');
            // Send alert email
        }
    } catch (error) {
        console.error('App is unreachable!');
    }
};

// Check every 5 minutes
setInterval(checkHealth, 5 * 60 * 1000);
```

### Deployment Script

Automate your deployment:

```json
// package.json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "npm run test && npm run lint",
    "deploy": "git push origin main && git push heroku main"
  }
}
```

---

## Quick Reference Guide {#quick-reference}

### Essential Commands

```bash
# Node.js
node file.js              # Run a file
node --version           # Check version
npm init -y              # Start new project
npm install package      # Install package
npm install -D package   # Install dev dependency
npm start                # Run start script
npm run scriptname       # Run custom script

# Common packages
npm install express      # Web framework
npm install nodemon -D   # Auto-restart server
npm install dotenv       # Environment variables
npm install cors         # Enable CORS
npm install helmet       # Security headers
npm install bcrypt       # Password hashing
npm install jsonwebtoken # JWT tokens
npm install nodemailer   # Send emails
```

### Express Cheat Sheet

```javascript
// Basic server
const express = require('express');
const app = express();

// Middleware
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse forms
app.use(express.static('public'));          // Serve static files
app.use(cors());                           // Enable CORS

// Routes
app.get('/path', (req, res) => {});        // GET request
app.post('/path', (req, res) => {});       // POST request
app.put('/path/:id', (req, res) => {});    // PUT request
app.delete('/path/:id', (req, res) => {}); // DELETE request

// Request properties
req.params.id        // URL parameters
req.query.search     // Query strings
req.body            // POST data
req.headers         // Request headers
req.cookies         // Cookies
req.ip              // Client IP

// Response methods
res.send()          // Send response
res.json()          // Send JSON
res.status()        // Set status code
res.redirect()      // Redirect
res.render()        // Render template
res.sendFile()      // Send file

// Start server
app.listen(3000, () => console.log('Server running'));
```

### Common Patterns

```javascript
// Async route handler
app.get('/users', async (req, res) => {
    try {
        const users = await database.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware
const authenticate = (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Environment variables
require('dotenv').config();
const port = process.env.PORT || 3000;
```

### HTTP Status Codes

```javascript
// Success
200 - OK
201 - Created
204 - No Content

// Client Errors  
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
429 - Too Many Requests

// Server Errors
500 - Internal Server Error
503 - Service Unavailable
```

---

## Project Checklist {#project-checklist}

### Week 1 Checklist
- [ ] Installed Node.js and npm
- [ ] Created first Node.js script
- [ ] Set up Express server
- [ ] Created basic routes
- [ ] Tested with browser/Postman
- [ ] Added middleware
- [ ] Handled different HTTP methods

### Week 2 Checklist
- [ ] Built complete CRUD API
- [ ] Added input validation
- [ ] Implemented error handling
- [ ] Set up environment variables
- [ ] Connected frontend to backend
- [ ] Added CORS support
- [ ] Implemented authentication
- [ ] Deployed to production

### Final Project Requirements
- [ ] Backend server runs without errors
- [ ] All routes return appropriate responses
- [ ] Environment variables are used for secrets
- [ ] Input validation on all endpoints
- [ ] Proper error handling
- [ ] CORS configured correctly
- [ ] At least one real feature works (email, database, etc.)
- [ ] Deployed and accessible online
- [ ] Can explain how it all works

---

## Troubleshooting Guide {#troubleshooting}

### Common Errors and Solutions

#### "Cannot GET /"
```javascript
// Problem: No route for homepage
// Solution: Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});
```

#### "Cannot find module"
```bash
# Problem: Package not installed
# Solution: Install it
npm install express
```

#### "Port already in use"
```bash
# Problem: Another app using port 3000
# Solution 1: Kill the process
lsof -i :3000  # Find process
kill -9 <PID>  # Kill it

# Solution 2: Use different port
const port = process.env.PORT || 3001;
```

#### "Access-Control-Allow-Origin" error
```javascript
// Problem: CORS not enabled
// Solution: Add CORS middleware
const cors = require('cors');
app.use(cors());
```

#### "UnauthorizedError: No authorization token"
```javascript
// Problem: Forgot to send token
// Solution: Add to headers
fetch('/api/protected', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
```

#### Environment variables undefined
```javascript
// Problem: Forgot to load .env
// Solution: Add at top of file
require('dotenv').config();
```

### Debugging Tips

1. **Use console.log liberally**
```javascript
app.post('/api/data', (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    // Debug what's coming in
});
```

2. **Check middleware order**
```javascript
// CORRECT ORDER
app.use(express.json());  // Must come before routes
app.post('/api/data', ...);

// WRONG ORDER
app.post('/api/data', ...);
app.use(express.json());  // Too late!
```

3. **Use proper error messages**
```javascript
// Bad
res.status(500).send('Error');

// Good
res.status(500).json({
    error: 'Failed to process payment',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
});
```

---

## Next Steps {#next-steps}

### What You've Accomplished 🎉

By completing this module, you've:
- Built a real backend server
- Created APIs that actually work
- Connected frontend to backend
- Handled real user data
- Deployed to the internet
- Learned industry-standard tools

### Where to Go From Here

1. **Add a Database (Module 8)**
   - PostgreSQL or MongoDB
   - Store data permanently
   - Build user accounts

2. **Learn Advanced Express**
   - WebSockets for real-time features
   - GraphQL instead of REST
   - Microservices architecture

3. **Explore Other Frameworks**
   - Fastify (faster than Express)
   - NestJS (enterprise-level)
   - Deno (modern Node.js alternative)

4. **Security Deep Dive**
   - OAuth authentication
   - Rate limiting
   - SQL injection prevention
   - XSS protection

5. **DevOps Skills**
   - Docker containers
   - CI/CD pipelines
   - Monitoring and logging
   - Load balancing

### Project Ideas

**Beginner:**
- Personal blog with comments
- Todo app with user accounts
- Weather dashboard
- URL shortener

**Intermediate:**
- Chat application
- File sharing service
- API for a mobile app
- E-commerce backend

**Advanced:**
- Real-time game server
- Video streaming service
- Social media clone
- AI-powered app

### Resources

**Documentation:**
- [Node.js Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

**Learning:**
- [The Odin Project](https://www.theodinproject.com/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [JavaScript.info](https://javascript.info/)

**Community:**
- [Node.js Discord](https://discord.gg/nodejs)
- [Reddit r/node](https://reddit.com/r/node)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/node.js)

### Final Words

You've just unlocked a superpower - the ability to build the backend of ANY web application. Every app you use daily (Instagram, TikTok, Discord) has a backend just like what you've learned to build.

Remember:
- Every expert was once a beginner
- Debugging is normal, not a sign of failure
- The best way to learn is by building
- Your unique ideas matter - build them!

Keep coding, keep learning, and most importantly, keep building awesome things! The internet needs what you're going to create. 🚀

---

*"The backend is where the magic happens. Now you're the magician." - Every Senior Developer*