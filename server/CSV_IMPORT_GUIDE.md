# 📥 CSV Import Script - Complete Guide

## Overview

The `importBooks.js` script reads your Amazon Bestseller CSV file and imports all books into MongoDB with full validation and error handling.

---

## ⚙️ Installation (Must Do First!)

### Step 1: Install Required Package

The script uses `csv-parser` to read CSV files. Install it:

```bash
cd server
npm install csv-parser
```

**What is csv-parser?**
- Package that parses CSV files into JavaScript objects
- Converts rows to objects with column headers as keys
- Makes it easy to map CSV data to your schema

### Step 2: Verify Installation

Check that it was installed:

```bash
npm list csv-parser
```

You should see:
```
└── csv-parser@3.0.0
```

---

## 📁 File Setup

### Create Data Directory

Your CSV file should be in a `data` folder:

```bash
# Create data directory
mkdir -p data

# Place your CSV file there
# Your file should be: data/books.csv
```

**Expected structure:**
```
bookpulse/
├── server/
│   ├── importBooks.js ✨ (this script)
│   ├── models/
│   ├── routes/
│   └── ...
├── data/
│   └── books.csv ← Your Kaggle CSV goes here
└── client/
```

### CSV File Format

Your CSV must have these headers (exact names or similar):

```csv
Title,Author,Brand,Manufacturer,Rank,Review Count,Reviews,Price,Genre,Number of Pages
```

**Example CSV content:**
```csv
Title,Author,Brand,Manufacturer,Rank,Review Count,Reviews,Price,Genre,Number of Pages
Atomic Habits,James Clear,Avery,Penguin Random House,2,45230,4.8,16.99,Self-Help,320
1984,George Orwell,Penguin Classics,Penguin Books,5,28945,4.7,13.99,Fiction,328
```

---

## 🚀 How to Use

### Run the Import Script

```bash
# Make sure you're in server directory
cd server

# Run the import script
node importBooks.js
```

### What Happens

1. **Connects to MongoDB** - Uses connection string from `.env`
2. **Clears Old Books** - Deletes all existing books (fresh start)
3. **Reads CSV File** - Opens `../data/books.csv`
4. **Parses Each Row** - Converts CSV to JavaScript objects
5. **Maps Fields** - Converts CSV columns to schema fields
6. **Validates Data** - Checks required fields and constraints
7. **Inserts Valid Books** - Saves to MongoDB
8. **Reports Results** - Shows success/failure statistics
9. **Disconnects** - Closes database connection

### Example Output

