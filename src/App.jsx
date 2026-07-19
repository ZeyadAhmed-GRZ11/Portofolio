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
import CompanyHero from './components/company/CompanyHero';
import CompanyServices from './components/company/CompanyServices';
import CompanyPortfolio from './components/company/CompanyPortfolio';
import { initialAppData, translations } from './data/portfolioData';

// ─── Migration helper ────────────────────────────────────────────────────────
// If the user has the OLD portfolioData key in localStorage, migrate it into
// the new profiles.personal slot and remove the old key.
function loadOrMigrateAppData() {
    const savedNew = localStorage.getItem('appData');
    let loaded = null;

    if (savedNew) {
        try {
            const parsed = JSON.parse(savedNew);
            // Ensure both profiles exist (forward-compat guard)
            if (!parsed.profiles) parsed.profiles = {};
            if (!parsed.profiles.personal) parsed.profiles.personal = initialAppData.profiles.personal;
            if (!parsed.profiles.company)  parsed.profiles.company  = initialAppData.profiles.company;
            if (!parsed.activeProfile)     parsed.activeProfile      = 'personal';
            // Ensure sectionVisibility exists on each profile
            Object.keys(parsed.profiles).forEach(key => {
                if (!parsed.profiles[key].sectionVisibility) {
                    parsed.profiles[key].sectionVisibility =
                        key === 'company'
                            ? { hero: true, services: true, portfolio: true, contact: true }
                            : { hero: true, projects: true, googleApps: true, skills: true, resume: true, contact: true };
                }
            });
            loaded = parsed;
        } catch (e) {
            console.error('Error parsing appData from localStorage', e);
        }
    } else {
        // Legacy migration: old portfolioData key
        const savedOld = localStorage.getItem('portfolioData');
        if (savedOld) {
            try {
                const oldData = JSON.parse(savedOld);
                const migrated = {
                    ...initialAppData,
                    profiles: {
                        ...initialAppData.profiles,
                        personal: {
                            ...initialAppData.profiles.personal,
                            ...oldData,
                            // Ensure new fields exist
                            meta: initialAppData.profiles.personal.meta,
                            sectionVisibility: initialAppData.profiles.personal.sectionVisibility,
                            settings: oldData.settings || { web3FormsKey: '' }
                        }
                    }
                };
                localStorage.removeItem('portfolioData');
                loaded = migrated;
            } catch (e) {
                console.error('Error migrating old portfolioData', e);
            }
        }
    }

    const finalData = loaded || { ...initialAppData };

    // ── Hostname-based Detection ──
    // Enforce profile based on domain ONLY for regular visitors (not authenticated admins)
    // Also support URL query params (e.g. ?profile=company) for easy testing/previewing
    if (typeof window !== 'undefined' && window.location) {
        const host = window.location.hostname.toLowerCase();
        const searchParams = new URLSearchParams(window.location.search);
        let profileParam = searchParams.get('profile');

        // Fallback: check if the query param is appended after the hash, e.g., #portfolio?profile=company
        if (!profileParam && window.location.hash.includes('?')) {
            const hashQuery = window.location.hash.split('?')[1];
            if (hashQuery) {
                const hashParams = new URLSearchParams(hashQuery);
                profileParam = hashParams.get('profile');
            }
        }

        const isAdmin = sessionStorage.getItem('isAdminAuthenticated') === 'true';

        if (!isAdmin) {
            if (profileParam === 'company' || profileParam === 'techtitans' || host.includes('techtitans') || host.includes('tech-titans')) {
                finalData.activeProfile = 'company';
            } else if (profileParam === 'personal' || profileParam === 'zeyad' || host.includes('zeyad')) {
                finalData.activeProfile = 'personal';
            }
        }
    }

    return finalData;
}

