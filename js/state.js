// ═══════════════════════════════════════════════
// STATE — fonte única de verdade
// ═══════════════════════════════════════════════

import * as api from "./api.js";
import { HREFS } from "./href.js";

export class State {
  constructor() {
    this.token = null;
    this.user = null; // { id, name, email, xp, hearts, role }

    // Dados do perfil
    this.enrollment = null; // { id, course: { id, nome }, enrolledAt }
    this.streak = null; // { id, days, lastDay }

    // Trilha de aprendizado
    this.sections = []; // [{ id, title, subtitle, color, lessons: [...] }]
    this.lessonProgress = []; // [{ lessonId, status, completed }]

    // Gerência (cursos do admin)
    this.courses = []; // [{ id, nome }]

    // Navegação
    this.currentScreen = "aprender";
    this.currentCourse = null; // { id, name }

    // Engine de lição
    this.lesson = {
      active: null, // objeto Lesson atual
      questions: [], // perguntas carregadas do backend
      qIndex: 0,
      hearts: 5,
      correctCount: 0,
      startTime: 0,
      answered: false,
      matchLeft: null,
      matchPaired: [],
    };
  }

  resetLessonState(hearts = 5) {
    this.lesson = {
      active: null,
      questions: [],
      qIndex: 0,
      hearts,
      correctCount: 0,
      startTime: Date.now(),
      answered: false,
      matchLeft: null,
      matchPaired: [],
    };
  }

  logout() {
    this.token = null;
    this.user = null;
    this.enrollment = null;
    this.streak = null;
    this.sections = [];
    this.lessonProgress = [];
    this.courses = [];
    this.currentScreen = "aprender";
    this.lesson = {
      active: null,
      questions: [],
      qIndex: 0,
      hearts: 5,
      correctCount: 0,
      startTime: 0,
      answered: false,
      matchLeft: null,
      matchPaired: [],
    };
  }

  updateAll() {
    if (!this.token){
      console.warn("Token not available");
      window.location.href = HREFS.LOGIN;
    }

    
  }

  // Getters
  getToken() {
    return this.token;
  }
  getUser() {
    return this.user;
  }
  getEnrollment() {
    return this.enrollment;
  }
  getStreak() {
    return this.streak;
  }
  getSections() {
    return this.sections;
  }
  getLessonProgress() {
    return this.lessonProgress;
  }
  getCourses() {
    return this.courses;
  }
  getCurrentScreen() {
    return this.currentScreen;
  }
  getLesson() {
    return this.lesson;
  }

  getCurrentCourse() {
    return this.currentCourse;
  }

  // Setters
  setToken(token) {
    this.token = token;
  }
  setUser(user) {
    this.user = user;
  }
  setEnrollment(enrollment) {
    this.enrollment = enrollment;
  }
  setStreak(streak) {
    this.streak = streak;
  }
  setSections(sections) {
    this.sections = sections;
  }
  setLessonProgress(lessonProgress) {
    this.lessonProgress = lessonProgress;
  }
  setCourses(courses) {
    this.courses = courses;
  }
  setCurrentScreen(screen) {
    this.currentScreen = screen;
  }
  setLesson(lesson) {
    this.lesson = lesson;
  }
  setCurrentCourse(course) {
    this.currentCourse = course;
  }
}

// Singleton instance for the app state (convenience import)
export const appState = new State();
export default appState;
