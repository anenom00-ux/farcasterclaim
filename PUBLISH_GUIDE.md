# 📱 Panduan Publish Farcaster Mini App

Panduan lengkap untuk mempublish aplikasi Crypto Coin Collector ke Farcaster Mini Apps.

## 📋 Prasyarat

1. ✅ Akun GitHub (sudah ada: `anenom00-ux`)
2. ✅ Repositori GitHub (sudah ada: `farcasterclaim`)
3. ✅ Akun Farcaster (untuk developer mode)
4. ⏳ Akun Vercel (atau hosting lain)
5. ⏳ Domain/URL deployment

## 🚀 Langkah 1: Deploy ke Vercel

### Opsi A: Via Vercel Dashboard (Recommended)

1. **Buka [Vercel](https://vercel.com)** dan login
2. **Klik "Add New..." → "Project"**
3. **Import Git Repository:**
   - Pilih repository: `anenom00-ux/farcasterclaim`
   - Klik **"Import"**

4. **Konfigurasi Project:**
   - **Framework Preset:** Pilih **"Other"**
   - **Root Directory:** `.` (kosong)
   - **Build Command:** Kosongkan
   - **Output Directory:** Kosongkan
   - **Install Command:** `npm install`
   - **Node.js Version:** Pilih **20.x**

5. **Klik "Deploy"**
6. **Tunggu 1-2 menit** hingga deploy selesai
7. **Copy URL Vercel** (contoh: `farcasterclaim.vercel.app`)

### Opsi B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /Users/x17zc/Documents/GitHub/CoinClaim
vercel

# Production deploy
vercel --prod
```

## 🖼️ Langkah 2: Buat Icon & Splash Image

Sebelum register di Farcaster, buat 2 gambar:

### Icon (512x512px)
- **Nama file:** `icon.png`
- **Ukuran:** 512x512 pixels (square)
- **Format:** PNG dengan transparansi
- **Tools:** Canva, Figma, atau design tool favorit Anda
- **Tema:** Crypto coin atau game icon

### Splash Image (1200x630px)
- **Nama file:** `splash.png`
- **Ukuran:** 1200x630 pixels (recommended)
- **Format:** PNG atau JPG
- **Tools:** Canva, Figma, atau design tool
- **Tema:** Splash screen untuk game Crypto Coin Collector

### Upload ke GitHub

1. Buat gambar icon dan splash
2. Simpan di folder `public/`
3. Commit dan push:
   ```bash
   git add public/icon.png public/splash.png
   git commit -m "Add icon and splash images"
   git push
   ```

**Atau** upload langsung via GitHub web interface:
- Buka folder `public/` di GitHub
- Klik "Add file" → "Upload files"
- Upload `icon.png` dan `splash.png`

## 🔧 Langkah 3: Update farcaster.json dengan Domain

Setelah deploy ke Vercel, update file `farcaster.json` dengan URL Vercel Anda:

### Cara 1: Manual Edit

1. Buka file `farcaster.json` di GitHub
2. Klik icon pensil (Edit)
3. Ganti semua `your-domain.com` dengan URL Vercel Anda:
   ```json
   {
     "version": "1.0.0",
     "name": "Crypto Coin Collector",
     "iconUrl": "https://farcasterclaim.vercel.app/icon.png",
     "splashImageUrl": "https://farcasterclaim.vercel.app/splash.png",
     "splashBackgroundColor": "#667eea",
     "homeUrl": "https://farcasterclaim.vercel.app",
     "webhookUrl": "https://farcasterclaim.vercel.app/webhook"
   }
   ```
4. Klik **"Commit changes"**

### Cara 2: Menggunakan Script

```bash
cd /Users/x17zc/Documents/GitHub/CoinClaim
node update-domain.js farcasterclaim.vercel.app
git add farcaster.json
git commit -m "Update domain to Vercel URL"
git push
```

## ✅ Langkah 4: Verifikasi Manifest

Setelah update domain, verifikasi bahwa manifest dapat diakses:

1. **Buka di browser:**
   - `https://your-app.vercel.app/farcaster.json`
   - `https://your-app.vercel.app/.well-known/farcaster.json`

2. **Pastikan:**
   - ✅ File dapat diakses (status 200)
   - ✅ Content-Type: `application/json`
   - ✅ JSON valid dan tidak ada error
   - ✅ Semua URL menggunakan HTTPS

## 🔐 Langkah 5: Enable Developer Mode di Farcaster

1. **Login ke Farcaster/Warpcast**
2. **Buka Settings:**
   - Desktop: https://warpcast.com/~/settings/developer-tools
   - Mobile: Settings → Developer Tools
3. **Toggle "Developer Mode"** ON
4. **Developer section** akan muncul di sidebar

## 📝 Langkah 6: Register Mini App di Farcaster

### Via Developer Portal

1. **Buka [Farcaster Developer Portal](https://warpcast.com/~/developers)**
   - Atau: Settings → Developer Tools → Create Mini App

2. **Klik "Create Mini App"** atau **"Add Mini App"**

3. **Masukkan URL Manifest:**
   ```
   https://your-app.vercel.app/.well-known/farcaster.json
   ```
   Atau:
   ```
   https://your-app.vercel.app/farcaster.json
   ```

4. **Verifikasi:**
   - Farcaster akan fetch dan validate manifest
   - Pastikan semua field valid
   - Icon dan splash image harus bisa diakses

5. **Submit dan tunggu approval**

### Via Farcaster Client (Warpcast)

1. **Buka Warpcast**
2. **Enable Developer Mode** (jika belum)
3. **Buka Developer Tools** dari menu
4. **Pilih "Mini Apps"**
5. **Klik "Add Mini App"**
6. **Masukkan URL manifest**

## 🧪 Langkah 7: Test Mini App

Setelah terdaftar:

1. **Buka Mini App dari Farcaster:**
   - Carilah app "Crypto Coin Collector" di daftar mini apps
   - Atau buka langsung dari developer portal

2. **Test Fitur:**
   - ✅ App muncul dengan splash screen
   - ✅ Game dapat dimainkan
   - ✅ Leaderboard berfungsi
   - ✅ Share score bekerja
   - ✅ SDK integration bekerja

3. **Check Console:**
   - Buka developer tools
   - Pastikan tidak ada error
   - Check bahwa `sdk.actions.ready()` dipanggil

## 🎯 Langkah 8: Make App Shareable (Optional)

Agar app bisa di-share di feeds:

1. **Update manifest** dengan informasi tambahan jika diperlukan
2. **Test sharing** dari dalam app
3. **Verify** bahwa cast dengan mini app link berfungsi

## 📚 Referensi

- [Farcaster Mini Apps Docs](https://miniapps.farcaster.xyz/docs/getting-started)
- [Farcaster Publishing Guide](https://miniapps.farcaster.xyz/docs/guides/publishing)
- [Farcaster Developer Portal](https://warpcast.com/~/developers)

## 🐛 Troubleshooting

### Manifest tidak bisa diakses
- ✅ Pastikan Vercel deployment berhasil
- ✅ Check URL di browser (harus HTTPS)
- ✅ Verify file `farcaster.json` ada di root
- ✅ Check server.js serve manifest dengan benar

### Icon/Splash tidak muncul
- ✅ Pastikan file ada di folder `public/`
- ✅ Verify URL di manifest benar
- ✅ Check file bisa diakses langsung di browser
- ✅ Pastikan format file PNG/JPG valid

### App tidak muncul di Farcaster
- ✅ Pastikan Developer Mode aktif
- ✅ Verify manifest valid dan dapat diakses
- ✅ Check semua URL menggunakan HTTPS
- ✅ Pastikan `sdk.actions.ready()` dipanggil

### App stuck di loading screen
- ✅ Pastikan `sdk.actions.ready()` dipanggil setelah app loaded
- ✅ Check browser console untuk error
- ✅ Verify SDK sudah terinstall: `@farcaster/miniapp-sdk`

## ✅ Checklist Publish

- [ ] Akun Vercel sudah dibuat
- [ ] App sudah di-deploy ke Vercel
- [ ] URL Vercel sudah didapat
- [ ] Icon dan splash image sudah dibuat
- [ ] Icon dan splash sudah di-upload ke GitHub
- [ ] `farcaster.json` sudah di-update dengan URL Vercel
- [ ] Manifest dapat diakses di `/.well-known/farcaster.json`
- [ ] Developer Mode sudah diaktifkan
- [ ] Mini App sudah terdaftar di Farcaster
- [ ] App sudah ditest dan berfungsi dengan baik

## 🎉 Selamat!

Setelah semua checklist selesai, aplikasi Anda sudah live sebagai Farcaster Mini App!

