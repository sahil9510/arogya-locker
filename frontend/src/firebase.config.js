// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "flipkart-test-50890.firebaseapp.com",
  projectId: "flipkart-test-50890",
  storageBucket: "flipkart-test-50890.appspot.com",
  messagingSenderId: "335015752353",
  appId: "1:335015752353:web:80488469befcb5fa6336e0",
  // measurementId: "G-QW8LTLYPJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);