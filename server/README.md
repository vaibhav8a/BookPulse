# BookPulse Backend

Express.js + MongoDB backend for the BookPulse Amazon Bestseller Intelligence Dashboard.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   ├── cors.js              # CORS configuration
│   └── errorHandler.js      # Error handling middleware
├── models/
│   └── Book.js              # Book data model
├── routes/
│   └── index.js             # API routes
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── index.js                # Main server file
└── package.json            # Dependencies
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create .env File
```bash
cp .env.example .env
```

Edit `.env` and configure:
```
MONGODB_URI=mongodb://localhost:27017/bookpulse
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB
```bash
# If using MongoDB locally
mongod
```

### 4. Run the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Backend status check |
| GET | `/api/health` | Server health status |

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Enable CORS
- **dotenv** - Environment variables

## 📝 File Descriptions

### `index.js`
Main server file that:
- Initializes Express app
- Loads environment variables
- Sets up middleware (CORS, JSON parser)
- Connects to MongoDB
- Starts the server on port 5000

### `config/db.js`
Handles MongoDB connection with error handling and logs connection status.

### `middleware/cors.js`
Configures CORS to allow frontend requests from `http://localhost:5173`.

### `middleware/errorHandler.js`
Catches and formats all API errors in a consistent way.

### `routes/index.js`
Contains API route definitions with try-catch error handling.

### `models/Book.js`
Defines the Book data structure with fields like title, author, price, rating, etc.

## 🔗 Frontend Connection

Frontend (Vite) runs on `http://localhost:5173` and connects to backend at `http://localhost:5000/api`.

CORS is configured to allow requests from the frontend.
