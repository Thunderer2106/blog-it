/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-it-9e79b.firebaseapp.com",
  projectId: "blog-it-9e79b",
  storageBucket: "blog-it-9e79b.appspot.com",
  messagingSenderId: "170400062555",
  appId: "1:170400062555:web:6d1d2dbb9c73b973fd337e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
