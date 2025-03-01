import logo from './bert.png';
import './App.css';
import React  from 'react';
import LoggInn from './components/LoggInn';
import KontaktOss from './components/KontaktOss';
import WorkoutForm from './components/WorkoutForm';
import { Routes, Route } from 'react-router-dom';
import Spill from './Pages/Spill';
import NavBar from './components/NavBar';
import Home from './Pages/Home';
import About from './Pages/About';

function App() {
  return (
    <div>
    <NavBar style=""/>
    <Routes>
      <Route path="/Home" element={<Home/>} />
      <Route path="/Spill" element={<Spill/>} />
      <Route path="/About" element={<About/>} />
    </Routes>
    </div>
  );
};

export default App;
