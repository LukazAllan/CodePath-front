const navItems = document.querySelectorAll('.nav-item[data-target]');
const screens  = document.querySelectorAll('.screen');
let current = 'aprender';

function navigate(target) {
  if (target === current) return;
  navItems.forEach(n => n.classList.remove('active'));
  screens.forEach(s => s.classList.remove('active'));
  document.querySelector(`.nav-item[data-target="${target}"]`).classList.add('active');
  const s = document.getElementById(`screen-${target}`);
  s.classList.add('active');
  s.scrollTop = 0;
  current = target;
}

navItems.forEach(item => item.addEventListener('click', () => navigate(item.dataset.target)));

window.addEventListener('load', () => {
  setTimeout(() => { const f = document.getElementById('xpFill'); if (f) f.style.width = '35%'; }, 400);

  // Botão "Novo Curso"
  document.querySelector('.btn-add').addEventListener('click', openCatalog);
});

function openCatalog() {
  // Mantém a nav item de gerência ativa visualmente
  screens.forEach(s => s.classList.remove('active'));
  const cat = document.getElementById('screen-catalogo');
  cat.classList.add('active');
  cat.scrollTop = 0;
  current = 'catalogo';
  // Reseta busca e filtro
  document.querySelector('.catalog-search-input').value = '';
  setFilterActive('todos');
  filterCatalog('');
}

function closeCatalog() {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById('screen-gerencia').classList.add('active');
  current = 'gerencia';
}

let activeFilter = 'todos';

function setFilter(btn, cat) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = cat;
  const query = document.querySelector('.catalog-search-input').value;
  filterCatalog(query);
}

function setFilterActive(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => {
    c.classList.toggle('active', c.textContent.toLowerCase() === cat || (cat === 'todos' && c.textContent === 'Todos'));
  });
}

function filterCatalog(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.catalog-card').forEach(card => {
    const cat = card.dataset.category;
    const name = card.querySelector('.catalog-card-name').textContent.toLowerCase();
    const desc = card.querySelector('.catalog-card-desc').textContent.toLowerCase();
    const matchCat = activeFilter === 'todos' || cat === activeFilter;
    const matchQ   = !q || name.includes(q) || desc.includes(q);
    card.classList.toggle('hidden', !(matchCat && matchQ));
  });
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

function addCourse(btn) {
  if (btn.classList.contains('added')) return;
  const name = btn.closest('.catalog-card').querySelector('.catalog-card-name').textContent;
  btn.textContent = '✓ Adicionado';
  btn.classList.add('added');
  btn.closest('.catalog-card').dataset.added = 'true';
  showToast(`✅ "${name}" adicionado aos seus cursos!`);
}


// ════════════════════════════════════════════════
// LIÇÃO — ENGINE
// ════════════════════════════════════════════════

const QuestionType = { MULTIPLE_CHOICE:'mc', TRUE_FALSE:'tf', SHORT_TEXT:'st', MATCHING:'match' };

