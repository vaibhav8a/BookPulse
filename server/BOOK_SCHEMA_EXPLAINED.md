# 📚 Book Schema - Amazon Bestseller Dataset

## Overview

Your Book model now matches the Amazon Bestseller Kaggle dataset! This document explains each field, why each datatype was chosen, and how to use them.

---

## 📋 Complete Schema Fields

### 1. **title** (String - Required)

```javascript
title: {
    type: String,
    required: true,
    trim: true,
}
```

**Dataset Column:** `Title`

**What It Stores:** The complete title of the book

**Why String?**
- Book titles are always text
- Simple and searchable

**Why Required?**
- Every book MUST have a title
- Can't have books without names

**What's `trim: true`?**
- Removes extra spaces before/after: `"  1984  "` → `"1984"`
- Keeps data clean

**Example:**
```json
"title": "The Great Gatsby"
```

---

### 2. **author** (String - Required)

```javascript
author: {
    type: String,
    required: true,
    trim: true,
}
```

**Dataset Column:** `Author`

**What It Stores:** The book's author name

**Why String?**
- Author names are text
- Simple to store and search

**Why Required?**
- Every book needs an author
- Essential information

**Example:**
```json
"author": "F. Scott Fitzgerald"
```

**Note:** If a book has multiple authors, you can store them comma-separated:
```json
"author": "James S. A. Corey"  // Pen name for 2 authors
```

---

### 3. **brand** (String - Optional)

```javascript
brand: {
    type: String,
    trim: true,
    default: '',
}
```

**Dataset Column:** `Brand`

**What It Stores:** Publisher brand name

**Why String?**
- Brand names are text

**Why Optional with Default `''`?**
- Not all books have a brand label
- Empty string (`''`) means "no data"
- Saves space vs. storing `null`

**Example:**
```json
"brand": "Penguin Classics"
```

---

### 4. **manufacturer** (String - Optional)

```javascript
manufacturer: {
    type: String,
    trim: true,
    default: '',
}
```

**Dataset Column:** `Manufacturer`

**What It Stores:** Publisher or manufacturer name

**Why String?**
- Manufacturer names are text

**Why Optional?**
- Some books might not have manufacturer info
- Not critical for core functionality

**Example:**
```json
"manufacturer": "Scribner"
```

---

### 5. **rank** (Number - Required)

```javascript
rank: {
    type: Number,
    required: true,
    min: 1,
}
```

**Dataset Column:** `Rank`

**What It Stores:** Amazon bestseller rank (1 = top ranked)

**Why Number?**
- Ranks are integers
- Easier to sort and filter
- Can do math: "find all books ranked top 100"

**Why Required?**
- This is the CORE data for your dataset
- Can't have bestseller book without rank

**Why `min: 1`?**
- Ranks can't be zero or negative
- Validation: if someone tries to save rank 0, it fails
- Prevents invalid data in database

**Example:**
```json
"rank": 5  // 5th ranked book
```

---

### 6. **reviewCount** (Number - Optional)

```javascript
reviewCount: {
    type: Number,
    default: 0,
    min: 0,
}
```

**Dataset Column:** `Review Count`

**What It Stores:** How many reviews the book has

**Why Number?**
- Count must be an integer
- Can't say "3.5 reviews"
- Need to sort by review count

**Why Default `0`?**
- If new book has no reviews yet, default to 0
- Better than storing `null` or `undefined`

**Why `min: 0`?**
- Can't have negative reviews
- Validation prevents bad data

**Example:**
```json
"reviewCount": 1523  // Book has 1,523 reviews
```

---

### 7. **reviews** (Number - Optional)

```javascript
reviews: {
    type: Number,
    default: 0,
    min: 0,
}
```

**Dataset Column:** `Reviews` (Average Rating)

**What It Stores:** Average review rating of the book

**Why Number?**
- Ratings are numeric (1.5, 4.2, etc.)
- Can be decimal, so Number type, not Integer

**Why Default `0`?**
- New books with no ratings = 0
- Cleaner than null

**Why `min: 0`?**
- Ratings can't be negative
- Prevents invalid data

**Note:** This is different from rating on 5-star scale. This is the actual average from reviews. You could add `max: 5` if standardized:

