export function renderScreen(aprender){
    if (aprender.constructor.name !== "HTMLDivElement") {
        throw new Error("O elemento 'aprender' deve ser um HTMLDivElement.");
    }

    let screen = document.createElement('div');
    screen.className = 'screen';
    screen.id = 'screen-aprender';

    screen.appendChild(aprender);

    return screen;
}