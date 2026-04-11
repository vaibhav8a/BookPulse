# 📚 BookPulse Books API Documentation

## Overview

This document describes all available API endpoints for managing books in the BookPulse backend.

**Base URL:** `http://localhost:5001/api`

---

## 📋 API Endpoints

### 1. GET ALL BOOKS
Retrieve all books from the database.

**Endpoint:** `GET /books`

**Full URL:** `http://localhost:5001/api/books`

**Description:** Fetches a list of all books stored in the database.

**Request:**
```bash
curl http://localhost:5001/api/books
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "description": "A classic American novel",
      "price": 12.99,
      "rating": 4.5,
      "category": "Fiction",
      "createdAt": "2026-04-10T06:30:00.000Z",
      "updatedAt": "2026-04-10T06:30:00.000Z",
      "__v": 0
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "description": "A story of justice",
      "price": 14.99,
      "rating": 4.8,
      "category": "Fiction",
      "createdAt": "2026-04-10T06:35:00.000Z",
      "updatedAt": "2026-04-10T06:35:00.000Z",
      "__v": 0
    }
  ]
}
```

**Response (Success - Empty Database - 200):**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "count": 0,
  "data": []
}
```

**Console Output:**
```
📚 Fetching all books...
✅ Retrieved 2 books
```

---

### 2. GET SINGLE BOOK BY ID
Retrieve a specific book by its MongoDB ID.

**Endpoint:** `GET /books/:id`

**Full URL:** `http://localhost:5001/api/books/507f1f77bcf86cd799439011`

**Description:** Fetches a single book with the specified ID.

**URL Parameters:**
- `id` (required): MongoDB ID of the book

**Request:**
```bash
curl http://localhost:5001/api/books/507f1f77bcf86cd799439011
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "price": 12.99,
    "rating": 4.5,
    "category": "Fiction",
    "createdAt": "2026-04-10T06:30:00.000Z",
    "updatedAt": "2026-04-10T06:30:00.000Z",
    "__v": 0
  }
}
```

**Response (Book Not Found - 404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

**Response (Invalid ID Format - 400):**
```json
{
  "success": false,
  "message": "Invalid book ID format"
}
```

**Console Output:**
```
📖 Fetching book with ID: 507f1f77bcf86cd799439011
✅ Found book: The Great Gatsby
```

---

### 3. CREATE NEW BOOK
Add a new book to the database.

**Endpoint:** `POST /books`

**Full URL:** `http://localhost:5001/api/books`

**Description:** Creates a new book record in the database.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "1984",
  "author": "George Orwell",
  "description": "A dystopian novel",
  "price": 13.99,
  "rating": 4.6,
  "category": "Science Fiction"
}
```

**Required Fields:**
- `title` (string): Book title
- `author` (string): Author name
- `price` (number): Book price

**Optional Fields:**
- `description` (string): Book description
- `rating` (number): Book rating (0-5)
- `category` (string): Book category

**Request (with curl):**
```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "description": "A dystopian novel",
    "price": 13.99,
    "rating": 4.6,
    "category": "Science Fiction"
  }'
```

**Request (with curl - Minimal):**
```bash
curl -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "price": 13.99
  }'
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "1984",
    "author": "George Orwell",
    "description": "A dystopian novel",
    "price": 13.99,
    "rating": 4.6,
    "category": "Science Fiction",
    "createdAt": "2026-04-10T07:00:00.000Z",
    "updatedAt": "2026-04-10T07:00:00.000Z",
    "__v": 0
  }
}
```

**Response (Missing Required Fields - 400):**
```json
{
  "success": false,
  "message": "Missing required fields: title, author, and price are required"
}
```

**Response (Validation Error - 400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Price must be a positive number"]
}
```

**Console Output:**
```
📝 Creating new book...
📥 Received data: { title: '1984', author: 'George Orwell', price: 13.99 }
✅ Book created successfully: 507f1f77bcf86cd799439013
```

---

### 4. UPDATE BOOK
Update an existing book's information.

**Endpoint:** `PUT /books/:id`

**Full URL:** `http://localhost:5001/api/books/507f1f77bcf86cd799439011`

**Description:** Updates one or more fields of an existing book.

**URL Parameters:**
- `id` (required): MongoDB ID of the book

**Request Headers:**
```
Content-Type: application/json
```

**Request Body (Update All Fields):**
```json
{
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "description": "A masterpiece of American literature",
  "price": 15.99,
  "rating": 4.9,
  "category": "Classic Fiction"
}
```

**Request Body (Update Single Field):**
```json
{
  "price": 16.99
}
```

**Request (with curl):**
```bash
curl -X PUT http://localhost:5001/api/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 16.99,
    "rating": 4.7
  }'
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "price": 16.99,
    "rating": 4.7,
    "category": "Fiction",
    "createdAt": "2026-04-10T06:30:00.000Z",
    "updatedAt": "2026-04-10T07:10:00.000Z",
    "__v": 0
  }
}
```

