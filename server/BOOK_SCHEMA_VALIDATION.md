# ✅ Book Schema - Validation & Testing Guide

## Schema Validation Overview

Your Book schema now has built-in validation to ensure data quality. Let's understand what each validation does and how to test it.

---

## 🛡️ Validation Rules Explained

### 1. Required Fields

```javascript
title: {
    type: String,
    required: true,  // ← MUST be provided
}
```

**What it means:**
- You CANNOT save a book without this field
- MongoDB will reject it with validation error

**Valid:**
```json
{ "title": "1984" }
```

**Invalid (will fail):**
```json
{ }  // Missing title
```

**Error response:**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["title is required"]
}
```

### 2. Minimum Value (min)

```javascript
rank: {
    type: Number,
    required: true,
    min: 1,  // ← Value must be >= 1
}
```

**What it means:**
- Number cannot be lower than specified value
- Prevents negative or zero values

**Valid:**
```json
{ "rank": 1 }    // ✅ Equal to min
{ "rank": 100 }  // ✅ Greater than min
```

**Invalid (will fail):**
```json
{ "rank": 0 }    // ❌ Less than min (1)
{ "rank": -5 }   // ❌ Negative
```

**Error:**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["rank must be >= 1"]
}
```

### 3. String Trimming (trim)

```javascript
title: {
    type: String,
    trim: true,  // ← Remove spaces before/after
}
```

**What it means:**
- Extra whitespace before/after is automatically removed
- Makes data consistent

**Input:**
```json
{ "title": "   1984   " }
```

**Saved as:**
```json
{ "title": "1984" }  // Spaces gone!
```

### 4. Default Values

```javascript
brand: {
    type: String,
    default: '',  // ← Use this if not provided
}

numberOfPages: {
    type: Number,
    default: null,  // ← Use null if not provided
}
```

**What it means:**
- If field not provided, use the default value
- Saves space vs. storing undefined

**Input (missing brand):**
```json
{ "title": "1984", "author": "Orwell" }
```

**Saved with default:**
```json
{ 
    "title": "1984", 
    "author": "Orwell",
    "brand": "",  // ← Default applied
    "numberOfPages": null  // ← Default applied
}
```

---

## 🧪 Testing Validation

### Test 1: Create Valid Book (Should Work)

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Atomic Habits",
    "author": "James Clear",
    "rank": 2,
    "price": 16.99,
    "genre": "Self-Help",
    "reviewCount": 45230,
    "reviews": 4.8,
    "numberOfPages": 320
  }'
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Atomic Habits",
    "author": "James Clear",
    "rank": 2,
    "price": 16.99,
    "genre": "Self-Help",
    "reviewCount": 45230,
    "reviews": 4.8,
    "brand": "",  // Default applied
    "manufacturer": "",  // Default applied
    "numberOfPages": 320,
    "createdAt": "2024-01-18T10:30:00.000Z",
    "updatedAt": "2024-01-18T10:30:00.000Z"
  }
}
```

---

### Test 2: Missing Required Field (Should Fail)

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "rank": 5,
    "price": 13.99
    # Missing required "genre"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["genre is required"]
}
```

---

### Test 3: Invalid Rank (Should Fail)

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "rank": 0,  # ❌ Invalid! min is 1
    "price": 12.99,
    "genre": "Fiction"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["rank must be >= 1"]
}
```

---

### Test 4: Negative Price (Should Fail)

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "rank": 1,
    "price": -5.99,  # ❌ Invalid! min is 0
    "genre": "Fiction"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["price must be >= 0"]
}
```

---

### Test 5: String Trimming (Should Work)

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "    1984    ",  # Extra spaces
    "author": "  George Orwell  ",  # Extra spaces
    "rank": 1,
    "price": 13.99,
    "genre": "   Fiction   "  # Extra spaces
  }'
```

**Sent with spaces, saved without:**
```json
{
  "title": "1984",  # ✅ Trimmed
  "author": "George Orwell",  # ✅ Trimmed
  "genre": "Fiction"  # ✅ Trimmed
}
```

---

### Test 6: Optional Fields (Should Work)

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "rank": 3,
    "price": 14.99,
    "genre": "Fantasy"
    # Missing: brand, manufacturer, reviewCount, reviews, numberOfPages
  }'
```

