import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4h0vdDhkT4naoiAV2UEnKmsy0vV8AyOo",
  authDomain: "workboard-5e843.firebaseapp.com",
  projectId: "workboard-5e843",
  storageBucket: "workboard-5e843.appspot.com",
  messagingSenderId: "658535769279",
  appId: "1:658535769279:web:0704e17acaea92c6d8920a",
  measurementId: "G-P24KE63BVC",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
