import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Calendar from './components/Calendar.jsx';
import Main from './components/Main.jsx';
import Notes from './components/Notes.jsx';
import Timer from './components/Timer.jsx';
import About from './components/About.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
