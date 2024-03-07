function ir_home() {
    var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\html\\";
    texto = "https://fabioqueiroz1415.github.io/ap305/app/html/";
    texto += "home.html";
    window.location.href = texto;
}

var datas = [];
var saldo_geral = [];

function inicializa_home() {
    const email = localStorage.getItem("email_305");
    const senha = localStorage.getItem("senha_305");

    if(!email || !senha) ir_login();

    const bd = firebase.firestore();

    // Adiciona um evento de mudança ao elemento de seleção
    document.getElementById("selecao-tipo").addEventListener("change", function() {
        refaz_linhas();
    });

    carrega_dados(email, senha, bd);
}

function carrega_dados(email, senha, bd) {
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
        bd.collection("usuarios").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let email_temp = doc.data().email;
                let nome = doc.data().nome;
                
                bd.collection(email_temp).get().then((querySnapshot) => {

                    if(email === email_temp){
                        var saldo = 0;
                        querySnapshot.forEach((doc) => {
                            const dado = doc.data();
                            datas.push(dado);
                            saldo += parseFloat(dado.valor);
                        });
                        edita_meu_saldo(saldo);
                        refaz_linhas();
                    } else {
                        var saldo = 0;
                        querySnapshot.forEach((doc) => {
                            const dado = doc.data();
                            saldo += parseFloat(dado.valor);
                        });
                        adiciona_saldo_geral(nome, saldo);
                    }
                    })
            });
        });
    })
    .catch((error) => {
      alert("ocorreu um erro.");
      ir_login;
    });
}

function refaz_linhas() {
    // Limpa a tabela antes de adicionar novas linhas
    let table = document.getElementById("produtos");
    for(let i = table.rows.length - 2; i > 1; i--) {
        table.deleteRow(i);
    }

    datas.forEach((data) => {
        adiciona_linha_tabela(data);
    });
}

function adiciona_linha_tabela(data) {
    // Obtém o tipo selecionado
    let tipo_selecionado = document.getElementById("selecao-tipo").value;

    // Só adiciona a linha se o tipo de dados corresponder ao tipo selecionado
    if(tipo_selecionado === "tudo" || data.tipo === tipo_selecionado) {
        let table = document.getElementById("produtos");
        let row = table.insertRow(table.rows.length -1);  // insere uma nova linha no final da tabela

        let cell1 = row.insertCell(0);  // insere uma nova célula na linha
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = data.tipo;
        cell2.innerHTML = data.descricao;
        cell3.innerHTML = "R$" + parseFloat(data.valor).toFixed(2);
        cell4.innerHTML = data.data;
    }
}

function adiciona_saldo_geral(nome, saldo) {
    var div = document.getElementById("saldo-geral");
    let p = document.createElement("p");
    p.innerHTML = nome + ": R$" + saldo.toFixed(2);
    div.appendChild(p);
}

function edita_meu_saldo(saldo) {
    document.getElementById("saldo").innerHTML = saldo.toFixed(2);
}