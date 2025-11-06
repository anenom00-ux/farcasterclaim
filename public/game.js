// Import Farcaster Mini App SDK
import { sdk } from '@farcaster/miniapp-sdk';

// Leaderboard functions
function getLeaderboard() {
  try {
    const stored = localStorage.getItem('leaderboard');
    if (stored) {
      const leaderboard = JSON.parse(stored);
      // Migrate old entries without name field
      const migrated = leaderboard.map(entry => {
        if (!entry.name) {
          entry.name = 'Anonymous';
        }
        return entry;
      });
      if (JSON.stringify(leaderboard) !== JSON.stringify(migrated)) {
        saveLeaderboard(migrated);
      }
      return migrated;
    }
  } catch (error) {
    console.error('Error loading leaderboard:', error);
  }
  // Default: empty leaderboard
  return [];
}

function saveLeaderboard(leaderboard) {
  try {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  } catch (error) {
    console.error('Error saving leaderboard:', error);
  }
}

// Get Farcaster user info
async function getFarcasterUser() {
  try {
    if (sdk && sdk.context) {
      const context = await sdk.context;
      if (context && context.user) {
        return {
          username: context.user.username || 'Anonymous',
          displayName: context.user.displayName || context.user.username || 'Anonymous',
          fid: context.user.fid || null
        };
      }
    }
  } catch (error) {
    console.log('Error getting Farcaster user:', error);
  }
  // Fallback: use localStorage or default
  const storedName = localStorage.getItem('playerName');
  return {
    username: storedName || 'Guest',
    displayName: storedName || 'Guest',
    fid: null
  };
}

async function addScoreToLeaderboard(score) {
  let leaderboard = getLeaderboard();
  
  // Get Farcaster user name
  const userInfo = await getFarcasterUser();
  const playerName = userInfo.displayName || userInfo.username || 'Guest';
  
  // Save name to localStorage for fallback
  if (playerName !== 'Guest' && playerName !== 'Anonymous') {
    localStorage.setItem('playerName', playerName);
  }
  
  // Add new score with timestamp and name
  leaderboard.push({
    score: score,
    name: playerName,
    username: userInfo.username || null,
    fid: userInfo.fid || null,
    date: new Date().toISOString(),
    timestamp: Date.now()
  });
  
  // Sort by score (descending)
  leaderboard.sort((a, b) => b.score - a.score);
  
  // Keep only top 10
  leaderboard = leaderboard.slice(0, 10);
  
  // Save back to localStorage
  saveLeaderboard(leaderboard);
  
  return leaderboard;
}

function getHighScore() {
  const leaderboard = getLeaderboard();
  return leaderboard.length > 0 ? leaderboard[0].score : 0;
}

// Game state
let gameState = {
  score: 0,
  timeLeft: 30,
  isPlaying: false,
  isPaused: false,
  coins: [],
  gameInterval: null,
  timerInterval: null,
  highScore: getHighScore()
};

// Load top 15 coins from CoinGecko API
async function loadCoinGeckoCoins() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false');
    const coins = await response.json();
    
    if (coins && coins.length > 0) {
      // Update cryptoCoins array with CoinGecko image URLs
      cryptoCoins.length = 0;
      cryptoEmojis.length = 0;
      
      coins.forEach((coin, index) => {
        cryptoCoins.push(coin.image);
        // Use coin symbol or emoji as fallback
        const emoji = getCoinEmoji(coin.symbol);
        cryptoEmojis.push(emoji);
      });
      
      console.log('✅ Loaded', cryptoCoins.length, 'coins from CoinGecko');
    }
  } catch (error) {
    console.warn('⚠️ Could not load coins from CoinGecko API, using default list:', error);
  }
}

// Get emoji for coin symbol
function getCoinEmoji(symbol) {
  const emojiMap = {
    'btc': '₿', 'eth': 'Ξ', 'bnb': '🟡', 'sol': '◎', 'usdt': '💵',
    'usdc': '💵', 'xrp': '💫', 'ada': '₳', 'doge': 'Ð', 'avax': '🟠',
    'matic': '⬡', 'link': '🔗', 'ltc': 'Ł', 'shib': '⭐', 'dot': '⚫'
  };
  return emojiMap[symbol.toLowerCase()] || '🪙';
}

