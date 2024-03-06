function getDoc(nome_colecao, nome_doc) {
    const docRef = getBD().collection(nome_colecao).doc(nome_doc);
    var docVal;
    docRef.get().then((doc) => {
        if(doc.exists) {
            docVal = doc.data();
        }
    })
    console.log(docVal);
    //return docVal;
}

function addDoc(nome_colecao) {
    getBD().collection(nome_colecao).doc().set({});
  }

function addDoc(nome_colecao, nome_doc) {
    getBD().collection(nome_colecao).doc(nome_doc).set({});
  }

function delDoc(nome_colecao, nome_doc) {
    const docRef = getBD().collection(nome_colecao).doc(nome_doc);

    docRef.delete().then(() => {
        return;
    }).catch((error) => {
        console.log("erro ao deletar documento: ", error);
    })
}