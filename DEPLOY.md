# Panduan Deploy Mini App ke Farcaster

Panduan lengkap untuk memasang game Crypto Coin Collector sebagai mini app di Farcaster.

## 📋 Langkah-langkah Deploy

### 1. Persiapan Domain & Hosting

Anda perlu memiliki:
- Domain dengan HTTPS (misalnya: `yourgame.com`)
- Server hosting (Vercel, Netlify, Railway, atau hosting lain)
- SSL certificate (HTTPS wajib)

### 2. Update File `farcaster.json`

Edit file `farcaster.json` dan ganti semua `your-domain.com` dengan domain Anda:

```json
{
  "version": "1.0.0",
  "name": "Crypto Coin Collector",
  "iconUrl": "https://your-domain.com/icon.png",
  "splashImageUrl": "https://your-domain.com/splash.png",
  "splashBackgroundColor": "#667eea",
  "homeUrl": "https://your-domain.com",
  "webhookUrl": "https://your-domain.com/webhook"
}
```

### 3. Buat Icon & Splash Image

Buat 2 gambar:
- **icon.png**: 512x512px (square icon untuk mini app)
- **splash.png**: Minimal 1200x630px (splash screen saat loading)

Letakkan di folder `public/` dan update URL di `farcaster.json`.

### 4. Deploy ke Hosting

#### Opsi A: Deploy ke Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Vercel akan memberikan URL seperti `your-app.vercel.app`

#### Opsi B: Deploy ke Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build & Deploy:
   ```bash
   netlify deploy --prod
   ```

#### Opsi C: Deploy ke Railway

1. Buat akun di [Railway](https://railway.app)
2. Connect repository GitHub Anda
3. Railway akan otomatis deploy

#### Opsi D: Server Sendiri

1. Upload semua file ke server
2. Install dependencies:
   ```bash
   npm install --production
   ```
3. Jalankan dengan PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "farcaster-game"
   ```

### 5. Update Domain di farcaster.json

Setelah deploy, update `farcaster.json` dengan domain production Anda:

```json
{
  "homeUrl": "https://your-actual-domain.com",
  "iconUrl": "https://your-actual-domain.com/icon.png",
  "splashImageUrl": "https://your-actual-domain.com/splash.png",
  "webhookUrl": "https://your-actual-domain.com/webhook"
}
```

Pastikan file `farcaster.json` dapat diakses di:
`https://your-domain.com/farcaster.json`

### 6. Sign Manifest dengan Farcaster

Anda perlu menandatangani `farcaster.json` dengan kunci Farcaster Anda.

#### Menggunakan Farcaster Auth Kit

1. Install dependencies:
   ```bash
   npm install @farcaster/auth-kit
   ```

2. Buat script untuk sign:
   ```javascript
   // sign-manifest.js
   import { signManifest } from '@farcaster/auth-kit';
   import fs from 'fs';
   
   const manifest = JSON.parse(fs.readFileSync('farcaster.json', 'utf8'));
   const signed = await signManifest(manifest, {
     // Farcaster credentials Anda
   });
   
   fs.writeFileSync('farcaster.json', JSON.stringify(signed, null, 2));
   ```

Atau gunakan tools online seperti [Farcaster Auth](https://docs.farcaster.xyz/) untuk sign manifest.

### 7. Register Mini App di Farcaster

1. **Aktifkan Developer Mode:**
   - Buka [Warpcast Settings](https://warpcast.com/~/settings/developer-tools)
   - Aktifkan "Developer Mode"

2. **Daftarkan Mini App:**
   - Buka [Farcaster Developer Portal](https://warpcast.com/~/developers)
   - Klik "Create Mini App"
   - Masukkan URL manifest: `https://your-domain.com/farcaster.json`
   - Verifikasi bahwa manifest dapat diakses dan sudah ditandatangani

3. **Test Mini App:**
   - Setelah terdaftar, coba buka mini app dari Warpcast
   - Game seharusnya muncul dan bisa dimainkan

### 8. Testing

1. **Test di Browser:**
   - Buka `https://your-domain.com`
   - Pastikan game berfungsi dengan baik

2. **Test di Farcaster:**
   - Buka mini app dari Warpcast
   - Test semua fitur:
     - Game play
     - Leaderboard
     - Share score
     - Farcaster SDK integration

## 🔧 Troubleshooting

### Manifest tidak bisa diakses
- Pastikan server mengserve file `farcaster.json` dengan content-type `application/json`
- Pastikan URL menggunakan HTTPS
- Cek CORS settings jika diperlukan

### SDK tidak bekerja
- Pastikan app dibuka dari dalam Farcaster/Warpcast
- Check browser console untuk error
- Pastikan `@farcaster/miniapp-sdk` sudah terinstall

### Game tidak muncul
- Pastikan `sdk.actions.ready()` dipanggil
- Check bahwa semua file static di-serve dengan benar
- Pastikan tidak ada CORS issues

## 📝 Checklist Deploy

- [ ] Domain dengan HTTPS sudah siap
- [ ] File `farcaster.json` sudah diupdate dengan domain production
- [ ] Icon dan splash image sudah dibuat dan di-upload
- [ ] Aplikasi sudah di-deploy ke hosting
- [ ] Manifest dapat diakses di `https://your-domain.com/farcaster.json`
- [ ] Manifest sudah ditandatangani
- [ ] Developer Mode sudah diaktifkan di Farcaster
- [ ] Mini App sudah terdaftar di Farcaster
- [ ] Game sudah ditest di browser dan di Farcaster

## 🎉 Selamat!

Setelah semua langkah selesai, game Anda sudah bisa diakses sebagai mini app di Farcaster!

## 📚 Referensi

- [Farcaster Mini Apps Documentation](https://miniapps.farcaster.xyz/docs/getting-started)
- [Farcaster SDK Reference](https://docs.farcaster.xyz/)
- [Warpcast Developer Portal](https://warpcast.com/~/developers)

