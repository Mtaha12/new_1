# Gmail SMTP Setup Guide for The Samurai

## Overview
This guide will help you set up Gmail SMTP for sending emails from `shenia@thesamurai.com`.

## Current Configuration

### Email Account
- **Email:** shenia@thesamurai.com
- **Purpose:** Sending transactional emails (contact forms, gated assets, notifications)

### OAuth2 Credentials (Already Created)
- **Client ID:** 1021428560700-k7k1kjnh4ab08nbki6g2ki53fdgp7l6p.apps.googleusercontent.com
- **Client Secret:** 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
- **Created:** December 11, 2025
- **Status:** Enabled
- **Test User:** shenia@thesamurai.com

## Setup Steps

### Step 1: Generate Gmail App Password

Since you're using Google Workspace (thesamurai.com domain), you need to create an App Password:

1. **Sign in to Google Account**
   - Go to https://myaccount.google.com/
   - Sign in as `shenia@thesamurai.com`

2. **Enable 2-Step Verification** (Required)
   - Go to Security → 2-Step Verification
   - Follow the prompts to enable it
   - You'll need your phone for verification

3. **Create App Password**
   - Go to Security → 2-Step Verification → App passwords
   - Or direct link: https://myaccount.google.com/apppasswords
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Enter name: **The Samurai SMTP**
   - Click **Generate**

4. **Copy the 16-character password**
   - Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`)
   - **Copy this immediately** - you won't be able to see it again!
   - Remove spaces: `abcdefghijklmnop`

### Step 2: Update Environment Variables

Update your `.env.local` file:

```env
# SMTP Configuration (Gmail with App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=shenia@thesamurai.com
SMTP_PASSWORD=your-16-character-app-password
SMTP_FROM_EMAIL=shenia@thesamurai.com
SMTP_FROM_NAME="The Samurai"

# Google OAuth2 Credentials (for future use)
GOOGLE_CLIENT_ID=1021428560700-k7k1kjnh4ab08nbki6g2ki53fdgp7l6p.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Admin Emails
ADMIN_EMAILS=admin@thesamurai.com

