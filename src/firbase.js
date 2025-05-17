// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eventmanagement-c6c57.firebaseapp.com",
  projectId: "eventmanagement-c6c57",
  storageBucket: "eventmanagement-c6c57.firebasestorage.app",
  messagingSenderId: "604957614825",
  appId: "1:604957614825:web:85efe2df2935c8094e8678",
  measurementId: "G-KCH5QF00EF"
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

