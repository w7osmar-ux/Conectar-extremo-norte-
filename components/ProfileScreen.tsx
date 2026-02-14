
import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  user: User;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onToggleInvisibility: () => void;
  onOpenSettings: () => void;
  onEdit: () => void;
  onBack?: () => void;
  isOwnProfile?: boolean;
  likesCount?: number;
}

const ProfileScreen: React.FC<Props> = ({ 
  user, 
  isDarkMode, 
  onToggleTheme, 
  onToggleInvisibility, 
  onOpenSettings, 
  onEdit,
  onBack,
  isOwnProfile = true,
  likesCount
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  // Usamos o prop likesCount se for o próprio perfil, caso contrário o valor do objeto user
  const displayLikes = isOwnProfile ? (likesCount ?? 0) : (user.likesCount ?? 0);

  const handleReport = () => {
    setShowMenu(false);
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-slate-900 transition-colors relative">
      {/* Toast de Sucesso da Denúncia */}
      {reportSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-green-400 filled">check_circle</span>
          Denúncia enviada com sucesso. Obrigado!
        </div>
      )}

      <section className="relative h-96 overflow-hidden">
        <img src={user.images[0]} alt={user.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Header de Ações Rápidas */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          {onBack ? (
            <button onClick={onBack} className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : <div></div>}
          
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/40"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
                {!isOwnProfile && (
                  <button 
                    onClick={handleReport}
                    className="w-full px-4 py-3 text-left text-sm text-rose-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">report</span> Denunciar Perfil
                  </button>
                )}
                <button 
                  onClick={() => setShowMenu(false)}
                  className="w-full px-4 py-3 text-left text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">share</span> Compartilhar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-3 shadow-lg z-20">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-rose-400 filled">favorite</span>
            <span className="text-xs font-black text-white">{displayLikes} curtidas</span>
          </div>
          <div className="w-px h-3 bg-white/20"></div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-blue-400 filled">local_fire_department</span>
            <span className="text-xs font-black text-white">Novo</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">{user.name}, {user.age}</h2>
            {user.verified && (
              <span className="material-symbols-outlined text-primary bg-white rounded-full p-0.5 text-[10px] filled">verified</span>
            )}
          </div>
          <p className="opacity-80 text-sm flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-sm">location_on</span> {user.city}, Tocantins
          </p>
          {isOwnProfile && user.isInvisible && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full">
              <span className="material-symbols-outlined text-[10px] text-amber-400 filled">visibility_off</span>
              <span className="text-[10px] font-bold text-amber-400 uppercase">Perfil Invisível</span>
            </div>
          )}
        </div>
      </section>

      <div className="p-6 space-y-8">
        {/* Resumo de Popularidade */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Curtidas</p>
            <p className="text-xl font-black text-primary dark:text-blue-400">{displayLikes}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Fotos</p>
            <p className="text-xl font-black text-slate-700 dark:text-slate-200">{user.images.length}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
            <div className="flex justify-center">
              <span className="material-symbols-outlined text-green-500 filled">check_circle</span>
            </div>
          </div>
        </div>

        {/* Galeria */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">Galeria de Fotos</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {user.images.map((img, idx) => (
              <div key={idx} className="relative flex-shrink-0 w-32 h-44 rounded-2xl overflow-hidden shadow-md">
                <img src={img} alt={`Foto ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Testemunho */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-base filled">auto_awesome</span> Minha Caminhada
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic border-l-4 border-primary/20 dark:border-primary/40 pl-4">
            "{user.testimony}"
          </p>
        </div>

        {/* Sobre */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">Interesses e Valores</h3>
          <div className="flex flex-wrap gap-2">
            {user.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
              <span className="material-symbols-outlined text-primary text-xl">church</span>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400">Igreja</p>
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200 truncate">{user.church}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl">
              <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
              <div>
                <p className="text-[8px] font-black uppercase text-slate-400">Cargo</p>
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-200">{user.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações ou Segurança */}
        {isOwnProfile ? (
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">Privacidade e Visual</h3>
            <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <span className="material-symbols-outlined text-primary">dark_mode</span>
                  <span className="text-sm font-bold">Modo Escuro</span>
                </div>
                <button 
                  onClick={onToggleTheme}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <span className="material-symbols-outlined text-primary">visibility</span>
                  <span className="text-sm font-bold">Invisível no Feed</span>
                </div>
                <button 
                  onClick={onToggleInvisibility}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${user.isInvisible ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${user.isInvisible ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={onEdit}
                className="py-4 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">edit</span> Editar Perfil
              </button>
              <button 
                onClick={onOpenSettings}
                className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">settings</span> Ajustes
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-8 space-y-6">
            <div className="p-5 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">security</span> Central de Segurança
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Algo não está certo? Denuncie comportamentos que não condizem com nossos valores cristãos para manter nossa comunidade segura.
              </p>
              <button 
                onClick={handleReport}
                className="w-full py-3 bg-white dark:bg-slate-900 text-rose-600 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-colors"
              >
                Denunciar {user.name}
              </button>
            </div>
            
            <button 
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
            >
              Dizer Olá
            </button>
          </div>
        )}
        
        <div className="pb-12 pt-4">
           <p className="text-center text-[10px] text-slate-400 font-medium">
             Membro desde 2024 • Bico do Papagaio
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
