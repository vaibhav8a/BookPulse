# 🚀 CSV Import - Quick Start (5 Minutes)

## 🎯 What This Does

Imports your Amazon Bestseller CSV into MongoDB with validation and error reporting.

---

## ⚡ 3-Step Setup

### Step 1: Install csv-parser

```bash
cd server
npm install csv-parser
```

**Why?** The script uses this to read CSV files.

### Step 2: Place Your CSV File

```bash
# Create data folder
mkdir -p data

# Copy your CSV there
# File must be named: books.csv
# Location: data/books.csv
```

### Step 3: Run Import

```bash
node importBooks.js
```

**That's it!** The script will:
- ✅ Connect to MongoDB
- ✅ Delete old books
- ✅ Read CSV file
- ✅ Validate each row
- ✅ Save to database
- ✅ Show results

---

## 📊 What You'll See

```
ℹ️  [12:34:56] Starting CSV Import Process

ℹ️  [12:34:56] Connecting to MongoDB...
✅ [12:34:57] Connected to MongoDB successfully

ℹ️  [12:34:57] Clearing old books from database...
✅ [12:34:57] Deleted 5 old books

ℹ️  [12:34:57] Reading CSV from: /path/to/data/books.csv
✅ [12:34:58] CSV file reading completed

╔════════════════════════════════════════════════════╗
║          📊 IMPORT SUMMARY                         ║
╚════════════════════════════════════════════════════╝

Previous Data:
  Deleted: 5 old books

Import Results:
  Total Records: 1000
  ✅ Imported: 985
  ❌ Failed: 15

Success Rate: 98.50%

✅ [12:34:58] Import completed successfully!
```

---

## 🎓 How CSV Columns Map

| CSV Column | Schema Field | Required |
|---|---|---|
| Title | title | ✅ |
| Author | author | ✅ |
| Rank | rank | ✅ |
| Price | price | ✅ |
| Genre | genre | ✅ |
| Review Count | reviewCount | ❌ |
| Reviews | reviews | ❌ |
| Brand | brand | ❌ |
| Manufacturer | manufacturer | ❌ |
| Number of Pages | numberOfPages | ❌ |

---

## 🔍 CSV Format Expected

Your CSV should look like:

```csv
Title,Author,Brand,Manufacturer,Rank,Review Count,Reviews,Price,Genre,Number of Pages
Atomic Habits,James Clear,Avery,Penguin,2,45230,4.8,16.99,Self-Help,320
1984,George Orwell,Penguin Classics,Penguin,5,28945,4.7,13.99,Fiction,328
To Kill a Mockingbird,Harper Lee,HarperCollins,Harper,10,15230,4.9,15.99,Fiction,281
```

---

## ✅ Verify It Worked

### Option 1: Check MongoDB

```bash
# Open MongoDB shell
mongosh

# Switch to database
use bookpulse

# Count books
db.books.countDocuments()

# See a sample book
db.books.findOne()
```

### Option 2: Test API

```bash
# Get all books
curl http://localhost:5001/api/books

# Should return your imported books!
```

---

## ❌ Common Issues

### "csv-parser not found"
```bash
npm install csv-parser
```

### "CSV file not found"
- Create: `mkdir -p data`
- Place file at: `data/books.csv`

### "Cannot connect to MongoDB"
```bash
brew services start mongodb-community
```

### "Validation errors in rows"
- Check CSV has required columns
- Ensure no empty rows
- Verify rank and price are numbers

---

## 📚 Full Documentation

Read `CSV_IMPORT_GUIDE.md` for detailed explanations of every function.

---

## 🚀 Next Steps

1. ✅ Run `node importBooks.js`
2. ✅ Verify books imported
3. ✅ Test with CRUD routes
4. ✅ Display in React frontend

**Done! Your database is now populated! 🎉**
