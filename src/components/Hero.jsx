import React from 'react';

export default function Hero({ data }) {
    if (!data) return null;

    return (
        <section id="home" className="hero section-padding">
            <div className="container hero-container">
                <div className="hero-content">
                    <span className="hero-tagline animate-fade-in">{data.tagline}</span>
                    <h1 className="hero-title animate-slide-up">{data.name}</h1>
                    <h2 className="hero-subtitle animate-slide-up">{data.title}</h2>
                    <p className="hero-description animate-slide-up">
                        {data.description}
                    </p>
                    <div className="hero-cta animate-slide-up">
                        <a href="#projects" className="btn btn-primary">المشاريع العامة</a>
                        <a href="#google-apps" className="btn btn-secondary" style={{ background: 'rgba(0, 210, 255, 0.1)', borderColor: 'var(--accent-secondary)' }}>أنظمة Google Apps</a>
                        <a href="#contact" className="btn btn-secondary">اتصل بي</a>
                    </div>
                </div>
                <div className="hero-visual animate-fade-in">
                    <div className="image-wrapper">
                        {/* We'll use a high-quality coding illustration icon if avatar is not present or default */}
                        <div className="profile-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)', minHeight: '320px' }}>
                            <svg viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                        </div>
                        <div className="image-border"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
