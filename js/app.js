import { login, getCourses, me } from "./api.js";
import { state } from "./state.js";
import { renderMain } from "./renderers/main.js";

async function init() {
    const data = await me("teste@email.com", "123");

    state.token = data.token;

    state.courses = await getCourses(state.token);

    renderScreen('courses');
    //renderApp (sidebar + main)
    // renderMain(topbar, screens)
}

function renderCourses() {
    const container = document.querySelector(".mainContent");

    container.innerHTML = state.courses.map(c =>
        `<div>${c.name}</div>`
    ).join("");
}

init();