```
ℹ️  [12:34:56] Starting CSV Import Process

═══ Connecting to Database ═══
ℹ️  [12:34:56] Connecting to MongoDB...
✅ [12:34:57] Connected to MongoDB successfully

═══ Clearing Old Books ═══
ℹ️  [12:34:57] Clearing old books from database...
✅ [12:34:57] Deleted 5 old books

═══ Importing Books ═══
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

## 📊 Understanding the Code

### Section 1: Imports & Setup

```javascript
import fs from 'fs';                    // File system - read files
import path from 'path';                // Path handling
import { fileURLToPath } from 'url';    // Get directory in ES modules
import csv from 'csv-parser';           // CSV parsing
import mongoose from 'mongoose';        // MongoDB
import dotenv from 'dotenv';            // Environment variables
import Book from './models/Book.js';    // Book model
```

**Why each import?**
- `fs` - Read the CSV file from disk
- `path` - Handle file paths correctly on any OS
- `csv-parser` - Parse CSV into objects
- `mongoose` - Connect to MongoDB and save books
- `dotenv` - Load `.env` for database connection
- `Book` - Use the Book schema we created

---

### Section 2: Path Setup

```javascript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.join(__dirname, '../data/books.csv');
```

**What this does:**
- Gets the directory path of this script
- Constructs path to CSV file: `../data/books.csv`
- Works on Windows, Mac, and Linux

**Why?**
- `__dirname` not available in ES modules
- `import.meta.url` gives us the file URL
- `fileURLToPath` converts URL to file path

---

### Section 3: Utility Functions

#### `log(message, type)`

```javascript
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    
    switch (type) {
        case 'success':
            console.log(`${colors.green}✅ [${timestamp}] ${message}${colors.reset}`);
            break;
        // ... other types
    }
}
```

**Purpose:**
- Consistent, colored console output
- Adds timestamps to every log
- Different colors for different types
- Makes output easy to read

**Usage:**
```javascript
log('Starting import', 'info');        // ℹ️ Blue
log('Successfully imported', 'success');  // ✅ Green
log('Error occurred', 'error');        // ❌ Red
log('Warning message', 'warning');     // ⚠️  Yellow
```

---

#### `convertValue(fieldName, value)`

```javascript
function convertValue(fieldName, value) {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    switch (fieldName) {
        case 'rank':
        case 'price':
        case 'reviewCount':
        case 'reviews':
        case 'numberOfPages':
            const numValue = parseFloat(value);
            return isNaN(numValue) ? null : numValue;
        
        case 'title':
        case 'author':
        // ... convert to strings
    }
}
```

**Purpose:**
- CSV reads everything as strings
- Need to convert to proper types
- Handles numbers, strings, empty values

**Example:**
```javascript
convertValue('price', '14.99')    // Returns: 14.99 (number)
convertValue('title', '  1984  ') // Returns: '1984' (string)
convertValue('rank', '')          // Returns: null
```

---

#### `mapCsvToBook(row)`

```javascript
function mapCsvToBook(row) {
    return {
        title: convertValue('title', row.Title),
        author: convertValue('author', row.Author),
        brand: convertValue('brand', row.Brand || ''),
        manufacturer: convertValue('manufacturer', row.Manufacturer || ''),
        rank: convertValue('rank', row.Rank),
        // ... etc
    };
}
```

**Purpose:**
- Map CSV columns to Book schema fields
- Handle missing columns gracefully
- Convert values to proper types

**CSV Column Mapping:**
```
CSV Column          →    Schema Field
─────────────────────────────────────
Title               →    title
Author              →    author
Brand               →    brand
Manufacturer        →    manufacturer
Rank                →    rank
Review Count        →    reviewCount
Reviews             →    reviews
Price               →    price
Genre               →    genre
Number of Pages     →    numberOfPages
```

---

#### `validateBook(book)`

```javascript
function validateBook(book) {
    const errors = [];

    if (!book.title || book.title.trim() === '') {
        errors.push('Missing title');
    }
    if (!book.author || book.author.trim() === '') {
        errors.push('Missing author');
    }
    if (!book.rank || book.rank < 1) {
        errors.push('Invalid rank (must be >= 1)');
    }
    // ... check other fields

    return {
        isValid: errors.length === 0,
        errors,
    };
}
```

**Purpose:**
- Check data quality BEFORE saving to database
- Catch errors early
- Return list of validation errors

**Validations:**
- `title` - Required, not empty
- `author` - Required, not empty
- `rank` - Required, must be >= 1
- `price` - Required, must be >= 0
- `genre` - Required, not empty

---

#### `connectDatabase()`

```javascript
async function connectDatabase() {
    try {
        log('Connecting to MongoDB...', 'info');
        
        await mongoose.connect(process.env.MONGODB_URI);
        
        log('Connected to MongoDB successfully', 'success');
    } catch (error) {
        log(`Failed to connect to MongoDB: ${error.message}`, 'error');
        throw error;
    }
}
```

**Purpose:**
- Establish connection to MongoDB
- Uses connection string from `.env`
- Error handling with try-catch

**What is async/await?**
- `async` - Function can wait for promises
- `await` - Wait here until connection completes
- `try-catch` - Handle errors gracefully

---

#### `clearBooks()`

```javascript
async function clearBooks() {
    try {
        log('Clearing old books from database...', 'info');
        
        const result = await Book.deleteMany({});
        
        log(`Deleted ${result.deletedCount} old books`, 'success');
        
        return result.deletedCount;
    } catch (error) {
        log(`Error clearing books: ${error.message}`, 'error');
        throw error;
    }
}
```

**Purpose:**
- Delete all existing books
- Fresh start for import
- Prevents duplicates

**Why clearBooks()?**
- If you run import twice, you don't want duplicates
- Clearing ensures clean state
- Can see how many books were deleted

---

#### `importBooksFromCsv()`

```javascript
async function importBooksFromCsv() {
    return new Promise((resolve, reject) => {
        // Read file stream
        const readStream = fs.createReadStream(csvFilePath);

        // Parse CSV
        readStream
            .pipe(csv())
            .on('data', async (row) => {
                // For each row:
                // 1. Map to Book schema
                // 2. Validate data
                // 3. Save to MongoDB
            })
            .on('end', () => {
                // When finished, resolve promise
                resolve(stats);
            })
            .on('error', (error) => {
                // If error, reject promise
                reject(error);
            });
    });
}
```

**Purpose:**
- Main import logic
- Read CSV line by line
- Process each row

**How it works:**
1. `fs.createReadStream()` - Opens file
2. `.pipe(csv())` - Parses CSV into objects
3. `.on('data', ...)` - Fires for each row
4. `.on('end', ...)` - Fires when done
5. `.on('error', ...)` - Fires if error

**Why streaming?**
- Memory efficient
- Can handle huge CSV files
- Processes one row at a time
- Better than loading entire file at once

---

### Section 4: Main Function

```javascript
async function main() {
    try {
        // 1. Connect to database
        await connectDatabase();

        // 2. Clear old books
        const deletedCount = await clearBooks();

        // 3. Import books
        const stats = await importBooksFromCsv();

        // 4. Print summary
        printSummary(stats, deletedCount);

        // 5. Disconnect
        await mongoose.disconnect();

        // 6. Exit
        process.exit(stats.failed > 0 ? 1 : 0);
    } catch (error) {
        log(`Fatal error: ${error.message}`, 'error');
        process.exit(1);
    }
}
```

**Purpose:**
- Orchestrate the entire import process
- Handle errors gracefully
- Return proper exit code

**Exit Codes:**
- `0` - Success (all books imported)
- `1` - Failure (some errors occurred)

---

## 🐛 Troubleshooting

### Error: "CSV file not found"

**Problem:**
```
❌ CSV file not found: /path/to/data/books.csv
```

**Solution:**
1. Create `data` directory: `mkdir -p data`
2. Place your CSV file: `data/books.csv`
3. Check filename is exactly `books.csv`
4. Verify from server directory

---

### Error: "Cannot find module 'csv-parser'"

**Problem:**
```
Error: Cannot find module 'csv-parser'
```

**Solution:**
```bash
npm install csv-parser
```

---

### Error: "Cannot connect to MongoDB"

**Problem:**
```
❌ Failed to connect to MongoDB: connect ECONNREFUSED
```

**Solution:**
1. Check MongoDB is running: `brew services list`
2. Start MongoDB: `brew services start mongodb-community`
3. Verify connection string in `.env`

---

### Error: "Failed to import: validation error"

**Problem:**
```
❌ Failed: 50 books failed validation
```

**Solution:**
1. Check CSV has required columns
2. Ensure columns: Title, Author, Rank, Price, Genre
3. Check for empty rows in CSV
4. Verify data types (rank must be number, price must be number)

---

## 📊 Statistics Explained

### Import Summary Shows:

```
Total Records: 1000       ← Total rows in CSV
✅ Imported: 985          ← Successfully saved to MongoDB
❌ Failed: 15             ← Had validation errors
Success Rate: 98.50%      ← Percentage imported
```

### If There Are Errors:

First 10 errors are shown:
```
Row 50: Missing Title
  - Title is required
