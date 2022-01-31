import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBY_18Xqe5J5s8sQHPKnPXWiEOUXRlWQhg",
  authDomain: "workboard-ee9ec.firebaseapp.com",
  projectId: "workboard-ee9ec",
  storageBucket: "workboard-ee9ec.appspot.com",
  messagingSenderId: "598679887499",
  appId: "1:598679887499:web:8c50f1f2cd4af3db453e8e"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);