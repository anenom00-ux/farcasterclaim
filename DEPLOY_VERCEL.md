# 🚀 Panduan Deploy ke Vercel - Step by Step

Panduan lengkap dan mudah untuk deploy game ke Vercel.

## 📋 Persiapan

1. **Pastikan Anda sudah memiliki:**
   - Akun GitHub (gratis) - [buat di sini](https://github.com)
   - Akun Vercel (gratis) - [buat di sini](https://vercel.com)

## 🎯 Cara 1: Deploy via GitHub (Paling Mudah)

### Step 1: Upload ke GitHub

1. **Buat repository baru di GitHub:**
   - Buka [github.com](https://github.com)
   - Klik tombol **"+"** di pojok kanan atas → **"New repository"**
   - Isi nama repository (misalnya: `farcaster-coin-collector`)
   - Pilih **"Public"**
   - Jangan centang "Initialize with README"
   - Klik **"Create repository"**

2. **Upload file ke GitHub:**
   
   **Opsi A: Via GitHub Desktop (Paling Mudah)**
   - Download [GitHub Desktop](https://desktop.github.com)
   - Install dan login
   - Klik **"File" → "Add Local Repository"**
   - Pilih folder `bot gtau`
   - Klik **"Publish repository"**
   
   **Opsi B: Via Command Line**
   ```bash
   cd "/Users/x17zc/Documents/bot gtau"
   
   # Inisialisasi git (jika belum)
   git init
   
   # Tambahkan semua file
   git add .
   
   # Commit
   git commit -m "Initial commit: Crypto Coin Collector game"
   
   # Tambahkan remote GitHub (ganti YOUR_USERNAME dan REPO_NAME)
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   
   # Push ke GitHub
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy ke Vercel

1. **Login ke Vercel:**
   - Buka [vercel.com](https://vercel.com)
   - Klik **"Sign Up"** atau **"Log In"**
   - Pilih **"Continue with GitHub"** untuk login pakai GitHub

2. **Import Project:**
   - Setelah login, klik **"Add New..." → "Project"**
   - Pilih repository yang baru saja Anda buat
   - Klik **"Import"**

3. **Konfigurasi Project:**
   - **Framework Preset:** Pilih **"Other"** atau biarkan auto-detect
   - **Root Directory:** Biarkan kosong (atau `.`)
   - **Build Command:** Kosongkan (tidak perlu build)
   - **Output Directory:** Kosongkan
   - **Install Command:** `npm install`
   - **Node.js Version:** Pilih **18.x** atau **20.x**

4. **Environment Variables (Optional):**
   - Biarkan kosong untuk sekarang
   - Klik **"Deploy"**

5. **Tunggu Deploy:**
   - Vercel akan otomatis deploy
   - Tunggu 1-2 menit
   - Setelah selesai, akan muncul URL seperti: `your-app.vercel.app`

### Step 3: Update Domain di farcaster.json

1. **Copy URL Vercel Anda** (misalnya: `crypto-coin-collector.vercel.app`)

2. **Edit file `farcaster.json` di GitHub:**
   - Buka repository di GitHub
   - Klik file `farcaster.json`
   - Klik icon pensil (Edit)
   - Update dengan URL Vercel Anda:
   ```json
   {
     "version": "1.0.0",
     "name": "Crypto Coin Collector",
     "iconUrl": "https://your-app.vercel.app/icon.png",
     "splashImageUrl": "https://your-app.vercel.app/splash.png",
     "splashBackgroundColor": "#667eea",
     "homeUrl": "https://your-app.vercel.app",
     "webhookUrl": "https://your-app.vercel.app/webhook"
   }
   ```
   - Klik **"Commit changes"**

3. **Vercel akan otomatis redeploy** dengan perubahan baru

## 🎯 Cara 2: Deploy via Vercel CLI (Untuk Advanced Users)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login ke Vercel

```bash
vercel login
```

Akan terbuka browser untuk login.

### Step 3: Deploy

```bash
cd "/Users/x17zc/Documents/bot gtau"
vercel
```

Ikuti pertanyaan:
- **Set up and deploy?** → Yes
- **Which scope?** → Pilih akun Anda
- **Link to existing project?** → No
- **Project name?** → Tekan Enter (default)
- **Directory?** → Tekan Enter (./)
- **Override settings?** → No

### Step 4: Production Deploy

```bash
vercel --prod
```

Setelah deploy, Vercel akan memberikan URL seperti: `your-app.vercel.app`

## 📝 Update Domain di farcaster.json

Setelah deploy, update `farcaster.json` dengan URL Vercel Anda.

### Via GitHub (Recommended):

1. Edit file di GitHub
2. Commit perubahan
3. Vercel otomatis redeploy

### Via Command Line:

```bash
# Edit file farcaster.json
# Ganti your-domain.com dengan URL Vercel Anda

# Commit dan push
git add farcaster.json
git commit -m "Update domain to Vercel URL"
git push
```

## 🖼️ Buat Icon & Splash Image

Sebelum register di Farcaster, Anda perlu:

1. **Buat icon.png (512x512px):**
   - Bisa pakai Canva, Figma, atau design tool
   - Simpan sebagai `icon.png`
   - Upload ke folder `public/` di GitHub

2. **Buat splash.png (1200x630px):**
   - Design splash screen untuk game
   - Simpan sebagai `splash.png`
   - Upload ke folder `public/` di GitHub

3. **Update farcaster.json:**
   ```json
   {
     "iconUrl": "https://your-app.vercel.app/icon.png",
     "splashImageUrl": "https://your-app.vercel.app/splash.png"
   }
   ```

## ✅ Checklist

- [ ] Akun GitHub sudah dibuat
- [ ] Akun Vercel sudah dibuat
- [ ] Code sudah di-upload ke GitHub
- [ ] Project sudah di-deploy ke Vercel
- [ ] URL Vercel sudah didapat (misalnya: `your-app.vercel.app`)
- [ ] File `farcaster.json` sudah di-update dengan URL Vercel
- [ ] Icon dan splash image sudah dibuat dan di-upload
- [ ] Semua file bisa diakses via HTTPS (Vercel otomatis pakai HTTPS)

## 🐛 Troubleshooting

### Deploy gagal?

1. **Check logs di Vercel:**
   - Buka project di Vercel dashboard
   - Klik tab "Deployments"
   - Klik deployment yang gagal
   - Lihat error di logs

2. **Pastikan package.json benar:**
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

3. **Pastikan file `vercel.json` ada** di root folder

### URL tidak bisa diakses?

1. Tunggu 1-2 menit setelah deploy
2. Cek apakah deployment status "Ready"
3. Coba akses URL di browser private/incognito

### File farcaster.json tidak bisa diakses?

1. Pastikan file ada di root folder
2. Cek di Vercel → Settings → Functions
3. Pastikan `vercel.json` sudah benar

## 🎉 Selesai!

Setelah semua langkah selesai, URL Anda akan seperti:
- `https://your-app.vercel.app` (home)
- `https://your-app.vercel.app/farcaster.json` (manifest)

Lanjut ke langkah berikutnya: Sign manifest dan register di Farcaster (lihat DEPLOY.md)

## 📞 Butuh Bantuan?

Jika masih bingung, coba:
1. Baca dokumentasi Vercel: https://vercel.com/docs
2. Tonton video tutorial Vercel di YouTube
3. Tanya di komunitas Farcaster

