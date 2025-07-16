# Module 8: Data Persistence - Databases Basics
## Complete Reference Guide

### 📚 How to Use This Guide
This reference guide is designed to complement your interactive Module 8 HTML page. Use it to:
- Dive deeper into concepts you practiced online
- Review code examples with detailed explanations
- Find solutions to exercises and understand why they work
- Study offline or prepare for projects
- Get extra help with troubleshooting

---

## Table of Contents

1. [Introduction: Why Databases Matter](#introduction)
2. [HTML Page Overview & Navigation](#html-overview)
3. [Chapter 1: Database Fundamentals](#chapter-1)
   - Theory & Background
   - HTML Exercise Walkthrough
   - Extended Examples
   - Common Pitfalls
4. [Chapter 2: SQL vs NoSQL - Two Different Worlds](#chapter-2)
   - Understanding Structured vs Flexible Data
   - Interactive Comparisons
   - Choosing the Right Database
5. [Chapter 3: CRUD Operations - The Four Powers](#chapter-3)
   - Create: Adding New Data
   - Read: Finding What You Need
   - Update: Changing Existing Data
   - Delete: Removing Data Safely
6. [Chapter 4: Security - Protecting Your Users](#chapter-4)
   - Password Storage Done Right
   - SQL Injection Prevention
   - Data Encryption Basics
7. [Chapter 5: Database Design - Building Smart](#chapter-5)
   - Planning Your Tables
   - Relationships Between Data
   - Optimization Tips
8. [Chapter 6: Building Real Projects](#chapter-6)
   - Guestbook Implementation
   - User Authentication
   - Comment System
9. [Interactive Exercise Solutions](#exercise-solutions)
10. [Quiz Answer Explanations](#quiz-explanations)
11. [Quick Reference Guide](#quick-reference)
12. [Project Checklist](#project-checklist)
13. [Troubleshooting Guide](#troubleshooting)
14. [Next Steps](#next-steps)

---

## Introduction: Why Databases Matter {#introduction}

Remember that feeling when you built your first interactive web app, only to watch all the data disappear when you refreshed the page? Like building a sandcastle at high tide - looks great until the wave comes! That's exactly why databases are the missing piece that transforms temporary demos into real applications.

### What You Built in the Interactive Module
In the HTML page, you:
- Explored an interactive database with Users and Posts tables
- Ran queries to filter and find specific data
- Built a working guestbook that saves entries
- Created secure password storage
- Designed your own database schema

### How This Guide Enhances Your Learning
While the HTML module let you experience databases hands-on, this guide explains:
- The "why" behind every database decision
- Complete code implementations (not just snippets)
- Advanced patterns you'll need for real projects
- Solutions to common database headaches
- Security practices that prevent disasters

---

## HTML Page Overview & Navigation {#html-overview}

### Section-by-Section Breakdown
- **Section 0: Welcome to Database Magic** → Chapter 1 (Fundamentals)
- **Section 1: Database Basics** → Chapter 1 (Deep Dive)
- **Section 2: SQL vs NoSQL** → Chapter 2 (Complete Comparison)
- **Section 3: CRUD Operations** → Chapter 3 (All Four Powers)
- **Section 4: Security Basics** → Chapter 4 (Protection Strategies)
- **Section 5: Database Design** → Chapter 5 (Architecture)
- **Section 6: Project Time** → Chapter 6 (Full Implementations)

### Interactive Elements You Encountered
- **Database Explorer**: Buttons to query Users and Posts tables
- **SQL Playground**: Write and execute real SQL queries
- **CRUD Simulator**: Practice all four operations
- **Password Hasher**: See encryption in action
- **Schema Designer**: Build your own database structure
- **Guestbook App**: Complete working application

---

## Chapter 1: Database Fundamentals {#chapter-1}

### What You Discovered in Section 0-1
In the HTML's introduction, you clicked buttons to explore a mini social media database. Remember how "Show User 1's Posts" only displayed posts from coolcoder123? That was your first taste of relational data!

### The Theory Behind It

A database is more than just a place to store data - it's an intelligent system that understands relationships, enforces rules, and retrieves information at lightning speed. Think of it like this:

**Without a Database:**
```javascript
// Data lives in variables - disappears on refresh!
let users = [];
let posts = [];
```

**With a Database:**
```javascript
// Data lives permanently, survives everything
const users = await database.query('SELECT * FROM users');
// This data exists even if your server crashes!
```

### Breaking Down the Interactive Exercise

Remember the database explorer with those three buttons? Let's understand what actually happened:

```javascript
// This is what happened when you clicked "Show All Users":
const query = "SELECT * FROM users";
// Let's break this down:
// SELECT - "I want to get data"
// * - "Give me all columns (id, username, email, etc.)"
// FROM users - "From the users table"

// When you clicked "Show User 1's Posts":
const query = "SELECT * FROM posts WHERE user_id = 1";
// WHERE user_id = 1 - "But only posts from user with ID 1"

// The "Popular Posts" button did this:
const query = "SELECT * FROM posts WHERE likes > 10";
// This filters data just like Instagram's algorithm!
```

### Why Your Solution Worked

The database understood these queries because of its structure:

```javascript
// The Users table structure (schema):
{
  id: 1,          // Primary key - unique identifier
  username: "coolcoder123",
  email: "cool@example.com",
  created_at: "2024-01-15"
}

// The Posts table structure:
{
  id: 1,
  user_id: 1,     // Foreign key - links to users.id
  content: "My first post!",
  likes: 15,
  created_at: "2024-01-16"
}
```

The `user_id` in posts connects to `id` in users - that's the relationship!

### Taking It Further

Here's what the HTML didn't show you - more complex queries:

```sql
-- Find users who posted in the last week
SELECT DISTINCT u.username 
FROM users u
JOIN posts p ON u.id = p.user_id
WHERE p.created_at > DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Get user statistics
SELECT 
  username,
  COUNT(p.id) as post_count,
  AVG(p.likes) as avg_likes
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id;
```

### Common Pitfalls

1. **Forgetting the Primary Key**
   ```sql
   -- WRONG: No way to uniquely identify rows
   CREATE TABLE users (
     username VARCHAR(50),
     email VARCHAR(100)
   );
   
   -- RIGHT: Every table needs a primary key
   CREATE TABLE users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     username VARCHAR(50),
     email VARCHAR(100)
   );
   ```

2. **Not Handling NULL Values**
   ```javascript
   // This will crash if email is NULL
   const domain = user.email.split('@')[1];
   
   // Safe approach
   const domain = user.email ? user.email.split('@')[1] : 'No email';
   ```

---

## Chapter 2: SQL vs NoSQL - Two Different Worlds {#chapter-2}

### Your HTML Journey with Database Types

In Section 2, you saw the closet organization analogy. SQL is like a perfectly organized closet with labeled drawers, while NoSQL is like flexible storage bins. Let's dive deeper into when to use each.

### SQL Databases: The Structured Approach

SQL databases use tables with fixed columns - like a spreadsheet that enforces rules:

```sql
-- Creating a structured users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT CHECK (age >= 13),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- The database ENFORCES these rules:
-- • username and email must be unique
-- • age must be 13 or older
-- • created_at automatically sets to now
```

**Real SQL Example - Instagram-like app:**
```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(30) UNIQUE NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  profile_pic VARCHAR(255)
);

-- Posts table
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  caption TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Likes table (many-to-many relationship)
CREATE TABLE likes (
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, post_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
```

### NoSQL Databases: The Flexible Approach

NoSQL databases store documents that can have any structure:

```javascript
// MongoDB example - each document can be different!
const user1 = {
  _id: ObjectId("..."),
  username: "gamer123",
  email: "gamer@example.com",
  // This user has gaming stats
  gameStats: {
    level: 42,
    achievements: ["First Win", "Speed Runner"],
    highScore: 9999
  }
};

const user2 = {
  _id: ObjectId("..."),
  username: "artist456",
  email: "artist@example.com",
  // This user has completely different fields!
  portfolio: {
    artworks: [
      { title: "Sunset", likes: 45, medium: "Digital" },
      { title: "Portrait", likes: 72, medium: "Pencil" }
    ],
    exhibitions: ["Local Gallery 2024"]
  }
};
```

### When to Choose SQL vs NoSQL

**Choose SQL When:**
- Your data has clear relationships (users → posts → comments)
- You need strict data consistency (banking, e-commerce)
- You want powerful queries with JOINs
- Data structure is well-defined and stable

**Choose NoSQL When:**
- Data structure varies between records
- You need to scale horizontally (millions of users)
- You're storing varied content (user preferences, settings)
- Speed is more important than perfect consistency

### Real-World Examples

**SQL Powers:**
- Banking systems (transactions MUST be perfect)
- E-commerce (inventory, orders, customers)
- School systems (students, classes, grades)

**NoSQL Powers:**
- Social media feeds (varied post types)
- Gaming leaderboards (need speed)
- IoT sensors (different data formats)

---

## Chapter 3: CRUD Operations - The Four Powers {#chapter-3}

### What You Practiced in Section 3

The CRUD simulator in your HTML let you add tasks, view them, update, and delete. These four operations are literally EVERYTHING you can do with data!

### Create: Adding New Data

When you added a task in the simulator, here's what really happened:

```javascript
// What the button click triggered:
async function createTask(taskText) {
  // SQL approach
  const query = `
    INSERT INTO tasks (description, completed, created_at)
    VALUES (?, ?, NOW())
  `;
  await database.execute(query, [taskText, false]);
  
  // NoSQL approach (MongoDB)
  await tasksCollection.insertOne({
    description: taskText,
    completed: false,
    created_at: new Date()
  });
}
```

**Complete Create Example - User Registration:**
```javascript
async function registerUser(username, email, password) {
  try {
    // NEVER store plain passwords!
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // SQL version
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
    `;
    const result = await db.execute(query, [username, email, hashedPassword]);
    
    return {
      success: true,
      userId: result.insertId,
      message: "Welcome to the app!"
    };
    
  } catch (error) {
    // Handle duplicate username/email
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        success: false,
        message: "Username or email already exists"
      };
    }
    throw error;
  }
}
```

### Read: Finding What You Need

Reading data is the most common operation. Here's how to do it right:

```javascript
// Simple read - get all posts
async function getAllPosts() {
  const query = "SELECT * FROM posts ORDER BY created_at DESC";
  return await db.execute(query);
}

// Read with filters - search functionality
async function searchPosts(searchTerm) {
  const query = `
    SELECT p.*, u.username, u.profile_pic
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.caption LIKE ?
    OR u.username LIKE ?
    ORDER BY p.created_at DESC
    LIMIT 20
  `;
  const searchPattern = `%${searchTerm}%`;
  return await db.execute(query, [searchPattern, searchPattern]);
}

// Read with pagination - for infinite scroll
async function getPostsPaginated(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM posts
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  return await db.execute(query, [limit, offset]);
}
```

### Update: Changing Existing Data

Updates need to be precise - you don't want to accidentally change the wrong data!

```javascript
// Update a specific field
async function updateUsername(userId, newUsername) {
  // Always validate first!
  if (!newUsername || newUsername.length < 3) {
    throw new Error("Username must be at least 3 characters");
  }
  
  const query = `
    UPDATE users 
    SET username = ?, updated_at = NOW()
    WHERE id = ?
  `;
  
  const result = await db.execute(query, [newUsername, userId]);
  
  // Check if update actually happened
  if (result.affectedRows === 0) {
    throw new Error("User not found");
  }
  
  return { success: true, message: "Username updated!" };
}

// Increment likes (atomic operation)
async function likePost(postId, userId) {
  // Start a transaction for multiple operations
  const connection = await db.getConnection();
  await connection.beginTransaction();
  
  try {
    // Check if already liked
    const checkQuery = "SELECT * FROM likes WHERE post_id = ? AND user_id = ?";
    const existing = await connection.execute(checkQuery, [postId, userId]);
    
    if (existing.length > 0) {
      throw new Error("Already liked this post");
    }
    
    // Add to likes table
    await connection.execute(
      "INSERT INTO likes (post_id, user_id) VALUES (?, ?)",
      [postId, userId]
    );
    
    // Update like count
    await connection.execute(
      "UPDATE posts SET like_count = like_count + 1 WHERE id = ?",
      [postId]
    );
    
    await connection.commit();
    return { success: true, message: "Post liked!" };
    
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
```

### Delete: Removing Data Safely

Deletion is permanent - always be careful!

```javascript
// Soft delete (recommended) - data stays but is marked deleted
async function deletePost(postId, userId) {
  // Verify ownership first!
  const checkQuery = "SELECT user_id FROM posts WHERE id = ?";
  const [post] = await db.execute(checkQuery, [postId]);
  
  if (!post || post.user_id !== userId) {
    throw new Error("Not authorized to delete this post");
  }
  
  // Soft delete - just mark as deleted
  const query = `
    UPDATE posts 
    SET deleted_at = NOW(), is_deleted = true
    WHERE id = ?
  `;
  await db.execute(query, [postId]);
  
  return { success: true, message: "Post deleted" };
}

// Hard delete (permanent) - use with caution!
async function permanentlyDeleteOldPosts() {
  // Delete posts marked as deleted over 30 days ago
  const query = `
    DELETE FROM posts 
    WHERE is_deleted = true 
    AND deleted_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
  `;
  
  const result = await db.execute(query);
  console.log(`Permanently deleted ${result.affectedRows} old posts`);
}

// Cascade delete - remove related data too
async function deleteUserAccount(userId) {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  
  try {
    // Delete in correct order (children first)
    await connection.execute("DELETE FROM likes WHERE user_id = ?", [userId]);
    await connection.execute("DELETE FROM comments WHERE user_id = ?", [userId]);
    await connection.execute("DELETE FROM posts WHERE user_id = ?", [userId]);
    await connection.execute("DELETE FROM users WHERE id = ?", [userId]);
    
    await connection.commit();
    return { success: true, message: "Account deleted" };
    
  } catch (error) {
    await connection.rollback();
    throw error;
  }
}
```

### CRUD Best Practices

1. **Always Validate Input**
   ```javascript
   function validateEmail(email) {
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return regex.test(email);
   }
   ```

2. **Use Transactions for Multiple Operations**
   ```javascript
   // When multiple tables need updating together
   await connection.beginTransaction();
   try {
     await updateInventory();
     await createOrder();
     await chargePayment();
     await connection.commit();
   } catch (error) {
     await connection.rollback();
   }
   ```

3. **Handle Errors Gracefully**
   ```javascript
   try {
     await createUser(data);
   } catch (error) {
     if (error.code === 'ER_DUP_ENTRY') {
       return "Username already taken";
     }
     return "Something went wrong, please try again";
   }
   ```

---

## Chapter 4: Security - Protecting Your Users {#chapter-4}

### Your Security Experience in Section 4

Remember when you saw plain text passwords transform into those cryptic hashes? That visual demonstration showed you why "password123" becomes "$2b$10$xQlmR..." - let's understand the magic!

### Password Storage Done Right

When you tested the password hasher in the HTML, here's what bcrypt did behind the scenes:

```javascript
// NEVER do this:
const badStorage = {
  username: "user123",
  password: "mypassword"  // If hackers get this, game over!
};

// ALWAYS do this:
const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  // The '10' is the salt rounds - how much to scramble
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
  // "password123" becomes "$2b$10$xQlmR8PoNuK..."
}

async function verifyPassword(plainPassword, hashedPassword) {
  // bcrypt knows how to compare them!
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch; // true or false
}

// Complete login system:
async function login(username, password) {
  try {
    // Get user from database
    const query = "SELECT id, username, password_hash FROM users WHERE username = ?";
    const [user] = await db.execute(query, [username]);
    
    if (!user) {
      // Don't reveal if username exists!
      return { success: false, message: "Invalid credentials" };
    }
    
    // Check password
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return { success: false, message: "Invalid credentials" };
    }
    
    // Create session
    const token = generateSessionToken();
    await storeSession(user.id, token);
    
    return {
      success: true,
      token: token,
      user: {
        id: user.id,
        username: user.username
      }
    };
    
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed" };
  }
}
```

### SQL Injection Prevention

Remember the scary example where `'; DROP TABLE users; --` could delete everything? Here's how to prevent it:

```javascript
// VULNERABLE CODE - NEVER DO THIS!
async function searchUsersBad(searchTerm) {
  // If searchTerm is "'; DROP TABLE users; --"
  // This becomes: SELECT * FROM users WHERE username = ''; DROP TABLE users; --'
  const query = `SELECT * FROM users WHERE username = '${searchTerm}'`;
  return await db.execute(query); // 💥 DATABASE DESTROYED!
}

// SAFE CODE - ALWAYS DO THIS!
async function searchUsersGood(searchTerm) {
  // Parameterized queries treat input as data, not code
  const query = "SELECT * FROM users WHERE username = ?";
  return await db.execute(query, [searchTerm]); // Safe!
}

// More examples of safe queries:
async function createPost(userId, content) {
  const query = `
    INSERT INTO posts (user_id, content, created_at)
    VALUES (?, ?, NOW())
  `;
  return await db.execute(query, [userId, content]);
}

async function updateProfile(userId, bio, website) {
  // Even with multiple parameters, use placeholders
  const query = `
    UPDATE users 
    SET bio = ?, website = ?
    WHERE id = ?
  `;
  return await db.execute(query, [bio, website, userId]);
}
```

### Input Validation & Sanitization

```javascript
// Validation functions
function validateUsername(username) {
  // Only letters, numbers, underscores
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!regex.test(username)) {
    throw new Error("Username must be 3-20 characters, letters/numbers only");
  }
  return username.toLowerCase();
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    throw new Error("Invalid email format");
  }
  return email.toLowerCase();
}

function sanitizeHtml(text) {
  // Remove any HTML tags to prevent XSS
  return text.replace(/<[^>]*>/g, '');
}

// Complete registration with validation
async function registerUser(userData) {
  try {
    // Validate everything first
    const username = validateUsername(userData.username);
    const email = validateEmail(userData.email);
    const bio = sanitizeHtml(userData.bio || '');
    
    // Check password strength
    if (userData.password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(userData.password, 10);
    
    // Safe insert
    const query = `
      INSERT INTO users (username, email, password_hash, bio)
      VALUES (?, ?, ?, ?)
    `;
    
    await db.execute(query, [username, email, passwordHash, bio]);
    
    return { success: true, message: "Account created!" };
    
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return { success: false, message: "Username or email already exists" };
    }
    return { success: false, message: error.message };
  }
}
```

### Authentication & Sessions

```javascript
// Generate secure session tokens
function generateSessionToken() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

// Session management
async function createSession(userId) {
  const token = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  
  const query = `
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `;
  
  await db.execute(query, [userId, token, expiresAt]);
  return token;
}

// Middleware to check authentication
async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  try {
    // Check if session exists and is valid
    const query = `
      SELECT s.user_id, u.username
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ? AND s.expires_at > NOW()
    `;
    
    const [session] = await db.execute(query, [token]);
    
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    
    // Add user info to request
    req.user = {
      id: session.user_id,
      username: session.username
    };
    
    next();
    
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
}
```

### Data Encryption for Sensitive Information

```javascript
const crypto = require('crypto');

// For very sensitive data (like API keys, SSNs)
class Encryption {
  constructor(secretKey) {
    this.algorithm = 'aes-256-gcm';
    this.secretKey = crypto.scryptSync(secretKey, 'salt', 32);
  }
  
  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  }
  
  decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(encryptedData.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Usage example
const encryption = new Encryption(process.env.ENCRYPTION_KEY);

// Storing sensitive data
async function storeAPIKey(userId, apiKey) {
  const encrypted = encryption.encrypt(apiKey);
  
  const query = `
    INSERT INTO user_api_keys (user_id, encrypted_key, iv, auth_tag)
    VALUES (?, ?, ?, ?)
  `;
  
  await db.execute(query, [
    userId,
    encrypted.encrypted,
    encrypted.iv,
    encrypted.authTag
  ]);
}
```

---

## Chapter 5: Database Design - Building Smart {#chapter-5}

### What You Designed in Section 5

The schema designer in your HTML let you create tables and define relationships. Let's dive deep into making those designs production-ready!

### Planning Your Tables

Good database design starts with understanding your data relationships:

```javascript
// Let's design a complete social media database

// 1. Identify your entities (things you need to store)
// Users, Posts, Comments, Likes, Followers, Messages

// 2. Define relationships
// - User can have many Posts (one-to-many)
// - Post can have many Comments (one-to-many)
// - User can like many Posts, Post can have many Likes (many-to-many)
// - User can follow many Users (many-to-many with self)

// 3. Create the schema
```

**Complete Social Media Schema:**

```sql
-- Users table (the center of everything)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  profile_pic VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Indexes for faster queries
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- Posts table
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content TEXT,
  image_url VARCHAR(255),
  like_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key ensures user exists
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  
  -- Index for user's posts
  INDEX idx_user_posts (user_id, created_at)
);

-- Comments table
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  
  -- Index for post's comments
  INDEX idx_post_comments (post_id, created_at)
);

-- Likes table (many-to-many)
CREATE TABLE likes (
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Composite primary key prevents duplicate likes
  PRIMARY KEY (user_id, post_id),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  
  -- Index for finding user's likes
  INDEX idx_user_likes (user_id, created_at)
);

-- Followers table (many-to-many self-referencing)
CREATE TABLE followers (
  follower_id INT NOT NULL,
  following_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (follower_id, following_id),
  
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
  
  -- Indexes for both directions
  INDEX idx_followers (following_id),
  INDEX idx_following (follower_id)
);

-- Messages table
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
  
  -- Index for conversation view
  INDEX idx_conversation (sender_id, receiver_id, created_at)
);
```

### Understanding Relationships

**One-to-Many Example:**
```javascript
// One user has many posts
async function getUserWithPosts(userId) {
  const query = `
    SELECT 
      u.id, u.username, u.profile_pic,
      p.id as post_id, p.content, p.image_url, p.created_at
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    WHERE u.id = ?
    ORDER BY p.created_at DESC
  `;
  
  const rows = await db.execute(query, [userId]);
  
  // Transform flat rows into nested structure
  const user = {
    id: rows[0].id,
    username: rows[0].username,
    profile_pic: rows[0].profile_pic,
    posts: rows.filter(row => row.post_id).map(row => ({
      id: row.post_id,
      content: row.content,
      image_url: row.image_url,
      created_at: row.created_at
    }))
  };
  
  return user;
}
```

**Many-to-Many Example:**
```javascript
// Users liking posts
async function likePost(userId, postId) {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  
  try {
    // Insert into junction table
    await connection.execute(
      "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
      [userId, postId]
    );
    
    // Update counter for fast queries
    await connection.execute(
      "UPDATE posts SET like_count = like_count + 1 WHERE id = ?",
      [postId]
    );
    
    await connection.commit();
    
  } catch (error) {
    await connection.rollback();
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error("Already liked this post");
    }
    throw error;
  }
}

// Get all users who liked a post
async function getPostLikes(postId) {
  const query = `
    SELECT u.id, u.username, u.profile_pic
    FROM likes l
    JOIN users u ON l.user_id = u.id
    WHERE l.post_id = ?
    ORDER BY l.created_at DESC
  `;
  
  return await db.execute(query, [postId]);
}
```

### Optimization Strategies

**1. Proper Indexing:**
```sql
-- Index columns you search by frequently
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created ON posts(created_at);

-- Composite indexes for complex queries
CREATE INDEX idx_user_posts ON posts(user_id, created_at DESC);

-- Full-text search index
ALTER TABLE posts ADD FULLTEXT(content);
```

**2. Denormalization for Performance:**
```javascript
// Instead of counting likes every time:
// SELECT COUNT(*) FROM likes WHERE post_id = ?

// Store the count in posts table:
// like_count INT DEFAULT 0

// Update it when likes change:
async function updateLikeCount(postId) {
  const query = `
    UPDATE posts p
    SET like_count = (
      SELECT COUNT(*) FROM likes WHERE post_id = p.id
    )
    WHERE id = ?
  `;
  await db.execute(query, [postId]);
}
```

**3. Query Optimization:**
```javascript
// Bad: N+1 query problem
const users = await db.execute("SELECT * FROM users");
for (const user of users) {
  const posts = await db.execute(
    "SELECT * FROM posts WHERE user_id = ?",
    [user.id]
  );
  user.posts = posts;
}

// Good: Single query with JOIN
const query = `
  SELECT 
    u.*, 
    p.id as post_id, p.content, p.created_at as post_created
  FROM users u
  LEFT JOIN posts p ON u.id = p.user_id
  ORDER BY u.id, p.created_at DESC
`;
const results = await db.execute(query);

// Transform results into nested structure
const usersMap = new Map();
results.forEach(row => {
  if (!usersMap.has(row.id)) {
    usersMap.set(row.id, {
      id: row.id,
      username: row.username,
      posts: []
    });
  }
  
  if (row.post_id) {
    usersMap.get(row.id).posts.push({
      id: row.post_id,
      content: row.content,
      created_at: row.post_created
    });
  }
});
```

### Common Design Patterns

**1. Soft Deletes:**
```sql
-- Add deleted flag instead of removing data
ALTER TABLE posts ADD COLUMN deleted_at TIMESTAMP NULL;
ALTER TABLE posts ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;

-- Query only non-deleted posts
SELECT * FROM posts WHERE is_deleted = FALSE;
```

**2. Audit Trail:**
```sql
-- Track all changes
CREATE TABLE audit_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  table_name VARCHAR(50),
  record_id INT,
  action VARCHAR(20), -- INSERT, UPDATE, DELETE
  user_id INT,
  old_data JSON,
  new_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**3. Versioning:**
```sql
-- Keep history of edits
CREATE TABLE post_versions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  content TEXT,
  version_number INT,
  edited_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id),
  UNIQUE KEY (post_id, version_number)
);
```

---

## Chapter 6: Building Real Projects {#chapter-6}

### Your Project Experience in Section 6

The guestbook you built in the HTML was your first complete database application. Let's expand it into production-ready code!

### Complete Guestbook Implementation

```javascript
// Full guestbook backend (Node.js + Express)
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Database setup
const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'guestbook_db',
  waitForConnections: true,
  connectionLimit: 10
});

// Create tables
async function setupDatabase() {
  // Guestbook entries table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS entries (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      message TEXT NOT NULL,
      is_approved BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ip_address VARCHAR(45),
      
      INDEX idx_created (created_at DESC)
    )
  `);
  
  // Admin users table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// API Routes
const app = express();
app.use(express.json());

// Get all approved entries
app.get('/api/entries', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    
    // Get entries
    const [entries] = await db.execute(
      `SELECT id, name, message, created_at 
       FROM entries 
       WHERE is_approved = TRUE 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    
    // Get total count for pagination
    const [countResult] = await db.execute(
      'SELECT COUNT(*) as total FROM entries WHERE is_approved = TRUE'
    );
    
    res.json({
      entries,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Create new entry
app.post('/api/entries', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    
    if (name.length > 100 || message.length > 1000) {
      return res.status(400).json({ error: 'Input too long' });
    }
    
    // Check for spam (basic example)
    const recentCount = await checkRecentEntries(req.ip);
    if (recentCount > 3) {
      return res.status(429).json({ error: 'Too many entries. Please try later.' });
    }
    
    // Insert entry
    const [result] = await db.execute(
      `INSERT INTO entries (name, email, message, ip_address) 
       VALUES (?, ?, ?, ?)`,
      [name, email || null, message, req.ip]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      message,
      created_at: new Date()
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to create entry' });
  }
});

// Check recent entries (spam prevention)
async function checkRecentEntries(ipAddress) {
  const [rows] = await db.execute(
    `SELECT COUNT(*) as count 
     FROM entries 
     WHERE ip_address = ? 
     AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
    [ipAddress]
  );
  return rows[0].count;
}

// Admin routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const [admins] = await db.execute(
      'SELECT id, username, password_hash FROM admins WHERE username = ?',
      [username]
    );
    
    if (admins.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, admins[0].password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create session token (simplified)
    const token = require('crypto').randomBytes(32).toString('hex');
    
    res.json({ token, username });
    
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Frontend code
const guestbookHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Guestbook</title>
  <style>
    .entry {
      border: 1px solid #ddd;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
    }
    .entry-name {
      font-weight: bold;
      color: #333;
    }
    .entry-date {
      color: #666;
      font-size: 0.9em;
    }
    .entry-message {
      margin-top: 0.5rem;
    }
    .form-group {
      margin: 1rem 0;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
    }
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: #e74c3c;
      margin: 0.5rem 0;
    }
    .success {
      color: #27ae60;
      margin: 0.5rem 0;
    }
  </style>
</head>
<body>
  <h1>Guestbook</h1>
  
  <form id="guestbook-form">
    <div class="form-group">
      <label for="name">Name *</label>
      <input type="text" id="name" required maxlength="100">
    </div>
    
    <div class="form-group">
      <label for="email">Email (optional)</label>
      <input type="email" id="email">
    </div>
    
    <div class="form-group">
      <label for="message">Message *</label>
      <textarea id="message" required maxlength="1000" rows="4"></textarea>
    </div>
    
    <button type="submit">Sign Guestbook</button>
    <div id="form-message"></div>
  </form>
  
  <h2>Entries</h2>
  <div id="entries"></div>
  <button id="load-more" style="display:none">Load More</button>
  
  <script>
    let currentPage = 1;
    let totalPages = 1;
    
    // Load entries
    async function loadEntries(page = 1) {
      try {
        const response = await fetch(\`/api/entries?page=\${page}\`);
        const data = await response.json();
        
        const entriesDiv = document.getElementById('entries');
        if (page === 1) entriesDiv.innerHTML = '';
        
        data.entries.forEach(entry => {
          const entryDiv = document.createElement('div');
          entryDiv.className = 'entry';
          entryDiv.innerHTML = \`
            <div class="entry-name">\${escapeHtml(entry.name)}</div>
            <div class="entry-date">\${new Date(entry.created_at).toLocaleString()}</div>
            <div class="entry-message">\${escapeHtml(entry.message)}</div>
          \`;
          entriesDiv.appendChild(entryDiv);
        });
        
        currentPage = data.pagination.page;
        totalPages = data.pagination.pages;
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more');
        loadMoreBtn.style.display = currentPage < totalPages ? 'block' : 'none';
        
      } catch (error) {
        console.error('Failed to load entries:', error);
      }
    }
    
    // Submit form
    document.getElementById('guestbook-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formMessage = document.getElementById('form-message');
      formMessage.innerHTML = '';
      
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      try {
        const response = await fetch('/api/entries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          formMessage.innerHTML = '<div class="success">Thank you for signing!</div>';
          document.getElementById('guestbook-form').reset();
          loadEntries(1); // Reload entries
        } else {
          const error = await response.json();
          formMessage.innerHTML = \`<div class="error">\${error.error}</div>\`;
        }
        
      } catch (error) {
        formMessage.innerHTML = '<div class="error">Failed to submit. Please try again.</div>';
      }
    });
    
    // Load more button
    document.getElementById('load-more').addEventListener('click', () => {
      loadEntries(currentPage + 1);
    });
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    
    // Initial load
    loadEntries();
  </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(guestbookHTML);
});

// Start server
app.listen(3000, () => {
  console.log('Guestbook running on http://localhost:3000');
});
```

### User Authentication System

Building on the guestbook, here's a complete authentication system:

```javascript
// Complete auth system with registration, login, and protected routes

// User registration
app.post('/api/register', async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  
  try {
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    // Check if user exists
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      throw new Error('Username or email already exists');
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    
    // Create initial session
    const token = crypto.randomBytes(32).toString('hex');
    await connection.execute(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [result.insertId, token]
    );
    
    await connection.commit();
    
    res.status(201).json({
      user: { id: result.insertId, username, email },
      token
    });
    
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const [users] = await db.execute(
      'SELECT id, username, email, password_hash FROM users WHERE username = ? OR email = ?',
      [username, username]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create session
    const token = crypto.randomBytes(32).toString('hex');
    await db.execute(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [user.id, token]
    );
    
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware for protected routes
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const [sessions] = await db.execute(
      `SELECT s.user_id, u.username, u.email 
       FROM sessions s
       JOIN users u ON s.user_id = u.id
       WHERE s.token = ? AND s.expires_at > NOW()`,
      [token]
    );
    
    if (sessions.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    req.user = sessions[0];
    next();
    
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
}

// Protected route example
app.get('/api/profile', authenticate, async (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/api/logout', authenticate, async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  await db.execute('DELETE FROM sessions WHERE token = ?', [token]);
  
  res.json({ message: 'Logged out successfully' });
});
```

### Comment System with Threading

```javascript
// Threaded comments like Reddit/Discord

// Comments table with parent_id for threading
await db.execute(`
  CREATE TABLE IF NOT EXISTS comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    parent_id INT DEFAULT NULL,
    content TEXT NOT NULL,
    depth INT DEFAULT 0,
    path VARCHAR(255),
    score INT DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES comments(id),
    
    INDEX idx_post_comments (post_id, created_at),
    INDEX idx_parent (parent_id),
    INDEX idx_path (path)
  )
`);

// Add comment
app.post('/api/posts/:postId/comments', authenticate, async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  
  try {
    const { postId } = req.params;
    const { content, parentId } = req.body;
    const userId = req.user.user_id;
    
    // Validate
    if (!content || content.trim().length === 0) {
      throw new Error('Comment cannot be empty');
    }
    
    let depth = 0;
    let path = '';
    
    // If replying to another comment
    if (parentId) {
      const [parent] = await connection.execute(
        'SELECT id, depth, path FROM comments WHERE id = ?',
        [parentId]
      );
      
      if (parent.length === 0) {
        throw new Error('Parent comment not found');
      }
      
      depth = parent[0].depth + 1;
      path = parent[0].path;
    }
    
    // Insert comment
    const [result] = await connection.execute(
      'INSERT INTO comments (post_id, user_id, parent_id, content, depth) VALUES (?, ?, ?, ?, ?)',
      [postId, userId, parentId || null, content, depth]
    );
    
    // Update path to include new comment ID
    path = path ? `${path}/${result.insertId}` : `${result.insertId}`;
    await connection.execute(
      'UPDATE comments SET path = ? WHERE id = ?',
      [path, result.insertId]
    );
    
    // Update post comment count
    await connection.execute(
      'UPDATE posts SET comment_count = comment_count + 1 WHERE id = ?',
      [postId]
    );
    
    await connection.commit();
    
    res.status(201).json({
      id: result.insertId,
      content,
      username: req.user.username,
      created_at: new Date(),
      depth,
      replies: []
    });
    
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// Get comments with nested structure
app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Get all comments for post
    const [comments] = await db.execute(
      `SELECT 
        c.id, c.parent_id, c.content, c.depth, c.score,
        c.created_at, c.is_deleted,
        u.username, u.profile_pic
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = ?
       ORDER BY c.path, c.created_at`,
      [postId]
    );
    
    // Build nested structure
    const commentMap = new Map();
    const rootComments = [];
    
    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.id, comment);
      
      if (comment.parent_id === null) {
        rootComments.push(comment);
      } else {
        const parent = commentMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(comment);
        }
      }
    });
    
    res.json({ comments: rootComments });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to load comments' });
  }
});

// Vote on comments
app.post('/api/comments/:commentId/vote', authenticate, async (req, res) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();
  
  try {
    const { commentId } = req.params;
    const { vote } = req.body; // 1 for upvote, -1 for downvote
    const userId = req.user.user_id;
    
    // Check existing vote
    const [existing] = await connection.execute(
      'SELECT vote FROM comment_votes WHERE comment_id = ? AND user_id = ?',
      [commentId, userId]
    );
    
    let scoreChange = 0;
    
    if (existing.length > 0) {
      // Update existing vote
      const oldVote = existing[0].vote;
      scoreChange = vote - oldVote;
      
      await connection.execute(
        'UPDATE comment_votes SET vote = ? WHERE comment_id = ? AND user_id = ?',
        [vote, commentId, userId]
      );
    } else {
      // New vote
      scoreChange = vote;
      
      await connection.execute(
        'INSERT INTO comment_votes (comment_id, user_id, vote) VALUES (?, ?, ?)',
        [commentId, userId, vote]
      );
    }
    
    // Update comment score
    await connection.execute(
      'UPDATE comments SET score = score + ? WHERE id = ?',
      [scoreChange, commentId]
    );
    
    await connection.commit();
    
    res.json({ success: true, scoreChange });
    
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
});
```

---

## Interactive Exercise Solutions {#exercise-solutions}

### Exercise: Database Explorer Buttons
**Location**: Section 1, Interactive Database Explorer

**The Challenge**:
Create buttons that query different aspects of the Users and Posts tables.

**Starting Code**:
```javascript
// The HTML had empty function bodies
function showAllUsers() {
  // Your code here
}
```

**Solution**:
```javascript
// Complete implementation
function showAllUsers() {
  // Simulated database query
  const users = [
    { id: 1, username: "coolcoder123", email: "cool@example.com" },
    { id: 2, username: "webdev_pro", email: "pro@example.com" },
    { id: 3, username: "data_ninja", email: "ninja@example.com" }
  ];
  
  // Format output
  const output = users.map(user => 
    `ID: ${user.id} | Username: ${user.username} | Email: ${user.email}`
  ).join('\n');
  
  document.getElementById('db-output').textContent = output;
}

function showUserPosts(userId) {
  // Filter posts by user ID
  const posts = [
    { id: 1, user_id: 1, content: "Just learned databases!", likes: 15 },
    { id: 2, user_id: 1, content: "SQL is awesome", likes: 8 },
    { id: 3, user_id: 2, content: "Check out my project", likes: 23 }
  ];
  
  const userPosts = posts.filter(post => post.user_id === userId);
  
  const output = userPosts.map(post =>
    `Post ${post.id}: "${post.content}" - ${post.likes} likes`
  ).join('\n');
  
  document.getElementById('db-output').textContent = 
    output || "No posts found for this user";
}

function showPopularPosts() {
  const posts = [
    { id: 1, content: "Just learned databases!", likes: 15 },
    { id: 2, content: "SQL is awesome", likes: 8 },
    { id: 3, content: "Check out my project", likes: 23 }
  ];
  
  // Filter posts with more than 10 likes
  const popularPosts = posts.filter(post => post.likes > 10);
  
  const output = popularPosts.map(post =>
    `"${post.content}" - ${post.likes} likes`
  ).join('\n');
  
  document.getElementById('db-output').textContent = output;
}
```

**Step-by-Step Explanation**:
1. Each function simulates a database query using JavaScript arrays
2. `filter()` mimics SQL's WHERE clause
3. `map()` formats the output like SELECT would
4. The results display in the output box just like real query results

**Common Mistakes**:
- Forgetting to handle empty results (no posts found)
- Not formatting the output clearly
- Using `==` instead of `===` for comparisons

**Variations to Try**:
1. Add a function to count posts per user
2. Find users with no posts
3. Sort results by different criteria

### Exercise: CRUD Task Manager
**Location**: Section 3, CRUD Operations

**The Challenge**:
Implement all four CRUD operations for a task list.

**Solution**:
```javascript
// Complete CRUD implementation
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

// CREATE
function createTask(description) {
  const newTask = {
    id: nextId++,
    description: description,
    completed: false,
    created_at: new Date().toISOString()
  };
  
  tasks.push(newTask);
  saveTasks();
  displayTasks();
  
  return newTask;
}

// READ
function getTasks(filter = 'all') {
  switch(filter) {
    case 'completed':
      return tasks.filter(t => t.completed);
    case 'active':
      return tasks.filter(t => !t.completed);
    default:
      return tasks;
  }
}

// UPDATE
function updateTask(id, updates) {
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  saveTasks();
  displayTasks();
  
  return tasks[taskIndex];
}

// DELETE
function deleteTask(id) {
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  const deleted = tasks.splice(taskIndex, 1)[0];
  saveTasks();
  displayTasks();
  
  return deleted;
}

// Helper functions
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasks() {
  const container = document.getElementById('task-list');
  const taskList = getTasks();
  
  container.innerHTML = taskList.map(task => `
    <div class="task ${task.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        ${task.completed ? 'checked' : ''}
        onchange="updateTask(${task.id}, {completed: this.checked})"
      >
      <span>${task.description}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </div>
  `).join('');
}

// Initialize
displayTasks();
```

**Why This Works**:
- Uses localStorage as a simple "database"
- Each operation modifies the data and saves it
- Display updates automatically after each change
- IDs ensure we can target specific tasks

### Exercise: Password Security Demonstration
**Location**: Section 4, Security Basics

**The Challenge**:
Show the difference between plain text and hashed passwords.

**Solution**:
```javascript
// Simulated bcrypt for demonstration
function hashPassword(password) {
  // In real code, use actual bcrypt
  // This is a simplified visualization
  const salt = generateSalt();
  const hashed = simpleHash(password + salt);
  
  return `$2b$10$${salt}${hashed}`;
}

function generateSalt() {
  // Generate random salt (simplified)
  return Math.random().toString(36).substring(2, 15);
}

function simpleHash(input) {
  // Very basic hash for demonstration
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Demo function
function demonstrateHashing() {
  const password = document.getElementById('password-input').value;
  const hashed = hashPassword(password);
  
  document.getElementById('plain-output').textContent = password;
  document.getElementById('hashed-output').textContent = hashed;
  
  // Show why hashing is one-way
  document.getElementById('explanation').innerHTML = `
    <p>Notice how:</p>
    <ul>
      <li>"${password}" becomes "${hashed}"</li>
      <li>The hash is completely different from the original</li>
      <li>Even similar passwords create very different hashes</li>
      <li>You can't reverse the hash to get the password</li>
    </ul>
  `;
}

// SQL Injection demonstration
function demonstrateSQLInjection() {
  const userInput = document.getElementById('sql-input').value;
  
  // Show unsafe query
  const unsafeQuery = `SELECT * FROM users WHERE username = '${userInput}'`;
  
  // Show what happens with malicious input
  if (userInput.includes("'") || userInput.includes(";")) {
    document.getElementById('sql-result').innerHTML = `
      <div class="danger">
        ⚠️ DANGER! This input could break your query:
        <code>${unsafeQuery}</code>
        
        If the input was: admin'; DROP TABLE users; --
        Your database could be destroyed!
      </div>
    `;
  } else {
    document.getElementById('sql-result').innerHTML = `
      <div class="safe">
        ✅ This query looks safe:
        <code>${unsafeQuery}</code>
        
        But ALWAYS use parameterized queries to be sure!
      </div>
    `;
  }
  
  // Show safe version
  document.getElementById('safe-query').textContent = 
    "Safe: db.execute('SELECT * FROM users WHERE username = ?', [userInput])";
}
```

---

## Quiz Answer Explanations {#quiz-explanations}

### Quiz: Database Basics
**Location**: Section 1

**Question**: What is the primary key in our Users table?

**Correct Answer**: id

**Why This Is Correct**:
The primary key is the unique identifier for each row. In our Users table, the `id` column:
- Is unique for every user (no duplicates)
- Cannot be NULL
- Automatically increments (1, 2, 3...)
- Is used to link to other tables (like posts.user_id)

**Why Other Options Are Wrong**:
- **username**: While unique, it could change and isn't the primary identifier
- **email**: Also unique but could change; not ideal for relationships
- **created_at**: Not unique - multiple users could register at the same second

**Remember This Because**:
Every time you create a relationship between tables, you'll use the primary key. When a post has `user_id = 1`, it's referring to the user with `id = 1`.

### Quiz: SQL vs NoSQL
**Location**: Section 2

**Question**: Which database type is better for storing user profiles with varying fields?

**Correct Answer**: NoSQL

**Why This Is Correct**:
NoSQL databases like MongoDB allow flexible schemas. One user might have:
```javascript
{ username: "gamer", gameStats: {...} }
```
While another has:
```javascript
{ username: "artist", portfolio: {...} }
```

SQL would require creating columns for ALL possible fields, leaving many empty.

**Why SQL Is Wrong Here**:
- Requires predefined columns
- Adding new fields means altering the table
- Lots of NULL values for users who don't use certain features

**Remember This Because**:
Choose NoSQL when your data structure varies significantly between records, like social media profiles where users have different types of content.

### Quiz: CRUD Operations
**Location**: Section 3

**Question**: Which operation would you use to change a user's email address?

**Correct Answer**: UPDATE

**Why This Is Correct**:
UPDATE modifies existing data:
```sql
UPDATE users SET email = 'new@email.com' WHERE id = 1
```

**Why Other Options Are Wrong**:
- **CREATE**: Makes new records, doesn't modify existing ones
- **READ**: Only retrieves data, doesn't change it
- **DELETE**: Removes entire records, not specific fields

**Remember This Because**:
Whenever you're changing existing data (editing profile, marking as complete, changing status), you need UPDATE.

### Quiz: Security
**Location**: Section 4

**Question**: What's the main danger of storing passwords as plain text?

**Correct Answer**: If your database is compromised, all passwords are immediately usable

**Why This Is Correct**:
Plain text passwords mean:
- Hackers can immediately log into all accounts
- Users who reuse passwords have other accounts compromised
- No time to warn users or force password resets
- Legal liability for not protecting user data

**Why Other Options Are Less Critical**:
- **Storage space**: Hashed passwords don't take much more space
- **Search speed**: You never search by password anyway
- **Backup size**: Negligible difference in backup size

**Remember This Because**:
Data breaches happen to even major companies. Hashing passwords is the difference between "change your password" and "your accounts everywhere are compromised."

---

## Quick Reference Guide {#quick-reference}

### SQL Commands Cheat Sheet

```sql
-- CREATE (DDL - Data Definition Language)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT (DML - Data Manipulation Language)
INSERT INTO users (username, email) VALUES ('cool_user', 'user@example.com');

-- SELECT (DQL - Data Query Language)
SELECT * FROM users;
SELECT username, email FROM users WHERE id = 1;
SELECT * FROM users WHERE username LIKE '%cool%';
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;

-- UPDATE
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
UPDATE posts SET like_count = like_count + 1 WHERE id = 5;

-- DELETE
DELETE FROM users WHERE id = 1;
DELETE FROM posts WHERE created_at < '2023-01-01';

-- JOINS
SELECT u.username, p.content 
FROM users u
JOIN posts p ON u.id = p.user_id;

-- AGGREGATE FUNCTIONS
SELECT COUNT(*) FROM users;
SELECT AVG(like_count) FROM posts;
SELECT user_id, COUNT(*) as post_count 
FROM posts 
GROUP BY user_id;
```

### JavaScript Database Patterns

```javascript
// Connection setup (MySQL)
const mysql = require('mysql2/promise');
const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp'
});

// Basic query
const [rows] = await db.execute('SELECT * FROM users');

// Parameterized query (safe from SQL injection)
const [user] = await db.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// Insert and get ID
const [result] = await db.execute(
  'INSERT INTO posts (content) VALUES (?)',
  [content]
);
const newId = result.insertId;

// Transaction
const connection = await db.getConnection();
await connection.beginTransaction();
try {
  await connection.execute(query1);
  await connection.execute(query2);
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
}

// MongoDB patterns
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
const db = client.db('myapp');
const users = db.collection('users');

// Insert
await users.insertOne({ username: 'cool_user' });

// Find
const user = await users.findOne({ username: 'cool_user' });
const allUsers = await users.find({}).toArray();

// Update
await users.updateOne(
  { _id: userId },
  { $set: { email: 'new@email.com' } }
);

// Delete
await users.deleteOne({ _id: userId });
```

### Security Best Practices

```javascript
// Password hashing
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(plainPassword, 10);
const isValid = await bcrypt.compare(plainPassword, hash);

// Input validation
function validateInput(input, type) {
  switch(type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    case 'username':
      return /^[a-zA-Z0-9_]{3,20}$/.test(input);
    case 'id':
      return Number.isInteger(+input) && +input > 0;
  }
}

// Environment variables
require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD; // Never hardcode!

// Rate limiting
const attempts = new Map();
function checkRateLimit(ip) {
  const count = attempts.get(ip) || 0;
  if (count > 5) return false;
  attempts.set(ip, count + 1);
  return true;
}
```

---

## Project Checklist {#project-checklist}

### Before Starting Your Database Project

- [ ] **Plan Your Schema**
  - [ ] List all entities (users, posts, etc.)
  - [ ] Define relationships between entities
  - [ ] Identify required fields vs optional
  - [ ] Plan for future features

- [ ] **Choose Your Database**
  - [ ] SQL for structured, relational data
  - [ ] NoSQL for flexible, varied data
  - [ ] Consider scaling needs

- [ ] **Set Up Development Environment**
  - [ ] Install database (MySQL/PostgreSQL/MongoDB)
  - [ ] Install database client/GUI tool
  - [ ] Set up environment variables
  - [ ] Create development database

### During Development

- [ ] **Security First**
  - [ ] Use parameterized queries ALWAYS
  - [ ] Hash passwords with bcrypt
  - [ ] Validate all user input
  - [ ] Use HTTPS for production

- [ ] **Write Clean Code**
  - [ ] Use meaningful table/column names
  - [ ] Add indexes for frequently queried columns
  - [ ] Comment complex queries
  - [ ] Handle errors gracefully

- [ ] **Test Everything**
  - [ ] Test CRUD operations
  - [ ] Test edge cases (empty data, special characters)
  - [ ] Test concurrent access
  - [ ] Test with realistic data volumes

### Before Going Live

- [ ] **Performance Check**
  - [ ] Run EXPLAIN on slow queries
  - [ ] Add missing indexes
  - [ ] Implement caching if needed
  - [ ] Test with expected user load

- [ ] **Security Audit**
  - [ ] No hardcoded passwords/keys
  - [ ] All queries parameterized
  - [ ] Authentication required where needed
  - [ ] Rate limiting implemented

- [ ] **Backup Plan**
  - [ ] Set up automated backups
  - [ ] Test restore process
  - [ ] Document recovery procedures
  - [ ] Have rollback plan

### After Launch

- [ ] **Monitor**
  - [ ] Set up error logging
  - [ ] Monitor query performance
  - [ ] Track database growth
  - [ ] Watch for suspicious activity

- [ ] **Maintain**
  - [ ] Regular backups running
  - [ ] Update dependencies
  - [ ] Optimize slow queries
  - [ ] Archive old data if needed

---

## Troubleshooting Guide {#troubleshooting}

### Problem: "Cannot connect to database"

**Where You Might See This**: Starting your server

**Common Causes**:
1. Database server not running
2. Wrong connection credentials
3. Firewall blocking connection

**Solutions**:
```bash
# Check if MySQL is running
sudo service mysql status

# Start MySQL
sudo service mysql start

# Check connection
mysql -u root -p

# In your code, check credentials
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  // Don't log password!
});
```

### Problem: "Duplicate entry" error

**Where You Might See This**: Creating users or unique data

**The Error Means**: You're trying to insert data that violates a UNIQUE constraint

**Solution**:
```javascript
try {
  await db.execute(
    'INSERT INTO users (username, email) VALUES (?, ?)',
    [username, email]
  );
} catch (error) {
  if (error.code === 'ER_DUP_ENTRY') {
    // Check which field is duplicate
    if (error.message.includes('username')) {
      return 'Username already taken';
    } else if (error.message.includes('email')) {
      return 'Email already registered';
    }
  }
  throw error;
}
```

### Problem: "Too many connections"

**The Error Means**: Your app is creating too many database connections

**Solution**:
```javascript
// BAD: Creating new connection each time
async function getUser(id) {
  const connection = await mysql.createConnection(config);
  const user = await connection.execute('...');
  await connection.end();
  return user;
}

// GOOD: Use connection pool
const pool = mysql.createPool({
  ...config,
  connectionLimit: 10
});

async function getUser(id) {
  return await pool.execute('...');
}
```

### Problem: Queries running slowly

**Diagnosis**:
```sql
-- See how MySQL executes your query
EXPLAIN SELECT * FROM posts WHERE user_id = 1;

-- If it says "Using where" with many rows, you need an index
CREATE INDEX idx_user_posts ON posts(user_id);
```

**Common Solutions**:
1. Add indexes on columns you filter/sort by
2. Avoid SELECT * - only get columns you need
3. Use LIMIT for large result sets
4. Consider caching frequent queries

### Problem: "Access denied for user"

**The Error Means**: MySQL user doesn't have permission

**Solution**:
```sql
-- Grant permissions (run as root)
GRANT ALL PRIVILEGES ON myapp.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;

-- For production, be more specific
GRANT SELECT, INSERT, UPDATE, DELETE ON myapp.* TO 'appuser'@'localhost';
```

### Problem: Lost database password

**Recovery Steps**:
```bash
# Stop MySQL
sudo service mysql stop

# Start in safe mode
sudo mysqld_safe --skip-grant-tables &

# Connect without password
mysql -u root

# Reset password
UPDATE mysql.user SET Password=PASSWORD('newpassword') WHERE User='root';
FLUSH PRIVILEGES;

# Restart normally
sudo service mysql restart
```

### Problem: Transaction deadlock

**The Error Means**: Two transactions are waiting for each other

**Solution**:
```javascript
// Retry on deadlock
async function transferMoney(fromId, toId, amount) {
  let attempts = 0;
  while (attempts < 3) {
    try {
      await doTransfer(fromId, toId, amount);
      return;
    } catch (error) {
      if (error.code === 'ER_LOCK_DEADLOCK') {
        attempts++;
        await new Promise(r => setTimeout(r, 100 * attempts));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Transfer failed after 3 attempts');
}
```

---

## Next Steps {#next-steps}

### Congratulations! You Now Know:

✅ How databases store and retrieve data permanently  
✅ The difference between SQL and NoSQL databases  
✅ All four CRUD operations and when to use each  
✅ How to secure user data with hashing and parameterized queries  
✅ Database design principles and relationships  
✅ How to build real applications with data persistence

### Level Up Your Database Skills:

1. **Advanced SQL**
   - Learn JOIN types (INNER, LEFT, RIGHT, FULL)
   - Master subqueries and CTEs
   - Understand indexes deeply
   - Practice query optimization

2. **Try Different Databases**
   - PostgreSQL (advanced SQL features)
   - Redis (caching and sessions)
   - Elasticsearch (full-text search)
   - Neo4j (graph databases)

3. **Learn Database Patterns**
   - Repository pattern
   - Database migrations
   - Connection pooling
   - Query builders and ORMs

4. **Build These Projects**
   - Chat application with message history
   - E-commerce site with inventory
   - Social network with friends/followers
   - Analytics dashboard with aggregations

### Resources for Continued Learning:

- **Interactive SQL**: SQLZoo, HackerRank SQL
- **Database Design**: dbdiagram.io for visual schemas
- **Performance**: Use The Index, Luke! (SQL optimization)
- **Security**: OWASP Database Security Cheat Sheet

### Your Database Journey Continues!

Remember when your apps lost everything on refresh? That's ancient history now! You have the power to build applications that remember users, store content, and grow with your audience. Every app you love uses these exact techniques - now you can too!

The difference between a demo and a real application is data persistence. You've crossed that bridge. Welcome to the world of full-stack development! 🚀

### Challenge Yourself:

Before moving to Module 9, build one complete application using everything you learned:
- User registration and login
- Data that persists between sessions
- Proper security measures
- At least one complex query with JOINs

You're not just learning databases - you're learning to build the future! 💪