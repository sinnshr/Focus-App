import React, { useState, useRef } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/Timer.css';

const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (timerRef.current) return;
        timerRef.current = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
    };

    const resetTimer = () => {
        stopTimer();
        setElapsedTime(0);
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <Navbar />
            <div className="container" style={containerStyle}>
                <h1 style={headingStyle}>Timer</h1>
                <div className="timer" style={timerStyle}>{formatTime(elapsedTime)}</div>
                <div className="controls" style={controlsStyle}>
                    <button onClick={startTimer} style={buttonStyle}>Start</button>
                    <button onClick={stopTimer} style={buttonStyle}>Stop</button>
                    <button onClick={resetTimer} style={buttonStyle}>Reset</button>
                </div>
            </div>
        </>
    );
};

const containerStyle = {
    background: 'var(--sage)',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    marginTop: '80px',
};

const headingStyle = {
    margin: '0 0 1rem 0',
    color: 'var(--dark-slate-gray)',
};

const timerStyle = {
    fontSize: '3rem',
    marginBottom: '1.5rem',
};

const controlsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
};

const buttonStyle = {
    padding: '0.75rem 1rem',
    background: 'var(--dark-slate-gray)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
};

export default Timer;