# Site Configuration
BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="The Samurai"
```

Replace `your-16-character-app-password` with the actual password from Step 1.

### Step 3: Test Email Configuration

Run the SMTP verification script:

```bash
npm run verify-smtp
```

Or test manually by submitting a contact form on your website.

## Google Workspace Admin Settings

If you're using Google Workspace, ensure these settings are enabled:

1. **Go to Google Admin Console** (admin.google.com)
2. **Apps → Google Workspace → Gmail → User Settings**
3. **Enable IMAP/SMTP** for your domain
4. **Allow less secure apps:** OFF (use App Passwords instead)
5. **SMTP relay service:** Configure if needed for higher volume

## Email Types Supported

### 1. Contact Form Submissions
- **To:** Admin emails (ADMIN_EMAILS)
- **From:** shenia@thesamurai.com
- **Template:** Contact confirmation + admin notification

### 2. Gated Asset Downloads
- **To:** User's email + admin emails
- **From:** shenia@thesamurai.com
- **Template:** Download link + admin notification

### 3. Newsletter Subscriptions
- **To:** User's email
- **From:** shenia@thesamurai.com
- **Template:** Subscription confirmation

## Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
1. Verify you're using an App Password, not your regular password
2. Check if 2-Step Verification is enabled
3. Remove spaces from the App Password
4. Ensure SMTP_USER matches the Google account exactly

### Error: "SMTP_PASSWORD is not set"

**Solution:**
- Make sure you added `SMTP_PASSWORD=...` to `.env.local`
- Restart your dev server: `npm run dev`

### Error: "Application-specific password required"

**Solution:**
- You're trying to use a regular password
- Generate an App Password following Step 1 above

### Emails go to spam

**Solutions:**
1. **Set up SPF record** in DNS:
   ```
   v=spf1 include:_spf.google.com ~all
   ```

2. **Set up DKIM** (Google Workspace Admin):
   - Admin Console → Apps → Google Workspace → Gmail → Authenticate email
   - Generate new record
   - Add to DNS

3. **Set up DMARC** in DNS:
   ```
   v=DMARC1; p=quarantine; rua=mailto:admin@thesamurai.com
   ```

## Security Best Practices

### App Password Security
1. **Never commit** App Passwords to git
2. **Store securely** in password manager
3. **Rotate regularly** (every 90 days)
4. **Revoke unused** passwords from Google Account

### Environment Variables
1. **.env.local** is gitignored ✅
2. **env.example** has placeholders only ✅
3. **Production secrets** stored in hosting platform (Vercel, etc.)

### OAuth2 Client Secret
- **Never expose** in frontend code
- **Backend only** usage
- **Rotate if compromised**

## Testing Checklist

- [ ] App Password generated and saved
- [ ] `.env.local` updated with App Password
- [ ] Dev server restarted
- [ ] `npm run verify-smtp` passes
- [ ] Contact form sends email successfully
- [ ] Emails arrive in inbox (not spam)
- [ ] Admin notifications received
- [ ] Gated asset emails work

## Migration from Old SMTP

### Old Configuration (malokt12e@gmail.com)
```env
SMTP_USER=malokt12e@gmail.com
SMTP_PASSWORD=cejp ahyo rzdl ovpi  # Old app password
```

### New Configuration (shenia@thesamurai.com)
```env
SMTP_USER=shenia@thesamurai.com
SMTP_PASSWORD=your-new-app-password  # Generate new one
```

**Migration Steps:**
1. Generate App Password for shenia@thesamurai.com
2. Update `.env.local` with new credentials
3. Test thoroughly
4. Revoke old app password from malokt12e@gmail.com account (optional)

## Production Deployment

### Vercel Environment Variables

When deploying to Vercel:

1. **Go to Project Settings → Environment Variables**
2. **Add each variable:**
   - `SMTP_USER`: shenia@thesamurai.com
   - `SMTP_PASSWORD`: [your-app-password]
   - `SMTP_FROM_EMAIL`: shenia@thesamurai.com
   - `SMTP_FROM_NAME`: The Samurai
   - `GOOGLE_CLIENT_ID`: 1021428560700-k7k1kjnh4ab08nbki6g2ki53fdgp7l6p.apps.googleusercontent.com
   - `GOOGLE_CLIENT_SECRET`: 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
   - `ADMIN_EMAILS`: admin@thesamurai.com
   - `BASE_URL`: https://thesamurai.com
   - `NEXT_PUBLIC_SITE_NAME`: The Samurai

3. **Set scope:** Production, Preview, Development (as needed)
4. **Redeploy** after adding variables

## Gmail Sending Limits

### Google Workspace Limits
- **500 emails per day** per user (rolling 24 hours)
- **100 external recipients** per message
- **2000 recipients per day** total

### Recommendations
- Monitor daily email volume
- Implement rate limiting in code
- Consider email service (SendGrid, AWS SES) for high volume
- Use separate email for marketing vs transactional

## Advanced: OAuth2 Flow (Future)

The OAuth2 credentials you have can be used for more advanced features:

### Use Cases
- Send emails on behalf of users
- Read email replies
- Create drafts
- Manage labels

### Implementation (Future)
Would require:
1. OAuth2 refresh token
2. Token storage in database
3. Token refresh logic
4. Updated nodemailer config

Currently, we're using simpler App Password approach which is sufficient for sending transactional emails.

## Support Resources

- **Google Workspace Admin Help:** https://support.google.com/a/
- **Gmail SMTP Settings:** https://support.google.com/mail/answer/7126229
- **App Passwords Guide:** https://support.google.com/accounts/answer/185833
- **Nodemailer Docs:** https://nodemailer.com/smtp/

## Summary

✅ **Updated configurations:**
- `.env.local` - SMTP user changed to shenia@thesamurai.com
- `env.example` - Updated template with new email
- OAuth2 credentials added for future use

⚠️ **Action Required:**
1. Generate App Password for shenia@thesamurai.com
2. Update `SMTP_PASSWORD` in `.env.local`
3. Test email sending

📧 **Email Configuration:**
- From: shenia@thesamurai.com (The Samurai)
- To: Users + admin@thesamurai.com
- Method: Gmail SMTP with App Password
- Port: 587 (STARTTLS)

---

**Last Updated:** December 11, 2025
**Email Account:** shenia@thesamurai.com
**Status:** Configured (pending App Password)
