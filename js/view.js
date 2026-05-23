// ============================================================
//  view.js
//  Responsabilidade ÚNICA: manipular o DOM.
//  Não chama services, não chama repositories, não tem estado.
//
//  Exporta duas categorias de funções:
//    bind*()   → registra event listeners (chamados pelo controller)
//    render*() → atualiza o DOM com dados prontos
// ============================================================

import { makeQuestion } from './model/entities.js';

// ─── Seletores (cache para evitar querySelector repetitivo) ───

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// ─── Navegação / Screens ──────────────────────────────────────

export function bindNavItems(onNavigate) {
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.target;
      $$('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      onNavigate(target);
    });
  });
}

export function switchScreen(name) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const el = $(`#screen-${name}`);
  if (el) el.classList.add('active');
}

// ─── Usuário ──────────────────────────────────────────────────

export function renderUserInfo(user) {
  const nameEl  = $('.user-name');
  const initEl  = $('.user-avatar');
  const xpEl    = $('.stat-pill.xp');
  const heartsEl= $('.stat-pill.hearts');

  if (nameEl)   nameEl.textContent  = user.name ?? '';
  if (initEl)   initEl.textContent  = initials(user.name);
  if (xpEl)     xpEl.textContent    = `⚡ ${user.xp ?? 0} XP`;
  if (heartsEl) heartsEl.textContent = `❤️ ${user.hearts ?? 5}`;
}

export function renderXpBar(xp) {
  // Cada nível = 1200 XP (pode ajustar)
  const levelXp  = 1200;
  const current  = xp % levelXp;
  const level    = Math.floor(xp / levelXp) + 1;
  const pct      = (current / levelXp) * 100;

  const fill  = $('#xpFill');
  const label = $('.xp-bar-label');
  if (fill)  fill.style.width = `${pct}%`;
  if (label) label.innerHTML  = `<span>Nível ${level}</span><span>${current} / ${levelXp} XP</span>`;
}

// ─── Streak ───────────────────────────────────────────────────

export function renderStreak(streak) {
  const el = $('.stat-card.yellow .stat-card-value');
  if (el) el.textContent = streak?.days ?? 0;
}

// ─── Trilha ───────────────────────────────────────────────────

/**
 * Renderiza as seções e lições como bolhas na trilha.
 * @param {Section[]} sections
 * @param {Lesson[]} lessons
 * @param {LessonProgress[]} progress
 */
export function renderTrail(sections, lessons, progress) {
  const container = $('#screen-aprender');
  if (!container) return;

  // Remove trilha anterior (mantém o xp-bar e o btn-start)
  $$('.trail-section-header, .trail-path').forEach(el => el.remove());

  const progressMap = {};
  progress.forEach(p => {
    if (p.lesson?.id) progressMap[p.lesson.id] = p.status;
  });

  const positions = ['pos-center', 'pos-right', 'pos-center', 'pos-left'];
  const btnStart  = $('.btn-start');

  sections.sort((a, b) => a.ordem - b.ordem).forEach(section => {
    const sectionLessons = lessons
      .filter(l => l.section?.id === section.id)
      .sort((a, b) => a.ordem - b.ordem);

    const headerEl = buildSectionHeader(section);
    container.insertBefore(headerEl, btnStart);

    const pathEl = document.createElement('div');
    pathEl.className = 'trail-path';

    sectionLessons.forEach((lesson, i) => {
      const status = progressMap[lesson.id] ?? 'LOCKED';
      const pos    = positions[i % positions.length];

      if (i > 0) {
        const conn = document.createElement('div');
        conn.className = `zz-connector ${status === 'DONE' ? 'done' : 'locked'}`;
        pathEl.appendChild(conn);
      }

      const row = buildBubbleRow(lesson, status, pos);
      pathEl.appendChild(row);
    });

    container.insertBefore(pathEl, btnStart);
  });
}

function buildSectionHeader(section) {
  const colors = { 1: 'green', 2: 'purple', 3: 'orange' };
  const color  = colors[section.ordem] ?? 'green';
  const el = document.createElement('div');
  el.className = `trail-section-header ${color}`;
  el.innerHTML = `
    <span class="section-hicon">${section.icon ?? '🟢'}</span>
    <div>
      <div class="section-htitle">${section.title}</div>
      <div class="section-hsub">${section.subtitle ?? ''}</div>
    </div>`;
  return el;
}

