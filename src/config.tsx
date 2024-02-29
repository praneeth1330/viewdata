// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEUOz_8T8R39zpA4kgL6A0K_u3hoAR-NM",
  authDomain: "viewdata-4b8d0.firebaseapp.com",
  projectId: "viewdata-4b8d0",
  storageBucket: "viewdata-4b8d0.appspot.com",
  messagingSenderId: "70539216269",
  appId: "1:70539216269:web:90d3bb74ddcbfce87be9c4",
  measurementId: "G-G95VVY3FEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
