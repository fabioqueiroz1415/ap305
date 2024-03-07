function ir_home() {
    var texto = "D:\\Usuarios\\fabio\\Área de Trabalho\\github\\fabioqueiroz1415\\pessoal\\ap305\\app\\html\\";
    //texto = "https://fabioqueiroz1415.github.io/ap305/app/html/";
    texto += "home.html";
    window.location.href = texto;
}
var datas = [];
function inicializa_home() {
    const email = localStorage.getItem("email_305");
    const senha = localStorage.getItem("senha_305");
    const bd = firebase.firestore();

    // Adiciona um evento de mudança ao elemento de seleção
    document.getElementById("selecao-tipo").addEventListener("change", function() {
        refaz_linhas(email, senha, bd);
    });

    refaz_linhas(email, senha, bd);
}

function refaz_linhas(email, senha, bd) {
    // Limpa a tabela antes de adicionar novas linhas
    let table = document.getElementById("produtos");
    for(let i = table.rows.length - 2; i > 1; i--) {
        table.deleteRow(i);
    }

    if(datas.length > 0) {
        datas.forEach((data) => {
            adiciona_linha_tabela(data);
        });
    } else {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            bd.collection(email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    datas.push(data);
                    adiciona_linha_tabela(data);

                    let valor = data.valor;
                    adiciona_saldo(valor);
                });
            });
        })
        .catch((error) => {
          alert("ocorreu um erro.");
          ir_login;
        });
    }
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

function adiciona_saldo(valor) {
    var atual = parseFloat(document.getElementById("saldo").innerHTML);
    document.getElementById("saldo").innerHTML = (atual + valor).toFixed(2);
}
