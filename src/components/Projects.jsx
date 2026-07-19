import React, { useState } from 'react';

export default function Projects({ projects, lang, t }) {
    const [activeFilter, setActiveFilter] = useState('all');
    const isRtl = lang === 'ar';

    if (!projects) return null;

    const filters = [
        { key: 'all', label: t.projects.all },
        { key: 'web', label: t.projects.web },
        { key: 'database', label: t.projects.database }
    ];

    const filtered = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.categories && p.categories.includes(activeFilter));

    return (
        <section id="projects" className="projects section-padding">
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-tag">Portfolio</span>
                    <h2 className="section-title">{t.projects.title}</h2>
                    <p className="section-subtitle">{t.projects.subtitle}</p>
                </div>

                {/* Filters */}
                <div className="project-filters" style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
                    {filters.map(f => (
                        <button
                            key={f.key}
                            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {filtered.map(project => {
                        const desc = isRtl
                            ? project.description
                            : (project.description_en || project.description);

                        return (
                            <div className="project-card" key={project.id}>
                                {project.image && (
                                    <div className="project-card-image-container">
                                        <img src={project.image} alt={project.title} className="project-card-image" />
                                    </div>
                                )}
                                <div className="project-card-header">
                                    <svg className="folder-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    <div className="project-links">
                                        {project.links && project.links.map((link, i) => (
                                            link.type === 'demo' ? (
                                                <a key={i} href={link.url} className="project-link" target="_blank" rel="noopener noreferrer" title={link.text}>
                                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                    </svg>
                                                </a>
                                            ) : link.type === 'github' ? (
                                                <a key={i} href={link.url} className="project-link" target="_blank" rel="noopener noreferrer" title="GitHub">
                                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                    </svg>
                                                </a>
                                            ) : link.type === 'private' ? (
                                                <span key={i} className="project-link" title={link.tooltip || t.projects.private} style={{ cursor: 'default', opacity: 0.5 }}>
                                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                    </svg>
                                                </span>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{desc}</p>
                                <div className="project-tags">
                                    {project.tags && project.tags.map((tag, i) => (
                                        <span key={i} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
