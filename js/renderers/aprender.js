/*
    <!-- ── APRENDER ─────────────────────────── -->
    <div class="screen active" id="screen-aprender">
      <div class="xp-bar-wrap">
        <div class="xp-bar-label">
          <span>Nível 4</span><span>420 / 1200 XP</span>
        </div>
        <div class="xp-bar-track">
          <div class="xp-bar-fill" id="xpFill"></div>
        </div>
      </div>

      <div class="trail-section-header green">
        <span class="section-hicon">🟢</span>
        <div>
          <div class="section-htitle">Seção 1 — Fundamentos</div>
          <div class="section-hsub">Tipos, variáveis e funções básicas</div>
        </div>
      </div>
      <div class="trail-path">
        <div class="bubble-row pos-center">
          <div class="bubble-wrap" onclick="startLesson()" style="cursor: pointer">
            <div class="bubble-tooltip">Introdução ao TypeScript</div>
            <div class="bubble done">🟢</div>
            <div class="bubble-stars">
              <div class="star"></div>
              <div class="star"></div>
              <div class="star"></div>
            </div>
          </div>
        </div>
        <div class="zz-connector done"></div>
        <div class="bubble-row pos-right">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">Tipos Primitivos</div>
            <div class="bubble done">📦</div>
            <div class="bubble-stars">
              <div class="star"></div>
              <div class="star"></div>
              <div class="star empty"></div>
            </div>
          </div>
        </div>
        <div class="zz-connector done"></div>
        <div class="bubble-row pos-center">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">Funções e Tipagem</div>
            <div class="bubble done">⚙️</div>
            <div class="bubble-stars">
              <div class="star"></div>
              <div class="star empty"></div>
              <div class="star empty"></div>
            </div>
          </div>
        </div>
        <div class="zz-connector done"></div>
        <div class="bubble-row pos-left">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">Arrays e Tuplas</div>
            <div class="bubble done">🗂️</div>
            <div class="bubble-stars">
              <div class="star"></div>
              <div class="star"></div>
              <div class="star"></div>
            </div>
          </div>
        </div>
        <div class="zz-connector done"></div>
        <div class="bubble-row pos-center">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">Interfaces e Types</div>
            <div class="bubble active">🏆</div>
          </div>
        </div>
        <div class="zz-connector locked"></div>
        <div class="bubble-row pos-right">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
      </div>

      <button class="btn-start">▶ Iniciar Lição</button>
      <div style="height: 36px"></div>

      <div class="trail-section-header purple">
        <span class="section-hicon">🟣</span>
        <div>
          <div class="section-htitle">Seção 2 — Orientação a Objetos</div>
          <div class="section-hsub">Classes, herança e encapsulamento</div>
        </div>
      </div>
      <div class="trail-path">
        <div class="bubble-row pos-center">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
        <div class="zz-connector locked"></div>
        <div class="bubble-row pos-left">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
        <div class="zz-connector locked"></div>
        <div class="bubble-row pos-center">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
        <div class="zz-connector locked"></div>
        <div class="bubble-row pos-right">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
      </div>
      <div style="height: 36px"></div>

      <div class="trail-section-header orange">
        <span class="section-hicon">🟠</span>
        <div>
          <div class="section-htitle">Seção 3 — Generics & Avançado</div>
          <div class="section-hsub">Genéricos, utilitários e decorators</div>
        </div>
      </div>
      <div class="trail-path">
        <div class="bubble-row pos-center">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
        <div class="zz-connector locked"></div>
        <div class="bubble-row pos-right">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
        <div class="zz-connector locked"></div>
        <div class="bubble-row pos-left">
          <div class="bubble-wrap">
            <div class="bubble-tooltip">🔒 Bloqueado</div>
            <div class="bubble locked">🔒</div>
          </div>
        </div>
      </div>
      <div style="height: 60px"></div>
    </div>
*/
export function renderXpBarWrap(currentXp, nextLevelXp) {
  var xpBarWrap = document.createElement("div");
  xpBarWrap.className = "xp-bar-wrap";

  var xpBarLabel = document.createElement("div");
  xpBarLabel.className = "xp-bar-label";
  xpBarLabel.innerHTML = `<span>Nível ${Math.floor(currentXp / 1000) + 1}</span><span>${currentXp} / ${nextLevelXp} XP</span>`;

  var xpBarTrack = document.createElement("div");
  xpBarTrack.className = "xp-bar-track";

  var xpBarFill = document.createElement("div");
  xpBarFill.className = "xp-bar-fill";
  xpBarFill.style.width = `${(currentXp / nextLevelXp) * 100}%`;

  xpBarTrack.appendChild(xpBarFill);
  xpBarWrap.appendChild(xpBarLabel);
  xpBarWrap.appendChild(xpBarTrack);

  return xpBarWrap;
}

