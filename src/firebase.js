import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDBoMExGfzEQOonARqSAUY6U7p2jj1MC_8",
  authDomain: "react-bert.firebaseapp.com",
  projectId: "react-bert",
  storageBucket: "react-bert.firebasestorage.app",
  messagingSenderId: "929070805505",
  appId: "1:929070805505:web:c32fd023492dca8d1f0600",
  measurementId: "G-1S82T7WZR3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, analytics };
