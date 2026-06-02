/* ══ SIDEBAR ══════════════════════════════════
<aside class="sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">&lt;/&gt;</div>
    <span class="logo-text">CodePath</span>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-item active" data-target="aprender">
      <span class="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
      Aprender
    </div>
    <div class="nav-item" data-target="perfil">
      <span class="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg></span>
      Perfil
    </div>
    <div class="nav-item" data-target="gerencia">
      <span class="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
      Gerência
    </div>
    <div class="nav-item" data-target="config">
      <span class="nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg></span>
      Configurações
    </div>
  </nav>

  <div class="sidebar-user">
    <div class="user-info">
      <div class="user-avatar">AL</div>
      <div>
        <div class="user-name">Allan Lucas</div>
        <div class="user-level">Nível 4 · TypeScript</div>
      </div>
    </div>
    <button class="btn-exit">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Sair
    </button>
  </div>
</aside> */

import appState from "../state.js";

export function renderSidebarLogo() {
    var sidebarLogo = document.createElement('div');
    sidebarLogo.className = 'sidebar-logo';

    var logoIcon = document.createElement('div');
    logoIcon.className = 'logo-icon';
    logoIcon.textContent = '</>';

    var logoText = document.createElement('span');
    logoText.className = 'logo-text';
    logoText.textContent = 'CodePath';

    sidebarLogo.appendChild(logoIcon);
    sidebarLogo.appendChild(logoText);

    return sidebarLogo;
}

export function renderSidebarNav(){
    var sidebarNav = document.createElement('nav');
    sidebarNav.className = 'sidebar-nav';
    
    var navItems = [
        { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`, text: 'Aprender', target: 'aprender' },
        { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>`, text: 'Perfil', target: 'perfil' },
        { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`, text: 'Gerência', target: 'gerencia' },
        { icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`, text: 'Configurações', target: 'config' }
    ];

    navItems.forEach(item => {
        var navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.setAttribute('data-target', item.target);
        navItem.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.text}`;
        sidebarNav.appendChild(navItem);
    });

    return sidebarNav;
}

export function renderUser(userAvatar, userName, userLevel) {
    var sidebarUser = document.createElement('div');
    sidebarUser.className = 'sidebar-user';

    var userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    var userAvatarElement = document.createElement('div');
    userAvatarElement.className = 'user-avatar';
    userAvatarElement.textContent = userAvatar;

    var userDetail = document.createElement('div');

    var userNameElement = document.createElement('div');
    userNameElement.className = 'user-name';
    userNameElement.textContent = userName;

    var userLevelElement = document.createElement('div');
    userLevelElement.className = 'user-level';
    userLevelElement.textContent = userLevel;

    userDetail.appendChild(userNameElement);
    userDetail.appendChild(userLevelElement);

    userInfo.appendChild(userAvatarElement);
    userInfo.appendChild(userDetail);

    var btnExit = document.createElement('button');
    btnExit.className = 'btn-exit';
    btnExit.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Sair
    `;
    btnExit.onclick = appState.logout;

    sidebarUser.appendChild(userInfo);
    sidebarUser.appendChild(btnExit);

    return sidebarUser;
}

export function renderSidebar(userAvatar, userName, userLevel) {
    var sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';

    var logo = renderSidebarLogo();
    var nav = renderSidebarNav();
    var user = renderUser(userAvatar, userName, userLevel);

    sidebar.appendChild(logo);
    sidebar.appendChild(nav);
    sidebar.appendChild(user);

    return sidebar;
}