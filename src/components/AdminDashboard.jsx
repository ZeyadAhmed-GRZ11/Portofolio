import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard({ isOpen, onClose, portfolioData, setPortfolioData, onResetToDefault }) {
    const [passcode, setPasscode] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('isAdminAuthenticated') === 'true';
    });
    
    const [activeTab, setActiveTab] = useState('general'); // general, skills, projects, googleApps, resume
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importJsonText, setImportJsonText] = useState('');
    const [importError, setImportError] = useState('');

    // Editing states for projects, googleApps, resume
    const [editingProject, setEditingProject] = useState(null); // null or project object
    const [editingGas, setEditingGas] = useState(null); // null or GAS object
    const [editingResume, setEditingResume] = useState(null); // null or resume item object
    const [resumeItemType, setResumeItemType] = useState('experience'); // experience or education

    useEffect(() => {
        if (!isOpen) {
            setPasscode('');
            setLoginError('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Password verification (default: admin123)
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (passcode === 'admin123' || passcode === 'zeyad2026') {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            setLoginError('');
        } else {
            setLoginError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAdminAuthenticated');
    };

    // Generic state updater
    const updateField = (section, field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Skills level sliders updates
    const updateSkillLevel = (catIndex, skillIndex, newLevel) => {
        setPortfolioData(prev => {
            const newSkills = [...prev.skills];
            newSkills[catIndex].items[skillIndex].level = parseInt(newLevel, 10);
            return {
                ...prev,
                skills: newSkills
            };
        });
    };

    const handleAddSkill = (catIndex) => {
        const name = prompt('أدخل اسم المهارة الجديدة:');
        if (!name) return;
        setPortfolioData(prev => {
            const newSkills = [...prev.skills];
            newSkills[catIndex].items.push({ name, level: 80 });
            return {
                ...prev,
                skills: newSkills
            };
        });
    };

    const handleDeleteSkill = (catIndex, skillIndex) => {
        if (!window.confirm('هل أنت متأكد من حذف هذه المهارة؟')) return;
        setPortfolioData(prev => {
            const newSkills = [...prev.skills];
            newSkills[catIndex].items.splice(skillIndex, 1);
            return {
                ...prev,
                skills: newSkills
            };
        });
    };

    // Projects CRUD
    const handleSaveProject = (e) => {
        e.preventDefault();
        const p = editingProject;
        if (!p.title.trim()) return;

        setPortfolioData(prev => {
            let list = [...prev.projects];
            if (p.id) {
                // Update
                list = list.map(item => item.id === p.id ? p : item);
            } else {
                // Create
                const newId = list.length > 0 ? Math.max(...list.map(x => x.id)) + 1 : 1;
                list.push({ ...p, id: newId });
            }
            return { ...prev, projects: list };
        });
        setEditingProject(null);
    };

    const handleDeleteProject = (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
        setPortfolioData(prev => ({
            ...prev,
            projects: prev.projects.filter(x => x.id !== id)
        }));
    };

    // Google Apps Systems CRUD
    const handleSaveGas = (e) => {
        e.preventDefault();
        const g = editingGas;
        if (!g.title.trim() || !g.url.trim()) return;

        setPortfolioData(prev => {
            let list = [...prev.googleAppsSystems];
            if (g.id) {
                list = list.map(item => item.id === g.id ? g : item);
            } else {
                const newId = `gas-${list.length > 0 ? Math.max(...list.map(x => {
                    const num = parseInt(x.id.replace('gas-', ''), 10);
                    return isNaN(num) ? 0 : num;
                })) + 1 : 1}`;
                list.push({ ...g, id: newId });
            }
            return { ...prev, googleAppsSystems: list };
        });
        setEditingGas(null);
    };

    const handleDeleteGas = (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا النظام؟')) return;
        setPortfolioData(prev => ({
            ...prev,
            googleAppsSystems: prev.googleAppsSystems.filter(x => x.id !== id)
        }));
    };

    // Resume CRUD
    const handleSaveResumeItem = (e) => {
        e.preventDefault();
        const item = editingResume;
        if (!item.title.trim() || !item.date.trim()) return;

        setPortfolioData(prev => {
            const list = [...prev.resume[resumeItemType]];
            if (item.id) {
                const idx = list.findIndex(x => x.id === item.id);
                if (idx !== -1) list[idx] = item;
            } else {
                const newId = `${resumeItemType.substring(0, 3)}-${Date.now()}`;
                list.push({ ...item, id: newId });
            }
            return {
                ...prev,
                resume: {
                    ...prev.resume,
                    [resumeItemType]: list
                }
            };
        });
        setEditingResume(null);
    };

    const handleDeleteResumeItem = (type, id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;
        setPortfolioData(prev => ({
            ...prev,
            resume: {
                ...prev.resume,
                [type]: prev.resume[type].filter(x => x.id !== id)
            }
        }));
    };

    // Export copy functionality
    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 4));
        alert('تم نسخ البيانات بصيغة JSON! يمكنك الآن استبدال محتويات src/data/portfolioData.js بالكامل.');
    };

    // Import functionality
    const handleImportJson = (e) => {
        e.preventDefault();
        try {
            const parsed = JSON.parse(importJsonText);
            if (parsed.hero && parsed.skills && parsed.projects && parsed.googleAppsSystems && parsed.resume) {
                setPortfolioData(parsed);
                setShowImportModal(false);
                setImportJsonText('');
                setImportError('');
                alert('تم استيراد البيانات وتحديث المعرض بنجاح!');
            } else {
                setImportError('الملف لا يحتوي على البنية الصحيحة لبيانات المعرض.');
            }
        } catch (err) {
            setImportError('صيغة JSON غير صالحة. يرجى التحقق من النص.');
        }
    };

    // -------------------------------------------------------------
    // RENDER: Login Prompt
    // -------------------------------------------------------------
    if (!isAuthenticated) {
        return (
            <div className="admin-overlay" onClick={onClose}>
                <div className="admin-login-card" onClick={e => e.stopPropagation()}>
                    <div className="admin-login-header">
                        <div className="admin-login-logo">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h3 className="admin-login-title">لوحة تحكم المشرف</h3>
                        <p className="admin-login-subtitle">أدخل كلمة المرور لتعديل محتوى المعرض</p>
                    </div>
                    <form className="admin-login-form" onSubmit={handleLoginSubmit}>
                        <div className="form-group" style={{ textAlign: 'right' }}>
                            <label htmlFor="admin-pwd" style={{ marginBottom: '6px', display: 'block' }}>كلمة المرور (الافتراضية: admin123)</label>
                            <input 
                                type="password" 
                                id="admin-pwd" 
                                value={passcode}
                                onChange={e => setPasscode(e.target.value)}
                                placeholder="••••••••" 
                                style={{ direction: 'ltr', textAlign: 'center' }}
                                required 
                                autoFocus
                            />
                            {loginError && <span className="form-error" style={{ display: 'block', textAlign: 'right' }}>{loginError}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">تسجيل الدخول</button>
                    </form>
                    <div className="admin-login-footer">
                        <button className="admin-login-close" onClick={onClose}>إلغاء وإغلاق</button>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // RENDER: Full Admin Dashboard View
    // -------------------------------------------------------------
    return (
        <div className="admin-dashboard-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <span className="admin-sidebar-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="logo-accent">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        لوحة التحكم
                    </span>
                    <button className="theme-toggle" onClick={onClose} style={{ border: 'none', background: 'none' }} title="إغلاق لوحة التحكم">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <nav className="admin-sidebar-menu">
                    <div 
                        className={`admin-menu-item ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('general'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        معلومات عامة والبطاقة
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'skills' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('skills'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        إدارة المهارات
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('projects'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        المشاريع العامة
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'googleApps' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('googleApps'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        أنظمة Google Apps
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'resume' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('resume'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        السيرة الذاتية (Resume)
                    </div>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="btn btn-secondary" onClick={() => setShowExportModal(true)}>تصدير الكود JSON</button>
                    <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>استيراد JSON</button>
                    <button className="btn btn-secondary" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }} onClick={onResetToDefault}>إعادة تعيين الافتراضي</button>
                    <button className="admin-login-close" onClick={handleLogout} style={{ marginTop: '10px' }}>تسجيل الخروج</button>
                </div>
            </aside>

            {/* Main Window */}
            <main className="admin-main">
                <div className="admin-topbar">
                    <h2>
                        {activeTab === 'general' && 'تعديل الملف والروابط'}
                        {activeTab === 'skills' && 'تعديل مستوى المهارات'}
                        {activeTab === 'projects' && 'إدارة المشاريع البرمجية'}
                        {activeTab === 'googleApps' && 'إدارة أنظمة Google Apps Script'}
                        {activeTab === 'resume' && 'تعديل الخبرات والتعليم'}
                    </h2>
                    <div className="admin-actions">
                        <button className="btn btn-primary" onClick={onClose}>حفظ وإغلاق</button>
                    </div>
                </div>

                <div className="admin-content">
                    {/* -------------------------------------------------------------
                        TAB 1: GENERAL INFO
                        ------------------------------------------------------------- */}
                    {activeTab === 'general' && (
                        <div>
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">بيانات القسم الرئيسي (Hero Header)</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>عبارة الترحيب (Tagline)</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.hero.tagline} 
                                            onChange={e => updateField('hero', 'tagline', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>الاسم الكامل</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.hero.name} 
                                            onChange={e => updateField('hero', 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>المسمى الوظيفي والعنوان الفرعي</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.hero.title} 
                                            onChange={e => updateField('hero', 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>الوصف والنبذة التعريفية</label>
                                        <textarea 
                                            rows="4" 
                                            value={portfolioData.hero.description} 
                                            onChange={e => updateField('hero', 'description', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="admin-section-card">
                                <h3 className="admin-section-title">بيانات التواصل والشبكات الاجتماعية</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>البريد الإلكتروني المباشر</label>
                                        <input 
                                            type="email" 
                                            value={portfolioData.contact.email} 
                                            onChange={e => updateField('contact', 'email', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>رابط حساب LinkedIn</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.contact.linkedin} 
                                            onChange={e => updateField('contact', 'linkedin', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>رابط حساب GitHub</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.contact.github} 
                                            onChange={e => updateField('contact', 'github', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* -------------------------------------------------------------
                        TAB 2: SKILLS
                        ------------------------------------------------------------- */}
                    {activeTab === 'skills' && (
                        <div>
                            {portfolioData.skills.map((category, catIdx) => (
                                <div className="admin-section-card" key={catIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <h3 className="admin-section-title" style={{ margin: 0, border: 'none', padding: 0 }}>{category.category}</h3>
                                        <button className="btn-admin-add" onClick={() => handleAddSkill(catIdx)}>إضافة مهارة جديدة +</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {category.items.map((skill, skillIdx) => (
                                            <div className="admin-skill-slider-row" key={skillIdx}>
                                                <span className="admin-skill-name">{skill.name}</span>
                                                <input 
                                                    type="range" 
                                                    min="30" 
                                                    max="100" 
                                                    className="admin-skill-slider"
                                                    value={skill.level}
                                                    onChange={e => updateSkillLevel(catIdx, skillIdx, e.target.value)}
                                                />
                                                <span className="admin-skill-percentage">{skill.level}%</span>
                                                <button 
                                                    className="btn-admin-icon delete" 
                                                    title="حذف"
                                                    onClick={() => handleDeleteSkill(catIdx, skillIdx)}
                                                >
                                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* -------------------------------------------------------------
                        TAB 3: PROJECTS
                        ------------------------------------------------------------- */}
                    {activeTab === 'projects' && (
                        <div>
                            {!editingProject ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>قائمة المشاريع البرمجية</h3>
                                        <button 
                                            className="btn-admin-add" 
                                            onClick={() => setEditingProject({
                                                title: '',
                                                description: '',
                                                categories: ['web'],
                                                tags: [],
                                                links: [{ type: 'github', text: 'GitHub', url: '' }]
                                            })}
                                        >
                                            إضافة مشروع جديد +
                                        </button>
                                    </div>
                                    <div className="admin-items-list">
                                        {portfolioData.projects.map(proj => (
                                            <div className="admin-item-row" key={proj.id}>
                                                <div className="admin-item-info">
                                                    <h4>{proj.title}</h4>
                                                    <p>{proj.tags.join(', ')} | الفئة: {proj.categories.join('/')}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingProject(proj)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteProject(proj.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">{editingProject.id ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}</h3>
                                    <form onSubmit={handleSaveProject}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group full-width">
                                                <label>عنوان المشروع</label>
                                                <input 
                                                    type="text" 
                                                    value={editingProject.title}
                                                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>الوصف الفني والتوضيحي للمشروع</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={editingProject.description}
                                                    onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>التصنيفات (categories) - حدد نوع أو أكثر</label>
                                                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={editingProject.categories.includes('web')}
                                                            onChange={e => {
                                                                const checked = e.target.checked;
                                                                setEditingProject(prev => {
                                                                    const cats = checked ? [...prev.categories, 'web'] : prev.categories.filter(c => c !== 'web');
                                                                    return { ...prev, categories: cats };
                                                                });
                                                            }}
                                                            style={{ width: 'auto' }}
                                                        /> ويب (Web)
                                                    </label>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                                                        <input 
                                                            type="checkbox" 
                                                            checked={editingProject.categories.includes('database')}
                                                            onChange={e => {
                                                                const checked = e.target.checked;
                                                                setEditingProject(prev => {
                                                                    const cats = checked ? [...prev.categories, 'database'] : prev.categories.filter(c => c !== 'database');
                                                                    return { ...prev, categories: cats };
                                                                });
                                                            }}
                                                            style={{ width: 'auto' }}
                                                        /> قواعد بيانات (Database)
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="admin-form-group">
                                                <label>الوسوم والتقنيات المستخدمة (مفصولة بفاصلة)</label>
                                                <input 
                                                    type="text" 
                                                    value={editingProject.tags.join(', ')}
                                                    placeholder="Laravel, PHP, React, MySQL"
                                                    onChange={e => {
                                                        const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                                                        setEditingProject({...editingProject, tags});
                                                    }}
                                                />
                                            </div>

                                            {/* Link builder (Only simple edit for code integrity) */}
                                            <div className="admin-form-group full-width">
                                                <label>رابط GitHub أو العرض (Live Demo)</label>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <select 
                                                        style={{ width: '120px' }}
                                                        value={editingProject.links[0]?.type || 'github'}
                                                        onChange={e => {
                                                            const newLinks = [...editingProject.links];
                                                            if (newLinks.length === 0) {
                                                                newLinks.push({ type: e.target.value, text: e.target.value === 'demo' ? 'العرض الحي' : 'GitHub', url: '' });
                                                            } else {
                                                                newLinks[0].type = e.target.value;
                                                                newLinks[0].text = e.target.value === 'demo' ? 'العرض الحي' : 'GitHub';
                                                            }
                                                            setEditingProject({...editingProject, links: newLinks});
                                                        }}
                                                    >
                                                        <option value="github">GitHub</option>
                                                        <option value="demo">Live Demo</option>
                                                        <option value="private">Private</option>
                                                    </select>
                                                    <input 
                                                        type="text" 
                                                        placeholder="أدخل الرابط الإلكتروني"
                                                        value={editingProject.links[0]?.url || ''}
                                                        onChange={e => {
                                                            const newLinks = [...editingProject.links];
                                                            if (newLinks.length === 0) {
                                                                newLinks.push({ type: 'github', text: 'GitHub', url: e.target.value });
                                                            } else {
                                                                newLinks[0].url = e.target.value;
                                                            }
                                                            setEditingProject({...editingProject, links: newLinks});
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                            <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingProject(null)}>إلغاء</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* -------------------------------------------------------------
                        TAB 4: GOOGLE APPS SYSTEMS
                        ------------------------------------------------------------- */}
                    {activeTab === 'googleApps' && (
                        <div>
                            {!editingGas ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>أنظمة Google Apps للعرض الحي</h3>
                                        <button 
                                            className="btn-admin-add" 
                                            onClick={() => setEditingGas({
                                                title: '',
                                                description: '',
                                                url: ''
                                            })}
                                        >
                                            إضافة نظام Google Apps +
                                        </button>
                                    </div>
                                    <div className="admin-items-list">
                                        {portfolioData.googleAppsSystems.map(gas => (
                                            <div className="admin-item-row" key={gas.id}>
                                                <div className="admin-item-info">
                                                    <h4>{gas.title}</h4>
                                                    <p style={{ wordBreak: 'break-all', direction: 'ltr', textAlign: 'right' }}>{gas.url}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingGas(gas)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteGas(gas.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">{editingGas.id ? 'تعديل نظام Google Apps' : 'إضافة نظام جديد'}</h3>
                                    <form onSubmit={handleSaveGas}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group full-width">
                                                <label>عنوان النظام</label>
                                                <input 
                                                    type="text" 
                                                    value={editingGas.title}
                                                    onChange={e => setEditingGas({...editingGas, title: e.target.value})}
                                                    placeholder="مثال: نظام شؤون الموظفين المؤتمت"
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>رابط نشر الخدمة (Web App URL)</label>
                                                <input 
                                                    type="url" 
                                                    value={editingGas.url}
                                                    onChange={e => setEditingGas({...editingGas, url: e.target.value})}
                                                    placeholder="https://script.google.com/macros/s/.../exec"
                                                    style={{ direction: 'ltr' }}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>الوصف الفني للنظام والمهام البرمجية</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={editingGas.description}
                                                    onChange={e => setEditingGas({...editingGas, description: e.target.value})}
                                                    placeholder="اشرح ماذا يفعل النظام وكيف قمت بربطه بقاعدة البيانات..."
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                            <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingGas(null)}>إلغاء</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* -------------------------------------------------------------
                        TAB 5: RESUME TIMELINE
                        ------------------------------------------------------------- */}
                    {activeTab === 'resume' && (
                        <div>
                            {!editingResume ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>إدارة السيرة المهنية والأكاديمية</h3>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button 
                                                className="btn-admin-add" 
                                                onClick={() => {
                                                    setResumeItemType('experience');
                                                    setEditingResume({ date: '', title: '', org: '', desc: '' });
                                                }}
                                            >
                                                إضافة خبرة عمل +
                                            </button>
                                            <button 
                                                className="btn-admin-add" 
                                                style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}
                                                onClick={() => {
                                                    setResumeItemType('education');
                                                    setEditingResume({ date: '', title: '', org: '', desc: '' });
                                                }}
                                            >
                                                إضافة تعليم/شهادة +
                                            </button>
                                        </div>
                                    </div>

                                    <h4 style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>الخبرات والمسيرة المهنية (Experience)</h4>
                                    <div className="admin-items-list" style={{ marginBottom: '30px' }}>
                                        {portfolioData.resume.experience.map(item => (
                                            <div className="admin-item-row" key={item.id}>
                                                <div className="admin-item-info">
                                                    <h4>{item.title}</h4>
                                                    <p>{item.org} | {item.date}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => { setResumeItemType('experience'); setEditingResume(item); }}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteResumeItem('experience', item.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <h4 style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>التعليم والشهادات (Education & Certifications)</h4>
                                    <div className="admin-items-list">
                                        {portfolioData.resume.education.map(item => (
                                            <div className="admin-item-row" key={item.id}>
                                                <div className="admin-item-info">
                                                    <h4>{item.title}</h4>
                                                    <p>{item.org} | {item.date}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => { setResumeItemType('education'); setEditingResume(item); }}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteResumeItem('education', item.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">
                                        {editingResume.id ? 'تعديل العنصر' : `إضافة ${resumeItemType === 'experience' ? 'خبرة جديدة' : 'شهادة/تعليم جديد'}`}
                                    </h3>
                                    <form onSubmit={handleSaveResumeItem}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>الفترة الزمنية</label>
                                                <input 
                                                    type="text" 
                                                    value={editingResume.date}
                                                    onChange={e => setEditingResume({...editingResume, date: e.target.value})}
                                                    placeholder="مثال: 2024 - 2025"
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>المسمى / العنوان</label>
                                                <input 
                                                    type="text" 
                                                    value={editingResume.title}
                                                    onChange={e => setEditingResume({...editingResume, title: e.target.value})}
                                                    placeholder="مثال: بكالوريوس هندسة الحاسبات"
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>الجهة / المؤسسة</label>
                                                <input 
                                                    type="text" 
                                                    value={editingResume.org}
                                                    onChange={e => setEditingResume({...editingResume, org: e.target.value})}
                                                    placeholder="مثال: جامعة القاهرة / مستقل"
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>الوصف الفني والتفاصيل</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={editingResume.desc}
                                                    onChange={e => setEditingResume({...editingResume, desc: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                            <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingResume(null)}>إلغاء</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* -------------------------------------------------------------
                EXPORT MODAL
                ------------------------------------------------------------- */}
            {showExportModal && (
                <div className="admin-modal-backdrop" onClick={() => setShowExportModal(false)}>
                    <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>تصدير الكود JSON</h3>
                            <button className="theme-toggle" onClick={() => setShowExportModal(false)} style={{ border: 'none', background: 'none' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="admin-modal-body">
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'right' }}>
                                انسخ هذا الكود بالكامل واستبدل به محتويات ملف <code>src/data/portfolioData.js</code> في مشروعك لتثبيت التعديلات للأبد.
                            </p>
                            <textarea 
                                readOnly 
                                className="admin-json-code"
                                value={`export const initialPortfolioData = ${JSON.stringify(portfolioData, null, 4)};`}
                                onClick={e => e.target.select()}
                            />
                        </div>
                        <div className="admin-modal-footer">
                            <button className="btn btn-primary" onClick={handleCopyJson}>نسخ إلى الحافظة</button>
                            <button className="btn btn-secondary" onClick={() => setShowExportModal(false)}>إغلاق</button>
                        </div>
                    </div>
                </div>
            )}

            {/* -------------------------------------------------------------
                IMPORT MODAL
                ------------------------------------------------------------- */}
            {showImportModal && (
                <div className="admin-modal-backdrop" onClick={() => setShowImportModal(false)}>
                    <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3>استيراد كود JSON</h3>
                            <button className="theme-toggle" onClick={() => setShowImportModal(false)} style={{ border: 'none', background: 'none' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleImportJson}>
                            <div className="admin-modal-body">
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'right' }}>
                                    قم بلصق محتويات كائن JSON الخاص بالمعرض هنا لتحديث المعرض بأكمله فوراً.
                                </p>
                                <textarea 
                                    className="admin-json-code"
                                    placeholder='{ "hero": {...}, "skills": [...], ... }'
                                    value={importJsonText}
                                    onChange={e => setImportJsonText(e.target.value)}
                                    required
                                />
                                {importError && <span className="form-error" style={{ display: 'block', marginTop: '10px', textAlign: 'right' }}>{importError}</span>}
                            </div>
                            <div className="admin-modal-footer">
                                <button type="submit" className="btn btn-primary">استيراد البيانات</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowImportModal(false)}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
