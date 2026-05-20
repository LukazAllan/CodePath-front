import { state, resetLessonState } from './state.js';
import {
  QuestionType,
  getLessonQuestion,
  getQuestionCount,
  formatElapsedTime,
  computeResult
} from './service.js';
import { buildQuestionHTML } from './view.js';
import { Renderer } from './renderer.js';

let selectedMC = null;
let selectedTF = null;

export function initApp() {
  Renderer.bindNavClick(navigate);
  Renderer.bindButton('.btn-add', openCatalog);
  Renderer.bindButton('.btn-back', closeCatalog);
  Renderer.bindSearchInput(filterCatalog);
  Renderer.bindFilterButtons(setFilter);
  Renderer.bindCatalogActions(addCourse);
  Renderer.bindStartLesson(startLesson);
  Renderer.bindButton('.lesson-close-btn', exitLesson);
  Renderer.bindButton('.btn-result-back', finishLesson);
  Renderer.bindButton('#btnCheck', handleCheckClick);
  Renderer.queryAll('.config-row').forEach(row => {
    if (row.querySelector('.toggle')) {
      row.addEventListener('click', () => toggleSwitch(row));
    }
  });

  setTimeout(() => Renderer.renderXPFill(35), 400);
}

function navigate(target) {
  if (target === state.currentScreen) return;
  state.currentScreen = target;
  Renderer.activateNav(target);
  Renderer.activateScreen(target);
}

function openCatalog() {
  state.currentScreen = 'catalogo';
  Renderer.activateScreen('catalogo');
  Renderer.setSearchValue('');
  setFilter('todos');
}

function closeCatalog() {
  state.currentScreen = 'gerencia';
  Renderer.activateNav('gerencia');
  Renderer.activateScreen('gerencia');
}

function setFilter(filter) {
  state.activeFilter = filter;
  Renderer.setFilterActive(filter);
  filterCatalog(Renderer.getSearchValue());
}

function filterCatalog(query) {
  const normalized = query.toLowerCase();
  Renderer.queryAll('.catalog-card').forEach(card => {
    const category = card.dataset.category;
    const name = card.querySelector('.catalog-card-name').textContent.toLowerCase();
    const desc = card.querySelector('.catalog-card-desc').textContent.toLowerCase();
    const matchesFilter = state.activeFilter === 'todos' || category === state.activeFilter;
    const matchesQuery = !normalized || name.includes(normalized) || desc.includes(normalized);
    card.classList.toggle('hidden', !(matchesFilter && matchesQuery));
  });
}

function addCourse(button) {
  if (button.classList.contains('added')) return;
  const card = button.closest('.catalog-card');
  const name = card.querySelector('.catalog-card-name').textContent;
  button.textContent = '✓ Adicionado';
  button.classList.add('added');
  card.dataset.added = 'true';
  Renderer.showToast(`✅ "${name}" adicionado aos seus cursos!`);
}

function startLesson() {
  resetLessonState();
  Renderer.activateScreen('loading');
  animateLoadingBar();
}

function animateLoadingBar() {
  const bar = Renderer.query('#loadingBar');
  let percent = 0;
  if (!bar) return;
  bar.style.width = '0%';
  const interval = setInterval(() => {
    percent += 2;
    bar.style.width = `${percent}%`;
    if (percent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        Renderer.activateScreen('licao');
        renderQuestion();
      }, 300);
    }
  }, 30);
}

function renderQuestion() {
  const question = getLessonQuestion(state.lesson.qIndex);
  state.lesson.answered = false;
  state.lesson.matchLeft = null;
  selectedMC = null;
  selectedTF = null;

  const progress = (state.lesson.qIndex / getQuestionCount()) * 100;
  Renderer.renderLessonProgress(progress);
  Renderer.renderLessonHearts(state.lesson.hearts);
  Renderer.resetFeedback();
  Renderer.updateCheckButton({ text: 'Verificar', disabled: true, nextMode: false });
  Renderer.renderLessonBody(buildQuestionHTML(question));

  if (question.type === QuestionType.MULTIPLE_CHOICE) {
    Renderer.queryAll('.mc-option').forEach(option => {
      option.addEventListener('click', () => selectMC(parseInt(option.dataset.index, 10)));
    });
  } else if (question.type === QuestionType.TRUE_FALSE) {
    Renderer.queryAll('.tf-option').forEach(option => {
      option.addEventListener('click', () => selectTF(option.dataset.val === 'true'));
    });
  } else if (question.type === QuestionType.SHORT_TEXT) {
    const input = Renderer.query('.st-input');
    if (input) {
      input.addEventListener('input', () => {
        Renderer.updateCheckButton({ text: 'Verificar', disabled: input.value.trim() === '', nextMode: false });
      });
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') handleCheckClick();
      });
    }
  } else if (question.type === QuestionType.MATCHING) {
    Renderer.queryAll('.matching-item[data-side="left"]').forEach(el => {
      el.addEventListener('click', () => matchClickLeft(el));
    });
    Renderer.queryAll('.matching-item[data-side="right"]').forEach(el => {
      el.addEventListener('click', () => matchClickRight(el));
    });
  }
}

function selectMC(index) {
  if (state.lesson.answered) return;
  selectedMC = index;
  Renderer.queryAll('.mc-option').forEach((option, optionIndex) => {
    option.classList.toggle('selected', optionIndex === index);
  });
  Renderer.updateCheckButton({ text: 'Verificar', disabled: false, nextMode: false });
}

