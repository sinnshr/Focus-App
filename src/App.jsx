import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Timer from "./components/Timer";
import Calendar from "./components/Calendar";
import Note from "./components/Note";

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-5 max-w-[90%] m-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="timer" element={<Timer />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="note" element={<Note />} />
      </Routes>    
    </div>
  )
}

export default App