```javascript
reviews: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,  // Optional: if you want to enforce 5-star scale
}
```

**Example:**
```json
"reviews": 4.7  // Average rating is 4.7 out of 5
```

---

### 8. **price** (Number - Required)

```javascript
price: {
    type: Number,
    required: true,
    min: 0,
}
```

**Dataset Column:** `Price`

**What It Stores:** Book price in USD

**Why Number?**
- Prices are numeric and can be decimal
- Need to sort, filter, calculate totals

**Why Required?**
- You can't sell a book without knowing the price
- Critical business information

**Why `min: 0`?**
- Prices can't be negative
- Validation prevents impossible prices

**Example:**
```json
"price": 14.99
```

---

### 9. **genre** (String - Required)

```javascript
genre: {
    type: String,
    required: true,
    trim: true,
}
```

**Dataset Column:** `Genre`

**What It Stores:** Book genre/category

**Why String?**
- Genre names are text
- Can be searched: "find all Fiction books"

**Why Required?**
- Every book belongs to a genre
- Essential for organization and filtering

**Example:**
```json
"genre": "Science Fiction"
```

**Future Enhancement:**
You could make this an array to support multiple genres:
```javascript
genre: {
    type: [String],  // Array of strings
    required: true,
}

// Example data:
"genre": ["Fiction", "Adventure", "Classic"]
```

---

### 10. **numberOfPages** (Number - Optional)

```javascript
numberOfPages: {
    type: Number,
    default: null,
    min: 1,
}
```

**Dataset Column:** `Number of Pages`

**What It Stores:** Total pages in the book

**Why Number?**
- Page count is an integer
- Need to sort: "find books under 300 pages"

**Why Default `null` (instead of 0)?**
- 0 pages means "invalid"
- `null` means "unknown/not provided"
- More accurate semantically
- Distinguishes "no data" from "0 pages"

**Why `min: 1`?**
- A book must have at least 1 page
- Prevents invalid values like 0 or negative

**Example:**
```json
"numberOfPages": 180
```

---

### 11. **timestamps** (Auto-Generated)

```javascript
{
    timestamps: true,  // In schema options
}
```

**What It Stores:** 
- `createdAt` - When the book was added to database
- `updatedAt` - When the book was last modified

**Why Automatic?**
- Mongoose auto-generates these
- You don't set them manually
- Useful for tracking data history

**Example in Database:**
```json
{
    "_id": "...",
    "title": "1984",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-17T15:45:00.000Z"
}
```

---

## 📊 Field Summary Table

| Field | Type | Required | Why This Type |
|-------|------|----------|---------------|
| `title` | String | ✅ | Book titles are text |
| `author` | String | ✅ | Author names are text |
| `brand` | String | ❌ | Publisher brand is text |
| `manufacturer` | String | ❌ | Publisher name is text |
| `rank` | Number | ✅ | Rankings are integers, need sorting |
| `reviewCount` | Number | ❌ | Count of reviews, integer |
| `reviews` | Number | ❌ | Average rating, can be decimal |
| `price` | Number | ✅ | Prices are numeric, can be decimal |
| `genre` | String | ✅ | Genres are categories (text) |
| `numberOfPages` | Number | ❌ | Page count is integer |
| `createdAt` | Date | Auto | Auto timestamp |
| `updatedAt` | Date | Auto | Auto timestamp |

---

## 🎯 Data Type Decisions Explained

### Why String vs. Number vs. Date?

#### **String**
Use for: Text data that shouldn't be calculated
- Titles, authors, genres, brands
- You don't do math with them
- You search them: "find all books by Stephen King"

#### **Number**
Use for: Data that represents quantities or measurements
- Ranks, prices, page counts, review counts
- You can sort them: "find cheapest books"
- You can filter them: "books under $20"
- Can be decimal (1.5) or integer (1)

#### **Date** (Timestamps)
Use for: When something happened
- createdAt = when book was added
- updatedAt = when book was last changed
- Auto-generated by Mongoose

---

## 💡 Validation Explained

### `required: true`
```javascript
title: {
    type: String,
    required: true,  // ← This field MUST be provided
}
```

**What Happens:**
```javascript
// ✅ GOOD - Has title
new Book({ title: "1984", ... })  // Saves successfully

// ❌ BAD - Missing title
new Book({ author: "Orwell", ... })  // Throws validation error
```