**Response (Book Not Found - 404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

**Response (Invalid ID Format - 400):**
```json
{
  "success": false,
  "message": "Invalid book ID format"
}
```

**Response (Validation Error - 400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Price must be a positive number"]
}
```

**Console Output:**
```
✏️  Updating book with ID: 507f1f77bcf86cd799439011
📥 Update data: { price: 16.99, rating: 4.7 }
✅ Book updated successfully: 507f1f77bcf86cd799439011
```

---

### 5. DELETE BOOK
Remove a book from the database.

**Endpoint:** `DELETE /books/:id`

**Full URL:** `http://localhost:5001/api/books/507f1f77bcf86cd799439011`

**Description:** Permanently deletes a book from the database.

**URL Parameters:**
- `id` (required): MongoDB ID of the book

**Request:**
```bash
curl -X DELETE http://localhost:5001/api/books/507f1f77bcf86cd799439011
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A classic American novel",
    "price": 12.99,
    "rating": 4.5,
    "category": "Fiction",
    "createdAt": "2026-04-10T06:30:00.000Z",
    "updatedAt": "2026-04-10T06:30:00.000Z",
    "__v": 0
  }
}
```

**Response (Book Not Found - 404):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

**Response (Invalid ID Format - 400):**
```json
{
  "success": false,
  "message": "Invalid book ID format"
}
```

**Console Output:**
```
🗑️  Deleting book with ID: 507f1f77bcf86cd799439011
✅ Book deleted successfully: 507f1f77bcf86cd799439011
```

---

## 🧪 Testing All Endpoints

### Quick Test Script

Save this as `test-api.sh` and run with `bash test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5001/api"

echo "🧪 Testing BookPulse API"
echo "========================"

# Test 1: Get all books
echo -e "\n1️⃣  GET all books"
curl -s $BASE_URL/books | jq .

# Test 2: Create a book
echo -e "\n2️⃣  CREATE a new book"
RESPONSE=$(curl -s -X POST $BASE_URL/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "price": 19.99
  }')
echo $RESPONSE | jq .
BOOK_ID=$(echo $RESPONSE | jq -r '.data._id')
echo "📌 Created Book ID: $BOOK_ID"

# Test 3: Get single book
echo -e "\n3️⃣  GET single book"
curl -s $BASE_URL/books/$BOOK_ID | jq .

# Test 4: Update book
echo -e "\n4️⃣  UPDATE book"
curl -s -X PUT $BASE_URL/books/$BOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24.99,
    "rating": 4.5
  }' | jq .

# Test 5: Delete book
echo -e "\n5️⃣  DELETE book"
curl -s -X DELETE $BASE_URL/books/$BOOK_ID | jq .

echo -e "\n✅ All tests completed!"
```

---

## 📊 HTTP Status Codes

| Status Code | Meaning | When Used |
|-------------|---------|-----------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation error, invalid ID format |
| 404 | Not Found | Book doesn't exist |
| 500 | Server Error | Database or server error |

---

## 📝 Request/Response Examples by Language

### JavaScript (Fetch API)

```javascript
// GET all books
fetch('http://localhost:5001/api/books')
  .then(res => res.json())
  .then(data => console.log(data));

// CREATE a book
fetch('http://localhost:5001/api/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Book',
    author: 'Author Name',
    price: 19.99
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// GET single book
fetch('http://localhost:5001/api/books/507f1f77bcf86cd799439011')
  .then(res => res.json())
  .then(data => console.log(data));

// UPDATE book
fetch('http://localhost:5001/api/books/507f1f77bcf86cd799439011', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 24.99 })
})
  .then(res => res.json())
  .then(data => console.log(data));

// DELETE book
fetch('http://localhost:5001/api/books/507f1f77bcf86cd799439011', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Python (Requests Library)

```python
import requests

BASE_URL = 'http://localhost:5001/api/books'

# GET all books
response = requests.get(BASE_URL)
print(response.json())

# CREATE a book
data = {
    'title': 'New Book',
    'author': 'Author Name',
    'price': 19.99
}
response = requests.post(BASE_URL, json=data)
print(response.json())

# GET single book
response = requests.get(f'{BASE_URL}/507f1f77bcf86cd799439011')
print(response.json())

# UPDATE book
update_data = {'price': 24.99}
response = requests.put(f'{BASE_URL}/507f1f77bcf86cd799439011', json=update_data)
print(response.json())

# DELETE book
response = requests.delete(f'{BASE_URL}/507f1f77bcf86cd799439011')
print(response.json())
```

---

## 💡 Common Patterns

### Pattern 1: Create then Display
```bash
# Create a book and capture ID
RESPONSE=$(curl -s -X POST http://localhost:5001/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "New Book", "author": "Author", "price": 19.99}')

BOOK_ID=$(echo $RESPONSE | jq -r '.data._id')

# Get the created book
curl http://localhost:5001/api/books/$BOOK_ID
```

### Pattern 2: Update Multiple Fields
```bash
curl -X PUT http://localhost:5001/api/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "price": 25.99,
    "rating": 4.8
  }'
```

### Pattern 3: Partial Update
```bash
# Only update the price, leave other fields unchanged
curl -X PUT http://localhost:5001/api/books/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"price": 29.99}'
```

---

## 🔒 Error Handling

### Handling Errors in JavaScript

```javascript
async function getBook(id) {
  try {
    const response = await fetch(`http://localhost:5001/api/books/${id}`);
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error:', data.message);
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}
```

---

## 📌 Important Notes

1. **IDs**: All book IDs are MongoDB ObjectIDs (24-character hex strings)
2. **Prices**: Must be positive numbers
3. **Ratings**: Should be between 0 and 5
4. **Timestamps**: `createdAt` and `updatedAt` are automatically managed
5. **Validation**: Schema validation happens on CREATE and UPDATE
6. **CORS**: Frontend on localhost:5173 can make requests

---

## 🚀 Ready to Test!

Your backend is running on: `http://localhost:5001`

Test an endpoint now:
```bash
curl http://localhost:5001/api/books
```

Happy coding! 🎉