function buildBubbleRow(lesson, status, pos) {
  const row  = document.createElement('div');
  row.className = `bubble-row ${pos}`;

  const wrap = document.createElement('div');
  wrap.className = 'bubble-wrap';
  if (status !== 'LOCKED') wrap.classList.add('js-start-lesson');
  if (status !== 'LOCKED') wrap.style.cursor = 'pointer';
  wrap.dataset.lessonId = lesson.id;

  const emoji = status === 'DONE' ? '🟢' : status === 'ACTIVE' ? '🏆' : '🔒';
  const tooltip = status === 'LOCKED' ? '🔒 Bloqueado' : lesson.name;

  wrap.innerHTML = `
    <div class="bubble-tooltip">${tooltip}</div>
    <div class="bubble ${status.toLowerCase()}">${emoji}</div>`;

  if (status === 'DONE') {
    const stars = document.createElement('div');
    stars.className = 'bubble-stars';
    stars.innerHTML = '<div class="star"></div><div class="star"></div><div class="star"></div>';
    wrap.appendChild(stars);
  }

  row.appendChild(wrap);
  return row;
}

// ─── Bind: start lesson ───────────────────────────────────────

export function bindStartLesson(onStart) {
  // Usa delegação de eventos para capturar bolhas geradas dinamicamente
  document.addEventListener('click', e => {
    const wrap = e.target.closest('.js-start-lesson');
    if (!wrap) return;
    const id = Number(wrap.dataset.lessonId);
    if (id) onStart(id);
  });

  // Botão fixo "▶ Iniciar Lição" — inicia a lição ativa
  const btn = $('.btn-start');
  if (btn) {
    btn.addEventListener('click', () => {
      const active = document.querySelector('.bubble.active')?.closest('.bubble-wrap');
      const id = active ? Number(active.dataset.lessonId) : null;
      if (id) onStart(id);
    });
  }
}

// ─── Loading ──────────────────────────────────────────────────

export function animateLoadingBar(onComplete) {
  const bar = $('#loadingBar');
  if (!bar) { onComplete(); return; }

  bar.style.width = '0%';
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 4;
    if (pct >= 100) {
      pct = 100;
      bar.style.width = `${pct}%`;
      clearInterval(interval);
      setTimeout(onComplete, 200);
    } else {
      bar.style.width = `${pct}%`;
    }
  }, 120);
}

// ─── Lição ────────────────────────────────────────────────────

export function renderQuestion(question) {
  const body = $('#lessonBody');
  if (!body) return;
  body.innerHTML = buildQuestionHTML(question);
  bindQuestionInteractions(question);
}

function buildQuestionHTML(q) {
  const codeBlock = q.code
    ? `<pre class="q-code">${escapeHTML(q.code)}</pre>`
    : '';

  const inner = {
    MULTIPLE_CHOICE: buildMCHTML(q),
    TRUE_FALSE:      buildTFHTML(),
    SHORT_TEXT:      buildSTHTML(q),
    MATCHING:        buildMatchHTML(q),
  }[q.type] ?? '';

  return `
    <div class="q-label">${q.label ?? 'Questão'}</div>
    <div class="q-prompt">${q.prompt}</div>
    ${codeBlock}
    ${inner}`;
}

function buildMCHTML(q) {
  const keys = ['A', 'B', 'C', 'D'];
  return `<div class="mc-options">
    ${q.options.map((opt, i) => `
      <div class="mc-option" data-index="${i}">
        <div class="mc-option-key">${keys[i] ?? i}</div>
        ${escapeHTML(opt)}
      </div>`).join('')}
  </div>`;
}

function buildTFHTML() {
  return `<div class="tf-options">
    <div class="tf-option" data-value="true">
      <div class="tf-option-emoji">✅</div>Verdadeiro
    </div>
    <div class="tf-option" data-value="false">
      <div class="tf-option-emoji">❌</div>Falso
    </div>
  </div>`;
}

