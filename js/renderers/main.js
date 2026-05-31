export function renderMain(topbar, screens) {
    /*if (screens.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'screen' deve ser um HTMLDivElement.");
    }
    if (topbar.constructor.name !== "HTMLHeaderElement") {
        throw new Error("O elemento 'topbar' deve ser um HTMLHeaderElement.");
    }*/

    let main = document.createElement('main');
    main.className = 'main';
    
    try {
        main.appendChild(topbar);
    } catch (err) {
        console.warn("topbar not added!");
    }

    try {
        main.appendChild(screens);
    } catch (err) {
        console.warn("screens not added!");
    }

    return main;
}