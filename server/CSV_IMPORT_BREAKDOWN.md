# 📖 CSV Import Script - Detailed Code Breakdown

## Complete Code Overview

The `importBooks.js` script has 5 main sections. Let's break down every function line by line.

---

## 📋 Section 1: Setup & Configuration

### Imports Explained

```javascript
import fs from 'fs';
```
**What:** File system module (built-in)  
**Why:** Read CSV file from disk  
**Use:** `fs.createReadStream(csvFilePath)`

```javascript
import path from 'path';
```
**What:** Path handling module (built-in)  
**Why:** Handle file paths correctly on all operating systems  
**Use:** `path.join(__dirname, '../data/books.csv')`

```javascript
import { fileURLToPath } from 'url';
```
**What:** Convert file URL to path (needed for ES modules)  
**Why:** `__dirname` not available in ES modules  
**Use:** `fileURLToPath(import.meta.url)`

```javascript
import csv from 'csv-parser';
```
**What:** CSV parsing library (npm package)  
**Why:** Parse CSV into JavaScript objects  
**Use:** `readStream.pipe(csv())`

```javascript
import mongoose from 'mongoose';
```
**What:** MongoDB connection library  
**Why:** Connect to and query MongoDB  
**Use:** `mongoose.connect()`, `Book.save()`

```javascript
import dotenv from 'dotenv';
```
**What:** Environment variable loader  
**Why:** Load `.env` file with database credentials  
**Use:** `dotenv.config()`

```javascript
import Book from './models/Book.js';
```
**What:** Mongoose Book model  
**Why:** Save books to database with schema validation  
**Use:** `new Book(bookData)`

---

### Path Setup

```javascript
dotenv.config();
```
**What:** Loads environment variables from `.env` file  
**Why:** Get MongoDB connection string  
**Result:** `process.env.MONGODB_URI` is now available

```javascript
const __filename = fileURLToPath(import.meta.url);
```
**What:** Get this file's URL, convert to file path  
**Example:** `/Users/user/BookPulse/server/importBooks.js`  
**Why:** ES modules don't have `__filename` built-in

```javascript
const __dirname = path.dirname(__filename);
```
**What:** Get directory of this file  
**Example:** `/Users/user/BookPulse/server`  
**Why:** Find relative path to data folder

```javascript
const csvFilePath = path.join(__dirname, '../data/books.csv');
```
**What:** Construct full path to CSV file  
**Result:** `/Users/user/BookPulse/data/books.csv`  
**Why:** Works on Windows, Mac, Linux

---

## 🎨 Section 2: Colors Configuration

```javascript
const colors = {
    reset: '\x1b[0m',        // Reset color
    bright: '\x1b[1m',       // Bold text
    green: '\x1b[32m',       // Green color
    red: '\x1b[31m',         // Red color
    yellow: '\x1b[33m',      // Yellow color
    blue: '\x1b[34m',        // Blue color
    cyan: '\x1b[36m',        // Cyan color
};
```

**What:** ANSI color codes for terminal output  
**Why:** Make console output colorful and readable  
**Example:**
```javascript
console.log(`${colors.green}Success!${colors.reset}`);
// Output: "Success!" in green, then reset
```

---

## 🔧 Section 3: Utility Functions

### 3.1 - log() Function

```javascript
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    // ...
}
```

**Line 1:** `function log(message, type = 'info')`
- Define function with 2 parameters
- `type` defaults to `'info'` if not provided

**Line 2:** `const timestamp = new Date().toLocaleTimeString();`
- Get current time as HH:MM:SS format
- `toLocaleTimeString()` formats nicely

**Inside each case:**
```javascript
case 'success':
    console.log(`${colors.green}✅ [${timestamp}] ${message}${colors.reset}`);
    break;
```
- Log with green color and checkmark emoji
- `${...}` is template string interpolation
- `colors.reset` removes color after message

**Usage:**
```javascript
log('Starting import', 'info')         // ℹ️ Blue
log('Book imported', 'success')        // ✅ Green
log('Validation failed', 'error')      // ❌ Red
log('Check your CSV', 'warning')       // ⚠️ Yellow
```

---

### 3.2 - convertValue() Function

```javascript
function convertValue(fieldName, value) {
    // Handle empty or null values
    if (value === null || value === undefined || value === '') {
        return null;
    }
```

**Purpose:** Convert CSV string to proper JavaScript type  
**First check:** If value is empty/null, return null

```javascript
    switch (fieldName) {
        case 'rank':
        case 'price':
        case 'reviewCount':
        case 'reviews':
        case 'numberOfPages':
            const numValue = parseFloat(value);
            return isNaN(numValue) ? null : numValue;
```

**For number fields:**
- `parseFloat()` converts string "14.99" to number 14.99
- `isNaN()` checks if conversion failed
- If failed: return null, else: return number

**Example:**
```javascript
convertValue('price', '14.99')    // 14.99 (number)
convertValue('price', 'invalid')  // null
convertValue('price', '')         // null
```

```javascript
        case 'title':
        case 'author':
        case 'brand':
        case 'manufacturer':
        case 'genre':
            return String(value).trim();
```

