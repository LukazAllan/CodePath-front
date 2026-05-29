import { API_BASE_URL, signUp } from "/js/api.js";
import { NewUser } from "/js/model.js";

async function doSignUp() {
  const name = document.getElementById("reg-nome").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pass").value;

  const res = await signUp(new NewUser(name, email, password));

  const data = await res.json();

  console.log(data);

  // salva token
  localStorage.setItem("token", data.token);

  // redireciona pro app
  window.location.href = "index.html";
}

window.doLogin = doLogin;
