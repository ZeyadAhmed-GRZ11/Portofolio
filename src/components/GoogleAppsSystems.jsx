import React, { useState, useEffect, useRef } from 'react';

export default function GoogleAppsSystems({ systems, lang, t }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const isRtl = lang === 'ar';

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    if (!systems || systems.length === 0) return null;
    const activeSystem = systems[activeIdx] || systems[0];

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        const msg = isRtl ? 'تم نسخ رابط نظام Google Apps المباشر!' : 'Direct system URL copied to clipboard!';
        alert(msg);
    };

    const gt = t.googleApps;

    return (
        <section id="google-apps" className="google-apps section-padding alt-bg" ref={sectionRef}>
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-tag">Google Workspace</span>
                    <h2 className="section-title">{gt.title}</h2>
                    <p className="section-subtitle">{gt.subtitle}</p>
                </div>

                <div className={`google-apps-layout animate-on-scroll ${visible ? 'visible' : ''}`}>
                    {/* Selector Tabs & Details */}
                    <div className="google-apps-sidebar">
                        <h4 className="sidebar-label">{gt.select}</h4>
                        <div className="gas-tabs-list">
                            {systems.map((sys, idx) => (
                                <button
                                    key={sys.id || idx}
                                    className={`gas-tab-item ${activeIdx === idx ? 'active' : ''}`}
                                    onClick={() => setActiveIdx(idx)}
                                >
                                    <div className="gas-tab-indicator"></div>
                                    <div className="gas-tab-info">
                                        <h5>{sys.title}</h5>
                                        <p>{sys.description.substring(0, 75)}...</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Full description card for selected system */}
                        <div className="gas-details-card">
                            <h4>{activeSystem.title}</h4>
                            <p>{activeSystem.description}</p>
                            <div className="gas-meta-details">
                                {(gt.tags || ['Google Apps Script', 'Web App Exec', 'Cloud Automations']).map((tag, i) => (
                                    <span key={i} className="gas-tag">{tag}</span>
                                ))}
                            </div>
                            <div className="gas-action-btns">
                                <a
                                    href={activeSystem.url}
                                    className="btn btn-primary btn-block"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ gap: '8px' }}
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    {gt.open}
                                </a>
                                <button
                                    className="btn btn-secondary btn-block"
                                    onClick={() => copyToClipboard(activeSystem.url)}
                                    style={{ gap: '8px', marginTop: '10px' }}
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                    {gt.copy}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Browser Mockup Window Live View */}
                    <div className="google-apps-viewer">
                        <div className="browser-mockup-frame">
                            <div className="browser-mockup-header">
                                <div className="browser-dots">
                                    <span className="dot dot-red"></span>
                                    <span className="dot dot-yellow"></span>
                                    <span className="dot dot-green"></span>
                                </div>
                                <div className="browser-address-bar">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" className="lock-icon">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <span className="browser-url-text">{activeSystem.url}</span>
                                </div>
                                <div className="browser-window-actions">
                                    <button
                                        className="browser-win-btn"
                                        title={isRtl ? 'إعادة تحميل الإطار' : 'Reload Frame'}
                                        onClick={() => {
                                            const iframe = document.getElementById('gas-viewer-iframe');
                                            if (iframe) iframe.src = iframe.src;
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="browser-mockup-body">
                                <iframe
                                    id="gas-viewer-iframe"
                                    src={activeSystem.url}
                                    title={activeSystem.title}
                                    className="browser-iframe-view"
                                    sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
                                />

                                <div className="browser-iframe-disclaimer">
                                    <p>{gt.disclaimer}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
