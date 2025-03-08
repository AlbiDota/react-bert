import MainLayout from "./Layout/Layout.jsx";
import './stylesheet/App.css';
import React  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HangBertPage from './Pages/HangBertPage.jsx';
import Home from './Pages/Home';
import About from './Pages/About';
import SpinnerPage from './Pages/SpinnerPage.jsx';
import ChatPage from "./Pages/ChatPage.jsx";

/* FIREBASE STUFF */
//npm install firebase react-firebase-hooks
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBoMExGfzEQOonARqSAUY6U7p2jj1MC_8",
  authDomain: "react-bert.firebaseapp.com",
  projectId: "react-bert",
  storageBucket: "react-bert.firebasestorage.app",
  messagingSenderId: "929070805505",
  appId: "1:929070805505:web:c32fd023492dca8d1f0600",
  measurementId: "G-1S82T7WZR3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
/* FIREBASE STUFF */

function App() {
  return (
    
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/HangBertPage" element={<HangBertPage/>} />
        <Route path="/SpinnerPage" element={<SpinnerPage/>} />
        <Route path="/ChatPage" element={<ChatPage/>} />
        <Route path="/About" element={<About/>} />
        
      </Route>
    </Routes>
    
  );
};

export default App;
