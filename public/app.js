import { sdk } from '@farcaster/miniapp-sdk';

// Tampilkan status
function showStatus(message, isError = false) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status ${isError ? 'error' : ''}`;
  statusEl.style.display = 'block';
  
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, 5000);
}

// Tampilkan/sembunyikan loading
function setLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}

// Inisialisasi SDK
async function initApp() {
  try {
    // Tunggu sampai SDK siap
    await sdk.actions.ready();
    console.log('✅ Mini App siap!');
    
    // Coba dapatkan context user jika tersedia
    try {
      const context = await sdk.context;
      if (context && context.user) {
        displayUserInfo(context.user);
      }
    } catch (err) {
      console.log('User context belum tersedia:', err);
    }
  } catch (error) {
    console.error('Error initializing app:', error);
    showStatus('Error menginisialisasi aplikasi: ' + error.message, true);
  }
}

// Tampilkan info user
function displayUserInfo(user) {
  document.getElementById('userInfo').style.display = 'block';
  document.getElementById('username').textContent = user.username || '-';
  document.getElementById('fid').textContent = user.fid || '-';
  document.getElementById('displayName').textContent = user.displayName || '-';
}

// Handle button click untuk mendapatkan user info
document.getElementById('getUserInfoBtn').addEventListener('click', async () => {
  setLoading(true);
  try {
    const context = await sdk.context;
    if (context && context.user) {
      displayUserInfo(context.user);
      showStatus('✅ Info user berhasil dimuat!');
    } else {
      showStatus('⚠️ User info belum tersedia', true);
    }
  } catch (error) {
    console.error('Error getting user info:', error);
    showStatus('Error: ' + error.message, true);
  } finally {
    setLoading(false);
  }
});

// Handle button click untuk membuka cast
document.getElementById('openCastBtn').addEventListener('click', async () => {
  try {
    // Contoh: buka cast dengan hash tertentu
    // Anda bisa mengganti hash ini dengan cast yang ingin dibuka
    const castHash = '0x1234567890abcdef'; // Ganti dengan hash cast yang valid
    
    await sdk.actions.openCast({
      hash: castHash
    });
    
    showStatus('✅ Membuka cast...');
  } catch (error) {
    console.error('Error opening cast:', error);
    showStatus('Error: ' + error.message, true);
  }
});

// Inisialisasi aplikasi saat halaman dimuat
initApp();

