
import React from 'react';
import { MOCK_CHATS } from '../constants';
import { User } from '../types';

interface Props {
  onSelectChat: (user: User) => void;
}

const ChatListScreen: React.FC<Props> = ({ onSelectChat }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors">
      <header className="px-6 pt-8 pb-4 border-b border-slate-100 dark:border-slate-800">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Mensagens</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {MOCK_CHATS.map(chat => (
          <div 
            key={chat.id}
            onClick={() => onSelectChat(chat.user)}
            className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border-b border-slate-50 dark:border-slate-800"
          >
            <div className="relative">
              <img src={chat.user.images[0]} alt={chat.user.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/10" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-slate-900 dark:text-white truncate">{chat.user.name}</h3>
                <span className="text-[10px] text-slate-400 font-medium">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {chat.unreadCount}
              </div>
            )}
          </div>
        ))}
        {MOCK_CHATS.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-30 text-center p-10">
            <span className="material-symbols-outlined text-6xl mb-2">forum</span>
            <p className="font-medium">Nenhuma conversa ainda.</p>
            <p className="text-xs">Dê um like em alguém para começar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListScreen;
