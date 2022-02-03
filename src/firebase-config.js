import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBY_18Xqe5J5s8sQHPKnPXWiEOUXRlWQhg",
  authDomain: "workboard-ee9ec.firebaseapp.com",
  databaseURL: "https://workboard-ee9ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "workboard-ee9ec",
  storageBucket: "workboard-ee9ec.appspot.com",
  messagingSenderId: "598679887499",
  appId: "1:598679887499:web:8c50f1f2cd4af3db453e8e"
};

const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
getToken(messaging, {
  vapidKey:
    "BDemoD4_d-XnKxHDJ18Mh64vwjIjrbXBljfTsXHXUuwaU-Ajrbur2f0xT837Cm1ti3zhyyneLKrnKe6xgkjR5Xg",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("success");
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

export const db = getFirestore(app);
