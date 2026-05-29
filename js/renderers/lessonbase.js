/*
<!-- ── LIÇÃO ─────────────────────────────── -->
    <div class="screen" id="screen-licao">
      <div class="lesson-topbar">
        <button class="lesson-close-btn" onclick="exitLesson()" title="Sair da lição">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="lesson-progress-track">
          <div class="lesson-progress-fill" id="lessonProgressFill"></div>
        </div>
        <div class="lesson-hearts">❤️ <span id="lessonHearts">5</span></div>
      </div>

      <div class="lesson-body" id="lessonBody">
        <!-- preenchido dinamicamente -->
      </div>

      <div class="lesson-footer">
        <div class="lesson-feedback" id="lessonFeedback"></div>
        <button class="btn-lesson-check" id="btnCheck" onclick="checkAnswer()" disabled>Verificar</button>
      </div>
    </div>
*/

export function renderLesson() {
    let lessonScreen = document.createElement('div');
    lessonScreen.className = 'screen';
    lessonScreen.id = 'screen-licao';

    // Topbar
    let topbar = document.createElement('div');
    topbar.className = 'lesson-topbar';

    let closeBtn = document.createElement('button');
    closeBtn.className = 'lesson-close-btn';
    closeBtn.title = 'Sair da lição';
    closeBtn.onclick = exitLesson;
    closeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    let progressTrack = document.createElement('div');
    progressTrack.className = 'lesson-progress-track';

    let progressFill = document.createElement('div');
    progressFill.className = 'lesson-progress-fill';
    progressFill.id = 'lessonProgressFill';

    progressTrack.appendChild(progressFill);

    let hearts = document.createElement('div');
    hearts.className = 'lesson-hearts';
    hearts.innerHTML = `❤️ <span id="lessonHearts">5</span>`;

    topbar.appendChild(closeBtn);
    topbar.appendChild(progressTrack);
    topbar.appendChild(hearts);

    // Body
    let body = document.createElement('div');
    body.className = 'lesson-body';
    body.id = 'lessonBody';

    // Footer
    let footer = document.createElement('div');
    footer.className = 'lesson-footer';

    let feedback = document.createElement('div');
    feedback.className = 'lesson-feedback';
    feedback.id = 'lessonFeedback';

    let checkBtn = document.createElement('button');
    checkBtn.className = 'btn-lesson-check';
    checkBtn.id = 'btnCheck';
    checkBtn.textContent = 'Verificar';
    checkBtn.disabled = true;
    checkBtn.onclick = checkAnswer;

    footer.appendChild(feedback);
    footer.appendChild(checkBtn);
    
    // Assemble screen
    lessonScreen.appendChild(topbar);
    lessonScreen.appendChild(body);
    lessonScreen.appendChild(footer);

    return lessonScreen;
}