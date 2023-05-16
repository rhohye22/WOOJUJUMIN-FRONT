// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {
  apiKey: "AIzaSyArDWozPgzSt9GkQhCQ80NKI0EVKjP0yWQ",
  authDomain: "woojujumin-photo.firebaseapp.com",
  projectId: "woojujumin-photo",
  storageBucket: "woojujumin-photo.appspot.com",
  messagingSenderId: "1016654526037",
  appId: "1:1016654526037:web:cc74b7016b1c8f3cd6c6dc",
  measurementId: "G-T0R7QFEJSS",
};

/* // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
//export const auth = getAuth();
//export const storage = getStorage(); // 이미지 저장공간
//export const db = getFirestore();

// Initialize Firebase

//const firebaseApp = initializeApp(firebaseConfig2, "firebasePhotoApp"); // 'your-app-name'은 고유한 이름으로 수정해주세요.

export const firebasePhotoApp = initializeApp(firebaseConfig2, "firebasePhotoApp");
export const auth = getAuth();
export const storage = getStorage(); // 이미지 저장공간
export const db = getFirestore();
