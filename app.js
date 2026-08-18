// =========================================================
//  StoryTalk – App Prototype JavaScript
// =========================================================

// ===== Navigation State =====
let history = [];
let currentScreen = 'screen-splash';

function goTo(screenId) {
  const current = document.getElementById(currentScreen);
  const next = document.getElementById(screenId);
  if (!next) return;

  history.push(currentScreen);
  current.classList.remove('active');
  next.classList.add('active');
  currentScreen = screenId;

  // Scroll top on new screen
  const body = next.querySelector('.screen-body');
  if (body) body.scrollTop = 0;

  // Screen-specific init
  if (screenId === 'screen-roleplay') initRoleplay();
}

function goBack() {
  if (history.length === 0) return;
  const prev = history.pop();
  const current = document.getElementById(currentScreen);
  const prevScreen = document.getElementById(prev);
  if (!prevScreen) return;

  current.classList.remove('active');
  prevScreen.classList.add('active');
  currentScreen = prev;
}

// ===== Toggle Switch =====
function toggleSwitch(el) {
  el.classList.toggle('on');
}

// ===== Age Stepper =====
let currentAge = 8;
function stepAge(delta) {
  currentAge = Math.max(3, Math.min(15, currentAge + delta));
  document.getElementById('age-val').textContent = currentAge;
}

// ===== Participant Toggle =====
function toggleParticipant(card, role) {
  if (role === 'hero') return; // Hero is always selected
  card.classList.toggle('selected');
  const check = card.querySelector('.pc-check');
  if (card.classList.contains('selected')) {
    check.textContent = '✓';
  } else {
    check.textContent = '';
  }
}

// ===== Theme Selection =====
function selectTheme(card, themeId) {
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

// ===== Custom theme generate =====
function generateFromCustom() {
  const input = document.getElementById('custom-theme-input');
  if (!input.value.trim()) {
    input.focus();
    return;
  }
  // Simulate generating
  const btn = input.nextElementSibling;
  btn.textContent = '생성 중...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '생성됨 ✓';
    btn.style.color = 'var(--secondary)';
    btn.style.borderColor = 'var(--secondary)';
    setTimeout(() => {
      btn.textContent = 'AI 생성';
      btn.disabled = false;
      btn.style.color = '';
      btn.style.borderColor = '';
    }, 2000);
  }, 1200);
}

// ===== Story Refresh =====
function refreshStory() {
  const btn = document.querySelector('.story-refresh');
  btn.textContent = '🔄 생성 중...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '🔄 다시 생성';
    btn.disabled = false;
  }, 1500);
}

// ===== Voice Recording =====
let recordingState = {};

function toggleRecord(id) {
  const btn = document.getElementById(`rec-btn-${id}`);
  const status = document.getElementById(`rec-status-${id}`);
  const waveform = document.getElementById(`waveform-${id}`);

  if (!recordingState[id]) {
    // Start recording
    recordingState[id] = true;
    btn.classList.add('recording');
    status.textContent = '녹음 중... (버튼을 다시 눌러 완료)';
    waveform.style.backgroundImage = 'none';
    waveform.style.background = 'rgba(255,71,87,0.08)';
    animateWaveform(waveform);
  } else {
    // Stop recording
    recordingState[id] = false;
    btn.classList.remove('recording');
    status.textContent = '✓ 녹음 완료! 다시 녹음하려면 버튼을 누르세요';
    status.style.color = 'var(--secondary)';
    waveform.style.background = '';
    waveform.innerHTML = '';
    // Show sample
    const samplesEl = document.getElementById(`voice-samples-${id}`);
    if (samplesEl) samplesEl.style.display = 'block';
  }
}

function animateWaveform(el) {
  el.innerHTML = '';
  const bars = 24;
  for (let i = 0; i < bars; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = `
      display: inline-block; width: 6px; margin: 0 2px; border-radius: 3px;
      background: rgba(255,71,87,0.6);
      animation: wave ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate;
      animation-delay: ${Math.random() * 0.4}s;
      height: ${10 + Math.random() * 28}px; vertical-align: middle;
    `;
    el.appendChild(bar);
  }
  const style = document.createElement('style');
  style.textContent = '@keyframes wave { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }';
  document.head.appendChild(style);
}

function skipVoice(type) {
  goTo('screen-register-done');
}

// ===== Interest & Level Pills Click =====
document.addEventListener('click', (e) => {
  const pill = e.target.closest('.interest-tag:not(.readonly .interest-tag)');
  if (pill) pill.classList.toggle('active');

  const levelPill = e.target.closest('.level-pill');
  if (levelPill) {
    const siblings = levelPill.parentElement.querySelectorAll('.level-pill');
    siblings.forEach(s => s.classList.remove('active'));
    levelPill.classList.add('active');
    // Update desc if in register-child-2
    const desc = document.querySelector('.level-desc');
    if (desc) {
      const descs = [
        '알파벳/숫자 등 아주 기초적인 단어를 알아요',
        '간단한 인사말과 일상 단어를 알아요',
        '짧은 문장을 만들 수 있어요',
        '자연스럽게 대화할 수 있어요'
      ];
      const idx = Array.from(levelPill.parentElement.children).indexOf(levelPill);
      desc.textContent = descs[idx] || '';
    }
  }

  const filterPill = e.target.closest('.filter-pill');
  if (filterPill) {
    const siblings = filterPill.parentElement.querySelectorAll('.filter-pill');
    siblings.forEach(s => s.classList.remove('active'));
    filterPill.classList.add('active');
  }

  const avatarPick = e.target.closest('.avatar-pick');
  if (avatarPick) {
    const siblings = avatarPick.parentElement.querySelectorAll('.avatar-pick');
    siblings.forEach(s => s.classList.remove('active'));
    avatarPick.classList.add('active');
  }
});

