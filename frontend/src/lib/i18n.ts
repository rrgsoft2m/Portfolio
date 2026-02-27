export type Locale = 'uz' | 'ru' | 'en';

export const translations = {
    uz: {
        // Navbar
        nav: {
            home: 'Bosh sahifa',
            about: 'Men haqimda',
            services: 'Xizmatlar',
            projects: 'Loyihalar',
            contact: "Bog'lanish",
        },
        // Hero
        hero: {
            badge: 'Portfolio sayti',
            typingTexts: [
                'Full Stack Developer',
                'Django Expert',
                'AI Enthusiast',
                'Web App Creator',
                'Vibe Coder',
            ],
            description:
                "Zamonaviy texnologiyalar bilan professional darajada veb ilovalar yarataman. 5+ yillik tajriba. 450+ mamnun mijoz.",
            btnProjects: 'Loyihalarim',
            btnContact: "Menga bog'lanish",
        },
        // About
        about: {
            title: 'Men Haqimda',
            stats: {
                experience: 'Yillik tajriba',
                clients: 'Mamnun mijozlar',
                projects: 'Loyihalar',
                awards: 'Mukofotlar',
            },
            name: 'Raximov Rustam',
            bio1:
                "Web-sayt yaratish bo'yicha mutaxasisman. Backend yo'nalishida faoliyat yuritaman. 5+ yillik tajribaga ega bo'lib, 450+ mamnun mijozlarga xizmat ko'rsatganman. Python, Django, AI va zamonaviy veb texnologiyalari bo'yicha chuqur bilimga egaman.",
            bio2:
                "Har bir loyihaga kreativ yondashaman va mijozlarimning ehtiyojlarini to'liq qondirish uchun eng so'nggi texnologiyalardan foydalanaman. Mening maqsadim — har bir mijozga premium darajadagi raqamli yechimlar taqdim etish.",
        },
        // Services
        services: {
            title: 'Xizmatlarim',
            subtitle: "Men taqdim etadigan professional xizmatlar",
            items: [
                {
                    title: 'Web Sayt Yaratish',
                    description:
                        "Zamonaviy va tezkor web saytlar yaratish. Responsive dizayn, SEO optimizatsiya va premium UX bilan.",
                },
                {
                    title: 'Web App Dasturlash',
                    description:
                        "Murakkab veb ilovalar yaratish. Django, React, Next.js texnologiyalari asosida.",
                },
                {
                    title: 'Telegram Bot',
                    description:
                        "Biznesingiz uchun avtomatlashtirish va xizmat ko'rsatish botlarini yaratish.",
                },
                {
                    title: 'AI & Machine Learning',
                    description:
                        "Sun'iy intellekt asosida zamonaviy yechimlar. NLP, kompyuter ko'rish va tahlil tizimlari.",
                },
                {
                    title: 'Backend API',
                    description:
                        "REST va GraphQL APIlar yaratish. Django REST Framework, Node.js.",
                },
                {
                    title: 'WordPress & CMS',
                    description:
                        "Professional WordPress saytlar va maxsus CMS tizimlari. Kontent boshqaruv tizimlari.",
                },
            ],
        },
        // Projects
        projects: {
            title: 'Loyihalarim',
            subtitle: "Mening eng yaxshi ishlarim",
            viewAll: "Barchasini ko'rish",
            visitSite: 'Saytga o\'tish',
        },
        // Contact
        contact: {
            title: "Bog'lanish",
            subtitle: 'Loyiha haqida gaplashamizmi? Menga xabar qoldiring!',
            infoTitle: "Aloqa ma'lumotlari",
            infoBio:
                "Sizning g'oyangizni amalga oshirishga tayyorman. Quyidagi yo'llar orqali menga murojaat qiling.",
            phone: 'Telefon',
            email: 'Email',
            location: 'Manzil',
            locationValue: 'Sirdaryo viloyati Boyovut tumani',
            form: {
                name: 'Ismingiz',
                namePlaceholder: 'Ismingizni kiriting',
                phone: 'Telefon raqam',
                phonePlaceholder: '+998 XX XXX XX XX',
                email: 'Email',
                emailPlaceholder: 'email@example.com',
                message: 'Xabar',
                messagePlaceholder: 'Xabaringizni yozing...',
                send: 'Xabar yuborish',
                success: 'Xabar muvaffaqiyatli yuborildi!',
                error: 'Xabar yuborishda xatolik yuz berdi.',
            },
        },
        // Footer
        footer: {
            rights: 'Barcha huquqlar himoyalangan.',
            links: {
                home: 'Bosh sahifa',
                about: 'Men haqimda',
                projects: 'Loyihalar',
                contact: 'Aloqa',
            },
        },
        // Loading
        loading: {
            text: 'Yuklanmoqda...',
        },
    },

    ru: {
        nav: {
            home: 'Главная',
            about: 'Обо мне',
            services: 'Услуги',
            projects: 'Проекты',
            contact: 'Контакты',
        },
        hero: {
            badge: 'Портфолио',
            typingTexts: [
                'Full Stack Developer',
                'Django Expert',
                'AI Enthusiast',
                'Web App Creator',
                'Vibe Coder',
            ],
            description:
                'Создаю профессиональные веб-приложения с современными технологиями. 5+ лет опыта. 450+ довольных клиентов.',
            btnProjects: 'Мои проекты',
            btnContact: 'Связаться',
        },
        about: {
            title: 'Обо мне',
            stats: {
                experience: 'Лет опыта',
                clients: 'Довольных клиентов',
                projects: 'Проектов',
                awards: 'Наград',
            },
            name: 'Рахимов Рустам',
            bio1:
                'Специализируюсь на создании веб-сайтов. Работаю в направлении Backend. Имею 5+ лет опыта, обслужил 450+ довольных клиентов. Глубокие знания в Python, Django, AI и современных веб-технологиях.',
            bio2:
                'Подхожу к каждому проекту творчески и использую новейшие технологии для полного удовлетворения потребностей клиентов. Моя цель — предоставить каждому клиенту цифровые решения премиум-класса.',
        },
        services: {
            title: 'Мои услуги',
            subtitle: 'Профессиональные услуги, которые я предоставляю',
            items: [
                {
                    title: 'Создание сайтов',
                    description:
                        'Современные и быстрые веб-сайты. Адаптивный дизайн, SEO-оптимизация и премиум UX.',
                },
                {
                    title: 'Веб-приложения',
                    description:
                        'Разработка сложных веб-приложений. На основе Django, React, Next.js.',
                },
                {
                    title: 'Telegram Бот',
                    description:
                        'Создание ботов для автоматизации и обслуживания вашего бизнеса.',
                },
                {
                    title: 'AI & Machine Learning',
                    description:
                        'Современные решения на основе ИИ. NLP, компьютерное зрение и аналитические системы.',
                },
                {
                    title: 'Backend API',
                    description:
                        'Создание REST и GraphQL API. Django REST Framework, Node.js.',
                },
                {
                    title: 'WordPress & CMS',
                    description:
                        'Профессиональные WordPress-сайты и кастомные CMS-системы.',
                },
            ],
        },
        projects: {
            title: 'Мои проекты',
            subtitle: 'Мои лучшие работы',
            viewAll: 'Смотреть все',
            visitSite: 'Перейти на сайт',
        },
        contact: {
            title: 'Контакты',
            subtitle: 'Поговорим о проекте? Оставьте мне сообщение!',
            infoTitle: 'Контактная информация',
            infoBio:
                'Готов воплотить вашу идею в жизнь. Обращайтесь ко мне по следующим каналам.',
            phone: 'Телефон',
            email: 'Email',
            location: 'Адрес',
            locationValue: 'Сирдарьинская область, Баяут',
            form: {
                name: 'Ваше имя',
                namePlaceholder: 'Введите ваше имя',
                phone: 'Номер телефона',
                phonePlaceholder: '+998 XX XXX XX XX',
                email: 'Email',
                emailPlaceholder: 'email@example.com',
                message: 'Сообщение',
                messagePlaceholder: 'Напишите ваше сообщение...',
                send: 'Отправить',
                success: 'Сообщение успешно отправлено!',
                error: 'Ошибка при отправке сообщения.',
            },
        },
        footer: {
            rights: 'Все права защищены.',
            links: {
                home: 'Главная',
                about: 'Обо мне',
                projects: 'Проекты',
                contact: 'Контакты',
            },
        },
        loading: {
            text: 'Загрузка...',
        },
    },

    en: {
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            projects: 'Projects',
            contact: 'Contact',
        },
        hero: {
            badge: 'Portfolio',
            typingTexts: [
                'Full Stack Developer',
                'Django Expert',
                'AI Enthusiast',
                'Web App Creator',
                'Vibe Coder',
            ],
            description:
                'Building professional web applications with modern technologies. 5+ years of experience. 450+ happy clients.',
            btnProjects: 'My Projects',
            btnContact: 'Contact Me',
        },
        about: {
            title: 'About Me',
            stats: {
                experience: 'Years of Experience',
                clients: 'Happy Clients',
                projects: 'Projects',
                awards: 'Awards',
            },
            name: 'Raximov Rustam',
            bio1:
                'I specialize in web development, focusing on backend technologies. With 5+ years of experience, I have served 450+ happy clients. Deep expertise in Python, Django, AI, and modern web technologies.',
            bio2:
                'I approach every project creatively and use the latest technologies to fully meet client needs. My goal is to deliver premium digital solutions to every client.',
        },
        services: {
            title: 'My Services',
            subtitle: 'Professional services I provide',
            items: [
                {
                    title: 'Website Development',
                    description:
                        'Modern and fast websites. Responsive design, SEO optimization and premium UX.',
                },
                {
                    title: 'Web App Development',
                    description:
                        'Complex web applications built with Django, React, Next.js.',
                },
                {
                    title: 'Telegram Bot',
                    description:
                        'Automation and customer service bots for your business.',
                },
                {
                    title: 'AI & Machine Learning',
                    description:
                        'Modern AI-powered solutions. NLP, computer vision and analytics systems.',
                },
                {
                    title: 'Backend API',
                    description:
                        'REST and GraphQL API development. Django REST Framework, Node.js.',
                },
                {
                    title: 'WordPress & CMS',
                    description:
                        'Professional WordPress sites and custom CMS systems.',
                },
            ],
        },
        projects: {
            title: 'My Projects',
            subtitle: 'My best works',
            viewAll: 'View All',
            visitSite: 'Visit Site',
        },
        contact: {
            title: 'Contact',
            subtitle: 'Want to discuss a project? Drop me a message!',
            infoTitle: 'Contact Information',
            infoBio:
                "Ready to bring your idea to life. Reach out through the following channels.",
            phone: 'Phone',
            email: 'Email',
            location: 'Location',
            locationValue: 'Sirdaryo region, Boyovut',
            form: {
                name: 'Your Name',
                namePlaceholder: 'Enter your name',
                phone: 'Phone Number',
                phonePlaceholder: '+998 XX XXX XX XX',
                email: 'Email',
                emailPlaceholder: 'email@example.com',
                message: 'Message',
                messagePlaceholder: 'Write your message...',
                send: 'Send Message',
                success: 'Message sent successfully!',
                error: 'Error sending message.',
            },
        },
        footer: {
            rights: 'All rights reserved.',
            links: {
                home: 'Home',
                about: 'About',
                projects: 'Projects',
                contact: 'Contact',
            },
        },
        loading: {
            text: 'Loading...',
        },
    },
} as const;

export type Translations = typeof translations.uz;
