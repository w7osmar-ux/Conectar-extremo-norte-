
import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../types';
import { getIceBreaker } from '../services/geminiService';

interface Props {
  user: User;
  onBack: () => void;
}

const ChatDetailScreen: React.FC<Props> = ({ user, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: user.id, text: 'Feliz Sábado! Você vai no JA hoje?', timestamp: '10:42', isMine: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [iceBreakers, setIceBreakers] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMine: true
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const loadIceBreakers = async () => {
    setIceBreakers("Gerando ideias...");
    const suggestions = await getIceBreaker(user.name, user.role);
    setIceBreakers(suggestions);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <img src={user.images[0]} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-sm leading-tight dark:text-white">{user.name}</h2>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online agora</p>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm ${
              msg.isMine ? 'bg-primary text-white rounded-br-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 mx-2">{msg.timestamp}</span>
          </div>
        ))}
      </main>

      {/* IA Sugestões */}
      {!iceBreakers ? (
        <div className="px-4 py-2">
          <button 
            onClick={loadIceBreakers}
            className="w-full py-2 bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold rounded-lg border border-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">lightbulb</span>
            Sugestões de Quebra-gelo IA
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 p-4 border-t border-slate-100 dark:border-slate-800 max-h-40 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Sugestões da IA</span>
            <button onClick={() => setIceBreakers(null)} className="material-symbols-outlined text-xs dark:text-white">close</button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap italic">{iceBreakers}</p>
        </div>
      )}

      <footer className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-full px-4 py-1 border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-slate-400">add_circle</span>
          <input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 dark:text-white" 
            placeholder="Digite uma mensagem..." 
          />
          <button 
            onClick={handleSend}
            className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatDetailScreen;
