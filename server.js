import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// Route untuk serve farcaster.json manifest
app.get('/farcaster.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(join(__dirname, 'farcaster.json'));
});

// Route utama
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Mini App Farcaster berjalan di http://localhost:${PORT}`);
  console.log(`📱 Gunakan URL ini untuk mendaftarkan mini app di Farcaster`);
});

