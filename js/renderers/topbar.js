/*
  <header class="topbar">
    <div class="course-badge">
      <div class="course-dot">🟦</div>
      <div class="course-info">
        <div class="course-label">Curso ativo</div>
        <div class="course-name">TypeScript do Zero</div>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-pill hearts"><span class="pill-icon">❤️</span>5</div>
      <div class="stat-pill xp"><span class="pill-icon">⚡</span>420 XP</div>
    </div>
  </header>
*/

export function renderTopBar(courseName, hearts, xp, courseLabel="Curso Ativo") {
  var topBar = document.createElement('header');
  topBar.className = 'topbar';

  var courseBadge = document.createElement('div');
  courseBadge.className = 'course-badge';

  var courseDot = document.createElement('div');
  courseDot.className = 'course-dot';
  courseDot.textContent = '🟦';

  var courseInfo = document.createElement('div');
  courseInfo.className = 'course-info';

  var courseLabelElement = document.createElement('div');
  courseLabelElement.className = 'course-label';
  courseLabelElement.textContent = courseLabel;

  var courseNameElement = document.createElement('div');
  courseNameElement.className = 'course-name';
  courseNameElement.textContent = courseName;

  courseInfo.appendChild(courseLabelElement);
  courseInfo.appendChild(courseNameElement);

  courseBadge.appendChild(courseDot);
  courseBadge.appendChild(courseInfo);

  topBar.appendChild(courseBadge);

  var statsRow = document.createElement('div');
  statsRow.className = 'stats-row';

  var heartsPill = document.createElement('div');
  heartsPill.className = 'stat-pill hearts';
  heartsPill.innerHTML = `<span class="pill-icon">❤️</span>${hearts}`;

  var xpPill = document.createElement('div');
  xpPill.className = 'stat-pill xp';
  xpPill.innerHTML = `<span class="pill-icon">⚡</span>${xp} XP`;

  statsRow.appendChild(heartsPill);
  statsRow.appendChild(xpPill);

  topBar.appendChild(statsRow);

  return topBar;
}