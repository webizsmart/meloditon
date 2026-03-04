// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== WAVE CANVAS =====
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
let t = 0;
(function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  [
    { color: 'rgba(168,85,247,0.5)', amp: 55, freq: 0.008, yOff: 0.38 },
    { color: 'rgba(59,130,246,0.4)', amp: 45, freq: 0.010, yOff: 0.58 },
    { color: 'rgba(16,185,129,0.3)', amp: 35, freq: 0.012, yOff: 0.72 },
  ].forEach(w => {
    ctx.beginPath(); ctx.strokeStyle = w.color; ctx.lineWidth = 2;
    for (let x = 0; x <= canvas.width; x++) {
      const y = canvas.height * w.yOff + Math.sin(x * w.freq + t * 0.02) * w.amp;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  t++; requestAnimationFrame(drawWave);
})();

// ===== WAVEFORM BARS =====
const waveformEl = document.getElementById('waveformBars');
let bars = [];
if (waveformEl) {
  for (let i = 0; i < 18; i++) {
    const b = document.createElement('span');
    b.style.cssText = `animation-delay:${(i * 0.065).toFixed(2)}s;height:${Math.floor(Math.random() * 20 + 6)}px`;
    waveformEl.appendChild(b); bars.push(b);
  }
}

// ===== PLAY BUTTON =====
let playing = false;
const playBtn = document.getElementById('playBtn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    playing = !playing;
    playBtn.textContent = playing ? '⏸' : '▶';
    bars.forEach(b => b.style.animationPlayState = playing ? 'running' : 'paused');
  });
}

// ===== FEATURE DATA =====
const artistFeatures = [
  { icon: '🎤', title: '원클릭 NFT 발행', desc: 'MP3/WAV 업로드 후 곡명·설명 입력만으로 즉시 소장용 NFT 발행. 복잡한 블록체인 지식 불필요.', tag: 'Minting' },
  { icon: '🔒', title: '자동 저작권 검증', desc: '업로드 즉시 Audio Fingerprinting 기술로 중복·무단 업로드 자동 차단. 본인 창작물만 등록 가능.', tag: '저작권 보호', green: true },
  { icon: '🎟️', title: '팬 혜택 설정', desc: '공연 티켓 응모, 굿즈 할인권, 팬미팅 초대 등 소장 팬에게 줄 혜택을 아티스트가 직접 설정.', tag: 'Fan Rewards' },
  { icon: '📨', title: '채팅창 뮤직 카드', desc: '텔레그램 채팅방에 NFT를 공유하면 즉시 재생 가능한 인터랙티브 뮤직 카드로 표시.', tag: 'Social' },
  { icon: '⚡', title: '스마트 컨트랙트 정산', desc: '소장 시 아티스트 지갑으로 TON 코인 즉시 자동 입금. 플랫폼 수수료 2.5%만 공제.', tag: 'Payment' },
  { icon: '📊', title: '팬덤 대시보드', desc: '소장자 현황·혜택 지급 현황·채팅방 활성도를 아티스트가 실시간으로 확인 가능.', tag: 'Analytics' },
];
const fanFeatures = [
  { icon: '🎵', title: '30초 프리뷰 무료', desc: '소장 전 모든 트랙의 30초 프리뷰를 무료로 감상. 마음에 들면 NFT로 소장.', tag: '무료 청취' },
  { icon: '🎟️', title: '공연 티켓 응모권', desc: '음원 NFT 소장 시 해당 아티스트 공연 티켓 응모 기회 자동 부여. 소장 수량에 따라 확률 증가.', tag: 'Ticket' },
  { icon: '💿', title: '실물 굿즈 할인', desc: '소장 NFT의 아티스트 굿즈·음반 구매 시 최대 30% 할인 쿠폰 자동 발급.', tag: '할인 쿠폰' },
  { icon: '🔐', title: '홀더 전용 채팅방', desc: 'NFT 소장자만 입장 가능한 아티스트 전용 채팅방. 미공개 곡 미리 듣기·비하인드 독점 공유.', tag: 'Exclusive' },
  { icon: '📨', title: '뮤직 카드 공유', desc: '소장한 트랙을 텔레그램 채팅방에 뮤직 카드로 공유. 친구들이 30초 미리 들을 수 있어요.', tag: 'Social' },
  { icon: '💎', title: 'TON 지갑 연동', desc: '텔레그램 내장 지갑 클릭 한 번으로 연결. 소장 기록이 블록체인에 영구 저장되어 소유권 증명.', tag: 'Wallet' },
];

