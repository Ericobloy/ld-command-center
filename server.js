require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy Anthropic API calls
app.post('/api', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'API request failed' });
  }
});

// Google OAuth callback — receives token fragment from popup, closes it
app.get('/oauth/google/callback', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>Google Auth</title></head><body>
<script>
  // Token is in the URL hash — the opener polls location.href for access_token
  // This page just needs to exist at the redirect URI so the hash is readable
  if (window.opener) {
    setTimeout(() => window.close(), 3000);
  }
</script>
<p style="font-family:sans-serif;text-align:center;padding:40px;color:#333;font-size:1rem;">
  ✅ Google authorized successfully.<br>
  <span style="font-size:.85rem;color:#666;">Calendar · Gmail · Drive access granted.<br>This window will close automatically.</span>
</p>
</body></html>`);
});

// Serve the app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Lion's Den Command Center running on port ${PORT}`));