const LESSON_QUESTIONS = [
  {
    type: QuestionType.MULTIPLE_CHOICE,
    label: 'Escolha a alternativa correta',
    prompt: 'O que é TypeScript?',
    code: null,
    options: [
      'Uma linguagem completamente diferente de JavaScript',
      'Um superset tipado de JavaScript que compila para JS',
      'Uma biblioteca para manipulação do DOM',
      'Um framework para criação de APIs REST'
    ],
    correct: 1
  },
  {
    type: QuestionType.TRUE_FALSE,
    label: 'Verdadeiro ou Falso?',
    prompt: 'TypeScript permite definir tipos para variáveis, parâmetros e retorno de funções.',
    code: null,
    correct: true
  },
  {
    type: QuestionType.MULTIPLE_CHOICE,
    label: 'Leia o código e responda',
    prompt: 'Qual será o erro de tipagem no código abaixo?',
    code: `<span class="kw">let</span> nome: <span class="ty">string</span> = <span class="str">"Allan"</span>;
nome = <span class="num">42</span>; <span class="cmt">// ← aqui</span>`,
    options: [
      'Não há erro — TypeScript aceita qualquer valor',
      'Erro: não é possível reatribuir uma variável',
      'Erro: número não pode ser atribuído a uma variável do tipo string',
      'Erro: falta ponto-e-vírgula'
    ],
    correct: 2
  },
  {
    type: QuestionType.SHORT_TEXT,
    label: 'Complete com a palavra certa',
    prompt: 'Em TypeScript, a palavra-chave usada para definir um tipo personalizado é ____.',
    code: null,
    hint: 'Dica: não é "interface". É uma só palavra.',
    correct: 'type',
    acceptedAnswers: ['type']
  },
  {
    type: QuestionType.MATCHING,
    label: 'Associe os tipos TypeScript às suas descrições',
    prompt: 'Arraste cada tipo para sua descrição correta.',
    pairs: [
      { left: 'string',  right: 'Texto e caracteres' },
      { left: 'number',  right: 'Valores numéricos' },
      { left: 'boolean', right: 'Verdadeiro ou falso' },
      { left: 'any',     right: 'Desativa a tipagem' }
    ]
  }
];

let lessonState = {
  qIndex: 0,
  hearts: 5,
  correctCount: 0,
  startTime: 0,
  answered: false,
  matchLeft: null,
  matchPaired: []
};

function startLesson() {
  lessonState = { qIndex: 0, hearts: 5, correctCount: 0, startTime: Date.now(), answered: false, matchLeft: null, matchPaired: [] };
  showScreen('loading');
  animateLoadingBar();
}

function animateLoadingBar() {
  const bar = document.getElementById('loadingBar');
  let pct = 0;
  bar.style.width = '0%';
  const iv = setInterval(() => {
    pct += 2;
    bar.style.width = pct + '%';
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => { showScreen('licao'); renderQuestion(); }, 300);
    }
  }, 30);
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const s = document.getElementById('screen-' + name);
  if (s) { s.classList.add('active'); s.scrollTop = 0; }
  current = name;
}

function renderQuestion() {
  const q = LESSON_QUESTIONS[lessonState.qIndex];
  lessonState.answered = false;
  lessonState.matchLeft = null;

  // progress bar
  const pct = (lessonState.qIndex / LESSON_QUESTIONS.length) * 100;
  document.getElementById('lessonProgressFill').style.width = pct + '%';
  document.getElementById('lessonHearts').textContent = lessonState.hearts;

  // feedback reset
  const fb = document.getElementById('lessonFeedback');
  fb.className = 'lesson-feedback';
  fb.textContent = '';

  // check button
  const btn = document.getElementById('btnCheck');
  btn.textContent = 'Verificar';
  btn.className = 'btn-lesson-check';
  btn.disabled = true;
  btn.onclick = checkAnswer;

  // body
  const body = document.getElementById('lessonBody');
  body.innerHTML = buildQuestionHTML(q);

  // attach events
  if (q.type === QuestionType.MULTIPLE_CHOICE) {
    body.querySelectorAll('.mc-option').forEach((opt, i) => {
      opt.addEventListener('click', () => selectMC(i));
    });
  } else if (q.type === QuestionType.TRUE_FALSE) {
    body.querySelectorAll('.tf-option').forEach(opt => {
      opt.addEventListener('click', () => selectTF(opt.dataset.val === 'true'));
    });
  } else if (q.type === QuestionType.SHORT_TEXT) {
    const inp = body.querySelector('.st-input');
    inp.addEventListener('input', () => {
      document.getElementById('btnCheck').disabled = inp.value.trim() === '';
    });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  } else if (q.type === QuestionType.MATCHING) {
    body.querySelectorAll('.matching-item[data-side="left"]').forEach(el => {
      el.addEventListener('click', () => matchClickLeft(el));
    });
    body.querySelectorAll('.matching-item[data-side="right"]').forEach(el => {
      el.addEventListener('click', () => matchClickRight(el));
    });
  }
}

