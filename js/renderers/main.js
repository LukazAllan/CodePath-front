export function renderMain(screen) {
    if (screen.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'screen' deve ser um HTMLDivElement.");
    }

    let main = document.createElement('main');
    main.className = 'main';
    
    main.appendChild(screen);

    return main;
}