/*
    <!-- ── Courses ──────────────────────────── -->
    <div class="screen" id="screen-gerencia">
      <div class="mgmt-summary">
        <div class="summary-card"><div class="summary-value" style="color:var(--clr-main)">4</div><div class="summary-label">Cursos Ativos</div></div>
        <div class="summary-card"><div class="summary-value" style="color:var(--clr-blue)">312</div><div class="summary-label">Alunos Total</div></div>
        <div class="summary-card"><div class="summary-value" style="color:var(--clr-orange)">89%</div><div class="summary-label">Taxa Conclusão</div></div>
        <div class="summary-card"><div class="summary-value" style="color:var(--clr-purple)">4.8★</div><div class="summary-label">Avaliação Média</div></div>
      </div>

      <div class="mgmt-header">
        <div class="mgmt-title">Meus Cursos</div>
        <button class="btn-add">+ Novo Curso</button>
      </div>

      <div class="mgmt-grid">
        <div class="mgmt-card">
          <div class="mgmt-card-top"><div class="mgmt-card-icon green">🟦</div><div><div class="mgmt-card-name">TypeScript do Zero</div><div class="mgmt-card-sub">142 alunos matriculados</div></div></div>
          <div class="mgmt-progress-wrap"><div class="mgmt-progress-info"><span>Progresso médio</span><span>68%</span></div><div class="mgmt-progress-track"><div class="mgmt-progress-fill green" style="width:68%"></div></div></div>
          <div class="mgmt-footer"><span class="mgmt-students">👥 142 alunos</span><span class="mgmt-badge active">● Ativo</span></div>
        </div>
        <div class="mgmt-card">
          <div class="mgmt-card-top"><div class="mgmt-card-icon purple">🟣</div><div><div class="mgmt-card-name">React Avançado</div><div class="mgmt-card-sub">98 alunos matriculados</div></div></div>
          <div class="mgmt-progress-wrap"><div class="mgmt-progress-info"><span>Progresso médio</span><span>45%</span></div><div class="mgmt-progress-track"><div class="mgmt-progress-fill purple" style="width:45%"></div></div></div>
          <div class="mgmt-footer"><span class="mgmt-students">👥 98 alunos</span><span class="mgmt-badge active">● Ativo</span></div>
        </div>
        <div class="mgmt-card">
          <div class="mgmt-card-top"><div class="mgmt-card-icon orange">🟠</div><div><div class="mgmt-card-name">Node.js & APIs</div><div class="mgmt-card-sub">54 alunos matriculados</div></div></div>
          <div class="mgmt-progress-wrap"><div class="mgmt-progress-info"><span>Progresso médio</span><span>31%</span></div><div class="mgmt-progress-track"><div class="mgmt-progress-fill orange" style="width:31%"></div></div></div>
          <div class="mgmt-footer"><span class="mgmt-students">👥 54 alunos</span><span class="mgmt-badge paused">● Pausado</span></div>
        </div>
        <div class="mgmt-card">
          <div class="mgmt-card-top"><div class="mgmt-card-icon blue">🔵</div><div><div class="mgmt-card-name">SQL & Banco de Dados</div><div class="mgmt-card-sub">Em criação</div></div></div>
          <div class="mgmt-progress-wrap"><div class="mgmt-progress-info"><span>Conteúdo criado</span><span>12%</span></div><div class="mgmt-progress-track"><div class="mgmt-progress-fill blue" style="width:12%"></div></div></div>
          <div class="mgmt-footer"><span class="mgmt-students">👥 — alunos</span><span class="mgmt-badge draft">● Rascunho</span></div>
        </div>
      </div>
    </div>
*/

export function renderCourses(cursosAtivos, totalAlunos, taxaConclusao, avaliacaoMedia, courseList) {
    if (typeof cursosAtivos !== "number" || typeof totalAlunos !== "number" || typeof taxaConclusao !== "number" || typeof avaliacaoMedia !== "number") {
        throw new Error("Os parâmetros 'cursosAtivos', 'totalAlunos', 'taxaConclusao' e 'avaliacaoMedia' devem ser números.");
    }
    if (courseList.constructor.name !== "Array") {
        throw new Error("O parâmetro 'courseList' deve ser um array.");
    }
    
    let coursesScreen = document.createElement('div');
    coursesScreen.className = 'screen';
    coursesScreen.id = 'screen-gerencia';

    // Summary Section
    let mgmtSummary = document.createElement('div');
    mgmtSummary.className = 'mgmt-summary';

    let summaryCardsData = [
        { value: cursosAtivos, label: "Cursos Ativos", color: "var(--clr-main)" },
        { value: totalAlunos, label: "Alunos Total", color: "var(--clr-blue)" },
        { value: `${taxaConclusao}%`, label: "Taxa Conclusão", color: "var(--clr-orange)" },
        { value: `${avaliacaoMedia}★`, label: "Avaliação Média", color: "var(--clr-purple)" }
    ];
    summaryCardsData.forEach(data => {
        let card = document.createElement('div');
        card.className = 'summary-card';
        card.innerHTML = `<div class="summary-value" style="color:${data.color}">${data.value}</div><div class="summary-label">${data.label}</div>`;
        mgmtSummary.appendChild(card);
    });

    coursesScreen.appendChild(mgmtSummary);

    // Header
    let mgmtHeader = document.createElement('div');
    mgmtHeader.className = 'mgmt-header';

    let mgmtTitle = document.createElement('div');
    mgmtTitle.className = 'mgmt-title';
    mgmtTitle.textContent = "Meus Cursos";

    let addButton = document.createElement('button');
    addButton.className = 'btn-add';
    addButton.textContent = "+ Novo Curso";

    mgmtHeader.appendChild(mgmtTitle);
    mgmtHeader.appendChild(addButton);
    coursesScreen.appendChild(mgmtHeader);

    // Course Grid
    let mgmtGrid = document.createElement('div');
    mgmtGrid.className = 'mgmt-grid';

    courseList.forEach(course => {
        let courseCard = document.createElement('div');
        courseCard.className = 'mgmt-card';

        courseCard.innerHTML = `
            <div class="mgmt-card-top">
                <div class="mgmt-card-icon ${course.color}">${course.icon}</div>
                <div>
                    <div class="mgmt-card-name">${course.name}</div>
                    <div class="mgmt-card-sub">${course.students} alunos matriculados</div>
                </div>
            </div>
            <div class="mgmt-progress-wrap">
                <div class="mgmt-progress-info"><span>Progresso médio</span><span>${course.progress}%</span></div>
                <div class="mgmt-progress-track"><div class="mgmt-progress-fill ${course.color}" style="width:${course.progress}%"></div></div>
            </div>
            <div class="mgmt-footer">
                <span class="mgmt-students">👥 ${course.students} alunos</span>
                <span class="mgmt-badge ${course.status.toLowerCase()}">● ${course.status}</span>
            </div>
        `;

        mgmtGrid.appendChild(courseCard);
    });

    coursesScreen.appendChild(mgmtGrid);

    return coursesScreen;
}