/*    <!-- ── CONFIGURAÇÕES ─────────────────────── -->
    <div class="screen" id="screen-config">

      <div class="config-section">
        <div class="config-section-title">Conta</div>
        <div class="config-row">
          <div class="config-row-left"><div class="config-row-icon" style="background:#eff6ff">👤</div><div><div class="config-row-label">Editar Perfil</div><div class="config-row-sub">Nome, foto e bio</div></div></div>
          <span class="config-chevron">›</span>
        </div>
        <div class="config-row">
          <div class="config-row-left"><div class="config-row-icon" style="background:#fef9c3">🔑</div><div><div class="config-row-label">Alterar Senha</div><div class="config-row-sub">Última alteração há 3 meses</div></div></div>
          <span class="config-chevron">›</span>
        </div>
        <div class="config-row">
          <div class="config-row-left"><div class="config-row-icon" style="background:#f0fdf4">📧</div><div><div class="config-row-label">E-mail</div><div class="config-row-sub">allan@codepath.dev</div></div></div>
          <span class="config-chevron">›</span>
        </div>
      </div>

      <div class="config-section">
        <div class="config-section-title">Preferências</div>
        <div class="config-row" onclick="toggleSwitch(this)">
          <div class="config-row-left"><div class="config-row-icon" style="background:#fdf4ff">🔔</div><div><div class="config-row-label">Notificações</div><div class="config-row-sub">Lembretes de lição diária</div></div></div>
          <div class="toggle on"></div>
        </div>
        <div class="config-row" onclick="toggleSwitch(this)">
          <div class="config-row-left"><div class="config-row-icon" style="background:#fff7ed">🌙</div><div><div class="config-row-label">Modo Escuro</div><div class="config-row-sub">Aparência da interface</div></div></div>
          <div class="toggle"></div>
        </div>
        <div class="config-row" onclick="toggleSwitch(this)">
          <div class="config-row-left"><div class="config-row-icon" style="background:#eff6ff">🔊</div><div><div class="config-row-label">Sons</div><div class="config-row-sub">Efeitos sonoros nas lições</div></div></div>
          <div class="toggle on"></div>
        </div>
        <div class="config-row">
          <div class="config-row-left"><div class="config-row-icon" style="background:#d0fae5">🎯</div><div><div class="config-row-label">Meta Diária</div><div class="config-row-sub">10 min por dia</div></div></div>
          <span class="config-chevron">›</span>
        </div>
      </div>

      <div class="danger-zone">
        <div class="config-section-title">Zona de Perigo</div>
        <div class="config-row">
          <div class="config-row-left"><div class="config-row-icon" style="background:#fef2f2">🗑️</div><div><div class="config-row-label" style="color:var(--clr-red)">Excluir Conta</div><div class="config-row-sub">Essa ação é irreversível</div></div></div>
          <span class="config-chevron" style="color:var(--clr-red)">›</span>
        </div>
      </div>

    </div>
    */
export function renderSettings(ultimaAlteracaoSenha, emailUsuario, configSectionsData) {
    let settingsScreen = document.createElement('div');
    settingsScreen.className = 'screen';
    settingsScreen.id = 'screen-config';
    
    if (configSectionsData === undefined) {
        let configSectionsData = [
            {
                title: "Conta",
                rows: [
                    { icon: "👤", label: "Editar Perfil",background: "#f0fdf4", sub: "Nome, foto e bio" },
                    { icon: "🔑", label: "Alterar Senha",background: "#fef9c3", sub: ultimaAlteracaoSenha },
                    { icon: "📧", label: "E-mail",background: "#f0fdf4", sub: emailUsuario }
                ]
            },
            {
                title: "Preferências",
                rows: [
                    { icon: "🔔", label: "Notificações",background: "#fdf4ff", sub: "Lembretes de lição diária" },
                    { icon: "🌙", label: "Modo Escuro",background: "#fff7ed", sub: "Aparência da interface" },
                    { icon: "🔊", label: "Sons",background: "#eff6ff", sub: "Efeitos sonoros nas lições" },
                    { icon: "🎯", label: "Meta Diária",background: "#d0fae5", sub: "10 min por dia" }
                ]
            },
            {
                title: "Zona de Perigo",
                rows: [
                    { icon: "🗑️", label: "Excluir Conta",background: "#fef2f2", sub: "Essa ação é irreversível" }
                ]
            }
        ];
    }
    configSectionsData.forEach(section => {
        let configSection = document.createElement('div');
        configSection.className = 'config-section';

        let sectionTitle = document.createElement('div');
        sectionTitle.className = 'config-section-title';
        sectionTitle.textContent = section.title;
        configSection.appendChild(sectionTitle);

        section.rows.forEach(row => {
            let configRow = document.createElement('div');
            configRow.className = 'config-row';

            let rowLeft = document.createElement('div');
            rowLeft.className = 'config-row-left';

            let rowIcon = document.createElement('div');
            rowIcon.className = 'config-row-icon';
            rowIcon.style.backgroundColor = getIconBackgroundColor(row.icon);
            rowIcon.textContent = row.icon;

            let rowTextWrap = document.createElement('div');
            let rowLabel = document.createElement('div');
            rowLabel.className = 'config-row-label';
            rowLabel.textContent = row.label;
            let rowSub = document.createElement('div');
            rowSub.className = 'config-row-sub';
            rowSub.textContent = row.sub;

            rowTextWrap.appendChild(rowLabel);
            rowTextWrap.appendChild(rowSub);
            rowLeft.appendChild(rowIcon);
            rowLeft.appendChild(rowTextWrap);

            configRow.appendChild(rowLeft);
            configRow.appendChild(createChevron());

            configSection.appendChild(configRow);
        });

        settingsScreen.appendChild(configSection);
    });

    return settingsScreen;
}