import React from 'react';

export default function Footer({ contact, onAdminOpen, lang, t }) {
    const isRtl = lang === 'ar';

    const navLinks = [
        { href: '#home', label: t.nav.home },
        { href: '#projects', label: t.nav.projects },
        { href: '#google-apps', label: t.nav.googleApps },
        { href: '#skills', label: t.nav.skills },
        { href: '#resume', label: t.nav.resume },
        { href: '#contact', label: t.nav.contact }
    ];

    return (
        <footer className="footer">
            <div className="container footer-container" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
                <div className="footer-brand">
                    <a href="#home" className="logo"><span className="logo-accent">&lt;</span>Zeyad.Dev<span className="logo-accent">/&gt;</span></a>
                    <p>{t.footer.desc}</p>
                </div>
                <div className="footer-links">
                    <h4>{t.footer.links}</h4>
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.href}><a href={link.href}>{link.label}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', direction: isRtl ? 'rtl' : 'ltr' }}>
                    <p>&copy; {new Date().getFullYear()} Zeyad Ahmed. {t.footer.rights}</p>
                    <p style={{ display: 'flex', gap: '15px' }}>
                        <span
                            onClick={onAdminOpen}
                            style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
                            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                            title="Admin Panel"
                        >
                            ⚙️ {t.footer.admin}
                        </span>
                        <span>{t.footer.built}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
