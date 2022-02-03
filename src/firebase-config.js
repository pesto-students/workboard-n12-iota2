import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

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
