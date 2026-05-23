// ============================================================
//  service.js
//  Responsabilidade: regras de negócio e orquestração.
//  Recebe dados crus do repository, devolve dados prontos
//  para o controller consumir.
//
//  Equivalente ao @Service do Spring:
//    AuthService, CourseService, LessonService, etc.
// ============================================================

import {
  AuthRepository,
  UserRepository,
  CourseRepository,
  SectionRepository,
  LessonRepository,
  QuestionRepository,
  AnswerRepository,
  EnrollmentRepository,
  LessonProgressRepository,
  StreakRepository,
  SessionRepository,
  SuggestionRepository,
} from './repository.js';

import {
  makeUser,
  makeCourse,
  makeSection,
  makeLesson,
  makeQuestion,
  makeLessonProgress,
  makeStreak,
  LessonProgressStatus,
} from './model/entities.js';

// ─── Auth ─────────────────────────────────────────────────────

export const AuthService = {

  async login(email, password) {
    const data = await AuthRepository.login(email, password);
    // Persiste o token na sessão para o repository.js injetar automaticamente
    sessionStorage.setItem('token', data.token);
    return data;
  },

  async signUp(name, email, password) {
    return AuthRepository.signUp(name, email, password);
  },

  async me() {
    const token = sessionStorage.getItem('token');
    if (!token) throw { status: 401, message: 'Sem sessão ativa.' };
    return AuthRepository.me(token);
  },

  logout() {
    sessionStorage.removeItem('token');
  },

  isLoggedIn() {
    return !!sessionStorage.getItem('token');
  },
};

// ─── User ─────────────────────────────────────────────────────

export const UserService = {
  findAll:    ()           => UserRepository.findAll().then(list => list.map(makeUser)),
  findById:   (id)         => UserRepository.findById(id).then(makeUser),
  create:     (user)       => UserRepository.create(user),
  update:     (id, user)   => UserRepository.update(id, user),
  deleteById: (id)         => UserRepository.deleteById(id),
};

// ─── Course ───────────────────────────────────────────────────

export const CourseService = {
  findAll:    ()             => CourseRepository.findAll().then(list => list.map(makeCourse)),
  findById:   (id)           => CourseRepository.findById(id).then(makeCourse),
  create:     (course)       => CourseRepository.create(course),
  update:     (id, course)   => CourseRepository.update(id, course),
  deleteById: (id)           => CourseRepository.deleteById(id),
};

// ─── Section ──────────────────────────────────────────────────

export const SectionService = {
  findAll:    ()              => SectionRepository.findAll().then(list => list.map(makeSection)),
  findById:   (id)            => SectionRepository.findById(id).then(makeSection),
  create:     (section)       => SectionRepository.create(section),
  update:     (id, section)   => SectionRepository.update(id, section),
  deleteById: (id)            => SectionRepository.deleteById(id),
};

// ─── Lesson ───────────────────────────────────────────────────

export const LessonService = {
  findAll:    ()             => LessonRepository.findAll().then(list => list.map(makeLesson)),
  findById:   (id)           => LessonRepository.findById(id).then(makeLesson),
  create:     (lesson)       => LessonRepository.create(lesson),
  update:     (id, lesson)   => LessonRepository.update(id, lesson),
  deleteById: (id)           => LessonRepository.deleteById(id),
};

// ─── Question ─────────────────────────────────────────────────

export const QuestionService = {
  findAll:    ()               => QuestionRepository.findAll().then(list => list.map(makeQuestion)),
  findById:   (id)             => QuestionRepository.findById(id).then(makeQuestion),
  create:     (question)       => QuestionRepository.create(question),
  update:     (id, question)   => QuestionRepository.update(id, question),
  deleteById: (id)             => QuestionRepository.deleteById(id),

  /** Retorna as questões de uma lição específica filtrando client-side. */
  async findByLessonId(lessonId) {
    const all = await QuestionService.findAll();
    return all.filter(q => q.lesson?.id === lessonId);
  },
};

// ─── Answer ───────────────────────────────────────────────────

export const AnswerService = {
  findAll:    ()             => AnswerRepository.findAll(),
  findById:   (id)           => AnswerRepository.findById(id),
  create:     (answer)       => AnswerRepository.create(answer),
  update:     (id, answer)   => AnswerRepository.update(id, answer),
  deleteById: (id)           => AnswerRepository.deleteById(id),
};

// ─── Enrollment ───────────────────────────────────────────────

export const EnrollmentService = {
  findAll:      ()               => EnrollmentRepository.findAll(),
  findById:     (id)             => EnrollmentRepository.findById(id),
  findByUserId: (userId)         => EnrollmentRepository.findByUserId(userId),
  create:       (enrollment)     => EnrollmentRepository.create(enrollment),
  update:       (id, enrollment) => EnrollmentRepository.update(id, enrollment),
  deleteById:   (id)             => EnrollmentRepository.deleteById(id),

  /** Retorna os cursos em que o usuário está matriculado. */
  async getCoursesForUser(userId) {
    const enrollments = await EnrollmentService.findByUserId(userId);
    return enrollments.map(e => e.course).filter(Boolean);
  },
};

// ─── LessonProgress ───────────────────────────────────────────

export const LessonProgressService = {
  findAll:    ()               => LessonProgressRepository.findAll().then(list => list.map(makeLessonProgress)),
  findById:   (id)             => LessonProgressRepository.findById(id).then(makeLessonProgress),
  create:     (progress)       => LessonProgressRepository.create(progress),
  update:     (id, progress)   => LessonProgressRepository.update(id, progress),
  deleteById: (id)             => LessonProgressRepository.deleteById(id),

  /** Marca uma lição como concluída. */
  async complete(progressId) {
    return LessonProgressService.update(progressId, {
      status:      LessonProgressStatus.DONE,
      completed:   true,
      completedAt: new Date().toISOString(),
    });
  },
};

// ─── Streak ───────────────────────────────────────────────────

export const StreakService = {
  findAll:        ()                 => StreakRepository.findAll().then(list => list.map(makeStreak)),
  findById:       (id)               => StreakRepository.findById(id).then(makeStreak),
  findAllByDays:  (days)             => StreakRepository.findAllByDays(days),
  revokeDaysById: (id)               => StreakRepository.revokeDaysById(id),
  setDaysByUserId:(userId, days)     => StreakRepository.setDaysByUserId(userId, days),
};

// ─── Session ──────────────────────────────────────────────────

export const SessionService = {
  findAll:    ()   => SessionRepository.findAll(),
  findById:   (id) => SessionRepository.findById(id),
  revoke:     (id) => SessionRepository.revoke(id),
  refresh:    (id) => SessionRepository.refresh(id),
  deleteById: (id) => SessionRepository.deleteById(id),
};

// ─── Suggestion ───────────────────────────────────────────────

export const SuggestionService = {
  findAll:    ()                => SuggestionRepository.findAll(),
  findById:   (id)              => SuggestionRepository.findById(id),
  create:     (suggestion)      => SuggestionRepository.create(suggestion),
  update:     (id, suggestion)  => SuggestionRepository.update(id, suggestion),
  deleteById: (id)              => SuggestionRepository.deleteById(id),
};
