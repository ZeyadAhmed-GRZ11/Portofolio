export const initialPortfolioData = {
    hero: {
        tagline: "مرحباً بك، أنا",
        name: "Zeyad Ahmed",
        title: "Full-Stack Developer & Google Apps Script Expert",
        description: "أقوم بتصميم وتطوير أنظمة الويب المتكاملة، وتطوير قواعد البيانات المتقدمة، وبناء حلول الأتمتة المبتكرة باستخدام بيئة Google Apps Script. أمتلك خبرة واسعة في التقنيات الحديثة وقدرة على دمج الأنظمة البرمجية لتقديم واجهات سريعة وحلول خلفية آمنة.",
        resumeUrl: "#",
        avatarUrl: "assets/zeyad_portrait.jpg"
    },
    skills: [
        {
            category: "Frontend Development",
            items: [
                { name: "HTML5 / CSS3 Layouts", level: 95 },
                { name: "JavaScript (ES6+) / React", level: 92 },
                { name: "Responsive UI & Bootstrap", level: 90 }
            ]
        },
        {
            category: "Backend Development",
            items: [
                { name: "PHP & Laravel Framework", level: 93 },
                { name: "Node.js & Express", level: 88 },
                { name: "Python Automation & Scripting", level: 85 }
            ]
        },
        {
            category: "Database Systems",
            items: [
                { name: "MySQL & PostgreSQL", level: 92 },
                { name: "Oracle SQL & PL/SQL", level: 85 },
                { name: "MongoDB (NoSQL)", level: 80 },
                { name: "Supabase (Backend-as-a-Service)", level: 90 }
            ]
        }
    ],
    googleAppsSystems: [
        {
            id: "gas-1",
            title: "نظام إدارة وأتمتة الأعمال الذكي",
            description: "نظام متكامل مبني بالكامل على Google Apps Script يقوم بربط جداول البيانات والتقارير وإرسال رسائل بريد إلكتروني وتنبيهات مؤتمتة وإصدار فواتير PDF وتتبع المبيعات والمهام في الوقت الفعلي مع واجهة مستخدم تفاعلية متجاوبة.",
            url: "https://script.google.com/macros/s/AKfycbyH2dlAjFTuBP_wheM6SglaeqWs1fjPqD0OtcczWYtaaUmAcW2tJg2kni4UgY9sEnTdxw/exec"
        },
        {
            id: "gas-2",
            title: "نظام تتبع وإدارة سير العمل والمهام المشتركة",
            description: "لوحة تحكم برمجية تفاعلية لعرض العمليات وتتبع إنجاز المهام للفرق والمشاريع. يتصل بقواعد البيانات الداخلية وجداول جوجل مع تفعيل التنبيهات المباشرة وتقارير الأداء الآلية للمستخدمين والمشرفين.",
            url: "https://script.google.com/macros/s/AKfycby8zvbTvTloUoDmhWYUTPgexnnnbgYYwtRYSEUy75zQstnoJt7dhrDgpY3q91NVsr--/exec"
        }
    ],
    projects: [
        {
            id: 1,
            title: "منصة التجارة الإلكترونية المتكاملة",
            description: "تطبيق ويب متكامل لمتجر إلكتروني حديث يشتمل على لوحة تحكم كاملة للمشرفين، ونظام سلة تسوق وإدارة المدفوعات، وإصدار الفواتير التلقائية. تم بناؤه باستخدام Laravel وقاعدة بيانات MySQL وBootstrap للواجهة الأمامية.",
            categories: ["web", "database"],
            tags: ["PHP", "Laravel", "MySQL", "Bootstrap"],
            links: [
                { type: "demo", text: "العرض الحي", url: "#" },
                { type: "code", text: "الكود المصدري", url: "#" }
            ]
        },
        {
            id: 2,
            title: "نظام إدارة الموارد واللوجستيات",
            description: "لوحة تحكم تفاعلية لرصد مستويات المخزون وحركة الشحنات. يتصل ببيئة خلفية مبنية بـ Node.js وقاعدة بيانات PostgreSQL مع ربطها بخدمات Supabase للمصادقة وتخزين الملفات الحية وتدفق البيانات الفوري.",
            categories: ["web", "database"],
            tags: ["Node.js", "Express", "PostgreSQL", "Supabase"],
            links: [
                { type: "github", text: "GitHub", url: "#" }
            ]
        },
        {
            id: 3,
            title: "أداة نقل وتحليل البيانات الضخمة",
            description: "برنامج أتمتة مكتوب بلغة Python يقوم بسحب وتنظيف البيانات وتصديرها من قواعد بيانات Oracle SQL الكبيرة إلى قواعد بيانات PostgreSQL الحديثة مع إعداد تقارير سلامة البيانات ومطابقتها آلياً.",
            categories: ["database"],
            tags: ["Python", "Oracle SQL", "PostgreSQL", "Data Migration"],
            links: [
                { type: "private", text: "مشروع خاص", tooltip: "Proprietary project for corporate clients" }
            ]
        },
        {
            id: 4,
            title: "تطبيق إدارة العيادات والمواعيد الطبي الذكي",
            description: "تطبيق ويب متقدم لتسجيل المرضى وحجز المواعيد وتنظيم زيارات الأطباء ومتابعة ملفات المرضى الطبية مع تخزين آمن وسريع للملفات وسجلات التاريخ الطبي للمرضى مبني باستخدام React ومستودع MongoDB السحابي.",
            categories: ["web", "database"],
            tags: ["React", "Node.js", "MongoDB", "Express"],
            links: [
                { type: "github", text: "GitHub", url: "#" }
            ]
        }
    ],
    resume: {
        experience: [
            {
                id: "exp-1",
                date: "2025 - الحاضر",
                title: "مطور برمجيات مستقل (Full-Stack Freelancer)",
                org: "العمل الحر والتعاقدات الخاصة",
                desc: "تطوير وبناء تطبيقات الويب المتكاملة، وتصميم أنظمة أتمتة متقدمة للشركات باستخدام Google Apps Script، وتدشين وتحديث قواعد البيانات وتحسين أدائها للشركات المتوسطة والصغيرة."
            },
            {
                id: "exp-2",
                date: "2024 (تدريب صيفي)",
                title: "مطور تطبيقات ويب متدرب",
                org: "شركة الحلول التقنية المتقدمة WebTech",
                desc: "المشاركة في تطوير لوحات التحكم وإدارة المخازن باستخدام بيئة Laravel ونظام Node.js، مع ربط الواجهات البرمجية وتصميم جداول قواعد البيانات في PostgreSQL وMySQL."
            }
        ],
        education: [
            {
                id: "edu-1",
                date: "2021 - 2025",
                title: "بكالوريوس علوم الحاسب وهندسة البرمجيات",
                org: "كلية الحاسبات والمعلومات",
                desc: "التركيز على هندسة البرمجيات، تصميم نظم قواعد البيانات العلاقية، وهياكل البيانات والخوارزميات، وتطوير الويب المتكامل."
            },
            {
                id: "edu-2",
                date: "2025",
                title: "شهادة مصادقة في إدارة قواعد البيانات SQL",
                org: "معتمدة من المؤسسات التقنية الدولية",
                desc: "إتقان كتابة الاستعلامات المعقدة، وتحسين أداء فهارس الجداول، وبرمجة الإجراءات المخزنة (Stored Procedures) والمحفزات (Triggers)."
            }
        ]
    },
    contact: {
        email: "zeyad.ahmed.dev@example.com",
        linkedin: "https://linkedin.com/in/zeyad-ahmed-placeholder",
        github: "https://github.com/zeyad-ahmed-placeholder"
      }
};
