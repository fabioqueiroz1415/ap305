function getColecao(nome_colecao) {
    const dados = [];
    getBD().collection(nome_colecao).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        dados.push(doc.data());
      });
    });
    return dados;
}