export const Renderer = {
  query(selector) {
    return document.querySelector(selector);
  },

  queryAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  },

  activateScreen(screenId) {
    this.queryAll('.screen').forEach(screen => screen.classList.remove('active'));
    const screen = this.query(`#screen-${screenId}`);
    if (screen) {
      screen.classList.add('active');
      screen.scrollTop = 0;
    }
  },

  activateNav(target) {
    this.queryAll('.nav-item[data-target]').forEach(item => item.classList.toggle('active', item.dataset.target === target));
  },

  renderXPFill(percent) {
    const fill = this.query('#xpFill');
    if (fill) fill.style.width = `${percent}%`;
  },

  renderLessonProgress(percent) {
    const fill = this.query('#lessonProgressFill');
    if (fill) fill.style.width = `${percent}%`;
  },

  renderLessonHearts(hearts) {
    const counter = this.query('#lessonHearts');
    if (counter) counter.textContent = hearts;
  },

  renderLessonBody(html) {
    const body = this.query('#lessonBody');
    if (body) body.innerHTML = html;
  },

  resetFeedback() {
    const fb = this.query('#lessonFeedback');
    if (fb) {
      fb.className = 'lesson-feedback';
      fb.textContent = '';
    }
  },

  renderFeedback(message, correct) {
    const fb = this.query('#lessonFeedback');
    if (!fb) return;
    fb.textContent = message;
    fb.className = `lesson-feedback show ${correct ? 'correct' : 'wrong'}`;
  },

  updateCheckButton({ text, disabled, nextMode }) {
    const button = this.query('#btnCheck');
    if (!button) return;
    button.textContent = text;
    button.disabled = disabled;
    button.className = disabled ? 'btn-lesson-check' : `btn-lesson-check${nextMode ? ' next-mode' : ''}`;
  },

  renderResult({ xp, accuracy, timeText, stars }) {
    const xpEl = this.query('#resultXP');
    const accEl = this.query('#resultAcc');
    const timeEl = this.query('#resultTime');
    const starsEl = this.query('#resultStars');

    if (xpEl) xpEl.textContent = `+${xp}`;
    if (accEl) accEl.textContent = `${accuracy}%`;
    if (timeEl) timeEl.textContent = timeText;
    if (starsEl) {
      starsEl.innerHTML = [1, 2, 3].map(n => `
        <span class="result-star" style="${n > stars ? 'filter:grayscale(1);opacity:.3' : ''}">⭐</span>
      `).join('');
    }
  },

  showToast(message) {
    const toast = this.query('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (this._toastTimer) {
      clearTimeout(this._toastTimer);
    }
    this._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  },

  bindNavClick(handler) {
    this.queryAll('.nav-item[data-target]').forEach(item => {
      item.addEventListener('click', () => handler(item.dataset.target));
    });
  },

  bindButton(selector, handler) {
    const button = this.query(selector);
    if (button) {
      button.addEventListener('click', handler);
    }
  },

  bindSearchInput(handler) {
    const input = this.query('.catalog-search-input');
    if (input) {
      input.addEventListener('input', () => handler(input.value));
    }
  },

  bindFilterButtons(handler) {
    this.queryAll('.filter-chip').forEach(button => {
      button.addEventListener('click', () => handler(button.dataset.filter));
    });
  },

  bindCatalogActions(addHandler) {
    const grid = this.query('#catalogGrid');
    if (!grid) return;
    grid.addEventListener('click', event => {
      const button = event.target.closest('.btn-catalog-add');
      if (!button) return;
      addHandler(button);
    });
  },

  bindStartLesson(handler) {
    const button = this.query('.js-start-lesson');
    if (button) {
      button.addEventListener('click', handler);
    }
  },

  setFilterActive(filter) {
    this.queryAll('.filter-chip').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });
  },

  setSearchValue(value) {
    const input = this.query('.catalog-search-input');
    if (input) input.value = value;
  },

  getSearchValue() {
    const input = this.query('.catalog-search-input');
    return input ? input.value : '';
  }
};
