// ============================================================
// Bilingual Dictionary (Arabic & English)
// Covers: Personal portfolio + Tech Titans company site
// ============================================================
export const translations = {
    ar: {
        nav: {
            home: 'الرئيسية',
            projects: 'المشاريع العامة',
            googleApps: 'أنظمة Google Apps',
            skills: 'المهارات',
            resume: 'السيرة الذاتية',
            contact: 'اتصل بي',
            // Company nav
            services: 'الخدمات',
            portfolio: 'أعمالنا',
            systems: 'أنظمة البرمجيات',
        },
        hero: {
            tagline: 'مرحباً بك، أنا',
            cta_projects: 'المشاريع العامة',
            cta_google: 'أنظمة Google Apps',
            cta_contact: 'اتصل بي'
        },
        projects: {
            title: 'المشاريع البرمجية العامة',
            subtitle: 'معرض يضم المشاريع البرمجية وقواعد البيانات باستخدام أحدث أطر العمل.',
            all: 'جميع المشاريع',
            web: 'تطبيقات الويب',
            database: 'قواعد البيانات',
            private: 'مشروع خاص'
        },
        googleApps: {
            title: 'أنظمة Google Apps Automation',
            subtitle: 'مجموعة من الأنظمة المؤتمتة ولوحات التحكم المصممة على بيئة Google Workspace & Apps Script.',
            select: 'اختر النظام البرمجي للعرض',
            open: 'فتح النظام بملء الشاشة',
            copy: 'نسخ رابط النظام المباشر',
            tags: ['Google Apps Script', 'Web App Exec', 'Cloud Automations'],
            disclaimer: 'تنبيه: إذا واجهت شاشة بيضاء بسبب سياسة حماية الإطارات من Google، اضغط على زر "فتح النظام بملء الشاشة".'
        },
        skills: {
            title: 'المهارات والخبرات التقنية',
            subtitle: 'المهارات البرمجية في تطوير الواجهات الأمامية والأنظمة الخلفية وقواعد البيانات.',
            tools_title: 'منهجيات العمل وأدوات التطوير'
        },
        resume: {
            title: 'السيرة الذاتية / المسيرة المهنية',
            subtitle: 'ملخص للخبرات المهنية، والتعليم الأكاديمي، والشهادات المعتمدة.',
            experience: 'الخبرات المهنية',
            education: 'التعليم الأكاديمي',
            certificates: 'الشهادات المعتمدة',
            download: 'تحميل السيرة الذاتية (PDF)',
            view_cert: 'التحقق من الشهادة'
        },
        contact: {
            title: 'تواصل معي',
            subtitle: 'دعنا نناقش فرص التعاون، المشاريع الجديدة، أو تطوير حلول الأتمتة البرمجية.',
            connect: 'تواصل مع زياد',
            connect_desc: 'لا تتردد في الاتصال بي مباشرة عبر البريد الإلكتروني أو لينكد إن أو إرسال رسالتك عبر النموذج. سأرد عليك خلال 24 ساعة.',
            email_label: 'البريد الإلكتروني المباشر',
            linkedin_label: 'لينكد إن (LinkedIn)',
            github_label: 'حساب جيت هاب (GitHub)',
            name_label: 'الاسم الكريم',
            name_placeholder: 'أدخل اسمك الكامل',
            email_label2: 'عنوان البريد الإلكتروني',
            phone_label: 'رقم الهاتف',
            phone_placeholder: 'أدخل رقم الهاتف (مثال: 01xxxxxxxxx)',
            message_label: 'تفاصيل الرسالة',
            message_placeholder: 'مرحباً زياد، أود التعاون معك في مشروع...',
            send: 'إرسال الرسالة',
            success: 'تم إرسال رسالتك بنجاح! شكراً لك.',
            error: 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.',
            err_name: 'يرجى إدخال اسمك الكريم',
            err_email: 'يرجى إدخال بريد إلكتروني صحيح',
            err_phone: 'يرجى إدخال رقم هاتف صحيح',
            err_message: 'يرجى كتابة تفاصيل الرسالة'
        },
        footer: {
            desc: 'تطوير وبناء الأنظمة الرقمية وقواعد البيانات المتكاملة والحلول السحابية وأتمتة الأعمال باستخدام Google Apps Script.',
            links: 'روابط سريعة',
            rights: 'جميع الحقوق محفوظة.',
            built: 'صنع بحب باستخدام React & Vite',
            admin: 'لوحة التحكم'
        },
        // Company-specific translations
        company: {
            hero_tagline: 'نبني المستقبل الرقمي',
            hero_cta_services: 'استعرض خدماتنا',
            hero_cta_portfolio: 'أعمالنا',
            hero_cta_contact: 'تواصل معنا',
            services_title: 'خدماتنا',
            services_subtitle: 'نقدم حلولاً برمجية متكاملة تلبي احتياجات الشركات والأعمال.',
            portfolio_title: 'أعمالنا ومشاريعنا',
            portfolio_subtitle: 'نماذج من المشاريع التي نفذناها لعملائنا في مختلف القطاعات.',
            systems_title: 'أنظمة الويب والبرمجيات',
            systems_subtitle: 'أنظمة ولوحات تحكم حية مبنية على Google Workspace وتطبيقات الويب المتكاملة يمكنك تجربتها مباشرة.',
            systems_select: 'اختر النظام للعرض',
            systems_open: 'فتح النظام بملء الشاشة',
            systems_copy: 'نسخ رابط النظام',
            systems_tags: ['Google Apps Script', 'Web Systems', 'Cloud Solutions'],
            systems_disclaimer: 'تنبيه: إذا ظهرت شاشة بيضاء بسبب سياسة Google، اضغط "فتح النظام بملء الشاشة".',
            contact_title: 'تواصل مع Tech Titans',
            contact_subtitle: 'هل لديك مشروع في ذهنك؟ تحدث إلينا وسنساعدك على تحويل فكرتك إلى واقع.',
            connect: 'تواصل مع الفريق',
            view_details: 'عرض التفاصيل',
            learn_more: 'اعرف المزيد',
        }
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            googleApps: 'Google Apps',
            skills: 'Skills',
            resume: 'Resume',
            contact: 'Contact',
            // Company nav
            services: 'Services',
            portfolio: 'Portfolio',
            systems: 'Systems',
        },
        hero: {
            tagline: 'Hi, I am',
            cta_projects: 'View Projects',
            cta_google: 'Google Apps Systems',
            cta_contact: 'Get In Touch'
        },
        projects: {
            title: 'Software Projects',
            subtitle: 'A showcase of web applications and database systems built with modern frameworks.',
            all: 'All Projects',
            web: 'Web Applications',
            database: 'Database Systems',
            private: 'Private Project'
        },
        googleApps: {
            title: 'Google Apps Automation Systems',
            subtitle: 'A collection of automated systems and dashboards built on Google Workspace & Apps Script.',
            select: 'Select a system to preview',
            open: 'Open System Full Screen',
            copy: 'Copy Direct URL',
            tags: ['Google Apps Script', 'Web App Exec', 'Cloud Automations'],
            disclaimer: 'Note: If you see a blank screen due to Google iframe restrictions, click "Open System Full Screen" button.'
        },
        skills: {
            title: 'Technical Skills & Expertise',
            subtitle: 'Proficiencies in frontend development, backend systems, and database engineering.',
            tools_title: 'Methodologies & Dev Tools'
        },
        resume: {
            title: 'Resume / Career Journey',
            subtitle: 'Summary of professional experience, academic education, and validated certifications.',
            experience: 'Professional Experience',
            education: 'Academic Education',
            certificates: 'Certificates & Credentials',
            download: 'Download CV (PDF)',
            view_cert: 'Verify Certificate'
        },
        contact: {
            title: 'Get In Touch',
            subtitle: "Let's discuss collaboration opportunities, new projects, or innovative automation solutions.",
            connect: 'Connect with Zeyad',
            connect_desc: "Feel free to reach out via direct email, LinkedIn, or send a message using the form. I'm typically responsive within 24 hours.",
            email_label: 'Direct Email',
            linkedin_label: 'LinkedIn',
            github_label: 'GitHub Profile',
            name_label: 'Your Name',
            name_placeholder: 'Enter your full name',
            email_label2: 'Email Address',
            phone_label: 'Phone Number',
            phone_placeholder: 'Enter your phone number (e.g. +201xxxxxxxxx)',
            message_label: 'Message',
            message_placeholder: "Hi Zeyad, I'd like to collaborate on...",
            send: 'Send Message',
            success: 'Your message was sent successfully! Thank you.',
            error: 'An error occurred. Please try again.',
            err_name: 'Please enter your name',
            err_email: 'Please enter a valid email address',
            err_phone: 'Please enter a valid phone number',
            err_message: 'Please write a message'
        },
        footer: {
            desc: 'Building integrated digital systems, databases, cloud solutions, and business automation using Google Apps Script.',
            links: 'Quick Links',
            rights: 'All Rights Reserved.',
            built: 'Built with love using React & Vite',
            admin: 'Admin Panel'
        },
        // Company-specific translations
        company: {
            hero_tagline: 'We Build the Digital Future',
            hero_cta_services: 'Our Services',
            hero_cta_portfolio: 'Our Work',
            hero_cta_contact: 'Get In Touch',
            services_title: 'Our Services',
            services_subtitle: 'We deliver end-to-end software solutions tailored to every business need.',
            portfolio_title: 'Our Work & Projects',
            portfolio_subtitle: 'A selection of projects we have delivered for clients across various industries.',
            systems_title: 'Web & Software Systems',
            systems_subtitle: 'Live systems and dashboards built on Google Workspace and integrated web apps — try them directly.',
            systems_select: 'Select a system to preview',
            systems_open: 'Open System Full Screen',
            systems_copy: 'Copy System URL',
            systems_tags: ['Google Apps Script', 'Web Systems', 'Cloud Solutions'],
            systems_disclaimer: 'Note: If you see a blank screen due to Google iframe restrictions, click "Open System Full Screen".',
            contact_title: 'Contact Tech Titans',
            contact_subtitle: "Have a project in mind? Talk to us and we'll help you turn your idea into reality.",
            connect: 'Connect With Our Team',
            view_details: 'View Details',
            learn_more: 'Learn More',
        }
    }
};

