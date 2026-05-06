import { login, getCourses } from "./api.js";
import { state } from "./state.js";

async function init() {
    const data = await login("teste@email.com", "123");

    state.token = data.token;

    state.courses = await getCourses(state.token);

    renderCourses();
}

function renderCourses() {
    const container = document.querySelector(".mainContent");

    container.innerHTML = state.courses.map(c =>
        `<div>${c.name}</div>`
    ).join("");
}

init();