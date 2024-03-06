function ir_home() {
    inicializa_home();
    var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\html\\";
    //var texto = "https://fabioqueiroz1415.github.io/ap305/app/html/";
    texto += "home";
    window.location.href = texto;
}

function inicializa_home() {
    var email = localStorage.getItem("email_305");
    var senha = localStorage.getItem("senha_305");
}