
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onLogout: () => void;
  onOpenAdmin?: () => void;
}

interface NotificationSettings {
  messages: boolean;
  likes: boolean;
  events: boolean;
  invisible: boolean;
}

const SettingsScreen: React.FC<Props> = ({ onBack, onLogout, onOpenAdmin }) => {
  const [notifs, setNotifs] = useState<NotificationSettings>({
    messages: true,
    likes: true,
    events: true,
    invisible: false
  });

  const toggleNotif = (key: keyof NotificationSettings) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: 'Configurações da Conta',
      items: [
        { icon: 'mail', label: 'E-mail', value: 'ricardo@exemplo.com' },
        { icon: 'phone', label: 'Telefone', value: '(63) 98888-7777' },
        { icon: 'lock', label: 'Alterar Senha' },
      ]
    },
    {
      title: 'Descoberta',
      items: [
        { icon: 'location_searching', label: 'Localização', value: 'Araguatins, TO' },
        { icon: 'straighten', label: 'Distância Máxima', value: '50 km' },
        { icon: 'event', label: 'Faixa Etária', value: '18 - 35' },
      ]
    },
    {
      title: 'Notificações Push',
      description: 'Escolha quais alertas você deseja receber no seu dispositivo.',
      items: [
        { 
          icon: 'chat_bubble', 
          label: 'Novas Mensagens', 
          description: 'Receba um alerta sempre que alguém enviar uma mensagem para você.',
          active: notifs.messages,
          onToggle: () => toggleNotif('messages')
        },
        { 
          icon: 'favorite', 
          label: 'Novas Curtidas', 
          description: 'Saiba imediatamente quando alguém se interessar pelo seu perfil.',
          active: notifs.likes,
          onToggle: () => toggleNotif('likes')
        },
        { 
          icon: 'church', 
          label: 'Eventos da Igreja', 
          description: 'Fique por dentro de JAs, Missões e Congressos na região do Bico.',
          active: notifs.events,
          onToggle: () => toggleNotif('events')
        },
      ]
    },
    {
      title: 'Privacidade e Segurança',
      items: [
        { 
          icon: 'visibility_off', 
          label: 'Ocultar meu Perfil', 
          active: notifs.invisible,
          onToggle: () => toggleNotif('invisible')
        },
        { icon: 'block', label: 'Usuários Bloqueados' },
        { icon: 'verified_user', label: 'Gerenciar Dados' },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="bg-white dark:bg-slate-900 p-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 flex items-center justify-start gap-2">
        <button 
          onClick={onBack} 
          className="flex items-center gap-1 text-primary dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 px-2 py-1 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-bold">Voltar</span>
        </button>
        <h2 className="text-base font-black dark:text-white ml-2">Ajustes</h2>
      </header>

      <div className="flex-1 overflow-y-auto pb-10">
        <div className="mt-6 px-6">
          <button 
            onClick={onOpenAdmin}
            className="w-full p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between group hover:bg-amber-500/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-600">shield_person</span>
              <div className="text-left">
                <p className="text-sm font-black text-amber-900 dark:text-amber-500">Painel do Moderador</p>
                <p className="text-[10px] text-amber-700/70 font-bold uppercase tracking-wider">Gestão Conectar+</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-amber-600 transition-transform group-hover:translate-x-1">chevron_right</span>
          </button>
        </div>

        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mt-6">
            <div className="px-6 mb-2">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {section.title}
              </h3>
              {section.description && (
                <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-0.5 leading-tight">
                  {section.description}
                </p>
              )}
            </div>
            
            <div className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
              {section.items.map((item: any, iIdx) => (
                <div 
                  key={iIdx} 
                  className={`flex flex-col px-6 py-4 ${iIdx !== section.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-xl opacity-70 ${item.active ? 'text-primary dark:text-blue-400' : 'text-slate-400'}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-xs text-slate-400 font-medium">{item.value}</span>}
                      {item.onToggle ? (
                        <button 
                          onClick={item.onToggle}
                          className={`w-11 h-6 rounded-full relative transition-all duration-300 ${item.active ? 'bg-primary shadow-sm shadow-primary/30' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${item.active ? 'left-6' : 'left-1'}`}></div>
                        </button>
                      ) : (
                        <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                      )}
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 ml-8 text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="px-6 mt-10 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full py-4 bg-white dark:bg-slate-900 text-rose-500 font-bold text-sm rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">logout</span> Sair da Conta
          </button>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Conectar+ v1.1.0<br/>
              Extremo Norte • Tocantins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