Row 75: Invalid Rank
  - rank must be >= 1
```

---

## 🎯 Example Workflow

### Step 1: Get Your CSV

Download from Kaggle:
```
https://www.kaggle.com/datasets/...
```

Should look like:
```csv
Title,Author,Brand,Manufacturer,Rank,Review Count,Reviews,Price,Genre,Number of Pages
Atomic Habits,James Clear,Avery,Penguin,2,45230,4.8,16.99,Self-Help,320
1984,George Orwell,...
```

### Step 2: Place in Data Folder

```bash
mv ~/Downloads/books.csv ~/BookPulse/data/
```

### Step 3: Install csv-parser

```bash
cd ~/BookPulse/server
npm install csv-parser
```

### Step 4: Run Import

```bash
node importBooks.js
```

### Step 5: Verify Import

```bash
# Check in MongoDB
mongo
use bookpulse
db.books.find().count()  # Should show number of imported books
```

---

## ✅ Advanced: What the Script Does

```
START
  ↓
Validate .env exists
  ↓
Connect to MongoDB
  ↓
DELETE all old books
  ↓
OPEN CSV file
  ↓
FOR EACH ROW in CSV:
  ├─ Map CSV columns to schema
  ├─ Convert data types
  ├─ Validate required fields
  ├─ If valid → SAVE to MongoDB
  └─ If invalid → ADD to errors
  ↓
CLOSE CSV file
  ↓
PRINT summary
  ├─ Total records
  ├─ Imported count
  ├─ Failed count
  └─ Error details
  ↓
DISCONNECT from MongoDB
  ↓
EXIT with status code
END
```

---

## 💡 Key Concepts

### Streaming
- Reads CSV line-by-line
- Doesn't load entire file to memory
- Great for large files (thousands of rows)

### Validation
- Checks data BEFORE saving
- Prevents corrupt data in database
- Returns specific error messages

### Error Handling
- try-catch blocks catch errors
- Script continues on errors
- Reports all errors at end

### Exit Codes
- 0 = Success
- 1 = Failure (tells system there were errors)

---

## 🚀 Next Steps

1. ✅ Install csv-parser: `npm install csv-parser`
2. ✅ Place CSV in `data/books.csv`
3. ✅ Run import: `node importBooks.js`
4. ✅ Verify in MongoDB
5. ✅ Test CRUD routes with imported data
6. ✅ Update React frontend to show books

---

## 📚 Related Documentation

- **BOOK_SCHEMA_EXPLAINED.md** - Field mappings
- **CRUD_IMPLEMENTATION.md** - Verify books are saved
- **GETTING_STARTED.md** - Full project setup

---

**Your import script is ready! 🚀**
