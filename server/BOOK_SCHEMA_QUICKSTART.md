# 🚀 Book Schema - Quick Start Guide

## ⚡ 5-Minute Quick Start

### What You Need to Know Right Now

Your Book schema now has **10 fields** matching your **Amazon Bestseller Kaggle dataset**:

```javascript
{
    title: String (required),
    author: String (required),
    rank: Number (required, min: 1),
    price: Number (required, min: 0),
    genre: String (required),
    reviewCount: Number (optional),
    reviews: Number (optional),
    brand: String (optional),
    manufacturer: String (optional),
    numberOfPages: Number (optional)
}
```

---

## 📝 5 Required Fields (Must Provide)

1. **title** - Book name
2. **author** - Author name  
3. **rank** - Bestseller ranking (1 = top)
4. **price** - Book price in USD
5. **genre** - Book category

---

## ❌ 5 Optional Fields (Nice to Have)

1. **brand** - Publisher brand
2. **manufacturer** - Publisher name
3. **reviewCount** - Number of reviews
4. **reviews** - Average rating
5. **numberOfPages** - Number of pages

---

## ✅ Test It Now

### Create a Book

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

### Get All Books

```bash
curl http://localhost:5001/api/books
```

### Get Single Book

```bash
curl http://localhost:5001/api/books/[book-id]
```

### Update Book

```bash
curl -X PUT http://localhost:5001/api/books/[book-id] \
  -H "Content-Type: application/json" \
  -d '{"reviews": 4.9}'
```

### Delete Book

```bash
curl -X DELETE http://localhost:5001/api/books/[book-id]
```

---

## 🛡️ Validation Rules

**These will fail:**
- Creating book without required fields
- Setting `rank: 0` (min is 1)
- Setting `price: -5` (min is 0)

**These will work:**
- Missing optional fields (defaults applied)
- Extra spaces in strings (auto-trimmed)
- Decimal prices like 14.99

---

## 📊 Field Reference

| Field | Type | Example |
|-------|------|---------|
| title | String | "1984" |
| author | String | "George Orwell" |
| rank | Number | 5 |
| price | Number | 13.99 |
| genre | String | "Fiction" |
| reviewCount | Number | 28945 |
| reviews | Number | 4.7 |
| brand | String | "Penguin" |
| manufacturer | String | "Penguin Books" |
| numberOfPages | Number | 328 |

---

## 💡 Why Each Field Exists

**Required (Core Data):**
- `title` - Every book needs a name
- `author` - Who wrote it
- `rank` - Amazon bestseller position
- `price` - How much it costs
- `genre` - What category

**Optional (Additional Info):**
- `brand` - Publisher branding
- `manufacturer` - Publisher name
- `reviewCount` - How many people reviewed it
- `reviews` - Average star rating
- `numberOfPages` - Book length

---

## 📚 Full Documentation

Start here for more details:

1. **BOOK_SCHEMA_INDEX.md** - Navigation guide
2. **BOOK_SCHEMA_SUMMARY.md** - Complete overview
3. **BOOK_SCHEMA_EXPLAINED.md** - Deep dive
4. **BOOK_SCHEMA_QUICK_REF.md** - Cheat sheet
5. **BOOK_SCHEMA_VALIDATION.md** - Testing guide
6. **BOOK_SCHEMA_COMPARISON.md** - Before/after

---

## 🎯 Next Steps

1. ✅ Test creating a book with curl above
2. ✅ Read BOOK_SCHEMA_SUMMARY.md for full overview
3. ✅ Import your Kaggle CSV data
4. ✅ Update React frontend to display new fields
5. ✅ Add filtering and sorting features

---

## ❓ Quick Help

**Q: What if I don't have all required fields?**  
A: Validation will fail. Provide at least: title, author, rank, price, genre

**Q: Can optional fields be empty?**  
A: Yes! They default to 0 or empty string if not provided.

**Q: Do I need to manually set timestamps?**  
A: No! createdAt and updatedAt are automatic.

---

**🚀 You're ready to go! Start testing! 🚀**
