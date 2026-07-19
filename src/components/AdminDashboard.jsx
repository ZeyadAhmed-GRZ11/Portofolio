import React, { useState, useEffect, useRef } from 'react';
import './AdminDashboard.css';

const adminTranslations = {
    ar: {
        title: 'لوحة التحكم',
        loginTitle: 'لوحة تحكم المشرف',
        loginSubtitle: 'أدخل كلمة المرور لتعديل محتوى المعرض',
        passwordLabel: 'كلمة المرور (الافتراضية: ****)',
        passwordPlaceholder: '••••••••',
        loginError: 'كلمة المرور غير صحيحة. حاول مرة أخرى.',
        loginBtn: 'تسجيل الدخول',
        cancelClose: 'إلغاء وإغلاق',
        closeDashboard: 'إغلاق لوحة التحكم',
        saveCloseBtn: 'حفظ وإغلاق',
        
        tabGeneral: 'معلومات عامة والبطاقة',
        tabSkills: 'إدارة المهارات',
        tabProjects: 'المشاريع العامة',
        tabGoogleApps: 'أنظمة Google Apps',
        tabResume: 'السيرة الذاتية (Resume)',
        
        exportBtn: 'تصدير الكود JSON',
        importBtn: 'استيراد JSON',
        resetBtn: 'إعادة تعيين الافتراضي',
        logoutBtn: 'تسجيل الخروج',
        
        headerGeneral: 'تعديل الملف والروابط',
        headerSkills: 'تعديل مستوى المهارات',
        headerProjects: 'إدارة المشاريع البرمجية',
        headerGoogleApps: 'إدارة أنظمة Google Apps Script',
        headerResume: 'تعديل الخبرات والتعليم والشهادات',
        
        avatarTitle: '📷 صورة الملف الشخصي (Avatar)',
        avatarHelp: 'الصورة تُخزَّن محلياً في المتصفح. الحجم الأقصى 5MB. يُفضَّل صور مربعة.',
        changeImgBtn: '🔄 تغيير الصورة',
        uploadImgBtn: '📁 رفع صورة',
        deleteImgBtn: '🗑️ حذف الصورة',
        confirmDeleteImg: 'هل تريد حذف صورة الملف الشخصي؟',
        imgSizeError: 'حجم الصورة كبير جداً. الحد الأقصى 5MB.',
        
        heroTitle: 'بيانات القسم الرئيسي (Hero Header)',
        taglineLabel: 'عبارة الترحيب (Tagline)',
        fullNameLabel: 'الاسم الكامل',
        jobTitleLabel: 'المسمى الوظيفي والعنوان الفرعي',
        descArLabel: 'الوصف والنبذة التعريفية (عربي)',
        descEnLabel: 'الوصف والنبذة التعريفية (English)',
        
        contactTitle: 'بيانات التواصل والشبكات الاجتماعية',
        emailLabel: 'البريد الإلكتروني المباشر',
        linkedinLabel: 'رابط حساب LinkedIn',
        githubLabel: 'رابط حساب GitHub',
        
        web3Title: '📬 مفتاح Web3Forms API (نموذج التواصل)',
        web3Help: 'للحصول على المفتاح، سجّل مجاناً على web3forms.com، ثم انسخ الـ Access Key وألصقه هنا. ستصلك رسائل الزوار مباشرة إلى بريدك الإلكتروني.',
        web3KeyLabel: 'Web3Forms Access Key',
        
        cvTitle: '📄 ملف السيرة الذاتية (CV PDF)',
        cvHelp: 'ارفع ملف السيرة الذاتية الخاص بك بصيغة PDF. سيتم حفظه محلياً كـ Base64.',
        uploadCvBtn: '📁 رفع ملف CV (PDF)',
        changeCvBtn: '🔄 تغيير ملف CV',
        deleteCvBtn: '🗑️ حذف ملف CV',
        confirmDeleteCv: 'هل تريد حذف ملف السيرة الذاتية؟',
        cvSizeError: 'حجم الملف كبير جداً. الحد الأقصى 5MB.',
        cvTypeError: 'يرجى رفع ملف بصيغة PDF فقط.',
        
        addSkillBtn: 'إضافة مهارة جديدة +',
        confirmDeleteSkill: 'هل أنت متأكد من حذف هذه المهارة؟',
        promptSkillName: 'أدخل اسم المهارة الجديدة:',
        
        projectsListTitle: 'قائمة المشاريع البرمجية',
        addProjectBtn: 'إضافة مشروع جديد +',
        confirmDeleteProject: 'هل أنت متأكد من حذف هذا المشروع؟',
        editProjectTitle: 'تعديل بيانات المشروع',
        projectTitleLabel: 'عنوان المشروع',
        projectDescLabel: 'الوصف الفني والتوضيحي للمشروع',
        categoriesLabel: 'التصنيفات (categories) - حدد نوع أو أكثر',
        catWebLabel: 'ويب (Web)',
        catDatabaseLabel: 'قواعد بيانات (Database)',
        tagsLabel: 'الوسوم والتقنيات المستخدمة (مفصولة بفاصلة)',
        linksLabel: 'رابط GitHub أو العرض (Live Demo)',
        saveChangesBtn: 'حفظ التغييرات',
        cancelBtn: 'إلغاء',
        
        gasListTitle: 'أنظمة Google Apps للعرض الحي',
        addGasBtn: 'إضافة نظام Google Apps +',
        confirmDeleteGas: 'هل أنت متأكد من حذف هذا النظام؟',
        editGasTitle: 'تعديل نظام Google Apps',
        gasTitleLabel: 'عنوان النظام',
        gasUrlLabel: 'رابط نشر الخدمة (Web App URL)',
        gasDescLabel: 'الوصف الفني للنظام والمهام البرمجية',
        
        resumeTitle: 'إدارة السيرة المهنية والأكاديمية والشهادات',
        addExpBtn: 'إضافة خبرة عمل +',
        addEduBtn: 'إضافة تعليم +',
        addCertBtn: 'إضافة شهادة +',
        expSectionHeader: 'الخبرات والمسيرة المهنية (Experience)',
        eduSectionHeader: 'التعليم الأكاديمي (Education)',
        certSectionHeader: 'الشهادات المعتمدة (Certificates)',
        confirmDeleteResume: 'هل أنت متأكد من حذف هذا العنصر؟',
        editResumeTitle: 'تعديل العنصر',
        addExpTitle: 'إضافة خبرة جديدة',
        addEduTitle: 'إضافة تعليم جديد',
        addCertTitle: 'إضافة شهادة جديدة',
        dateLabel: 'الفترة الزمنية / التاريخ',
        titleLabel: 'المسمى / العنوان / الشهادة',
        orgLabel: 'الجهة / المؤسسة المانحة',
        descLabel: 'الوصف الفني والتفاصيل',
        urlLabel: 'رابط الشهادة (Credential URL)',
        
        exportJsonTitle: 'تصدير الكود JSON',
        exportHelp: 'انسخ هذا الكود بالكامل واستبدل به محتويات ملف src/data/portfolioData.js في مشروعك لتثبيت التعديلات للأبد.',
        copyClipboardBtn: 'نسخ إلى الحافظة',
        copiedSuccessAlert: 'تم نسخ البيانات بصيغة JSON! يمكنك الآن استبدال محتويات src/data/portfolioData.js بالكامل.',
        importJsonTitle: 'استيراد كود JSON',
        importHelp: 'قم بلصق محتويات كائن JSON الخاص بالمعرض هنا لتحديث المعرض بأكمله فوراً.',
        importSuccessAlert: 'تم استيراد البيانات وتحديث المعرض بنجاح!',
        importStructureError: 'الملف لا يحتوي على البنية الصحيحة لبيانات المعرض.',
        importParseError: 'صيغة JSON غير صالحة. يرجى التحقق من النص.',
        importSubmitBtn: 'استيراد البيانات',
    },
    en: {
        title: 'Admin Dashboard',
        loginTitle: 'Admin Portal',
        loginSubtitle: 'Enter passcode to manage portfolio content',
        passwordLabel: 'Passcode (Default: ****)',
        passwordPlaceholder: '••••••••',
        loginError: 'Invalid passcode. Please try again.',
        loginBtn: 'Log In',
        cancelClose: 'Cancel & Close',
        closeDashboard: 'Close Admin Dashboard',
        saveCloseBtn: 'Save & Close',
        
        tabGeneral: 'General Settings',
        tabSkills: 'Manage Skills',
        tabProjects: 'Projects Showcase',
        tabGoogleApps: 'Google Apps Systems',
        tabResume: 'Resume & Certificates',
        
        exportBtn: 'Export JSON Code',
        importBtn: 'Import JSON Data',
        resetBtn: 'Reset Defaults',
        logoutBtn: 'Log Out',
        
        headerGeneral: 'Edit Profile & Settings',
        headerSkills: 'Edit Technical Skills',
        headerProjects: 'Manage Projects',
        headerGoogleApps: 'Manage Google Apps Automation',
        headerResume: 'Edit Resume & Certifications',
        
        avatarTitle: '📷 Profile Picture (Avatar)',
        avatarHelp: 'Image stored locally in browser. Max size: 5MB. Square aspect recommended.',
        changeImgBtn: '🔄 Change Image',
        uploadImgBtn: '📁 Upload Image',
        deleteImgBtn: '🗑` Delete Image',
        confirmDeleteImg: 'Are you sure you want to delete your profile picture?',
        imgSizeError: 'Image is too large. Maximum size is 5MB.',
        
        heroTitle: 'Hero Section Data',
        taglineLabel: 'Greeting Tagline',
        fullNameLabel: 'Full Name',
        jobTitleLabel: 'Job Title / Subtitle',
        descArLabel: 'Bio / Description (Arabic)',
        descEnLabel: 'Bio / Description (English)',
        
        contactTitle: 'Contact details & Social networks',
        emailLabel: 'Direct Email Address',
        linkedinLabel: 'LinkedIn Profile URL',
        githubLabel: 'GitHub Profile URL',
        
        web3Title: '📬 Web3Forms API Key (Contact Form)',
        web3Help: 'Get your key for free at web3forms.com. Paste it here to receive visitor emails directly.',
        web3KeyLabel: 'Web3Forms Access Key',
        
        cvTitle: '📄 CV Document (PDF File)',
        cvHelp: 'Upload your professional CV in PDF format. Stored locally as Base64.',
        uploadCvBtn: '📁 Upload CV PDF',
        changeCvBtn: '🔄 Change CV File',
        deleteCvBtn: '🗑` Delete CV File',
        confirmDeleteCv: 'Are you sure you want to delete your CV file?',
        cvSizeError: 'File is too large. Maximum size is 5MB.',
        cvTypeError: 'Please upload PDF files only.',
        
        addSkillBtn: 'Add New Skill +',
        confirmDeleteSkill: 'Are you sure you want to delete this skill?',
        promptSkillName: 'Enter new skill name:',
        
        projectsListTitle: 'Projects List',
        addProjectBtn: 'Add New Project +',
        confirmDeleteProject: 'Are you sure you want to delete this project?',
        editProjectTitle: 'Edit Project Details',
        projectTitleLabel: 'Project Title',
        projectDescLabel: 'Project Description / Technical Details',
        categoriesLabel: 'Categories (Check one or both)',
        catWebLabel: 'Web App',
        catDatabaseLabel: 'Database System',
        tagsLabel: 'Technologies Used (Comma-separated)',
        linksLabel: 'GitHub URL / Live Demo link',
        saveChangesBtn: 'Save Changes',
        cancelBtn: 'Cancel',
        
        gasListTitle: 'Google Apps Script Systems',
        addGasBtn: 'Add Google Apps System +',
        confirmDeleteGas: 'Are you sure you want to delete this system?',
        editGasTitle: 'Edit Google Apps System',
        gasTitleLabel: 'System Title',
        gasUrlLabel: 'Published Web App URL',
        gasDescLabel: 'Technical Description & Functions',
        
        resumeTitle: 'Resume Timeline & Credentials',
        addExpBtn: 'Add Experience +',
        addEduBtn: 'Add Education +',
        addCertBtn: 'Add Certificate +',
        expSectionHeader: 'Work Experience',
        eduSectionHeader: 'Academic Education',
        certSectionHeader: 'Certificates & Credentials',
        confirmDeleteResume: 'Are you sure you want to delete this item?',
        editResumeTitle: 'Edit Timeline Item',
        addExpTitle: 'Add Work Experience',
        addEduTitle: 'Add Education Item',
        addCertTitle: 'Add Certificate Credential',
        dateLabel: 'Date Range / Year',
        titleLabel: 'Title / Degree / Certification',
        orgLabel: 'Organization / Issuing Institution',
        descLabel: 'Description & details',
        urlLabel: 'Credential URL (Optional)',
        
        exportJsonTitle: 'Export JSON Data',
        exportHelp: 'Copy this JSON block and paste it inside src/data/portfolioData.js to persist modifications permanently.',
        copyClipboardBtn: 'Copy to Clipboard',
        copiedSuccessAlert: 'Data copied as JSON! You can now replace the contents of src/data/portfolioData.js.',
        importJsonTitle: 'Import JSON Data',
        importHelp: 'Paste your portfolio JSON block here to overwrite and refresh the portfolio data immediately.',
        importSuccessAlert: 'Data imported and portfolio updated successfully!',
        importStructureError: 'JSON does not contain the correct portfolio data structure.',
        importParseError: 'Invalid JSON syntax. Please verify the input.',
        importSubmitBtn: 'Import Portfolio Data',
    }
};

