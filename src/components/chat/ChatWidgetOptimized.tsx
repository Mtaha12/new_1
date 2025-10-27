'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Memoized Message Component
const ChatMessage = memo(({ message, formatTime }: { message: Message; formatTime: (date: Date) => string }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
      animation: 'slideIn 0.3s ease-out'
    }}
  >
    <div style={{
      maxWidth: '75%',
      padding: '0.75rem 1rem',
      borderRadius: message.sender === 'user' 
        ? '16px 16px 4px 16px' 
        : '16px 16px 16px 4px',
      background: message.sender === 'user' 
        ? 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)'
        : '#fff',
      color: message.sender === 'user' ? '#fff' : '#333',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      wordWrap: 'break-word'
    }}>
      <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
        {message.text}
      </p>
      <span style={{
        display: 'block',
        marginTop: '0.25rem',
        fontSize: '0.7rem',
        opacity: 0.7,
        textAlign: 'right'
      }}>
        {formatTime(message.timestamp)}
      </span>
    </div>
  </div>
));

ChatMessage.displayName = 'ChatMessage';

// Typing Indicator Component
const TypingIndicator = memo(() => (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-start'
  }}>
    <div style={{
      padding: '0.75rem 1rem',
      borderRadius: '16px 16px 16px 4px',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        alignItems: 'center'
      }}>
        {[0, 0.2, 0.4].map((delay, index) => (
          <span key={index} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#666',
            animation: 'bounce 1.4s infinite ease-in-out both',
            animationDelay: `${delay}s`
          }} />
        ))}
      </div>
    </div>
  </div>
));

TypingIndicator.displayName = 'TypingIndicator';

export default function ChatWidgetOptimized() {
  const t = useTranslations('Chat');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized scroll function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        addBotMessage(t('welcomeMessage'));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, t]);

  const addBotMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-bot`,
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-user`,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Memoized bot response generator
  const generateBotResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('مرحبا')) {
      return t('responses.greeting');
    } else if (lowerMessage.includes('help') || lowerMessage.includes('مساعدة')) {
      return t('responses.help');
    } else if (lowerMessage.includes('service') || lowerMessage.includes('خدمة')) {
      return t('responses.services');
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر')) {
      return t('responses.pricing');
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('اتصال')) {
      return t('responses.contact');
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('شكرا')) {
      return t('responses.thanks');
    } else {
      return t('responses.default');
    }
  }, [t]);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessageText = inputValue;
    addUserMessage(userMessageText);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call backend API for AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessageText,
          locale: currentLocale,
          conversationHistory: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Simulate typing delay
        const delay = 1000 + Math.random() * 1000;
        typingTimeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          addBotMessage(data.response || generateBotResponse(userMessageText));
        }, delay);
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to local response
      const delay = 1000 + Math.random() * 1000;
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        addBotMessage(generateBotResponse(userMessageText));
      }, delay);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [inputValue, addUserMessage, addBotMessage, generateBotResponse, currentLocale, messages]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const formatTime = useCallback((date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Memoized styles
  const chatButtonStyle = useMemo(() => ({
    position: 'fixed' as const,
    bottom: '2rem',
    right: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00bcd4 0%, #0a0e3d 100%)',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,188,212,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    transition: 'all 0.3s',
    zIndex: 1000,
    animation: 'pulse 2s infinite'
  }), []);

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={chatButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label={t('openChat')}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: 'min(400px, calc(100vw - 2rem))',
          height: 'min(600px, calc(100vh - 4rem))',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 100%)',
            padding: '1.25rem',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#00bcd4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🤖
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>
                  {t('title')}
                </h3>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>
                  {t('status')}
                </p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem',
                lineHeight: 1
              }}
              aria-label={t('closeChat')}
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            background: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} formatTime={formatTime} />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '1rem',
            background: '#fff',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('inputPlaceholder')}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '24px',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.3s',
                color: '#111',
                background: 'transparent',
                caretColor: '#00bcd4'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00bcd4'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: (inputValue.trim() && !isTyping) ? '#00bcd4' : '#ccc',
                border: 'none',
                cursor: (inputValue.trim() && !isTyping) ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.currentTarget.style.background = '#0097a7';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.currentTarget.style.background = '#00bcd4';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              aria-label={t('sendMessage')}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(0,188,212,0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(0,188,212,0.7);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