**For string fields:**
- `String()` ensures it's a string
- `.trim()` removes leading/trailing spaces
- `"  1984  "` becomes `"1984"`

---

### 3.3 - mapCsvToBook() Function

```javascript
function mapCsvToBook(row) {
    return {
        title: convertValue('title', row.Title),
        author: convertValue('author', row.Author),
        brand: convertValue('brand', row.Brand || ''),
        manufacturer: convertValue('manufacturer', row.Manufacturer || ''),
        rank: convertValue('rank', row.Rank),
        reviewCount: convertValue('reviewCount', row['Review Count'] || row.ReviewCount || 0),
        reviews: convertValue('reviews', row.Reviews || 0),
        price: convertValue('price', row.Price),
        genre: convertValue('genre', row.Genre),
        numberOfPages: convertValue('numberOfPages', row['Number of Pages'] || row.NumberofPages),
    };
}
```

**What this does:**
- Takes CSV row object
- Returns Book schema object
- Maps each CSV column to schema field

**Line by line:**
```javascript
title: convertValue('title', row.Title),
```
- Get `Title` column from CSV row
- Convert it using `convertValue()`
- Set as `title` in book object

```javascript
brand: convertValue('brand', row.Brand || ''),
```
- `row.Brand || ''` - Use Brand if exists, else empty string
- Prevents undefined when column missing

```javascript
reviewCount: convertValue('reviewCount', row['Review Count'] || row.ReviewCount || 0),
```
- Try `row['Review Count']` (space in name)
- If not found, try `row.ReviewCount`
- If not found, use 0
- Handles different CSV column naming

**Example:**
```javascript
// Input CSV row:
{ Title: "1984", Author: "Orwell", Price: "13.99", ... }

// Output Book object:
{ title: "1984", author: "Orwell", price: 13.99, ... }
```

---

### 3.4 - validateBook() Function

```javascript
function validateBook(book) {
    const errors = [];

    if (!book.title || book.title.trim() === '') {
        errors.push('Missing title');
    }
```

**Purpose:** Check if book has valid data  
**Returns:** Object with `isValid` boolean and `errors` array

**Validation checks:**
```javascript
if (!book.title || book.title.trim() === '') {
```
- `!book.title` - Check if title exists
- `title.trim() === ''` - Check if not just spaces
- If either true, title is invalid

```javascript
if (!book.rank || book.rank < 1) {
```
- Rank must exist
- Rank must be at least 1

```javascript
if (book.price === null || book.price < 0) {
```
- Price must exist (0 is valid, null is not)
- Price can't be negative

**Return:**
```javascript
return {
    isValid: errors.length === 0,
    errors,
};
```
- If no errors, `isValid = true`
- Return both boolean and error list

---

### 3.5 - connectDatabase() Function

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

**Key points:**
- `async` - Can use `await`
- `await mongoose.connect()` - Wait for connection
- `process.env.MONGODB_URI` - From `.env` file
- `try-catch` - Handle connection errors
- `throw error` - Re-throw to caller

**What happens:**
1. Log "Connecting..."
2. Wait for MongoDB connection
3. If success: Log "Connected"
4. If fail: Log error and re-throw

---

### 3.6 - clearBooks() Function

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

**What this does:**
- Delete all books from database
- `deleteMany({})` - Delete with no filter (all)
- Returns count of deleted books

**Why?**
- Fresh start for import
- Prevents duplicate books
- Shows how many old books there were

---

### 3.7 - importBooksFromCsv() Function

```javascript
async function importBooksFromCsv() {
    return new Promise((resolve, reject) => {
```

**Purpose:** Import books from CSV file  
**Returns:** Promise that resolves with import stats

```javascript
        log(`Reading CSV from: ${csvFilePath}`, 'info');

        if (!fs.existsSync(csvFilePath)) {
            log(`CSV file not found: ${csvFilePath}`, 'error');
            reject(new Error(`CSV file not found: ${csvFilePath}`));
            return;
        }
```

**Check if CSV exists:**
- `fs.existsSync()` - Check file exists
- If not: Log error and reject promise
- `return` - Stop execution

```javascript
        const stats = {
            total: 0,
            imported: 0,
            failed: 0,
            errors: [],
        };
```

**Initialize statistics:**
- `total` - Total rows processed
- `imported` - Successfully imported
- `failed` - Failed validation
- `errors` - List of errors

```javascript
        const readStream = fs.createReadStream(csvFilePath);
```

**Create read stream:**
- Opens file for reading
- Memory efficient (reads chunk by chunk)

```javascript
        readStream
            .pipe(csv())
            .on('data', async (row) => {
                stats.total++;
```

**Pipe CSV parser:**
- `.pipe()` - Connect stream to parser
- `.on('data', ...)` - Called for each row
- `stats.total++` - Increment total count

```javascript
                try {
                    const bookData = mapCsvToBook(row);
                    const { isValid, errors } = validateBook(bookData);

                    if (!isValid) {
                        stats.failed++;
                        stats.errors.push({
                            row: stats.total,
                            title: bookData.title,
                            errors,
                        });
                        return;
                    }

                    const book = new Book(bookData);
                    await book.save();

                    stats.imported++;
```

