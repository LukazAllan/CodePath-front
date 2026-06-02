import * as sidebar from "./renderers/sidebar.js";
import * as topbar from "./renderers/topbar.js";
import * as screens from "./renderers/screens.js";
import * as main from "./renderers/main.js";
import * as aprender from "./renderers/aprender.js";
import * as profile from "./renderers/profile.js";
import * as courses from "./renderers/courses.js";
import * as settings from "./renderers/settings.js";
import * as loading from "./renderers/loading.js";
import * as lesson from "./renderers/lessonbase.js";
import * as lessonResult from "./renderers/lessonResult.js";
import * as catalog from "./renderers/catalog.js";
import * as api from "./api.js";
import { SectionDTO, LessonDTO, MockCourse } from "./model.js";
import { appState } from "./state.js";

function renderApp() {
  const app = document.querySelector(".app");
  
  appState.setUser(
    api.me(appState.getToken())
  );

  const apiCourseResponse = {
    course: new MockCourse({ id: 1, name: courseName }),
    sections: [
      new SectionDTO({
        title: "Fundamentos de Backend",
        subtitle: "Conceitos iniciais do desenvolvimento backend",
        color: "green",
        icon: "⚙",
        ordem: 1,
      }),
      new SectionDTO({
        title: "APIs e Arquitetura",
        subtitle: "Comunicação entre sistemas e padrões REST",
        color: "green",
        icon: "🌐",
        ordem: 2,
      }),
      new SectionDTO({
        title: "Spring Boot e Persistência",
        subtitle: "Persistência de dados e estrutura Java",
        color: "purple",
        icon: "🧾️",
        ordem: 3,
      }),
    ],
    lessons: [
      new LessonDTO({
        sectionId: 0,
        name: "Introdução ao Backend",
        content: "Conceitos básicos sobre backend, entidades e arquitetura.",
        ordem: 1,
      }),
      new LessonDTO({
        sectionId: 0,
        name: "Modelagem e Estrutura",
        content: "Modelagem de entidades, boilerplate e anotações.",
        ordem: 2,
      }),
      new LessonDTO({
        sectionId: 0,
        name: "Frameworks Java",
        content: "Introdução ao Spring Boot e Lombok.",
        ordem: 3,
      }),
      new LessonDTO({
        sectionId: 1,
        name: "APIs REST",
        content: "Conceitos fundamentais de APIs REST e RESTful.",
        ordem: 1,
      }),
      new LessonDTO({
        sectionId: 1,
        name: "HTTP e Comunicação",
        content: "Métodos HTTP, requests e responses.",
        ordem: 2,
      }),
      new LessonDTO({
        sectionId: 1,
        name: "Arquitetura de Sistemas",
        content: "Integração entre frontend e backend.",
        ordem: 3,
      }),
      new LessonDTO({
        sectionId: 2,
        name: "Persistência com JPA",
        content: "Uso de entidades e banco de dados.",
        ordem: 1,
      }),
      new LessonDTO({
        sectionId: 2,
        name: "Banco de Dados",
        content: "Conceitos de SQL, tabelas e relacionamentos.",
        ordem: 2,
      }),
      new LessonDTO({
        sectionId: 2,
        name: "Boas Práticas Backend",
        content: "Organização de código e separação em camadas.",
        ordem: 3,
      }),
    ],
  };

  // Populate initial app state from the mocked API response
  appState.setCurrentCourse(apiCourseResponse.course);
  appState.setSections(apiCourseResponse.sections);
  appState.setCourses([]);
  // seed a user object so renderers can read from state if needed
  appState.setUser({
    id: 1,
    name: userName,
    avatar: userAvatar,
    level: userLevel,
    xp,
    hearts,
  });

  // read data from state (fallback to local constants)
  const currentUser = appState.getUser() || {};
  const sidebarElement = sidebar.renderSidebar(
    currentUser.avatar || userAvatar,
    currentUser.name || userName,
    currentUser.level || userLevel,
  );

  // 2. Topbar
  const courseNameFromState = appState.getCurrentCourse()?.name || courseName;
  const topbarElement = topbar.renderTopBar(
    courseNameFromState,
    currentUser.hearts ?? hearts,
    currentUser.xp ?? xp,
  );

  // 3. Aprender
  const aprenderScreen = aprender.renderAprender(
    apiCourseResponse,
    currentUser.xp ?? xp,
    nextLevelXp,
  );

  // 4. Perfil
  const weeklyActivity = [
    { label: "Seg", status: "done" },
    { label: "Ter", status: "done" },
    { label: "Qua", status: "done" },
    { label: "Qui", status: "miss" },
    { label: "Sex", status: "done" },
    { label: "Sáb", status: "done" },
    { label: "Dom", status: "today" },
  ];
  const perfilScreen = profile.renderProfile(
    userAvatar,
    "1",
    userName,
    "@allanlucas · Membro desde jan/2025",
    courseName,
    xp,
    7,
    24,
    weeklyActivity,
  );

  // 5. Gerência
  const courseList = [
    {
      name: "Trilha Backend Java",
      icon: "🟦",
      color: "green",
      students: 0,
      progress: 0,
      status: "Ativo",
    },
  ];
  appState.setCourses(courseList);
  const coursesScreen = courses.renderCourses(1, 0, 0, 0, courseList);

  // 6. Configurações
  const configSections = [
    {
      title: "Conta",
      rows: [
        {
          icon: "👤",
          label: "Editar Perfil",
          background: "#eff6ff",
          sub: "Nome, foto e bio",
        },
        {
          icon: "🔑",
          label: "Alterar Senha",
          background: "#fef9c3",
          sub: "Última alteração há 3 meses",
        },
        {
          icon: "📧",
          label: "E-mail",
          background: "#f0fdf4",
          sub: "usuario@codepath.dev",
        },
      ],
    },
    {
      title: "Preferências",
      rows: [
        {
          icon: "🔔",
          label: "Notificações",
          background: "#fdf4ff",
          sub: "Lembretes de lição diária",
          toggle: true,
          on: true,
        },
        {
          icon: "🌙",
          label: "Modo Escuro",
          background: "#fff7ed",
          sub: "Aparência da interface",
          toggle: true,
          on: false,
        },
        {
          icon: "🔊",
          label: "Sons",
          background: "#eff6ff",
          sub: "Efeitos sonoros nas lições",
          toggle: true,
          on: true,
        },
        {
          icon: "🎯",
          label: "Meta Diária",
          background: "#d0fae5",
          sub: "10 min por dia",
        },
      ],
    },
    {
      title: "Zona de Perigo",
      rows: [
        {
          icon: "🗑️",
          label: "Excluir Conta",
          background: "#fef2f2",
          sub: "Essa ação é irreversível",
          danger: true,
        },
      ],
    },
  ];
  const settingsScreen = settings.renderSettings(
    "Última alteração há 3 meses",
    "usuario@codepath.dev",
    configSections,
  );

  // 7. Loading
  const loadingScreen = loading.renderLoading(
    "Carregando lição…",
    "Preparando sua lição…",
    "Pratique todos os dias para manter sua sequência!",
  );

  // 8. Lição
  const lessonScreen = lesson.renderLesson();

  // 9. Resultado
  const lessonResultScreen = lessonResult.renderLessonResult(
    "Introdução ao Backend",
    50,
    "100%",
    "1m 42s",
    3,
  );

  // 10. Catálogo
  const catalogScreen = document.createElement("div");
  catalogScreen.className = "screen";
  catalogScreen.id = "screen-catalogo";
  catalogScreen.appendChild(catalog.renderCatalogHeader());
  catalogScreen.appendChild(catalog.renderCatalogSearch());
  const catalogCards = [
    catalog.renderCatalogCard(
      "React do Zero",
      "Componentes, hooks, context e roteamento com React 19.",
      "Frontend",
      {
        students: "2.3k",
        rating: 4.9,
        lessons: 48,
        colorStart: "#3b82f6",
        colorEnd: "#1d4ed8",
      },
      "frontend",
      "⚛️",
    ),
    catalog.renderCatalogCard(
      "Python para Backend",
      "FastAPI, Pydantic, autenticação JWT e deploy em produção.",
      "Backend",
      {
        students: "1.8k",
        rating: 4.8,
        lessons: 62,
        colorStart: "#10b981",
        colorEnd: "#047857",
      },
      "backend",
      "🐍",
    ),
    catalog.renderCatalogCard(
      "Data Science com Python",
      "Pandas, NumPy, visualização de dados e Machine Learning básico.",
      "Dados",
      {
        students: "3.1k",
        rating: 4.7,
        lessons: 75,
        colorStart: "#f59e0b",
        colorEnd: "#b45309",
      },
      "dados",
      "📊",
    ),
    catalog.renderCatalogCard(
      "Docker & Kubernetes",
      "Containerização, orquestração e CI/CD com GitHub Actions.",
      "DevOps",
      {
        students: "980",
        rating: 4.9,
        lessons: 54,
        colorStart: "#6366f1",
        colorEnd: "#4338ca",
      },
      "devops",
      "🐳",
    ),
    catalog.renderCatalogCard(
      "CSS Avançado & Animações",
      "Grid, Flexbox, variáveis CSS, keyframes e design responsivo.",
      "Frontend",
      {
        students: "1.5k",
        rating: 4.6,
        lessons: 38,
        colorStart: "#ec4899",
        colorEnd: "#9d174d",
      },
      "frontend",
      "🎨",
    ),
    catalog.renderCatalogCard(
      "Java & Spring Boot",
      "APIs REST, JPA, segurança com Spring Security e testes unitários.",
      "Backend",
      {
        students: "2.0k",
        rating: 4.8,
        lessons: 80,
        colorStart: "#14b8a6",
        colorEnd: "#0f766e",
      },
      "backend",
      "☕",
    ),
    catalog.renderCatalogCard(
      "Inteligência Artificial",
      "Redes neurais, NLP, visão computacional e LLMs na prática.",
      "Dados",
      {
        students: "4.2k",
        rating: 5.0,
        lessons: 90,
        colorStart: "#f97316",
        colorEnd: "#c2410c",
      },
      "dados",
      "🤖",
    ),
    catalog.renderCatalogCard(
      "AWS Cloud Foundations",
      "EC2, S3, Lambda, RDS e arquitetura serverless na AWS.",
      "DevOps",
      {
        students: "1.2k",
        rating: 4.7,
        lessons: 66,
        colorStart: "#64748b",
        colorEnd: "#334155",
      },
      "devops",
      "☁️",
    ),
  ];
  catalogScreen.appendChild(catalog.renderCatalogGrid(catalogCards));

  // 11. Agrupa screens
  const screensElement = screens.renderScreen(
    aprenderScreen,
    perfilScreen,
    coursesScreen,
    settingsScreen,
    loadingScreen,
    lessonScreen,
    lessonResultScreen,
    catalogScreen,
  );

  // 12. Main
  const mainElement = main.renderMain(topbarElement, screensElement);

  // 13. Injeta no DOM
  app.innerHTML = "";
  app.appendChild(sidebarElement);
  app.appendChild(mainElement);

  // 14. Inicializa navegação e expõe funções globais para os onclick handlers
  initNavigation();
}

