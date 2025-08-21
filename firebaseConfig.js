
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVgi0kzNnfM28dMX1O5s5BUkzE0VLtiSg",
  authDomain: "delivery-24f61.firebaseapp.com",
  projectId: "delivery-24f61",
  storageBucket: "delivery-24f61.firebasestorage.app",
  messagingSenderId: "165168251280",
  appId: "1:165168251280:web:a5af2a122be57e27def315",
  measurementId: "G-QD28XBLFQL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);



