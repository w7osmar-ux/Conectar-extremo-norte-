
import React from 'react';
import { User } from '../types';

interface Props {
  user: User;
  currentUser: User;
  onClose: () => void;
  onChat: () => void;
}

const MatchOverlay: React.FC<Props> = ({ user, currentUser, onClose, onChat }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-md flex items-center justify-center p-6 text-white text-center">
      <div className="w-full max-w-sm flex flex-col items-center">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Glória a Deus!</h3>
        <h2 className="text-4xl font-black mb-10 leading-none">Vocês Combinaram!</h2>

        <div className="flex items-center justify-center relative mb-12">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden -mr-6 z-10">
            <img src={currentUser.images[0]} className="w-full h-full object-cover" alt="Eu" />
          </div>
          <div className="absolute z-20 bg-white text-primary rounded-full p-2 shadow-xl transform scale-125">
            <span className="material-symbols-outlined text-2xl filled">favorite</span>
          </div>
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-0">
            <img src={user.images[0]} className="w-full h-full object-cover" alt={user.name} />
          </div>
        </div>

        <p className="text-lg font-medium mb-2">Um novo propósito começa aqui.</p>
        <p className="opacity-70 text-sm italic mb-10">"Que este encontro seja guiado por Deus."</p>

        <div className="w-full space-y-4">
          <button 
            onClick={onChat}
            className="w-full py-4 bg-white text-primary font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">chat</span> Enviar Mensagem
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl active:scale-95 transition-all"
          >
            Continuar Navegando
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchOverlay;
