// ═══════════════════════════════════════════════
// STATE — fonte única de verdade
// ═══════════════════════════════════════════════

export const state = {
  // Auth
  token: null,
  user: null,        // { id, name, email, xp, hearts, role }

  // Dados do perfil
  enrollment: null,  // { id, course: { id, nome }, enrolledAt }
  streak: null,      // { id, days, lastDay }

  // Trilha de aprendizado
  sections: [],      // [{ id, title, subtitle, color, lessons: [...] }]
  lessonProgress: [], // [{ lessonId, status, completed }]

  // Gerência (cursos do admin)
  courses: [],       // [{ id, nome }]

  // Navegação
  currentScreen: 'aprender',

  // Engine de lição
  lesson: {
    active: null,      // objeto Lesson atual
    questions: [],     // perguntas carregadas do backend
    qIndex: 0,
    hearts: 5,
    correctCount: 0,
    startTime: 0,
    answered: false,
    matchLeft: null,
    matchPaired: []
  }
};

export function resetLessonState(hearts = 5) {
  state.lesson = {
    active: null,
    questions: [],
    qIndex: 0,
    hearts,
    correctCount: 0,
    startTime: Date.now(),
    answered: false,
    matchLeft: null,
    matchPaired: []
  };
}
