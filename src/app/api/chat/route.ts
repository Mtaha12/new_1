import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { mongoose } from '@/lib/database';

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

// Create model only if it doesn't exist
const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);

// Get API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
}

// Enhanced Fallback AI Response Generator
function generateFallbackResponse(message: string, locale: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  // English responses
  const englishResponses: { [key: string]: string } = {
    greeting: "Hi there! 👋 Welcome to The Samurai. How can I assist you with cybersecurity or IT solutions today?",
    help: "I'm here to help! You can ask me about our cybersecurity services, IT consulting, pricing, or contact information.",
    services: "We specialize in: Cybersecurity Solutions, IT Consulting, Infrastructure Services, and Cloud Computing.",
    pricing: "Our pricing is customized based on your specific needs. Contact our sales team for a personalized quote.",
    contact: "Email: info@thesamurai.com\nPhone: +966 50 123 4567",
    thanks: "You're welcome! 😊 Is there anything else I can help you with?",
    default: "Thank you for your message! For detailed assistance, please contact our expert team directly."
  };

  // Arabic responses
  const arabicResponses: { [key: string]: string } = {
    greeting: "مرحباً! 👋 أهلاً بكم في The Samurai. كيف يمكنني مساعدتك في حلول الأمن السيبراني وتكنولوجيا المعلومات اليوم؟",
    help: "أنا هنا للمساعدة! يمكنك أن تسألني عن خدمات الأمن السيبراني، استشارات تكنولوجيا المعلومات، الأسعار، أو معلومات الاتصال.",
    services: "نحن متخصصون في: حلول الأمن السيبراني، استشارات تكنولوجيا المعلومات، خدمات البنية التحتية، والحوسبة السحابية.",
    pricing: "أسعارنا مخصصة بناءً على احتياجاتك. اتصل بفريق المبيعات للحصول على عرض أسعار شخصي.",
    contact: "البريد: info@thesamurai.com\nالهاتف: +966 50 123 4567",
    thanks: "على الرحب والسعة! 😊 هل هناك أي شيء آخر يمكنني مساعدتك فيه؟",
    default: "شكراً على رسالتك! للحصول على مساعدة مفصلة، يرجى الاتصال بفريق الخبراء لدينا مباشرة."
  };

  const responses = locale === 'ar' ? arabicResponses : englishResponses;

  if (/(hello|hi|hey|مرحبا|اهلا|السلام)/i.test(lowerMessage)) {
    return responses.greeting;
  } else if (/(help|مساعدة|دعم|support)/i.test(lowerMessage)) {
    return responses.help;
  } else if (/(service|خدمة|خدمات|solution|حل)/i.test(lowerMessage)) {
    return responses.services;
  } else if (/(price|cost|سعر|تكلفة|اسعار|بكم)/i.test(lowerMessage)) {
    return responses.pricing;
  } else if (/(contact|اتصال|تواصل|بريد|هاتف|ايميل)/i.test(lowerMessage)) {
    return responses.contact;
  } else if (/(thank|شكر|مشكور|يعطيك)/i.test(lowerMessage)) {
    return responses.thanks;
  } else {
    return responses.default;
  }
}

// Use the correct Gemini 2.0 models that are available
async function generateGeminiResponse(message: string, locale: string): Promise<string> {
  const systemPrompt = locale === 'ar' 
    ? `أنت مساعد ذكي لشركة The Samurai المتخصصة في الأمن السيبراني وحلول تكنولوجيا المعلومات في المملكة العربية السعودية. أجب بإيجاز وبشكل محترف وودود.`
    : `You are an AI assistant for The Samurai, a cybersecurity and IT solutions company in Saudi Arabia. Respond briefly, professionally and friendly.`;

  // Use the available Gemini 2.0 models
  const endpoints = [
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent',
    'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite-001:generateContent',
  ];

  for (const endpoint of endpoints) {
    try {
      console.info(`Testing endpoint: ${endpoint}`);
      
      const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nUser: ${message}`
            }]
          }],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.7,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (responseText && responseText.trim()) {
          console.info(`✅ SUCCESS with endpoint: ${endpoint}`);
          return responseText;
        }
      } else {
        const errorData = await response.json();
        console.warn(`❌ Endpoint failed: ${endpoint} - ${response.status}`, errorData.error?.message);
      }
    } catch (error) {
      console.warn(`❌ Endpoint error: ${endpoint}`, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  throw new Error('All Gemini 2.0 endpoints failed');
}

// Main AI Response Generator
async function generateAIResponse(message: string, locale: string): Promise<string> {
  // Try Gemini 2.0 models first
  try {
    console.info('🚀 Attempting Gemini 2.0 API...');
    const response = await generateGeminiResponse(message, locale);
    console.info('✅ Gemini 2.0 API call successful!');
    return response;
  } catch (error) {
    console.error('❌ All Gemini 2.0 endpoints failed, using fallback');
    return generateFallbackResponse(message, locale);
  }
}

// POST - Send chat message and get response
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, locale = 'en' } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate session ID
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.info('💬 Handling chat request with Gemini 2.0 models');

    // Generate AI response
    const response = await generateAIResponse(message.trim(), locale);

    // Save to database
    try {
      await connectDB();
      await ChatMessage.create({
        sessionId,
        message: message.trim(),
        response,
        locale,
        userAgent,
        ipAddress,
        createdAt: new Date()
      });
    } catch (dbError) {
      console.error('Database save error:', dbError);
    }

    return NextResponse.json({
      success: true,
      response,
      sessionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

// GET - Retrieve chat history for a session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const messages = await ChatMessage.find({ sessionId })
      .sort({ createdAt: 1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length
    });

  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}