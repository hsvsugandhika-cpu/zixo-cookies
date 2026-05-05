import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBh9MZYMmUGGP6nRif7M1j00ctr-WgTVZk",
  authDomain: "zixo-cookies.firebaseapp.com",
  projectId: "zixo-cookies",
  storageBucket: "zixo-cookies.firebasestorage.app",
  messagingSenderId: "584903946693",
  appId: "1:584903946693:web:bea4529a6f56a1ec6f5bac",
  measurementId: "G-7R7G42F6J7"
};

const app = initializeApp(firebaseConfig);

// ✅ Fix: Only run analytics in browser
let analytics;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
