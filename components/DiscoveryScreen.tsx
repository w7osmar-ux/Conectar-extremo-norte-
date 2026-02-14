
import React, { useState, useEffect } from 'react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';
import { getDailyVerse, getDailyDevotional } from '../services/geminiService';

interface Props {
  onLike: (user: User) => void;
  onOpenFilters: () => void;
}

const DiscoveryScreen: React.FC<Props> = ({ onLike, onOpenFilters }) => {
  const [userIndex, setUserIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [verse, setVerse] = useState("Buscando palavra...");
  const [devotional, setDevotional] = useState<string | null>(null);
  const [showDevotional, setShowDevotional] = useState(false);
  
  const user = MOCK_USERS[userIndex];

  useEffect(() => {
    getDailyVerse().then(setVerse);
    getDailyDevotional().then(setDevotional);
  }, []);

  const nextUser = () => {
    setLastIndex(userIndex);
    setUserIndex((prev) => (prev + 1) % MOCK_USERS.length);
    setPhotoIndex(0);
  };

  const handleRewind = () => {
    if (lastIndex !== null) {
      setUserIndex(lastIndex);
      setLastIndex(null);
      setPhotoIndex(0);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRightSide = x > rect.width / 2;

    if (isRightSide) {
      if (photoIndex < user.images.length - 1) {
        setPhotoIndex(photoIndex + 1);
      }
    } else {
      if (photoIndex > 0) {
        setPhotoIndex(photoIndex - 1);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors">
      <header className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-1 text-primary dark:text-blue-400 cursor-pointer" onClick={onOpenFilters}>
          <span className="material-symbols-outlined text-2xl filled">location_on</span>
          <h1 className="text-xl font-bold tracking-tight">Bico do Papagaio</h1>
          <span className="material-symbols-outlined text-lg">expand_more</span>
        </div>
        <button className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </header>

      <div className="px-6 py-2">
        <div 
          onClick={() => setShowDevotional(!showDevotional)}
          className="bg-primary/5 dark:bg-primary/10 rounded-xl p-3 border border-primary/10 dark:border-primary/20 cursor-pointer transition-all hover:bg-primary/10"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 dark:text-primary/40">Inpiração do Dia</span>
            <span className="material-symbols-outlined text-sm text-primary/40">{showDevotional ? 'expand_less' : 'expand_more'}</span>
          </div>
          <p className="text-primary dark:text-blue-300 text-sm italic leading-tight">
            "{verse.split('—')[0]?.trim()}"
            <span className="block font-semibold mt-1 not-italic opacity-70">— {verse.split('—')[1]?.trim() || 'Biblia'}</span>
          </p>
          
          {showDevotional && devotional && (
            <div className="mt-3 pt-3 border-t border-primary/10 animate-fade-in">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {devotional}
              </p>
            </div>
          )}
        </div>
      </div>

      <main className="flex-1 px-4 py-4 flex flex-col items-center">
        <div 
          onClick={nextPhoto}
          className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group cursor-pointer"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700" 
            style={{ backgroundImage: `url(${user.images[photoIndex]})` }}
          ></div>
          
          <div className="absolute top-3 left-4 right-4 flex gap-1.5 z-20">
            {user.images.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div className={`h-full bg-white transition-all duration-300 ${i <= photoIndex ? 'w-full' : 'w-0'}`}></div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold">{user.name}, {user.age}</h2>
              {user.verified && (
                <span className="material-symbols-outlined text-green-400 text-lg filled">verified</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1 opacity-90 text-sm font-medium">
              <span className="material-symbols-outlined text-sm">church</span>
              <span>{user.church}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {user.tags.slice(0, 3).map(tag => (
                <div key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 mb-4">
          <button 
            onClick={handleRewind}
            disabled={lastIndex === null}
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg text-amber-500 hover:scale-110 active:scale-90 transition-all border border-slate-100 dark:border-slate-700 ${lastIndex === null ? 'opacity-30 grayscale cursor-not-allowed' : ''}`}
            title="Voltar perfil anterior"
          >
            <span className="material-symbols-outlined text-2xl font-bold">settings_backup_restore</span>
          </button>

          <button 
            onClick={nextUser}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl text-rose-500 hover:scale-110 active:scale-90 transition-all border border-slate-100 dark:border-slate-700"
            title="Pular"
          >
            <span className="material-symbols-outlined text-4xl font-bold">close</span>
          </button>

          <button 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg text-blue-400 hover:scale-110 active:scale-90 transition-all border border-slate-100 dark:border-slate-700"
            title="Super Like"
          >
            <span className="material-symbols-outlined text-2xl font-bold filled">star</span>
          </button>

          <button 
            onClick={() => { onLike(user); nextUser(); }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-xl text-white hover:scale-110 active:scale-90 transition-all border-none"
            title="Curtir"
          >
            <span className="material-symbols-outlined text-4xl font-bold filled">favorite</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default DiscoveryScreen;