function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item[data-target]");
  const allScreens = document.querySelectorAll(".screen");
  let current = "aprender";

  function showScreen(name) {
    allScreens.forEach((s) => s.classList.remove("active"));
    const s = document.getElementById("screen-" + name);
    if (s) {
      s.classList.add("active");
      s.scrollTop = 0;
    }
    current = name;
  }

  function navigate(target) {
    if (target === current) return;
    navItems.forEach((n) => n.classList.remove("active"));
    const navItem = document.querySelector(
      `.nav-item[data-target="${target}"]`,
    );
    if (navItem) navItem.classList.add("active");
    showScreen(target);
  }

  navItems.forEach((item) =>
    item.addEventListener("click", () => navigate(item.dataset.target)),
  );

  // Animação da barra de XP
  setTimeout(() => {
    const f = document.getElementById("xpFill");
    if (f) f.style.width = "35%";
  }, 400);

  // Botão "Novo Curso" abre catálogo
  const btnAdd = document.querySelector(".btn-add");
  if (btnAdd)
    btnAdd.addEventListener("click", () => {
      allScreens.forEach((s) => s.classList.remove("active"));
      const cat = document.getElementById("screen-catalogo");
      if (cat) {
        cat.classList.add("active");
        cat.scrollTop = 0;
      }
      current = "catalogo";
      const input = document.querySelector(".catalog-search-input");
      if (input) input.value = "";
      window.filterCatalog("");
    });

  // Funções globais usadas pelos onclick handlers dos renderers
  window.showScreen = showScreen;
  window.exitLesson = () => {
    showScreen("aprender");
    navigate("aprender");
  };
  window.finishLesson = () => {
    showScreen("aprender");
    navigate("aprender");
  };
  window.startLesson = () => showScreen("loading");
  window.checkAnswer = () => {};
  window.closeCatalog = () => navigate("gerencia");
  window.addCourse = (btn) => {
    if (btn.classList.contains("added")) return;
    const name = btn
      .closest(".catalog-card")
      .querySelector(".catalog-card-name").textContent;
    btn.textContent = "✓ Adicionado";
    btn.classList.add("added");
    btn.closest(".catalog-card").dataset.added = "true";
    const t = document.getElementById("toast");
    if (t) {
      t.textContent = `✅ "${name}" adicionado aos seus cursos!`;
      t.classList.add("show");
      setTimeout(() => t.classList.remove("show"), 3000);
    }
  };
  window.setFilter = (btn, cat) => {
    document
      .querySelectorAll(".filter-chip")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    const query = document.querySelector(".catalog-search-input")?.value ?? "";
    window.filterCatalog(query, cat);
  };
  window.filterCatalog = (query, cat = "todos") => {
    const q = query.toLowerCase();
    document.querySelectorAll(".catalog-card").forEach((card) => {
      const cardCat = card.dataset.category;
      const cardName =
        card.querySelector(".catalog-card-name")?.textContent.toLowerCase() ??
        "";
      const cardDesc =
        card.querySelector(".catalog-card-desc")?.textContent.toLowerCase() ??
        "";
      const matchCat = cat === "todos" || cardCat === cat;
      const matchQ = !q || cardName.includes(q) || cardDesc.includes(q);
      card.classList.toggle("hidden", !(matchCat && matchQ));
    });
  };
  window.toggleSwitch = (row) => {
    const toggle = row.querySelector(".toggle");
    if (toggle) toggle.classList.toggle("on");
  };
}

renderApp();
