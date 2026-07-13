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
import { initialPortfolioData, translations } from './data/portfolioData';

export default function App() {
    // Theme Management
    const getInitialTheme = () => {
        const cachedTheme = localStorage.getItem('theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (cachedTheme === 'light' || (!cachedTheme && systemPrefersLight)) return 'light';
        return 'dark';
    };

    const [theme, setTheme] = useState(getInitialTheme);
    const [activeSection, setActiveSection] = useState('home');
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ar');

    // Dynamic Portfolio Data State
    const [portfolioData, setPortfolioData] = useState(() => {
        const saved = localStorage.getItem('portfolioData');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migrate: ensure settings exists
                if (!parsed.settings) parsed.settings = { web3FormsKey: '' };
                return parsed;
            } catch (e) {
                console.error("Error parsing portfolioData from localStorage", e);
            }
        }
        return initialPortfolioData;
    });

    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Current language dictionary
    const t = translations[lang] || translations.ar;

    // Persist data on changes
    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    }, [portfolioData]);

    // Persist language on changes + set html dir
    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

    const handleResetToDefault = () => {
        if (window.confirm(lang === 'ar'
            ? 'هل تريد فعلاً إعادة تعيين كافة البيانات إلى الحالة الافتراضية؟'
            : 'Are you sure you want to reset all data to defaults?')) {
            setPortfolioData(initialPortfolioData);
            localStorage.removeItem('portfolioData');
            alert(lang === 'ar' ? 'تمت إعادة التعيين بنجاح.' : 'Reset successful.');
        }
    };

    // Theme toggle
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

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    // Scrollspy
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.getAttribute('id'));
            });
        }, { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 });

        sections.forEach(s => observer.observe(s));
        return () => sections.forEach(s => observer.unobserve(s));
    }, []);

    return (
        <>
            <div className="glow glow-1"></div>
            <div className="glow glow-2"></div>

            <Header
                activeSection={activeSection}
                theme={theme}
                toggleTheme={toggleTheme}
                onAdminOpen={() => setIsAdminOpen(true)}
                lang={lang}
                toggleLang={toggleLang}
                t={t}
            />

            <main>
                <Hero data={portfolioData.hero} lang={lang} t={t} />
                <Projects projects={portfolioData.projects} lang={lang} t={t} />
                <GoogleAppsSystems systems={portfolioData.googleAppsSystems} lang={lang} t={t} />
                <Skills skills={portfolioData.skills} lang={lang} t={t} />
                <Resume resume={portfolioData.resume} lang={lang} t={t} />
                <Contact contact={portfolioData.contact} settings={portfolioData.settings} lang={lang} t={t} />
            </main>

            <Footer
                contact={portfolioData.contact}
                onAdminOpen={() => setIsAdminOpen(true)}
                lang={lang}
                t={t}
            />

            <AdminDashboard
                isOpen={isAdminOpen}
                onClose={() => setIsAdminOpen(false)}
                portfolioData={portfolioData}
                setPortfolioData={setPortfolioData}
                onResetToDefault={handleResetToDefault}
                lang={lang}
            />
        </>
    );
}
