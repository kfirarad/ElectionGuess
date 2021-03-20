import firebase from 'firebase';
import configData from "../config/config.json";

const firebaseApp = firebase.initializeApp(configData.firebase);
const db = firebaseApp.firestore();

export {db};
