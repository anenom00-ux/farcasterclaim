#!/usr/bin/env node

/**
 * Script untuk update domain di farcaster.json
 * Usage: node update-domain.js YOUR_VERCEL_URL
 * 
 * Contoh: node update-domain.js my-game.vercel.app
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const domain = process.argv[2];

if (!domain) {
  console.error('❌ Error: Domain tidak boleh kosong!');
  console.log('\nUsage: node update-domain.js YOUR_VERCEL_URL');
  console.log('Contoh: node update-domain.js my-game.vercel.app');
  process.exit(1);
}

// Remove http/https if exists
const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

const farcasterJsonPath = join(__dirname, 'farcaster.json');

try {
  // Read current farcaster.json
  const content = fs.readFileSync(farcasterJsonPath, 'utf8');
  const config = JSON.parse(content);
  
  // Update URLs
  config.homeUrl = `https://${cleanDomain}`;
  config.iconUrl = `https://${cleanDomain}/icon.png`;
  config.splashImageUrl = `https://${cleanDomain}/splash.png`;
  config.webhookUrl = `https://${cleanDomain}/webhook`;
  
  // Write back
  fs.writeFileSync(farcasterJsonPath, JSON.stringify(config, null, 2));
  
  console.log('✅ Domain berhasil di-update!');
  console.log('\n📋 Konfigurasi baru:');
  console.log(`   Home URL: ${config.homeUrl}`);
  console.log(`   Icon URL: ${config.iconUrl}`);
  console.log(`   Splash URL: ${config.splashImageUrl}`);
  console.log(`   Webhook URL: ${config.webhookUrl}`);
  console.log('\n💡 Jangan lupa commit dan push ke GitHub!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

