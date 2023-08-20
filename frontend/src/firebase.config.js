// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9eZBhverm0Vz1L0Z8ey4OJjEIIxNWetU",
    authDomain: "flipkart-otpver.firebaseapp.com",
    projectId: "flipkart-otpver",
    storageBucket: "flipkart-otpver.appspot.com",
    messagingSenderId: "887175693293",
    appId: "1:887175693293:web:59628346026299f4819de4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
