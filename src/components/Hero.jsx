import React from 'react';

export default function Hero({ data, lang, t }) {
    if (!data) return null;

    const isRtl = lang === 'ar';
    const description = isRtl ? data.description : (data.description_en || data.description);

    return (
        <section id="home" className="hero section-padding">
            <div className="container hero-container" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                <div className="hero-content" style={{ textAlign: isRtl ? 'right' : 'left', alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                    <span className="hero-tagline animate-fade-in">{t.hero.tagline}</span>
                    <h1 className="hero-title animate-slide-up">{data.name}</h1>
                    <h2 className="hero-subtitle animate-slide-up">{data.title}</h2>
                    <p className="hero-description animate-slide-up">{description}</p>
                    <div className="hero-cta animate-slide-up" style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
                        <a href="#projects" className="btn btn-primary">{t.hero.cta_projects}</a>
                        <a
                            href="#google-apps"
                            className="btn btn-secondary"
                            style={{ background: 'rgba(0, 210, 255, 0.1)', borderColor: 'var(--accent-secondary)' }}
                        >
                            {t.hero.cta_google}
                        </a>
                        <a href="#contact" className="btn btn-secondary">{t.hero.cta_contact}</a>
                    </div>
                </div>

                <div className="hero-visual animate-fade-in">
                    <div className="image-wrapper">
                        {data.avatarBase64 ? (
                            <img
                                src={data.avatarBase64}
                                alt={data.name}
                                className="profile-img"
                                style={{ objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="profile-img" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                                minHeight: '320px'
                            }}>
                                <svg viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                    <polyline points="2 17 12 22 22 17"></polyline>
                                    <polyline points="2 12 12 17 22 12"></polyline>
                                </svg>
                            </div>
                        )}
                        <div className="image-border"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
