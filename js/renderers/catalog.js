/*
<!-- ── CATÁLOGO DE CURSOS (overlay screen) ── -->
<div class="screen" id="screen-catalogo">
  catalogHeader here.

  searchWrap here.

  <div class="catalog-grid" id="catalogGrid">

    <div class="catalog-card" data-category="frontend" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8)">
        <span class="catalog-card-emoji">⚛️</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag frontend">Frontend</div>
        <div class="catalog-card-name">React do Zero</div>
        <div class="catalog-card-desc">Componentes, hooks, context e roteamento com React 19.</div>
        <div class="catalog-card-meta">
          <span>👥 2.3k alunos</span>
          <span>⭐ 4.9</span>
          <span>📚 48 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="backend" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#10b981,#047857)">
        <span class="catalog-card-emoji">🐍</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag backend">Backend</div>
        <div class="catalog-card-name">Python para Backend</div>
        <div class="catalog-card-desc">FastAPI, Pydantic, autenticação JWT e deploy em produção.</div>
        <div class="catalog-card-meta">
          <span>👥 1.8k alunos</span>
          <span>⭐ 4.8</span>
          <span>📚 62 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="dados" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#f59e0b,#b45309)">
        <span class="catalog-card-emoji">📊</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag dados">Dados</div>
        <div class="catalog-card-name">Data Science com Python</div>
        <div class="catalog-card-desc">Pandas, NumPy, visualização de dados e Machine Learning básico.</div>
        <div class="catalog-card-meta">
          <span>👥 3.1k alunos</span>
          <span>⭐ 4.7</span>
          <span>📚 75 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="devops" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#6366f1,#4338ca)">
        <span class="catalog-card-emoji">🐳</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag devops">DevOps</div>
        <div class="catalog-card-name">Docker & Kubernetes</div>
        <div class="catalog-card-desc">Containerização, orquestração e CI/CD com GitHub Actions.</div>
        <div class="catalog-card-meta">
          <span>👥 980 alunos</span>
          <span>⭐ 4.9</span>
          <span>📚 54 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="frontend" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#ec4899,#9d174d)">
        <span class="catalog-card-emoji">🎨</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag frontend">Frontend</div>
        <div class="catalog-card-name">CSS Avançado & Animações</div>
        <div class="catalog-card-desc">Grid, Flexbox, variáveis CSS, keyframes e design responsivo.</div>
        <div class="catalog-card-meta">
          <span>👥 1.5k alunos</span>
          <span>⭐ 4.6</span>
          <span>📚 38 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="backend" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#14b8a6,#0f766e)">
        <span class="catalog-card-emoji">☕</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag backend">Backend</div>
        <div class="catalog-card-name">Java & Spring Boot</div>
        <div class="catalog-card-desc">APIs REST, JPA, segurança com Spring Security e testes unitários.</div>
        <div class="catalog-card-meta">
          <span>👥 2.0k alunos</span>
          <span>⭐ 4.8</span>
          <span>📚 80 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="dados" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#f97316,#c2410c)">
        <span class="catalog-card-emoji">🤖</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag dados">Dados</div>
        <div class="catalog-card-name">Inteligência Artificial</div>
        <div class="catalog-card-desc">Redes neurais, NLP, visão computacional e LLMs na prática.</div>
        <div class="catalog-card-meta">
          <span>👥 4.2k alunos</span>
          <span>⭐ 5.0</span>
          <span>📚 90 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

    <div class="catalog-card" data-category="devops" data-added="false">
      <div class="catalog-card-banner" style="background:linear-gradient(135deg,#64748b,#334155)">
        <span class="catalog-card-emoji">☁️</span>
      </div>
      <div class="catalog-card-body">
        <div class="catalog-card-tag devops">DevOps</div>
        <div class="catalog-card-name">AWS Cloud Foundations</div>
        <div class="catalog-card-desc">EC2, S3, Lambda, RDS e arquitetura serverless na AWS.</div>
        <div class="catalog-card-meta">
          <span>👥 1.2k alunos</span>
          <span>⭐ 4.7</span>
          <span>📚 66 lições</span>
        </div>
        <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
      </div>
    </div>

  </div>
</div>
*/

