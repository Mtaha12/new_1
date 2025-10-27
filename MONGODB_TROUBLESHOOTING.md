# MongoDB & API Endpoints Troubleshooting Guide

## 🔧 Step-by-Step Fix

### Step 1: Create Environment File

Create a file named `.env.local` in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/project-phoenix
```

**Location:** `c:\Users\HP\Desktop\internship\project-foundation\.env.local`

---

### Step 2: Install & Start MongoDB

#### Option A: MongoDB Community Edition (Local)

**Download & Install:**
1. Go to: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Install with default settings
4. MongoDB Compass will also be installed (GUI tool)

**Start MongoDB:**
```bash
# Open Command Prompt as Administrator
mongod

# Or if installed as service, it should auto-start
# Check if running:
mongosh
```

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a cluster (free tier)
4. Get connection string
5. Update `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/project-phoenix?retryWrites=true&w=majority
```

---

### Step 3: Verify MongoDB Connection

**Test with MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see connection successful

**Test with mongosh:**
```bash
mongosh
use project-phoenix
db.test.insertOne({test: "connection"})
db.test.find()
```

---

### Step 4: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

---

### Step 5: Test Endpoints

#### Test Contact API
```bash
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"phone\":\"+1234567890\",\"subject\":\"general\",\"message\":\"Test message\",\"locale\":\"en\"}"
```

#### Test Chat API
```bash
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Hello\",\"locale\":\"en\",\"conversationHistory\":[]}"
```

---

## ⚠️ Common Errors & Solutions

### Error 1: "Cannot connect to MongoDB"

**Symptoms:**
```
❌ MongoDB connection error: MongoServerSelectionError
```

**Solutions:**
1. **Check if MongoDB is running:**
   ```bash
   # Windows - Check service
   services.msc
   # Look for "MongoDB Server"
   ```

2. **Start MongoDB manually:**
   ```bash
   mongod --dbpath C:\data\db
   ```

3. **Check firewall:** Allow MongoDB port 27017

4. **Use MongoDB Atlas** instead of local

---

### Error 2: "ECONNREFUSED 127.0.0.1:27017"

**Solution:**
```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB with explicit path
mongod --dbpath C:\data\db
```

---

### Error 3: "Model already exists"

**Symptoms:**
```
OverwriteModelError: Cannot overwrite `Contact` model
```

**Solution:** Already handled in code with:
```typescript
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
```

If still occurs, restart dev server.

---

### Error 4: "404 Not Found" on API endpoints

**Check:**
1. URL is correct: `http://localhost:3000/api/contact`
2. Server is running: `npm run dev`
3. No TypeScript errors in terminal

**Fix:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

---

### Error 5: "500 Internal Server Error"

**Check server logs in terminal for specific error**

Common causes:
- MongoDB not connected
- Missing environment variables
- Schema validation errors

---

## 🧪 Complete Test Script

Save as `test-all-endpoints.ps1` (PowerShell):

```powershell
Write-Host "Testing MongoDB Connection..." -ForegroundColor Yellow

# Test Contact Form POST
Write-Host "`n1. Testing Contact Form POST..." -ForegroundColor Cyan
$contactBody = @{
    name = "John Doe"
    email = "john@example.com"
    phone = "+1234567890"
    subject = "general"
    message = "This is a test message"
    locale = "en"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method Post -Body $contactBody -ContentType "application/json"
    Write-Host "✅ Contact POST Success:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Contact POST Failed:" -ForegroundColor Red
    $_.Exception.Message
}

# Test Contact Form GET
Write-Host "`n2. Testing Contact Form GET..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/contact" -Method Get
    Write-Host "✅ Contact GET Success:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Contact GET Failed:" -ForegroundColor Red
    $_.Exception.Message
}

# Test Chat POST
Write-Host "`n3. Testing Chat POST..." -ForegroundColor Cyan
$chatBody = @{
    message = "Hello, I need help"
    locale = "en"
    conversationHistory = @()
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method Post -Body $chatBody -ContentType "application/json"
    Write-Host "✅ Chat POST Success:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Chat POST Failed:" -ForegroundColor Red
    $_.Exception.Message
}

# Test Chat Analytics
Write-Host "`n4. Testing Chat Analytics..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method Patch
    Write-Host "✅ Chat Analytics Success:" -ForegroundColor Green
    $response | ConvertTo-Json
} catch {
    Write-Host "❌ Chat Analytics Failed:" -ForegroundColor Red
    $_.Exception.Message
}

Write-Host "`n✅ All tests completed!" -ForegroundColor Green
```

Run with: `powershell .\test-all-endpoints.ps1`

---

## 📊 Verify Data in MongoDB

### Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database: `project-phoenix`
4. View collections: `contacts` and `chatmessages`

### Using mongosh (CLI)
```bash
mongosh
use project-phoenix
db.contacts.find().pretty()
db.chatmessages.find().pretty()
```

---

## 🔍 Debug Checklist

- [ ] `.env.local` file exists with MONGODB_URI
- [ ] MongoDB is running (check Task Manager or services)
- [ ] Development server is running (`npm run dev`)
- [ ] No errors in terminal
- [ ] Port 3000 is not blocked
- [ ] Port 27017 is not blocked (MongoDB)
- [ ] Can connect to MongoDB with Compass
- [ ] API routes exist in `src/app/api/`

---

## 📝 Quick Commands Reference

```bash
# Check if MongoDB is running
mongosh

# Start MongoDB
mongod

# Check Node/npm version
node -v
npm -v

# Restart dev server
npm run dev

# Clear Next.js cache
rm -rf .next

# Test endpoint
curl http://localhost:3000/api/contact

# View MongoDB logs
# Check terminal where mongod is running
```

---

## 🆘 Still Having Issues?

### Check Server Logs
Look at your terminal where `npm run dev` is running for error messages.

### Common Log Messages

**Success:**
```
✅ MongoDB connected for contact form
✅ MongoDB connected for chat
```

**Error:**
```
❌ MongoDB connection error: ...
```

### Enable Debug Mode
Add to `.env.local`:
```env
DEBUG=*
NODE_ENV=development
```

---

## ✅ Expected Working State

When everything works:

1. **Terminal shows:**
   ```
   ▲ Next.js 15.5.4
   - Local:        http://localhost:3000
   ✅ MongoDB connected for contact form
   ```

2. **POST to /api/contact returns:**
   ```json
   {
     "success": true,
     "message": "Contact form submitted successfully",
     "contactId": "..."
   }
   ```

3. **POST to /api/chat returns:**
   ```json
   {
     "success": true,
     "response": "Hi there! How can I assist you today?",
     "sessionId": "..."
   }
   ```

4. **MongoDB shows data:**
   - Database: `project-phoenix`
   - Collections: `contacts`, `chatmessages`
   - Documents visible in Compass

---

**Need more help? Check the terminal logs and share the specific error message!**
