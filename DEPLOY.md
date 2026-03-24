# Lion's Den Command Center — Deploy Guide
**Version 2.1 — Social Hub: Calendar + Gmail + Drive + Instagram + Facebook + LinkedIn**

---

## What's Included
- 9 AI agents (Leonidas, Cleopatra, Athena, Talibah, Clarity, Saga, Marcella, Luigi, Massimo)
- Admin panel with user management and activity log
- **Social Hub** — Google Calendar, Gmail, Google Drive, Instagram, Facebook/Meta, LinkedIn

---

## Step 1 — Extract & Push to GitHub

```bash
# From inside the extracted folder:
git init
git add .
git commit -m "Lion's Den Command Center v2.1 — Gmail + Drive"
git branch -M main
git remote add origin https://github.com/Ericobloy/ld-command-center.git
git push -u origin main
```

Already have the repo pushed before? Just:
```bash
git add .
git commit -m "Add Gmail + Drive to Social Hub"
git push
```

---

## Step 2 — Deploy on Railway

1. Go to **railway.app** → New Project → Deploy from GitHub Repo
2. Select `ld-command-center`
3. Add Environment Variable: `ANTHROPIC_API_KEY` = your key
4. Click Deploy — Railway gives you a public URL like:
   `https://ld-command-center-production.up.railway.app`

---

## Step 3 — Google OAuth Setup (Calendar + Gmail + Drive)

One OAuth Client ID unlocks all three Google integrations.

1. Go to **console.cloud.google.com**
2. Create or select a project
3. Enable these 3 APIs:
   - Google Calendar API
   - Gmail API
   - Google Drive API
4. Go to **Credentials** → Create OAuth Client ID → Web Application
5. Add Authorized JavaScript Origins:
   `https://YOUR-RAILWAY-URL.up.railway.app`
6. Add Authorized Redirect URIs:
   `https://YOUR-RAILWAY-URL.up.railway.app/oauth/google/callback`
7. Copy the **Client ID**
8. In the app → Social Hub → any Google tab → Connect Google → paste Client ID
9. Approve all permissions — Calendar, Gmail, and Drive all connect at once

---

## Step 4 — Instagram / Facebook / LinkedIn

All three use AI drafting + copy/paste publishing:

- **Instagram**: Draft caption → Copy → Post from Instagram app or Meta Business Suite
- **Facebook**: Draft post → Copy → Publish via business.facebook.com (@LionsDenAdvisors)
- **LinkedIn**: Draft post → Copy → Publish at linkedin.com (Eric Obloy or Company Page)

---

## Admin Login
Username: `admin` | Password: `LionsDen2024!`

## Local Test
```bash
npm install
ANTHROPIC_API_KEY=sk-... node server.js
# Open http://localhost:8080
```
