
import React from 'react';

interface Props {
  onStart: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between p-6 bg-background-light">
      <div className="w-full max-w-[480px] flex flex-col items-center pt-12 text-center">
        <div className="relative flex items-center justify-center mb-6">
          <div className="bg-primary/10 p-5 rounded-full">
            <span className="material-symbols-outlined text-primary text-5xl filled">favorite</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-2xl font-bold">add</span>
            </div>
          </div>
        </div>
        <h2 className="text-primary text-sm font-black tracking-widest uppercase mb-2">Conectar+ Extremo Norte</h2>
        <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Um Novo Propósito</h1>
        <p className="text-slate-600 text-base font-normal leading-normal mt-3 px-8">
          Encontre alguém que compartilha sua fé e construam uma história guiada por Deus.
        </p>

        <div className="w-full mt-10 aspect-video overflow-hidden rounded-xl shadow-sm border border-primary/5 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#004c99 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="z-10 text-center px-6">
            <span className="material-symbols-outlined text-primary/40 text-6xl block mb-2">church</span>
            <p className="text-primary font-bold text-sm">Comunidade Adventista no Bico do Papagaio</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[480px] flex flex-col gap-4 mb-12">
        <button 
          onClick={onStart}
          className="flex items-center justify-center rounded-lg h-14 bg-primary text-white text-base font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
        >
          <span className="truncate">Começar Minha Jornada</span>
        </button>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">
          Conectar+ • Tocantins
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
