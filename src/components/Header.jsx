import React, { useState, useEffect } from 'react';

export default function Header({ activeSection, theme, toggleTheme, onAdminOpen, lang, toggleLang, t, isCompany, visibility }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleLinkClick = () => setMobileMenuOpen(false);

    const handleLogoClick = (e) => {
        e.preventDefault();
        handleLinkClick();
        const next = logoClicks + 1;
        setLogoClicks(next);
        if (next >= 5) {
            setLogoClicks(0);
            onAdminOpen();
        } else {
            document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ── Build nav links based on active profile & section visibility ──
    const vis = visibility || {};

    const personalLinks = [
        { id: 'hero',        sectionKey: 'hero',       label: t.nav.home },
        { id: 'projects',    sectionKey: 'projects',   label: t.nav.projects },
        { id: 'google-apps', sectionKey: 'googleApps', label: t.nav.googleApps },
        { id: 'skills',      sectionKey: 'skills',     label: t.nav.skills },
        { id: 'resume',      sectionKey: 'resume',     label: t.nav.resume },
        { id: 'contact',     sectionKey: 'contact',    label: t.nav.contact },
    ];

    const companyLinks = [
        { id: 'hero',            sectionKey: 'hero',      label: t.nav.home },
        { id: 'services',        sectionKey: 'services',  label: t.nav.services },
        { id: 'portfolio',       sectionKey: 'portfolio', label: t.nav.portfolio },
        { id: 'company-systems', sectionKey: 'systems',   label: t.nav.systems },
        { id: 'contact',         sectionKey: 'contact',   label: t.nav.contact },
    ];

    const allLinks = isCompany ? companyLinks : personalLinks;
    // Only show links whose section is visible (or where visibility key is undefined → default show)
    const navLinks = allLinks.filter(link => vis[link.sectionKey] !== false);

    // Logo text switches per profile
    const logoText = isCompany
        ? <><span className="logo-accent">&#60;</span>TechTitans<span className="logo-accent">/&#62;</span></>
        : <><span className="logo-accent">&#60;</span>Zeyad.Dev<span className="logo-accent">/&#62;</span></>;

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <a href="#hero" className="logo" id="logo-link" onClick={handleLogoClick}>
                    {logoText}
                </a>

                <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu">
                    {navLinks.map(link => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={handleLinkClick}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="nav-actions">
                    {/* Language Toggle */}
                    <button
                        className="lang-toggle"
                        id="lang-toggle"
                        aria-label="Toggle language"
                        title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                        onClick={toggleLang}
                    >
                        <span className="lang-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                        </span>
                        <span className="lang-label">{lang === 'ar' ? 'EN' : 'عر'}</span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        id="theme-toggle"
                        aria-label="Toggle visual theme"
                        title="Toggle visual theme"
                        onClick={toggleTheme}
                    >
                        <svg className="sun-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                        </svg>
                        <svg className="moon-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 3a6.8 6.8 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        id="mobile-toggle"
                        aria-label="Toggle mobile menu"
                        onClick={() => setMobileMenuOpen(prev => !prev)}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="12" x2="20" y2="12" className="line-mid"></line>
                            <line x1="4" y1="6"  x2="20" y2="6"  className="line-top"></line>
                            <line x1="4" y1="18" x2="20" y2="18" className="line-bot"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
