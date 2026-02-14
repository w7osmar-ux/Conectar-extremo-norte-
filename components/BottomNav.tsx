
import React from 'react';
import { AppScreen } from '../types';

interface Props {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  likesCount?: number;
}

const BottomNav: React.FC<Props> = ({ currentScreen, onNavigate, likesCount = 0 }) => {
  const tabs = [
    { id: AppScreen.DISCOVERY, label: 'Deslizar', icon: 'style' },
    { id: AppScreen.LIKES, label: 'Curtidas', icon: 'favorite' },
    { id: AppScreen.CHAT_LIST, label: 'Chat', icon: 'forum' },
    { id: AppScreen.PROFILE, label: 'Perfil', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-4 py-3 flex justify-around z-50 transition-colors">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all group min-w-[64px] relative ${
            currentScreen === tab.id ? 'text-primary dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <div className="relative">
            <span className={`material-symbols-outlined text-2xl transition-transform group-active:scale-125 ${currentScreen === tab.id ? 'filled scale-110' : ''}`}>
              {tab.icon}
            </span>
            {tab.id === AppScreen.LIKES && likesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
                {likesCount > 9 ? '9+' : likesCount}
              </span>
            )}
            {tab.id === AppScreen.CHAT_LIST && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary dark:bg-blue-400 rounded-full border border-white dark:border-slate-900"></span>
            )}
          </div>
          <span className={`text-[9px] font-black uppercase tracking-tight`}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
