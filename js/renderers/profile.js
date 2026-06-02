/*
<!-- ── PERFIL ───────────────────────────── -->
    <div class="screen" id="screen-perfil">
      <div class="profile-hero">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar">AL</div>
          <div class="profile-level-badge">Nv. 4</div>
        </div>
        <div class="profile-name">Allan Lucas</div>
        <div class="profile-tag">@allanlucas · Membro desde jan/2025</div>
        <div class="profile-course-pill">🟦 TypeScript do Zero</div>
      </div>

      <div class="stats-grid">
        <div class="stat-card green">
          <div class="stat-card-icon">⚡</div>
          <div class="stat-card-value">420</div>
          <div class="stat-card-label">XP Total</div>
        </div>
        <div class="stat-card yellow">
          <div class="stat-card-icon">🔥</div>
          <div class="stat-card-value">7</div>
          <div class="stat-card-label">Dias Seguidos</div>
        </div>
        <div class="stat-card blue">
          <div class="stat-card-icon">✅</div>
          <div class="stat-card-value">24</div>
          <div class="stat-card-label">Lições Feitas</div>
        </div>
      </div>

      <div class="streak-section">
        <div class="streak-title">🗓️ Atividade da semana</div>
        <div class="week-strip">
          <div class="day-dot"><div class="day-dot-label">Seg</div><div class="day-dot-circle done">✓</div></div>
          <div class="day-dot"><div class="day-dot-label">Ter</div><div class="day-dot-circle done">✓</div></div>
          <div class="day-dot"><div class="day-dot-label">Qua</div><div class="day-dot-circle done">✓</div></div>
          <div class="day-dot"><div class="day-dot-label">Qui</div><div class="day-dot-circle miss">✗</div></div>
          <div class="day-dot"><div class="day-dot-label">Sex</div><div class="day-dot-circle done">✓</div></div>
          <div class="day-dot"><div class="day-dot-label">Sáb</div><div class="day-dot-circle done">✓</div></div>
          <div class="day-dot"><div class="day-dot-label">Dom</div><div class="day-dot-circle today">●</div></div>
        </div>
      </div>
    </div>
*/

export function renderProfile(profileAvatar, profileLevel, profileName, profileTag, openCourseName, xpTotal, streakDays, lessonsDone, weeklyActivity) {
    if (typeof profileAvatar !== "string" || typeof profileLevel !== "string" || typeof profileName !== "string" || typeof profileTag !== "string" || typeof openCourseName !== "string") {
        throw new Error("Os parâmetros de perfil devem ser strings.");
    }
    if (typeof xpTotal !== "number" || typeof streakDays !== "number" || typeof lessonsDone !== "number") {
        throw new Error("Os parâmetros 'xpTotal', 'streakDays' e 'lessonsDone' devem ser números.");
    }
    if (weeklyActivity.constructor.name !== "Array") {
        throw new Error("O parâmetro 'weeklyActivity' deve ser um array.");
    }

    let profileScreen = document.createElement('div');
    profileScreen.className = 'screen';
    profileScreen.id = 'screen-perfil';

    // Hero Section
    let heroSection = document.createElement('div');
    heroSection.className = 'profile-hero';

    let avatarWrap = document.createElement('div');
    avatarWrap.className = 'profile-avatar-wrap';

    let avatar = document.createElement('div');
    avatar.className = 'profile-avatar';
    avatar.textContent = profileAvatar;

    let levelBadge = document.createElement('div');
    levelBadge.className = 'profile-level-badge';
    levelBadge.textContent = `Nv. ${profileLevel}`;

    avatarWrap.appendChild(avatar);
    avatarWrap.appendChild(levelBadge);

    let nameElem = document.createElement('div');
    nameElem.className = 'profile-name';
    nameElem.textContent = profileName;

    let tagElem = document.createElement('div');
    tagElem.className = 'profile-tag';
    tagElem.textContent = profileTag;

    let coursePill = document.createElement('div');
    coursePill.className = 'profile-course-pill';
    coursePill.textContent = `🟦 ${openCourseName}`;

    heroSection.appendChild(avatarWrap);
    heroSection.appendChild(nameElem);
    heroSection.appendChild(tagElem);
    heroSection.appendChild(coursePill);

    let statsGrid = document.createElement('div');
    statsGrid.className = 'stats-grid';

    let xpCard = document.createElement('div');
    xpCard.className = 'stat-card green';
    xpCard.innerHTML = `<div class="stat-card-icon">⚡</div><div class="stat-card-value">${xpTotal}</div><div class="stat-card-label">XP Total</div>`;

    let streakCard = document.createElement('div');
    streakCard.className = 'stat-card yellow';
    streakCard.innerHTML = `<div class="stat-card-icon">🔥</div><div class="stat-card-value">${streakDays}</div><div class="stat-card-label">Dias Seguidos</div>`;

    let lessonsCard = document.createElement('div');
    lessonsCard.className = 'stat-card blue';
    lessonsCard.innerHTML = `<div class="stat-card-icon">✅</div><div class="stat-card-value">${lessonsDone}</div><div class="stat-card-label">Lições Feitas</div>`;

    statsGrid.appendChild(xpCard);
    statsGrid.appendChild(streakCard);
    statsGrid.appendChild(lessonsCard);

    let streakSection = document.createElement('div');
    streakSection.className = 'streak-section';

    let streakTitle = document.createElement('div');
    streakTitle.className = 'streak-title';
    streakTitle.textContent = '🗓️ Atividade da semana';

    let weekStrip = document.createElement('div');
    weekStrip.className = 'week-strip';

    weeklyActivity.forEach(day => {
        let dayDot = document.createElement('div');
        dayDot.className = 'day-dot';

        let dayLabel = document.createElement('div');
        dayLabel.className = 'day-dot-label';
        dayLabel.textContent = day.label;

        let dayCircle = document.createElement('div');
        dayCircle.className = `day-dot-circle ${day.status}`;
        dayCircle.textContent = day.status === 'done' ? '✓' : (day.status === 'miss' ? '✗' : '●');

        dayDot.appendChild(dayLabel);
        dayDot.appendChild(dayCircle);
        weekStrip.appendChild(dayDot);
    });

    streakSection.appendChild(streakTitle);
    streakSection.appendChild(weekStrip);

    profileScreen.appendChild(heroSection);

    profileScreen.appendChild(statsGrid);

    profileScreen.appendChild(streakSection);

    return profileScreen;
}