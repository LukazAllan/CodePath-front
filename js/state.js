// ============================================================
//  state.js
//  Estado global da aplicação — fonte única da verdade.
//  Ninguém manipula o DOM a partir daqui; só dados.
// ============================================================

export const state = {
  // ── Navegação ──────────────────────────────────────────────
  currentScreen: 'aprender',
  activeFilter:  'todos',

  // ── Usuário autenticado ────────────────────────────────────
  user: null,          // objeto makeUser()
  enrollments: [],     // lista de matrículas do usuário

  // ── Trilha de aprendizado ──────────────────────────────────
  trail: {
    sections:  [],     // Section[]
    lessons:   [],     // Lesson[]
    progress:  [],     // LessonProgress[]
  },

  // ── Lição em andamento ─────────────────────────────────────
  lesson: {
    lessonId:     null,
    questions:    [],    // Question[]
    qIndex:       0,
    hearts:       5,
    correctCount: 0,
    startTime:    0,
    answered:     false,
    // estado interno de matching
    matchLeft:    null,
    matchPaired:  [],
  },

  // ── UI ─────────────────────────────────────────────────────
  toastTimer: null,
};

// ─── Helpers de mutação ───────────────────────────────────────

export function setUser(user) {
  state.user = user;
}

export function setEnrollments(list) {
  state.enrollments = list;
}

export function setTrail({ sections = [], lessons = [], progress = [] } = {}) {
  state.trail.sections = sections;
  state.trail.lessons  = lessons;
  state.trail.progress = progress;
}

export function resetLessonState() {
  state.lesson = {
    lessonId:     null,
    questions:    [],
    qIndex:       0,
    hearts:       5,
    correctCount: 0,
    startTime:    Date.now(),
    answered:     false,
    matchLeft:    null,
    matchPaired:  [],
  };
}

export function setCurrentScreen(name) {
  state.currentScreen = name;
}
