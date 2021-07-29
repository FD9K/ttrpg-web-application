
// firebase goes in here. 
import firebase from "firebase";
import env from "$lib/env";

let firebaseConfig: any = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

if (env.VITE_STYLE === 'locadl') {
  firebaseConfig = {
    databaseURL: 'http://localhost:9000?ns=emulatorui',
    projectId: "ttrpg-db",
    apiKey: "",
    authDomain: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  }
}
// Initialize Firebase
firebase.apps.length !== 0 ? firebase.app() : firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const realtime = firebase.database();
const auth = firebase.auth();

if (env.VITE_STYLE === "local") {
  firestore.useEmulator("localhost", 8080);
  realtime.useEmulator("localhost", 9000);
  auth.useEmulator("http://localhost:9099");
}

export { auth, realtime, firestore };