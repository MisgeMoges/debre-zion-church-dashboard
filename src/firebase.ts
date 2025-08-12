// firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWypR4YM5Jv77Cvv5_uXj_ltoxyY4ium4",
  authDomain: "church-app-72fc8.firebaseapp.com",
  projectId: "church-app-72fc8",
  storageBucket: "church-app-72fc8.firebasestorage.app",
  messagingSenderId: "917999066992",
  appId: "1:917999066992:web:1faf703aa66e1ddf9eb9b5",
  measurementId: "G-8ZJCLLH4LE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth and export
const auth = getAuth(app);

export {
  app,
  analytics,
  auth,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
};
