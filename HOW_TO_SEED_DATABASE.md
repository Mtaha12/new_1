# 🌱 How to Seed the Database

## Complete Guide to Populate MongoDB with Dummy Data

This guide will help you seed your MongoDB database with comprehensive dummy data for all endpoints.

---

## 📋 What Gets Seeded

The seed script will populate your database with:

### 1. **Content Items (8 items)**
- `homepage` - Homepage content (EN/AR)
- `about` - About page (EN/AR)
- `services` - Services overview (EN/AR)
- `cybersecurity` - Cybersecurity service (EN/AR)
- `web-development` - Web development service (EN/AR)
- `cloud-infrastructure` - Cloud infrastructure service (EN/AR)
- `faq-security` - Security FAQ (EN/AR)
- `faq-pricing` - Pricing FAQ (EN/AR)

### 2. **Contact Submissions (5 items)**
- Mix of English and Arabic submissions
- Different statuses: new, read, replied
- Realistic contact information

### 3. **Chat Messages (5 items)**
- Multiple conversation sessions
- English and Arabic messages
- Sample Q&A interactions

---

## 🚀 Method 1: Run Seed Script Directly

### Step 1: Make sure your dev server is NOT running
Stop the dev server if it's running (Ctrl+C in terminal)

### Step 2: Run the seed script
```bash
npx tsx scripts/seed-data.ts
```

### Expected Output:
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB successfully

🗑️  Clearing existing data...
✅ Existing data cleared

📝 Inserting Content data...
✅ Inserted 8 content items

📧 Inserting Contact data...
✅ Inserted 5 contact submissions

💬 Inserting Chat Message data...
✅ Inserted 5 chat messages

📊 Database Seeding Summary:
═══════════════════════════════════════

📄 Content Items:
   - page: 3 items
   - service: 3 items
   - faq: 2 items

   Sample slugs:
   • homepage (page)
   • about (page)
   • services (page)
   • cybersecurity (service)
   • web-development (service)

📧 Contact Submissions:
   - new: 3 contacts
   - read: 1 contacts
   - replied: 1 contacts

💬 Chat Messages:
   - Total messages: 5
   - Unique sessions: 4

═══════════════════════════════════════
🎉 Database seeding completed successfully!

🔗 Test your endpoints:
   GET  http://localhost:3000/api/content
   GET  http://localhost:3000/api/content/homepage
   GET  http://localhost:3000/api/contact
   GET  http://localhost:3000/api/chat?sessionId=session-001
   GET  http://localhost:3000/api/connection

🔌 Disconnected from MongoDB
```

---

## 🌐 Method 2: Use API Endpoint (Simpler)

### Step 1: Start your dev server
```bash
npm run dev
```

### Step 2: Call the seed API endpoint
```bash
curl -X POST http://localhost:3000/api/seed
```

**Note:** This method only seeds content items, not contacts and chat messages. Use Method 1 for complete seeding.

---

## ✅ Verify the Data

### 1. Test Connection
```bash
curl http://localhost:3000/api/connection
```

Expected: Shows database info with collections

### 2. Get All Content
```bash
curl http://localhost:3000/api/content
```

Expected: Returns 8 content items

### 3. Get Specific Content
```bash
curl http://localhost:3000/api/content/homepage
curl http://localhost:3000/api/content/about
curl http://localhost:3000/api/content/cybersecurity
```

Expected: Returns specific content with EN/AR translations

### 4. Get All Contacts
```bash
curl http://localhost:3000/api/contact
```

Expected: Returns 5 contact submissions

### 5. Get Chat History
```bash
curl "http://localhost:3000/api/chat?sessionId=session-001"
```

Expected: Returns 2 messages from session-001

---

## 🔄 Re-seed the Database

If you want to reset and re-seed:

```bash
# Stop dev server (Ctrl+C)
# Run seed script again
npx tsx scripts/seed-data.ts
```

This will:
1. Clear all existing data
2. Insert fresh dummy data
3. Show summary of what was inserted

---

## 🧪 Test All Endpoints After Seeding

### Content Endpoints
```bash
# Get all content
curl http://localhost:3000/api/content

# Get by slug
curl http://localhost:3000/api/content/homepage
curl http://localhost:3000/api/content/about
curl http://localhost:3000/api/content/services
curl http://localhost:3000/api/content/cybersecurity
curl http://localhost:3000/api/content/web-development
curl http://localhost:3000/api/content/cloud-infrastructure
curl http://localhost:3000/api/content/faq-security
curl http://localhost:3000/api/content/faq-pricing
```

### Contact Endpoints
```bash
# Get all contacts
curl http://localhost:3000/api/contact

# Get with pagination
curl "http://localhost:3000/api/contact?page=1&limit=10"

# Get by status
curl "http://localhost:3000/api/contact?status=new"
```

### Chat Endpoints
```bash
# Get chat history for session-001
curl "http://localhost:3000/api/chat?sessionId=session-001"

# Get chat history for session-002
curl "http://localhost:3000/api/chat?sessionId=session-002"

# Send new chat message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","locale":"en"}'
```

### Connection Test
```bash
curl http://localhost:3000/api/connection
```

---

## 📊 Database Collections After Seeding

Your MongoDB will have these collections:

| Collection | Documents | Description |
|------------|-----------|-------------|
| `contents` | 8 | Multilingual content (pages, services, FAQs) |
| `contacts` | 5 | Contact form submissions |
| `chatmessages` | 5 | Chat conversation history |

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'tsx'"
```bash
npm install -g tsx
# OR
npx tsx scripts/seed-data.ts
```

### Error: "Connection failed"
- Make sure MongoDB URI is correct in `scripts/seed-data.ts`
- Check if you have internet connection (for MongoDB Atlas)
- Verify MongoDB credentials

### Error: "Duplicate key error"
- This means data already exists
- The script clears data first, so this shouldn't happen
- If it does, manually delete collections and try again

### No output or hanging
- Check if dev server is running (stop it first)
- Check MongoDB connection
- Look for firewall issues

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Stop dev server if running (Ctrl+C)

# 2. Run seed script
npx tsx scripts/seed-data.ts

# 3. Start dev server
npm run dev

# 4. Test endpoints
curl http://localhost:3000/api/content
curl http://localhost:3000/api/contact
curl "http://localhost:3000/api/chat?sessionId=session-001"
```

---

## ✅ Success Indicators

You'll know seeding was successful when:

1. ✅ Script shows "Database seeding completed successfully!"
2. ✅ Summary shows correct counts (8 content, 5 contacts, 5 chats)
3. ✅ API endpoints return data (not empty arrays)
4. ✅ Content has both EN and AR translations
5. ✅ No error messages in console

---

## 🎉 You're Done!

Your database is now populated with comprehensive dummy data. All endpoints should return data when queried.

**Next Steps:**
- Test the frontend pages at `http://localhost:3000/en` and `http://localhost:3000/ar`
- Try the contact form
- Test the chat widget
- Explore the API endpoints

Happy coding! 🚀
