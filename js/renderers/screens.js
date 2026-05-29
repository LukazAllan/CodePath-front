export function renderScreen(aprender, perfil, courses, settings, loading, licao, licaoResult, catalog) {
    if (aprender.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'aprender' deve ser um HTMLDivElement.");
    }
    if (perfil.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'perfil' deve ser um HTMLDivElement.");
    }
    if (courses.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'courses' deve ser um HTMLDivElement.");
    }
    if (settings.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'settings' deve ser um HTMLDivElement.");
    }
    if (loading.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'loading' deve ser um HTMLDivElement.");
    }
    if (licao.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'licao' deve ser um HTMLDivElement.");
    }
    if (licaoResult.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'licaoResult' deve ser um HTMLDivElement.");
    }
    if (catalog.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'catalog' deve ser um HTMLDivElement.");
    }

    let screen = document.createElement('div');
    screen.className = 'screens';
    screen.id = 'screen-aprender';

    screen.appendChild(aprender);
    screen.appendChild(perfil);
    screen.appendChild(courses);
    screen.appendChild(settings);
    screen.appendChild(loading);
    screen.appendChild(licao);
    screen.appendChild(licaoResult);
    screen.appendChild(catalog);

    return screen;
}