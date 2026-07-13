import React, { useEffect, useRef, useState } from 'react';

function SkillsCard({ title, icon, skills, isRtl }) {
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (cardRef.current) observer.observe(cardRef.current);
        return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
    }, []);

    return (
        <div ref={cardRef} className={`skills-card animate-on-scroll ${visible ? 'visible' : ''}`}>
            <div className="skills-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-start' : 'flex-start' }}>
                <div className="skill-icon" style={{ marginLeft: isRtl ? 0 : '12px', marginRight: isRtl ? '12px' : 0 }}>
                    {icon}
                </div>
                <h3>{title}</h3>
            </div>
            <ul className="skills-list" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                {skills.map(skill => (
                    <li key={skill.name}>
                        <div className="skill-info" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <span>{skill.name}</span>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{skill.level}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: visible ? `${skill.level}%` : '0%' }}></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Skills({ skills, lang, t }) {
    const additionalSkillsRef = useRef(null);
    const [additionalVisible, setAdditionalVisible] = useState(false);
    const isRtl = lang === 'ar';

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setAdditionalVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (additionalSkillsRef.current) observer.observe(additionalSkillsRef.current);
        return () => { if (additionalSkillsRef.current) observer.unobserve(additionalSkillsRef.current); };
    }, []);

    const coreTools = [
        "Object-Oriented Programming (OOP)",
        "REST APIs & GraphQL integration",
        "Git / GitHub version control",
        "Responsive Web UI Design",
        "Relational & NoSQL Database schemas",
        "Google Workspace APIs / Automation",
        "Linux / CLI Command Line",
        "Postman & API Testing",
        "Next.js App Router & SSR",
        "Prisma ORM & Database migrations"
    ];

    const getIconForCategory = (catName) => {
        if (catName.toLowerCase().includes('front')) {
            return (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            );
        } else if (catName.toLowerCase().includes('back')) {
            return (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
            );
        } else {
            return (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                </svg>
            );
        }
    };

    if (!skills) return null;

    return (
        <section id="skills" className="skills section-padding alt-bg">
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-tag">Tech Stack</span>
                    <h2 className="section-title">{t.skills.title}</h2>
                    <p className="section-subtitle">{t.skills.subtitle}</p>
                </div>

                <div className="skills-grid">
                    {skills.map((cat, idx) => (
                        <SkillsCard
                            key={idx}
                            title={cat.category}
                            icon={getIconForCategory(cat.category)}
                            skills={cat.items}
                            isRtl={isRtl}
                        />
                    ))}
                </div>

                {/* Extra / Foundational Skill Tags */}
                <div
                    ref={additionalSkillsRef}
                    className={`additional-skills animate-on-scroll ${additionalVisible ? 'visible' : ''}`}
                >
                    <h4 style={{ fontFamily: 'var(--font-heading)', textAlign: isRtl ? 'right' : 'left' }}>
                        {t.skills.tools_title}
                    </h4>
                    <div className="tag-cloud" style={{ direction: isRtl ? 'rtl' : 'ltr', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
                        {coreTools.map(tool => (
                            <span key={tool}>{tool}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
