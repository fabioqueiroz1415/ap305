function ir_login() {
  var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\html\\";
  texto = "https://fabioqueiroz1415.github.io/ap305/app/html/";
  texto += "login.html";
  window.location.href = texto;
}

const firebase_config = {
  apiKey: "AIzaSyCmq1-Brp_XpddrfRoPDiQoVf1s9YguIPI",
  authDomain: "ap305-53903.firebaseapp.com",
  projectId: "ap305-53903",
  storageBucket: "ap305-53903.appspot.com",
  messagingSenderId: "181081410987",
  appId: "1:181081410987:web:76710df961fc5ff4ec56ee",
  measurementId: "G-9K5S7VV5L0"
};

firebase.initializeApp(firebase_config);

function autentica_usuario() {
    var email = document.querySelector('input[name="uname"]').value;
    var senha = document.querySelector('input[name="psw"]').value;

    document.getElementById("botaoLogin").innerHTML = "Carregando...";

    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      localStorage.setItem("email_305", email);
      localStorage.setItem("senha_305", senha);
      ir_home();
    })
    .catch((error) => {
      alert("usuário ou senha inválidos.");
      document.getElementById("botaoLogin").innerHTML = "Login";
    });
}