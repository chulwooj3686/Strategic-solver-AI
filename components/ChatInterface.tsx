
import React, { useState, useRef, useEffect } from 'react';
import { Message, AppMode } from '../types.ts';
import { getAIResponse } from '../services/geminiService.ts';
import System2Loader from './System2Loader.tsx';

interface ChatInterfaceProps {
  mode: AppMode;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ mode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcome = {
      role: 'assistant' as const,
      content: getWelcomeMessage(mode),
      timestamp: Date.now()
    };
    setMessages([welcome]);
  }, [mode]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getAIResponse(mode, messages, input);
    
    const assistantMsg: Message = { role: 'assistant', content: response, timestamp: Date.now() };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  function getWelcomeMessage(m: AppMode) {
    switch (m) {
      case AppMode.QA: return "💡 궁금한 이론이 있으신가요? 시스템적 사고, MECE, 5Why 등 질문해 주세요.";
      case AppMode.GUIDE: return "🛠️ 실무 문제를 해결해 봅시다. 지금 고민 중인 문제는 무엇인가요?";
      case AppMode.DIAGNOSIS: return "🔍 당신의 의사결정을 복기해 봅시다. 어떤 상황이었나요?";
      default: return "안녕! 전략적 코치입니다.";
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white neo-border neo-shadow overflow-hidden">
      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f9fafb]"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-5 neo-border neo-shadow-sm font-bold leading-tight ${
                msg.role === 'user' 
                  ? 'bg-[#f472b6] text-black' // Hot Pink
                  : 'bg-[#fbbf24] text-black' // Hot Yellow
              }`}
            >
              <div className="whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && <System2Loader />}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t-4 border-black bg-white">
        <div className="flex space-x-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="TYPE YOUR PROBLEM HERE..."
            className="flex-1 p-4 neo-border focus:outline-none focus:bg-slate-50 font-bold placeholder-black/30 resize-none h-16 uppercase text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-8 py-2 bg-[#22c55e] neo-border font-black text-black hover:bg-[#16a34a] neo-shadow-hover transition-all disabled:bg-slate-300 disabled:shadow-none"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
