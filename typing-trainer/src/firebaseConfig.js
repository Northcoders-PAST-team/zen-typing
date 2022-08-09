// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYWKYmxk_OGPDL6E3wxySyEgXDAF-8sOs",
  authDomain: "tr-practice.firebaseapp.com",
  databaseURL:
    "https://tr-practice-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tr-practice",
  storageBucket: "tr-practice.appspot.com",
  messagingSenderId: "288443965163",
  appId: "1:288443965163:web:7d42ef65141b76307668ae",
  measurementId: "G-NJQ64W9PS8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
