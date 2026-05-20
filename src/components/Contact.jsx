import React, { useState, useEffect, useRef } from 'react';

export default function Contact() {
    const contactInfoRef = useRef(null);
    const contactFormRef = useRef(null);
    
    const [infoVisible, setInfoVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    // Scroll animation observers
    useEffect(() => {
        const infoObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInfoVisible(true);
                infoObserver.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        const formObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setFormVisible(true);
                formObserver.unobserve(entry.target);
            }
        }, { threshold: 0.1 });

        if (contactInfoRef.current) infoObserver.observe(contactInfoRef.current);
        if (contactFormRef.current) formObserver.observe(contactFormRef.current);

        return () => {
            if (contactInfoRef.current) infoObserver.unobserve(contactInfoRef.current);
            if (contactFormRef.current) formObserver.unobserve(contactFormRef.current);
        };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let fieldName = id.replace('form-', '');
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));

        // Validate on change
        validateField(fieldName, value);
    };

    const validateField = (field, value) => {
        let errorMsg = '';
        if (field === 'name') {
            if (value.trim() === '') {
                errorMsg = 'Please enter your name';
            }
        } else if (field === 'email') {
            if (!emailRegex.test(value.trim())) {
                errorMsg = 'Please enter a valid email address';
            }
        } else if (field === 'message') {
            if (value.trim() === '') {
                errorMsg = 'Please write a message';
            }
        }

        setErrors(prev => ({
            ...prev,
            [field]: errorMsg
        }));

        return errorMsg === '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateField('name', formData.name);
        const isEmailValid = validateField('email', formData.email);
        const isMessageValid = validateField('message', formData.message);

        if (isNameValid && isEmailValid && isMessageValid) {
            setLoading(true);

            // Simulate API / Email posting latency (1.5 seconds)
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                
                // Clear form data
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });

                // Clear errors
                setErrors({
                    name: '',
                    email: '',
                    message: ''
                });

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            }, 1500);
        }
    };

    return (
        <section id="contact" className="contact section-padding alt-bg">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Let's discuss opportunities, collaborations, or custom project architecture solutions.</p>
                </div>

                <div className="contact-grid">
                    {/* Info details */}
                    <div 
                        ref={contactInfoRef} 
                        className={`contact-info animate-on-scroll ${infoVisible ? 'visible' : ''}`}
                    >
                        <h3>Connect with Zeyad</h3>
                        <p>Feel free to reach out via direct email, LinkedIn, or send a message using the form. I'm typically responsive within 24 business hours.</p>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <div className="detail-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Email Direct</h4>
                                    <a href="mailto:zeyad.ahmed.dev@example.com" className="detail-link">zeyad.ahmed.dev@example.com</a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="detail-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h4>LinkedIn</h4>
                                    <a href="https://linkedin.com/in/zeyad-ahmed-placeholder" target="_blank" rel="noopener noreferrer" className="detail-link">linkedin.com/in/zeyad-ahmed-placeholder</a>
                                </div>
                            </div>

                            <div className="contact-detail-item">
                                <div className="detail-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4>GitHub Profile</h4>
                                    <a href="https://github.com/zeyad-ahmed-placeholder" target="_blank" rel="noopener noreferrer" className="detail-link">github.com/zeyad-ahmed-placeholder</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div 
                        ref={contactFormRef} 
                        className={`contact-form-wrapper animate-on-scroll ${formVisible ? 'visible' : ''}`}
                    >
                        <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
                            <div className={`form-group ${errors.name ? 'invalid' : ''}`}>
                                <label htmlFor="form-name">Your Name</label>
                                <input 
                                    type="text" 
                                    id="form-name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe" 
                                    required 
                                />
                                <span className="form-error">{errors.name}</span>
                            </div>

                            <div className={`form-group ${errors.email ? 'invalid' : ''}`}>
                                <label htmlFor="form-email">Your Email Address</label>
                                <input 
                                    type="email" 
                                    id="form-email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com" 
                                    required 
                                />
                                <span className="form-error">{errors.email}</span>
                            </div>

                            <div className={`form-group ${errors.message ? 'invalid' : ''}`}>
                                <label htmlFor="form-message">Message</label>
                                <textarea 
                                    id="form-message" 
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="5" 
                                    placeholder="Hi Zeyad, I'd like to collaborate on..." 
                                    required 
                                />
                                <span className="form-error">{errors.message}</span>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block" id="form-submit" disabled={loading}>
                                <span className={`submit-text ${loading ? 'hidden' : ''}`}>Send Message</span>
                                <div className={`submit-spinner ${loading ? '' : 'hidden'}`}></div>
                            </button>
                            
                            <div className={`form-success-msg ${success ? '' : 'hidden'}`} id="form-success">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Your message has been sent successfully!
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
