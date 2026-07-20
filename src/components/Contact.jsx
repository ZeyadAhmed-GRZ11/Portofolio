import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export default function Contact({ contact, settings, lang, t, isCompany }) {
    const isRtl = lang === 'ar';
    // Use company-specific contact labels when in company mode
    const ct = isCompany
        ? {
            ...t.contact,
            title:    t.company?.contact_title    || t.contact.title,
            subtitle: t.company?.contact_subtitle || t.contact.subtitle,
            connect:  t.company?.connect          || t.contact.connect,
          }
        : t.contact;

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = ct.err_name;
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = ct.err_email;
        if (isCompany && !formData.phone.trim()) newErrors.phone = ct.err_phone;
        if (!formData.message.trim()) newErrors.message = ct.err_message;
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const apiKey = settings?.web3FormsKey?.trim();
        // If neither Supabase nor Web3Forms is configured, show error in-form (no alert popup)
        if (!apiKey && !isSupabaseConfigured) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        if (isSupabaseConfigured) {
            try {
                const { error } = await supabase
                    .from('contact_messages')
                    .insert([
                        {
                            name: formData.name,
                            email: formData.email,
                            phone: isCompany ? formData.phone : null,
                            message: formData.message,
                            profile: isCompany ? 'company' : 'personal'
                        }
                    ]);

                if (error) throw error;

                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        } else {
            // Web3Forms Fallback
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({
                        access_key: apiKey,
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        subject: isRtl
                            ? `رسالة جديدة من ${formData.name} عبر Portfolio`
                            : `New message from ${formData.name} via Portfolio`
                    })
                });

                const result = await response.json();

                if (result.success) {
                    setStatus('success');
                    setFormData({ name: '', email: '', phone: '', message: '' });
                } else {
                    setStatus('error');
                }
            } catch (err) {
                console.error(err);
                setStatus('error');
            }
        }
    };

    if (!contact) return null;

    return (
        <section id="contact" className="contact section-padding">
            <div className="container" dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="section-header" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-tag">Contact</span>
                    <h2 className="section-title">{ct.title}</h2>
                    <p className="section-subtitle">{ct.subtitle}</p>
                </div>

                <div className="contact-grid">
                    {/* Info Panel */}
                    <div className="contact-info">
                        <h3 style={{ textAlign: isRtl ? 'right' : 'left' }}>{ct.connect}</h3>
                        <p style={{ textAlign: isRtl ? 'right' : 'left' }}>{ct.connect_desc}</p>

                        <div className="contact-links">
                            <a href={`mailto:${contact.email}`} className="contact-link-item" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', textAlign: isRtl ? 'right' : 'left' }}>
                                <div className="contact-link-icon">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <span className="contact-link-label">{ct.email_label}</span>
                                    <span className="contact-link-value">{contact.email}</span>
                                </div>
                            </a>

                            {contact.linkedin && (
                                <a href={contact.linkedin} className="contact-link-item" target="_blank" rel="noopener noreferrer" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', textAlign: isRtl ? 'right' : 'left' }}>
                                    <div className="contact-link-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                            <rect x="2" y="9" width="4" height="12"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-link-label">{ct.linkedin_label}</span>
                                        <span className="contact-link-value">{contact.linkedin.replace('https://', '').replace('http://', '')}</span>
                                    </div>
                                </a>
                            )}

                            {contact.github && (
                                <a href={contact.github} className="contact-link-item" target="_blank" rel="noopener noreferrer" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', textAlign: isRtl ? 'right' : 'left' }}>
                                    <div className="contact-link-icon">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="contact-link-label">{ct.github_label}</span>
                                        <span className="contact-link-value">{contact.github.replace('https://', '').replace('http://', '')}</span>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        {status === 'success' ? (
                            <div className="form-success-card" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                <div className="form-success-icon">✅</div>
                                <h3>{ct.success}</h3>
                                <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={() => setStatus('idle')}>
                                    {isRtl ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                                </button>
                            </div>
                        ) : (
                            <form key={lang} className="contact-form" onSubmit={handleSubmit} noValidate>
                                {/* Name */}
                                <div className={`form-group ${errors.name ? 'has-error' : ''}`} style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                    <label htmlFor="contact-name">{ct.name_label}</label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        name="name"
                                        placeholder={ct.name_placeholder}
                                        value={formData.name}
                                        onChange={handleChange}
                                        dir={isRtl ? 'rtl' : 'ltr'}
                                    />
                                    {errors.name && <span className="field-error">{errors.name}</span>}
                                </div>

                                {/* Email */}
                                <div className={`form-group ${errors.email ? 'has-error' : ''}`} style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                    <label htmlFor="contact-email">{ct.email_label2}</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        placeholder="example@domain.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        dir="ltr"
                                    />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>

                                {/* Phone (Company only) */}
                                {isCompany && (
                                    <div className={`form-group ${errors.phone ? 'has-error' : ''}`} style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                        <label htmlFor="contact-phone">{ct.phone_label || 'رقم الهاتف'}</label>
                                        <input
                                            type="tel"
                                            id="contact-phone"
                                            name="phone"
                                            placeholder={ct.phone_placeholder || 'أدخل رقم الهاتف'}
                                            value={formData.phone}
                                            onChange={handleChange}
                                            dir="ltr"
                                            style={{ textAlign: isRtl ? 'right' : 'left' }}
                                        />
                                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                                    </div>
                                )}

                                {/* Message */}
                                <div className={`form-group ${errors.message ? 'has-error' : ''}`} style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                    <label htmlFor="contact-message">{ct.message_label}</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="5"
                                        placeholder={ct.message_placeholder}
                                        value={formData.message}
                                        onChange={handleChange}
                                        dir={isRtl ? 'rtl' : 'ltr'}
                                    ></textarea>
                                    {errors.message && <span className="field-error">{errors.message}</span>}
                                </div>

                                {status === 'error' && (
                                    <p style={{ color: 'var(--accent-red, #ff4757)', marginBottom: '12px', textAlign: isRtl ? 'right' : 'left' }}>
                                        {ct.error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={status === 'loading'}
                                    style={{ gap: '10px' }}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="spinner-inline"></span>
                                            {isRtl ? 'جاري الإرسال...' : 'Sending...'}
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                            </svg>
                                            {ct.send}
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
