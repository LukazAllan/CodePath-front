// ============================================================
//  controller.js
//  Responsabilidade: responder a eventos do DOM e orquestrar
//  a comunicação entre View, Service e State.
//
//  Equivalente ao @Controller do Spring — recebe a "requisição"
//  (evento do usuário), chama o Service e devolve para a View.
//
//  REGRA: controller.js nunca chama repository.js diretamente.
// ============================================================

import { state, setUser, setEnrollments, setTrail, resetLessonState, setCurrentScreen } from './state.js';
import { AuthService, CourseService, SectionService, LessonService, QuestionService, EnrollmentService, LessonProgressService, StreakService } from './service.js';
import * as View from './view.js';

// ─── Inicialização ────────────────────────────────────────────

export async function init() {
  View.bindNavItems(onNavigate);
  View.bindStartLesson(onStartLesson);
  View.bindLessonClose(onLessonClose);
  View.bindCheckButton(onCheck);
  View.bindResultBack(onResultBack);
  View.bindExitButton(onLogout);

  if (AuthService.isLoggedIn()) {
    await loadUserSession();
  } else {
    window.location.href = 'login.html';
  }
}

// ─── Sessão / Auth ────────────────────────────────────────────

async function loadUserSession() {
  try {
    const me = await AuthService.me();
    setUser(me);
    View.renderUserInfo(me);

    const [enrollments, streak] = await Promise.all([
      EnrollmentService.findByUserId(me.id),
      StreakService.findById(me.id).catch(() => null),
    ]);
    setEnrollments(enrollments);

    await loadTrail();
    View.renderStreak(streak);
    View.renderXpBar(me.xp);
  } catch (e) {
    console.error('Falha ao carregar sessão:', e);
    onLogout();
  }
}

export async function onLogin(email, password) {
  try {
    await AuthService.login(email, password);
    window.location.href = 'index_all.html';
  } catch (e) {
    View.showToast('E-mail ou senha incorretos.', 'error');
  }
}

export async function onSignUp(name, email, password) {
  try {
    await AuthService.signUp(name, email, password);
    View.showToast('Conta criada! Faça login.', 'success');
    window.location.href = 'login.html';
  } catch (e) {
    View.showToast('Erro ao criar conta.', 'error');
  }
}

export function onLogout() {
  AuthService.logout();
  window.location.href = 'login.html';
}

// ─── Trilha ───────────────────────────────────────────────────

async function loadTrail() {
  const [sections, lessons, progress] = await Promise.all([
    SectionService.findAll(),
    LessonService.findAll(),
    LessonProgressService.findAll(),
  ]);
  setTrail({ sections, lessons, progress });
  View.renderTrail(sections, lessons, progress);
}

// ─── Navegação ────────────────────────────────────────────────

function onNavigate(screenName) {
  setCurrentScreen(screenName);
  View.switchScreen(screenName);
}

// ─── Fluxo de Lição ───────────────────────────────────────────

async function onStartLesson(lessonId) {
  try {
    resetLessonState();
    state.lesson.lessonId = lessonId;
    state.lesson.startTime = Date.now();

    View.switchScreen('loading');
    View.animateLoadingBar(async () => {
      const questions = await QuestionService.findByLessonId(lessonId);
      state.lesson.questions = questions;

      if (questions.length === 0) {
        View.showToast('Essa lição ainda não tem questões.', 'info');
        View.switchScreen('aprender');
        return;
      }

      View.switchScreen('licao');
      renderCurrentQuestion();
    });
  } catch (e) {
    View.showToast('Erro ao carregar a lição.', 'error');
    View.switchScreen('aprender');
  }
}

function renderCurrentQuestion() {
  const { questions, qIndex, hearts } = state.lesson;
  const total = questions.length;
  const progress = qIndex / total;

  View.renderQuestion(questions[qIndex]);
  View.updateLessonProgress(progress);
  View.updateHearts(hearts);
  View.resetFeedback();
  View.disableCheckButton();
}

function onCheck() {
  if (state.lesson.answered) {
    // "Próxima" — avança para a próxima questão
    advanceQuestion();
    return;
  }

  const question = state.lesson.questions[state.lesson.qIndex];
  const result   = View.collectAnswer(question);

  if (result === null) return; // nada selecionado ainda

  const isCorrect = evaluateAnswer(question, result);
  state.lesson.answered = true;

  if (isCorrect) {
    state.lesson.correctCount++;
    View.showFeedback(true, question.hint);
  } else {
    state.lesson.hearts--;
    View.updateHearts(state.lesson.hearts);
    View.showFeedback(false, question.hint);
  }

  View.lockQuestion(question, result, isCorrect);
  View.setCheckButtonToNext();
}

function evaluateAnswer(question, answer) {
  const { QuestionType } = question;

  switch (question.type) {
    case 'MULTIPLE_CHOICE':
      return answer === question.correct;

    case 'TRUE_FALSE':
      return answer === question.correct;

    case 'SHORT_TEXT':
      return question.acceptedAnswers
        .some(a => a.trim().toLowerCase() === String(answer).trim().toLowerCase());

    case 'MATCHING':
      // answer é um array de { left, right } já validado pelo View
      return answer.every(pair =>
        question.pairs.some(p => p.left === pair.left && p.right === pair.right)
      );

    default:
      return false;
  }
}

async function advanceQuestion() {
  state.lesson.qIndex++;
  state.lesson.answered = false;

  const { questions, qIndex } = state.lesson;

  if (qIndex >= questions.length) {
    await finishLesson();
  } else {
    renderCurrentQuestion();
    View.setCheckButtonToVerify();
  }
}

async function finishLesson() {
  const elapsed  = Math.floor((Date.now() - state.lesson.startTime) / 1000);
  const total    = state.lesson.questions.length;
  const correct  = state.lesson.correctCount;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const xpGained = correct * 10;
  const stars    = accuracy === 100 ? 3 : accuracy >= 70 ? 2 : 1;

  // Persiste o progresso no backend
  try {
    await LessonProgressService.complete(state.lesson.lessonId);
  } catch (e) {
    console.warn('Não foi possível salvar o progresso:', e);
  }

  View.renderResult({ xpGained, accuracy, elapsed, stars });
  View.switchScreen('resultado');
}

function onLessonClose() {
  if (confirm('Sair da lição? Seu progresso será perdido.')) {
    resetLessonState();
    View.switchScreen('aprender');
  }
}

function onResultBack() {
  resetLessonState();
  loadTrail(); // recarrega a trilha para refletir o progresso salvo
  View.switchScreen('aprender');
}
