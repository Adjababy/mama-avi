import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJGaI4yNzYknL2fwWdqdC8iHu6Wi1rihE",
  authDomain: "mama-avi-bamako.firebaseapp.com",
  projectId: "mama-avi-bamako",
  storageBucket: "mama-avi-bamako.firebasestorage.app",
  messagingSenderId: "744941428558",
  appId: "1:744941428558:web:563d30f8b1bd3eaac2881f",
  measurementId: "G-79QFM5TDRB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);