function buildSTHTML(q) {
  return `<div class="st-input-wrap">
    <input class="st-input" type="text" placeholder="Sua resposta…" autocomplete="off">
    ${q.hint ? `<div class="st-hint">💡 ${q.hint}</div>` : ''}
  </div>`;
}

function buildMatchHTML(q) {
  const lefts  = q.pairs.map(p => p.left);
  const rights = shuffle([...q.pairs.map(p => p.right)]);
  return `<div class="matching-area">
    <div class="matching-cols">
      <div>
        <div class="matching-col-label">Coluna A</div>
        <div class="matching-items">
          ${lefts.map(l => `<div class="matching-item" data-side="left" data-value="${escapeHTML(l)}">${escapeHTML(l)}</div>`).join('')}
        </div>
      </div>
      <div>
        <div class="matching-col-label">Coluna B</div>
        <div class="matching-items">
          ${rights.map(r => `<div class="matching-item" data-side="right" data-value="${escapeHTML(r)}">${escapeHTML(r)}</div>`).join('')}
        </div>
      </div>
    </div>
    <div class="matching-pairs" id="matchingPairs"></div>
  </div>`;
}

// ─── Interações das questões ──────────────────────────────────

const checkBtn = () => $('#btnCheck');

export function bindQuestionInteractions(question) {
  switch (question.type) {
    case 'MULTIPLE_CHOICE': bindMC();  break;
    case 'TRUE_FALSE':      bindTF();  break;
    case 'SHORT_TEXT':      bindST();  break;
    case 'MATCHING':        bindMatch(question); break;
  }
}

function bindMC() {
  $$('.mc-option').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.mc-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      enableCheckButton();
    });
  });
}

function bindTF() {
  $$('.tf-option').forEach(opt => {
    opt.addEventListener('click', () => {
      $$('.tf-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      enableCheckButton();
    });
  });
}

function bindST() {
  const input = $('.st-input');
  if (!input) return;
  input.addEventListener('input', () => {
    input.value.trim() ? enableCheckButton() : disableCheckButton();
  });
}

// Estado interno do matching (não vai ao state.js pois é só UI)
let _matchLeft = null;
let _matchPaired = [];

function bindMatch(question) {
  _matchLeft   = null;
  _matchPaired = [];

  document.addEventListener('click', handleMatchClick);

  function handleMatchClick(e) {
    const item = e.target.closest('.matching-item');
    if (!item || item.classList.contains('paired')) return;

    const side  = item.dataset.side;
    const value = item.dataset.value;

    if (side === 'left') {
      $$('.matching-item[data-side="left"]').forEach(i => i.classList.remove('selected-left'));
      item.classList.add('selected-left');
      _matchLeft = value;
    } else if (side === 'right' && _matchLeft !== null) {
      // Forma o par
      _matchPaired.push({ left: _matchLeft, right: value });

      // Marca como paired
      const leftEl = $(`.matching-item[data-side="left"][data-value="${CSS.escape(_matchLeft)}"]`);
      if (leftEl) { leftEl.classList.remove('selected-left'); leftEl.classList.add('paired'); }
      item.classList.add('paired');
      _matchLeft = null;

      // Renderiza par formado
      const pairsEl = $('#matchingPairs');
      if (pairsEl) {
        const row = document.createElement('div');
        row.className = 'matching-pair-row';
        row.innerHTML = `
          <div class="matching-pair-left">${escapeHTML(_matchPaired.at(-1).left)}</div>
          <div class="matching-pair-arrow">→</div>
          <div class="matching-pair-right">${escapeHTML(_matchPaired.at(-1).right)}</div>`;
        pairsEl.appendChild(row);
      }

      // Habilita verificar quando todos os pares forem formados
      if (_matchPaired.length === question.pairs.length) {
        enableCheckButton();
        document.removeEventListener('click', handleMatchClick);
      }
    }
  }
}

// ─── Coleta de resposta (chamado pelo controller) ─────────────

export function collectAnswer(question) {
  switch (question.type) {
    case 'MULTIPLE_CHOICE': {
      const sel = $('.mc-option.selected');
      return sel ? Number(sel.dataset.index) : null;
    }
    case 'TRUE_FALSE': {
      const sel = $('.tf-option.selected');
      return sel ? sel.dataset.value === 'true' : null;
    }
    case 'SHORT_TEXT': {
      const val = $('.st-input')?.value?.trim();
      return val || null;
    }
    case 'MATCHING': {
      return _matchPaired.length > 0 ? _matchPaired : null;
    }
    default:
      return null;
  }
}

// ─── Lock após responder ──────────────────────────────────────

export function lockQuestion(question, answer, isCorrect) {
  switch (question.type) {
    case 'MULTIPLE_CHOICE': {
      $$('.mc-option').forEach((opt, i) => {
        opt.style.pointerEvents = 'none';
        if (i === question.correct) opt.classList.add('correct');
        else if (i === answer && !isCorrect) opt.classList.add('wrong');
      });
      break;
    }
    case 'TRUE_FALSE': {
      $$('.tf-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
        const val = opt.dataset.value === 'true';
        if (val === question.correct) opt.classList.add('correct');
        else if (val === answer && !isCorrect) opt.classList.add('wrong');
      });
      break;
    }
    case 'SHORT_TEXT': {
      const input = $('.st-input');
      if (input) {
        input.disabled = true;
        input.classList.add(isCorrect ? 'correct' : 'wrong');
      }
      break;
    }
  }
}