**All optional fields get defaults:**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "rank": 3,
  "price": 14.99,
  "genre": "Fantasy",
  "brand": "",  # Default
  "manufacturer": "",  # Default
  "reviewCount": 0,  # Default
  "reviews": 0,  # Default
  "numberOfPages": null  # Default
}
```

---

## 📊 Required vs Optional Fields

### Required (Must Provide)
- ✅ `title`
- ✅ `author`
- ✅ `rank`
- ✅ `price`
- ✅ `genre`

### Optional (Nice to Have)
- ❌ `brand` - gets `""`
- ❌ `manufacturer` - gets `""`
- ❌ `reviewCount` - gets `0`
- ❌ `reviews` - gets `0`
- ❌ `numberOfPages` - gets `null`

### Auto-Generated (Never Send)
- ⚙️ `_id` - MongoDB generates
- ⚙️ `createdAt` - Mongoose generates
- ⚙️ `updatedAt` - Mongoose generates

---

## 🔍 Validation Testing Checklist

### Setup
- [ ] Backend running: `npm run dev`
- [ ] MongoDB connected
- [ ] All CRUD routes working

### Create (POST) Tests
- [ ] ✅ Valid book with all fields
- [ ] ✅ Valid book with only required fields
- [ ] ❌ Missing required `title`
- [ ] ❌ Missing required `author`
- [ ] ❌ Missing required `rank`
- [ ] ❌ Missing required `price`
- [ ] ❌ Missing required `genre`
- [ ] ❌ Invalid rank (rank < 1)
- [ ] ❌ Invalid price (negative)
- [ ] ❌ Invalid page count (0 or negative)
- [ ] ✅ Spaces in strings are trimmed

### Update (PUT) Tests
- [ ] ✅ Update single field
- [ ] ✅ Update multiple fields
- [ ] ✅ Update with valid rank
- [ ] ✅ Update with valid price
- [ ] ❌ Update to invalid rank
- [ ] ❌ Update to negative price

### Data Type Tests
- [ ] ✅ String fields accept text
- [ ] ✅ Number fields accept numbers
- [ ] ✅ Decimal prices work (14.99)
- [ ] ✅ Timestamps auto-generate

---

## 🎯 Validation Best Practices

### ✅ DO

```javascript
// Validate on client before sending
const bookData = {
  title: "1984",
  author: "Orwell",
  rank: 5,
  price: 13.99,
  genre: "Fiction"
};

if (!bookData.title || !bookData.author) {
  console.log("Missing required fields");
  return;
}
```

### ❌ DON'T

```javascript
// Don't send invalid data hoping server fixes it
const bookData = {
  title: "1984",
  rank: -5,  // ❌ Invalid
  price: -20  // ❌ Invalid
};
```

---

## 📝 Understanding Error Messages

### Example 1: Missing Field
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["title is required"]
}
```
**Fix:** Add the missing `title` field

### Example 2: Invalid Number
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": ["rank must be >= 1"]
}
```
**Fix:** Set rank to 1 or higher

### Example 3: Multiple Errors
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "rank must be >= 1",
    "price must be >= 0",
    "genre is required"
  ]
}
```
**Fix:** Correct all three issues

---

## 🔄 Update Validation

Validation also applies to PUT (update) requests:

```bash
# ✅ Valid update
curl -X PUT http://localhost:5001/api/books/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{"price": 19.99}'

# ❌ Invalid update
curl -X PUT http://localhost:5001/api/books/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{"price": -5}'  # Error!
```

---

## 💡 Key Validation Concepts

| Concept | Meaning | Example |
|---------|---------|---------|
| `required` | Must be provided | `title: { required: true }` |
| `min` | Minimum value | `rank: { min: 1 }` |
| `trim` | Remove spaces | `title: { trim: true }` |
| `default` | Use if not provided | `brand: { default: '' }` |
| `type` | Data type check | `type: Number` or `type: String` |

---

## 🚀 Next Steps

1. **Test all validation scenarios** using the checklist above
2. **Add frontend validation** before sending to backend
3. **Display validation errors** to users in React
4. **Consider adding more validations:**
   - Email validation for future user field
   - URL validation for image URLs
   - Date range validation for published dates

---

## ❓ Common Questions

**Q: Why does validation matter?**  
A: Prevents bad data from entering your database. Garbage in = garbage out.

**Q: Can I turn off validation?**  
A: Yes, but don't! It keeps data consistent and prevents bugs.

**Q: What if I need to update a field without validation?**  
A: You can skip validation with `{ runValidators: false }`, but it's not recommended.

**Q: Can validation be conditional?**  
A: Yes! You can add custom validators. Ask if you need it.

Your schema is now bulletproof! 🛡️
