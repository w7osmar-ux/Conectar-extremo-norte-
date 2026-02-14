
import React from 'react';
import { CIDADES_BICO } from '../constants';

interface Props {
  onApply: () => void;
}

const FilterScreen: React.FC<Props> = ({ onApply }) => {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 transition-colors">
      <header className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10">
        <button 
          onClick={onApply} 
          className="flex items-center gap-1 text-primary dark:text-blue-400 hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-bold">Voltar</span>
        </button>
        <h2 className="text-base font-black dark:text-white">Filtros</h2>
        <button onClick={onApply} className="text-primary dark:text-blue-400 font-bold text-sm">Pronto</button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Cidades do Bico</h3>
          <div className="flex flex-wrap gap-2">
            {CIDADES_BICO.map(cidade => (
              <button key={cidade} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                cidade === 'Augustinópolis' || cidade === 'Araguatins' 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}>
                {cidade}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Raio de Distância</h3>
            <span className="text-primary dark:text-blue-400 font-black">50 km</span>
          </div>
          <input type="range" className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
        </section>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Critérios de Fé</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary dark:text-blue-400">verified_user</span>
                <span className="font-bold text-sm dark:text-slate-200">Apenas Membros Verificados</span>
              </div>
              <div className="w-10 h-5 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary dark:text-blue-400">volunteer_activism</span>
                <span className="font-bold text-sm dark:text-slate-200">Membros Ativos (Com Cargo)</span>
              </div>
              <div className="w-10 h-5 bg-slate-200 dark:bg-slate-800 rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-4 bg-white dark:bg-slate-900">
        <button className="flex-1 py-3 text-slate-400 dark:text-slate-500 font-bold text-sm">Limpar</button>
        <button onClick={onApply} className="flex-[2] py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all">Aplicar Filtros</button>
      </footer>
    </div>
  );
};

export default FilterScreen;
