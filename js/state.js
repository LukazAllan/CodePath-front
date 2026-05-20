import * as api from './api.js';

export const state = {
  currentScreen: 'aprender',
  activeFilter: 'todos',
  toastTimer: null,
  lesson: {
    qIndex: 0,
    hearts: 5,
    correctCount: 0,
    startTime: 0,
    answered: false,
    matchLeft: null,
    matchPaired: []
  }
};

export function resetLessonState() {
  state.lesson = {
    qIndex: 0,
    hearts: 5,
    correctCount: 0,
    startTime: 0,
    answered: false,
    matchLeft: null,
    matchPaired: []
  };
}
