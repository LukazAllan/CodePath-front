export const BASE_URL = "http://localhost:8080";
export const contentType = "application/json";
export const course = "/courses";
export const auth = "/auth";
export const user = "/users";
export const section = "/sections";
export const lesson = "/lessons";
export const question = "/questions";
export const answer = "/answers";
export const enrollment = "/enrollments";
export const lessonProgress = "/lesson-progress";
export const session = "/sessions";
export const streak = "/streaks";
export const suggestion = "/suggestions";

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}${auth}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email:email, password:password })
  });
  if (!response.ok) throw new Error('Login failed');
  return await response.json();
}

export async function signUp(name, email, password) {
  const response = await fetch(`${BASE_URL}${auth}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name:name, email:email, password:password })
  });
  if (!response.ok) throw new Error('Signup failed');
  return await response.json();
}

export async function me(token) {
  const response = await fetch(`${BASE_URL}${auth}/me`,{
    method: 'POST',
    headers: {'Content-Type': "application/json"},
    body: JSON.stringify(
      {
        'token': token
      }
    )
  });
}