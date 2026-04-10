# 🎯 Quick Command Reference

## 📦 Installation & Setup

```bash
# Navigate to server folder
cd server

# Install all dependencies (run this first!)
npm install

# Create .env file from template
cp .env.example .env
```

## 🚀 Running the Server

```bash
# Development mode (auto-reload on file changes)
npm run dev

# Production mode (single startup)
npm start
```

## 🗄️ MongoDB Setup

```bash
# Install MongoDB locally (macOS)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Stop MongoDB service
brew services stop mongodb-community

# Check if MongoDB is running
brew services list
```

## 🧪 Testing API Endpoints

```bash
# Test root endpoint
curl http://localhost:5001/api/

# Test health check
curl http://localhost:5001/api/health

# Pretty print JSON response
curl http://localhost:5000/api/ | jq

# Make POST request
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Title","author":"Author Name"}'
```

## 🛠️ Troubleshooting

```bash
# Reinstall dependencies (fixes missing packages)
rm -rf node_modules package-lock.json
npm install

# Check if port 5000 is in use
lsof -i :5000

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Check MongoDB connection
mongosh

# View npm packages installed
npm list

# Check for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

## 📝 Environment Variables

Edit `.env` file to change:

```
MONGODB_URI=mongodb://localhost:27017/bookpulse
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## 🔗 Server URLs

| Endpoint | URL | Purpose |
|----------|-----|---------|
| Root | `http://localhost:5000/api/` | Check if server is running |
| Health | `http://localhost:5000/api/health` | Server status |
| Local API | `http://localhost:5000/api` | Base for all API calls |

## 📚 Useful npm Commands

```bash
# See all available scripts
npm run

# Check outdated packages
npm outdated

# Update packages
npm update

# Check for issues
npm audit

# Clear npm cache
npm cache clean --force
```

---

**Bookmark this page for quick reference!** 🔖