/*
<div class="catalog-card" data-category="frontend" data-added="false">
  <div class="catalog-card-banner" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8)">
    <span class="catalog-card-emoji">⚛️</span>
  </div>
  <div class="catalog-card-body">
    <div class="catalog-card-tag frontend">Frontend</div>
    <div class="catalog-card-name">React do Zero</div>
    <div class="catalog-card-desc">Componentes, hooks, context e roteamento com React 19.</div>
    <div class="catalog-card-meta">
      <span>👥 2.3k alunos</span>
      <span>⭐ 4.9</span>
      <span>📚 48 lições</span>
    </div>
    <button class="btn-catalog-add" onclick="addCourse(this)">+ Adicionar</button>
  </div>
</div>
*/
export function renderCatalogCard(courseName, courseDesc, courseTag, courseMeta, category, emoji) {
    let card = document.createElement('div');
    card.className = 'catalog-card';
    card.dataset.category = category;
    card.dataset.added = 'false';

    let banner = document.createElement('div');
    banner.className = 'catalog-card-banner';
    banner.style.background = `linear-gradient(135deg,${courseMeta.colorStart},${courseMeta.colorEnd})`;
    banner.innerHTML = `<span class="catalog-card-emoji">${emoji}</span>`;
    
    let body = document.createElement('div');
    body.className = 'catalog-card-body';

    let tag = document.createElement('div');
    tag.className = `catalog-card-tag ${category}`;
    tag.textContent = courseTag;

    let name = document.createElement('div');
    name.className = 'catalog-card-name';
    name.textContent = courseName;

    let desc = document.createElement('div');
    desc.className = 'catalog-card-desc';
    desc.textContent = courseDesc;

    let meta = document.createElement('div');
    meta.className = 'catalog-card-meta';
    meta.innerHTML = `<span>👥 ${courseMeta.students} alunos</span><span>⭐ ${courseMeta.rating}</span><span>📚 ${courseMeta.lessons} lições</span>`;
    
    let addButton = document.createElement('button');
    addButton.className = 'btn-catalog-add';
    addButton.textContent = '+ Adicionar';
    addButton.onclick = function() {
        addCourse(this);
    };

    body.appendChild(tag);
    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(meta);
    body.appendChild(addButton);

    card.appendChild(banner);
    card.appendChild(body);

    return card;
}
/* 
<div class="catalog-header">
    <button class="btn-back" onclick="closeCatalog()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
      Voltar
    </button>
    <div class="catalog-title-wrap">
      <div class="catalog-title">Catálogo de Cursos</div>
      <div class="catalog-subtitle">Adicione novos cursos à sua área de gerência</div>
    </div>
  </div>
*/
export function renderCatalogHeader() {
    let header = document.createElement('div');
    header.className = 'catalog-header';

    let backButton = document.createElement('button');
    backButton.className = 'btn-back';
    backButton.onclick = closeCatalog;
    backButton.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>Voltar`;
    
    let titleWrap = document.createElement('div');
    titleWrap.className = 'catalog-title-wrap';
    titleWrap.innerHTML = `<div class="catalog-title">Catálogo de Cursos</div><div class="catalog-subtitle">Adicione novos cursos à sua área de gerência</div>`;

    header.appendChild(backButton);
    header.appendChild(titleWrap);

    return header;
}

/*
  <div class="catalog-search-wrap">
    <div class="catalog-search-box">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input class="catalog-search-input" type="text" placeholder="Buscar cursos…" oninput="filterCatalog(this.value)">
    </div>
    <div class="catalog-filters">
      <button class="filter-chip active" onclick="setFilter(this,'todos')">Todos</button>
      <button class="filter-chip" onclick="setFilter(this,'frontend')">Frontend</button>
      <button class="filter-chip" onclick="setFilter(this,'backend')">Backend</button>
      <button class="filter-chip" onclick="setFilter(this,'dados')">Dados</button>
      <button class="filter-chip" onclick="setFilter(this,'devops')">DevOps</button>
    </div>
  </div>
*/
export function renderCatalogSearch() {
    let searchWrap = document.createElement('div');
    searchWrap.className = 'catalog-search-wrap';

    let searchBox = document.createElement('div');
    searchBox.className = 'catalog-search-box';
    searchBox.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input class="catalog-search-input" type="text" placeholder="Buscar cursos…" oninput="filterCatalog(this.value)">`;

    let filters = document.createElement('div');
    filters.className = 'catalog-filters';
    filters.innerHTML = `
        <button class="filter-chip active" onclick="setFilter(this,'todos')">Todos</button>
        <button class="filter-chip" onclick="setFilter(this,'frontend')">Frontend</button>
        <button class="filter-chip" onclick="setFilter(this,'backend')">Backend</button>
        <button class="filter-chip" onclick="setFilter(this,'dados')">Dados</button>
        <button class="filter-chip" onclick="setFilter(this,'devops')">DevOps</button>
    `;

    searchWrap.appendChild(searchBox);
    searchWrap.appendChild(filters);

    return searchWrap;
}