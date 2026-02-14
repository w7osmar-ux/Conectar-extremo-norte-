
import React, { useState, useEffect } from 'react';
import { User, Advertisement } from '../types';
import { MOCK_USERS, MOCK_ADS } from '../constants';

interface Props {
  onBack?: () => void;
}

interface AdminNotification {
  message: string;
  type: 'success' | 'warning' | 'error';
}

interface AdminLog {
  id: string;
  action: string;
  target: string;
  admin: string;
  timestamp: string;
}

const AdminPanel: React.FC<Props> = ({ onBack }) => {
  const [view, setView] = useState<'dashboard' | 'users' | 'ads' | 'logs' | 'profile'>('dashboard');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<AdminNotification | null>(null);
  
  // Estados de Moderação (Simulados)
  const [bannedUserIds, setBannedUserIds] = useState<Set<string>>(new Set());
  const [verifiedUserIds, setVerifiedUserIds] = useState<Set<string>>(new Set(MOCK_USERS.filter(u => u.verified).map(u => u.id)));
  const [warnedUserIds, setWarnedUserIds] = useState<Record<string, number>>({});
  const [logs, setLogs] = useState<AdminLog[]>([
    { id: '1', action: 'Login Administrativo', target: 'Sistema', admin: 'Ricardo (Admin)', timestamp: '10:00' },
    { id: '2', action: 'Verificação Aprovada', target: 'Maria Clara', admin: 'Ricardo (Admin)', timestamp: '09:45' }
  ]);

  // Gestão de Ads
  const [ads, setAds] = useState<Advertisement[]>(MOCK_ADS);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const addLog = (action: string, target: string) => {
    const newLog: AdminLog = {
      id: Date.now().toString(),
      action,
      target,
      admin: 'Ricardo (Admin)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLogs([newLog, ...logs]);
  };

  const handleResetPassword = (e: React.MouseEvent, user: User) => {
    e.stopPropagation();
    const tempPass = "CONECT-" + Math.random().toString(36).slice(-5).toUpperCase();
    if (confirm(`Deseja redefinir a senha de ${user.name}? Uma senha temporária será gerada.`)) {
      showToast(`SENHA GERADA: ${tempPass}`, 'success');
      addLog('Reset de Senha', user.name);
    }
  };

  const handleVerify = (user: User) => {
    setVerifiedUserIds(prev => {
      const next = new Set(prev);
      if (next.has(user.id)) {
        next.delete(user.id);
        showToast(`Verificação removida de ${user.name}`, 'warning');
        addLog('Remoção de Selo', user.name);
      } else {
        next.add(user.id);
        showToast(`${user.name} agora é um membro verificado!`, 'success');
        addLog('Verificação de Perfil', user.name);
      }
      return next;
    });
  };

  const handleBan = (user: User) => {
    if (confirm(`BANIR PERMANENTEMENTE ${user.name}? Esta ação não pode ser desfeita.`)) {
      setBannedUserIds(prev => new Set(prev).add(user.id));
      showToast(`Usuário ${user.name} foi banido do sistema.`, 'error');
      addLog('Banimento', user.name);
      if (view === 'profile') setView('users');
    }
  };

  const handleWarn = (user: User) => {
    setWarnedUserIds(prev => {
      const count = (prev[user.id] || 0) + 1;
      showToast(`Advertência ${count} enviada para ${user.name}`, 'warning');
      addLog(`Advertência (${count})`, user.name);
      return { ...prev, [user.id]: count };
    });
  };

  // --- SUB-COMPONENTES DE VISÃO ---

  const DashboardView = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Grid de Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-primary mb-2 text-3xl">groups</span>
          <p className="text-[10px] font-black uppercase text-slate-400">Total Membros</p>
          <p className="text-2xl font-black dark:text-white">{MOCK_USERS.length + 1450}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-rose-500 mb-2 text-3xl">report</span>
          <p className="text-[10px] font-black uppercase text-slate-400">Denúncias Ativas</p>
          <p className="text-2xl font-black text-rose-600">03</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-amber-500 mb-2 text-3xl">verified</span>
          <p className="text-[10px] font-black uppercase text-slate-400">Verificações Pendentes</p>
          <p className="text-2xl font-black text-amber-600">12</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <span className="material-symbols-outlined text-blue-500 mb-2 text-3xl">campaign</span>
          <p className="text-[10px] font-black uppercase text-slate-400">Alcance de Ads</p>
          <p className="text-2xl font-black text-blue-600">8.4k</p>
        </div>
      </div>

      {/* Atalhos Rápidos */}
      <section className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Ações Frequentes</h3>
        <div className="grid grid-cols-1 gap-3">
          <button onClick={() => setView('ads')} className="flex items-center justify-between p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 transition-transform active:scale-95">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">add_box</span>
              <span className="font-bold text-sm">Criar Novo Anúncio</span>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
          <button onClick={() => setView('users')} className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-2xl shadow-lg transition-transform active:scale-95">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">person_search</span>
              <span className="font-bold text-sm">Auditar Novos Perfis</span>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );

  const UsersView = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl flex items-center gap-2">
        <span className="material-symbols-outlined text-slate-400">search</span>
        <input placeholder="Buscar por nome ou e-mail..." className="bg-transparent border-none focus:ring-0 text-sm w-full dark:text-white" />
      </div>
      
      <div className="space-y-3">
        {MOCK_USERS.filter(u => !bannedUserIds.has(u.id)).map(u => (
          <div 
            key={u.id} 
            onClick={() => { setSelectedUser(u); setView('profile'); }}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={u.images[0]} className="w-12 h-12 rounded-full object-cover" alt="" />
                {verifiedUserIds.has(u.id) && <span className="absolute -bottom-1 -right-1 material-symbols-outlined text-primary bg-white rounded-full text-[12px] filled p-0.5">verified</span>}
              </div>
              <div>
                <p className="font-bold text-sm dark:text-white">{u.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{u.role}</p>
                {warnedUserIds[u.id] > 0 && (
                  <span className="text-[9px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-full font-black uppercase mt-1 inline-block">
                    {warnedUserIds[u.id]} Advertências
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => handleResetPassword(e, u)}
                className="p-2 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-amber-500 rounded-xl transition-colors"
                title="Reset de Senha"
              >
                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
              </button>
              <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileAuditView = () => {
    if (!selectedUser) return null;
    const isVerified = verifiedUserIds.has(selectedUser.id);
    
    return (
      <div className="animate-fade-in pb-20">
        <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
          <img src={selectedUser.images[0]} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-black text-white">{selectedUser.name}, {selectedUser.age}</h2>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{selectedUser.church}</p>
          </div>
        </div>

        <div className="space-y-6">
          <section className="bg-slate-50 dark:bg-slate-900 p-5 rounded-3xl">
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Testemunho Público</h4>
            <p className="text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">"{selectedUser.testimony}"</p>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleVerify(selectedUser)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${isVerified ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-900 text-primary border-primary/20'}`}
            >
              <span className="material-symbols-outlined text-2xl mb-1">{isVerified ? 'verified' : 'new_releases'}</span>
              <span className="text-[9px] font-black uppercase">{isVerified ? 'Verificado' : 'Verificar'}</span>
            </button>
            <button 
              onClick={() => handleWarn(selectedUser)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20"
            >
              <span className="material-symbols-outlined text-2xl mb-1">warning</span>
              <span className="text-[9px] font-black uppercase">Advertir</span>
            </button>
            <button 
              onClick={() => handleBan(selectedUser)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-rose-600 text-white col-span-2 shadow-lg shadow-rose-600/20"
            >
              <span className="material-symbols-outlined text-2xl mb-1">block</span>
              <span className="text-[9px] font-black uppercase">Banir Permanentemente</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const LogsView = () => (
    <div className="space-y-3 animate-fade-in">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Histórico de Atividades</h3>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden divide-y dark:divide-slate-800">
        {logs.map(log => (
          <div key={log.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold dark:text-white">{log.action}</p>
              <p className="text-[10px] text-slate-400">Alvo: <span className="font-bold text-slate-600 dark:text-slate-300">{log.target}</span></p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-primary uppercase">{log.timestamp}</p>
              <p className="text-[8px] text-slate-400">{log.admin}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 transition-colors relative font-display">
      {/* Toast flutuante para avisos de Admin */}
      {notification && (
        <div className={`fixed top-6 left-6 right-6 z-[100] px-6 py-4 rounded-2xl text-xs font-black shadow-2xl flex items-center gap-3 animate-bounce border-2 transition-all ${
          notification.type === 'error' ? 'bg-rose-600 border-rose-400 text-white' : 
          notification.type === 'warning' ? 'bg-amber-500 border-amber-300 text-white' : 
          'bg-primary border-blue-400 text-white'
        }`}>
          <span className="material-symbols-outlined text-xl filled">
            {notification.type === 'error' ? 'security' : notification.type === 'warning' ? 'warning' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className="text-[9px] opacity-70 uppercase tracking-widest">Sistema Administrativo</span>
            <span className="text-sm font-bold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Header Fixo */}
      <header className="bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={view === 'profile' ? () => setView('users') : onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-none">
              {view === 'dashboard' ? 'Painel Admin' : 
               view === 'users' ? 'Moderação' : 
               view === 'profile' ? 'Auditoria' : 
               view === 'ads' ? 'Anúncios' : 'Logs'}
            </h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Conectar+ Extremo Norte</p>
          </div>
        </div>
      </header>

      {/* Navegação Secundária (Tabs) */}
      <nav className="bg-white dark:bg-slate-900 px-4 flex gap-6 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide">
        {[
          { id: 'dashboard', label: 'Início', icon: 'dashboard' },
          { id: 'users', label: 'Usuários', icon: 'group' },
          { id: 'ads', label: 'Anúncios', icon: 'campaign' },
          { id: 'logs', label: 'Logs', icon: 'history' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setView(tab.id as any)}
            className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap ${
              view === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-400'
            }`}
          >
            <span className={`material-symbols-outlined text-sm ${view === tab.id ? 'filled' : ''}`}>{tab.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Conteúdo Dinâmico */}
      <main className="flex-1 overflow-y-auto p-6 pb-24">
        {view === 'dashboard' && <DashboardView />}
        {view === 'users' && <UsersView />}
        {view === 'profile' && <ProfileAuditView />}
        {view === 'logs' && <LogsView />}
        {view === 'ads' && (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/20 text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">campaign</span>
              <h3 className="text-sm font-bold dark:text-white">Central de Publicidade</h3>
              <p className="text-[10px] text-slate-500 mt-1">Gerencie anúncios e avisos para a região do Bico.</p>
            </div>
            {ads.map(ad => (
              <div key={ad.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
                <img src={ad.imageUrl} className="h-24 w-full object-cover" alt="" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm dark:text-white">{ad.title}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{ad.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg"><span className="material-symbols-outlined text-sm">edit</span></button>
                    <button className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-lg"><span className="material-symbols-outlined text-sm">delete</span></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Rodapé Institucional do Admin */}
      <footer className="p-4 text-center bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <p className="text-[8px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.3em]">
          Ambiente de Auditoria • Bico do Papagaio • Versão 1.1.0
        </p>
      </footer>
    </div>
  );
};

export default AdminPanel;
