# 📚 Book Schema - Quick Reference Guide

## Field Mapping: Dataset → Schema

| Dataset Column | Schema Field | Type | Required | Notes |
|---|---|---|---|---|
| Title | `title` | String | ✅ | Cleaned with trim |
| Rank | `rank` | Number | ✅ | Must be ≥ 1 |
| Reviews | `reviews` | Number | ❌ | Average rating |
| Review Count | `reviewCount` | Number | ❌ | Total review count |
| Price | `price` | Number | ✅ | Must be ≥ 0 |
| Genre | `genre` | String | ✅ | Book category |
| Manufacturer | `manufacturer` | String | ❌ | Publisher name |
| Brand | `brand` | String | ❌ | Publisher brand |
| Author | `author` | String | ✅ | Author name(s) |
| Number of Pages | `numberOfPages` | Number | ❌ | Must be ≥ 1 if provided |

---

## Schema Structure

```javascript
{
    // Core required fields
    title: String (required),
    author: String (required),
    rank: Number (required, min: 1),
    price: Number (required, min: 0),
    genre: String (required),
    
    // Optional fields
    brand: String,
    manufacturer: String,
    reviewCount: Number,
    reviews: Number,
    numberOfPages: Number,
    
    // Auto-generated timestamps
    createdAt: Date (auto),
    updatedAt: Date (auto)
}
```

---

## Example Book Document

```json
{
    "_id": "507f1f77bcf86cd799439011",
    "title": "Atomic Habits: Tiny Changes, Remarkable Results",
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

## Data Types at a Glance

### String
- Text data: titles, authors, genres, brands
- Auto-trimmed (removes extra spaces)
- Searchable

### Number
- Ranks, prices, counts, ratings
- Can be integer (5) or decimal (4.8)
- Sortable and filterable
- Validation: min/max constraints

### Date
- Auto-generated timestamps
- Can't edit manually

---

## Validation Rules

| Field | Validation | Meaning |
|-------|-----------|---------|
| `title` | required, trim | Must exist, spaces removed |
| `author` | required, trim | Must exist, spaces removed |
| `rank` | required, min: 1 | Must exist, must be ≥ 1 |
| `price` | required, min: 0 | Must exist, can't be negative |
| `genre` | required, trim | Must exist, spaces removed |
| `reviewCount` | min: 0 | Can't be negative |
| `reviews` | min: 0 | Can't be negative |
| `numberOfPages` | min: 1 | Must be ≥ 1 if provided |

---

## Testing the Schema

### Create a Book

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "rank": 5,
    "price": 12.99,
    "genre": "Fiction",
    "reviewCount": 12340,
    "reviews": 4.5,
    "brand": "Scribner",
    "manufacturer": "Simon & Schuster",
    "numberOfPages": 180
  }'
```

### What Fields Are Required?

Only these 5 must be provided:
1. `title`
2. `author`
3. `rank`
4. `price`
5. `genre`

All others are optional.

### Missing Required Field Error

```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984"
    # Missing author, rank, price, genre
  }'
```

Response (400 Bad Request):
```json
{
  "success": false,
  "message": "Validation Error"
}
```

---

## Integration with CRUD Routes

All 5 CRUD operations work with the new schema:

### ✅ GET All Books
```bash
GET /api/books
```
Returns array with all fields

### ✅ GET Single Book
```bash
GET /api/books/:id
```
Returns one book with all fields

### ✅ CREATE Book
```bash
POST /api/books
```
Requires: title, author, rank, price, genre

### ✅ UPDATE Book
```bash
PUT /api/books/:id
```
Can update any field (partial updates supported)

### ✅ DELETE Book
```bash
DELETE /api/books/:id
```
Removes book completely

---

## Database Operations

### View All Books (MongoDB)
```bash
# In mongosh terminal
use bookpulse
db.books.find().pretty()
```

### View Specific Book
```bash
db.books.findOne({ title: "1984" })
```

### Update a Book
```bash
db.books.updateOne(
  { _id: ObjectId("...") },
  { $set: { reviews: 4.9 } }
)
```

---

## CamelCase Naming Explained

Dataset columns → Mongoose fields (camelCase):

| Dataset | Schema | Why |
|---------|--------|-----|
| Title | title | Already lowercase |
| Rank | rank | Already lowercase |
| Reviews | reviews | Already lowercase |
| Review Count | reviewCount | JavaScript convention |
| Number of Pages | numberOfPages | JavaScript convention |
| Brand | brand | Already lowercase |
| Manufacturer | manufacturer | Already lowercase |

**Why camelCase?**
- Standard in JavaScript/Node.js
- Consistent across codebase
- Easier to type: `book.numberOfPages` vs `book.Number of Pages`

---

## Common Tasks

### Find all books in a genre
```javascript
Book.find({ genre: "Fiction" })
```

### Find books under $20
```javascript
Book.find({ price: { $lt: 20 } })
```

### Find top 10 ranked books
```javascript
Book.find().sort({ rank: 1 }).limit(10)
```

### Find books with 4+ star rating
```javascript
Book.find({ reviews: { $gte: 4 } })
```

### Find books by author
```javascript
Book.find({ author: "Stephen King" })
```

### Sort by price (high to low)
```javascript
Book.find().sort({ price: -1 })
```

---

## Field Constraints Reference

```
✅ Valid Ranks: 1, 2, 50, 1000
❌ Invalid Ranks: 0, -1, 0.5

✅ Valid Prices: 0, 9.99, 15.50, 100.00
❌ Invalid Prices: -5, -0.01

✅ Valid Reviews: 0, 3.5, 4.8, 5
❌ Invalid Reviews: -1, 6

✅ Valid Pages: 1, 100, 500, 1000
❌ Invalid Pages: 0, -50

✅ Valid Strings: "Fiction", "1984", "  text  " (auto-trimmed)
❌ Invalid: null (if required field)
```

---

## Next Steps

1. **Test the schema** with your CRUD routes
2. **Import your Kaggle dataset** into MongoDB
3. **Add filtering routes** (by genre, price range, etc.)
4. **Add sorting routes** (by rank, price, reviews)
5. **Display in React** with all these fields

Your schema is production-ready! 🚀
