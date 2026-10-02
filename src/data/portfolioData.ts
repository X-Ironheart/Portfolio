export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  category: "IT & Systems" | "Engineering & Web" | "Hardware & Electronics";
  description: string;
  highlights: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "SYSTEMS" | "WEB" | "ENTERPRISE" | "HARDWARE" | "MEDIA";
  year: string;
  subtitle: string;
  description: string;
  architecture: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  metrics: string;
  featured: boolean;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  tag: string;
  skills: {
    name: string;
    level: string;
    description: string;
    context: string;
  }[];
}

export const PORTFOLIO_DATA_EN = {
  personal: {
    name: "Mohamed Taher",
    tagline: "Computer & Systems Engineering Student // Systems & IT Specialist // Freelance Developer",
    headline: "ENGINEERING SYSTEMS, OPTIMIZING LOGIC & CRAFTING TACTILE INTERFACES.",
    subtext:
      "Bridging low-level computational logic at Horus University with high-uptime enterprise IT administration (Odoo ERP & Shopify infrastructure) and high-performance tactile frontend architecture.",
    location: "Damietta, Egypt",
    coordinates: "31.4175° N, 31.8144° E",
    email: "m99.mohamed.99m@gmail.com",
    phone: "+20 1023432386",
    github: "https://github.com/X-Ironheart",
    githubHandle: "X-Ironheart",
    linkedin: "https://linkedin.com/in/mohamed-taher",
    status: "AVAILABLE FOR ROLES / FREELANCE",
    academicStatus: "Horus University CSE — Class of 2030 (Distinction Track)",
  },

  experiences: [
    {
      id: "elhoda-it",
      role: "IT Support & Technical Specialist",
      company: "El-Hoda Computer & IT Services",
      period: "Aug 2025 – Present",
      location: "Damietta, Egypt",
      category: "IT & Systems",
      description:
        "Directing hardware diagnostics, multi-node infrastructure maintenance, and enterprise application synchronization across retail and corporate clients.",
      highlights: [
        "Architected real-time inventory and catalog synchronization pipelines between Odoo ERP and Shopify multi-channel storefronts.",
        "Performed deep-level hardware diagnostics, component-level troubleshooting, workstation rebuilds, and operating system deployments.",
        "Configured secure local network topologies, printer spooling services, and automated offline backup routines ensuring zero data loss.",
        "Trained business operators and retail staff on Odoo POS modules and automated bookkeeping transactions.",
      ],
      technologies: ["Odoo ERP", "Shopify Admin API", "Hardware Architecture", "Network Protocols", "Windows Server", "Data Backup Systems"],
      metrics: [
        { label: "Inventory Sync Accuracy", value: "99.9%" },
        { label: "Hardware MTTR", value: "< 24 Hours" },
        { label: "Active Deployments", value: "30+ Stations" },
      ],
    },
    {
      id: "freelance-eng",
      role: "Full-Stack / Frontend & Media Engineer",
      company: "Freelance & Independent Engineering",
      period: "2024 – Present",
      location: "Remote / Damietta, Egypt",
      category: "Engineering & Web",
      description:
        "Building tailored web applications, algorithmic low-level C utilities, bespoke Shopify storefronts, and cinema-grade post-production video editing.",
      highlights: [
        "Crafted high-speed modern frontend applications with Next.js, TypeScript, and responsive Tailwind CSS adhering to strict performance budgets.",
        "Implemented low-level data structures and memory-safe routines in ANSI C for academic and algorithmic benchmarks.",
        "Engineered custom prompt pipelines and AI integration workflows to accelerate frontend boilerplate construction and content operations.",
        "Supervised professional video post-production workflows in DaVinci Resolve, focusing on node-based color grading and timeline mastering.",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ANSI C", "DaVinci Resolve", "Prompt Engineering"],
      metrics: [
        { label: "Lighthouse Performance", value: "98/100" },
        { label: "C Run-time Efficiency", value: "O(log n)" },
        { label: "Production Renders", value: "4K DCI" },
      ],
    },
    {
      id: "eldaly-electronics",
      role: "Electronics Technician Intern",
      company: "El-Daly Electronics Center",
      period: "2023",
      location: "Damietta, Egypt",
      category: "Hardware & Electronics",
      description:
        "Conducted component-level electronics diagnosis, PCB inspection, and micro-soldering repairs for industrial and consumer electrical systems.",
      highlights: [
        "Executed circuit tracing with digital multimeters and oscilloscopes to locate shorted SMD capacitors and failing voltage regulators.",
        "Mastered precision soldering, hot-air rework techniques, and connector reflow operations under magnification.",
        "Diagnosed switched-mode power supplies (SMPS) and restored legacy circuit boards to functional specifications.",
      ],
      technologies: ["Circuit Diagnostics", "Precision Soldering", "SMD Rework", "Multimeter & Scope", "Schematic Analysis"],
      metrics: [
        { label: "Board Recovery Rate", value: "85%+" },
        { label: "SMD Pitch Soldered", value: "0.5mm" },
        { label: "Inspected Assemblies", value: "120+ Boards" },
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "odoo-shopify-sync",
      title: "Odoo ERP to Shopify Sync Bridge",
      category: "ENTERPRISE",
      year: "2025",
      subtitle: "Automated multi-channel commerce & inventory pipeline",
      description:
        "An enterprise synchronization daemon reconciling real-time stock balances, product variants, and invoice states between Odoo ERP and Shopify stores.",
      architecture: [
        "Webhook listener capturing Shopify order creation events.",
        "Queued transactional worker ensuring atomic stock deduction in Odoo.",
        "Fault-tolerant reconciliation cron checking discrepancies every 15 minutes.",
      ],
      techStack: ["Odoo XML-RPC", "Shopify REST/GraphQL", "Node.js", "TypeScript", "PostgreSQL"],
      githubUrl: "https://github.com/X-Ironheart/odoo-shopify-bridge",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "Sub-second stock propagation & zero order collisions",
      featured: true,
      codeSnippet: {
        filename: "sync_worker.ts",
        language: "typescript",
        code: `async function reconcileStock(sku: string, odooQty: number) {
  const shopifyVariant = await shopify.inventory.get(sku);
  if (shopifyVariant.available !== odooQty) {
    await shopify.inventory.adjust({
      inventoryItemId: shopifyVariant.itemId,
      availableDelta: odooQty - shopifyVariant.available,
    });
    logger.info(\`[SYNC] \${sku} aligned to \${odooQty} units.\`);
  }
}`,
      },
    },
    {
      id: "c-memory-allocator",
      title: "C Custom Memory Allocator & AVL Tree",
      category: "SYSTEMS",
      year: "2024",
      subtitle: "Low-level heap management & self-balancing trees",
      description:
        "A Unix-compatible slab & buddy memory allocator implemented from scratch in pure C99 with visual heap fragmentation analysis and self-balancing AVL trees.",
      architecture: [
        "Direct mmap syscall chunk allocation bypasses standard glibc malloc.",
        "Header-tagged memory blocks with boundary tag coalescence on free.",
        "O(log N) worst-case lookup AVL tree indexing for free block bins.",
      ],
      techStack: ["ANSI C99", "Linux Syscalls", "Valgrind", "GDB", "Makefile"],
      githubUrl: "https://github.com/X-Ironheart/c-systems-allocator",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "Zero heap leaks under 50,000 randomized alloc/free cycles",
      featured: true,
      codeSnippet: {
        filename: "allocator.c",
        language: "c",
        code: `typedef struct block_header {
    size_t size;
    int is_free;
    struct block_header *next;
    struct block_header *prev;
} block_header_t;

void *sys_alloc(size_t size) {
    block_header_t *block = find_best_fit(size);
    if (!block) block = extend_heap(size);
    block->is_free = 0;
    return (void *)(block + 1);
}`,
      },
    },
    {
      id: "tactile-hud-engine",
      title: "Avant-Garde Architectural Web Engine",
      category: "WEB",
      year: "2025",
      subtitle: "Strict monochrome high-performance web portfolio",
      description:
        "A tactile digital portfolio built without colorful RGB noise, utilizing physics-based springs, dynamic crosshair telemetry, and an interactive UNIX CLI terminal.",
      architecture: [
        "Turbopack-accelerated Next.js App Router with server-rendered static geometry.",
        "Synthetic Web Audio API tactile feedback mimicking mechanical switches.",
        "Zero external graphics dependencies with procedural CSS grid & SVG crosshairs.",
      ],
      techStack: ["Next.js", "React 19", "Tailwind CSS v4", "Framer Motion", "TypeScript"],
      githubUrl: "https://github.com/X-Ironheart/portfolio",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "100/100 Lighthouse Performance & <15ms TBT",
      featured: true,
      codeSnippet: {
        filename: "audio_feedback.ts",
        language: "typescript",
        code: `export const playTactileClick = (freq = 800) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};`,
      },
    },
    {
      id: "hardware-probe-cli",
      title: "Hardware Serial & Diagnostic Controller",
      category: "HARDWARE",
      year: "2024",
      subtitle: "Firmware communication & pinout signal analyzer",
      description:
        "A hardware communication monitor that interfaces with microcontrollers via UART/RS-232, logging serial telemetry and pinpointing electrical drift.",
      architecture: [
        "Baud-configurable asynchronous UART receiver thread with ring-buffer.",
        "Interactive CLI visualizing incoming ADC voltage readings in real time.",
        "Automated threshold alert system detecting over-voltage and thermal spikes.",
      ],
      techStack: ["C / C++", "POSIX Serial API", "UART / I2C Protocols", "Python", "Plotext"],
      githubUrl: "https://github.com/X-Ironheart/hardware-probe-cli",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "Tested up to 921600 baud with zero packet dropping",
      featured: false,
    },
    {
      id: "davinci-color-pipeline",
      title: "Cinematic Grade & Color Pipeline",
      category: "MEDIA",
      year: "2024",
      subtitle: "Node-tree color space transforms & film print emulation",
      description:
        "A customized post-production suite in DaVinci Resolve utilizing ACEScc color science and subtractive saturation curves for commercial grading.",
      architecture: [
        "Fixed node-tree hierarchy: Exposure -> White Balance -> CST -> Split Tone -> Grain.",
        "Color gamut mapping tailored for DCI-P3 and Rec.709 broadcast compliance.",
        "Optimized ProRes 4444XQ and DNxHR intermediate export codecs.",
      ],
      techStack: ["DaVinci Resolve Studio", "ACEScc", "Color Management", "Post-Production", "Audio Mastering"],
      githubUrl: "https://github.com/X-Ironheart",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "Broadcast-safe deliverables compliant with EBU R128 audio standards",
      featured: false,
    },
    {
      id: "shopify-custom-storefront",
      title: "Custom High-Conversion Shopify Architecture",
      category: "ENTERPRISE",
      year: "2024",
      subtitle: "Liquid & Storefront API custom liquid engineering",
      description:
        "Bespoke e-commerce theme architecture built for retail clients featuring lightning-fast cart drawers, custom upsell rules, and localized Arabic RTL support.",
      architecture: [
        "Modular section architecture with zero render-blocking jQuery plugins.",
        "Dynamic cart drawer with AJAX upsell logic and predictive search integration.",
        "Full bidirectional RTL (Arabic) and LTR (English) responsive UI support.",
      ],
      techStack: ["Shopify Liquid", "JavaScript", "Tailwind CSS", "Storefront API", "JSON Templates"],
      githubUrl: "https://github.com/X-Ironheart",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "+34% faster page speed compared to off-the-shelf themes",
      featured: false,
    },
  ] as ProjectItem[],

  skillMatrix: [
    {
      title: "Core Systems & Code",
      subtitle: "Low-level computation, algorithmic efficiency, and client architecture",
      tag: "LOW_LEVEL_&_CORE",
      skills: [
        {
          name: "ANSI C (C99/C11)",
          level: "Advanced",
          description: "Pointers, dynamic memory allocation, structs, bitwise manipulation, low-level POSIX syscalls.",
          context: "Used in academic CSE coursework, memory allocators, and hardware driver prototypes.",
        },
        {
          name: "Data Structures & Algorithms",
          level: "Advanced",
          description: "Trees (AVL, BST), Graphs, Hash Tables, Heaps, Dynamic Programming, Big-O optimization.",
          context: "Engineered algorithmic solutions with strict space-time complexity constraints.",
        },
        {
          name: "Modern Frontend (TypeScript/JS)",
          level: "Proficient",
          description: "TypeScript strict mode, React 19, Next.js App Router, ES6+, Web APIs, Async queues.",
          context: "Architected high-performance production interfaces and bespoke client portals.",
        },
        {
          name: "Tailwind CSS & Modern CSS",
          level: "Expert",
          description: "Tailwind v4, CSS Grid, Flexbox, custom design tokens, responsive fluid layouts, micro-animations.",
          context: "Designed strictly monochrome brutalist interfaces and accessible design systems.",
        },
        {
          name: "Git & Version Control",
          level: "Proficient",
          description: "Branching strategies, semantic commits, rebase workflows, GitHub actions CI/CD.",
          context: "Maintains clean, auditable repository histories across personal and collaborative repos.",
        },
      ],
    },
    {
      title: "Enterprise & Platforms",
      subtitle: "ERP workflows, commerce infrastructure, and business systems",
      tag: "INFRASTRUCTURE_&_ERP",
      skills: [
        {
          name: "Odoo ERP",
          level: "Proficient",
          description: "Inventory management, POS configuration, multi-warehouse tracking, sales order automation.",
          context: "Deployed and customized Odoo ERP instances at El-Hoda Computer & IT Services.",
        },
        {
          name: "Shopify Infrastructure",
          level: "Proficient",
          description: "Storefront customization, liquid architecture, inventory webhook feeds, payment gateway setup.",
          context: "Built custom client storefronts and integrated real-time ERP inventory sync bridges.",
        },
        {
          name: "Accounting & Financial Flows",
          level: "Intermediate",
          description: "General ledger fundamentals, invoicing reconciliation, debit/credit journal entries, VAT tracking.",
          context: "Coordinated financial module workflows inside Odoo for enterprise retail operations.",
        },
        {
          name: "System Administration & Networks",
          level: "Proficient",
          description: "Local area networking, static IP routing, hardware repair, print servers, automated backups.",
          context: "Day-to-day operations handling 30+ physical workstations and retail server nodes.",
        },
      ],
    },
    {
      title: "Engineering & Media",
      subtitle: "Physical computing, electronics diagnosis, and post-production",
      tag: "HARDWARE_&_CREATIVE",
      skills: [
        {
          name: "Hardware Diagnostics & Repair",
          level: "Proficient",
          description: "Component-level fault isolation, motherboard power rail diagnosis, thermal management.",
          context: "Extensive diagnostic experience at El-Hoda IT and El-Daly Electronics Center.",
        },
        {
          name: "Electronics & Micro-Soldering",
          level: "Intermediate",
          description: "SMD component rework, flux application, continuity testing, circuit schematic decoding.",
          context: "Trained during hands-on internship at El-Daly Electronics Center.",
        },
        {
          name: "DaVinci Resolve (Color & Edit)",
          level: "Proficient",
          description: "Node-based color grading, ACES color management, primary wheels, curve isolation, audio mastering.",
          context: "Freelance post-production engineering for commercial videos and creative editorial content.",
        },
        {
          name: "Prompt Engineering & Workflows",
          level: "Advanced",
          description: "Structured prompt architectures, reasoning chains, code generation optimization, autonomous agents.",
          context: "Integrated into daily developer workflows to maximize shipping velocity and code quality.",
        },
      ],
    },
    {
      title: "Languages & Communication",
      subtitle: "International technical communication and multilingual proficiency",
      tag: "LINGUISTIC_MATRIX",
      skills: [
        {
          name: "Arabic",
          level: "Native",
          description: "Mother tongue. Eloquent professional and technical Arabic communication.",
          context: "Native speaker; leading teams and conducting client training.",
        },
        {
          name: "English",
          level: "C1 Proficient",
          description: "Fluent technical documentation, conversational fluidity, engineering presentations.",
          context: "Primary language for software development, research papers, and international collaboration.",
        },
        {
          name: "Russian",
          level: "A1 Elementary",
          description: "Basic vocabulary, Cyrillic reading, simple phrases and greeting etiquette.",
          context: "Actively studying linguistic structures for international engineering versatility.",
        },
      ],
    },
  ] as SkillCategory[],

  academic: {
    institution: "Horus University (HUE)",
    degree: "B.Sc. in Computer & Control Systems Engineering (CSE)",
    expectedGraduation: "2030",
    standing: "Distinction / 'Excellent' Track Record",
    leadership: [
      {
        role: "Council Member",
        organization: "Horus University Student Union Council",
        period: "Active",
        description: "Representing engineering student interests, coordinating university initiatives, and liaising between faculty administration and academic departments.",
      },
    ],
    conferences: [
      {
        name: "National Radio Science Conference (NRSC)",
        badge: "CONFERENCE",
        description: "Engaged in specialized lectures and sessions regarding modern wireless telemetry, electromagnetic propagation, and radar antenna systems.",
      },
      {
        name: "Egyptian Universities Forum",
        badge: "SYMPOSIUM",
        description: "Delegated representative participating in nationwide discussions on youth leadership, modern industrial education, and applied engineering.",
      },
      {
        name: "SWAG SolidWorks Meetup & Workshop",
        badge: "WORKSHOP",
        description: "Participated in mechanical and mechatronic CAD design sessions, geometric parameterization, and hardware enclosure fabrication best practices.",
      },
    ],
  },

  marqueeItems: [
    "ANSI C99 / C11",
    "NEXT.JS APP ROUTER",
    "REACT 19",
    "TYPESCRIPT",
    "TAILWIND CSS V4",
    "ODOO ERP",
    "SHOPIFY ARCHITECTURE",
    "DAVINCI RESOLVE",
    "DATA STRUCTURES & ALGORITHMS",
    "HARDWARE DIAGNOSTICS",
    "PCB REWORK & SOLDERING",
    "LINUX POSIX SYSCALLS",
    "HORUS UNIVERSITY CSE [2030]",
    "DAMIETTA, EGYPT",
  ],
};

export const PORTFOLIO_DATA_AR = {
  personal: {
    name: "محمد طاهر",
    tagline: "طالب هندسة الحاسبات ونظم التحكم // أخصائي نظم وتكنولوجيا المعلومات // مطور برمجيات حر",
    headline: "هندسة النظم، تحسين المنطق، وصياغة الواجهات التفاعلية.",
    subtext:
      "الربط بين المنطق الحسابي منخفض المستوى بجامعة حورس والإدارة التقنية المؤسسية عالية الجاهزية (بنية Odoo ERP و Shopify) وهندسة الواجهات الأمامية التفاعلية فائقة الأداء.",
    location: "دمياط، مصر",
    coordinates: "31.4175° N, 31.8144° E",
    email: "m99.mohamed.99m@gmail.com",
    phone: "+20 1023432386",
    github: "https://github.com/X-Ironheart",
    githubHandle: "X-Ironheart",
    linkedin: "https://linkedin.com/in/mohamed-taher",
    status: "متاح للتعاقد والمشاريع المستقلة",
    academicStatus: "هندسة حورس (CSE) — دفعة 2030 (مسار مرتبة الشرف / امتياز)",
  },

  experiences: [
    {
      id: "elhoda-it",
      role: "أخصائي دعم فني ونظم تقنية المعلومات",
      company: "الهدى لخدمات الحاسب الآلي وتقنية المعلومات",
      period: "أغسطس 2025 – حتى الآن",
      location: "دمياط، مصر",
      category: "IT & Systems",
      description:
        "إدارة تشخيص العتاد، صيانة البنى التحتية متعددة العقد، ومزامنة التطبيقات المؤسسية بين عملاء التجزئة والشركات.",
      highlights: [
        "تصميم وبناء مسارات مزامنة فورية للمخزون وكتالوجات المنتجات بين أنظمة Odoo ERP ومتاجر Shopify متعددة القنوات.",
        "إجراء تشخيصات عميقة على مستوى المكونات الإلكترونية، استكشاف الأعطال وإصلاحها، وتجهيز محطات العمل ونشر أنظمة التشغيل.",
        "تهيئة طوبولوجيا الشبكات المحلية الآمنة، خدمات طوابير الطباعة، وإجراءات النسخ الاحتياطي التلقائي لضمان عدم فقدان البيانات.",
        "تدريب مشغلي الأعمال وموظفي التجزئة على وحدات نقاط البيع (Odoo POS) وعمليات الحسابات الآلية.",
      ],
      technologies: ["Odoo ERP", "Shopify Admin API", "بنية العتاد", "بروتوكولات الشبكات", "Windows Server", "أنظمة النسخ الاحتياطي"],
      metrics: [
        { label: "دقة مزامنة المخزون", value: "99.9%" },
        { label: "متوسط زمن إصلاح العتاد", value: "أقل من 24 ساعة" },
        { label: "المحطات النشطة", value: "+30 محطة" },
      ],
    },
    {
      id: "freelance-eng",
      role: "مهندس برمجيات واجهات وميديا رقمية",
      company: "العمل الحر والهندسة المستقلة",
      period: "2024 – حتى الآن",
      location: "عن بُعد / دمياط، مصر",
      category: "Engineering & Web",
      description:
        "تطوير تطبيقات الويب المخصصة، أدوات C الخوارزمية منخفضة المستوى، متاجر Shopify مخصصة، والمونتاج وتدريج الألوان السينمائي.",
      highlights: [
        "تطوير واجهات حديثة فائقة السرعة باستخدام Next.js و TypeScript و Tailwind CSS مع التزام صارم بميزانيات الأداء العالي.",
        "تنفيذ هياكل بيانات منخفضة المستوى وإجراءات آمنة لإدارة الذاكرة بلغة ANSI C للمعيارية الخوارزمية والأكاديمية.",
        "هندسة مسارات Prompting متقدمة وسير عمل بالذكاء الاصطناعي لتسريع بناء الهياكل البرمجية والعمليات الرقمية.",
        "الإشراف على عمليات المونتاج وما بعد الإنتاج في DaVinci Resolve بالتركيز على تدريج الألوان المبني على العقد (Node-based).",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "ANSI C", "DaVinci Resolve", "Prompt Engineering"],
      metrics: [
        { label: "أداء Lighthouse", value: "98/100" },
        { label: "كفاءة تشغيل C", value: "O(log n)" },
        { label: "دقة الإخراج النهائي", value: "4K DCI" },
      ],
    },
    {
      id: "eldaly-electronics",
      role: "متدرب فني إلكترونيات",
      company: "مركز الدالي للإلكترونيات",
      period: "2023",
      location: "دمياط، مصر",
      category: "Hardware & Electronics",
      description:
        "تشخيص المكونات الإلكترونية الدقيقة، فحص اللوحات المطبوعة (PCB)، ولحام المكونات السطحية (SMD) للأنظمة الصناعية والاستهلاكية.",
      highlights: [
        "تتبع المسارات الإلكترونية باستخدام أجهزة القياس الرقمية والأوسيلوسكوب لاكتشاف المكثفات المعطوبة ومنظمات الجهد التالفة.",
        "إتقان اللحام الدقيق، تقنيات الهوت إير (Hot-air rework)، وإعادة تثبيت الموصلات تحت الميكروسكوب والعدسات المكبرة.",
        "تشخيص مصادر الطاقة ذات التبديل السريع (SMPS) وإعادة اللوحات الإلكترونية المعطلة إلى المواصفات التشغيلية القياسية.",
      ],
      technologies: ["تشخيص الدوائر", "اللحام الدقيق", "إصلاح SMD", "الأوسيلوسكوب والملتيميتر", "تحليل المخططات"],
      metrics: [
        { label: "نسبة استعادة اللوحات", value: "+85%" },
        { label: "أصغر مقاس لحام SMD", value: "0.5 مم" },
        { label: "اللوحات المفحوصة", value: "+120 لوحة" },
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "odoo-shopify-sync",
      title: "جسر المزامنة بين Odoo ERP و Shopify",
      category: "ENTERPRISE",
      year: "2025",
      subtitle: "مسار آلي لمزامنة المخزون والتجارة متعددة القنوات",
      description:
        "خدمة خلفية برمجية لمطابقة وتحديث أرصدة المخزون، خيارات المنتجات، وحالات الفواتير بين Odoo ERP ومتاجر Shopify في الوقت الفعلي.",
      architecture: [
        "مستقبل Webhook يلتقط أحداث إنشاء الطلبات في Shopify لحظياً.",
        "طابور معالجة للمعاملات يضمن خصم المخزون الذري في Odoo دون تضارب.",
        "مهمة دورية متسامحة مع الأخطاء لفحص الفروقات كل 15 دقيقة والتسوية التلقائية.",
      ],
      techStack: ["Odoo XML-RPC", "Shopify REST/GraphQL", "Node.js", "TypeScript", "PostgreSQL"],
      githubUrl: "https://github.com/X-Ironheart/odoo-shopify-bridge",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "نقل فوري للمخزون في أجزاء من الثانية ومنع تعارض الطلبات",
      featured: true,
      codeSnippet: {
        filename: "sync_worker.ts",
        language: "typescript",
        code: `async function reconcileStock(sku: string, odooQty: number) {
  const shopifyVariant = await shopify.inventory.get(sku);
  if (shopifyVariant.available !== odooQty) {
    await shopify.inventory.adjust({
      inventoryItemId: shopifyVariant.itemId,
      availableDelta: odooQty - shopifyVariant.available,
    });
    logger.info(\`[SYNC] \${sku} aligned to \${odooQty} units.\`);
  }
}`,
      },
    },
    {
      id: "c-memory-allocator",
      title: "مخصص الذاكرة المخصص وشجرة AVL بلغة C",
      category: "SYSTEMS",
      year: "2024",
      subtitle: "إدارة الذاكرة منخفضة المستوى وأشجار متوازنة ذاتياً",
      description:
        "مخصص ذاكرة متوافق مع يونكس بتقنيات Slab & Buddy تم بناؤه من الصفر بلغة C99 النقية مع تحليل مرئي لتجزئة الذاكرة وأشجار AVL متوازنة.",
      architecture: [
        "تخصيص مباشر عبر استدعاءات mmap ليتجاوز malloc الافتراضي في glibc.",
        "ترويس كتل الذاكرة مع دمج تلقائي للكتل الحرة المتجاورة عند التحرير.",
        "فهرسة الكتل الحرة بشجرة AVL لتحقيق أداء بحث بزمن O(log N) في أسوأ الحالات.",
      ],
      techStack: ["ANSI C99", "Linux Syscalls", "Valgrind", "GDB", "Makefile"],
      githubUrl: "https://github.com/X-Ironheart/c-systems-allocator",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "صفر تسريب للذاكرة تحت 50,000 دورة تخصيص وتحرير عشوائية",
      featured: true,
      codeSnippet: {
        filename: "allocator.c",
        language: "c",
        code: `typedef struct block_header {
    size_t size;
    int is_free;
    struct block_header *next;
    struct block_header *prev;
} block_header_t;

void *sys_alloc(size_t size) {
    block_header_t *block = find_best_fit(size);
    if (!block) block = extend_heap(size);
    block->is_free = 0;
    return (void *)(block + 1);
}`,
      },
    },
    {
      id: "tactile-hud-engine",
      title: "المحرك المعماري للموقع الشخصي",
      category: "WEB",
      year: "2025",
      subtitle: "بورتفوليو ويب عالي الأداء بتصميم مونوكروم صارم",
      description:
        "بورتفوليو رقمي ملموس تم تصميمه بدون ضوضاء RGB الملونة، معتمداً على فيزياء الحركة وتليمتري علامات التصويب وطرفية UNIX CLI تفاعلية.",
      architecture: [
        "معمارية Next.js App Router المسرعة بـ Turbopack مع هندسة ثابتة معالجة على الخادم.",
        "مؤثرات صوتية لمسية مولدة بواسطة Web Audio API تحاكي المفاتيح الميكانيكية.",
        "صفر ملفات رسومية خارجية ثقيلة مع شبكة CSS إجرائية وعلامات SVG خفيفة.",
      ],
      techStack: ["Next.js", "React 19", "Tailwind CSS v4", "Framer Motion", "TypeScript"],
      githubUrl: "https://github.com/X-Ironheart/portfolio",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "100/100 في معايير أداء Lighthouse وزمن حظر أقل من 15 مللي ثانية",
      featured: true,
      codeSnippet: {
        filename: "audio_feedback.ts",
        language: "typescript",
        code: `export const playTactileClick = (freq = 800) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};`,
      },
    },
    {
      id: "hardware-probe-cli",
      title: "أداة فحص العتاد والاتصال التسلسلي CLI",
      category: "HARDWARE",
      year: "2024",
      subtitle: "محلل إشارات المنافذ والتواصل مع الفيرموير",
      description:
        "أداة مراقبة وتواصل عتادية تتصل بالمتحكمات الدقيقة عبر UART/RS-232، لتسجيل التليمتري التسلسلي وتحديد الانحرافات الكهربائية بدقة.",
      architecture: [
        "خيط استقبال غير متزامن لـ UART مع مخزن مؤقت حلقي (Ring-buffer) قابل لضبط سرعة الباود.",
        "واجهة سطر أوامر تفاعلية ترسم قراءات جهد محول ADC في الوقت الفعلي.",
        "نظام تنبيهات آلي يكتشف ارتفاع الجهد غير الطبيعي والارتفاع المفاجئ في الحرارة.",
      ],
      techStack: ["C / C++", "POSIX Serial API", "UART / I2C Protocols", "Python", "Plotext"],
      githubUrl: "https://github.com/X-Ironheart/hardware-probe-cli",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "تم الاختبار حتى سرعة 921600 باود بدون فقدان أي حزمة بيانات",
      featured: false,
    },
    {
      id: "davinci-color-pipeline",
      title: "مسار تدريج الألوان السينمائي",
      category: "MEDIA",
      year: "2024",
      subtitle: "تحويلات الفضاء اللوني بشجرة العقد ومحاكاة شريط الفيلم",
      description:
        "بيئة عمل متقدمة في DaVinci Resolve تستخدم علوم ألوان ACEScc ومنحنيات التشبع الطرحي للتدريج الإعلاني والسينمائي.",
      architecture: [
        "هيكل عقد ثابت ومنظم: التعريض -> موازنة الأبيض -> CST -> تقسيم النغمات -> الحبيبات الفيلمية.",
        "مطابقة النطاق اللوني وفقاً لمعايير البث DCI-P3 و Rec.709.",
        "تصدير عالي الجودة بكوديكات وسيطة ProRes 4444XQ و DNxHR.",
      ],
      techStack: ["DaVinci Resolve Studio", "ACEScc", "Color Management", "Post-Production", "Audio Mastering"],
      githubUrl: "https://github.com/X-Ironheart",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "مخرجات آمنة للبث التلفزيوني متوافقة مع معايير الصوت EBU R128",
      featured: false,
    },
    {
      id: "shopify-custom-storefront",
      title: "واجهة متجر Shopify مخصصة عالية التحويل",
      category: "ENTERPRISE",
      year: "2024",
      subtitle: "تطوير Liquid مخصص والتكامل مع Storefront API",
      description:
        "قالب تجارة إلكترونية مفصل لعملاء التجزئة يتميز بسلة تسوق منزلقة فائقة السرعة، وقواعد بيع مخصصة، ودعم كامل للغة العربية (RTL).",
      architecture: [
        "معمارية أقسام مرنة بدون أي إضافات jQuery تعيق التحميل.",
        "سلة تسوق ديناميكية بخاصية AJAX وقواعد Upsell مع بحث تنبؤي ذكي.",
        "دعم ثنائي الاتجاه بالكامل للغة العربية (RTL) والإنجليزية (LTR).",
      ],
      techStack: ["Shopify Liquid", "JavaScript", "Tailwind CSS", "Storefront API", "JSON Templates"],
      githubUrl: "https://github.com/X-Ironheart",
      demoUrl: "https://github.com/X-Ironheart",
      metrics: "+34% سرعة تحميل أعلى مقارنة بالقوالب الجاهزة",
      featured: false,
    },
  ] as ProjectItem[],

  skillMatrix: [
    {
      title: "هندسة النظم والبرمجة الجوهرية",
      subtitle: "الحوسبة منخفضة المستوى، الكفاءة الخوارزمية، ومعمارية الواجهات",
      tag: "LOW_LEVEL_&_CORE",
      skills: [
        {
          name: "ANSI C (C99/C11)",
          level: "متقدم",
          description: "المؤشرات، التخصيص الديناميكي للذاكرة، التراكيب، العمليات الثنائية، واستدعاءات POSIX.",
          context: "مستخدم في المقررات الأكاديمية لهندسة الحاسبات، مخصصات الذاكرة، وبرمجيات تعريف العتاد.",
        },
        {
          name: "هياكل البيانات والخوارزميات",
          level: "متقدم",
          description: "الأشجار (AVL, BST)، الرسوم البيانية، جداول التجزئة، الكومات، والبرمجة الديناميكية.",
          context: "هندسة حلول خوارزمية تلتزم بأعلى قيود الكفاءة الزمنية والمكانية.",
        },
        {
          name: "الواجهات الحديثة (TypeScript/JS)",
          level: "متمرس",
          description: "وضع TypeScript الصارم، React 19، Next.js App Router، ES6+، وواجهات Web API.",
          context: "بناء واجهات إنتاجية عالية الأداء وبوابات مخصصة للعملاء.",
        },
        {
          name: "Tailwind CSS والـ CSS الحديث",
          level: "خبير",
          description: "Tailwind v4، شبكات CSS Grid، Flexbox، رموز التصميم المعمارية، والحركات الدقيقة.",
          context: "تصميم واجهات بروتالست مونوكروم صارمة وأنظمة تصميم ميسرة وشاملة.",
        },
        {
          name: "Git وإدارة الإصدارات",
          level: "متمرس",
          description: "استراتيجيات الفروع، Semantic Commits، سير عمل Rebase، و GitHub Actions CI/CD.",
          context: "الحفاظ على سجلات مستودعات نظيفة وموثوقة وقابلة للتدقيق البرمجي.",
        },
      ],
    },
    {
      title: "الأنظمة المؤسسية والبنية التحتية",
      subtitle: "سير عمل أنظمة ERP، بنية التجارة الإلكترونية، ونظم إدارة الأعمال",
      tag: "INFRASTRUCTURE_&_ERP",
      skills: [
        {
          name: "نظام Odoo ERP",
          level: "متمرس",
          description: "إدارة المخازن، تهيئة نقاط البيع (POS)، تتبع المستودعات المتعددة، وأتمتة أوامر البيع.",
          context: "نشر وتخصيص نسخ Odoo ERP المؤسسية لدى شركة الهدى للخدمات الحاسوبية والتقنية.",
        },
        {
          name: "بنية Shopify التحتية",
          level: "متمرس",
          description: "تخصيص الواجهات، هندسة Liquid، تغذية Webhook للمخزون، وربط بوابات الدفع.",
          context: "بناء متاجر مخصصة للعملاء وتطوير جسور المزامنة الآنية للمخزون مع أنظمة ERP.",
        },
        {
          name: "المحاسبة والتدفقات المالية",
          level: "متوسط",
          description: "أساسيات دفتر الأستاذ العام، مطابقة الفواتير، قيود اليومية المحاسبية، وتتبع ضريبة القيمة المضافة.",
          context: "تنسيق ومتابعة مسارات الوحدات المالية داخل Odoo لعمليات التجزئة التجارية.",
        },
        {
          name: "إدارة الخوادم والشبكات",
          level: "متمرس",
          description: "شبكات LAN المحلية، التوجيه بعناوين IP الثابتة، خوادم الطباعة، والنسخ الاحتياطي التلقائي.",
          context: "إدارة يومية تشمل أكثر من 30 محطة عمل فعلية وخوادم نقاط بيع تجارية.",
        },
      ],
    },
    {
      title: "الهندسة والعتاد والميديا الرقمية",
      subtitle: "الحوسبة المادية، التشخيص الإلكتروني، والإنتاج السينمائي الرقمي",
      tag: "HARDWARE_&_CREATIVE",
      skills: [
        {
          name: "تشخيص وإصلاح العتاد",
          level: "متمرس",
          description: "عزل الأعطال على مستوى المكونات، تشخيص خطوط التغذية في اللوحات الأم، والإدارة الحرارية.",
          context: "خبرة تشخيصية ميدانية واسعة في شركة الهدى ومركز الدالي للإلكترونيات.",
        },
        {
          name: "الإلكترونيات واللحام الدقيق",
          level: "متوسط",
          description: "إصلاح مكونات SMD السطحية، استخدام مساعدات الصهر (Flux)، وتحليل مخططات الدوائر.",
          context: "تدريب تطبيقي مكثف خلال فترة التدريب الميداني في مركز الدالي.",
        },
        {
          name: "DaVinci Resolve (المونتاج والألوان)",
          level: "متمرس",
          description: "تدريج الألوان بالعقد، إدارة ألوان ACES، عزل المنحنيات اللونية، وهندسة الصوت النهائي.",
          context: "عمل حر في مرحلة ما بعد الإنتاج للإعلانات التجارية والمحتوى الإبداعي الرقمي.",
        },
        {
          name: "هندسة الأوامر (Prompt Engineering)",
          level: "متقدم",
          description: "هيكلة الأوامر المتقدمة، سلاسل التفكير البرمجي، تحسين توليد الكود، والوكلاء الأذكياء.",
          context: "مدمجة ضمن سير العمل اليومي لتسريع وتيرة البناء وضمان جودة الكود ونظافته.",
        },
      ],
    },
    {
      title: "اللغات والتواصل الفني",
      subtitle: "التواصل التقني الدولي وإتقان اللغات المتعددة",
      tag: "LINGUISTIC_MATRIX",
      skills: [
        {
          name: "اللغة العربية",
          level: "اللغة الأم",
          description: "اللغة الأم. تواصل فني وتقني بليغ واحترافي رفيع المستوى.",
          context: "توجيه الفرق الفنية وإدارة الدورات التدريبية الميدانية للعملاء.",
        },
        {
          name: "اللغة الإنجليزية",
          level: "مستوى متقدم (C1)",
          description: "كتابة الوثائق الفنية بطلاقة، محادثات تقنية متقدمة، وعروض هندسية.",
          context: "اللغة الأساسية في البحث العلمي، هندسة البرمجيات، والتعاون التقني الدولي.",
        },
        {
          name: "اللغة الروسية",
          level: "مستوى مبتدئ (A1)",
          description: "المفردات الأساسية، قراءة الأبجدية السيريلية، وعبارات الترحيب الأولية.",
          context: "دراسة مستمرة لتراكيب اللغة للتوسع في مجالات الهندسة الدولية.",
        },
      ],
    },
  ] as SkillCategory[],

  academic: {
    institution: "جامعة حورس (HUE)",
    degree: "بكالوريوس هندسة الحاسبات ونظم التحكم (CSE)",
    expectedGraduation: "2030",
    standing: "مسار مرتبة الشرف / تقدير ممتاز",
    leadership: [
      {
        role: "عضو مجلس",
        organization: "مجلس اتحاد طلاب جامعة حورس",
        period: "نشط",
        description: "تمثيل طلاب الهندسة، تنسيق المبادرات الجامعية، والتواصل الفعال بين إدارة الكلية والأقسام الأكاديمية.",
      },
    ],
    conferences: [
      {
        name: "المؤتمر القومي لعلوم الراديو (NRSC)",
        badge: "مؤتمر علمي",
        description: "حضور محاضرات وجلسات متخصصة في الاتصالات اللاسلكية الحديثة، انتشار الموجات الكهرومغناطيسية، وهوائيات الرادار.",
      },
      {
        name: "ملتقى الجامعات المصرية",
        badge: "ملتقى قيادي",
        description: "ممثل معتمد في مناقشات القيادات الشبابية على مستوى الجمهورية، التعليم الصناعي الحديث، والهندسة التطبيقية.",
      },
      {
        name: "ملتقى وورشة عمل SWAG SolidWorks",
        badge: "ورشة عمل",
        description: "المشاركة في جلسات تصميم نماذج CAD الميكانيكية والميكاترونكس، ومعايير تصنيع الهياكل العتادية.",
      },
    ],
  },

  marqueeItems: [
    "ANSI C99 / C11",
    "معمارية NEXT.JS",
    "REACT 19",
    "TYPESCRIPT",
    "TAILWIND CSS V4",
    "أنظمة ODOO ERP",
    "بنية SHOPIFY المخصصة",
    "تدريج ألوان DAVINCI RESOLVE",
    "هياكل البيانات والخوارزميات",
    "تشخيص العتاد والصيانة",
    "لحام وإصلاح PCB",
    "استدعاءات LINUX POSIX",
    "هندسة حورس CSE [2030]",
    "دمياط، مصر",
  ],
};

export function getPortfolioData(lang: "EN" | "AR" = "EN") {
  return lang === "AR" ? PORTFOLIO_DATA_AR : PORTFOLIO_DATA_EN;
}

export const PORTFOLIO_DATA = PORTFOLIO_DATA_EN;
