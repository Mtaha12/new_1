import mongoose from 'mongoose';
import { listBlogArticles, type BlogArticleContent } from '../src/data/blogPosts';

// MongoDB URI - directly configured
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://samuraiadmin:phoneix1234@cluster0.18dsp1k.mongodb.net/project-phoenix?retryWrites=true&w=majority&appName=Cluster0';

// Define the schema and model directly in the script to avoid import issues
const ContentTranslationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true,
    trim: true
  }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  en: ContentTranslationSchema,
  ar: ContentTranslationSchema,
  category: { 
    type: String, 
    required: true,
    enum: ['blog', 'service', 'page', 'faq'],
    default: 'page'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  locale: { type: String, default: 'en' },
  status: { type: String, default: 'new', enum: ['new', 'read', 'replied', 'archived'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Chat Message Schema
const chatMessageSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  locale: { type: String, default: 'en' },
  userAgent: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);

function serializeArticleContent(content: BlogArticleContent, locale: 'en' | 'ar'): string {
  const sections = content.sections
    .map((section) => {
      const heading = `## ${section.heading}`;
      const paragraphs = section.paragraphs.join('\n\n');
      return `${heading}\n\n${paragraphs}`;
    })
    .join('\n\n');

  const takeawaysHeading = locale === 'ar' ? '### أبرز النقاط' : '### Key Takeaways';
  const conclusionHeading = locale === 'ar' ? '### الخلاصة' : '### Conclusion';

  const takeaways = content.takeaways.length
    ? `${takeawaysHeading}\n\n${content.takeaways.map((item) => `- ${item}`).join('\n')}`
    : '';

  const parts = [
    content.kicker ? `_${content.kicker}_` : '',
    content.description,
    sections,
    takeaways,
    `${conclusionHeading}\n\n${content.conclusion}`
  ].filter(Boolean);

  return parts.join('\n\n');
}

// Content Data
const contentData = [
  {
    slug: 'homepage',
    en: {
      title: 'Welcome to The Samurai',
      description: 'Leading provider of digital solutions and IT services',
      content: 'We are The Samurai, a cutting-edge technology company specializing in cybersecurity, IT consulting, and digital transformation. Our mission is to empower businesses with innovative solutions.'
    },
    ar: {
      title: 'مرحباً بكم في ذا ساموراي',
      description: 'المزود الرائد للحلول الرقمية وخدمات تكنولوجيا المعلومات',
      content: 'نحن ذا ساموراي، شركة تكنولوجيا متطورة متخصصة في الأمن السيبراني واستشارات تكنولوجيا المعلومات والتحول الرقمي. مهمتنا هي تمكين الشركات بحلول مبتكرة.'
    },
    category: 'page'
  },
  {
    slug: 'about',
    en: {
      title: 'About The Samurai',
      description: 'Learn about our company, mission, and values',
      content: 'Founded in 2020, The Samurai has grown to become a trusted partner for businesses seeking digital excellence. We combine technical expertise with strategic thinking to deliver transformative solutions.'
    },
    ar: {
      title: 'عن ذا ساموراي',
      description: 'تعرف على شركتنا ورسالتنا وقيمنا',
      content: 'تأسست ذا ساموراي في عام 2020، وقد نمت لتصبح شريكًا موثوقًا للشركات التي تسعى للتميز الرقمي. نجمع بين الخبرة التقنية والتفكير الاستراتيجي لتقديم حلول تحويلية.'
    },
    category: 'page'
  },
  {
    slug: 'services',
    en: {
      title: 'Our Services',
      description: 'Comprehensive IT and digital services',
      content: 'We offer a wide range of services including Cybersecurity Solutions, Cloud Infrastructure, Web Development, Mobile Apps, IT Consulting, and Digital Transformation.'
    },
    ar: {
      title: 'خدماتنا',
      description: 'خدمات شاملة لتكنولوجيا المعلومات والخدمات الرقمية',
      content: 'نقدم مجموعة واسعة من الخدمات بما في ذلك حلول الأمن السيبراني، البنية التحتية السحابية، تطوير الويب، تطبيقات الهاتف المحمول، استشارات تكنولوجيا المعلومات، والتحول الرقمي.'
    },
    category: 'page'
  },
  {
    slug: 'cybersecurity',
    en: {
      title: 'Cybersecurity Solutions',
      description: 'Protect your business from cyber threats',
      content: 'Our comprehensive cybersecurity services include threat detection, vulnerability assessments, penetration testing, security audits, and 24/7 monitoring to keep your business safe.'
    },
    ar: {
      title: 'حلول الأمن السيبراني',
      description: 'احمِ عملك من التهديدات السيبرانية',
      content: 'تشمل خدمات الأمن السيبراني الشاملة لدينا اكتشاف التهديدات، وتقييمات الثغرات، واختبار الاختراق، وعمليات التدقيق الأمني، والمراقبة على مدار الساعة طوال أيام الأسبوع للحفاظ على أمان عملك.'
    },
    category: 'service'
  },
  {
    slug: 'web-development',
    en: {
      title: 'Web Development',
      description: 'Modern, responsive web applications',
      content: 'We build cutting-edge web applications using the latest technologies like Next.js, React, TypeScript, and Node.js. Our solutions are scalable, secure, and user-friendly.'
    },
    ar: {
      title: 'تطوير الويب',
      description: 'تطبيقات ويب حديثة ومتجاوبة',
      content: 'نبني تطبيقات ويب متطورة باستخدام أحدث التقنيات مثل Next.js و React و TypeScript و Node.js. حلولنا قابلة للتطوير وآمنة وسهلة الاستخدام.'
    },
    category: 'service'
  },
  {
    slug: 'cloud-infrastructure',
    en: {
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions for modern businesses',
      content: 'Migrate to the cloud with confidence. We provide AWS, Azure, and Google Cloud solutions with automated deployment, monitoring, and optimization.'
    },
    ar: {
      title: 'البنية التحتية السحابية',
      description: 'حلول سحابية قابلة للتطوير للشركات الحديثة',
      content: 'انتقل إلى السحابة بثقة. نحن نقدم حلول AWS و Azure و Google Cloud مع النشر الآلي والمراقبة والتحسين.'
    },
    category: 'service'
  },
  {
    slug: 'faq-security',
    en: {
      title: 'How secure is your platform?',
      description: 'Security FAQ',
      content: 'We implement industry-standard security practices including encryption, regular audits, and compliance with international standards like ISO 27001.'
    },
    ar: {
      title: 'ما مدى أمان منصتكم؟',
      description: 'الأسئلة الشائعة حول الأمان',
      content: 'نطبق ممارسات أمنية معيارية في الصناعة بما في ذلك التشفير والتدقيق المنتظم والامتثال للمعايير الدولية مثل ISO 27001.'
    },
    category: 'faq'
  },
  {
    slug: 'faq-pricing',
    en: {
      title: 'What are your pricing models?',
      description: 'Pricing FAQ',
      content: 'We offer flexible pricing models including project-based, monthly retainers, and hourly rates. Contact us for a customized quote based on your needs.'
    },
    ar: {
      title: 'ما هي نماذج التسعير الخاصة بكم؟',
      description: 'الأسئلة الشائعة حول التسعير',
      content: 'نقدم نماذج تسعير مرنة بما في ذلك الأسعار القائمة على المشروع والاشتراكات الشهرية والأسعار بالساعة. اتصل بنا للحصول على عرض أسعار مخصص بناءً على احتياجاتك.'
    },
    category: 'faq'
  }
];

const blogArticles = listBlogArticles();

for (const article of blogArticles) {
  contentData.push({
    slug: article.slug,
    en: {
      title: article.en.title,
      description: article.en.description,
      content: serializeArticleContent(article.en, 'en')
    },
    ar: {
      title: article.ar.title,
      description: article.ar.description,
      content: serializeArticleContent(article.ar, 'ar')
    },
    category: 'blog'
  });
}

// Contact Data
const contactData = [
  {
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.rashid@example.com',
    phone: '+966501234567',
    subject: 'Cybersecurity Consultation',
    message: 'I am interested in learning more about your cybersecurity services for our enterprise.',
    locale: 'en',
    status: 'new'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+14155551234',
    subject: 'Web Development Project',
    message: 'We need a modern web application built with Next.js. Can we schedule a consultation?',
    locale: 'en',
    status: 'new'
  },
  {
    name: 'محمد العتيبي',
    email: 'mohammed.otaibi@example.sa',
    phone: '+966509876543',
    subject: 'استشارة تقنية',
    message: 'نحتاج إلى استشارة حول تحديث البنية التحتية لتكنولوجيا المعلومات لدينا.',
    locale: 'ar',
    status: 'read'
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@startup.io',
    phone: '+16505551234',
    subject: 'Cloud Migration',
    message: 'Looking for assistance with migrating our infrastructure to AWS. What are your rates?',
    locale: 'en',
    status: 'new'
  },
  {
    name: 'فاطمة السعيد',
    email: 'fatima.s@company.sa',
    phone: '+966551234567',
    subject: 'تطوير تطبيق جوال',
    message: 'نريد تطوير تطبيق جوال لأعمالنا. هل يمكنكم المساعدة؟',
    locale: 'ar',
    status: 'replied'
  }
];

// Chat Message Data
const chatData = [
  {
    sessionId: 'session-001',
    message: 'Hello, I need help with cybersecurity',
    response: 'Hi there! I can help you with cybersecurity. We offer threat detection, vulnerability assessments, and 24/7 monitoring. Would you like to know more about a specific service?',
    locale: 'en',
    userAgent: 'Mozilla/5.0',
    ipAddress: '192.168.1.1'
  },
  {
    sessionId: 'session-001',
    message: 'What about pricing?',
    response: 'Our pricing varies based on your specific needs. Please contact our sales team for a customized quote. Would you like me to connect you?',
    locale: 'en',
    userAgent: 'Mozilla/5.0',
    ipAddress: '192.168.1.1'
  },
  {
    sessionId: 'session-002',
    message: 'مرحبا، أحتاج معلومات عن خدماتكم',
    response: 'مرحباً! كيف يمكنني مساعدتك اليوم؟ نحن نقدم حلول الأمن السيبراني، استشارات تكنولوجيا المعلومات، خدمات البنية التحتية، والمزيد.',
    locale: 'ar',
    userAgent: 'Mozilla/5.0',
    ipAddress: '192.168.1.2'
  },
  {
    sessionId: 'session-003',
    message: 'Do you offer web development services?',
    response: 'Yes! We build responsive, scalable web applications using modern technologies like Next.js, React, and Node.js. Would you like to discuss your project?',
    locale: 'en',
    userAgent: 'Mozilla/5.0',
    ipAddress: '192.168.1.3'
  },
  {
    sessionId: 'session-004',
    message: 'كم تكلفة تطوير موقع؟',
    response: 'تختلف أسعارنا بناءً على احتياجاتك المحددة. يرجى الاتصال بفريق المبيعات لدينا للحصول على عرض أسعار مخصص.',
    locale: 'ar',
    userAgent: 'Mozilla/5.0',
    ipAddress: '192.168.1.4'
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Content.deleteMany({});
    await Contact.deleteMany({});
    await ChatMessage.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert Content data
    console.log('📝 Inserting Content data...');
    await Content.insertMany(contentData);
    const contentCount = await Content.countDocuments();
    console.log(`✅ Inserted ${contentCount} content items\n`);

    // Insert Contact data
    console.log('📧 Inserting Contact data...');
    await Contact.insertMany(contactData);
    const contactCount = await Contact.countDocuments();
    console.log(`✅ Inserted ${contactCount} contact submissions\n`);

    // Insert Chat Message data
    console.log('💬 Inserting Chat Message data...');
    await ChatMessage.insertMany(chatData);
    const chatCount = await ChatMessage.countDocuments();
    console.log(`✅ Inserted ${chatCount} chat messages\n`);

    // Display summary
    console.log('📊 Database Seeding Summary:');
    console.log('═══════════════════════════════════════');
    
    // Content by category
    const contentByCategory = await Content.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    console.log('\n📄 Content Items:');
    contentByCategory.forEach(cat => {
      console.log(`   - ${cat._id}: ${cat.count} items`);
    });
    
    const contents = await Content.find({}).limit(5);
    console.log('\n   Sample slugs:');
    contents.forEach(content => {
      console.log(`   • ${content.slug} (${content.category})`);
    });

    // Contacts by status
    const contactsByStatus = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    console.log('\n📧 Contact Submissions:');
    contactsByStatus.forEach(status => {
      console.log(`   - ${status._id}: ${status.count} contacts`);
    });

    // Chat sessions
    const uniqueSessions = await ChatMessage.distinct('sessionId');
    console.log('\n💬 Chat Messages:');
    console.log(`   - Total messages: ${chatCount}`);
    console.log(`   - Unique sessions: ${uniqueSessions.length}`);

    console.log('\n═══════════════════════════════════════');
    console.log('🎉 Database seeding completed successfully!\n');

    console.log('🔗 Test your endpoints:');
    console.log('   GET  http://localhost:3000/api/content');
    console.log('   GET  http://localhost:3000/api/content/homepage');
    console.log('   GET  http://localhost:3000/api/contact');
    console.log('   GET  http://localhost:3000/api/chat?sessionId=session-001');
    console.log('   GET  http://localhost:3000/api/connection\n');

  } catch (error: any) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding function
seedDatabase();