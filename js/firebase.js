// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUBsd9iS1oe1jRSjo-WZKLI-vRppXJTZQ",
  authDomain: "ss-drug-house-bc-portal.firebaseapp.com",
  projectId: "ss-drug-house-bc-portal",
  storageBucket: "ss-drug-house-bc-portal.firebasestorage.app",
  messagingSenderId: "443871634041",
  appId: "1:443871634041:web:0eaa424e564dcfab826aa8",
  measurementId: "G-QYZBRZ3VFQ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export { doc, getDoc, setDoc };