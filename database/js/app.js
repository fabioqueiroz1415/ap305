(function () {
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
})();

function getBD() {
  const bd = firebase.firestore();
  return bd;
}


