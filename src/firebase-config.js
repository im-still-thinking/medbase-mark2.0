import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3KOaJErobG_PVouZqTHXvLWmRfaGITIk",
    authDomain: "medbase-iii.firebaseapp.com",
    projectId: "medbase-iii",
    storageBucket: "medbase-iii.firebasestorage.app",
    messagingSenderId: "979503280744",
    appId: "1:979503280744:web:18747105ad529bc629c1dd",
    measurementId: "G-RGFMM4375M"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;