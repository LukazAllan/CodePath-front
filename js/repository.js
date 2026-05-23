// ============================================================
//  repository.js
//  Responsabilidade ÚNICA: falar com o backend via HTTP.
//  Não contém lógica de negócio nem manipulação de DOM.
//
//  Equivalente ao @Repository do Spring:
//    UserRepository, CourseRepository, etc.
// ============================================================

const BASE_URL = 'http://localhost:8080';

// ─── Utilitário interno ───────────────────────────────────────

/**
 * Wrapper de fetch com tratamento de erros padronizado.
 * Lança um objeto { status, message } em caso de falha.
 */
async function http(path, options = {}) {
  const token = sessionStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw { status: response.status, message: text || response.statusText };
  }

  // 204 No Content não tem corpo
  if (response.status === 204) return null;

  return response.json();
}

// ─── Auth ─────────────────────────────────────────────────────

export const AuthRepository = {
  login:  (email, password)        => http('/auth/login',  { method: 'POST', body: JSON.stringify({ email, password }) }),
  signUp: (name, email, password)  => http('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  me:     (token)                  => http('/auth/me',     { method: 'POST', body: JSON.stringify({ token }) }),
};

// ─── Users ────────────────────────────────────────────────────

export const UserRepository = {
  findAll:    ()           => http('/users'),
  findById:   (id)         => http(`/users/${id}`),
  create:     (user)       => http('/users',     { method: 'POST',   body: JSON.stringify(user) }),
  update:     (id, user)   => http(`/users/${id}`, { method: 'PUT', body: JSON.stringify(user) }),
  deleteById: (id)         => http(`/users/${id}`, { method: 'DELETE' }),
};

// ─── Courses ──────────────────────────────────────────────────

export const CourseRepository = {
  findAll:    ()           => http('/courses'),
  findById:   (id)         => http(`/courses/${id}`),
  create:     (course)     => http('/courses',      { method: 'POST',   body: JSON.stringify(course) }),
  update:     (id, course) => http(`/courses/${id}`, { method: 'PUT',  body: JSON.stringify(course) }),
  deleteById: (id)         => http(`/courses/${id}`, { method: 'DELETE' }),
};

// ─── Sections ─────────────────────────────────────────────────

export const SectionRepository = {
  findAll:    ()             => http('/sections'),
  findById:   (id)           => http(`/sections/${id}`),
  create:     (section)      => http('/sections',       { method: 'POST',   body: JSON.stringify(section) }),
  update:     (id, section)  => http(`/sections/${id}`,  { method: 'PUT',  body: JSON.stringify(section) }),
  deleteById: (id)           => http(`/sections/${id}`,  { method: 'DELETE' }),
};

// ─── Lessons ──────────────────────────────────────────────────

export const LessonRepository = {
  findAll:    ()             => http('/lessons'),
  findById:   (id)           => http(`/lessons/${id}`),
  create:     (lesson)       => http('/lessons',        { method: 'POST',   body: JSON.stringify(lesson) }),
  update:     (id, lesson)   => http(`/lessons/${id}`,   { method: 'PUT',  body: JSON.stringify(lesson) }),
  deleteById: (id)           => http(`/lessons/${id}`,   { method: 'DELETE' }),
};

// ─── Questions ────────────────────────────────────────────────

export const QuestionRepository = {
  findAll:    ()               => http('/questions'),
  findById:   (id)             => http(`/questions/${id}`),
  create:     (question)       => http('/questions',         { method: 'POST',   body: JSON.stringify(question) }),
  update:     (id, question)   => http(`/questions/${id}`,    { method: 'PUT',  body: JSON.stringify(question) }),
  deleteById: (id)             => http(`/questions/${id}`,    { method: 'DELETE' }),
};

// ─── Answers ──────────────────────────────────────────────────

export const AnswerRepository = {
  findAll:    ()             => http('/answers'),
  findById:   (id)           => http(`/answers/${id}`),
  create:     (answer)       => http('/answers',        { method: 'POST',   body: JSON.stringify(answer) }),
  update:     (id, answer)   => http(`/answers/${id}`,   { method: 'PUT',  body: JSON.stringify(answer) }),
  deleteById: (id)           => http(`/answers/${id}`,   { method: 'DELETE' }),
};

// ─── Enrollments ──────────────────────────────────────────────

export const EnrollmentRepository = {
  findAll:       ()               => http('/enrollments'),
  findById:      (id)             => http(`/enrollments/${id}`),
  findByUserId:  (userId)         => http(`/enrollments?userId=${userId}`),
  create:        (enrollment)     => http('/enrollments',         { method: 'POST',   body: JSON.stringify(enrollment) }),
  update:        (id, enrollment) => http(`/enrollments/${id}`,    { method: 'PUT',  body: JSON.stringify(enrollment) }),
  deleteById:    (id)             => http(`/enrollments/${id}`,    { method: 'DELETE' }),
};

// ─── LessonProgress ───────────────────────────────────────────

export const LessonProgressRepository = {
  findAll:    ()               => http('/lesson-progress'),
  findById:   (id)             => http(`/lesson-progress/${id}`),
  create:     (progress)       => http('/lesson-progress',        { method: 'POST',   body: JSON.stringify(progress) }),
  update:     (id, progress)   => http(`/lesson-progress/${id}`,   { method: 'PUT',  body: JSON.stringify(progress) }),
  deleteById: (id)             => http(`/lesson-progress/${id}`,   { method: 'DELETE' }),
};

// ─── Streaks ──────────────────────────────────────────────────

export const StreakRepository = {
  findAll:       ()                      => http('/streaks'),
  findById:      (id)                    => http(`/streaks/${id}`),
  findAllByDays: (days)                  => http(`/streaks?days=${days}`),
  revokeDaysById:(id)                    => http('/streaks/revoke',   { method: 'POST', body: JSON.stringify({ id }) }),
  setDaysByUserId:(userId, days)         => http('/streaks/set-days', { method: 'POST', body: JSON.stringify({ userId, days }) }),
};

// ─── Sessions ─────────────────────────────────────────────────

export const SessionRepository = {
  findAll:    ()   => http('/sessions'),
  findById:   (id) => http(`/sessions/${id}`),
  revoke:     (id) => http(`/sessions/${id}/revoke`,   { method: 'POST' }),
  refresh:    (id) => http(`/sessions/${id}/refresh`,  { method: 'POST' }),
  deleteById: (id) => http(`/sessions/${id}`,          { method: 'DELETE' }),
};

// ─── Suggestions ──────────────────────────────────────────────

export const SuggestionRepository = {
  findAll:    ()                  => http('/suggestions'),
  findById:   (id)                => http(`/suggestions/${id}`),
  create:     (suggestion)        => http('/suggestions',          { method: 'POST',   body: JSON.stringify(suggestion) }),
  update:     (id, suggestion)    => http(`/suggestions/${id}`,     { method: 'PUT',  body: JSON.stringify(suggestion) }),
  deleteById: (id)                => http(`/suggestions/${id}`,     { method: 'DELETE' }),
};
