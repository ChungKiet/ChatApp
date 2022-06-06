import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCTh4Lhk3g_Xw47m5d9YDVoTYQfbbq7OeU",
  authDomain: "knk-chatapp.firebaseapp.com",
  projectId: "knk-chatapp",
  storageBucket: "knk-chatapp.appspot.com",
  messagingSenderId: "624295089828",
  appId: "1:624295089828:web:a13b9bdb3f124e3ccbb831",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
