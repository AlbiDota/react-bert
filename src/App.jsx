import MainLayout from "./Layout/Layout.jsx";
import './stylesheet/App.css';
import React  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HangBertPage from './Pages/HangBertPage.jsx';
import Home from './Pages/Home';
import About from './Pages/About';
import SpinnerPage from './Pages/SpinnerPage.jsx';
import ChatPage from "./Pages/ChatPage.jsx";

//npm install firebase react-firebase-hooks

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
