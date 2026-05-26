const API_BASE_URL = "http://localhost:8080";

/* =========================================================
 * Helper
 * ========================================================= */

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro na requisição");
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

/* =========================================================
 * AUTH
 * ========================================================= */

export async function signUp(data) {
    return request("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function login(data) {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function me(token) {
    return request("/auth/me", {
        method: "POST",
        body: JSON.stringify({ token })
    });
}

/* =========================================================
 * USERS
 * ========================================================= */

export async function getUsers() {
    return request("/users");
}

export async function getUserById(id) {
    return request(`/users/${id}`);
}

export async function createUser(data) {
    return request("/users", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateUser(id, data) {
    return request(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteUser(id) {
    return request(`/users/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * COURSES
 * ========================================================= */

export async function getCourses() {
    return request("/courses");
}

export async function getCourseById(id) {
    return request(`/courses/${id}`);
}

export async function createCourse(data) {
    return request("/courses", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateCourse(id, data) {
    return request(`/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteCourse(id) {
    return request(`/courses/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * SECTIONS
 * ========================================================= */

export async function getSections() {
    return request("/sections");
}

export async function getSectionById(id) {
    return request(`/sections/${id}`);
}

export async function createSection(data) {
    return request("/sections", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateSection(id, data) {
    return request(`/sections/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteSection(id) {
    return request(`/sections/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * LESSONS
 * ========================================================= */

export async function getLessons() {
    return request("/lessons");
}

export async function getLessonById(id) {
    return request(`/lessons/${id}`);
}

export async function createLesson(data) {
    return request("/lessons", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateLesson(id, data) {
    return request(`/lessons/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteLesson(id) {
    return request(`/lessons/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * QUESTIONS
 * ========================================================= */

export async function getQuestions() {
    return request("/questions");
}

export async function getQuestionById(id) {
    return request(`/questions/${id}`);
}

export async function createQuestion(data) {
    return request("/questions", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateQuestion(id, data) {
    return request(`/questions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteQuestion(id) {
    return request(`/questions/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * ANSWERS
 * ========================================================= */

export async function getAnswers() {
    return request("/answers");
}

export async function getAnswerById(id) {
    return request(`/answers/${id}`);
}

export async function createAnswer(data) {
    return request("/answers", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateAnswer(id, data) {
    return request(`/answers/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteAnswer(id) {
    return request(`/answers/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * ENROLLMENTS
 * ========================================================= */

export async function getEnrollments() {
    return request("/enrollments");
}

export async function getEnrollmentById(id) {
    return request(`/enrollments/${id}`);
}

export async function createEnrollment(data) {
    return request("/enrollments", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateEnrollment(id, data) {
    return request(`/enrollments/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteEnrollment(id) {
    return request(`/enrollments/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * LESSON PROGRESS
 * ========================================================= */

export async function getLessonProgress() {
    return request("/lesson-progress");
}

export async function getLessonProgressById(id) {
    return request(`/lesson-progress/${id}`);
}

export async function createLessonProgress(data) {
    return request("/lesson-progress", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateLessonProgress(id, data) {
    return request(`/lesson-progress/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteLessonProgress(id) {
    return request(`/lesson-progress/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * STREAKS
 * ========================================================= */

export async function getStreaks() {
    return request("/streaks");
}

export async function getStreakById(id) {
    return request(`/streaks/${id}`);
}

export async function getStreaksByDays(days) {
    return request(`/streaks/days/${days}`);
}

export async function revokeStreakDays(id) {
    return request("/streaks/revoke", {
        method: "POST",
        body: JSON.stringify({ id })
    });
}

export async function setStreakDays(userId, days) {
    return request("/streaks/set-days", {
        method: "POST",
        body: JSON.stringify({
            userId,
            days
        })
    });
}

/* =========================================================
 * SESSIONS
 * ========================================================= */

export async function getSessions() {
    return request("/sessions");
}

export async function getSessionById(id) {
    return request(`/sessions/${id}`);
}

export async function revokeSession(id) {
    return request(`/sessions/${id}/revoke`, {
        method: "POST"
    });
}

export async function refreshSession(id) {
    return request(`/sessions/${id}/refresh`, {
        method: "POST"
    });
}

export async function deleteSession(id) {
    return request(`/sessions/${id}`, {
        method: "DELETE"
    });
}

/* =========================================================
 * SUGGESTIONS
 * ========================================================= */

export async function getSuggestions() {
    return request("/suggestions");
}

export async function getSuggestionById(id) {
    return request(`/suggestions/${id}`);
}

export async function createSuggestion(data) {
    return request("/suggestions", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export async function updateSuggestion(id, data) {
    return request(`/suggestions/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export async function deleteSuggestion(id) {
    return request(`/suggestions/${id}`, {
        method: "DELETE"
    });
}
