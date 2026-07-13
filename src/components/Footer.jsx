import React from 'react';

export default function Footer({ contact, onAdminOpen }) {
    return (
        <footer className="footer">
            <div className="container footer-container" style={{ direction: 'rtl', textAlign: 'right' }}>
                <div className="footer-brand">
                    <a href="#home" className="logo">&lt;Zeyad.Dev/&gt;</a>
                    <p>تطوير وبناء الأنظمة الرقمية وقواعد البيانات المتكاملة والحلول السحابية وأتمتة الأعمال باستخدام Google Apps Script.</p>
                </div>
                <div className="footer-links">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="#home">الرئيسية</a></li>
                        <li><a href="#projects">المشاريع العامة</a></li>
                        <li><a href="#google-apps">أنظمة Google Apps</a></li>
                        <li><a href="#skills">المهارات</a></li>
                        <li><a href="#resume">السيرة الذاتية</a></li>
                        <li><a href="#contact">اتصل بي</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', direction: 'rtl' }}>
                    <p>&copy; {new Date().getFullYear()} زياد أحمد. جميع الحقوق محفوظة.</p>
                    <p style={{ display: 'flex', gap: '15px' }}>
                        <span onClick={onAdminOpen} style={{ cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'} title="Admin Panel">
                            ⚙️ لوحة التحكم
                        </span>
                        <span>صنع بحب باستخدام React & Vite</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
