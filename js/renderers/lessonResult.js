/*
    <!-- ── RESULTADO DA LIÇÃO ─────────────────── -->
    <div class="screen" id="screen-resultado">
      <div class="result-wrap">
        <div class="result-trophy">🏆</div>
        <div class="result-title">Lição Concluída!</div>
        <div class="result-subtitle">Introdução ao TypeScript</div>

        <div class="result-stats">
          <div class="result-stat xp">
            <div class="result-stat-icon">⚡</div>
            <div class="result-stat-value" id="resultXP">+50</div>
            <div class="result-stat-label">XP Ganho</div>
          </div>
          <div class="result-stat acc">
            <div class="result-stat-icon">🎯</div>
            <div class="result-stat-value" id="resultAcc">100%</div>
            <div class="result-stat-label">Precisão</div>
          </div>
          <div class="result-stat time">
            <div class="result-stat-icon">⏱️</div>
            <div class="result-stat-value" id="resultTime">1m 42s</div>
            <div class="result-stat-label">Tempo</div>
          </div>
        </div>

        <div class="result-stars" id="resultStars">
          <span class="result-star">⭐</span>
          <span class="result-star">⭐</span>
          <span class="result-star">⭐</span>
        </div>

        <button class="btn-result-back" onclick="finishLesson()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
          Voltar à Trilha
        </button>
      </div>
    </div>
*/

export function renderLessonResult(lessonTitle, xpGained, accuracy, timeTaken, starsEarned) {
    if (typeof lessonTitle !== "string" || typeof xpGained !== "number" || typeof accuracy !== "string" || typeof timeTaken !== "string" || typeof starsEarned !== "number") {
        throw new Error("Os parâmetros 'lessonTitle', 'xpGained', 'accuracy', 'timeTaken' e 'starsEarned' devem ser do tipo correto.");
    }

    let resultScreen = document.createElement('div');
    resultScreen.className = 'screen';
    resultScreen.id = 'screen-resultado';

    let resultWrap = document.createElement('div');
    resultWrap.className = 'result-wrap';

    let trophy = document.createElement('div');
    trophy.className = 'result-trophy';
    trophy.textContent = '🏆';

    let title = document.createElement('div');
    title.className = 'result-title';
    title.textContent = 'Lição Concluída!';
    
    let subtitle = document.createElement('div');
    subtitle.className = 'result-subtitle';
    subtitle.textContent = lessonTitle;

    let stats = document.createElement('div');
    stats.className = 'result-stats';

    let statXP = document.createElement('div');
    statXP.className = 'result-stat xp';
    statXP.innerHTML = `<div class="result-stat-icon">⚡</div><div class="result-stat-value" id="resultXP">+${xpGained}</div><div class="result-stat-label">XP Ganho</div>`;

    let statAcc = document.createElement('div');
    statAcc.className = 'result-stat acc';
    statAcc.innerHTML = `<div class="result-stat-icon">🎯</div><div class="result-stat-value" id="resultAcc">${accuracy}</div><div class="result-stat-label">Precisão</div>`;

    let statTime = document.createElement('div');
    statTime.className = 'result-stat time';
    statTime.innerHTML = `<div class="result-stat-icon">⏱️</div><div class="result-stat-value" id="resultTime">${timeTaken}</div><div class="result-stat-label">Tempo</div>`;

    stats.appendChild(statXP);
    stats.appendChild(statAcc);
    stats.appendChild(statTime);

    let stars = document.createElement('div');
    stars.className = 'result-stars';
    stars.id = 'resultStars';
    for (let i = 0; i < starsEarned; i++) {
        let star = document.createElement('span');
        star.className = 'result-star';
        star.textContent = '⭐';
        stars.appendChild(star);
    }

    let backButton = document.createElement('button');
    backButton.className = 'btn-result-back';
    backButton.onclick = () => { if (typeof window.finishLesson === 'function') window.finishLesson(); };
    backButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg> Voltar à Trilha`;
    
    resultWrap.appendChild(trophy);
    resultWrap.appendChild(title);
    resultWrap.appendChild(subtitle);
    resultWrap.appendChild(stats);
    resultWrap.appendChild(stars);
    resultWrap.appendChild(backButton);

    resultScreen.appendChild(resultWrap);

    return resultScreen;
}