export default function AdminDashboard({ isOpen, onClose, portfolioData, setPortfolioData, onResetToDefault, lang }) {
    const fileInputRef = useRef(null);
    const cvInputRef = useRef(null);
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
    const [resumeItemType, setResumeItemType] = useState('experience'); // experience, education, certificates

    const ad = adminTranslations[lang] || adminTranslations.ar;

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
            setLoginError(ad.loginError);
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

    // Avatar image upload handler
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert(ad.imgSizeError);
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            updateField('hero', 'avatarBase64', ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarRemove = () => {
        if (window.confirm(ad.confirmDeleteImg)) {
            updateField('hero', 'avatarBase64', null);
        }
    };

    // CV PDF upload handler
    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            alert(ad.cvTypeError);
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert(ad.cvSizeError);
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setPortfolioData(prev => ({
                ...prev,
                resume: {
                    ...(prev.resume || {}),
                    cvPdfBase64: ev.target.result
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleCvRemove = () => {
        if (window.confirm(ad.confirmDeleteCv)) {
            setPortfolioData(prev => ({
                ...prev,
                resume: {
                    ...(prev.resume || {}),
                    cvPdfBase64: null
                }
            }));
        }
    };

    // Web3Forms key updater
    const updateWeb3FormsKey = (value) => {
        setPortfolioData(prev => ({
            ...prev,
            settings: { ...(prev.settings || {}), web3FormsKey: value }
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
        const name = prompt(ad.promptSkillName);
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
        if (!window.confirm(ad.confirmDeleteSkill)) return;
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
        if (!window.confirm(ad.confirmDeleteProject)) return;
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
        if (!window.confirm(ad.confirmDeleteGas)) return;
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
            const list = [...(prev.resume[resumeItemType] || [])];
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
                    ...(prev.resume || {}),
                    [resumeItemType]: list
                }
            };
        });
        setEditingResume(null);
    };

    const handleDeleteResumeItem = (type, id) => {
        if (!window.confirm(ad.confirmDeleteResume)) return;
        setPortfolioData(prev => ({
            ...prev,
            resume: {
                ...(prev.resume || {}),
                [type]: (prev.resume[type] || []).filter(x => x.id !== id)
            }
        }));
    };

    // Export copy functionality
    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 4));
        alert(ad.copiedSuccessAlert);
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
                alert(ad.importSuccessAlert);
            } else {
                setImportError(ad.importStructureError);
            }
        } catch (err) {
            setImportError(ad.importParseError);
        }
    };

    // -------------------------------------------------------------
    // RENDER: Login Prompt
    // -------------------------------------------------------------
    if (!isAuthenticated) {
        const isRtl = lang === 'ar';
        return (
            <div className="admin-overlay" onClick={onClose} dir={isRtl ? 'rtl' : 'ltr'}>
                <div className="admin-login-card" onClick={e => e.stopPropagation()}>
                    <div className="admin-login-header">
                        <div className="admin-login-logo">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h3 className="admin-login-title">{ad.loginTitle}</h3>
                        <p className="admin-login-subtitle">{ad.loginSubtitle}</p>
                    </div>
                    <form className="admin-login-form" onSubmit={handleLoginSubmit}>
                        <div className="form-group" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <label htmlFor="admin-pwd" style={{ marginBottom: '6px', display: 'block' }}>{ad.passwordLabel}</label>
                            <input 
                                type="password" 
                                id="admin-pwd" 
                                value={passcode}
                                onChange={e => setPasscode(e.target.value)}
                                placeholder={ad.passwordPlaceholder} 
                                style={{ direction: 'ltr', textAlign: 'center' }}
                                required 
                                autoFocus
                            />
                            {loginError && <span className="form-error" style={{ display: 'block', textAlign: isRtl ? 'right' : 'left' }}>{loginError}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">{ad.loginBtn}</button>
                    </form>
                    <div className="admin-login-footer">
                        <button className="admin-login-close" onClick={onClose}>{ad.cancelClose}</button>
                    </div>
                </div>
            </div>
        );
    }

    const isRtl = lang === 'ar';

    // -------------------------------------------------------------
    // RENDER: Full Admin Dashboard View
    // -------------------------------------------------------------
    return (
        <div className="admin-dashboard-container" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Sidebar */}
            <aside className="admin-sidebar" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                <div className="admin-sidebar-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <span className="admin-sidebar-title" style={{ flexDirection: isRtl ? 'row-reverse' : 'row', gap: '8px' }}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" className="logo-accent">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        {ad.title}
                    </span>
                    <button className="theme-toggle" onClick={onClose} style={{ border: 'none', background: 'none' }} title={ad.closeDashboard}>
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
                        {ad.tabGeneral}
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'skills' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('skills'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        {ad.tabSkills}
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('projects'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        {ad.tabProjects}
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'googleApps' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('googleApps'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        {ad.tabGoogleApps}
                    </div>
                    <div 
                        className={`admin-menu-item ${activeTab === 'resume' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('resume'); setEditingProject(null); setEditingGas(null); setEditingResume(null); }}
                    >
                        {ad.tabResume}
                    </div>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="btn btn-secondary" onClick={() => setShowExportModal(true)}>{ad.exportBtn}</button>
                    <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>{ad.importBtn}</button>
                    <button className="btn btn-secondary" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }} onClick={onResetToDefault}>{ad.resetBtn}</button>
                    <button className="admin-login-close" onClick={handleLogout} style={{ marginTop: '10px' }}>{ad.logoutBtn}</button>
                </div>
            </aside>

            {/* Main Window */}
            <main className="admin-main">
                <div className="admin-topbar" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <h2>
                        {activeTab === 'general' && ad.headerGeneral}
                        {activeTab === 'skills' && ad.headerSkills}
                        {activeTab === 'projects' && ad.headerProjects}
                        {activeTab === 'googleApps' && ad.headerGoogleApps}
                        {activeTab === 'resume' && ad.headerResume}
                    </h2>
                    <div className="admin-actions">
                        <button className="btn btn-primary" onClick={onClose}>{ad.saveCloseBtn}</button>
                    </div>
                </div>

                <div className="admin-content">
                    {/* -------------------------------------------------------------
                        TAB 1: GENERAL INFO
                        ------------------------------------------------------------- */}
                    {activeTab === 'general' && (
                        <div>
                            {/* == AVATAR UPLOAD CARD == */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.avatarTitle}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-primary)', flexShrink: 0, background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {portfolioData.hero.avatarBase64 ? (
                                            <img src={portfolioData.hero.avatarBase64} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: isRtl ? 'flex-end' : 'flex-start', textAlign: isRtl ? 'right' : 'left' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ad.avatarHelp}</p>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button type="button" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }} onClick={() => fileInputRef.current?.click()}>
                                                {portfolioData.hero.avatarBase64 ? ad.changeImgBtn : ad.uploadImgBtn}
                                            </button>
                                            {portfolioData.hero.avatarBase64 && (
                                                <button type="button" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 16px', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }} onClick={handleAvatarRemove}>
                                                    {ad.deleteImgBtn}
                                                </button>
                                            )}
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
                                    </div>
                                </div>
                            </div>

                            {/* == CV UPLOAD CARD == */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.cvTitle}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '2px dashed var(--accent-primary)', flexShrink: 0, background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                            <line x1="16" y1="13" x2="8" y2="13"></line>
                                            <line x1="16" y1="17" x2="8" y2="17"></line>
                                            <polyline points="10 9 9 9 8 9"></polyline>
                                        </svg>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: isRtl ? 'flex-end' : 'flex-start', textAlign: isRtl ? 'right' : 'left' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ad.cvHelp}</p>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button type="button" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }} onClick={() => cvInputRef.current?.click()}>
                                                {(portfolioData.resume || {}).cvPdfBase64 ? ad.changeCvBtn : ad.uploadCvBtn}
                                            </button>
                                            {(portfolioData.resume || {}).cvPdfBase64 && (
                                                <button type="button" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 16px', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }} onClick={handleCvRemove}>
                                                    {ad.deleteCvBtn}
                                                </button>
                                            )}
                                        </div>
                                        <input ref={cvInputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={handleCvUpload} />
                                        {(portfolioData.resume || {}).cvPdfBase64 && (
                                            <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>
                                                {lang === 'ar' ? '✓ ملف السيرة الذاتية PDF مرفوع ومحفوظ بنجاح' : '✓ CV PDF file successfully uploaded and stored'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* == HERO INFO CARD == */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.heroTitle}</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>{ad.taglineLabel}</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.hero.tagline} 
                                            onChange={e => updateField('hero', 'tagline', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.fullNameLabel}</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.hero.name} 
                                            onChange={e => updateField('hero', 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.jobTitleLabel}</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.hero.title} 
                                            onChange={e => updateField('hero', 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.descArLabel}</label>
                                        <textarea 
                                            rows="4" 
                                            value={portfolioData.hero.description} 
                                            onChange={e => updateField('hero', 'description', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.descEnLabel}</label>
                                        <textarea 
                                            rows="4" 
                                            value={portfolioData.hero.description_en || ''} 
                                            onChange={e => updateField('hero', 'description_en', e.target.value)}
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* == CONTACT INFO CARD == */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.contactTitle}</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>{ad.emailLabel}</label>
                                        <input 
                                            type="email" 
                                            value={portfolioData.contact.email} 
                                            onChange={e => updateField('contact', 'email', e.target.value)}
                                            style={{ direction: 'ltr' }}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.linkedinLabel}</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.contact.linkedin} 
                                            onChange={e => updateField('contact', 'linkedin', e.target.value)}
                                            style={{ direction: 'ltr' }}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.githubLabel}</label>
                                        <input 
                                            type="text" 
                                            value={portfolioData.contact.github} 
                                            onChange={e => updateField('contact', 'github', e.target.value)}
                                            style={{ direction: 'ltr' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* == WEB3FORMS API KEY CARD == */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.web3Title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
                                    {ad.web3Help}
                                </p>
                                <div className="admin-form-group full-width">
                                    <label>{ad.web3KeyLabel}</label>
                                    <input 
                                        type="text" 
                                        dir="ltr"
                                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                        value={(portfolioData.settings || {}).web3FormsKey || ''} 
                                        onChange={e => updateWeb3FormsKey(e.target.value)}
                                    />
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 className="admin-section-title" style={{ margin: 0, border: 'none', padding: 0 }}>{category.category}</h3>
                                        <button className="btn-admin-add" onClick={() => handleAddSkill(catIdx)}>{ad.addSkillBtn}</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {category.items.map((skill, skillIdx) => (
                                            <div className="admin-skill-slider-row" key={skillIdx} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <span className="admin-skill-name" style={{ textAlign: isRtl ? 'right' : 'left' }}>{skill.name}</span>
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
                                                    title={lang === 'ar' ? 'حذف' : 'Delete'}
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.projectsListTitle}</h3>
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
                                            {ad.addProjectBtn}
                                        </button>
                                    </div>
                                    <div className="admin-items-list">
                                        {portfolioData.projects.map(proj => (
                                            <div className="admin-item-row" key={proj.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{proj.title}</h4>
                                                    <p>{proj.tags.join(', ')} | {lang === 'ar' ? 'الفئة' : 'Category'}: {proj.categories.join('/')}</p>
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
                                    <h3 className="admin-section-title">{editingProject.id ? ad.editProjectTitle : ad.addProjectBtn}</h3>
                                    <form onSubmit={handleSaveProject}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group full-width">
                                                <label>{ad.projectTitleLabel}</label>
                                                <input 
                                                    type="text" 
                                                    value={editingProject.title}
                                                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.projectDescLabel}</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={editingProject.description}
                                                    onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.categoriesLabel}</label>
                                                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'flex-start' }}>
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
                                                        /> {ad.catWebLabel}
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
                                                        /> {ad.catDatabaseLabel}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.tagsLabel}</label>
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

                                            {/* Link builder */}
                                            <div className="admin-form-group full-width">
                                                <label>{ad.linksLabel}</label>
                                                <div style={{ display: 'flex', gap: '10px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                    <select 
                                                        style={{ width: '140px' }}
                                                        value={editingProject.links[0]?.type || 'github'}
                                                        onChange={e => {
                                                            const newLinks = [...editingProject.links];
                                                            const linkText = e.target.value === 'demo' ? (lang === 'ar' ? 'العرض الحي' : 'Live Demo') : 'GitHub';
                                                            if (newLinks.length === 0) {
                                                                newLinks.push({ type: e.target.value, text: linkText, url: '' });
                                                            } else {
                                                                 newLinks[0].type = e.target.value;
                                                                 newLinks[0].text = linkText;
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
                                                        placeholder={lang === 'ar' ? 'أدخل الرابط الإلكتروني' : 'Enter link URL'}
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
                                                        style={{ direction: 'ltr' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button type="submit" className="btn btn-primary">{ad.saveChangesBtn}</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingProject(null)}>{ad.cancelBtn}</button>
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.gasListTitle}</h3>
                                        <button 
                                            className="btn-admin-add" 
                                            onClick={() => setEditingGas({
                                                title: '',
                                                description: '',
                                                url: ''
                                            })}
                                        >
                                            {ad.addGasBtn}
                                        </button>
                                    </div>
                                    <div className="admin-items-list">
                                        {portfolioData.googleAppsSystems.map(gas => (
                                            <div className="admin-item-row" key={gas.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{gas.title}</h4>
                                                    <p style={{ wordBreak: 'break-all', direction: 'ltr', textAlign: isRtl ? 'right' : 'left' }}>{gas.url}</p>
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
                                    <h3 className="admin-section-title">{editingGas.id ? ad.editGasTitle : ad.addGasBtn}</h3>
                                    <form onSubmit={handleSaveGas}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group full-width">
                                                <label>{ad.gasTitleLabel}</label>
                                                <input 
                                                    type="text" 
                                                    value={editingGas.title}
                                                    onChange={e => setEditingGas({...editingGas, title: e.target.value})}
                                                    placeholder={lang === 'ar' ? 'مثال: نظام شؤون الموظفين المؤتمت' : 'e.g. Automated Staff Management System'}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.gasUrlLabel}</label>
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
                                                <label>{ad.gasDescLabel}</label>
                                                <textarea 
                                                    rows="4" 
                                                    value={editingGas.description}
                                                    onChange={e => setEditingGas({...editingGas, description: e.target.value})}
                                                    placeholder={lang === 'ar' ? 'اشرح ماذا يفعل النظام وكيف قمت بربطه...' : 'Explain what the system does and how you integrated it...'}
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button type="submit" className="btn btn-primary">{ad.saveChangesBtn}</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingGas(null)}>{ad.cancelBtn}</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* -------------------------------------------------------------
                        TAB 5: RESUME & CERTIFICATES TIMELINE
                        ------------------------------------------------------------- */}
                    {activeTab === 'resume' && (
                        <div>
                            {!editingResume ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.resumeTitle}</h3>
                                        <div style={{ display: 'flex', gap: '10px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button 
                                                className="btn-admin-add" 
                                                onClick={() => {
                                                    setResumeItemType('experience');
                                                    setEditingResume({ date: '', title: '', org: '', desc: '' });
                                                }}
                                            >
                                                {ad.addExpBtn}
                                            </button>
                                            <button 
                                                className="btn-admin-add" 
                                                style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}
                                                onClick={() => {
                                                    setResumeItemType('education');
                                                    setEditingResume({ date: '', title: '', org: '', desc: '' });
                                                }}
                                            >
                                                {ad.addEduBtn}
                                            </button>
                                            <button 
                                                className="btn-admin-add" 
                                                style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}
                                                onClick={() => {
                                                    setResumeItemType('certificates');
                                                    setEditingResume({ date: '', title: '', org: '', url: '' });
                                                }}
                                            >
                                                {ad.addCertBtn}
                                            </button>
                                        </div>
                                    </div>

                                    <h4 style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', textAlign: isRtl ? 'right' : 'left' }}>{ad.expSectionHeader}</h4>
                                    <div className="admin-items-list" style={{ marginBottom: '30px' }}>
                                        {(portfolioData.resume.experience || []).map(item => (
                                            <div className="admin-item-row" key={item.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
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

                                    <h4 style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', textAlign: isRtl ? 'right' : 'left' }}>{ad.eduSectionHeader}</h4>
                                    <div className="admin-items-list" style={{ marginBottom: '30px' }}>
                                        {(portfolioData.resume.education || []).map(item => (
                                            <div className="admin-item-row" key={item.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
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

                                    <h4 style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', textAlign: isRtl ? 'right' : 'left' }}>{ad.certSectionHeader}</h4>
                                    <div className="admin-items-list">
                                        {(portfolioData.resume.certificates || []).map(item => (
                                            <div className="admin-item-row" key={item.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{item.title}</h4>
                                                    <p>{item.org} | {item.date}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => { setResumeItemType('certificates'); setEditingResume(item); }}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteResumeItem('certificates', item.id)}>
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
                                        {editingResume.id ? ad.editResumeTitle : (resumeItemType === 'experience' ? ad.addExpTitle : (resumeItemType === 'education' ? ad.addEduTitle : ad.addCertTitle))}
                                    </h3>
                                    <form onSubmit={handleSaveResumeItem}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>{ad.dateLabel}</label>
                                                <input 
                                                    type="text" 
                                                    value={editingResume.date}
                                                    onChange={e => setEditingResume({...editingResume, date: e.target.value})}
                                                    placeholder={lang === 'ar' ? 'مثال: 2024 - 2025' : 'e.g. 2024 - 2025'}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.titleLabel}</label>
                                                <input 
                                                    type="text" 
                                                    value={editingResume.title}
                                                    onChange={e => setEditingResume({...editingResume, title: e.target.value})}
                                                    placeholder={lang === 'ar' ? 'مثال: بكالوريوس هندسة الحاسبات' : 'e.g. B.Sc. Computer Engineering'}
                                                    required 
                                                />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.orgLabel}</label>
                                                <input 
                                                    type="text" 
                                                    value={editingResume.org}
                                                    onChange={e => setEditingResume({...editingResume, org: e.target.value})}
                                                    placeholder={lang === 'ar' ? 'مثال: جامعة القاهرة / مستقل' : 'e.g. Cairo University / Freelance'}
                                                    required 
                                                />
                                            </div>
                                            {resumeItemType === 'certificates' ? (
                                                <div className="admin-form-group full-width">
                                                    <label>{ad.urlLabel}</label>
                                                    <input 
                                                        type="text" 
                                                        value={editingResume.url || ''}
                                                        onChange={e => setEditingResume({...editingResume, url: e.target.value})}
                                                        placeholder="https://..."
                                                        style={{ direction: 'ltr' }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="admin-form-group full-width">
                                                    <label>{ad.descLabel}</label>
                                                    <textarea 
                                                        rows="4" 
                                                        value={editingResume.desc || ''}
                                                        onChange={e => setEditingResume({...editingResume, desc: e.target.value})}
                                                        required 
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button type="submit" className="btn btn-primary">{ad.saveChangesBtn}</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingResume(null)}>{ad.cancelBtn}</button>
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
                        <div className="admin-modal-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <h3>{ad.exportJsonTitle}</h3>
                            <button className="theme-toggle" onClick={() => setShowExportModal(false)} style={{ border: 'none', background: 'none' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="admin-modal-body" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                {ad.exportHelp}
                            </p>
                            <textarea 
                                readOnly 
                                className="admin-json-code"
                                value={`export const initialPortfolioData = ${JSON.stringify(portfolioData, null, 4)};`}
                                onClick={e => e.target.select()}
                                style={{ direction: 'ltr' }}
                            />
                        </div>
                        <div className="admin-modal-footer" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <button className="btn btn-primary" onClick={handleCopyJson}>{ad.copyClipboardBtn}</button>
                            <button className="btn btn-secondary" onClick={() => setShowExportModal(false)}>{ad.cancelBtn}</button>
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
                        <div className="admin-modal-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <h3>{ad.importJsonTitle}</h3>
                            <button className="theme-toggle" onClick={() => setShowImportModal(false)} style={{ border: 'none', background: 'none' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleImportJson}>
                            <div className="admin-modal-body" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                                    {ad.importHelp}
                                </p>
                                <textarea 
                                    className="admin-json-code"
                                    placeholder='{ "hero": {...}, "skills": [...], ... }'
                                    value={importJsonText}
                                    onChange={e => setImportJsonText(e.target.value)}
                                    required
                                    style={{ direction: 'ltr' }}
                                />
                                {importError && <span className="form-error" style={{ display: 'block', marginTop: '10px' }}>{importError}</span>}
                            </div>
                            <div className="admin-modal-footer" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                <button type="submit" className="btn btn-primary">{ad.importSubmitBtn}</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowImportModal(false)}>{ad.cancelBtn}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
