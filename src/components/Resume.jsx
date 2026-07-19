import React, { useEffect, useRef, useState } from 'react';

function TimelineItem({ date, title, org, desc, isRtl }) {
    const itemRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (itemRef.current) observer.observe(itemRef.current);
        return () => { if (itemRef.current) observer.unobserve(itemRef.current); };
    }, []);

    return (
        <div
            ref={itemRef}
            className={`timeline-item animate-on-scroll ${visible ? 'visible' : ''}`}
            style={{ textAlign: isRtl ? 'right' : 'left', paddingRight: isRtl ? '20px' : 0, paddingLeft: isRtl ? 0 : '20px' }}
        >
            <div className="timeline-dot" style={{ right: isRtl ? '-25px' : 'auto', left: isRtl ? 'auto' : '-25px' }}></div>
            <div className="timeline-date" style={{ fontWeight: 700 }}>{date}</div>
            <h4 className="timeline-item-title">{title}</h4>
            <h5 className="timeline-item-org" style={{ color: 'var(--accent-secondary)' }}>{org}</h5>
            <p className="timeline-item-desc" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>{desc}</p>
        </div>
    );
}

export default function Resume({ resume, lang, t }) {
    const downloadBtnRef = useRef(null);
    const [downloadVisible, setDownloadVisible] = useState(false);
    const isRtl = lang === 'ar';

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setDownloadVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (downloadBtnRef.current) observer.observe(downloadBtnRef.current);
        return () => { if (downloadBtnRef.current) observer.unobserve(downloadBtnRef.current); };
    }, []);

    const handleDownload = (e) => {
        if (resume && resume.cvPdfBase64) {
            // Download PDF
            const link = document.createElement('a');
            link.href = resume.cvPdfBase64;
            link.download = isRtl ? 'السيرة_الذاتية_زياد_أحمد.pdf' : 'Zeyad_Ahmed_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            e.preventDefault();
            const msg = isRtl
                ? 'نسخة السيرة الذاتية (PDF) غير متوفرة حالياً، يمكنك تعديل وتصدير البيانات من لوحة التحكم.'
                : 'PDF CV is not available yet. You can export data from the Admin Panel.';
            alert(msg);
        }
    };

    if (!resume) return null;

    return (
        <section id="resume" className="resume section-padding">
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-tag">Career</span>
                    <h2 className="section-title">{t.resume.title}</h2>
                    <p className="section-subtitle">{t.resume.subtitle}</p>
                </div>

                <div className="timeline-container" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                    {/* Experience Column */}
                    <div className="timeline-col" style={{
                        paddingRight: isRtl ? '20px' : 0,
                        paddingLeft: isRtl ? 0 : '20px',
                        borderRight: isRtl ? '2px solid var(--border-color)' : 'none',
                        borderLeft: isRtl ? 'none' : '2px solid var(--border-color)'
                    }}>
                        <h3 className="timeline-heading" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-start' : 'flex-start' }}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" style={{ marginLeft: isRtl ? '10px' : 0, marginRight: isRtl ? 0 : '10px' }}>
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            {t.resume.experience}
                        </h3>

                        {resume.experience && resume.experience.map(item => (
                            <TimelineItem
                                key={item.id}
                                date={item.date}
                                title={item.title}
                                org={item.org}
                                desc={item.desc}
                                isRtl={isRtl}
                            />
                        ))}
                    </div>

                    {/* Education Column */}
                    <div className="timeline-col" style={{
                        paddingRight: isRtl ? '20px' : 0,
                        paddingLeft: isRtl ? 0 : '20px',
                        borderRight: isRtl ? '2px solid var(--border-color)' : 'none',
                        borderLeft: isRtl ? 'none' : '2px solid var(--border-color)'
                    }}>
                        <h3 className="timeline-heading" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-start' : 'flex-start' }}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" style={{ marginLeft: isRtl ? '10px' : 0, marginRight: isRtl ? 0 : '10px' }}>
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                            </svg>
                            {t.resume.education}
                        </h3>

                        {resume.education && resume.education.map(item => (
                            <TimelineItem
                                key={item.id}
                                date={item.date}
                                title={item.title}
                                org={item.org}
                                desc={item.desc}
                                isRtl={isRtl}
                            />
                        ))}
                    </div>
                </div>

                {/* Certificates Section */}
                {resume.certificates && resume.certificates.length > 0 && (
                    <div className="certificates-wrapper" style={{ marginTop: '60px', textAlign: isRtl ? 'right' : 'left' }}>
                        <h3 className="timeline-heading" style={{ 
                            flexDirection: isRtl ? 'row-reverse' : 'row', 
                            justifyContent: isRtl ? 'flex-start' : 'flex-start',
                            marginBottom: '30px'
                        }}>
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" style={{ marginLeft: isRtl ? '10px' : 0, marginRight: isRtl ? 0 : '10px' }}>
                                <circle cx="12" cy="8" r="7"></circle>
                                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                            </svg>
                            {t.resume.certificates}
                        </h3>

                        <div className="certificates-grid">
                            {resume.certificates.map(cert => (
                                <div key={cert.id} className="certificate-card">
                                    <div className="cert-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <span className="cert-date">{cert.date}</span>
                                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5">
                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                            <path d="M7 12l3 3 7-7"></path>
                                        </svg>
                                    </div>
                                    <h4 className="cert-title">{cert.title}</h4>
                                    <p className="cert-org">{cert.org}</p>
                                    {cert.url && (
                                        <a 
                                            href={cert.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="cert-link-btn"
                                            style={{ 
                                                marginTop: '16px', 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                gap: '6px', 
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: 'var(--accent-primary)'
                                            }}
                                        >
                                            {t.resume.view_cert}
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }}>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div
                    ref={downloadBtnRef}
                    className={`resume-download-wrapper animate-on-scroll ${downloadVisible ? 'visible' : ''}`}
                >
                    <a href="#" className="btn btn-primary" onClick={handleDownload}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: isRtl ? '8px' : 0, marginRight: isRtl ? 0 : '8px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        {t.resume.download}
                    </a>
                </div>
            </div>
        </section>
    );
}
