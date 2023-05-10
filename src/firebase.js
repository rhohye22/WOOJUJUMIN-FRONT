
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7HORdisBX-VOge61TB1YKaOwJXlhaosY",
  authDomain: "chatingapp-7fc8c.firebaseapp.com",
  projectId: "chatingapp-7fc8c",
  storageBucket: "chatingapp-7fc8c.appspot.com",
  messagingSenderId: "695346658050",
  appId: "1:695346658050:web:eee58e7141e24e37a5201b",
  measurementId: "G-TM17QL87TW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(); // 이미지 저장공간
export const db = getFirestore();