// ===== ROLE SWITCH =====
let currentRole = 'artist';
function switchRole(role) {
  currentRole = role;
  document.getElementById('tabArtist').classList.toggle('active', role === 'artist');
  document.getElementById('tabFan').classList.toggle('active', role === 'fan');
  buildFeatures(role === 'artist' ? artistFeatures : fanFeatures);
}
function buildFeatures(data) {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;
  grid.innerHTML = '';
  data.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.style.cssText = `opacity:0;transform:translateY(20px);transition:opacity 0.4s ${i * 0.07}s,transform 0.4s ${i * 0.07}s`;
    card.innerHTML = `
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <div class="feature-tag${f.green ? ' feature-tag-green' : ''}">${f.tag}</div>`;
    grid.appendChild(card);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity = '1'; card.style.transform = 'translateY(0)';
    }));
  });
}
buildFeatures(artistFeatures);

// ===== COLLECTION DATA =====
const tracks = [
  { name: 'Midnight Echo', artist: '@indie_luna', rewards: ['공연 티켓', '굿즈 할인'], price: '소장하기', grad: 'linear-gradient(135deg,#a855f7,#3b82f6)', emoji: '🌙' },
  { name: 'Solar Drift', artist: '@sunwave_kr', rewards: ['팬미팅 초대', '음반 할인'], price: '소장하기', grad: 'linear-gradient(135deg,#ec4899,#f97316)', emoji: '☀️' },
  { name: 'Neon Circuit', artist: '@digitalsoul', rewards: ['홀더 채팅방', '굿즈 교환'], price: '소장하기', grad: 'linear-gradient(135deg,#10b981,#06b6d4)', emoji: '⚡' },
  { name: 'Gravity Pull', artist: '@cosmo_beats', rewards: ['공연 티켓', '팬미팅'], price: '소장하기', grad: 'linear-gradient(135deg,#f59e0b,#ef4444)', emoji: '🌌' },
];
function buildCollection() {
  const grid = document.getElementById('collectionGrid');
  if (!grid) return;
  tracks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'coll-card';
    card.innerHTML = `
      <div class="coll-art" style="background:${t.grad}">
        <span>${t.emoji}</span>
        <div class="coll-play">▶</div>
      </div>
      <div class="coll-info">
        <div class="coll-name">${t.name}</div>
        <div class="coll-artist">${t.artist}</div>
        <div class="coll-rewards">${t.rewards.map(r => `<span class="coll-reward-tag">🎁 ${r}</span>`).join('')}</div>
        <div class="coll-footer">
          <span class="coll-price">🎵 소장</span>
          <button class="coll-btn" onclick="handleCollect('${t.name}')">소장하기</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}
buildCollection();

// ===== COLLECT TOAST =====
function handleCollect(name) {
  const toast = document.createElement('div');
  toast.textContent = `🎉 "${name}" 소장 완료! 혜택이 자동으로 지급됩니다.`;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%) translateY(20px)',
    background: 'linear-gradient(135deg,#10b981,#06b6d4)', color: '#fff',
    padding: '14px 28px', borderRadius: '12px', fontWeight: '600', fontSize: '0.9rem',
    boxShadow: '0 8px 32px rgba(16,185,129,0.4)', zIndex: '9999', opacity: '0',
    transition: 'all 0.4s', whiteSpace: 'nowrap',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// ===== EMAIL SIGNUP =====
function handleSignup() {
  const input = document.getElementById('emailInput');
  const msg = document.getElementById('signupMsg');
  if (!input || !msg) return;
  const val = input.value.trim();
  if (!val || !val.includes('@')) { msg.textContent = '⚠️ 올바른 이메일 주소를 입력해 주세요.'; msg.style.color = '#f97316'; return; }
  msg.textContent = '✅ 얼리 액세스 신청 완료! 베타 오픈 시 가장 먼저 알려드리겠습니다.';
  msg.style.color = '#06b6d4'; input.value = '';
  setTimeout(() => { msg.textContent = ''; }, 5000);
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.feature-card,.reward-card,.tech-card,.tl-item,.coll-card,.how-step,.flow-card');
new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 }).observe
  ? (() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => {
      if (!el.closest('#featuresGrid')) {
        el.style.opacity = '0'; el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        obs.observe(el);
      }
    });
  })() : null;
