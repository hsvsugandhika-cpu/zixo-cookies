// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh9MZYMmUGGP6nRif7M1j00ctr-WgTVZk",
  authDomain: "zixo-cookies.firebaseapp.com",
  projectId: "zixo-cookies",
  storageBucket: "zixo-cookies.firebasestorage.app",
  messagingSenderId: "584903946693",
  appId: "1:584903946693:web:bea4529a6f56a1ec6f5bac",
  measurementId: "G-7R7G42F6J7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