function selectTF(value) {
  if (state.lesson.answered) return;
  selectedTF = value;
  Renderer.queryAll('.tf-option').forEach(option => {
    option.classList.toggle('selected', (option.dataset.val === 'true') === value);
  });
  Renderer.updateCheckButton({ text: 'Verificar', disabled: false, nextMode: false });
}

function matchClickLeft(element) {
  if (element.classList.contains('paired')) return;
  Renderer.queryAll('.matching-item[data-side="left"]').forEach(item => item.classList.remove('selected-left'));
  state.lesson.matchLeft = element;
  element.classList.add('selected-left');
}

function matchClickRight(element) {
  if (!state.lesson.matchLeft || element.classList.contains('paired')) return;
  const leftElement = state.lesson.matchLeft;
  const leftIndex = parseInt(leftElement.dataset.index, 10);
  const rightIndex = parseInt(element.dataset.index, 10);
  const question = getLessonQuestion(state.lesson.qIndex);
  const isCorrect = leftIndex === rightIndex;

  if (isCorrect) {
    leftElement.classList.remove('selected-left');
    leftElement.classList.add('paired');
    element.classList.add('paired');
    state.lesson.matchPaired.push(leftIndex);

    const pairs = Renderer.query('#matchPairs');
    if (pairs) {
      const row = document.createElement('div');
      row.className = 'matching-pair-row';
      row.innerHTML = `
        <div class="matching-pair-left">${question.pairs[leftIndex].left}</div>
        <div class="matching-pair-arrow">→</div>
        <div class="matching-pair-right">${question.pairs[leftIndex].right}</div>
      `;
      pairs.appendChild(row);
    }

    state.lesson.matchLeft = null;
    if (state.lesson.matchPaired.length === question.pairs.length) {
      Renderer.updateCheckButton({ text: 'Verificar', disabled: false, nextMode: false });
    }
  } else {
    leftElement.classList.add('wrong');
    element.classList.add('wrong');
    setTimeout(() => {
      leftElement.classList.remove('wrong', 'selected-left');
      element.classList.remove('wrong');
      state.lesson.matchLeft = null;
    }, 700);
  }
}

function handleCheckClick() {
  if (state.lesson.answered) {
    nextQuestion();
  } else {
    checkAnswer();
  }
}

function checkAnswer() {
  const question = getLessonQuestion(state.lesson.qIndex);
  let correct = false;

  if (question.type === QuestionType.MULTIPLE_CHOICE) {
    correct = selectedMC === question.correct;
    Renderer.queryAll('.mc-option').forEach((option, index) => {
      if (index === question.correct) {
        option.classList.add('correct');
      } else if (index === selectedMC) {
        option.classList.add('wrong');
      }
    });
  } else if (question.type === QuestionType.TRUE_FALSE) {
    correct = selectedTF === question.correct;
    Renderer.queryAll('.tf-option').forEach(option => {
      const value = option.dataset.val === 'true';
      if (value === question.correct) {
        option.classList.add('correct');
      } else if (value === selectedTF) {
        option.classList.add('wrong');
      }
    });
  } else if (question.type === QuestionType.SHORT_TEXT) {
    const input = Renderer.query('.st-input');
    if (!input) return;
    const answer = input.value.trim().toLowerCase();
    correct = question.acceptedAnswers.map(a => a.toLowerCase()).includes(answer);
    input.classList.add(correct ? 'correct' : 'wrong');
    input.readOnly = true;
  } else if (question.type === QuestionType.MATCHING) {
    correct = true;
  }

  state.lesson.answered = true;
  if (correct) {
    state.lesson.correctCount += 1;
    Renderer.renderFeedback('✅ Correto! Muito bem!', true);
  } else {
    state.lesson.hearts = Math.max(0, state.lesson.hearts - 1);
    Renderer.renderFeedback('❌ Não foi dessa vez. Continue!', false);
  }

  Renderer.renderLessonHearts(state.lesson.hearts);
  Renderer.updateCheckButton({
    text: state.lesson.qIndex < getQuestionCount() - 1 ? 'Continuar →' : 'Ver Resultado →',
    disabled: false,
    nextMode: true
  });
}

function nextQuestion() {
  state.lesson.qIndex += 1;
  selectedMC = null;
  selectedTF = null;

  if (state.lesson.qIndex >= getQuestionCount()) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  Renderer.renderLessonProgress(100);
  const elapsed = Date.now() - state.lesson.startTime;
  const result = computeResult(state.lesson.correctCount, getQuestionCount());
  Renderer.renderResult({
    xp: result.xp,
    accuracy: result.accuracy,
    timeText: formatElapsedTime(elapsed),
    stars: result.stars
  });
  Renderer.activateScreen('resultado');
}

function exitLesson() {
  state.currentScreen = 'aprender';
  Renderer.activateNav('aprender');
  Renderer.activateScreen('aprender');
}

function finishLesson() {
  state.currentScreen = 'aprender';
  Renderer.activateNav('aprender');
  Renderer.activateScreen('aprender');
}

function toggleSwitch(row) {
  const toggle = row.querySelector('.toggle');
  if (!toggle) return;
  toggle.classList.toggle('on');
}
