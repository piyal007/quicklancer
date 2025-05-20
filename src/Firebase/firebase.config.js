// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX8-WXtimNocVhrffyzvO11rRpWLNBWFA",
  authDomain: "assignment-10-2e230.firebaseapp.com",
  projectId: "assignment-10-2e230",
  storageBucket: "assignment-10-2e230.firebasestorage.app",
  messagingSenderId: "881515332030",
  appId: "1:881515332030:web:1e75a4c9a10e576693f9ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);