/*
<!-- ── LOADING DA LIÇÃO ──────────────────── -->
    <div class="screen" id="screen-loading">
      <div class="loading-wrap">
        <div class="loading-icon-ring">
          <div class="loading-icon-inner">🟢</div>
        </div>
        <div class="loading-lesson-name">Introdução ao TypeScript</div>
        <div class="loading-sub">Preparando sua lição…</div>
        <div class="loading-bar-track"><div class="loading-bar-fill" id="loadingBar"></div></div>
        <div class="loading-tip">💡 <strong>Dica:</strong> TypeScript é um superset tipado de JavaScript.</div>
      </div>
    </div>
*/

export function renderLoading(lessonName, subText, tipText) {
    if (typeof lessonName !== "string" || typeof subText !== "string" || typeof tipText !== "string") {
        throw new Error("Os parâmetros 'lessonName', 'subText' e 'tipText' devem ser strings.");
    }

    let loadingScreen = document.createElement('div');
    loadingScreen.className = 'screen';
    loadingScreen.id = 'screen-loading';

    let loadingWrap = document.createElement('div');
    loadingWrap.className = 'loading-wrap';

    let iconRing = document.createElement('div');
    iconRing.className = 'loading-icon-ring';

    let iconInner = document.createElement('div');
    iconInner.className = 'loading-icon-inner';
    iconInner.textContent = '🟢';

    iconRing.appendChild(iconInner);

    let lessonNameElem = document.createElement('div');
    lessonNameElem.className = 'loading-lesson-name';
    lessonNameElem.textContent = lessonName;

    let subTextElem = document.createElement('div');
    subTextElem.className = 'loading-sub';
    subTextElem.textContent = subText;

    let loadingBarTrack = document.createElement('div');
    loadingBarTrack.className = 'loading-bar-track';

    let loadingBarFill = document.createElement('div');
    loadingBarFill.className = 'loading-bar-fill';
    loadingBarFill.id = 'loadingBar';

    loadingBarTrack.appendChild(loadingBarFill);

    let tipElem = document.createElement('div');
    tipElem.className = 'loading-tip';
    tipElem.innerHTML = `💡 <strong>Dica:</strong> ${tipText}`;
    
    loadingWrap.appendChild(iconRing);

    loadingWrap.appendChild(lessonNameElem);
    loadingWrap.appendChild(subTextElem);
    loadingWrap.appendChild(loadingBarTrack);
    loadingWrap.appendChild(tipElem);

    loadingScreen.appendChild(loadingWrap);

    return loadingScreen;
}