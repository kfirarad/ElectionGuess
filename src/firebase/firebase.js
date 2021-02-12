import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC4VuWG6lDk0XOBV2kA7d7NMSP9g3CCIL0",
  authDomain: "kneset-b349d.firebaseapp.com",
  projectId: "kneset-b349d",
  databaseURL: "https://kneset-b349d-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "kneset-b349d.appspot.com",
  messagingSenderId: "1074406167963",
  appId: "1:1074406167963:web:6fc68461fee0a7c414bd3e",
  measurementId: "G-JTW6VR9GQF"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();

export { db };
