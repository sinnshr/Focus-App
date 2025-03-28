import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/timer" style={linkStyle}>Timer</Link>
            <Link to="/calendar" style={linkStyle}>Calendar</Link>
            <Link to="/notes" style={linkStyle}>Notes</Link>
            <Link to="/about" style={linkStyle}>About</Link>
            <button className="theme-toggle" type="button" title="Toggle theme" onClick={toggleTheme} style={buttonStyle}>
                Change Theme
            </button>
        </nav>
    );
};

const navStyle = {
    background: 'var(--moss-green)',
    padding: '1rem',
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    borderRadius: '0px 0px 15px 15px',
    flexWrap: 'nowrap',
};

const linkStyle = {
    color: 'var(--charcoal)',
    textDecoration: 'none',
    fontWeight: 'bolder',
    padding: '0.5rem 1rem',
    transition: 'background-color 0.3s, transform 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const buttonStyle = {
    padding: '0.75rem 1rem',
    background: 'var(--hunyadi-yellow)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 'bold',
};

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    body.style.backgroundColor = isDark ? '#2c2c2c' : 'var(--dark-slate-gray)';
    body.style.color = isDark ? '#f4f4f9' : 'var(--charcoal)';
}

export default Navbar;
