function ir_home() {
    var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\html\\";
    texto = "https://fabioqueiroz1415.github.io/ap305/app/html/";
    texto += "home.html";
    window.location.href = texto;
}

function inicializa_home() {
    const email = localStorage.getItem("email_305");

    const bd = firebase.firestore();

    const docs = [];
    
    //recuperando todos os documentos
    bd.collection("fabioaureliodedeus@gmail.com").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        docs.push(doc.data());
      });
    });
}