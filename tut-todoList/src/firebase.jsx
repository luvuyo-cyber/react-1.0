// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNKgZo4QiH5v2njaILDXVg13fysWglhPI",
  authDomain: "todolist-ba74d.firebaseapp.com",
  databaseURL: "https://todolist-ba74d-default-rtdb.firebaseio.com",
  projectId: "todolist-ba74d",
  storageBucket: "todolist-ba74d.firebasestorage.app",
  messagingSenderId: "694833501374",
  appId: "1:694833501374:web:3dc8b12b86ca1095e8baef",
  measurementId: "G-ZGCT0R9C9Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
export const auth = getAuth();
