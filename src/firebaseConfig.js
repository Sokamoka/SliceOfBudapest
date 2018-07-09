import Firebase from "firebase";

const config = {
  apiKey: "AIzaSyCOraaD1lRuRa2mhFnYo-fUbel5P4-iYr8",
  authDomain: "slice-of-budapest.firebaseapp.com",
  databaseURL: "https://slice-of-budapest.firebaseio.com",
  projectId: "slice-of-budapest",
  storageBucket: "slice-of-budapest.appspot.com",
  messagingSenderId: "524213470589"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();
export const dbMenuRef = db.ref("menu");
