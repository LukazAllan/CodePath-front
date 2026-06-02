export function renderScreen(aprender, perfil, courses, settings, loading, licao, licaoResult, catalog) {
    /* if (aprender.constructor.name !== "HTMLDivElement") {
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
    } */

    let screen = document.createElement('div');
    screen.className = 'screens';

    try {
        screen.appendChild(aprender);
    } catch (err){
        console.warn("aprender não foi adicionado!");
    }
    try {
        screen.appendChild(perfil);
    } catch (err){
        console.warn("perfil não foi adicionado!");
    }
    try {
        screen.appendChild(courses);
    } catch (err){
        console.warn("coursesnão foi adicionado!");
    }
    try {
        screen.appendChild(settings);
    } catch (err){
        console.warn("settings não foi adicionado!");
    }
    try {
        screen.appendChild(loading);
    } catch (err){
        console.warn("loading não foi adicionado!");
    }
    try {
        screen.appendChild(licao);
    } catch (err){
        console.warn("licao não foi adicionado!");
    }
    try {
        screen.appendChild(licaoResult);
    } catch (err){
        console.warn("licaoResult não foi adicionado!");
    }
    try {
        screen.appendChild(catalog);
    } catch (err){
        console.warn("catalog não foi adicionado!");
    }

    return screen;
}