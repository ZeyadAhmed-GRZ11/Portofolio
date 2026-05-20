import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <a href="#home" className="logo">&lt;Zeyad.Dev/&gt;</a>
                    <p>Solving complex systems challenges through efficient native programming and robust responsive web applications.</p>
                </div>
                <div className="footer-links">
                    <h4>Quick Navigation</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#resume">Resume</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Zeyad Ahmed. All Rights Reserved. Built with React & Vite.</p>
                </div>
            </div>
        </footer>
    );
}
