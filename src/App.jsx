import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Calendar from './components/Calendar.jsx';
import Main from './components/Main.jsx';
import Notes from './components/Notes.jsx';
import Timer from './components/Timer.jsx';
import About from './components/About.jsx';
import { motion } from "framer-motion";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(45deg, var(--hunyadi-yellow), var(--moss-green))",
          zIndex: -1,
        }}
        onMouseMove={(e) => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          e.currentTarget.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--hunyadi-yellow), var(--moss-green))`;
        }}
      >
        {/* Your app content goes here */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1></h1>
        </div>
      </motion.div>
    </>
  );
}

export default App;