export function renderTrailSectionHeader(color, icon, title, subtitle) {
  var sectionHeader = document.createElement("div");
  sectionHeader.className = `trail-section-header ${color}`;

  var sectionIcon = document.createElement("span");
  sectionIcon.className = "section-hicon";
  sectionIcon.textContent = icon;

  var sectionText = document.createElement("div");
  var sectionTitle = document.createElement("div");
  sectionTitle.className = "section-htitle";
  sectionTitle.textContent = title;
  var sectionSubtitle = document.createElement("div");
  sectionSubtitle.className = "section-hsub";
  sectionSubtitle.textContent = subtitle;

  sectionText.appendChild(sectionTitle);
  sectionText.appendChild(sectionSubtitle);
  sectionHeader.appendChild(sectionIcon);
  sectionHeader.appendChild(sectionText);

  return sectionHeader;
}

export function renderTrailPath() {
  var trailPath = document.createElement("div");
  trailPath.className = "trail-path";

  // Aqui você pode adicionar as bolhas e conectores dinamicamente
  // Exemplo de uma bolha:
  var bubbleRow = document.createElement("div");
  bubbleRow.className = "bubble-row pos-center";

  var bubbleWrap = document.createElement("div");
  bubbleWrap.className = "bubble-wrap";
  if (
    typeof window !== "undefined" &&
    typeof window.startLesson === "function"
  ) {
    bubbleWrap.onclick = window.startLesson;
    bubbleWrap.style.cursor = "pointer";
  }

  var bubbleTooltip = document.createElement("div");
  bubbleTooltip.className = "bubble-tooltip";
  bubbleTooltip.textContent = "Introdução ao TypeScript";

  var bubble = document.createElement("div");
  bubble.className = "bubble done";
  bubble.textContent = "🟢";

  var bubbleStars = document.createElement("div");
  bubbleStars.className = "bubble-stars";
  for (let i = 0; i < 3; i++) {
    const star = document.createElement("div");
    star.className = "star";
    if (i >= 2) star.classList.add("empty"); // Exemplo: 2 estrelas preenchidas, 1 vazia
    bubbleStars.appendChild(star);
  }

  bubbleWrap.appendChild(bubbleTooltip);
  bubbleWrap.appendChild(bubble);
  bubbleWrap.appendChild(bubbleStars);
  bubbleRow.appendChild(bubbleWrap);
  trailPath.appendChild(bubbleRow);
  return trailPath;
}

export function renderButtonStart() {
  var btnStart = document.createElement("button");
  btnStart.className = "btn-start";
  btnStart.textContent = "▶ Iniciar Lição";
  if (
    typeof window !== "undefined" &&
    typeof window.startLesson === "function"
  ) {
    btnStart.onclick = window.startLesson;
  }
  return btnStart;
}

export function renderGap(height) {
  var gap = document.createElement("div");
  gap.style.height = `${height}px`;
  return gap;
}

