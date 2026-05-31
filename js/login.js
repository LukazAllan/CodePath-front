import { API_BASE_URL, signUp } from "./api.js";
import { NewUser } from "./model.js";

async function doSignUp() {
  const name = document.getElementById("reg-nome").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pass").value;

  const data = await signUp(new NewUser(name, email, password));  

  console.log(data);

  // salva token
  localStorage.setItem("token", data.token);

  // redireciona pro app
  window.location.href = "index.html";
}

//window.doLogin = doLogin;
window.doSignUp = doSignUp;
