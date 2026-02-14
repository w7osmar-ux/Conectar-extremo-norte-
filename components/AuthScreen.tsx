
import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
  onAdminAccess: () => void;
}

const AuthScreen: React.FC<Props> = ({ onLogin, onAdminAccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de delay de rede
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 p-6 transition-colors">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-4">
            <span className="material-symbols-outlined text-primary text-4xl filled">church</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {isLogin ? 'Que bom ver você!' : 'Inicie sua jornada'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
            {isLogin 
              ? 'Entre para continuar sua busca por um propósito.' 
              : 'Crie seu perfil e conecte-se com a comunidade do Bico.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome Completo</label>
              <input 
                type="text" 
                required
                placeholder="Ex: João Silva"
                className="w-full bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">E-mail Adventista</label>
            <input 
              type="email" 
              required
              placeholder="seu@email.com"
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Senha</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/20 dark:text-white"
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-xs font-bold text-primary dark:text-blue-400 hover:underline">Esqueceu a senha?</button>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>{isLogin ? 'Entrar Agora' : 'Criar Perfil'}</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-slate-500 font-medium">
            {isLogin ? 'Ainda não tem uma conta?' : 'Já possui uma conta?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-black text-primary dark:text-blue-400"
            >
              {isLogin ? 'Cadastre-se' : 'Faça Login'}
            </button>
          </p>
          
          <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col items-center gap-3">
             <button 
               onClick={onAdminAccess}
               className="text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-slate-700 hover:text-amber-500 transition-colors flex items-center gap-1"
             >
               <span className="material-symbols-outlined text-sm">shield_person</span>
               Acesso Administrativo
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
