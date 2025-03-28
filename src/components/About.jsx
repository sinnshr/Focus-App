import React from 'react';
import Navbar from './Navbar.jsx';
import '../styles/About.css';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <h1>About App</h1>
                <p>
                    Welcome to my To-Do List App! My mission is to help you stay organized
                    and productive. Whether you need to manage your daily tasks, keep track
                    of important events, or jot down quick notes, my app has got you
                    covered.
                </p>
                <div className="creators">
                    <p>Created by:</p>
                    <p>sinnshr</p>
                </div>
                <div className="contacts">
                    <a href="https://github.com/sinnshr" target="_blank" title="GitHub">
                        <img src="img/github.png" alt="GitHub" width="30" height="30" />
                    </a>
                    <a href="#" target="_blank" title="LinkedIn">
                        <img src="img/linkedin.png" alt="LinkedIn" width="30" height="30" />
                    </a>
                    <a href="#" target="_blank" title="Telegram">
                        <img src="img/telegram.png" alt="Telegram" width="30" height="30" />
                    </a>
                </div>
            </div>
        </>
    );
};

export default About;
