import * as api from '../api.js';
import { HREFS } from '../href.js';

/**
 * Inicializa os dados do usuário e do curso ativo.
 * Valida o token, popula o localStorage e retorna
 * um objeto { user, course } pronto para o renderApp().
 *
 * Em caso de token inválido/ausente redireciona para login.html.
 */
export async function renderInit() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.info('Token não encontrado. Redirecionando para login.');
        window.location.href = HREFS.LOGIN;
        return null;
    }

    // -- 1. Valida sessão e hidrata localStorage com dados do usuário --
    let userData;
    try {
        userData = await api.me(token);
        if (!userData) throw new Error('Resposta vazia de /auth/me');

        for (const key in userData) {
            const value = userData[key];
            localStorage.setItem(
                key,
                typeof value === 'object' ? JSON.stringify(value) : String(value)
            );
        }
    } catch (err) {
        console.error('Sessão inválida ou expirada:', err);
        localStorage.clear();
        window.location.href = HREFS.LOGIN;
        return null;
    }

    // -- 2. Carrega o curso ativo (salvo no localStorage ou fallback id=1) --
    let courseData;
    try {
        const savedCourseId = localStorage.getItem('courseId') ?? 1;
        courseData = await api.getCourseById(savedCourseId);
        if (!courseData) throw new Error('Curso não encontrado');

        localStorage.setItem('course', JSON.stringify(courseData));
    } catch (err) {
        console.warn('Não foi possível carregar o curso ativo:', err);
        courseData = null;
    }

    // -- 3. Retorna objeto consolidado para o app.js --
    return {
        user: {
            name:   userData.name   ?? localStorage.getItem('name')   ?? 'Usuário',
            email:  userData.email  ?? localStorage.getItem('email')  ?? '',
            xp:     Number(userData.xp     ?? localStorage.getItem('xp')     ?? 0),
            hearts: Number(userData.hearts ?? localStorage.getItem('hearts') ?? 5),
            role:   userData.role   ?? localStorage.getItem('role')   ?? 'USER',
        },
        course: courseData,
    };
}