### `min: 0` and `max: 5`
```javascript
rank: {
    type: Number,
    min: 1,  // ← Value must be at least 1
}
```

**What Happens:**
```javascript
// ✅ GOOD
new Book({ rank: 5, ... })  // Valid, 5 >= 1

// ❌ BAD
new Book({ rank: 0, ... })  // Throws error, 0 < 1
new Book({ rank: -5, ... })  // Throws error, -5 < 1
```

### `trim: true`
```javascript
title: {
    type: String,
    trim: true,  // ← Removes spaces before/after
}
```

**What Happens:**
```javascript
"  The Great Gatsby  "  →  "The Great Gatsby"
"   Author Name   "    →  "Author Name"
```

### `default: ''` vs `default: null`
```javascript
brand: {
    type: String,
    default: '',     // ← Empty string if not provided
}

numberOfPages: {
    type: Number,
    default: null,   // ← null if not provided
}
```

**Difference:**
- `default: ''` = "No brand name" (but field exists with empty value)
- `default: null` = "Unknown page count" (field explicitly null)

---

## 📝 Example Complete Document

```json
{
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Atomic Habits",
    "author": "James Clear",
    "brand": "Avery",
    "manufacturer": "Penguin Random House",
    "rank": 2,
    "reviewCount": 45230,
    "reviews": 4.8,
    "price": 16.99,
    "genre": "Self-Help",
    "numberOfPages": 320,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔄 How This Works with Your CRUD Routes

### Create (POST) - Add new book

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Midnight Library",
    "author": "Matt Haig",
    "brand": "Penguin",
    "manufacturer": "Penguin Books",
    "rank": 15,
    "reviewCount": 28940,
    "reviews": 4.6,
    "price": 18.99,
    "genre": "Fiction",
    "numberOfPages": 304
  }'
```

Response:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "new-generated-id",
    "title": "The Midnight Library",
    "author": "Matt Haig",
    // ... all other fields + timestamps
  }
}
```

### Read (GET) - Fetch books

```bash
curl http://localhost:5001/api/books
```

Response: Array of all books with all fields

### Update (PUT) - Modify book

```bash
curl -X PUT http://localhost:5001/api/books/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "rank": 1,           # Update rank to 1
    "reviews": 4.9,      # Update average rating
    "reviewCount": 50000 # Update review count
  }'
```

Only sends fields that changed, others remain untouched.

### Delete (DELETE) - Remove book

```bash
curl -X DELETE http://localhost:5001/api/books/65a1b2c3d4e5f6g7h8i9j0k1
```

---

## 🚀 Future Enhancements

### Idea 1: Add ISBN Field
```javascript
isbn: {
    type: String,
    unique: true,  // No duplicates
    sparse: true,  // Optional, but if provided must be unique
    match: /^[0-9-]+$/,  // Only numbers and hyphens
}
```

### Idea 2: Support Multiple Authors
```javascript
authors: {
    type: [String],  // Array of author names
    required: true,
}
```

### Idea 3: Add Description
```javascript
description: {
    type: String,
    default: '',
    maxlength: 5000,  // Limit length
}
```

### Idea 4: Add Image URL
```javascript
imageUrl: {
    type: String,
    default: null,
}
```

### Idea 5: Track Inventory
```javascript
stockQuantity: {
    type: Number,
    default: 0,
    min: 0,
}
```

---

## 🎓 Key Takeaways

✅ **String fields:** Titles, authors, genres, brands (text data)  
✅ **Number fields:** Ranks, prices, counts, ratings (numeric data)  
✅ **Required:** Must-have data (title, author, rank, price, genre)  
✅ **Optional:** Nice-to-have data (brand, manufacturer, numberOfPages)  
✅ **Validation:** `required`, `min`, `max`, `trim` prevent bad data  
✅ **Timestamps:** Auto track when books added/updated  

Your schema is now ready to store real Amazon bestseller data! 🎉

---

## 🔗 Next Steps

1. Test creating books with new fields
2. Update your React frontend to display new fields
3. Add filtering by genre, price range, page count
4. Add sorting options (by rank, price, reviews)
5. Consider adding author profiles or genre categories
