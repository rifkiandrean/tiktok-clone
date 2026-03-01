import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmkyepXrYqoo8YN-Wt_oQzVG-3SG-KgYM",
  authDomain: "tiktok-vell.firebaseapp.com",
  projectId: "tiktok-vell",
  storageBucket: "tiktok-vell.firebasestorage.app",
  messagingSenderId: "1039304879109",
  appId: "1:1039304879109:web:fdcfc545357c378b26806c",
  measurementId: "G-XMNPPJ4N60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
