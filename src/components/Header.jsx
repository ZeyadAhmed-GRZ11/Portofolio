import React, { useState, useEffect } from 'react';

export default function Header({ activeSection, theme, toggleTheme }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Freeze background scroll when mobile menu is active
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
        { id: 'resume', label: 'Resume' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <a href="#home" className="logo" id="logo-link" onClick={handleLinkClick}>
                    <span className="logo-accent">&lt;</span>Zeyad.Dev<span className="logo-accent">/&gt;</span>
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
                    {/* Theme Toggle Button */}
                    <button 
                        className="theme-toggle" 
                        id="theme-toggle" 
                        aria-label="Toggle visual theme" 
                        title="Toggle visual theme"
                        onClick={toggleTheme}
                    >
                        <svg className="sun-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                        </svg>
                        <svg className="moon-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 3a6.8 6.8 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                    </button>

                    {/* Mobile Menu Button */}
                    <button 
                        className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
                        id="mobile-toggle" 
                        aria-label="Toggle mobile menu" 
                        title="Toggle mobile menu"
                        onClick={toggleMobileMenu}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="12" x2="20" y2="12" className="line-mid"></line>
                            <line x1="4" y1="6" x2="20" y2="6" className="line-top"></line>
                            <line x1="4" y1="18" x2="20" y2="18" className="line-bot"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