// ============================================================
// Section visibility defaults per profile type
// ============================================================
const defaultPersonalVisibility = {
    hero: true,
    projects: true,
    googleApps: true,
    skills: true,
    resume: true,
    contact: true
};

const defaultCompanyVisibility = {
    hero: true,
    services: true,
    portfolio: true,
    systems: true,
    contact: true
};

// ============================================================
// Unified App Data — Single Source of Truth
// ============================================================
export const initialAppData = {
    // Which profile is currently active
    activeProfile: 'personal',

    profiles: {
        // --------------------------------------------------------
        // Profile 1: Personal Developer Portfolio (Zeyad Ahmed)
        // --------------------------------------------------------
        personal: {
            meta: {
                id: 'personal',
                type: 'personal',
                label_ar: 'ملفي الشخصي',
                label_en: 'My Portfolio'
            },
            sectionVisibility: { ...defaultPersonalVisibility },
            hero: {
                tagline: 'مرحباً بك، أنا',
                name: 'Zeyad Ahmed',
                title: 'Full-Stack Developer & Google Apps Script Expert',
                description: 'أقوم بتصميم وتطوير أنظمة الويب المتكاملة، وتطوير قواعد البيانات المتقدمة، وبناء حلول الأتمتة المبتكرة باستخدام بيئة Google Apps Script. أمتلك خبرة واسعة في التقنيات الحديثة وقدرة على دمج الأنظمة البرمجية لتقديم واجهات سريعة وحلول خلفية آمنة.',
                description_en: 'I design and develop integrated web applications, build scalable database solutions, and create business automation systems using Google Apps Script. I have hands-on experience with modern web technologies, including HTML, CSS, JavaScript, PHP, Node.js, and Google Workspace. I focus on developing secure backend systems, responsive user interfaces, and workflow automation that improve business efficiency and simplify daily operations.',
                resumeUrl: '#',
                avatarBase64: null
            },
            settings: {
                web3FormsKey: ''
            },
            skills: [
                {
                    category: 'Frontend Development',
                    items: [
                        { name: 'HTML5 / CSS3 Layouts', level: 95 },
                        { name: 'JavaScript (ES6+) / React', level: 92 },
                        { name: 'Next.js (App Router)', level: 88 },
                        { name: 'Responsive UI & Bootstrap', level: 90 }
                    ]
                },
                {
                    category: 'Backend Development',
                    items: [
                        { name: 'PHP & Laravel Framework', level: 93 },
                        { name: 'Node.js & Express', level: 88 },
                        { name: 'Python Automation & Scripting', level: 85 },
                        { name: 'Clerk Authentication', level: 87 }
                    ]
                },
                {
                    category: 'Database Systems',
                    items: [
                        { name: 'MySQL & PostgreSQL', level: 92 },
                        { name: 'Prisma ORM', level: 86 },
                        { name: 'Oracle SQL & PL/SQL', level: 85 },
                        { name: 'MongoDB (NoSQL)', level: 80 },
                        { name: 'Supabase (BaaS)', level: 90 }
                    ]
                }
            ],
            googleAppsSystems: [
                {
                    id: 'gas-1',
                    title: 'نظام إدارة وأتمتة الأعمال الذكي',
                    description: 'نظام متكامل مبني بالكامل على Google Apps Script يقوم بربط جداول البيانات والتقارير وإرسال رسائل بريد إلكتروني وتنبيهات مؤتمتة وإصدار فواتير PDF وتتبع المبيعات والمهام في الوقت الفعلي مع واجهة مستخدم تفاعلية متجاوبة.',
                    url: 'https://script.google.com/macros/s/AKfycbyH2dlAjFTuBP_wheM6SglaeqWs1fjPqD0OtcczWYtaaUmAcW2tJg2kni4UgY9sEnTdxw/exec'
                },
                {
                    id: 'gas-2',
                    title: 'نظام تتبع وإدارة سير العمل والمهام المشتركة',
                    description: 'لوحة تحكم برمجية تفاعلية لعرض العمليات وتتبع إنجاز المهام للفرق والمشاريع. يتصل بقواعد البيانات الداخلية وجداول جوجل مع تفعيل التنبيهات المباشرة وتقارير الأداء الآلية للمستخدمين والمشرفين.',
                    url: 'https://script.google.com/macros/s/AKfycby8zvbTvTloUoDmhWYUTPgexnnnbgYYwtRYSEUy75zQstnoJt7dhrDgpY3q91NVsr--/exec'
                }
            ],
            projects: [
                {
                    id: 1,
                    title: 'Code Zone — منصة المطورين والمبرمجين',
                    description: 'منصة تقنية متكاملة مصممة خصيصاً للمبرمجين والمطورين تُمكّنهم من مشاركة مشاريعهم، التواصل مع بعضهم، وعرض مهاراتهم البرمجية في بيئة احترافية. تم بناؤها باستخدام Next.js لأداء عالي وSEO مثالي، وPrisma ORM للتعامل مع قاعدة بيانات PostgreSQL بكفاءة، وClerk لنظام مصادقة آمن ومتكامل يدعم الدخول بحسابات GitHub وGoogle.',
                    description_en: 'A full-featured developer platform built exclusively for programmers and developers to share projects, connect with each other, and showcase their coding skills in a professional environment. Built with Next.js for high performance and optimal SEO, Prisma ORM for efficient PostgreSQL database interactions, and Clerk for a secure authentication system supporting GitHub and Google sign-in.',
                    categories: ['web', 'database'],
                    tags: ['Next.js', 'Prisma', 'Clerk', 'PostgreSQL', 'TypeScript'],
                    image: '/projects/codezone.png',
                    links: [
                        { type: 'demo', text: 'Live Demo', url: 'https://code-zone-opal.vercel.app/' },
                        { type: 'github', text: 'GitHub', url: '#' }
                    ]
                },
                {
                    id: 2,
                    title: 'منصة التجارة الإلكترونية المتكاملة',
                    description: 'تطبيق ويب متكامل لمتجر إلكتروني حديث يشتمل على لوحة تحكم كاملة للمشرفين، ونظام سلة تسوق وإدارة المدفوعات، وإصدار الفواتير التلقائية.',
                    description_en: 'A full-stack e-commerce web application featuring a complete admin dashboard, shopping cart, payment management, and automated invoicing built with Laravel and MySQL.',
                    categories: ['web', 'database'],
                    tags: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
                    image: '/projects/ecommerce.png',
                    links: [{ type: 'github', text: 'GitHub', url: '#' }]
                },
                {
                    id: 3,
                    title: 'نظام إدارة الموارد واللوجستيات',
                    description: 'لوحة تحكم تفاعلية لرصد مستويات المخزون وحركة الشحنات مع ربطها بخدمات Supabase للمصادقة وتدفق البيانات الفوري.',
                    description_en: 'An interactive dashboard for real-time inventory monitoring and shipment tracking, connected to Supabase for authentication and live data streaming.',
                    categories: ['web', 'database'],
                    tags: ['Node.js', 'Express', 'PostgreSQL', 'Supabase'],
                    image: '/projects/logistics.png',
                    links: [{ type: 'github', text: 'GitHub', url: '#' }]
                },
                {
                    id: 4,
                    title: 'أداة نقل وتحليل البيانات الضخمة',
                    description: 'برنامج أتمتة مكتوب بلغة Python يقوم بسحب وتنظيف البيانات وتصديرها من قواعد بيانات Oracle SQL إلى قواعد بيانات PostgreSQL الحديثة.',
                    description_en: 'A Python automation tool that extracts, cleans, and migrates data from Oracle SQL databases to modern PostgreSQL environments with automated data integrity reports.',
                    categories: ['database'],
                    tags: ['Python', 'Oracle SQL', 'PostgreSQL', 'Data Migration'],
                    image: '/projects/migration.png',
                    links: [{ type: 'private', text: 'Private Project', tooltip: 'Proprietary project for corporate clients' }]
                },
                {
                    id: 5,
                    title: 'تطبيق إدارة العيادات والمواعيد الطبي',
                    description: 'تطبيق ويب متقدم لتسجيل المرضى وحجز المواعيد ومتابعة ملفاتهم الطبية مع تخزين آمن وسريع للسجلات مبني باستخدام React وMongoDB.',
                    description_en: 'An advanced web app for patient registration, appointment booking, and medical record tracking with secure storage built using React and MongoDB.',
                    categories: ['web', 'database'],
                    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
                    image: '/projects/clinic.png',
                    links: [{ type: 'github', text: 'GitHub', url: '#' }]
                }
            ],
            resume: {
                experience: [
                    {
                        id: 'exp-1',
                        date: '2025 - الحاضر',
                        title: 'مطور برمجيات مستقل (Full-Stack Freelancer)',
                        org: 'العمل الحر والتعاقدات الخاصة',
                        desc: 'تطوير وبناء تطبيقات الويب المتكاملة، وتصميم أنظمة أتمتة متقدمة للشركات باستخدام Google Apps Script، وتدشين وتحديث قواعد البيانات وتحسين أدائها.'
                    },
                    {
                        id: 'exp-2',
                        date: '2024 (تدريب صيفي)',
                        title: 'مطور تطبيقات ويب متدرب',
                        org: 'شركة الحلول التقنية المتقدمة WebTech',
                        desc: 'المشاركة في تطوير لوحات التحكم وإدارة المخازن باستخدام Laravel وNode.js، مع تصميم جداول قواعد البيانات في PostgreSQL وMySQL.'
                    }
                ],
                education: [
                    {
                        id: 'edu-1',
                        date: '2021 - 2025',
                        title: 'بكالوريوس علوم الحاسب وهندسة البرمجيات',
                        org: 'كلية الحاسبات والمعلومات',
                        desc: 'التركيز على هندسة البرمجيات، تصميم نظم قواعد البيانات العلاقية، وهياكل البيانات والخوارزميات، وتطوير الويب المتكامل.'
                    },
                    {
                        id: 'edu-2',
                        date: '2025',
                        title: 'شهادة مصادقة في إدارة قواعد البيانات SQL',
                        org: 'معتمدة من المؤسسات التقنية الدولية',
                        desc: 'إتقان كتابة الاستعلامات المعقدة، وتحسين أداء فهارس الجداول، وبرمجة الإجراءات المخزنة والمحفزات.'
                    }
                ],
                certificates: [
                    {
                        id: 'cert-1',
                        date: '2025',
                        title: 'شهادة أتمتة الأعمال المتقدمة - Apps Script',
                        org: 'مؤسسة تطوير Google Apps',
                        url: 'https://script.google.com'
                    },
                    {
                        id: 'cert-2',
                        date: '2024',
                        title: 'تطوير الويب المتكامل (Full-Stack React & Node)',
                        org: 'أكاديمية البرمجة العالمية',
                        url: 'https://github.com'
                    }
                ],
                cvPdfBase64: null
            },
            contact: {
                email: 'zeyadahmedsamier@gmail.com',
                linkedin: 'https://www.linkedin.com/in/zeyad-ahmed-samir',
                github: 'https://github.com/ZeyadAhmed-GRZ11'
            }
        },

        // --------------------------------------------------------
        // Profile 2: Tech Titans — Software House Company Site
        // --------------------------------------------------------
        company: {
            meta: {
                id: 'company',
                type: 'company',
                label_ar: 'Tech Titans',
                label_en: 'Tech Titans'
            },
            sectionVisibility: { ...defaultCompanyVisibility },
            hero: {
                name: 'Tech Titans',
                tagline_ar: 'نبني المستقبل الرقمي',
                tagline_en: 'We Build the Digital Future',
                description_ar: 'شركة تقنية متخصصة في تطوير البرمجيات المؤسسية، وبناء المنصات الرقمية، وأتمتة العمليات التجارية. نقدم حلولاً متكاملة للشركات والمؤسسات الراغبة في التحول الرقمي باستخدام أحدث التقنيات والأطر البرمجية.',
                description_en: 'A technology company specializing in enterprise software development, digital platform engineering, and business process automation. We deliver end-to-end solutions for organizations looking to accelerate their digital transformation using cutting-edge technologies.',
                logoBase64: null
            },
            settings: {
                web3FormsKey: ''
            },
            services: [
                {
                    id: 'svc-1',
                    icon: 'code',
                    title_ar: 'تطوير تطبيقات الويب',
                    title_en: 'Web Application Development',
                    description_ar: 'بناء تطبيقات ويب متكاملة وعالية الأداء باستخدام React، Next.js، Node.js، وLaravel.',
                    description_en: 'Building high-performance, full-stack web applications using React, Next.js, Node.js, and Laravel.'
                },
                {
                    id: 'svc-2',
                    icon: 'database',
                    title_ar: 'هندسة قواعد البيانات',
                    title_en: 'Database Engineering',
                    description_ar: 'تصميم وبناء قواعد البيانات العلاقية والـ NoSQL وتحسين أدائها وتكاملها مع الأنظمة المختلفة.',
                    description_en: 'Designing and building relational and NoSQL databases, optimizing performance and integrating them with diverse systems.'
                },
                {
                    id: 'svc-3',
                    icon: 'automation',
                    title_ar: 'أتمتة الأعمال والعمليات',
                    title_en: 'Business Process Automation',
                    description_ar: 'تطوير أنظمة أتمتة ذكية باستخدام Google Apps Script وPython وAPIs لتحسين كفاءة العمليات.',
                    description_en: 'Developing smart automation systems using Google Apps Script, Python, and APIs to boost operational efficiency.'
                },
                {
                    id: 'svc-4',
                    icon: 'cloud',
                    title_ar: 'الحلول السحابية والتكامل',
                    title_en: 'Cloud Solutions & Integration',
                    description_ar: 'نشر وإدارة التطبيقات على البنية التحتية السحابية مع ضمان التكامل السلس بين الأنظمة المختلفة.',
                    description_en: 'Deploying and managing applications on cloud infrastructure with seamless integration between systems.'
                }
            ],
            portfolio: [
                {
                    id: 'port-1',
                    title_ar: 'منصة إدارة الأعمال الذكية',
                    title_en: 'Smart Business Management Platform',
                    description_ar: 'نظام متكامل لإدارة العمليات والتقارير والفواتير يخدم أكثر من 50 شركة.',
                    description_en: 'An integrated system for managing operations, reports, and invoicing serving 50+ businesses.',
                    tags: ['React', 'Node.js', 'PostgreSQL', 'Google Apps Script'],
                    image: '/projects/company_smart_biz.png',
                    url: '#'
                },
                {
                    id: 'port-2',
                    title_ar: 'منظومة الرعاية الصحية الرقمية',
                    title_en: 'Digital Healthcare Platform',
                    description_ar: 'تطبيق ويب لإدارة العيادات والمواعيد والسجلات الطبية مع أمان بيانات عالي المستوى.',
                    description_en: 'A web app for managing clinics, appointments, and medical records with enterprise-grade data security.',
                    tags: ['Next.js', 'Prisma', 'Supabase', 'TypeScript'],
                    image: '/projects/clinic.png',
                    url: '#'
                },
                {
                    id: 'port-3',
                    title_ar: 'نظام إدارة سلسلة التوريد',
                    title_en: 'Supply Chain Management System',
                    description_ar: 'حل رقمي متكامل لتتبع المخزون والشحنات وإدارة الموردين في الوقت الفعلي.',
                    description_en: 'A comprehensive digital solution for real-time inventory tracking, shipment management, and vendor relations.',
                    tags: ['Laravel', 'MySQL', 'React', 'REST APIs'],
                    image: '/projects/logistics.png',
                    url: '#'
                }
            ],
            googleAppsSystems: [
                {
                    id: 'csys-1',
                    title: 'نظام إدارة وأتمتة الأعمال الذكي',
                    title_en: 'Smart Business Management System',
                    description: 'نظام متكامل مبني على Google Apps Script يقوم بربط جداول البيانات والتقارير وإرسال بريد إلكتروني مؤتمت وإصدار فواتير PDF وتتبع المبيعات في الوقت الفعلي مع واجهة تفاعلية.',
                    description_en: 'An integrated system built on Google Apps Script connecting spreadsheets, automated email reports, PDF invoicing, and real-time sales tracking with an interactive dashboard.',
                    url: 'https://script.google.com/macros/s/AKfycbyH2dlAjFTuBP_wheM6SglaeqWs1fjPqD0OtcczWYtaaUmAcW2tJg2kni4UgY9sEnTdxw/exec'
                },
                {
                    id: 'csys-2',
                    title: 'نظام تتبع وإدارة سير العمل والمهام',
                    title_en: 'Workflow & Task Management System',
                    description: 'لوحة تحكم تفاعلية لعرض العمليات وتتبع إنجاز المهام للفرق والمشاريع مع تنبيهات مباشرة وتقارير أداء آلية.',
                    description_en: 'An interactive dashboard for tracking team operations and project task completion with live alerts and automated performance reports.',
                    url: 'https://script.google.com/macros/s/AKfycby8zvbTvTloUoDmhWYUTPgexnnnbgYYwtRYSEUy75zQstnoJt7dhrDgpY3q91NVsr--/exec'
                }
            ],
            contact: {
                email: 'hello@techtitans.dev',
                linkedin: 'https://www.linkedin.com/company/tech-titans',
                github: 'https://github.com/TechTitans',
                website: 'https://techtitans.dev'
            }
        }
    }
};

// ============================================================
// Legacy alias — keeps backward compatibility if needed
// ============================================================
export const initialPortfolioData = initialAppData.profiles.personal;
