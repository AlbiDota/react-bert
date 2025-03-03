import logo from './bert.png';
import './stylesheet/App.css';
import React  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spill from './Pages/Spill';
import NavBar from './components/NavBar';
import Home from './Pages/Home';
import About from './Pages/About';
import MainLayout from "./Layout/Layout.jsx";

function App() {
  return (
    
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/Spill" element={<Spill/>} />
        <Route path="/About" element={<About/>} />
      </Route>
    </Routes>
    
  );
};

export default App;