const apiCourseResponse = {
  course: { id: 1, name: "Trilha Backend Java + Spring Boot" },
  sections: [
    { title: "Fundamentos de Backend",    subtitle: "Conceitos iniciais do desenvolvimento backend", color: "green",  icon: "⚙",  ordem: 1 },
    { title: "APIs e Arquitetura",         subtitle: "Comunicação entre sistemas e padrões REST",     color: "blue",   icon: "🌐", ordem: 2 },
    { title: "Spring Boot e Persistência", subtitle: "Persistência de dados e estrutura Java",        color: "purple", icon: "🗄", ordem: 3 },
  ],
  lessons: [
    { sectionId: 0, name: "Introdução ao Backend",  content: "Conceitos básicos sobre backend, entidades e arquitetura.", ordem: 1 },
    { sectionId: 0, name: "Modelagem e Estrutura",  content: "Modelagem de entidades, boilerplate e anotações.",           ordem: 2 },
    { sectionId: 0, name: "Frameworks Java",        content: "Introdução ao Spring Boot e Lombok.",                        ordem: 3 },
    { sectionId: 1, name: "APIs REST",              content: "Conceitos fundamentais de APIs REST e RESTful.",             ordem: 1 },
    { sectionId: 1, name: "HTTP e Comunicação",     content: "Métodos HTTP, requests e responses.",                        ordem: 2 },
    { sectionId: 1, name: "Arquitetura de Sistemas",content: "Integração entre frontend e backend.",                       ordem: 3 },
    { sectionId: 2, name: "Persistência com JPA",   content: "Uso de entidades e banco de dados.",                         ordem: 1 },
    { sectionId: 2, name: "Banco de Dados",         content: "Conceitos de SQL, tabelas e relacionamentos.",               ordem: 2 },
    { sectionId: 2, name: "Boas Práticas Backend",  content: "Organização de código e separação em camadas.",              ordem: 3 },
  ],
};

function renderLessonBubble(lesson, status) {
  const bubbleRow = document.createElement("div");
  bubbleRow.className = "bubble-row pos-center";

  const bubbleWrap = document.createElement("div");
  bubbleWrap.className = "bubble-wrap";
  if (
    status !== "locked" &&
    typeof window !== "undefined" &&
    typeof window.startLesson === "function"
  ) {
    bubbleWrap.onclick = window.startLesson;
    bubbleWrap.style.cursor = "pointer";
  }

  const bubbleTooltip = document.createElement("div");
  bubbleTooltip.className = "bubble-tooltip";
  bubbleTooltip.textContent = lesson.name;

  const bubble = document.createElement("div");
  bubble.className = `bubble ${status}`;
  bubble.textContent =
    status === "done" ? "🟢" : status === "active" ? "🏆" : "🔒";

  bubbleWrap.appendChild(bubbleTooltip);
  bubbleWrap.appendChild(bubble);

  if (status === "done") {
    const bubbleStars = document.createElement("div");
    bubbleStars.className = "bubble-stars";
    for (let i = 0; i < 3; i++) {
      const star = document.createElement("div");
      star.className = "star";
      if (i >= 2) star.classList.add("empty");
      bubbleStars.appendChild(star);
    }
    bubbleWrap.appendChild(bubbleStars);
  }

  bubbleRow.appendChild(bubbleWrap);
  return bubbleRow;
}

function renderSectionTrailPath(section, lessons, sectionIndex) {
  const trailPath = document.createElement("div");
  trailPath.className = "trail-path";

  const rowPositions = ["pos-center", "pos-right", "pos-left"];
  const stateMap     = ["done", "done", "active"];

  lessons.forEach((lesson, index) => {
    const status = sectionIndex === 0 ? (stateMap[index] ?? "locked") : "locked";
    const bubbleRow = renderLessonBubble(lesson, status);
    bubbleRow.className = `bubble-row ${rowPositions[index % rowPositions.length]}`;
    trailPath.appendChild(bubbleRow);

    if (index < lessons.length - 1) {
      const connector = document.createElement("div");
      connector.className = `zz-connector ${status === "done" ? "done" : "locked"}`;
      trailPath.appendChild(connector);
    }
  });

  return trailPath;
}

export function renderAprender(
  courseData = apiCourseResponse,
  currentXp = 420,
  nextLevelXp = 1200,
) {
  const screen = document.createElement("div");
  screen.className = "screen active";
  screen.id = "screen-aprender";

  screen.appendChild(renderXpBarWrap(currentXp, nextLevelXp));

  // sectionId nas lições usa índice 0-based correspondente à posição da seção no array
  courseData.sections.forEach((section, sectionIndex) => {
    const sectionLessons = courseData.lessons
      .filter((lesson) => lesson.sectionId === sectionIndex)
      .sort((a, b) => a.ordem - b.ordem);

    screen.appendChild(renderTrailSectionHeader(section.color, section.icon, section.title, section.subtitle));
    screen.appendChild(renderSectionTrailPath(section, sectionLessons, sectionIndex));

    if (sectionIndex === 0) {
      screen.appendChild(renderButtonStart());
    }

    screen.appendChild(renderGap(36));
  });

  return screen;
}
