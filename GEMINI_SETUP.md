# Gemini AI Integration Setup Guide

## 🚀 Quick Start

Your chat widget now uses **Google Gemini AI** for intelligent, context-aware responses!

---

## 📋 Setup Instructions

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy your API key

### Step 2: Add API Key to Environment Variables

Create a `.env.local` file in the project root:

```bash
# MongoDB Connection (existing)
MONGODB_URI=mongodb://localhost:27017/project-foundation

# Gemini AI API Key (NEW - REQUIRED FOR AI CHAT)
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (existing - optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@thesamurai.com
```

**Important:** Replace `your_gemini_api_key_here` with your actual API key from Step 1.

### Step 3: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ How It Works

### With Gemini API Key (Automated AI)
- ✅ Natural language understanding
- ✅ Context-aware conversations
- ✅ Intelligent responses in English & Arabic
- ✅ Learns from conversation history
- ✅ Professional, company-specific answers

### Without Gemini API Key (Fallback Mode)
- ⚠️ Falls back to rule-based keyword matching
- ⚠️ Limited to predefined responses
- ⚠️ No context awareness
- ⚠️ Basic functionality only

**The system automatically uses fallback mode if:**
- No API key is configured
- API key is invalid
- Gemini API is unavailable
- Network errors occur

---

## 🧪 Testing

### Test the Chat Widget

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000/en
   ```

3. **Click the chat button** (bottom-right corner)

4. **Try these test messages:**
   - "Hello, what services do you offer?"
   - "I need help with cybersecurity"
   - "What are your pricing options?"
   - "مرحبا، ما هي خدماتكم؟" (Arabic)

### Expected Behavior

**With Gemini API:**
- Responses are natural and contextual
- Bot understands follow-up questions
- Answers are specific to The Samurai company

**Without Gemini API (Fallback):**
- Responses are generic and keyword-based
- Limited understanding
- Console shows: "Gemini failed, using fallback"

---

## 📊 Gemini API Pricing

### Free Tier (Recommended for Testing)
- **15 requests per minute**
- **1,500 requests per day**
- **Perfect for development and small-scale use**

### Paid Tier (For Production)
- **Gemini 1.5 Flash:** $0.00001875 per 1K characters (input)
- **Gemini 1.5 Flash:** $0.000075 per 1K characters (output)
- **Example:** 1,000 conversations ≈ $0.50 - $2.00

[View Full Pricing](https://ai.google.dev/pricing)

---

## 🔧 Configuration Options

### Model Selection

The default model is `gemini-1.5-flash` (fast, cost-effective).

To use a different model, edit `src/app/api/chat/route.ts`:

```typescript
// Line 78 - Change model
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro' // or 'gemini-1.5-flash'
});
```

**Available Models:**
- `gemini-1.5-flash` - Fast, cheap, good quality (RECOMMENDED)
- `gemini-1.5-pro` - Slower, more expensive, best quality

### Response Length

Adjust `maxOutputTokens` in `src/app/api/chat/route.ts`:

```typescript
// Line 115-118
generationConfig: {
  maxOutputTokens: 200, // Increase for longer responses
  temperature: 0.7,     // 0.0-1.0 (higher = more creative)
}
```

### System Prompt Customization

Edit the company information in `src/app/api/chat/route.ts` (lines 81-105):

```typescript
const systemPrompt = locale === 'ar'
  ? `أنت مساعد ذكي لشركة The Samurai...
     
     // Customize Arabic prompt here
     `
  : `You are an AI assistant for The Samurai...
  
     // Customize English prompt here
     `;
```

---

## 🐛 Troubleshooting

### Issue: Chat not responding

**Check:**
1. API key is correctly set in `.env.local`
2. Development server was restarted after adding API key
3. Browser console for errors (F12 → Console tab)
4. Network tab shows successful POST to `/api/chat`

**Solution:**
```bash
# Verify environment variable is loaded
# Add this temporarily to src/app/api/chat/route.ts (line 23)
console.log('Gemini API configured:', !!genAI);

# Restart server
npm run dev
```

### Issue: "API key not valid" error

**Solution:**
1. Verify API key is correct (no extra spaces)
2. Check API key is enabled in Google AI Studio
3. Ensure billing is enabled (for paid tier)

### Issue: Rate limit exceeded

**Solution:**
1. Free tier: Wait for rate limit to reset (1 minute)
2. Upgrade to paid tier for higher limits
3. Implement request throttling on frontend

### Issue: Responses in wrong language

**Solution:**
The system auto-detects language from `locale`. Verify:
```typescript
// ChatWidget.tsx uses locale correctly
locale: locale, // Should be 'en' or 'ar'
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already configured)
- Never commit API keys to Git
- Use environment variables for API keys
- Rotate API keys periodically
- Monitor API usage in Google AI Studio

### ❌ DON'T:
- Hardcode API keys in source code
- Share API keys publicly
- Commit `.env.local` to version control
- Use production keys in development

---

## 📈 Monitoring & Analytics

### View API Usage

1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Go to **"API Keys"** section
3. Click on your API key
4. View usage statistics

### Database Analytics

Chat messages are saved to MongoDB. View analytics:

```bash
# Get chat statistics
curl -X PATCH http://localhost:3000/api/chat
```

Response includes:
- Total messages
- Messages today
- Messages by language
- Unique sessions

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Gemini API key added to production environment variables
- [ ] API key has billing enabled (if using paid tier)
- [ ] Rate limiting configured
- [ ] Error logging setup (Sentry, etc.)
- [ ] MongoDB connection tested
- [ ] Chat widget tested in both languages
- [ ] Fallback mode tested (disable API key temporarily)
- [ ] Mobile responsiveness verified
- [ ] Performance monitoring enabled

---

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Gemini Pricing](https://ai.google.dev/pricing)
- [Best Practices](https://ai.google.dev/docs/best_practices)

---

## ✅ Implementation Summary

### Files Modified:
1. **`src/app/api/chat/route.ts`** - Added Gemini integration with fallback
2. **`src/components/chat/ChatWidget.tsx`** - Updated to call API endpoint
3. **`package.json`** - Added @google/generative-ai dependency

### Features Added:
- ✅ Gemini AI integration
- ✅ Automatic fallback to rule-based responses
- ✅ Conversation history tracking
- ✅ Session management
- ✅ Bilingual support (English/Arabic)
- ✅ Error handling
- ✅ Database logging

### No Breaking Changes:
- ✅ All existing functionality preserved
- ✅ Contact form unaffected
- ✅ Other components unchanged
- ✅ Tests still pass
- ✅ Works without API key (fallback mode)

---

**Last Updated:** 2025-10-14  
**Version:** 2.0.0  
**Gemini Model:** gemini-1.5-flash
