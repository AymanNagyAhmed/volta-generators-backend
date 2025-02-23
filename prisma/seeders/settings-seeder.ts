import { PrismaClient } from '@prisma/client';

interface SettingSeed {
    sectionId: string;
    key: string;
    value: string;
    sectionTitle: string; // We'll use this to match with the section
}

export async function settingsSeeder(prisma: PrismaClient): Promise<void> {
    let siteSectios = await prisma.siteSection.findMany();
    if (siteSectios.length === 0) {
        console.log('🌱 There are no sections, skipping seeding');
        return;
    }
    // Define settings with their corresponding section titles
    const settings: SettingSeed[] = [
        // Background settings
        {
            sectionId: siteSectios.find(section => section.title === 'background')?.id,
            sectionTitle: 'background',
            key: 'background_image',
            value: '/public/uploads/settings/background/background.jpg',
        },
        // Navbar settings
        {
            sectionId: siteSectios.find(section => section.title === 'navbar')?.id,
            sectionTitle: 'navbar',
            key: 'logo',
            value: '/public/uploads/settings/navbar/logo.jpg',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'navbar')?.id,
            sectionTitle: 'navbar',
            key: 'nav_text',
            value: 'Volta Generators FZE',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'navbar')?.id,
            sectionTitle: 'navbar',
            key: 'menu_items',
            value: JSON.stringify(['Home', 'About', 'Products', 'Contact']),
        },
        {
            sectionId: siteSectios.find(section => section.title === 'navbar')?.id,
            sectionTitle: 'navbar',
            key: 'search_placeholder',
            value: 'Search...',
        },
        // Main slider settings
        {
            sectionId: siteSectios.find(section => section.title === 'main_slider')?.id,
            sectionTitle: 'main_slider',
            key: 'slides',
            value: JSON.stringify([
                { description: 'Slide 1', image: '/public/uploads/settings/main_slider/generator-1.webp' },
                { description: 'Slide 2', image: '/public/uploads/settings/main_slider/generator-2.webp' },
                { description: 'Slide 3', image: '/public/uploads/settings/main_slider/generator-3.webp' },
                { description: 'Slide 4', image: '/public/uploads/settings/main_slider/generator-4.webp' },
                { description: 'Slide 5', image: '/public/uploads/settings/main_slider/generator-5.webp' },
                { description: 'Slide 6', image: '/public/uploads/settings/main_slider/generator-6.webp' },
                { description: 'Slide 7', image: '/public/uploads/settings/main_slider/generator-7.webp' },
                { description: 'Slide 8', image: '/public/uploads/settings/main_slider/generator-8.webp' },
                { description: 'Slide 9', image: '/public/uploads/settings/main_slider/generator-9.webp' },
                { description: 'Slide 10', image: '/public/uploads/settings/main_slider/generator-10.webp' },
            ]),
        },
        // who we are
        {
            sectionId: siteSectios.find(section => section.title === 'who_we_are')?.id,
            sectionTitle: 'who_we_are',
            key: 'title',
            value: 'Who We Are',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'who_we_are')?.id,
            sectionTitle: 'who_we_are',
            key: 'description',
            value: "We are offering Tower ligh and Diesel Generator Sets from 4.5 kVA to 4125 kVA in single unit and higher ratings generators in multiple unit configurations. These diesel gensets are powered by world-class engines like Baudouin ,PERKINS ,KUBOTA ,CUMMINS coupled with LEROYSOMER , STAMFORD alternators to provide optimum power solutions. These reliable diesel generators are installed and running in different parts of the world .Volta generators is steadily growing its reputation as a reliable source of world class products in power generation with the ability to provide custom built power solutions at short notice. Volta Generators have become a recognized force within the generator industry, and we attribute our increasing dominance within this sector to the company's ability to embrace change and to offer a dynamic platform for market demand.",
        },
        {
            sectionId: siteSectios.find(section => section.title === 'who_we_are')?.id,
            sectionTitle: 'who_we_are',
            key: 'our_vision',
            value: 'Our Vision',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'who_we_are')?.id,
            sectionTitle: 'who_we_are',
            key: 'our_vision_description',
            value: 'Volta Generators is a distinguished manufacturer specializing in the production of high-quality diesel generating sets and comprehensive power systems. Our esteemed "VOLTA" range encompasses a wide spectrum of power solutions, with capacities ranging from 4.5KVA to 4125 KVA. Renowned for our commitment to excellence, Volta Generators has established an international reputation for delivering superior power generation products that meet the diverse needs of our clients across various sectors.',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'who_we_are')?.id,
            sectionTitle: 'who_we_are',
            key: 'our_mission',
            value: 'Our Mission',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'who_we_are')?.id,
            sectionTitle: 'who_we_are',
            key: 'our_mission_description',
            value: 'At Volta Generators, our mission is to provide reliable and efficient power solutions that empower businesses and communities worldwide. We are dedicated to innovation, quality, and customer satisfaction, ensuring that our products are at the forefront of technology and performance.',
        },
        // our core values
        {
            sectionId: siteSectios.find(section => section.title === 'our_core_values')?.id,
            sectionTitle: 'our_core_values',
            key: 'title',
            value: 'Our Core Values',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_core_values')?.id,
            sectionTitle: 'our_core_values',
            key: 'honesty_description',
            value: "At Volta Generators, integrity is the cornerstone of everything we do. We are committed to fostering trust through transparent and ethical practices in every interaction. Our approach is simple: clear communication, no hidden agendas, and fair dealings. You can rely on us to deliver genuine, high-quality solutions that prioritize your needs without compromise. Honesty isn't just a value—it's the foundation of our relationship with you.",
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_core_values')?.id,
            sectionTitle: 'our_core_values',
            key: 'quality_description',
            value: "We take pride in our products, which are engineered for durability and efficiency, ensuring optimal performance in challenging environments. Quality is at the heart of everything we do. Our products undergo rigorous testing and quality control processes to ensure they meet the highest industry standards. We employ advanced manufacturing techniques, utilizing the finest materials to guarantee the longevity and reliability of our power systems.",
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_core_values')?.id,
            sectionTitle: 'our_core_values',
            key: 'accessibility_description',
            value: "Power should be accessible to all. We focus on making our products and services accessible to a wide range of clients, ensuring that everyone can benefit from reliable and affordable power solutions.",
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_core_values')?.id,
            sectionTitle: 'our_core_values',
            key: 'customer_focus_description',
            value: "We prioritize our customers' needs, providing tailored solutions and exceptional service to meet their unique requirements.",
        },
        // our projects
        {
            sectionId: siteSectios.find(section => section.title === 'our_projects')?.id,
            sectionTitle: 'our_projects',
            key: 'title',
            value: 'Our Projects',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_projects')?.id,
            sectionTitle: 'our_projects',
            key: 'slides',
            value: JSON.stringify([
                { description: 'Slide 1', image: '/public/uploads/settings/our_projects/project-1.webp' },
                { description: 'Slide 2', image: '/public/uploads/settings/our_projects/project-2.webp' },
                { description: 'Slide 3', image: '/public/uploads/settings/our_projects/project-3.webp' },
                { description: 'Slide 4', image: '/public/uploads/settings/our_projects/project-4.webp' },
                { description: 'Slide 5', image: '/public/uploads/settings/our_projects/project-5.webp' },
                { description: 'Slide 6', image: '/public/uploads/settings/our_projects/project-6.webp' },
                { description: 'Slide 7', image: '/public/uploads/settings/our_projects/project-7.webp' },
                { description: 'Slide 8', image: '/public/uploads/settings/our_projects/project-8.webp' },
                { description: 'Slide 9', image: '/public/uploads/settings/our_projects/project-9.webp' },
                { description: 'Slide 10', image: '/public/uploads/settings/our_projects/project-10.webp' },
            ]),
        },

        // need technical support?
        {
            sectionId: siteSectios.find(section => section.title === 'need_technical_support')?.id,
            sectionTitle: 'need_technical_support',
            key: 'title',
            value: 'Need Technical Support?',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'need_technical_support')?.id,
            sectionTitle: 'need_technical_support',
            key: 'description',
            value: 'Volta Generators Our Support',
        },
        // why we are the best
        {
            sectionId: siteSectios.find(section => section.title === 'why_we_are_the_best')?.id,
            sectionTitle: 'why_we_are_the_best',
            key: 'title',
            value: 'Why We Are The Best',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'why_we_are_the_best')?.id,
            sectionTitle: 'why_we_are_the_best',
            key: 'reasons',
            value: JSON.stringify([
                {reason_id:1, title: '12 years of experience', description: 'Committed to continuous growth and proactive management of our projects to deliver top-tier services.' },
                {reason_id:2, title: 'Leading Industry Experts', description: 'Driven by a strong sense of belonging, our team is dedicated to fostering talent and upholding company values.' },
                {reason_id:3, title: "Fast & Effective Solutions', description: 'Addressing the urgent demand for reliable electricity with solutions that keep pace with today's critical needs." },
                {reason_id:4, title: 'Flexible pricing', description: 'Offering dynamic pricing while ensuring value without compromising quality.' },
                {reason_id:5, title: 'Exceptional Team', description: 'Focused on enhancing team performance through skill development, training, and a positive, supportive environment.' }
            ]),
        },
        // our products
        {
            sectionId: siteSectios.find(section => section.title === 'our_products')?.id,
            sectionTitle: 'our_products',
            key: 'title',
            value: 'Our Products',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_products')?.id,
            sectionTitle: 'our_products',
            key: 'slides',
            value: JSON.stringify([
                {title: 'Slide 1', description: 'Slide 1', image: '/public/uploads/settings/our_products/product-1.webp' },
                {title: 'Slide 2', description: 'Slide 2', image: '/public/uploads/settings/our_products/product-2.webp' },
                {title: 'Slide 3', description: 'Slide 3', image: '/public/uploads/settings/our_products/product-3.webp' },
                {title: 'Slide 4', description: 'Slide 4', image: '/public/uploads/settings/our_products/product-4.webp' },
                {title: 'Slide 5', description: 'Slide 5', image: '/public/uploads/settings/our_products/product-5.webp' },
                {title: 'Slide 6', description: 'Slide 6', image: '/public/uploads/settings/our_products/product-6.webp' },
                {title: 'Slide 7', description: 'Slide 7', image: '/public/uploads/settings/our_products/product-7.webp' },
                {title: 'Slide 8', description: 'Slide 8', image: '/public/uploads/settings/our_products/product-8.webp' },
                {title: 'Slide 9', description: 'Slide 9', image: '/public/uploads/settings/our_products/product-9.webp' },
                {title: 'Slide 10', description: 'Slide 10', image: '/public/uploads/settings/our_products/product-10.webp' },
            ]),
        },
        // our geographical coverage
        {
            sectionId: siteSectios.find(section => section.title === 'our_geographical_coverage')?.id,
            sectionTitle: 'our_geographical_coverage',
            key: 'title',
            value: 'Our Geographical Coverage',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_geographical_coverage')?.id,
            sectionTitle: 'our_geographical_coverage',
            key: 'flags',
            value: JSON.stringify([
                { country: "Lebanon", image: '/public/uploads/settings/our_geographical_coverage/-flag.webp' },
                { country: "Qatar", image: "/public/uploads/settings/our_geographical_coverage/qa-flag.webp" },
                { country: "Saudi Arabia", image: "/public/uploads/settings/our_geographical_coverage/sa-flag.webp" },
                { country: "United Arab Emirates", image: "/public/uploads/settings/our_geographical_coverage/uae-flag.webp" },
                { country: "Kuwait", image: "/public/uploads/settings/our_geographical_coverage/kw-flag.webp" },
                { country: "Iraq", image: "/public/uploads/settings/our_geographical_coverage/iq-flag.webp" },
                { country: "Egypt", image: "/public/uploads/settings/our_geographical_coverage/eg-flag.webp" },
                { country: "Jordan", image: "/public/uploads/settings/our_geographical_coverage/jo-flag.webp" },
                { country: "Oman", image: "/public/uploads/settings/our_geographical_coverage/om-flag.webp" },
            ]),
        },
        // frequently asked questions
        {
            sectionId: siteSectios.find(section => section.title === 'frequently_asked_questions')?.id,
            sectionTitle: 'frequently_asked_questions',
            key: 'title',
            value: 'Frequently Asked Questions',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'frequently_asked_questions')?.id,
            sectionTitle: 'frequently_asked_questions',
            key: 'questions',
            value: JSON.stringify([
                { question: "What is the price of a generator?", answer: "The price of a generator depends on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
                { question: "What is the fuel consumption of your generators?", answer: "The fuel consumption of our generators varies depending on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
                { question: "What is the fuel consumption of your generators?", answer: "The fuel consumption of our generators varies depending on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
                { question: "What is the fuel consumption of your generators?", answer: "The fuel consumption of our generators varies depending on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
                { question: "What is the fuel consumption of your generators?", answer: "The fuel consumption of our generators varies depending on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
                { question: "What is the fuel consumption of your generators?", answer: "The fuel consumption of our generators varies depending on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
                { question: "What is the fuel consumption of your generators?", answer: "The fuel consumption of our generators varies depending on the type and capacity of the generator. We offer competitive pricing for all our products." },
                { question: "What is the warranty period for your generators?", answer: "Our generators come with a standard warranty period of 12 months. This includes parts and labor coverage." },
                { question: "Can you provide installation services?", answer: "Yes, we offer installation services for all our generators. Our team can install your generator at your desired location." },
            ]),
        },
        // our brands
        {
            sectionId: siteSectios.find(section => section.title === 'our_brands')?.id,
            sectionTitle: 'our_brands',
            key: 'title',
            value: 'Our Brands',
        },
        {
            sectionId: siteSectios.find(section => section.title === 'our_brands')?.id,
            sectionTitle: 'our_brands',
            key: 'brands',
            value: JSON.stringify([
                { name: "Leroy Somer", image: "/public/uploads/settings/our_brands/leroysomer.png" },
                { name: "DSE", image: "/public/uploads/settings/our_brands/dse.png" },
                { name: "Cummins", image: "/public/uploads/settings/our_brands/cummins.png" },
                { name: "Perkins", image: "/public/uploads/settings/our_brands/perkins.png" },
                { name: "Stamford", image: "/public/uploads/settings/our_brands/stamford.png" },
                { name: "Kubota", image: "/public/uploads/settings/our_brands/kubota.png" },
                { name: "Linz", image: "/public/uploads/settings/our_brands/linz.png" },
                { name: "Baudouin", image: "/public/uploads/settings/our_brands/baudouin.png" },
                { name: "Stamford", image: "/public/uploads/settings/our_brands/stamford.png" },
            ]),
        },
        // Footer settings
        {
            sectionId: siteSectios.find(section => section.title === 'footer')?.id,
            sectionTitle: 'footer',
            key: 'contact_info',
            value: JSON.stringify({
                email: 'Info@voltagenerators.com',
                phone: '+971503635488',
                address: 'VOLTA GENERATORS FZC 4P-04, P.B.No.51564 Hamriyah Free Zone Sharjah, UAE',
                facebook: 'https://www.facebook.com/voltagenerators',
                instagram: 'https://www.instagram.com/voltagenerators',
                youtube: 'https://www.youtube.com/voltagenerators',
                tiktok: 'https://www.tiktok.com/voltagenerators',
            }),
        },
    ];

    try {
        console.log('🌱 Seeding settings...');
        let thereAreSettings = await prisma.setting.findMany();
        if (thereAreSettings.length > 0) {
            console.log('🌱 There are settings, skipping seeding');
            return;
        }

        for (const setting of settings) {
            await prisma.setting.create({
                data: {
                    sectionId: setting.sectionId,
                    sectionTitle: setting.sectionTitle,
                    key: setting.key,
                    value: setting.value,
                },
            });
        }
    
        console.log('✅ Settings seeded successfully');
    } catch (error) {
        console.error('❌ Error seeding settings:', error);
        throw error;
    }
}