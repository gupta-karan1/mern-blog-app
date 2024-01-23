// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-abab9.firebaseapp.com",
  projectId: "mern-blog-app-abab9",
  storageBucket: "mern-blog-app-abab9.appspot.com",
  messagingSenderId: "270234884136",
  appId: "1:270234884136:web:9a7fa2f6f57120a1a2fd1d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
