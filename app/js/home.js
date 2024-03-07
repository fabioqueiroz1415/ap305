function ir_home() {
    var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\index.html";
    texto = "https://fabioqueiroz1415.github.io/ap305/app";
    window.location.href = texto;
}

var datas = [];
var saldo_geral = [];
var usuario = "TODOS";
var tipo_selecionado = "tudo";

function inicializa_home() {
    const email = localStorage.getItem("email_305");
    const senha = localStorage.getItem("senha_305");

    if(!email || !senha) ir_login();

    const bd = firebase.firestore();

    // Adiciona um evento de mudança ao elemento de seleção
    document.getElementById("selecao-tipo").addEventListener("change", function() {
        tipo_selecionado = this.value;
        refaz_linhas();
    });

    document.getElementById("selecao-usuario").addEventListener("change", function() {
        usuario = this.value;
        refaz_linhas();
    });

    carrega_dados(email, senha, bd);
}

function carrega_dados(email, senha, bd) {
    firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
        bd.collection("usuarios").get().then((querySnapshot) => {
            let promises = [];  // Armazena todas as promessas
            querySnapshot.forEach((doc) => {
                let email_temp = doc.data().email;
                let nome = doc.data().nome;
                if(email === email_temp) nome = "EU";
                let promise = bd.collection(email_temp).get().then((querySnapshot) => {
                    var saldo = 0;
                    var dados = [];
                    querySnapshot.forEach((doc) => {
                        const dado = doc.data();
                        saldo += parseFloat(dado.valor);
                        dados.push(dado);
                    });
                    datas.push({nome: nome.toUpperCase(), dados: dados});
                    saldo_geral.push({nome: nome.toUpperCase(), saldo: saldo});
                });
                promises.push(promise);  // Adiciona a promessa ao array
            });
            // Espera todas as promessas serem resolvidas antes de chamar carrega_saldo_geral()
            Promise.all(promises).then(() => {
                carrega_saldo_geral();
                refaz_linhas();
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
    for(let i = table.rows.length - 2; i > 0; i--) {
        table.deleteRow(i);
    }
    
    datas.forEach((data_usuario) => {
        if(usuario === "TODOS" || usuario === data_usuario.nome) {
            var data = data_usuario.dados;
            data.forEach((dado) => {
                adiciona_linha_tabela(dado);
            })
        }
    });
}

function adiciona_linha_tabela(data) {
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
    let select = document.getElementById("selecao-usuario");

    // Cria um novo elemento span para o nome
    let option = document.createElement("option");

    option.innerHTML = "R$" + (saldo == 0.0 ? "0" : "") + saldo.toFixed(2) + ": " + nome;
    option.setAttribute("value", nome);
    select.appendChild(option);
}

function carrega_saldo_geral() {
    var menor_saldo = null;
    saldo_geral.forEach((um_saldo) => {
        if(menor_saldo == null || menor_saldo > um_saldo.saldo)
            menor_saldo = um_saldo.saldo;
    });

    saldo_geral.forEach((um_saldo) => {
        um_saldo.saldo -= menor_saldo;
        adiciona_saldo_geral(um_saldo.nome, um_saldo.saldo);
    });
}

/*
function ir_home() {
    var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\index.html";
    texto = "https://fabioqueiroz1415.github.io/ap305/app";
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
            let promises = [];  // Armazena todas as promessas
            querySnapshot.forEach((doc) => {
                let email_temp = doc.data().email;
                let nome = doc.data().nome;
                if(email === email_temp) nome = "EU";

                let promise = bd.collection(email_temp).get().then((querySnapshot) => {
                    var saldo = 0;
                    querySnapshot.forEach((doc) => {
                        const dado = doc.data();
                        saldo += parseFloat(dado.valor);
                        if(email === email_temp) datas.push(dado);
                    });
                    saldo_geral.push({nome: nome, saldo: saldo});
                    if(email === email_temp) refaz_linhas();
                });
                promises.push(promise);  // Adiciona a promessa ao array
            });
            // Espera todas as promessas serem resolvidas antes de chamar carrega_saldo_geral()
            Promise.all(promises).then(() => carrega_saldo_geral());
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
    for(let i = table.rows.length - 2; i > 0; i--) {
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

    // Cria um novo elemento span para o nome
    let span = document.createElement("span");
    span.innerHTML = nome;
    span.classList.add("span-saldo");
    
    // Adiciona o nome e o saldo ao parágrafo
    p.appendChild(span);
    p.innerHTML += ": R$" + saldo.toFixed(2);
    if(!saldo) p.classList.add("saldo-vermelho");
    
    div.appendChild(p);
}

function carrega_saldo_geral() {
    var menor_saldo = null;
    saldo_geral.forEach((um_saldo) => {
        if(menor_saldo == null || menor_saldo > um_saldo.saldo)
            menor_saldo = um_saldo.saldo;
    });

    saldo_geral.forEach((um_saldo) => {
        um_saldo.saldo -= menor_saldo;
        adiciona_saldo_geral(um_saldo.nome, um_saldo.saldo);
    });
}
*/ 