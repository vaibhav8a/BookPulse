# 🚀 BookPulse Backend - Getting Started Guide

## ✅ Current Status

Your backend is **running and waiting for MongoDB connection**! 

The server has started successfully and is listening on `http://localhost:5000`.

## 📍 What Happened

When you ran `npm run dev`, here's what occurred:

1. **npm found the server folder** - Located `package.json` in the server directory
2. **nodemon started** - The development server with auto-reload enabled
3. **Node.js executed index.js** - Started the Express application
4. **CORS middleware loaded** - Ready to accept frontend requests
5. **MongoDB connection attempted** - Waiting for MongoDB to be available

## ✅ MongoDB Setup Complete!

Your MongoDB is now **installed and running** via Homebrew! The server can now connect to it successfully.

## 📝 Terminal Commands Explained

### Command You Just Ran:
```bash
npm run dev
```

**Step-by-step breakdown:**

1. **npm** - Node Package Manager (installed with Node.js)
2. **run** - Execute a script defined in package.json
3. **dev** - The script name (equivalent to running `nodemon index.js`)

### What package.json Scripts Do:

```json
"scripts": {
  "start": "node index.js",      // Production: run once
  "dev": "nodemon index.js"       // Development: auto-reload on changes
}
```

- **npm start** → Runs server normally (no auto-reload)
- **npm run dev** → Runs with nodemon (auto-reloads when you save files)

## 🗄️ MongoDB Setup (Already Completed! ✅)

### What Was Done:

**Step 1:** Added MongoDB's Homebrew tap
```bash
brew tap mongodb/brew
```

**Step 2:** Installed MongoDB Community Edition
```bash
brew install mongodb-community
```

**Step 3:** Started MongoDB Service
```bash
brew services start mongodb/brew/mongodb-community
```

Your MongoDB is now running on `mongodb://localhost:27017`!

**Step 1:** Go to https://www.mongodb.com/cloud/atlas

**Step 2:** Create a free account (Google/GitHub login available)

**Step 3:** Create a cluster (free tier available)

**Step 4:** Get connection string
- Click "Connect" → "Connect your application"
- Copy the connection string

**Step 5:** Update `.env` file
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/bookpulse
```

**Step 6:** Start backend
```bash
npm run dev
```

### Option C: Skip MongoDB for Now (Testing Only)

If you just want to test the basic API endpoints without MongoDB:

**Edit `server/index.js`** - Comment out the MongoDB connection:

Find this section:
```javascript
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();  // ← Comment this line
```

Change to:
```javascript
const startServer = async () => {
  try {
    // Connect to MongoDB
    // await connectDB();  // ← Commented out for testing
```

Then restart the server:
```bash
npm run dev
```

The API will work without database at `http://localhost:5000/api/`

## 🧪 Testing Your API

Once MongoDB is running or you've skipped it, test the endpoints:

### Test 1: Root Endpoint
```bash
curl http://localhost:5000/api/
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Backend Running",
  "timestamp": "2026-04-09T07:20:00.000Z"
}
```

### Test 2: Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "status": "Server is healthy",
  "uptime": 125.432
}
```

## 📂 File Structure Recap

```
server/
├── config/db.js              ← MongoDB connection
├── middleware/
│   ├── cors.js              ← Allow frontend requests
│   └── errorHandler.js      ← Catch errors
├── models/Book.js           ← Database schema
├── routes/index.js          ← API endpoints
├── index.js                 ← Main server file ← STARTS HERE
├── .env                     ← Environment variables (don't commit)
├── package.json             ← Dependencies list
└── README.md                ← Documentation
```

## 🔄 Development Workflow

### While `npm run dev` is Running:

1. **Edit a file** - e.g., modify `routes/index.js`
2. **Save the file** - Ctrl+S (or Cmd+S on Mac)
3. **nodemon detects changes** - Automatically restarts the server
4. **You see "restarting" in terminal** - Changes are live
5. **Test the API** - curl or browser

### To Stop the Server:

**In the terminal running the server:**
```bash
Press Ctrl+C
```

This will:
- Stop nodemon
- Close the Node.js process
- Return to command prompt

### To Restart:

```bash
npm run dev
```

## 📊 Common Issues & Solutions

### Issue 1: "Could not connect to MongoDB"
**Solution:** Install MongoDB locally or use MongoDB Atlas (see above)

### Issue 2: "Port 5000 already in use"
**Solution:** Either:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### Issue 3: "nodemon: command not found"
**Solution:** Reinstall dependencies
```bash
cd server
npm install
```

### Issue 4: File changes not reloading
**Solution:** Restart nodemon
```bash
# In terminal: Ctrl+C
npm run dev
```

## 🎓 What Each File Does

| File | Purpose | When Used |
|------|---------|-----------|
| `index.js` | Main server entry point | Always (starts here) |
| `config/db.js` | Connects to MongoDB | Automatically on startup |
| `middleware/cors.js` | Allows frontend requests | Every API call |
| `middleware/errorHandler.js` | Catches errors | When errors occur |
| `routes/index.js` | API endpoints (/, /health) | When you make requests |
| `models/Book.js` | Database schema | For database operations |
| `.env` | Config values (sensitive) | Read at startup |
| `package.json` | Project dependencies | Used by npm install |

## 🚀 Next Steps

1. **Setup MongoDB** (local or Atlas)
2. **Restart backend** with `npm run dev`
3. **Test API endpoints** with curl or Postman
4. **Connect React frontend** to these endpoints
5. **Add more routes** as needed for book operations

## 💡 Pro Tips

- Keep server running while developing
- Use VS Code terminal to keep it visible
- Test with `curl` or install Postman app
- Read the comments in each file to understand the code
- Modify files and watch nodemon auto-restart

---

**Backend is ready! 🎉 Next: Setup MongoDB and start building features!**