**For each row:**
1. Map CSV to Book object
2. Validate data
3. If invalid: Add to errors and skip
4. If valid: Create Book object and save
5. Increment imported count

```javascript
                } catch (error) {
                    stats.failed++;
                    stats.errors.push({
                        row: stats.total,
                        error: error.message,
                    });
                }
            })
            .on('end', () => {
                log('CSV file reading completed', 'success');
                resolve(stats);
            })
            .on('error', (error) => {
                log(`Error reading CSV: ${error.message}`, 'error');
                reject(error);
            });
    });
}
```

**Event handlers:**
- `.on('end')` - Called when CSV fully read
  - Resolve promise with stats
- `.on('error')` - Called if read error
  - Reject promise

---

### 3.8 - printSummary() Function

```javascript
function printSummary(stats, deletedCount) {
    console.log(`\n${colors.cyan}${colors.bright}╔════════════════════════════════════════════════════╗${colors.reset}`);
```

**Purpose:** Display formatted import results

**Prints:**
1. Header with colors and emojis
2. Number of deleted books
3. Import statistics (total, imported, failed)
4. First 10 errors if any
5. Success rate percentage

**Uses colors for readability:**
- Green for success numbers
- Red for failed numbers
- Yellow for warnings

---

## 🏃 Section 4: Main Function

```javascript
async function main() {
    try {
        log('Starting CSV Import Process', 'section');

        // Step 1: Connect to database
        await connectDatabase();

        // Step 2: Clear old books
        const deletedCount = await clearBooks();

        // Step 3: Import books from CSV
        log('Starting to import books from CSV...', 'info');
        const stats = await importBooksFromCsv();

        // Step 4: Print summary
        printSummary(stats, deletedCount);

        // Step 5: Disconnect from database
        log('Disconnecting from MongoDB...', 'info');
        await mongoose.disconnect();
        log('Disconnected from MongoDB', 'success');

        // Exit with appropriate code
        if (stats.failed > 0) {
            log(`Import completed with ${stats.failed} errors`, 'warning');
            process.exit(1);
        } else {
            log('Import completed successfully!', 'success');
            process.exit(0);
        }
    } catch (error) {
        log(`Fatal error: ${error.message}`, 'error');
        
        // Disconnect if connected
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        
        process.exit(1);
    }
}
```

**Flow:**
1. `await connectDatabase()` - Connect to MongoDB
2. `await clearBooks()` - Delete old books
3. `await importBooksFromCsv()` - Import from CSV
4. `printSummary()` - Show results
5. `mongoose.disconnect()` - Close connection
6. `process.exit()` - Exit with status code

**Exit codes:**
- `0` - Success (no errors)
- `1` - Failure (some errors occurred)

---

## 🚀 Section 5: Entry Point

```javascript
main();
```

**Simply calls the main function to start everything.**

---

## 🔄 Complete Flow

```
START (node importBooks.js)
    ↓
main() function called
    ↓
Try block entered
    ↓
connectDatabase()
    ├─ Load .env
    ├─ Connect to MongoDB
    └─ Log success/error
    ↓
clearBooks()
    ├─ Delete all books
    └─ Return count
    ↓
importBooksFromCsv()
    ├─ Open CSV file
    ├─ For each row:
    │   ├─ Map to Book object
    │   ├─ Validate
    │   ├─ Save or record error
    │   └─ Update stats
    └─ Return stats
    ↓
printSummary()
    └─ Display formatted results
    ↓
mongoose.disconnect()
    └─ Close database connection
    ↓
process.exit()
    ├─ 0 if success
    └─ 1 if errors
    ↓
END
```

---

## 💡 Key Programming Concepts Used

### async/await
```javascript
async function connectDatabase() {
    await mongoose.connect(...);
}
```
- `async` - Function can use await
- `await` - Wait for promise to resolve
- Cleaner than `.then()` chains

### try-catch
```javascript
try {
    // Code that might fail
    await mongoose.connect();
} catch (error) {
    // Handle error
    log(error.message, 'error');
}
```
- `try` - Attempt code
- `catch` - Handle errors gracefully

### Destructuring
```javascript
const { isValid, errors } = validateBook(book);
```
- Extract properties from object
- Shorter than `const isValid = result.isValid;`

### Template Strings
```javascript
`${colors.green}✅ [${timestamp}] ${message}${colors.reset}`
```
- Embed variables with `${...}`
- Cleaner than string concatenation

### Streaming
```javascript
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => { ... })
```
- Read file in chunks
- Memory efficient for large files

---

## 🎓 Summary

The script:
1. ✅ Sets up environment
2. ✅ Validates CSV file exists
3. ✅ Connects to MongoDB
4. ✅ Clears old data
5. ✅ Reads CSV line by line
6. ✅ Validates each row
7. ✅ Saves valid books
8. ✅ Records errors
9. ✅ Reports results
10. ✅ Cleans up connections

**Every line has a purpose and is beginner-friendly! 🚀**
