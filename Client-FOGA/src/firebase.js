// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fogams-3ed75.firebaseapp.com",
  projectId: "fogams-3ed75",
  storageBucket: "fogams-3ed75.appspot.com",
  messagingSenderId: "546264222419",
  appId: "1:546264222419:web:bab98c96f459aad16ba226",
  measurementId: "G-JW697EF0BH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

