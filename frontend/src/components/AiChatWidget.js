'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, Loader2, User } from 'lucide-react';
import api from '@/lib/api';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Halo! 👋 Saya **Asisten AI Kelurahan Digital**. Ada yang bisa saya bantu hari ini?\n\nAnda bisa menanyakan syarat surat (SKTM, Domisili, Kematian), jam kerja kantor, atau alur pengajuan.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Syarat SKTM apa aja?',
    'Jam operasional kelurahan?',
    'Surat domisili syaratnya apa?',
    'Bagaimana cara cek status pengajuan?',
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user', content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.post('/api/chat', { message: query.trim() });
      const aiReply = res.data?.data?.reply || 'Mohon maaf, terjadi gangguan koneksi AI.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: aiReply },
      ]);
    } catch (err) {
      console.error('AI Chat Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Mohon maaf, saat ini sistem AI sedang sibuk. Silakan hubungi WhatsApp Admin Kelurahan.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="gradient-btn p-4 rounded-full text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group border border-emerald-400/40"
          aria-label="Tanya AI Assistant"
        >
          <div className="relative">
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
          </div>
          <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">Tanya AI Kelurahan</span>
        </button>
      )}

      {/* Chat Room Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[520px] glass-panel border border-emerald-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">Asisten AI Kelurahan</h4>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online 24/7
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                      : 'glass-card border border-slate-700/80 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="glass-card p-3 rounded-2xl border border-slate-700/80 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>AI sedang mengerti pertanyaan Anda...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-emerald-500/20 hover:text-emerald-400 text-[10px] text-slate-300 border border-slate-700/60 whitespace-nowrap transition-all shrink-0"
              >
                💡 {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tulis pertanyaan seputar kelurahan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="glass-input flex-grow px-3.5 py-2.5 rounded-xl text-xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="gradient-btn p-2.5 rounded-xl text-white disabled:opacity-50 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
