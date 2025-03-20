import MainLayout from "./Layout/Layout.jsx";
import './stylesheet/App.css';
import React  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HangBertPage from './Pages/HangBertPage.jsx';
import Home from './Pages/Home';
import About from './Pages/About';
import SpinnerPage from './Pages/SpinnerPage.jsx';
import ChatPage from "./Pages/ChatPage.jsx";
import ChatOrLoginPage from "./Pages/ChatOrLoginPage.jsx";
import RockPaperScissorPage from "./Pages/RockPaperScissorPage.jsx";
import Leaderboards from "./Pages/Leaderboards.jsx";

//npm install firebase react-firebase-hooks
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, analytics };

function App() {
  return (
    
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/HangBertPage" element={<HangBertPage/>} />
        <Route path="/SpinnerPage" element={<SpinnerPage/>} />
        <Route path="/ChatPage" element={<ChatPage/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/RockPaperScissorPage" element={<RockPaperScissorPage/>} />
        <Route path="/Leaderboards" element={<Leaderboards/>} />
        
        
      </Route>
    </Routes>
    
  );
};

export default App;
