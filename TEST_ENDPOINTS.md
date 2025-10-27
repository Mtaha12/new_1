# API Endpoints Testing Guide

##  Working Endpoints

### 1. Test MongoDB Connection
```bash
curl http://localhost:3000/api/connection
```
**Expected:** 200 - Shows database info and collections

### 2. Seed Database (POST only)
```bash
curl -X POST http://localhost:3000/api/seed
```
**Expected:** 201 - Seeds homepage, about, services content

### 3. Get All Content
```bash
curl http://localhost:3000/api/content
```
**Expected:** 200 - Returns all content items

### 4. Get Content by Slug
```bash
curl http://localhost:3000/api/content/homepage
curl http://localhost:3000/api/content/about
curl http://localhost:3000/api/content/services
```
**Expected:** 200 - Returns specific content item

### 5. Submit Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"+1234567890\",\"subject\":\"Test\",\"message\":\"Test message\"}"
```
**Expected:** 201 - Contact form submitted

### 6. Get All Contacts
```bash
curl http://localhost:3000/api/contact
```
**Expected:** 200 - Returns all contact submissions

### 7. Send Chat Message
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello\",\"locale\":\"en\"}"
```
**Expected:** 200 - Returns AI response

### 8. Get Chat History (requires sessionId from previous chat)
```bash
curl "http://localhost:3000/api/chat?sessionId=YOUR_SESSION_ID"
```
**Expected:** 200 - Returns chat history

## 🔧 Fixed Issues

1.  **Duplicate schema index** - Removed duplicate slug index from Content model
2.  **API routes excluded from i18n middleware** - API routes work at `/api/*` not `/en/api/*`
3.  **Root layout fixed** - Properly passes through to locale-specific layout

## 📝 Notes

- `/api/seed` is **POST only** (405 on GET is expected)
- `/api/chat` GET requires `sessionId` parameter (400 without it is expected)
- After seeding, `/api/content/about-us` should return 404 because seed creates `about`, `homepage`, `services` (not `about-us`)

## 🚀 Quick Test All Endpoints

Run these commands in order:

```bash
# 1. Test connection
curl http://localhost:3000/api/connection

# 2. Seed database
curl -X POST http://localhost:3000/api/seed

# 3. Get all content
curl http://localhost:3000/api/content

# 4. Get specific content
curl http://localhost:3000/api/content/about

# 5. Submit contact
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"+1234567890\",\"subject\":\"Inquiry\",\"message\":\"Hello\"}"

# 6. Get contacts
curl http://localhost:3000/api/contact

# 7. Send chat message
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Hello\",\"locale\":\"en\"}"
```

All endpoints should return 200/201 status codes!
