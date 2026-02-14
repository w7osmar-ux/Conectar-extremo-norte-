
import React from 'react';
import { User } from '../types';

interface Props {
  likedBy: User[];
}

const LikesScreen: React.FC<Props> = ({ likedBy }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 transition-colors">
      <header className="px-6 pt-8 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Interessados</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pessoas que querem te conhecer</p>
        </div>
        <div className="bg-primary/10 dark:bg-blue-400/10 px-3 py-1.5 rounded-full border border-primary/20 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm text-primary dark:text-blue-400 filled">favorite</span>
          <span className="text-xs font-black text-primary dark:text-blue-400">{likedBy.length}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {likedBy.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-br from-primary to-blue-700 rounded-2xl shadow-lg shadow-primary/20 text-white relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
               <span className="material-symbols-outlined text-8xl filled">favorite</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Status de Popularidade</p>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Você tem {likedBy.length} {likedBy.length === 1 ? 'curtida' : 'curtidas'}!
            </h2>
            <p className="text-xs opacity-90 mt-1 font-medium italic">"Muitos propósitos no coração do homem..."</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {likedBy.map((user, index) => (
            <div key={user.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md group border border-slate-100 dark:border-slate-800">
              <img src={user.images[0]} alt={user.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-2 right-2">
                 <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/20 text-[8px] font-black text-white uppercase tracking-tighter">
                   Novo
                 </div>
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-bold text-sm leading-tight">{user.name}, {user.age}</p>
                <p className="text-[10px] opacity-80 flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[10px]">location_on</span>
                  {user.city}
                </p>
              </div>

              {/* Indicador visual de destaque para a primeira curtida */}
              {index === 0 && (
                <div className="absolute inset-0 bg-primary/10 pointer-events-none ring-2 ring-primary/40 ring-inset"></div>
              )}
            </div>
          ))}
          
          <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-4 text-center group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-600 text-3xl">add_reaction</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-tight">
              Continue deslizando<br/>para ganhar mais
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikesScreen;
