import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import '../styles/Notes.css';

const Notes = () => {
    const [note, setNote] = useState('');

    const clearNote = () => setNote('');
    const copyText = () => {
        navigator.clipboard.writeText(note);
        alert('Text copied to clipboard!');
    };

    return (
        <>
            <Navbar />
            <div className="container" style={containerStyle}>
                <h1 style={headingStyle}>Notes</h1>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your notes here..."
                    style={textareaStyle}
                />
                <div className="controls" style={controlsStyle}>
                    <button onClick={clearNote} style={buttonStyle}>Clear</button>
                    <button onClick={copyText} style={buttonStyle}>Copy</button>
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
    maxWidth: '600px',
    marginTop: '120px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const headingStyle = {
    margin: '0 0 1rem 0',
    color: 'var(--dark-slate-gray)',
};

const textareaStyle = {
    width: '100%',
    height: '200px',
    padding: '1rem',
    border: '1px solid var(--moss-green)',
    borderRadius: '5px',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem',
    resize: 'none',
    marginBottom: '1rem',
    borderStyle: 'none',
};

const controlsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
};

const buttonStyle = {
    padding: '0.75rem 1rem',
    background: 'var(--dark-slate-gray)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    marginRight: '0.5rem',
};

export default Notes;