// ─── Feedback ─────────────────────────────────────────────────

export function showFeedback(isCorrect, hint = null) {
  const el = $('#lessonFeedback');
  if (!el) return;
  el.className = `lesson-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
  el.textContent = isCorrect
    ? '✅ Correto!'
    : `❌ Incorreto.${hint ? ' ' + hint : ''}`;
}

export function resetFeedback() {
  const el = $('#lessonFeedback');
  if (el) el.className = 'lesson-feedback';
}

// ─── Barra de progresso + corações ───────────────────────────

export function updateLessonProgress(ratio) {
  const fill = $('#lessonProgressFill');
  if (fill) fill.style.width = `${ratio * 100}%`;
}

export function updateHearts(n) {
  const el = $('#lessonHearts');
  if (el) el.textContent = n;
}

// ─── Botão Verificar / Próxima ────────────────────────────────

export function enableCheckButton() {
  const btn = checkBtn();
  if (btn) btn.disabled = false;
}
export function disableCheckButton() {
  const btn = checkBtn();
  if (btn) btn.disabled = true;
}
export function setCheckButtonToNext() {
  const btn = checkBtn();
  if (btn) { btn.textContent = 'Próxima'; btn.classList.add('next-mode'); }
}
export function setCheckButtonToVerify() {
  const btn = checkBtn();
  if (btn) { btn.textContent = 'Verificar'; btn.classList.remove('next-mode'); btn.disabled = true; }
}

export function bindCheckButton(onCheck) {
  checkBtn()?.addEventListener('click', onCheck);
}

// ─── Fechar / Sair da lição ───────────────────────────────────

export function bindLessonClose(onClose) {
  $('.lesson-close-btn')?.addEventListener('click', onClose);
}

export function bindExitButton(onLogout) {
  $('.btn-exit')?.addEventListener('click', onLogout);
}

// ─── Resultado ────────────────────────────────────────────────

export function renderResult({ xpGained, accuracy, elapsed, stars }) {
  const fmt = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

  const el = (id) => document.getElementById(id);
  if (el('resultXP'))   el('resultXP').textContent   = `+${xpGained}`;
  if (el('resultAcc'))  el('resultAcc').textContent  = `${accuracy}%`;
  if (el('resultTime')) el('resultTime').textContent = fmt(elapsed);

  const starsEl = $$('.result-star');
  starsEl.forEach((s, i) => {
    s.style.opacity = i < stars ? '1' : '0.2';
  });
}

export function bindResultBack(onBack) {
  $('.btn-result-back')?.addEventListener('click', onBack);
}

// ─── Toast ────────────────────────────────────────────────────

let _toastTimer = null;
export function showToast(message, _type = 'info') {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ─── Utils ────────────────────────────────────────────────────

function initials(name = '') {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function escapeHTML(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
