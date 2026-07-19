import React from 'react';

export default function CompanyPortfolio({ portfolio, lang, t }) {
    const isRtl = lang === 'ar';
    if (!portfolio || portfolio.length === 0) return null;

    return (
        <section id="portfolio" className="section-padding">
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-tag">Portfolio</span>
                    <h2 className="section-title">{t.company?.portfolio_title || 'Our Work'}</h2>
                    <p className="section-subtitle">{t.company?.portfolio_subtitle || ''}</p>
                </div>

                <div className="projects-grid" style={{ marginTop: '48px' }}>
                    {portfolio.map((item, idx) => {
                        const title = lang === 'ar' ? item.title_ar : item.title_en;
                        const desc  = lang === 'ar' ? item.description_ar : item.description_en;

                        return (
                            <div key={item.id || idx} className="project-card" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                {item.image && (
                                    <div className="project-card-image-container">
                                        <img src={item.image} alt={title} className="project-card-image" />
                                    </div>
                                )}
                                <div className="project-card-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                    <div className="project-icon">
                                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                    </div>
                                    {item.url && item.url !== '#' && (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="project-link-btn" title={t.company?.view_details || 'View'}>
                                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <h3 className="project-title">{title}</h3>
                                <p className="project-description">{desc}</p>

                                {item.tags && item.tags.length > 0 && (
                                    <div className="project-tags" style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="project-tag">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
