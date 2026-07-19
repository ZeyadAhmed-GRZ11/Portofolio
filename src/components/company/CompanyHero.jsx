import React from 'react';

export default function CompanyHero({ data, lang, t }) {
    const isRtl = lang === 'ar';
    if (!data) return null;

    const tagline = lang === 'ar' ? (data.tagline_ar || data.tagline_en) : (data.tagline_en || data.tagline_ar);
    const description = lang === 'ar' ? (data.description_ar || data.description_en) : (data.description_en || data.description_ar);

    return (
        <section id="hero" className="hero section-padding" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="hero-container" style={{ textAlign: isRtl ? 'right' : 'left' }}>

                    <div className="hero-content">
                        {/* Logo or company icon */}
                        <div style={{ marginBottom: '24px' }}>
                            {data.logoBase64 ? (
                                <img
                                    src={data.logoBase64}
                                    alt={data.name}
                                    style={{ height: '72px', width: 'auto', objectFit: 'contain', borderRadius: '12px' }}
                                />
                            ) : (
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                    borderRadius: '16px',
                                    padding: '14px 20px'
                                }}>
                                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fff" strokeWidth="2">
                                        <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>{data.name}</span>
                                </div>
                            )}
                        </div>

                        <h1 className="hero-name" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '16px' }}>
                            {tagline}
                        </h1>

                        <p className="hero-description" style={{ maxWidth: '620px', fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '36px' }}>
                            {description}
                        </p>

                        <div className="hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
                            <a href="#services" className="btn btn-primary">
                                {t.company?.hero_cta_services}
                            </a>
                            <a href="#portfolio" className="btn btn-secondary">
                                {t.company?.hero_cta_portfolio}
                            </a>
                            <a href="#contact" className="btn btn-ghost">
                                {t.company?.hero_cta_contact}
                            </a>
                        </div>
                    </div>

                    {/* Decorative side graphic */}
                    <div className="hero-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{
                            position: 'relative',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, var(--glow-color-1) 0%, transparent 70%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '24px',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                boxShadow: '0 20px 60px var(--shadow-color)'
                            }}>
                                <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="url(#grad)" strokeWidth="1.5">
                                    <defs>
                                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="var(--accent-primary)" />
                                            <stop offset="100%" stopColor="var(--accent-secondary)" />
                                        </linearGradient>
                                    </defs>
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    {data.name}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
