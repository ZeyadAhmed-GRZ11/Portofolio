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

        // Profile switcher
        profileSwitcherTitle: 'الملف الشخصي النشط',
        profilePersonal: 'ملفي الشخصي',
        profileCompany: 'Tech Titans',
        switchToPersonal: 'التبديل إلى الملف الشخصي',
        switchToCompany: 'التبديل إلى Tech Titans',

        // Sidebar tabs — personal
        tabGeneral: 'معلومات عامة',
        tabSkills: 'إدارة المهارات',
        tabProjects: 'المشاريع',
        tabGoogleApps: 'أنظمة Google Apps',
        tabResume: 'السيرة الذاتية',
        tabVisibility: 'إظهار/إخفاء الأقسام',

        // Sidebar tabs — company
        tabCompanyGeneral: 'بيانات الشركة',
        tabServices: 'الخدمات',
        tabPortfolio: 'أعمال الشركة',
        tabCompanySystems: 'أنظمة البرمجيات',

        exportBtn: 'تصدير JSON',
        importBtn: 'استيراد JSON',
        resetBtn: 'إعادة تعيين الافتراضي',
        logoutBtn: 'تسجيل الخروج',

        headerGeneral: 'تعديل الملف والروابط',
        headerSkills: 'تعديل مستوى المهارات',
        headerProjects: 'إدارة المشاريع البرمجية',
        headerGoogleApps: 'إدارة أنظمة Google Apps Script',
        headerResume: 'تعديل الخبرات والتعليم والشهادات',
        headerVisibility: 'إظهار وإخفاء أقسام الموقع',
        headerCompanyGeneral: 'بيانات الشركة الرئيسية',
        headerServices: 'إدارة خدمات الشركة',
        headerPortfolio: 'إدارة أعمال ومشاريع الشركة',
        headerCompanySystems: 'إدارة أنظمة البرمجيات للشركة',

        // Visibility
        visibilityHelp: 'أوقف أي قسم لإخفائه من الموقع والقائمة العلوية فوراً.',
        sectionHero: 'القسم الرئيسي (Hero)',
        sectionProjects: 'المشاريع البرمجية',
        sectionGoogleApps: 'أنظمة Google Apps',
        sectionSkills: 'المهارات والخبرات',
        sectionResume: 'السيرة الذاتية',
        sectionContact: 'التواصل',
        sectionServices: 'الخدمات',
        sectionPortfolio: 'أعمال الشركة',
        sectionCompanySystems: 'أنظمة الويب والبرمجيات',

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

        companyNameLabel: 'اسم الشركة',
        companyTaglineArLabel: 'الشعار (عربي)',
        companyTaglineEnLabel: 'الشعار (English)',
        companyDescArLabel: 'وصف الشركة (عربي)',
        companyDescEnLabel: 'وصف الشركة (English)',
        logoTitle: '🏢 شعار الشركة (Logo)',
        logoHelp: 'ارفع شعار الشركة. يُفضَّل صورة مربعة أو PNG شفاف. الحد الأقصى 5MB.',
        uploadLogoBtn: '📁 رفع الشعار',
        changeLogoBtn: '🔄 تغيير الشعار',
        deleteLogoBtn: '🗑️ حذف الشعار',
        confirmDeleteLogo: 'هل تريد حذف شعار الشركة؟',

        contactTitle: 'بيانات التواصل والشبكات الاجتماعية',
        emailLabel: 'البريد الإلكتروني المباشر',
        linkedinLabel: 'رابط حساب LinkedIn',
        githubLabel: 'رابط حساب GitHub',

        web3Title: '📬 مفتاح Web3Forms API (نموذج التواصل)',
        web3Help: 'للحصول على المفتاح، سجّل مجاناً على web3forms.com، ثم انسخ الـ Access Key وألصقه هنا.',
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

        // Services & Portfolio (company)
        servicesListTitle: 'قائمة الخدمات',
        addServiceBtn: 'إضافة خدمة جديدة +',
        confirmDeleteService: 'هل أنت متأكد من حذف هذه الخدمة؟',
        serviceTitleArLabel: 'عنوان الخدمة (عربي)',
        serviceTitleEnLabel: 'عنوان الخدمة (English)',
        serviceDescArLabel: 'وصف الخدمة (عربي)',
        serviceDescEnLabel: 'وصف الخدمة (English)',
        portfolioListTitle: 'قائمة الأعمال والمشاريع',
        addPortfolioBtn: 'إضافة عمل جديد +',
        confirmDeletePortfolio: 'هل أنت متأكد من حذف هذا العمل؟',
        portfolioTitleArLabel: 'عنوان العمل (عربي)',
        portfolioTitleEnLabel: 'عنوان العمل (English)',
        portfolioDescArLabel: 'وصف العمل (عربي)',
        portfolioDescEnLabel: 'وصف العمل (English)',
        portfolioUrlLabel: 'رابط العمل (اختياري)',

        companySysListTitle: 'قائمة أنظمة الويب والبرمجيات',
        addCompanySysBtn: 'إضافة نظام برمجيات جديد +',
        editCompanySysTitle: 'تعديل نظام البرمجيات',
        companySysTitleArLabel: 'عنوان النظام (عربي)',
        companySysTitleEnLabel: 'عنوان النظام (English)',
        companySysDescArLabel: 'الوصف الفني للنظام (عربي)',
        companySysDescEnLabel: 'الوصف الفني للنظام (English)',
        companySysUrlLabel: 'رابط نشر الخدمة (System URL)',

        exportJsonTitle: 'تصدير الكود JSON',
        exportHelp: 'انسخ هذا الكود بالكامل واستبدل به محتويات ملف src/data/portfolioData.js في مشروعك لتثبيت التعديلات للأبد.',
        copyClipboardBtn: 'نسخ إلى الحافظة',
        copiedSuccessAlert: 'تم نسخ البيانات بصيغة JSON!',
        importJsonTitle: 'استيراد كود JSON',
        importHelp: 'قم بلصق كائن JSON الخاص ببيانات التطبيق (appData) هنا لتحديث الموقع فوراً.',
        importSuccessAlert: 'تم استيراد البيانات وتحديث الموقع بنجاح!',
        importStructureError: 'الملف لا يحتوي على البنية الصحيحة (profiles.personal أو profiles.company).',
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

        // Profile switcher
        profileSwitcherTitle: 'Active Profile',
        profilePersonal: 'My Portfolio',
        profileCompany: 'Tech Titans',
        switchToPersonal: 'Switch to Personal',
        switchToCompany: 'Switch to Tech Titans',

        // Sidebar tabs — personal
        tabGeneral: 'General Settings',
        tabSkills: 'Manage Skills',
        tabProjects: 'Projects',
        tabGoogleApps: 'Google Apps',
        tabResume: 'Resume',
        tabVisibility: 'Show / Hide Sections',

        // Sidebar tabs — company
        tabCompanyGeneral: 'Company Info',
        tabServices: 'Services',
        tabPortfolio: 'Company Work',
        tabCompanySystems: 'Software Systems',

        exportBtn: 'Export JSON',
        importBtn: 'Import JSON',
        resetBtn: 'Reset Defaults',
        logoutBtn: 'Log Out',

        headerGeneral: 'Edit Profile & Settings',
        headerSkills: 'Edit Technical Skills',
        headerProjects: 'Manage Projects',
        headerGoogleApps: 'Manage Google Apps',
        headerResume: 'Resume & Certifications',
        headerVisibility: 'Section Visibility Control',
        headerCompanyGeneral: 'Company Profile & Branding',
        headerServices: 'Manage Company Services',
        headerPortfolio: 'Manage Company Portfolio',
        headerCompanySystems: 'Manage Company Web & Software Systems',

        // Visibility
        visibilityHelp: 'Toggle any section off to instantly hide it from the live site and navigation.',
        sectionHero: 'Hero / Landing Section',
        sectionProjects: 'Software Projects',
        sectionGoogleApps: 'Google Apps Systems',
        sectionSkills: 'Skills & Expertise',
        sectionResume: 'Resume / CV',
        sectionContact: 'Contact',
        sectionServices: 'Services',
        sectionPortfolio: 'Company Portfolio',
        sectionCompanySystems: 'Web & Software Systems',

        avatarTitle: '📷 Profile Picture (Avatar)',
        avatarHelp: 'Image stored locally in browser. Max size: 5MB. Square aspect recommended.',
        changeImgBtn: '🔄 Change Image',
        uploadImgBtn: '📁 Upload Image',
        deleteImgBtn: '🗑 Delete Image',
        confirmDeleteImg: 'Are you sure you want to delete your profile picture?',
        imgSizeError: 'Image is too large. Maximum size is 5MB.',

        heroTitle: 'Hero Section Data',
        taglineLabel: 'Greeting Tagline',
        fullNameLabel: 'Full Name',
        jobTitleLabel: 'Job Title / Subtitle',
        descArLabel: 'Bio / Description (Arabic)',
        descEnLabel: 'Bio / Description (English)',

        companyNameLabel: 'Company Name',
        companyTaglineArLabel: 'Tagline / Slogan (Arabic)',
        companyTaglineEnLabel: 'Tagline / Slogan (English)',
        companyDescArLabel: 'Company Description (Arabic)',
        companyDescEnLabel: 'Company Description (English)',
        logoTitle: '🏢 Company Logo',
        logoHelp: 'Upload your company logo. Square or transparent PNG recommended. Max 5MB.',
        uploadLogoBtn: '📁 Upload Logo',
        changeLogoBtn: '🔄 Change Logo',
        deleteLogoBtn: '🗑 Delete Logo',
        confirmDeleteLogo: 'Are you sure you want to delete the company logo?',

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
        deleteCvBtn: '🗑 Delete CV File',
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

        // Services & Portfolio (company)
        servicesListTitle: 'Services List',
        addServiceBtn: 'Add Service +',
        confirmDeleteService: 'Are you sure you want to delete this service?',
        serviceTitleArLabel: 'Service Title (Arabic)',
        serviceTitleEnLabel: 'Service Title (English)',
        serviceDescArLabel: 'Service Description (Arabic)',
        serviceDescEnLabel: 'Service Description (English)',
        portfolioListTitle: 'Portfolio / Work List',
        addPortfolioBtn: 'Add Work Item +',
        confirmDeletePortfolio: 'Are you sure you want to delete this item?',
        portfolioTitleArLabel: 'Work Title (Arabic)',
        portfolioTitleEnLabel: 'Work Title (English)',
        portfolioDescArLabel: 'Work Description (Arabic)',
        portfolioDescEnLabel: 'Work Description (English)',
        portfolioUrlLabel: 'Project URL (optional)',

        companySysListTitle: 'Web & Software Systems List',
        addCompanySysBtn: 'Add New System +',
        editCompanySysTitle: 'Edit Software System',
        companySysTitleArLabel: 'System Title (Arabic)',
        companySysTitleEnLabel: 'System Title (English)',
        companySysDescArLabel: 'System Description (Arabic)',
        companySysDescEnLabel: 'System Description (English)',
        companySysUrlLabel: 'Published System URL',

        exportJsonTitle: 'Export JSON Data',
        exportHelp: 'Copy this JSON block and paste it inside src/data/portfolioData.js to persist modifications permanently.',
        copyClipboardBtn: 'Copy to Clipboard',
        copiedSuccessAlert: 'Data copied as JSON!',
        importJsonTitle: 'Import JSON Data',
        importHelp: 'Paste your appData JSON block here to overwrite and refresh all site data immediately.',
        importSuccessAlert: 'Data imported and site updated successfully!',
        importStructureError: 'JSON does not contain the correct structure (needs profiles.personal or profiles.company).',
        importParseError: 'Invalid JSON syntax. Please verify the input.',
        importSubmitBtn: 'Import Data',
    }
};

