import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import GoogleAppsSystems from './components/GoogleAppsSystems';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { initialPortfolioData } from './data/portfolioData';

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

    // Dynamic Portfolio Data State
    const [portfolioData, setPortfolioData] = useState(() => {
        const saved = localStorage.getItem('portfolioData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing portfolioData from localStorage", e);
            }
        }
        return initialPortfolioData;
    });

    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Save data on changes
    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    }, [portfolioData]);

    const handleResetToDefault = () => {
        if (window.confirm('هل تريد فعلاً إعادة تعيين كافة البيانات إلى الحالة الافتراضية؟ سيتم مسح التغييرات المحلية.')) {
            setPortfolioData(initialPortfolioData);
            localStorage.removeItem('portfolioData');
            alert('تمت إعادة تعيين البيانات بنجاح.');
        }
    };

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
                onAdminOpen={() => setIsAdminOpen(true)}
            />

            {/* Main Sections */}
            <main>
                <Hero data={portfolioData.hero} />
                <Projects projects={portfolioData.projects} />
                <GoogleAppsSystems systems={portfolioData.googleAppsSystems} />
                <Skills skills={portfolioData.skills} />
                <Resume resume={portfolioData.resume} />
                <Contact contact={portfolioData.contact} />
            </main>

            {/* Footer */}
            <Footer 
                contact={portfolioData.contact} 
                onAdminOpen={() => setIsAdminOpen(true)} 
            />

            {/* Admin Controls Panel */}
            <AdminDashboard 
                isOpen={isAdminOpen} 
                onClose={() => setIsAdminOpen(false)}
                portfolioData={portfolioData}
                setPortfolioData={setPortfolioData}
                onResetToDefault={handleResetToDefault}
            />
        </>
    );
}
