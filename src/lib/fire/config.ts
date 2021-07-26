
// firebase goes in here. 
import firebase from "firebase";
import env from "$lib/variables";

const fb = (function module() {
  "use strict";
  (async function configure() {
    const firebaseConfig = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  })();
})();

export const firestore = firebase.firestore();
export const realtime = firebase.database();
export const auth = firebase.auth();
