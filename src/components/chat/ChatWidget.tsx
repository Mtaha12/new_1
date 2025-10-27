/* eslint-disable */
// Minimal, working ChatWidget component
/* eslint-disable */
// Minimal, working ChatWidget component with CSS module
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './ChatWidget.module.css';

type Message = { id: string; text: string; sender: 'user' | 'bot'; timestamp: string };

export default function ChatWidget() {
  const t = useTranslations('Chat');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const id = setTimeout(() => addBotMessage((t('welcomeMessage') as string) || 'Hi!'), 300);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const addBotMessage = (text: string) => setMessages((p) => [...p, { id: `${Date.now()}-bot`, text, sender: 'bot', timestamp: new Date().toISOString() }]);
  const addUserMessage = (text: string) => setMessages((p) => [...p, { id: `${Date.now()}-user`, text, sender: 'user', timestamp: new Date().toISOString() }]);

  const getBotResponse = async (message: string) => {
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, locale, conversationHistory: messages.slice(-6) }) });
      if (!res.ok) return (t('responses.default') as string) || 'Sorry';
      const data = await res.json();
      return data?.response || (t('responses.default') as string) || 'Sorry';
    } catch (e) {
      console.error(e);
      return (t('responses.default') as string) || 'Sorry';
    }
  };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;
    addUserMessage(text);
    setInputValue('');
    setIsTyping(true);
    const resp = await getBotResponse(text);
    setTimeout(() => { setIsTyping(false); addBotMessage(resp); }, 300 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <>
      {!isOpen && <button className={styles['chat-button']} aria-label={(t('openChat') as string) || 'Open chat'} onClick={() => setIsOpen(true)}>💬</button>}

      {isOpen && (
        <div className={styles['chat-window']}>
          <div className={styles['chat-header']}>
              <div className="title-row">
                <div className={styles['title-icon']}>🤖</div>
                <div className={styles['title-text']}>{(t('title') as string) || 'Chat'}</div>
              </div>
              <div>
                <button className={styles['close-button']} onClick={() => setIsOpen(false)}>✕</button>
              </div>
          </div>

          <div className={styles['chat-messages']}>
            {messages.map((m) => (
              <div key={m.id} className={`${styles['chat-message']} ${m.sender === 'user' ? styles['chat-message--user'] : ''}`}>
                <div className={styles['chat-message__bubble']}><div className={styles['bubble-text']}>{m.text}</div></div>
              </div>
            ))}
            {isTyping && <div className={`${styles['bubble-text']} ${styles['typing-indicator']}`}>...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles['chat-input-area']}>
            <input className={styles['chat-input']} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={(t('inputPlaceholder') as string) || 'Type a message...'} />
            <button className={`${styles['chat-send']} ${inputValue.trim() ? styles['send-active'] : styles['send-inactive']}`} onClick={handleSend} disabled={!inputValue.trim()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
