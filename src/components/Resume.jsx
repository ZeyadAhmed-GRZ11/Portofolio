import React, { useEffect, useRef, useState } from 'react';

function TimelineItem({ date, title, org, desc }) {
    const itemRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => {
            if (itemRef.current) {
                observer.unobserve(itemRef.current);
            }
        };
    }, []);

    return (
        <div ref={itemRef} className={`timeline-item animate-on-scroll ${visible ? 'visible' : ''}`}>
            <div className="timeline-dot"></div>
            <div className="timeline-date">{date}</div>
            <h4 className="timeline-item-title">{title}</h4>
            <h5 className="timeline-item-org">{org}</h5>
            <p className="timeline-item-desc">{desc}</p>
        </div>
    );
}

export default function Resume() {
    const downloadBtnRef = useRef(null);
    const [downloadVisible, setDownloadVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setDownloadVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (downloadBtnRef.current) {
            observer.observe(downloadBtnRef.current);
        }

        return () => {
            if (downloadBtnRef.current) {
                observer.unobserve(downloadBtnRef.current);
            }
        };
    }, []);

    const handleDownload = (e) => {
        e.preventDefault();
        alert('Demo Mode: Resume download trigger triggered successfully.');
    };

    return (
        <section id="resume" className="resume section-padding">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Resume / CV</h2>
                    <p className="section-subtitle">Academic training, professional progression, and validated certifications.</p>
                </div>

                <div className="timeline-container">
                    {/* Left Column - Experience */}
                    <div className="timeline-col">
                        <h3 className="timeline-heading">Professional Experience</h3>
                        
                        <TimelineItem 
                            date="2025 - Present"
                            title="Junior Software Engineer"
                            org="Desktop Systems Integration Ltd."
                            desc="Specializing in refactoring high-performance desktop clients. Responsible for maintaining MFC database layers, migrating legacy UI modules to clean Win32 control models, and debugging multithreading race conditions with SQL Server endpoints."
                        />

                        <TimelineItem 
                            date="2024 (Summer)"
                            title="Software Developer Intern"
                            org="WebTech Solutions"
                            desc="Co-developed dashboard UI modules for internal client inventory portals using React, Bootstrap, and Vite. Integrated custom REST APIs and designed database schemas for SQL Server."
                        />
                    </div>

                    {/* Right Column - Education & Certs */}
                    <div className="timeline-col">
                        <h3 className="timeline-heading">Education & Certifications</h3>

                        <TimelineItem 
                            date="2021 - 2025"
                            title="Bachelor of Science in Computer Engineering"
                            org="Faculty of Engineering"
                            desc="Focused on computer systems architecture, database management systems, and advanced operating systems. Core coursework: Software Engineering, DBMS, Data Structures & Algorithms."
                        />

                        <TimelineItem 
                            date="2025"
                            title="SQL Database Administrator Certification"
                            org="Microsoft Certified"
                            desc="Validated competency in relational database concepts, SSMS navigation, stored procedure creation, data normalization, indexing optimizations, and query profiling."
                        />

                        <TimelineItem 
                            date="2024"
                            title="Advanced React & Web Architecture"
                            org="Online Specialization"
                            desc="Cover hook architectures, component styling models, asynchronous fetch optimizations, and bundle profiling tools using Vite and Webpack."
                        />
                    </div>
                </div>

                <div 
                    ref={downloadBtnRef} 
                    className={`resume-download-wrapper animate-on-scroll ${downloadVisible ? 'visible' : ''}`}
                >
                    <a href="#" className="btn btn-primary" onClick={handleDownload}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg> Download Complete CV (PDF)
                    </a>
                </div>
            </div>
        </section>
    );
}
