
/* ── navigation ──────────────────────────────── */
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  clearErrors();
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(e => e.classList.remove('show'));
  document.querySelectorAll('input').forEach(i => i.classList.remove('error'));
}

/* ── show/hide password ──────────────────────── */
const eyeOpen  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const eyeClosed = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

function toggleEye(inputId, icon) {
  const inp = document.getElementById(inputId);
  const isPass = inp.type === 'password';
  inp.type = isPass ? 'text' : 'password';
  icon.innerHTML = isPass ? eyeClosed : eyeOpen;
}

/* ── password strength ───────────────────────── */
function checkStrength(val) {
  const wrap = document.getElementById('strengthWrap');
  const bar  = document.getElementById('strengthBar');
  const lbl  = document.getElementById('strengthLabel');

  if (!val) { wrap.classList.remove('show'); return; }
  wrap.classList.add('show');

  let score = 0;
  if (val.length >= 8)  score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { w: '25%',  bg: '#fb2c36', txt: 'Muito fraca' },
    { w: '50%',  bg: '#ff6900', txt: 'Fraca' },
    { w: '75%',  bg: '#f59e0b', txt: 'Boa' },
    { w: '100%', bg: '#009966', txt: 'Forte 💪' },
  ];
  const lvl = levels[score - 1] || levels[0];
  bar.style.width      = lvl.w;
  bar.style.background = lvl.bg;
  lbl.textContent      = lvl.txt;
  lbl.style.color      = lvl.bg;
}

/* ── validation helpers ──────────────────────── */
function showErr(inputId, errId) {
  document.getElementById(inputId).classList.add('error');
  document.getElementById(errId).classList.add('show');
}

function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

/* ── submit login ────────────────────────────── */
function submitLogin() {
  clearErrors();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  let ok = true;

  if (!isEmail(email)) { showErr('login-email', 'login-email-err'); ok = false; }
  if (!pass)           { showErr('login-pass',  'login-pass-err');  ok = false; }
  if (!ok) return;

  const btn = document.getElementById('btn-login');
  btn.classList.add('loading');

  setTimeout(() => {
    btn.classList.remove('loading');
    document.getElementById('login-success').classList.add('show');
    setTimeout(() => { document.getElementById('login-success').classList.remove('show'); }, 2200);
  }, 1600);
}

/* ── submit register ─────────────────────────── */
function submitRegister() {
  clearErrors();
  const nome  = document.getElementById('reg-nome').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;
  let ok = true;

  if (!nome)           { showErr('reg-nome',  'reg-nome-err');   ok = false; }
  if (!isEmail(email)) { showErr('reg-email', 'reg-email-err');  ok = false; }
  if (pass.length < 8) { showErr('reg-pass',  'reg-pass-err');   ok = false; }
  if (pass !== pass2)  { showErr('reg-pass2', 'reg-pass2-err');  ok = false; }
  if (!ok) return;

  const btn = document.getElementById('btn-register');
  btn.classList.add('loading');

  setTimeout(() => {
    btn.classList.remove('loading');
    document.getElementById('register-success').classList.add('show');
    setTimeout(() => { document.getElementById('register-success').classList.remove('show'); }, 2200);
  }, 1800);
}

/* ── google (mock) ───────────────────────────── */
function handleGoogle() {
  const pages = document.querySelectorAll('.page.active');
  pages.forEach(p => {
    const overlay = p.querySelector('.success-overlay');
    if (overlay) {
      overlay.querySelector('.success-check').textContent = '✅';
      overlay.classList.add('show');
      setTimeout(() => overlay.classList.remove('show'), 2000);
    }
  });
}

/* ── enter key support ───────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const loginActive = document.getElementById('page-login').classList.contains('active');
  if (loginActive) submitLogin(); else submitRegister();
});