function buildQuestionHTML(q) {
  const codeBlock = q.code ? `<pre class="q-code">${q.code}</pre>` : '';
  let inner = '';

  if (q.type === QuestionType.MULTIPLE_CHOICE) {
    const opts = q.options.map((o, i) => `
      <div class="mc-option" data-index="${i}">
        <div class="mc-option-key">${'ABCD'[i]}</div>
        ${o}
      </div>`).join('');
    inner = `<div class="mc-options">${opts}</div>`;

  } else if (q.type === QuestionType.TRUE_FALSE) {
    inner = `<div class="tf-options">
      <div class="tf-option" data-val="true"><div class="tf-option-emoji">✅</div>Verdadeiro</div>
      <div class="tf-option" data-val="false"><div class="tf-option-emoji">❌</div>Falso</div>
    </div>`;

  } else if (q.type === QuestionType.SHORT_TEXT) {
    inner = `<div class="st-input-wrap">
      <input class="st-input" type="text" placeholder="Digite sua resposta…" autocomplete="off" spellcheck="false">
      ${q.hint ? `<div class="st-hint">${q.hint}</div>` : ''}
    </div>`;

  } else if (q.type === QuestionType.MATCHING) {
    const leftItems  = q.pairs.map((p, i) => `<div class="matching-item" data-side="left"  data-index="${i}">${p.left}</div>`).join('');
    const rightItems = shuffle([...q.pairs.map((p, i) => ({ text: p.right, index: i }))]);
    const rightHtml  = rightItems.map(p => `<div class="matching-item" data-side="right" data-index="${p.index}">${p.text}</div>`).join('');
    inner = `<div class="matching-area">
      <div class="matching-cols">
        <div>
          <div class="matching-col-label">Tipo</div>
          <div class="matching-items" id="matchLeft">${leftItems}</div>
        </div>
        <div>
          <div class="matching-col-label">Descrição</div>
          <div class="matching-items" id="matchRight">${rightHtml}</div>
        </div>
      </div>
      <div class="matching-pairs" id="matchPairs"></div>
    </div>`;
  }

  return `
    <div class="q-label">${q.label}</div>
    <div class="q-prompt">${q.prompt}</div>
    ${codeBlock}
    ${inner}
  `;
}

let selectedMC = null;
function selectMC(i) {
  if (lessonState.answered) return;
  selectedMC = i;
  document.querySelectorAll('.mc-option').forEach((o, idx) => {
    o.classList.toggle('selected', idx === i);
  });
  document.getElementById('btnCheck').disabled = false;
}

let selectedTF = null;
function selectTF(val) {
  if (lessonState.answered) return;
  selectedTF = val;
  document.querySelectorAll('.tf-option').forEach(o => {
    o.classList.toggle('selected', (o.dataset.val === 'true') === val);
  });
  document.getElementById('btnCheck').disabled = false;
}

function matchClickLeft(el) {
  if (el.classList.contains('paired')) return;
  document.querySelectorAll('.matching-item[data-side="left"]').forEach(e => e.classList.remove('selected-left'));
  lessonState.matchLeft = el;
  el.classList.add('selected-left');
}

function matchClickRight(el) {
  if (!lessonState.matchLeft || el.classList.contains('paired')) return;
  const leftEl  = lessonState.matchLeft;
  const leftIdx = parseInt(leftEl.dataset.index);
  const rightIdx= parseInt(el.dataset.index);
  const q = LESSON_QUESTIONS[lessonState.qIndex];
  const isCorrect = leftIdx === rightIdx;

  if (isCorrect) {
    leftEl.classList.remove('selected-left');
    leftEl.classList.add('paired');
    el.classList.add('paired');
    lessonState.matchPaired.push(leftIdx);

    // add pair row
    const pairsEl = document.getElementById('matchPairs');
    const row = document.createElement('div');
    row.className = 'matching-pair-row';
    row.innerHTML = `<div class="matching-pair-left">${q.pairs[leftIdx].left}</div><div class="matching-pair-arrow">→</div><div class="matching-pair-right">${q.pairs[leftIdx].right}</div>`;
    pairsEl.appendChild(row);

    lessonState.matchLeft = null;
    if (lessonState.matchPaired.length === q.pairs.length) {
      document.getElementById('btnCheck').disabled = false;
    }
  } else {
    leftEl.classList.add('wrong'); el.classList.add('wrong');
    setTimeout(() => {
      leftEl.classList.remove('wrong', 'selected-left');
      el.classList.remove('wrong');
      lessonState.matchLeft = null;
    }, 700);
  }
}