// ===== Role Edit Bottom Sheet =====
function openRoleEdit(type) {
  document.getElementById('role-overlay').classList.add('active');
  document.getElementById('role-sheet').classList.add('active');
}

function closeRoleEdit() {
  document.getElementById('role-overlay').classList.remove('active');
  document.getElementById('role-sheet').classList.remove('active');
}

// ===== Word Detail Bottom Sheet =====
const wordData = {
  missing: { phonetic: '/ˈmɪsɪŋ/', meaning: '없어진, 사라진', example: '"The Rainbow Egg is missing!" = 레인보우 알이 사라졌어!' },
  help: { phonetic: '/hɛlp/', meaning: '도움, 돕다', example: '"Can you help me?" = 나를 도와줄 수 있어?' },
  volcano: { phonetic: '/vɒlˈkeɪnəʊ/', meaning: '화산', example: '"Near the big volcano" = 큰 화산 근처에' },
  careful: { phonetic: '/ˈkeəfl/', meaning: '조심스러운, 신중한', example: '"Be very careful!" = 아주 조심해!' },
  dangerous: { phonetic: '/ˈdeɪndʒərəs/', meaning: '위험한', example: '"It\'s very dangerous!" = 아주 위험해!' },
};

function showWordDetail(word) {
  const data = wordData[word] || { phonetic: '', meaning: word, example: '' };
  document.getElementById('bs-word').textContent = word;
  document.getElementById('bs-phonetic').textContent = data.phonetic;
  document.getElementById('bs-meaning').textContent = data.meaning;
  document.getElementById('bs-example').textContent = data.example;
  document.getElementById('word-overlay').classList.add('active');
  document.getElementById('word-sheet').classList.add('active');
}

function closeWordDetail() {
  document.getElementById('word-overlay').classList.remove('active');
  document.getElementById('word-sheet').classList.remove('active');
}

// ===== Exit Confirm =====
function confirmExit() {
  document.getElementById('exit-overlay').classList.add('active');
  document.getElementById('exit-sheet').classList.add('active');
}

function closeExitConfirm() {
  document.getElementById('exit-overlay').classList.remove('active');
  document.getElementById('exit-sheet').classList.remove('active');
}

function endSession() {
  closeExitConfirm();
  goTo('screen-session-summary');
  if (timerInterval) clearInterval(timerInterval);
}

// ===== Roleplay Mic =====
let micActive = false;
function toggleMic() {
  micActive = !micActive;
  const btn = document.getElementById('rp-mic');
  if (micActive) {
    btn.classList.add('listening');
    btn.querySelector('.mic-icon').textContent = '⏺️';
    // Simulate AI responding after 2.5s
    setTimeout(() => {
      if (micActive) toggleMic();
      simulateChildResponse();
    }, 2500);
  } else {
    btn.classList.remove('listening');
    btn.querySelector('.mic-icon').textContent = '🎙️';
  }
}

function simulateChildResponse() {
  const chatArea = document.getElementById('chat-area');
  const responses = [
    { role: 'child', avatar: '🔬', who: '지우 👦', text: "I know! I know! 화산은... Volcano! It's very big and hot!", cssClass: 'child-bubble', contentClass: 'right-content', score: '⭐ +8 영어 점수!' },
  ];
  const r = responses[0];
  const div = document.createElement('div');
  div.className = `chat-bubble ${r.cssClass}`;
  div.innerHTML = `
    <div class="bubble-content ${r.contentClass}">
      <div class="bubble-who right">${r.who}</div>
      <div class="bubble-text">${r.text}</div>
      ${r.score ? `<div class="bubble-score">${r.score}</div>` : ''}
    </div>
    <div class="bubble-avatar">${r.avatar}</div>
  `;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;

  // AI response after a moment
  setTimeout(() => {
    addAIMessage("Amazing! 🌟 You're so smart! Now, let's find the Rainbow Egg. Follow me! Say: \"Let's go explore!\"");
    updateActiveChip('ai');
  }, 1800);
}

function addAIMessage(text) {
  const chatArea = document.getElementById('chat-area');
  const div = document.createElement('div');
  div.className = 'chat-bubble ai-bubble';
  div.innerHTML = `
    <div class="bubble-avatar">🦖</div>
    <div class="bubble-content">
      <div class="bubble-who">렉시 (AI)</div>
      <div class="bubble-text">${text}</div>
    </div>
  `;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function updateActiveChip(who) {
  document.querySelectorAll('.rp-chip').forEach(c => c.classList.remove('active'));
  document.getElementById(`chip-${who}`)?.classList.add('active');
}

// ===== Roleplay Timer =====
let timerInterval = null;
let timerSeconds = 20 * 60;

function initRoleplay() {
  if (timerInterval) clearInterval(timerInterval);
  timerSeconds = 20 * 60;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    updateTimerDisplay();
    if (timerSeconds === 0) clearInterval(timerInterval);
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
  const s = (timerSeconds % 60).toString().padStart(2, '0');
  const el = document.getElementById('rp-timer');
  if (el) el.textContent = `${m}:${s}`;
}

// ===== Hint =====
function toggleHint() {
  const hint = document.getElementById('hint-bar');
  hint.style.display = hint.style.display === 'none' ? 'flex' : 'none';
}

function closeHint() {
  document.getElementById('hint-bar').style.display = 'none';
}

// ===== Init =====
// Keyboard handling for bottom sheet
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeWordDetail();
    closeRoleEdit();
    closeExitConfirm();
  }
});
