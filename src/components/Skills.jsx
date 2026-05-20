import React, { useEffect, useRef, useState } from 'react';

function SkillsCard({ title, icon, skills }) {
    const cardRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`skills-card animate-on-scroll ${visible ? 'visible' : ''}`}>
            <div className="skills-header">
                <div className="skill-icon">
                    {icon}
                </div>
                <h3>{title}</h3>
            </div>
            <ul className="skills-list">
                {skills.map(skill => (
                    <li key={skill.name}>
                        <div className="skill-info">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress" 
                                style={{ width: visible ? `${skill.level}%` : '0%' }}
                            ></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Skills() {
    const additionalSkillsRef = useRef(null);
    const [additionalVisible, setAdditionalVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setAdditionalVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (additionalSkillsRef.current) {
            observer.observe(additionalSkillsRef.current);
        }

        return () => {
            if (additionalSkillsRef.current) {
                observer.unobserve(additionalSkillsRef.current);
            }
        };
    }, []);

    const desktopSkills = [
        { name: "C++ Programming", level: 90 },
        { name: "Win32 API / SDK", level: 85 },
        { name: "MFC Framework", level: 80 },
        { name: "Memory & Thread Management", level: 85 }
    ];

    const webSkills = [
        { name: "React / Vite", level: 85 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "Bootstrap / CSS Layouts", level: 90 },
        { name: "HTML5 / Semantic markup", level: 95 }
    ];

    const dbSkills = [
        { name: "Microsoft SQL Server", level: 85 },
        { name: "SQL Query Optimization", level: 80 },
        { name: "Relational Database Design", level: 85 },
        { name: "Stored Procedures & Triggers", level: 80 }
    ];

    const coreTools = [
        "Object-Oriented Design",
        "SQL Server Management Studio (SSMS)",
        "Git & GitHub version control",
        "REST API Integration",
        "Responsive UI/UX design",
        "Windows SDK",
        "Debugging (Visual Studio)",
        "Bootstrap Grid System"
    ];

    return (
        <section id="skills" className="skills section-padding alt-bg">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">Proficiencies in native OS programming, modern responsive frontends, and database engineering patterns.</p>
                </div>

                <div className="skills-grid">
                    <SkillsCard 
                        title="Desktop Development" 
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                        }
                        skills={desktopSkills}
                    />

                    <SkillsCard 
                        title="Web Development" 
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                            </svg>
                        }
                        skills={webSkills}
                    />

                    <SkillsCard 
                        title="Database Systems" 
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                            </svg>
                        }
                        skills={dbSkills}
                    />
                </div>

                {/* Extra / Foundational Skill Tags */}
                <div 
                    ref={additionalSkillsRef} 
                    className={`additional-skills animate-on-scroll ${additionalVisible ? 'visible' : ''}`}
                >
                    <h4>Core Methodologies & Tools</h4>
                    <div className="tag-cloud">
                        {coreTools.map(tool => (
                            <span key={tool}>{tool}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