// ─── Section visibility config per profile type ──────────────────────────────
const PERSONAL_SECTIONS = [
    { key: 'hero',       labelKey: 'sectionHero',       icon: '🏠' },
    { key: 'projects',   labelKey: 'sectionProjects',   icon: '💻' },
    { key: 'googleApps', labelKey: 'sectionGoogleApps', icon: '⚙️' },
    { key: 'skills',     labelKey: 'sectionSkills',     icon: '🛠️' },
    { key: 'resume',     labelKey: 'sectionResume',     icon: '📄' },
    { key: 'contact',    labelKey: 'sectionContact',    icon: '✉️' },
];
const COMPANY_SECTIONS = [
    { key: 'hero',      labelKey: 'sectionHero',           icon: '🏠' },
    { key: 'services',  labelKey: 'sectionServices',       icon: '🔧' },
    { key: 'portfolio', labelKey: 'sectionPortfolio',      icon: '🗂️' },
    { key: 'systems',   labelKey: 'sectionCompanySystems', icon: '⚙️' },
    { key: 'contact',   labelKey: 'sectionContact',        icon: '✉️' },
];

export default function AdminDashboard({ isOpen, onClose, appData, setAppData, onResetToDefault, lang }) {
    const fileInputRef = useRef(null);
    const cvInputRef   = useRef(null);
    const logoInputRef = useRef(null);

    const [passcode,        setPasscode]        = useState('');
    const [loginError,      setLoginError]      = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        sessionStorage.getItem('isAdminAuthenticated') === 'true'
    );

    const [activeTab,       setActiveTab]       = useState('general');
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importJsonText,  setImportJsonText]  = useState('');
    const [importError,     setImportError]     = useState('');

    const [editingProject,    setEditingProject]    = useState(null);
    const [editingGas,        setEditingGas]        = useState(null);
    const [editingResume,     setEditingResume]     = useState(null);
    const [resumeItemType,    setResumeItemType]    = useState('experience');
    const [editingService,    setEditingService]    = useState(null);
    const [editingPortfolio,  setEditingPortfolio]  = useState(null);
    const [editingCompanySys, setEditingCompanySys] = useState(null);

    const ad = adminTranslations[lang] || adminTranslations.ar;

    useEffect(() => {
        if (!isOpen) { setPasscode(''); setLoginError(''); }
    }, [isOpen]);

    if (!isOpen) return null;

    // ── Derived active profile data ───────────────────────────────
    const activeProfile  = appData.activeProfile;
    const isCompany      = activeProfile === 'company';
    const portfolioData  = appData.profiles[activeProfile];

    // ── Profile-scoped updater (keeps other profiles intact) ──────
    const setProfileData = (updater) => {
        setAppData(prev => ({
            ...prev,
            profiles: {
                ...prev.profiles,
                [prev.activeProfile]: typeof updater === 'function'
                    ? updater(prev.profiles[prev.activeProfile])
                    : updater
            }
        }));
    };

    // ── Profile switcher ──────────────────────────────────────────
    const switchProfile = (profileId) => {
        setAppData(prev => ({ ...prev, activeProfile: profileId }));
        setActiveTab(profileId === 'company' ? 'companyGeneral' : 'general');
        setEditingProject(null); setEditingGas(null);
        setEditingResume(null);  setEditingService(null);
        setEditingPortfolio(null); setEditingCompanySys(null);
    };

    // ── Login ─────────────────────────────────────────────────────
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

    // ── Generic field updater ─────────────────────────────────────
    const updateField = (section, field, value) => {
        setProfileData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    // ── Section visibility toggle ─────────────────────────────────
    const toggleVisibility = (sectionKey) => {
        setProfileData(prev => ({
            ...prev,
            sectionVisibility: {
                ...prev.sectionVisibility,
                [sectionKey]: !prev.sectionVisibility[sectionKey]
            }
        }));
    };

    // ── Avatar / Logo / CV upload handlers ───────────────────────
    const handleImageUpload = (e, heroField) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { alert(ad.imgSizeError); return; }
        const reader = new FileReader();
        reader.onload = (ev) => updateField('hero', heroField, ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleImageRemove = (heroField, confirmMsg) => {
        if (window.confirm(confirmMsg)) updateField('hero', heroField, null);
    };

    const handleCvUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'application/pdf') { alert(ad.cvTypeError); return; }
        if (file.size > 5 * 1024 * 1024) { alert(ad.cvSizeError); return; }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setProfileData(prev => ({
                ...prev,
                resume: { ...(prev.resume || {}), cvPdfBase64: ev.target.result }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleCvRemove = () => {
        if (window.confirm(ad.confirmDeleteCv)) {
            setProfileData(prev => ({
                ...prev,
                resume: { ...(prev.resume || {}), cvPdfBase64: null }
            }));
        }
    };

    const updateWeb3FormsKey = (value) => {
        setProfileData(prev => ({
            ...prev,
            settings: { ...(prev.settings || {}), web3FormsKey: value }
        }));
    };

    // ── Skills handlers ───────────────────────────────────────────
    const updateSkillLevel = (catIndex, skillIndex, newLevel) => {
        setProfileData(prev => {
            const newSkills = prev.skills.map((c, ci) =>
                ci !== catIndex ? c : {
                    ...c,
                    items: c.items.map((s, si) =>
                        si !== skillIndex ? s : { ...s, level: parseInt(newLevel, 10) }
                    )
                }
            );
            return { ...prev, skills: newSkills };
        });
    };

    const handleAddSkill = (catIndex) => {
        const name = prompt(ad.promptSkillName);
        if (!name) return;
        setProfileData(prev => {
            const newSkills = prev.skills.map((c, ci) =>
                ci !== catIndex ? c : { ...c, items: [...c.items, { name, level: 80 }] }
            );
            return { ...prev, skills: newSkills };
        });
    };

    const handleDeleteSkill = (catIndex, skillIndex) => {
        if (!window.confirm(ad.confirmDeleteSkill)) return;
        setProfileData(prev => {
            const newSkills = prev.skills.map((c, ci) =>
                ci !== catIndex ? c : { ...c, items: c.items.filter((_, si) => si !== skillIndex) }
            );
            return { ...prev, skills: newSkills };
        });
    };

    // ── Projects CRUD ─────────────────────────────────────────────
    const handleSaveProject = (e) => {
        e.preventDefault();
        const p = editingProject;
        if (!p.title.trim()) return;
        setProfileData(prev => {
            let list = [...prev.projects];
            if (p.id) {
                list = list.map(item => item.id === p.id ? p : item);
            } else {
                const newId = list.length > 0 ? Math.max(...list.map(x => x.id)) + 1 : 1;
                list.push({ ...p, id: newId });
            }
            return { ...prev, projects: list };
        });
        setEditingProject(null);
    };

    const handleDeleteProject = (id) => {
        if (!window.confirm(ad.confirmDeleteProject)) return;
        setProfileData(prev => ({ ...prev, projects: prev.projects.filter(x => x.id !== id) }));
    };

    // ── Google Apps CRUD ──────────────────────────────────────────
    const handleSaveGas = (e) => {
        e.preventDefault();
        const g = editingGas;
        if (!g.title.trim() || !g.url.trim()) return;
        setProfileData(prev => {
            let list = [...prev.googleAppsSystems];
            if (g.id) {
                list = list.map(item => item.id === g.id ? g : item);
            } else {
                const newId = `gas-${Date.now()}`;
                list.push({ ...g, id: newId });
            }
            return { ...prev, googleAppsSystems: list };
        });
        setEditingGas(null);
    };

    const handleDeleteGas = (id) => {
        if (!window.confirm(ad.confirmDeleteGas)) return;
        setProfileData(prev => ({
            ...prev,
            googleAppsSystems: prev.googleAppsSystems.filter(x => x.id !== id)
        }));
    };

    // ── Resume CRUD ───────────────────────────────────────────────
    const handleSaveResumeItem = (e) => {
        e.preventDefault();
        const item = editingResume;
        if (!item.title.trim() || !item.date.trim()) return;
        setProfileData(prev => {
            const list = [...(prev.resume[resumeItemType] || [])];
            if (item.id) {
                const idx = list.findIndex(x => x.id === item.id);
                if (idx !== -1) list[idx] = item;
            } else {
                list.push({ ...item, id: `${resumeItemType.substring(0, 3)}-${Date.now()}` });
            }
            return { ...prev, resume: { ...(prev.resume || {}), [resumeItemType]: list } };
        });
        setEditingResume(null);
    };

    const handleDeleteResumeItem = (type, id) => {
        if (!window.confirm(ad.confirmDeleteResume)) return;
        setProfileData(prev => ({
            ...prev,
            resume: {
                ...(prev.resume || {}),
                [type]: (prev.resume[type] || []).filter(x => x.id !== id)
            }
        }));
    };

    // ── Services CRUD (company) ───────────────────────────────────
    const handleSaveService = (e) => {
        e.preventDefault();
        const s = editingService;
        setProfileData(prev => {
            let list = [...(prev.services || [])];
            if (s.id) {
                list = list.map(item => item.id === s.id ? s : item);
            } else {
                list.push({ ...s, id: `svc-${Date.now()}` });
            }
            return { ...prev, services: list };
        });
        setEditingService(null);
    };

    const handleDeleteService = (id) => {
        if (!window.confirm(ad.confirmDeleteService)) return;
        setProfileData(prev => ({ ...prev, services: prev.services.filter(x => x.id !== id) }));
    };

    // ── Portfolio CRUD (company) ───────────────────────────────────
    const handleSavePortfolio = (e) => {
        e.preventDefault();
        const p = editingPortfolio;
        setProfileData(prev => {
            let list = [...(prev.portfolio || [])];
            if (p.id) {
                list = list.map(item => item.id === p.id ? p : item);
            } else {
                list.push({ ...p, id: `port-${Date.now()}` });
            }
            return { ...prev, portfolio: list };
        });
        setEditingPortfolio(null);
    };

    const handleDeletePortfolio = (id) => {
        if (!window.confirm(ad.confirmDeletePortfolio)) return;
        setProfileData(prev => ({ ...prev, portfolio: prev.portfolio.filter(x => x.id !== id) }));
    };

    // ── Company Systems CRUD ──────────────────────────────────────
    const handleSaveCompanySys = (e) => {
        e.preventDefault();
        const s = editingCompanySys;
        if (!s.title.trim() || !s.url.trim()) return;
        setProfileData(prev => {
            let list = [...(prev.googleAppsSystems || [])];
            if (s.id) {
                list = list.map(item => item.id === s.id ? s : item);
            } else {
                const newId = `csys-${Date.now()}`;
                list.push({ ...s, id: newId });
            }
            return { ...prev, googleAppsSystems: list };
        });
        setEditingCompanySys(null);
    };

    const handleDeleteCompanySys = (id) => {
        if (!window.confirm(ad.confirmDeleteGas)) return;
        setProfileData(prev => ({
            ...prev,
            googleAppsSystems: (prev.googleAppsSystems || []).filter(x => x.id !== id)
        }));
    };

    // ── Export / Import ───────────────────────────────────────────
    const handleCopyJson = () => {
        navigator.clipboard.writeText(JSON.stringify(appData, null, 4));
        alert(ad.copiedSuccessAlert);
    };

    const handleImportJson = (e) => {
        e.preventDefault();
        try {
            const parsed = JSON.parse(importJsonText);
            if (parsed.profiles && (parsed.profiles.personal || parsed.profiles.company)) {
                setAppData(parsed);
                setShowImportModal(false);
                setImportJsonText('');
                setImportError('');
                alert(ad.importSuccessAlert);
            } else {
                setImportError(ad.importStructureError);
            }
        } catch {
            setImportError(ad.importParseError);
        }
    };

    // ── Tab reset helper ──────────────────────────────────────────
    const goToTab = (tab) => {
        setActiveTab(tab);
        setEditingProject(null); setEditingGas(null);
        setEditingResume(null);  setEditingService(null);
        setEditingPortfolio(null); setEditingCompanySys(null);
    };

    // ─────────────────────────────────────────────────────────────
    // RENDER: Login Screen
    // ─────────────────────────────────────────────────────────────
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
    const sectionLabels = isCompany ? COMPANY_SECTIONS : PERSONAL_SECTIONS;

    // ─────────────────────────────────────────────────────────────
    // RENDER: Full Dashboard
    // ─────────────────────────────────────────────────────────────
    return (
        <div className="admin-dashboard-container" dir={isRtl ? 'rtl' : 'ltr'}>

            {/* ══ SIDEBAR ══════════════════════════════════════════ */}
            <aside className="admin-sidebar" style={{ textAlign: isRtl ? 'right' : 'left' }}>

                {/* Header */}
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

                {/* ── PROFILE SWITCHER CARD ── */}
                <div className="admin-profile-switcher">
                    <p className="admin-profile-switcher-label">{ad.profileSwitcherTitle}</p>
                    <div className="admin-profile-pills">
                        <button
                            className={`admin-profile-pill ${!isCompany ? 'active' : ''}`}
                            onClick={() => switchProfile('personal')}
                        >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {ad.profilePersonal}
                        </button>
                        <button
                            className={`admin-profile-pill ${isCompany ? 'active' : ''}`}
                            onClick={() => switchProfile('company')}
                        >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                            {ad.profileCompany}
                        </button>
                    </div>
                </div>

                {/* ── NAV MENU ── */}
                <nav className="admin-sidebar-menu">
                    {/* Personal tabs */}
                    {!isCompany && (<>
                        <div className={`admin-menu-item ${activeTab === 'general' ? 'active' : ''}`} onClick={() => goToTab('general')}>{ad.tabGeneral}</div>
                        <div className={`admin-menu-item ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => goToTab('skills')}>{ad.tabSkills}</div>
                        <div className={`admin-menu-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => goToTab('projects')}>{ad.tabProjects}</div>
                        <div className={`admin-menu-item ${activeTab === 'googleApps' ? 'active' : ''}`} onClick={() => goToTab('googleApps')}>{ad.tabGoogleApps}</div>
                        <div className={`admin-menu-item ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => goToTab('resume')}>{ad.tabResume}</div>
                    </>)}

                    {/* Company tabs */}
                    {isCompany && (<>
                        <div className={`admin-menu-item ${activeTab === 'companyGeneral' ? 'active' : ''}`} onClick={() => goToTab('companyGeneral')}>{ad.tabCompanyGeneral}</div>
                        <div className={`admin-menu-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => goToTab('services')}>{ad.tabServices}</div>
                        <div className={`admin-menu-item ${activeTab === 'companyPortfolio' ? 'active' : ''}`} onClick={() => goToTab('companyPortfolio')}>{ad.tabPortfolio}</div>
                        <div className={`admin-menu-item ${activeTab === 'companySystems' ? 'active' : ''}`} onClick={() => goToTab('companySystems')}>{ad.tabCompanySystems}</div>
                    </>)}

                    {/* Visibility — always visible */}
                    <div className={`admin-menu-item ${activeTab === 'visibility' ? 'active' : ''}`} onClick={() => goToTab('visibility')} style={{ marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <span style={{ marginRight: isRtl ? 0 : '6px', marginLeft: isRtl ? '6px' : 0 }}>👁</span>
                        {ad.tabVisibility}
                    </div>
                </nav>

                {/* Sidebar Footer */}
                <div className="admin-sidebar-footer">
                    <button className="btn btn-secondary" onClick={() => setShowExportModal(true)}>{ad.exportBtn}</button>
                    <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>{ad.importBtn}</button>
                    <button className="btn btn-secondary" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#ef4444' }} onClick={onResetToDefault}>{ad.resetBtn}</button>
                    <button className="admin-login-close" onClick={handleLogout} style={{ marginTop: '10px' }}>{ad.logoutBtn}</button>
                </div>
            </aside>

            {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
            <main className="admin-main">
                <div className="admin-topbar" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <h2>
                        {activeTab === 'general'         && ad.headerGeneral}
                        {activeTab === 'skills'          && ad.headerSkills}
                        {activeTab === 'projects'        && ad.headerProjects}
                        {activeTab === 'googleApps'      && ad.headerGoogleApps}
                        {activeTab === 'resume'          && ad.headerResume}
                        {activeTab === 'visibility'      && ad.headerVisibility}
                        {activeTab === 'companyGeneral'  && ad.headerCompanyGeneral}
                        {activeTab === 'services'        && ad.headerServices}
                        {activeTab === 'companyPortfolio' && ad.headerPortfolio}
                        {activeTab === 'companySystems'   && ad.headerCompanySystems}
                    </h2>
                    <div className="admin-actions">
                        <button className="btn btn-primary" onClick={onClose}>{ad.saveCloseBtn}</button>
                    </div>
                </div>

                <div className="admin-content">

                    {/* ══════════════════════════════════════════════
                        TAB: SECTION VISIBILITY
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'visibility' && (
                        <div className="admin-section-card">
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>{ad.visibilityHelp}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {sectionLabels.map(({ key, labelKey, icon }) => (
                                    <div key={key} className="admin-visibility-row" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <span className="admin-visibility-label" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                            <span style={{ marginRight: isRtl ? 0 : '10px', marginLeft: isRtl ? '10px' : 0 }}>{icon}</span>
                                            {ad[labelKey]}
                                        </span>
                                        <button
                                            className={`admin-toggle-switch ${portfolioData.sectionVisibility?.[key] ? 'on' : 'off'}`}
                                            onClick={() => toggleVisibility(key)}
                                            role="switch"
                                            aria-checked={!!portfolioData.sectionVisibility?.[key]}
                                        >
                                            <span className="admin-toggle-knob"></span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════
                        TAB: PERSONAL — GENERAL SETTINGS
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'general' && !isCompany && (
                        <div>
                            {/* Avatar */}
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
                                                <button type="button" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 16px', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }} onClick={() => handleImageRemove('avatarBase64', ad.confirmDeleteImg)}>
                                                    {ad.deleteImgBtn}
                                                </button>
                                            )}
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e, 'avatarBase64')} />
                                    </div>
                                </div>
                            </div>

                            {/* CV PDF */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.cvTitle}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '2px dashed var(--accent-primary)', flexShrink: 0, background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
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
                                                {lang === 'ar' ? '✓ ملف السيرة الذاتية PDF مرفوع ومحفوظ بنجاح' : '✓ CV PDF successfully uploaded and stored'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Hero Info */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.heroTitle}</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>{ad.taglineLabel}</label>
                                        <input type="text" value={portfolioData.hero.tagline} onChange={e => updateField('hero', 'tagline', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.fullNameLabel}</label>
                                        <input type="text" value={portfolioData.hero.name} onChange={e => updateField('hero', 'name', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.jobTitleLabel}</label>
                                        <input type="text" value={portfolioData.hero.title} onChange={e => updateField('hero', 'title', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.descArLabel}</label>
                                        <textarea rows="4" value={portfolioData.hero.description} onChange={e => updateField('hero', 'description', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.descEnLabel}</label>
                                        <textarea rows="4" value={portfolioData.hero.description_en || ''} onChange={e => updateField('hero', 'description_en', e.target.value)} dir="ltr" />
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.contactTitle}</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>{ad.emailLabel}</label>
                                        <input type="email" value={portfolioData.contact.email} onChange={e => updateField('contact', 'email', e.target.value)} style={{ direction: 'ltr' }} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.linkedinLabel}</label>
                                        <input type="text" value={portfolioData.contact.linkedin} onChange={e => updateField('contact', 'linkedin', e.target.value)} style={{ direction: 'ltr' }} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.githubLabel}</label>
                                        <input type="text" value={portfolioData.contact.github} onChange={e => updateField('contact', 'github', e.target.value)} style={{ direction: 'ltr' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Web3Forms */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.web3Title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>{ad.web3Help}</p>
                                <div className="admin-form-group full-width">
                                    <label>{ad.web3KeyLabel}</label>
                                    <input type="text" dir="ltr" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={(portfolioData.settings || {}).web3FormsKey || ''} onChange={e => updateWeb3FormsKey(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════
                        TAB: SKILLS (personal)
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'skills' && !isCompany && (
                        <div>
                            {(portfolioData.skills || []).map((category, catIdx) => (
                                <div className="admin-section-card" key={catIdx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 className="admin-section-title" style={{ margin: 0, border: 'none', padding: 0 }}>{category.category}</h3>
                                        <button className="btn-admin-add" onClick={() => handleAddSkill(catIdx)}>{ad.addSkillBtn}</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {category.items.map((skill, skillIdx) => (
                                            <div className="admin-skill-slider-row" key={skillIdx} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <span className="admin-skill-name" style={{ textAlign: isRtl ? 'right' : 'left' }}>{skill.name}</span>
                                                <input type="range" min="30" max="100" className="admin-skill-slider" value={skill.level} onChange={e => updateSkillLevel(catIdx, skillIdx, e.target.value)} />
                                                <span className="admin-skill-percentage">{skill.level}%</span>
                                                <button className="btn-admin-icon delete" onClick={() => handleDeleteSkill(catIdx, skillIdx)}>
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

                    {/* ══════════════════════════════════════════════
                        TAB: PROJECTS (personal)
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'projects' && !isCompany && (
                        <div>
                            {!editingProject ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.projectsListTitle}</h3>
                                        <button className="btn-admin-add" onClick={() => setEditingProject({ title: '', description: '', categories: ['web'], tags: [], links: [{ type: 'github', text: 'GitHub', url: '' }] })}>{ad.addProjectBtn}</button>
                                    </div>
                                    <div className="admin-items-list">
                                        {(portfolioData.projects || []).map(proj => (
                                            <div className="admin-item-row" key={proj.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{proj.title}</h4>
                                                    <p>{(proj.tags || []).join(', ')}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingProject(proj)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteProject(proj.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
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
                                                <input type="text" value={editingProject.title} onChange={e => setEditingProject({ ...editingProject, title: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.projectDescLabel}</label>
                                                <textarea rows="4" value={editingProject.description} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.categoriesLabel}</label>
                                                <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                    {['web', 'database'].map(cat => (
                                                        <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                                                            <input type="checkbox" style={{ width: 'auto' }}
                                                                checked={(editingProject.categories || []).includes(cat)}
                                                                onChange={e => {
                                                                    const cats = e.target.checked
                                                                        ? [...editingProject.categories, cat]
                                                                        : editingProject.categories.filter(c => c !== cat);
                                                                    setEditingProject({ ...editingProject, categories: cats });
                                                                }} />
                                                            {cat === 'web' ? ad.catWebLabel : ad.catDatabaseLabel}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.tagsLabel}</label>
                                                <input type="text" value={(editingProject.tags || []).join(', ')} placeholder="React, Node.js, PostgreSQL" onChange={e => setEditingProject({ ...editingProject, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.linksLabel}</label>
                                                <div style={{ display: 'flex', gap: '10px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                    <select style={{ width: '140px' }} value={editingProject.links?.[0]?.type || 'github'} onChange={e => {
                                                        const newLinks = [...(editingProject.links || [])];
                                                        const text = e.target.value === 'demo' ? 'Live Demo' : 'GitHub';
                                                        if (!newLinks[0]) newLinks.push({ type: e.target.value, text, url: '' });
                                                        else { newLinks[0].type = e.target.value; newLinks[0].text = text; }
                                                        setEditingProject({ ...editingProject, links: newLinks });
                                                    }}>
                                                        <option value="github">GitHub</option>
                                                        <option value="demo">Live Demo</option>
                                                        <option value="private">Private</option>
                                                    </select>
                                                    <input type="text" placeholder="https://" value={editingProject.links?.[0]?.url || ''} style={{ direction: 'ltr' }} onChange={e => {
                                                        const newLinks = [...(editingProject.links || [])];
                                                        if (!newLinks[0]) newLinks.push({ type: 'github', text: 'GitHub', url: e.target.value });
                                                        else newLinks[0].url = e.target.value;
                                                        setEditingProject({ ...editingProject, links: newLinks });
                                                    }} />
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

                    {/* ══════════════════════════════════════════════
                        TAB: GOOGLE APPS (personal)
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'googleApps' && !isCompany && (
                        <div>
                            {!editingGas ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.gasListTitle}</h3>
                                        <button className="btn-admin-add" onClick={() => setEditingGas({ title: '', description: '', url: '' })}>{ad.addGasBtn}</button>
                                    </div>
                                    <div className="admin-items-list">
                                        {(portfolioData.googleAppsSystems || []).map(gas => (
                                            <div className="admin-item-row" key={gas.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{gas.title}</h4>
                                                    <p style={{ wordBreak: 'break-all', direction: 'ltr' }}>{gas.url}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingGas(gas)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteGas(gas.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
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
                                                <input type="text" value={editingGas.title} onChange={e => setEditingGas({ ...editingGas, title: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.gasUrlLabel}</label>
                                                <input type="url" value={editingGas.url} onChange={e => setEditingGas({ ...editingGas, url: e.target.value })} style={{ direction: 'ltr' }} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.gasDescLabel}</label>
                                                <textarea rows="4" value={editingGas.description} onChange={e => setEditingGas({ ...editingGas, description: e.target.value })} required />
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

                    {/* ══════════════════════════════════════════════
                        TAB: RESUME (personal)
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'resume' && !isCompany && (
                        <div>
                            {!editingResume ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.resumeTitle}</h3>
                                        <div style={{ display: 'flex', gap: '10px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button className="btn-admin-add" onClick={() => { setResumeItemType('experience'); setEditingResume({ date: '', title: '', org: '', desc: '' }); }}>{ad.addExpBtn}</button>
                                            <button className="btn-admin-add" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }} onClick={() => { setResumeItemType('education'); setEditingResume({ date: '', title: '', org: '', desc: '' }); }}>{ad.addEduBtn}</button>
                                            <button className="btn-admin-add" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }} onClick={() => { setResumeItemType('certificates'); setEditingResume({ date: '', title: '', org: '', url: '' }); }}>{ad.addCertBtn}</button>
                                        </div>
                                    </div>

                                    {['experience', 'education', 'certificates'].map(type => (
                                        <div key={type} style={{ marginBottom: '30px' }}>
                                            <h4 style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', textAlign: isRtl ? 'right' : 'left' }}>
                                                {type === 'experience' ? ad.expSectionHeader : type === 'education' ? ad.eduSectionHeader : ad.certSectionHeader}
                                            </h4>
                                            <div className="admin-items-list">
                                                {((portfolioData.resume || {})[type] || []).map(item => (
                                                    <div className="admin-item-row" key={item.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                        <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                            <h4>{item.title}</h4>
                                                            <p>{item.org} | {item.date}</p>
                                                        </div>
                                                        <div className="admin-item-actions">
                                                            <button className="btn-admin-icon edit" onClick={() => { setResumeItemType(type); setEditingResume(item); }}>
                                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                            </button>
                                                            <button className="btn-admin-icon delete" onClick={() => handleDeleteResumeItem(type, item.id)}>
                                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">
                                        {editingResume.id ? ad.editResumeTitle : (resumeItemType === 'experience' ? ad.addExpTitle : resumeItemType === 'education' ? ad.addEduTitle : ad.addCertTitle)}
                                    </h3>
                                    <form onSubmit={handleSaveResumeItem}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>{ad.dateLabel}</label>
                                                <input type="text" value={editingResume.date} onChange={e => setEditingResume({ ...editingResume, date: e.target.value })} placeholder="2024 - 2025" required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.titleLabel}</label>
                                                <input type="text" value={editingResume.title} onChange={e => setEditingResume({ ...editingResume, title: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.orgLabel}</label>
                                                <input type="text" value={editingResume.org} onChange={e => setEditingResume({ ...editingResume, org: e.target.value })} required />
                                            </div>
                                            {resumeItemType === 'certificates' ? (
                                                <div className="admin-form-group full-width">
                                                    <label>{ad.urlLabel}</label>
                                                    <input type="text" value={editingResume.url || ''} onChange={e => setEditingResume({ ...editingResume, url: e.target.value })} placeholder="https://..." style={{ direction: 'ltr' }} />
                                                </div>
                                            ) : (
                                                <div className="admin-form-group full-width">
                                                    <label>{ad.descLabel}</label>
                                                    <textarea rows="4" value={editingResume.desc || ''} onChange={e => setEditingResume({ ...editingResume, desc: e.target.value })} required />
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

                    {/* ══════════════════════════════════════════════
                        TAB: COMPANY — GENERAL INFO
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'companyGeneral' && isCompany && (
                        <div>
                            {/* Logo */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.logoTitle}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '16px', overflow: 'hidden', border: '3px solid var(--accent-primary)', flexShrink: 0, background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {portfolioData.hero.logoBase64 ? (
                                            <img src={portfolioData.hero.logoBase64} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
                                                <rect x="2" y="7" width="20" height="14" rx="2"></rect>
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: isRtl ? 'flex-end' : 'flex-start' }}>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ad.logoHelp}</p>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button type="button" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }} onClick={() => logoInputRef.current?.click()}>
                                                {portfolioData.hero.logoBase64 ? ad.changeLogoBtn : ad.uploadLogoBtn}
                                            </button>
                                            {portfolioData.hero.logoBase64 && (
                                                <button type="button" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 16px', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444' }} onClick={() => handleImageRemove('logoBase64', ad.confirmDeleteLogo)}>
                                                    {ad.deleteLogoBtn}
                                                </button>
                                            )}
                                        </div>
                                        <input ref={logoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageUpload(e, 'logoBase64')} />
                                    </div>
                                </div>
                            </div>

                            {/* Company Hero Info */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.heroTitle}</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group full-width">
                                        <label>{ad.companyNameLabel}</label>
                                        <input type="text" value={portfolioData.hero.name} onChange={e => updateField('hero', 'name', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.companyTaglineArLabel}</label>
                                        <input type="text" value={portfolioData.hero.tagline_ar || ''} onChange={e => updateField('hero', 'tagline_ar', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.companyTaglineEnLabel}</label>
                                        <input type="text" value={portfolioData.hero.tagline_en || ''} onChange={e => updateField('hero', 'tagline_en', e.target.value)} dir="ltr" />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.companyDescArLabel}</label>
                                        <textarea rows="4" value={portfolioData.hero.description_ar || ''} onChange={e => updateField('hero', 'description_ar', e.target.value)} />
                                    </div>
                                    <div className="admin-form-group full-width">
                                        <label>{ad.companyDescEnLabel}</label>
                                        <textarea rows="4" value={portfolioData.hero.description_en || ''} onChange={e => updateField('hero', 'description_en', e.target.value)} dir="ltr" />
                                    </div>
                                </div>
                            </div>

                            {/* Company Contact */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.contactTitle}</h3>
                                <div className="admin-form-grid">
                                    <div className="admin-form-group">
                                        <label>{ad.emailLabel}</label>
                                        <input type="email" value={portfolioData.contact.email} onChange={e => updateField('contact', 'email', e.target.value)} style={{ direction: 'ltr' }} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.linkedinLabel}</label>
                                        <input type="text" value={portfolioData.contact.linkedin} onChange={e => updateField('contact', 'linkedin', e.target.value)} style={{ direction: 'ltr' }} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label>{ad.githubLabel}</label>
                                        <input type="text" value={portfolioData.contact.github} onChange={e => updateField('contact', 'github', e.target.value)} style={{ direction: 'ltr' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Web3Forms */}
                            <div className="admin-section-card">
                                <h3 className="admin-section-title">{ad.web3Title}</h3>
                                <div className="admin-form-group full-width">
                                    <label>{ad.web3KeyLabel}</label>
                                    <input type="text" dir="ltr" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" value={(portfolioData.settings || {}).web3FormsKey || ''} onChange={e => updateWeb3FormsKey(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════
                        TAB: SERVICES (company)
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'services' && isCompany && (
                        <div>
                            {!editingService ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.servicesListTitle}</h3>
                                        <button className="btn-admin-add" onClick={() => setEditingService({ title_ar: '', title_en: '', description_ar: '', description_en: '', icon: 'code' })}>{ad.addServiceBtn}</button>
                                    </div>
                                    <div className="admin-items-list">
                                        {(portfolioData.services || []).map(svc => (
                                            <div className="admin-item-row" key={svc.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{lang === 'ar' ? svc.title_ar : svc.title_en}</h4>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'ar' ? svc.description_ar?.substring(0, 60) : svc.description_en?.substring(0, 60)}...</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingService(svc)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteService(svc.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">{editingService.id ? ad.serviceTitleArLabel : ad.addServiceBtn}</h3>
                                    <form onSubmit={handleSaveService}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>{ad.serviceTitleArLabel}</label>
                                                <input type="text" value={editingService.title_ar} onChange={e => setEditingService({ ...editingService, title_ar: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.serviceTitleEnLabel}</label>
                                                <input type="text" value={editingService.title_en} onChange={e => setEditingService({ ...editingService, title_en: e.target.value })} dir="ltr" required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.serviceDescArLabel}</label>
                                                <textarea rows="3" value={editingService.description_ar} onChange={e => setEditingService({ ...editingService, description_ar: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.serviceDescEnLabel}</label>
                                                <textarea rows="3" value={editingService.description_en} onChange={e => setEditingService({ ...editingService, description_en: e.target.value })} dir="ltr" required />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button type="submit" className="btn btn-primary">{ad.saveChangesBtn}</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingService(null)}>{ad.cancelBtn}</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════
                        TAB: COMPANY PORTFOLIO
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'companyPortfolio' && isCompany && (
                        <div>
                            {!editingPortfolio ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.portfolioListTitle}</h3>
                                        <button className="btn-admin-add" onClick={() => setEditingPortfolio({ title_ar: '', title_en: '', description_ar: '', description_en: '', tags: [], url: '' })}>{ad.addPortfolioBtn}</button>
                                    </div>
                                    <div className="admin-items-list">
                                        {(portfolioData.portfolio || []).map(item => (
                                            <div className="admin-item-row" key={item.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{lang === 'ar' ? item.title_ar : item.title_en}</h4>
                                                    <p>{(item.tags || []).join(', ')}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingPortfolio(item)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeletePortfolio(item.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">{editingPortfolio.id ? ad.portfolioTitleArLabel : ad.addPortfolioBtn}</h3>
                                    <form onSubmit={handleSavePortfolio}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>{ad.portfolioTitleArLabel}</label>
                                                <input type="text" value={editingPortfolio.title_ar} onChange={e => setEditingPortfolio({ ...editingPortfolio, title_ar: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.portfolioTitleEnLabel}</label>
                                                <input type="text" value={editingPortfolio.title_en} onChange={e => setEditingPortfolio({ ...editingPortfolio, title_en: e.target.value })} dir="ltr" required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.portfolioDescArLabel}</label>
                                                <textarea rows="3" value={editingPortfolio.description_ar} onChange={e => setEditingPortfolio({ ...editingPortfolio, description_ar: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.portfolioDescEnLabel}</label>
                                                <textarea rows="3" value={editingPortfolio.description_en} onChange={e => setEditingPortfolio({ ...editingPortfolio, description_en: e.target.value })} dir="ltr" required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.tagsLabel}</label>
                                                <input type="text" value={(editingPortfolio.tags || []).join(', ')} onChange={e => setEditingPortfolio({ ...editingPortfolio, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.portfolioUrlLabel}</label>
                                                <input type="text" value={editingPortfolio.url} onChange={e => setEditingPortfolio({ ...editingPortfolio, url: e.target.value })} style={{ direction: 'ltr' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button type="submit" className="btn btn-primary">{ad.saveChangesBtn}</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingPortfolio(null)}>{ad.cancelBtn}</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ══════════════════════════════════════════════
                        TAB: COMPANY PORTFOLIO SYSTEMS
                    ══════════════════════════════════════════════ */}
                    {activeTab === 'companySystems' && isCompany && (
                        <div>
                            {!editingCompanySys ? (
                                <div className="admin-section-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                        <h3 style={{ margin: 0, fontWeight: 600 }}>{ad.companySysListTitle}</h3>
                                        <button className="btn-admin-add" onClick={() => setEditingCompanySys({ title: '', title_en: '', description: '', description_en: '', url: '' })}>{ad.addCompanySysBtn}</button>
                                    </div>
                                    <div className="admin-items-list">
                                        {(portfolioData.googleAppsSystems || []).map(sys => (
                                            <div className="admin-item-row" key={sys.id} style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                                <div className="admin-item-info" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                                    <h4>{lang === 'ar' ? (sys.title || sys.title_en) : (sys.title_en || sys.title)}</h4>
                                                    <p style={{ wordBreak: 'break-all', direction: 'ltr' }}>{sys.url}</p>
                                                </div>
                                                <div className="admin-item-actions">
                                                    <button className="btn-admin-icon edit" onClick={() => setEditingCompanySys(sys)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                    </button>
                                                    <button className="btn-admin-icon delete" onClick={() => handleDeleteCompanySys(sys.id)}>
                                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="admin-section-card">
                                    <h3 className="admin-section-title">{editingCompanySys.id ? ad.editCompanySysTitle : ad.addCompanySysBtn}</h3>
                                    <form onSubmit={handleSaveCompanySys}>
                                        <div className="admin-form-grid">
                                            <div className="admin-form-group">
                                                <label>{ad.companySysTitleArLabel}</label>
                                                <input type="text" value={editingCompanySys.title || ''} onChange={e => setEditingCompanySys({ ...editingCompanySys, title: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label>{ad.companySysTitleEnLabel}</label>
                                                <input type="text" value={editingCompanySys.title_en || ''} onChange={e => setEditingCompanySys({ ...editingCompanySys, title_en: e.target.value })} dir="ltr" required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.companySysUrlLabel}</label>
                                                <input type="url" value={editingCompanySys.url || ''} onChange={e => setEditingCompanySys({ ...editingCompanySys, url: e.target.value })} style={{ direction: 'ltr' }} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.companySysDescArLabel}</label>
                                                <textarea rows="3" value={editingCompanySys.description || ''} onChange={e => setEditingCompanySys({ ...editingCompanySys, description: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group full-width">
                                                <label>{ad.companySysDescEnLabel}</label>
                                                <textarea rows="3" value={editingCompanySys.description_en || ''} onChange={e => setEditingCompanySys({ ...editingCompanySys, description_en: e.target.value })} dir="ltr" required />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                                            <button type="submit" className="btn btn-primary">{ad.saveChangesBtn}</button>
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingCompanySys(null)}>{ad.cancelBtn}</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            {/* ══ EXPORT MODAL ══════════════════════════════════════ */}
            {showExportModal && (
                <div className="admin-modal-backdrop" onClick={() => setShowExportModal(false)}>
                    <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <h3>{ad.exportJsonTitle}</h3>
                            <button className="theme-toggle" onClick={() => setShowExportModal(false)} style={{ border: 'none', background: 'none' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="admin-modal-body" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{ad.exportHelp}</p>
                            <textarea readOnly className="admin-json-code" value={`export const initialAppData = ${JSON.stringify(appData, null, 4)};`} onClick={e => e.target.select()} style={{ direction: 'ltr' }} />
                        </div>
                        <div className="admin-modal-footer" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <button className="btn btn-primary" onClick={handleCopyJson}>{ad.copyClipboardBtn}</button>
                            <button className="btn btn-secondary" onClick={() => setShowExportModal(false)}>{ad.cancelBtn}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ IMPORT MODAL ══════════════════════════════════════ */}
            {showImportModal && (
                <div className="admin-modal-backdrop" onClick={() => setShowImportModal(false)}>
                    <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header" style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                            <h3>{ad.importJsonTitle}</h3>
                            <button className="theme-toggle" onClick={() => setShowImportModal(false)} style={{ border: 'none', background: 'none' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <form onSubmit={handleImportJson}>
                            <div className="admin-modal-body" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{ad.importHelp}</p>
                                <textarea className="admin-json-code" placeholder='{ "activeProfile": "personal", "profiles": { ... } }' value={importJsonText} onChange={e => setImportJsonText(e.target.value)} required style={{ direction: 'ltr' }} />
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
