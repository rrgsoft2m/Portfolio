const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('2Maktabim', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'rrg@gmail.com' },
    update: {},
    create: {
      email: 'rrg@gmail.com',
      password: hashedPassword,
      name: 'Raximov Rustam',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Seed projects from rrgsoft.uz
  const projects = [
    {
      title: "O'ynab O'rganamiz",
      description: "Bolalar uchun interaktiv o'quv platformasi. O'yin orqali matematika va mantiqiy fikrlashni rivojlantiruvchi dastur.",
      link: "https://rrgsoft.uz",
      category: "Web App",
      featured: true,
      order: 1,
    },
    {
      title: "Sakra Bolakay",
      description: "Bolalar uchun mo'ljallangan o'yinchoq va rivojlantiruvchi o'yinlar platformasi.",
      link: "https://rrgsoft.uz",
      category: "Mobile App",
      featured: true,
      order: 2,
    },
    {
      title: "Delphi E.Darslik",
      description: "Delphi dasturlash tili bo'yicha elektron darslik. Interaktiv misollar va mashqlar bilan.",
      link: "https://rrgsoft.uz",
      category: "Education",
      featured: true,
      order: 3,
    },
    {
      title: "rrgsoft.uz",
      description: "Shaxsiy portfolio va xizmatlar veb sayti. Zamonaviy dizayn va tezkor ishlash.",
      link: "https://rrgsoft.uz",
      category: "Website",
      featured: true,
      order: 4,
    },
    {
      title: "mdo.rrgsoft.uz",
      description: "MDO (Ma'lumotlar Bazasi Operatsiyalari) boshqaruv tizimi.",
      link: "https://mdo.rrgsoft.uz",
      category: "Web App",
      featured: false,
      order: 5,
    },
    {
      title: "boyavut.uz",
      description: "Boyavut tumani uchun rasmiy veb portal. Yangiliklar va ma'lumotlar tizimi.",
      link: "https://boyavut.uz",
      category: "Website",
      featured: true,
      order: 6,
    },
    {
      title: "test.boyavut.uz",
      description: "Boyavut tumani uchun test tizimi. Online imtihon va bilimni tekshirish platformasi.",
      link: "https://test.boyavut.uz",
      category: "Web App",
      featured: false,
      order: 7,
    },
    {
      title: "latipovtaxi.unaux.com",
      description: "Taxi xizmati uchun buyurtma berish platformasi. Qulay interfeys va tezkor ishlash.",
      link: "http://latipovtaxi.unaux.com",
      category: "Website",
      featured: false,
      order: 8,
    },
    {
      title: "Ingliz tilini o'rganamiz",
      description: "Ingliz tilini o'rganish uchun interaktiv dastur. Lug'at, grammatika va mashqlar.",
      link: "https://rrgsoft.uz",
      category: "Education",
      featured: true,
      order: 9,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ ${projects.length} projects seeded`);

  // Seed site content from rrgsoft.uz
  const siteContents = [
    { key: 'hero_name', value: 'RRGSOFT', type: 'text' },
    { key: 'hero_subtitle', value: 'Full Stack Developer | Django | AI | Web Apps', type: 'text' },
    { key: 'hero_description', value: "Men backend dasturchiman. Zamonaviy texnologiyalar bilan professional darajada veb ilovalar yarataman.", type: 'text' },
    { key: 'about_title', value: 'Men haqimda', type: 'text' },
    { key: 'about_name', value: 'Raximov Rustam', type: 'text' },
    { key: 'about_description', value: "Men Raximov Rustam — web-sayt yaratish bo'yicha mutaxasisman. Backend yo'nalishida faoliyat yuritaman. 5+ yillik tajribaga ega bo'lib, 450+ mamnun mijozlarga xizmat ko'rsatganman.", type: 'text' },
    { key: 'about_experience', value: '5+', type: 'text' },
    { key: 'about_clients', value: '450+', type: 'text' },
    { key: 'about_projects_count', value: '190+', type: 'text' },
    { key: 'about_awards', value: '10+', type: 'text' },
    { key: 'phone', value: '+998945851494', type: 'text' },
    { key: 'email', value: 'rrg@gmail.com', type: 'text' },
    { key: 'seo_title', value: 'RRGSOFT - Full Stack Developer Portfolio', type: 'seo' },
    { key: 'seo_description', value: 'Raximov Rustam - Professional Full Stack Developer. Django, AI, Web Apps. 5+ yillik tajriba.', type: 'seo' },
    { key: 'seo_keywords', value: 'rrgsoft, full stack developer, django, python, web development, portfolio', type: 'seo' },
    // Skills
    { key: 'skill_python_django', value: '90', type: 'skill' },
    { key: 'skill_python', value: '90', type: 'skill' },
    { key: 'skill_cpp', value: '60', type: 'skill' },
    { key: 'skill_csharp', value: '60', type: 'skill' },
    { key: 'skill_php_laravel', value: '60', type: 'skill' },
    { key: 'skill_wordpress', value: '60', type: 'skill' },
    { key: 'skill_html', value: '95', type: 'skill' },
    { key: 'skill_css', value: '80', type: 'skill' },
    { key: 'skill_javascript', value: '70', type: 'skill' },
    { key: 'skill_react', value: '70', type: 'skill' },
    { key: 'skill_nodejs', value: '70', type: 'skill' },
    { key: 'skill_vibe_coding', value: '95', type: 'skill' },
    // Services
    { key: 'service_1_title', value: 'Python & Django', type: 'service' },
    { key: 'service_1_description', value: "Saytingizni frontend qismi tayyor bo'lsa men sizga backend ni Python & Django yordamida tayyorlab beraman.", type: 'service' },
    { key: 'service_1_icon', value: 'Code', type: 'service' },
    { key: 'service_2_title', value: 'Vibe Coding', type: 'service' },
    { key: 'service_2_description', value: "Sizning g'oyangiz bor lekin sayt yoki ilova yarata olmaysizmi? Endi bu muammo emas. Bizga aloqaga chiqing biz bir zumda tayyorlab beramiz.", type: 'service' },
    { key: 'service_2_icon', value: 'Sparkles', type: 'service' },
    { key: 'service_3_title', value: 'Telegram Bot', type: 'service' },
    { key: 'service_3_description', value: "Telegram botlar yaratish — avtomatlashtirish, CRM, va boshqa xizmatlar uchun professional botlar.", type: 'service' },
    { key: 'service_3_icon', value: 'Bot', type: 'service' },
    { key: 'service_4_title', value: 'AI Integrations', type: 'service' },
    { key: 'service_4_description', value: "Sun'iy intellekt texnologiyalarini loyihangizga integratsiya qilish — chatbotlar, tahlil va avtomatlashtirish.", type: 'service' },
    { key: 'service_4_icon', value: 'Brain', type: 'service' },
  ];

  for (const content of siteContents) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
  }
  console.log(`✅ ${siteContents.length} site content entries seeded`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