function checkAnswer() {
  if (lessonState.answered) { nextQuestion(); return; }
  const q = LESSON_QUESTIONS[lessonState.qIndex];
  let correct = false;

  if (q.type === QuestionType.MULTIPLE_CHOICE) {
    correct = selectedMC === q.correct;
    document.querySelectorAll('.mc-option').forEach((o, i) => {
      if (i === q.correct) o.classList.add('correct');
      else if (i === selectedMC) o.classList.add('wrong');
    });
  } else if (q.type === QuestionType.TRUE_FALSE) {
    correct = selectedTF === q.correct;
    document.querySelectorAll('.tf-option').forEach(o => {
      const v = o.dataset.val === 'true';
      if (v === q.correct) o.classList.add('correct');
      else if (v === selectedTF) o.classList.add('wrong');
    });
  } else if (q.type === QuestionType.SHORT_TEXT) {
    const inp = document.querySelector('.st-input');
    const val = inp.value.trim().toLowerCase();
    correct = q.acceptedAnswers.map(a => a.toLowerCase()).includes(val);
    inp.classList.add(correct ? 'correct' : 'wrong');
    inp.readOnly = true;
  } else if (q.type === QuestionType.MATCHING) {
    correct = true; // all pairs verified inline already
  }

  lessonState.answered = true;
  if (correct) { lessonState.correctCount++; showFeedback(true); }
  else { lessonState.hearts = Math.max(0, lessonState.hearts - 1); showFeedback(false); }

  document.getElementById('lessonHearts').textContent = lessonState.hearts;
  const btn = document.getElementById('btnCheck');
  btn.textContent = lessonState.qIndex < LESSON_QUESTIONS.length - 1 ? 'Continuar →' : 'Ver Resultado →';
  btn.className = 'btn-lesson-check next-mode';
  btn.disabled = false;
  btn.onclick = nextQuestion;
}

function showFeedback(correct) {
  const fb = document.getElementById('lessonFeedback');
  fb.textContent = correct ? '✅ Correto! Muito bem!' : '❌ Não foi dessa vez. Continue!';
  fb.className = 'lesson-feedback show ' + (correct ? 'correct' : 'wrong');
}

function nextQuestion() {
  lessonState.qIndex++;
  selectedMC = null; selectedTF = null;
  if (lessonState.qIndex >= LESSON_QUESTIONS.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  document.getElementById('lessonProgressFill').style.width = '100%';
  const elapsed = Math.round((Date.now() - lessonState.startTime) / 1000);
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const xp = 10 * lessonState.correctCount;
  const acc = Math.round((lessonState.correctCount / LESSON_QUESTIONS.length) * 100);
  const stars = acc >= 90 ? 3 : acc >= 60 ? 2 : 1;

  document.getElementById('resultXP').textContent   = '+' + xp;
  document.getElementById('resultAcc').textContent  = acc + '%';
  document.getElementById('resultTime').textContent = (mins > 0 ? mins + 'm ' : '') + secs + 's';

  const starsEl = document.getElementById('resultStars');
  starsEl.innerHTML = [1,2,3].map(n =>
    `<span class="result-star" style="${n > stars ? 'filter:grayscale(1);opacity:.3' : ''}">⭐</span>`
  ).join('');

  showScreen('resultado');
}

function exitLesson() {
  showScreen('aprender');
  navigate('aprender');
}

function finishLesson() {
  showScreen('aprender');
  navigate('aprender');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}