// Initialize SDK
async function initApp() {
  try {
    // Load coins from CoinGecko first
    await loadCoinGeckoCoins();
    
    // Call ready() after app is fully loaded - IMPORTANT for Farcaster Mini Apps
    // This hides the splash screen and displays your content
    try {
      await sdk.actions.ready();
      console.log('✅ Mini App siap!');
    } catch (sdkError) {
      console.log('⚠️ Farcaster SDK not available (running outside Farcaster):', sdkError);
      // Game tetap bisa dimainkan meskipun SDK tidak tersedia
    }
    
    updateHighScore();
    console.log('✅ Game initialized');
  } catch (error) {
    console.error('Error initializing app:', error);
    // Game tetap bisa dimainkan meskipun SDK error
    updateHighScore();
  }
}

// Update high score display
function updateHighScore() {
  const highScoreEl = document.getElementById('highScore');
  if (highScoreEl) {
    gameState.highScore = getHighScore();
    highScoreEl.textContent = gameState.highScore;
  }
  updateLeaderboard();
}

// Update leaderboard display
function updateLeaderboard() {
  const leaderboard = getLeaderboard();
  const leaderboardContainer = document.getElementById('leaderboardList');
  
  if (!leaderboardContainer) return;
  
  if (leaderboard.length === 0) {
    leaderboardContainer.innerHTML = '<div class="leaderboard-empty">Belum ada score. Mainkan game untuk mulai!</div>';
    return;
  }
  
  let html = '';
  leaderboard.forEach((entry, index) => {
    const rank = index + 1;
    const date = new Date(entry.date);
    const dateStr = date.toLocaleDateString('id-ID', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
    
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
    const playerName = entry.name || entry.username || 'Anonymous';
    
    html += `
      <div class="leaderboard-item ${rank <= 3 ? 'top-three' : ''}">
        <div class="leaderboard-rank">${medal}</div>
        <div class="leaderboard-name">${playerName}</div>
        <div class="leaderboard-score">${entry.score.toLocaleString()}</div>
        <div class="leaderboard-date">${dateStr}</div>
      </div>
    `;
  });
  
  leaderboardContainer.innerHTML = html;
}

// Start game
function startGame() {
  console.log('startGame called, isPlaying:', gameState.isPlaying);
  
  if (gameState.isPlaying) {
    console.log('Game already playing, returning');
    return;
  }
  
  // Clear any existing intervals
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }
  if (gameState.gameInterval) {
    clearInterval(gameState.gameInterval);
  }
  
  // Remove any existing coins
  gameState.coins.forEach(coin => {
    if (coin.parentNode) {
      coin.remove();
    }
  });
  
  gameState.isPlaying = true;
  gameState.isPaused = false;
  gameState.score = 0;
  gameState.timeLeft = 30;
  gameState.coins = [];
  
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const gameOver = document.getElementById('gameOver');
  const highScoreMessage = document.getElementById('highScoreMessage');
  
  if (startBtn) startBtn.disabled = true;
  if (pauseBtn) {
    pauseBtn.disabled = false;
    pauseBtn.textContent = '⏸️ Pause';
  }
  if (gameOver) gameOver.classList.remove('show');
  if (highScoreMessage) highScoreMessage.style.display = 'none';
  
  updateScore();
  updateTimer();
  
  console.log('Starting game timer and coin spawner');
  
  // Start timer
  gameState.timerInterval = setInterval(() => {
    if (!gameState.isPaused && gameState.isPlaying) {
      gameState.timeLeft--;
      updateTimer();
      
      if (gameState.timeLeft <= 0) {
        endGame();
      }
    }
  }, 1000);
  
  // Start spawning coins
  spawnCoin();
  gameState.gameInterval = setInterval(() => {
    if (!gameState.isPaused && gameState.isPlaying) {
      spawnCoin();
    }
  }, 1500);
  
  console.log('Game started successfully');
}