export default function App() {
    // ── Theme ────────────────────────────────────────────────────
    const getInitialTheme = () => {
        const cached = localStorage.getItem('theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (cached === 'light' || (!cached && prefersLight)) return 'light';
        return 'dark';
    };

    const [theme, setTheme] = useState(getInitialTheme);
    const [activeSection, setActiveSection] = useState('home');
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ar');

    // ── App Data (single source of truth) ────────────────────────
    const [appData, setAppData] = useState(loadOrMigrateAppData);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Derived helpers
    const activeProfile   = appData.activeProfile;
    const currentProfile  = appData.profiles[activeProfile];
    const visibility      = currentProfile?.sectionVisibility || {};
    const isCompany       = activeProfile === 'company';

    // Current language dictionary
    const t = translations[lang] || translations.ar;

    // ── Persistence ───────────────────────────────────────────────
    useEffect(() => {
        localStorage.setItem('appData', JSON.stringify(appData));
    }, [appData]);

    // ── Dynamic Page Title ────────────────────────────────────────
    useEffect(() => {
        if (activeProfile === 'company') {
            const companyName = appData.profiles.company?.hero?.name || 'Tech Titans';
            document.title = companyName;
        } else {
            const ownerName = appData.profiles.personal?.hero?.name || 'Zeyad Ahmed';
            document.title = `${ownerName} | Desktop & Web Developer Portfolio`;
        }
    }, [activeProfile, appData.profiles.company?.hero?.name, appData.profiles.personal?.hero?.name]);

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    // ── Theme ─────────────────────────────────────────────────────
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
    const toggleLang  = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

    // ── Reset ─────────────────────────────────────────────────────
    const handleResetToDefault = () => {
        const msg = lang === 'ar'
            ? 'هل تريد فعلاً إعادة تعيين كافة البيانات إلى الحالة الافتراضية؟'
            : 'Are you sure you want to reset all data to defaults?';
        if (window.confirm(msg)) {
            setAppData(initialAppData);
            localStorage.removeItem('appData');
            alert(lang === 'ar' ? 'تمت إعادة التعيين بنجاح.' : 'Reset successful.');
        }
    };

    // ── Scrollspy ─────────────────────────────────────────────────
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.getAttribute('id'));
            });
        }, { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 });
        sections.forEach(s => observer.observe(s));
        return () => sections.forEach(s => observer.unobserve(s));
    }, [activeProfile]); // re-run when profile switches (different sections appear)

    // ── Render ────────────────────────────────────────────────────
    const personalProfile = appData.profiles.personal;
    const companyProfile  = appData.profiles.company;

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
                isCompany={isCompany}
                visibility={visibility}
            />

            <main>
                {/* ── PERSONAL PROFILE SECTIONS ─────────────────── */}
                {!isCompany && (
                    <>
                        {visibility.hero      && <Hero data={personalProfile.hero} lang={lang} t={t} />}
                        {visibility.projects   && <Projects projects={personalProfile.projects} lang={lang} t={t} />}
                        {visibility.googleApps && <GoogleAppsSystems systems={personalProfile.googleAppsSystems} lang={lang} t={t} />}
                        {visibility.skills     && <Skills skills={personalProfile.skills} lang={lang} t={t} />}
                        {visibility.resume     && <Resume resume={personalProfile.resume} lang={lang} t={t} />}
                        {visibility.contact    && <Contact contact={personalProfile.contact} settings={personalProfile.settings} lang={lang} t={t} />}
                    </>
                )}

                {/* ── COMPANY PROFILE SECTIONS ──────────────────── */}
                {isCompany && (
                    <>
                        {visibility.hero      && <CompanyHero data={companyProfile.hero} lang={lang} t={t} />}
                        {visibility.services   && <CompanyServices services={companyProfile.services} lang={lang} t={t} />}
                        {visibility.portfolio   && <CompanyPortfolio portfolio={companyProfile.portfolio} lang={lang} t={t} />}
                        {visibility.contact    && <Contact contact={companyProfile.contact} settings={companyProfile.settings} lang={lang} t={t} isCompany={true} />}
                    </>
                )}
            </main>

            <Footer
                contact={currentProfile?.contact}
                onAdminOpen={() => setIsAdminOpen(true)}
                lang={lang}
                t={t}
                isCompany={isCompany}
                companyName={companyProfile?.hero?.name}
            />

            <AdminDashboard
                isOpen={isAdminOpen}
                onClose={() => setIsAdminOpen(false)}
                appData={appData}
                setAppData={setAppData}
                onResetToDefault={handleResetToDefault}
                lang={lang}
            />
        </>
    );
}
