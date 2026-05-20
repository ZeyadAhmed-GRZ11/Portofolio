import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
    // Theme Management
    const getInitialTheme = () => {
        const cachedTheme = localStorage.getItem('theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (cachedTheme === 'light' || (!cachedTheme && systemPrefersLight)) {
            return 'light';
        }
        return 'dark';
    };

    const [theme, setTheme] = useState(getInitialTheme);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const body = document.body;
        if (theme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Scrollspy Navigation
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const scrollSpyOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.getAttribute('id'));
                }
            });
        }, scrollSpyOptions);

        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    return (
        <>
            {/* Background Glow Elements */}
            <div className="glow glow-1"></div>
            <div className="glow glow-2"></div>

            {/* Navigation Header */}
            <Header 
                activeSection={activeSection} 
                theme={theme} 
                toggleTheme={toggleTheme} 
            />

            {/* Main Sections */}
            <main>
                <Hero />
                <Projects />
                <Skills />
                <Resume />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
