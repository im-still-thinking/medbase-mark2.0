import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBVKudViZfBj08ZfCVjj6nbgbM3pqlZjKU",
    authDomain: "medbase-ii.firebaseapp.com",
    projectId: "medbase-ii",
    storageBucket: "medbase-ii.appspot.com",
    messagingSenderId: "185301900811",
    appId: "1:185301900811:web:d9724c5d2575ce5e3f310e",
    measurementId: "G-B55L446C4E"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getFirestore(app);

export default auth;