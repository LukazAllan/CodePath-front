const API_URL = "http://localhost:8080";

export async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    return res.json();
}

export async function getCourses(token) {
    const res = await fetch(`${API_URL}/courses`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return res.json();
}