// Pause/Resume game
function pauseGame() {
  if (!gameState.isPlaying) return;
  
  gameState.isPaused = !gameState.isPaused;
  const pauseBtn = document.getElementById('pauseBtn');
  if (pauseBtn) {
    pauseBtn.textContent = gameState.isPaused ? '▶️ Resume' : '⏸️ Pause';
  }
}

// List of crypto coin images from CoinGecko - Top 15 by market cap
// CoinGecko image format: https://assets.coingecko.com/coins/images/{id}/large/{coin-name}.png
const cryptoCoins = [
  // 1. Bitcoin (BTC)
  'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  // 2. Ethereum (ETH)
  'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  // 3. Tether (USDT)
  'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  // 4. BNB
  'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  // 5. Solana (SOL)
  'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  // 6. USDC
  'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  // 7. XRP
  'https://assets.coingecko.com/coins/images/52/large/xrp-symbol-white-128.png',
  // 8. Dogecoin (DOGE)
  'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  // 9. Cardano (ADA)
  'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  // 10. TRON (TRX)
  'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png',
  // 11. Avalanche (AVAX)
  'https://assets.coingecko.com/coins/images/12559/large/avalanche-avax-logo.png',
  // 12. Shiba Inu (SHIB)
  'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
  // 13. Polygon (MATIC)
  'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
  // 14. Chainlink (LINK)
  'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
  // 15. Litecoin (LTC)
  'https://assets.coingecko.com/coins/images/2/large/litecoin.png'
];

// Fallback: menggunakan emoji jika gambar tidak bisa dimuat
const cryptoEmojis = [
  '₿',  // Bitcoin
  'Ξ',  // Ethereum
  '💵', // Tether
  '🟡', // BNB
  '◎',  // Solana
  '💵', // USDC
  '💫', // XRP
  'Ð',  // Dogecoin
  '₳',  // Cardano
  '🔴', // TRON
  '🟠', // Avalanche
  '🐕', // Shiba Inu
  '⬡',  // Polygon
  '🔗', // Chainlink
  'Ł'   // Litecoin
];

// Spawn a coin
function spawnCoin() {
  if (!gameState.isPlaying || gameState.isPaused) return;
  
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return;
  
  const coin = document.createElement('div');
  coin.className = 'coin';
  
  // Pilih crypto coin secara random
  const randomIndex = Math.floor(Math.random() * cryptoCoins.length);
  const coinImage = cryptoCoins[randomIndex];
  const coinEmoji = cryptoEmojis[randomIndex];
  
  // Buat elemen img
  const img = document.createElement('img');
  img.src = coinImage;
  img.alt = 'Crypto Coin';
  img.onerror = function() {
    // Jika gambar gagal dimuat, gunakan emoji
    this.style.display = 'none';
    coin.style.fontSize = '40px';
    coin.textContent = coinEmoji;
    coin.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
  };
  
  coin.appendChild(img);
  
  // Random position (coin size is 60px)
  const coinSize = 60;
  const maxX = Math.max(0, gameArea.offsetWidth - coinSize);
  const maxY = Math.max(0, gameArea.offsetHeight - coinSize);
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);
  
  coin.style.left = x + 'px';
  coin.style.top = y + 'px';
  
  // Click handler
  coin.addEventListener('click', () => collectCoin(coin));
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (coin.parentNode) {
      coin.remove();
      const index = gameState.coins.indexOf(coin);
      if (index > -1) {
        gameState.coins.splice(index, 1);
      }
    }
  }, 5000);
  
  gameArea.appendChild(coin);
  gameState.coins.push(coin);
}

// Collect coin
function collectCoin(coin) {
  if (!gameState.isPlaying || gameState.isPaused) return;
  
  coin.classList.add('collected');
  gameState.score += 10;
  updateScore();
  
  // Create particles
  createParticles(coin);
  
  // Remove coin
  setTimeout(() => {
    if (coin.parentNode) {
      coin.remove();
      const index = gameState.coins.indexOf(coin);
      if (index > -1) {
        gameState.coins.splice(index, 1);
      }
    }
  }, 300);
  
  // Spawn new coin immediately
  spawnCoin();
}

