import React, { useState } from 'react';

export default function Projects({ projects }) {
    const [filter, setFilter] = useState('all');

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const filterButtons = [
        { id: 'all', label: 'جميع المشاريع' },
        { id: 'web', label: 'تطبيقات الويب (Laravel / Node.js)' },
        { id: 'database', label: 'نظم وقواعد البيانات (SQL / MongoDB)' }
    ];

    if (!projects) return null;

    return (
        <section id="projects" className="projects section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">المشاريع البرمجية العامة</h2>
                    <p className="section-subtitle">معرض يضم المشاريع البرمجية وقواعد البيانات (منفصلة عن تطبيقات Google Apps Script) باستخدام أحدث أطر العمل.</p>
                </div>

                {/* Filter Controls */}
                <div className="filter-controls">
                    {filterButtons.map(btn => (
                        <button 
                            key={btn.id}
                            className={`filter-btn ${filter === btn.id ? 'active' : ''}`}
                            onClick={() => setFilter(btn.id)}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="projects-grid" id="projects-grid">
                    {projects.map(project => {
                        const isVisible = filter === 'all' || project.categories.includes(filter);
                        
                        return (
                            <div 
                                key={project.id}
                                className="project-card animate-on-scroll visible" 
                                style={{ 
                                    display: isVisible ? 'flex' : 'none',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'scale(1)' : 'scale(0.95)',
                                    transition: 'opacity var(--transition-normal), transform var(--transition-normal)'
                                }}
                                onMouseMove={handleMouseMove}
                            >
                                <div className="project-icon-wrapper">
                                    {project.categories.includes('web') ? (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="16 18 22 12 16 6"></polyline>
                                            <polyline points="8 6 2 12 8 18"></polyline>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                                            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
                                        </svg>
                                    )}
                                </div>
                                <h3 className="project-card-title" style={{ textAlign: 'right' }}>{project.title}</h3>
                                <p className="project-card-description" style={{ textAlign: 'right', direction: 'rtl' }}>{project.description}</p>
                                <div className="project-tags" style={{ justifyContent: 'flex-start', direction: 'ltr' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-links" style={{ justifyContent: 'flex-start' }}>
                                    {project.links && project.links.map((link, idx) => {
                                        if (link.type === 'private') {
                                            return (
                                                <span key={idx} className="project-link-disabled" title={link.tooltip}>
                                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                    </svg> {link.text}
                                                </span>
                                            );
                                        }

                                        let icon = null;
                                        if (link.type === 'demo') {
                                            icon = (
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <polyline points="15 3 21 3 21 9"></polyline>
                                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                                </svg>
                                            );
                                        } else if (link.type === 'code' || link.type === 'github') {
                                            icon = (
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                </svg>
                                            );
                                        }

                                        return (
                                            <a key={idx} href={link.url} className="project-link" target="_blank" rel="noopener noreferrer">
                                                {icon} {link.text}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
