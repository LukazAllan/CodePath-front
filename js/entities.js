// ============================================================
//  model/entities.js
//  Espelha as entidades do backend Java.
//  Sem lógica — só estrutura e constantes.
// ============================================================

export const QuestionType = Object.freeze({
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE:      'TRUE_FALSE',
  SHORT_TEXT:      'SHORT_TEXT',
  MATCHING:        'MATCHING',
});

export const LessonProgressStatus = Object.freeze({
  LOCKED: 'LOCKED',
  ACTIVE: 'ACTIVE',
  DONE:   'DONE',
});

export const RoleEnum = Object.freeze({
  USER:  'USER',
  ADMIN: 'ADMIN',
});

export const SuggestionStatus = Object.freeze({
  PENDING:  'PENDING',
  APPROVED: 'APROVED',   // mantém o typo do backend
  REJECTED: 'REJECTED',
});

// ------- Factories (constroem objetos com defaults seguros) -------

export function makeUser(data = {}) {
  return {
    id:             data.id             ?? null,
    name:           data.name           ?? '',
    email:          data.email          ?? '',
    xp:             data.xp             ?? 0,
    hearts:         data.hearts         ?? 5,
    role:           data.role           ?? RoleEnum.USER,
    lessonProgress: data.lessonProgress ?? [],
  };
}

export function makeCourse(data = {}) {
  return {
    id:   data.id   ?? null,
    nome: data.nome ?? '',
  };
}

export function makeSection(data = {}) {
  return {
    id:       data.id       ?? null,
    title:    data.title    ?? '',
    subtitle: data.subtitle ?? '',
    color:    data.color    ?? '',
    icon:     data.icon     ?? '',
    ordem:    data.ordem    ?? 0,
    course:   data.course   ?? null,
  };
}

export function makeLesson(data = {}) {
  return {
    id:      data.id      ?? null,
    name:    data.name    ?? '',
    content: data.content ?? '',
    ordem:   data.ordem   ?? 0,
    active:  data.active  ?? true,
    section: data.section ?? null,
  };
}

export function makeQuestion(data = {}) {
  return {
    id:              data.id              ?? null,
    type:            data.type            ?? QuestionType.MULTIPLE_CHOICE,
    label:           data.label           ?? '',
    prompt:          data.prompt          ?? '',
    code:            data.code            ?? null,
    options:         data.options         ?? [],
    correct:         data.correct         ?? 0,
    hint:            data.hint            ?? null,
    pairs:           data.pairs           ?? [],
    acceptedAnswers: data.acceptedAnswers ?? [],
    lesson:          data.lesson          ?? null,
  };
}

export function makeEnrollment(data = {}) {
  return {
    id:         data.id         ?? null,
    user:       data.user       ?? null,
    course:     data.course     ?? null,
    enrolledAt: data.enrolledAt ?? null,
  };
}

export function makeLessonProgress(data = {}) {
  return {
    id:          data.id          ?? null,
    user:        data.user        ?? null,
    lesson:      data.lesson      ?? null,
    status:      data.status      ?? LessonProgressStatus.LOCKED,
    completed:   data.completed   ?? false,
    completedAt: data.completedAt ?? null,
  };
}

export function makeStreak(data = {}) {
  return {
    id:      data.id      ?? null,
    user:    data.user    ?? null,
    days:    data.days    ?? 0,
    lastDay: data.lastDay ?? null,
  };
}

export function makeSession(data = {}) {
  return {
    id:           data.id           ?? null,
    token:        data.token        ?? '',
    lastActivity: data.lastActivity ?? null,
    platform:     data.platform     ?? '',
    userAgent:    data.userAgent    ?? '',
  };
}
