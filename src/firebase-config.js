import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbQPZHKpD_1SqyxyH-vXkFewH2Dp4xiMA",
  authDomain: "medbaserevamp.firebaseapp.com",
  projectId: "medbaserevamp",
  storageBucket: "medbaserevamp.appspot.com",
  messagingSenderId: "979990689981",
  appId: "1:979990689981:web:761c43f384acd713fd9fd4",
  measurementId: "G-VRMVQ12XXQ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;