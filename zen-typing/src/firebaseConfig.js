import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYWKYmxk_OGPDL6E3wxySyEgXDAF-8sOs",
  authDomain: "tr-practice.firebaseapp.com",
  databaseURL:
    "https://tr-practice-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tr-practice",
  storageBucket: "tr-practice.appspot.com",
  messagingSenderId: "288443965163",
  appId: "1:288443965163:web:4e95325f7b2231e37668ae",
  measurementId: "G-M4CQE95XRJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
