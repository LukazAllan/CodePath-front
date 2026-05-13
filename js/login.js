const API_URL = "http://localhost:8080";

async function doLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log(data);

    // salva token
    localStorage.setItem("token", data.token);

    // redireciona pro app
    window.location.href = "index.html";
}

window.doLogin = doLogin;