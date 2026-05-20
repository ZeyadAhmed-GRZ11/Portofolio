import React from 'react';

export default function Hero() {
    return (
        <section id="home" className="hero section-padding">
            <div className="container hero-container">
                <div className="hero-content">
                    <span className="hero-tagline animate-fade-in">Hi, my name is</span>
                    <h1 className="hero-title animate-slide-up">Zeyad Ahmed</h1>
                    <h2 className="hero-subtitle animate-slide-up">Building Robust Desktop Systems & Modern Web Interfaces</h2>
                    <p className="hero-description animate-slide-up">
                        I am a versatile software developer bridging the gap between high-performance native desktop clients and responsive, modern web applications. Specialized in C++/Win32/MFC development, SQL Server architecture, and React/Vite development.
                    </p>
                    <div className="hero-cta animate-slide-up">
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                    </div>
                </div>
                <div className="hero-visual animate-fade-in">
                    <div className="image-wrapper">
                        <img src="assets/zeyad_portrait.jpg" alt="Zeyad Ahmed - Developer headshot" className="profile-img" />
                        <div className="image-border"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