// Create particle effects
function createParticles(coin) {
  const rect = coin.getBoundingClientRect();
  const gameArea = document.getElementById('gameArea');
  if (!gameArea) return;
  
  const gameAreaRect = gameArea.getBoundingClientRect();
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Gunakan warna emas untuk particles
    particle.style.background = '#FFD700';
    particle.style.boxShadow = '0 0 10px #FFD700';
    
    const x = rect.left - gameAreaRect.left + rect.width / 2;
    const y = rect.top - gameAreaRect.top + rect.height / 2;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const angle = (Math.PI * 2 * i) / 8;
    const distance = 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    gameArea.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 1000);
  }
}

// Update score display
function updateScore() {
  const scoreEl = document.getElementById('score');
  if (scoreEl) {
    scoreEl.textContent = gameState.score;
  }
}

// Update timer display
function updateTimer() {
  const timeEl = document.getElementById('time');
  const timerFill = document.getElementById('timerFill');
  
  if (timeEl) {
    timeEl.textContent = gameState.timeLeft;
  }
  
  if (timerFill) {
    const percentage = (gameState.timeLeft / 30) * 100;
    timerFill.style.width = percentage + '%';
  }
}

// End game
function endGame() {
  gameState.isPlaying = false;
  gameState.isPaused = false;
  
  if (gameState.gameInterval) {
    clearInterval(gameState.gameInterval);
    gameState.gameInterval = null;
  }
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
  
  // Remove all coins
  gameState.coins.forEach(coin => {
    if (coin.parentNode) {
      coin.remove();
    }
  });
  gameState.coins = [];
  
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const gameOver = document.getElementById('gameOver');
  const finalScore = document.getElementById('finalScore');
  const highScoreMessage = document.getElementById('highScoreMessage');
  
  if (startBtn) startBtn.disabled = false;
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = '⏸️ Pause';
  }
  
  // Add score to leaderboard with Farcaster user name
  const previousHighScore = gameState.highScore;
  
  // Add score to leaderboard (will get Farcaster user name automatically)
  addScoreToLeaderboard(gameState.score).then(() => {
    const newHighScore = getHighScore();
    
    // Check if this is a new high score
    if (gameState.score >= newHighScore && gameState.score > previousHighScore) {
      gameState.highScore = newHighScore;
      updateHighScore();
      if (highScoreMessage) {
        highScoreMessage.style.display = 'block';
      }
    } else {
      // Update high score display even if not a new record
      gameState.highScore = newHighScore;
      updateHighScore();
    }
  }).catch(error => {
    console.error('Error adding score to leaderboard:', error);
    // Still update high score display
    const newHighScore = getHighScore();
    gameState.highScore = newHighScore;
    updateHighScore();
  });
  
  // Show game over screen
  if (finalScore) {
    finalScore.textContent = gameState.score;
  }
  if (gameOver) {
    gameOver.classList.add('show');
  }
}

// Share score to Farcaster
async function shareScore() {
  try {
    const scoreText = `🎮 I scored ${gameState.score} points in Coin Collector! Can you beat my score? 🪙`;
    
    if (sdk && sdk.actions && sdk.actions.openCastComposer) {
      // Open cast composer with score
      await sdk.actions.openCastComposer({
        text: scoreText
      });
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(scoreText);
        alert('Score copied to clipboard! Paste it in Farcaster to share.');
      } catch (clipboardError) {
        // Fallback: show text to copy
        prompt('Copy this text to share:', scoreText);
      }
    }
  } catch (error) {
    console.error('Error sharing score:', error);
    // Fallback: show text to copy
    const scoreText = `🎮 I scored ${gameState.score} points in Coin Collector! Can you beat my score? 🪙`;
    prompt('Copy this text to share:', scoreText);
  }
}

// Make functions globally available
window.startGame = startGame;
window.pauseGame = pauseGame;
window.shareScore = shareScore;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
