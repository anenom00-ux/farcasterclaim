# Farcaster Mini App - Coin Collector Game

Mini app game yang terintegrasi dengan Farcaster. Aplikasi ini dapat berjalan di dalam klien Farcaster seperti Warpcast.

## 🎮 Game: Coin Collector

Game clicker sederhana dimana Anda harus mengklik koin sebanyak mungkin sebelum waktu habis! 

### Fitur Game:
- 🪙 Klik koin untuk mendapatkan poin
- ⏱️ Waktu 30 detik per round
- 🏆 Sistem high score yang tersimpan
- 📤 Share score ke Farcaster
- ✨ Efek partikel yang menarik
- 🎯 Koin muncul secara acak

## 🚀 Fitur Aplikasi

- ✅ Integrasi dengan Farcaster SDK
- ✅ Game interaktif yang menyenangkan
- ✅ Share score ke Farcaster feed
- ✅ UI yang modern dan responsif
- ✅ LocalStorage untuk menyimpan high score

## 📋 Prasyarat

- Node.js versi 18 atau lebih baru
- npm atau pnpm
- Akun Farcaster
- Domain untuk hosting aplikasi (untuk production)

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Update file `farcaster.json`:**
   - Ganti `your-domain.com` dengan domain Anda
   - Tambahkan URL untuk icon dan splash image
   - Pastikan semua URL menggunakan HTTPS

3. **Jalankan aplikasi secara lokal:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`

4. **Untuk testing lokal, gunakan ngrok atau tunnel serupa:**
   ```bash
   # Install ngrok
   npm install -g ngrok
   
   # Jalankan tunnel
   ngrok http 3000
   ```
   Gunakan URL ngrok untuk mengupdate `farcaster.json`

## 📝 Mendaftarkan Mini App di Farcaster

**📖 Untuk panduan lengkap, lihat [DEPLOY.md](./DEPLOY.md)**

### Quick Start:

1. **Aktifkan Developer Mode:**
   - Buka [Farcaster Settings](https://warpcast.com/~/settings/developer-tools)
   - Aktifkan "Developer Mode"

2. **Update `farcaster.json`:**
   - Ganti `your-domain.com` dengan domain production Anda
   - Tambahkan icon dan splash image

3. **Deploy ke Hosting:**
   - Deploy ke Vercel, Netlify, atau hosting lain
   - Pastikan HTTPS aktif

4. **Sign & Register:**
   - Sign manifest `farcaster.json` dengan Farcaster credentials
   - Daftarkan di [Farcaster Developer Portal](https://warpcast.com/~/developers)
   - URL manifest: `https://your-domain.com/farcaster.json`

**Lihat [DEPLOY.md](./DEPLOY.md) untuk instruksi detail!**

## 🔧 Konfigurasi

### File `farcaster.json`

File ini berisi metadata tentang mini app Anda:

```json
{
  "version": "1.0.0",
  "name": "My Farcaster Mini App",
  "iconUrl": "https://your-domain.com/icon.png",
  "splashImageUrl": "https://your-domain.com/splash.png",
  "splashBackgroundColor": "#000000",
  "homeUrl": "https://your-domain.com",
  "webhookUrl": "https://your-domain.com/webhook"
}
```

### Menambahkan Fitur Lain

Anda dapat menggunakan berbagai action dari SDK:

```javascript
import { sdk } from '@farcaster/miniapp-sdk';

// Membuka profil user
await sdk.actions.openProfile({ fid: 1234 });

// Membuka cast
await sdk.actions.openCast({ hash: '0x...' });

// Mengirim cast
await sdk.actions.openCastComposer({ text: 'Hello!' });
```

## 🎮 Cara Bermain

1. Klik tombol "Start Game" untuk memulai
2. Klik koin yang muncul di layar untuk mendapatkan 10 poin
3. Koin akan hilang setelah 5 detik jika tidak diklik
4. Kumpulkan poin sebanyak mungkin dalam 30 detik
5. Setelah game over, Anda bisa share score ke Farcaster!

## 📚 Dokumentasi

- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/docs/getting-started)
- [Farcaster SDK Reference](https://docs.farcaster.xyz/)

## 🐛 Troubleshooting

**App tidak muncul:**
- Pastikan `sdk.actions.ready()` dipanggil setelah app siap
- Pastikan manifest `farcaster.json` dapat diakses
- Pastikan semua URL menggunakan HTTPS

**User info tidak muncul:**
- User info hanya tersedia saat app dibuka dari dalam Farcaster
- Pastikan app dibuka dari klien Farcaster yang support mini apps

## 📄 License

MIT

