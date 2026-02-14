
import React, { useState, useEffect } from 'react';
import { AppScreen, User } from './types';
import { MOCK_USERS, MOCK_CHATS } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import DiscoveryScreen from './components/DiscoveryScreen';
import LikesScreen from './components/LikesScreen';
import ChatListScreen from './components/ChatListScreen';
import ChatDetailScreen from './components/ChatDetailScreen';
import ProfileScreen from './components/ProfileScreen';
import FilterScreen from './components/FilterScreen';
import SettingsScreen from './components/SettingsScreen';
import EditProfileScreen from './components/EditProfileScreen';
import MatchOverlay from './components/MatchOverlay';
import AdminPanel from './components/AdminPanel';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.WELCOME);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [isAnimatingMatch, setIsAnimatingMatch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[1]); // Ricardo como usuário atual
  
  // Simulando curtidas recebidas
  const [likedBy] = useState<User[]>([MOCK_USERS[0], MOCK_USERS[2]]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navigateTo = (newScreen: AppScreen, user: User | null = null) => {
    if (user) setSelectedUser(user);
    setScreen(newScreen);
  };

  const handleLike = (userToMatch?: User) => {
    if (userToMatch) {
      setSelectedUser(userToMatch);
    }
    
    if (Math.random() > 0.6) {
      setIsAnimatingMatch(true);
      setTimeout(() => {
        setIsAnimatingMatch(false);
        setShowMatch(true);
      }, 2000);
    }
  };

  const toggleInvisibility = () => {
    setCurrentUser(prev => ({
      ...prev,
      isInvisible: !prev.isInvisible
    }));
  };

  if (screen === AppScreen.WELCOME) {
    return <WelcomeScreen onStart={() => setScreen(AppScreen.AUTH)} />;
  }

  if (screen === AppScreen.AUTH) {
    return <AuthScreen 
      onLogin={() => setScreen(AppScreen.DISCOVERY)} 
      onAdminAccess={() => setScreen(AppScreen.ADMIN)} 
    />;
  }

  return (
    <div className={`max-w-md mx-auto min-h-screen ${isDarkMode ? 'bg-background-dark' : 'bg-white'} flex flex-col shadow-2xl relative overflow-hidden transition-colors duration-300`}>
      <div className="flex-1 overflow-y-auto pb-20">
        {screen === AppScreen.DISCOVERY && (
          <DiscoveryScreen 
            onLike={handleLike} 
            onOpenFilters={() => setScreen(AppScreen.FILTERS)}
          />
        )}
        {screen === AppScreen.LIKES && (
          <LikesScreen likedBy={likedBy} />
        )}
        {screen === AppScreen.CHAT_LIST && (
          <ChatListScreen onSelectChat={(u) => navigateTo(AppScreen.CHAT_DETAIL, u)} />
        )}
        {screen === AppScreen.CHAT_DETAIL && selectedUser && (
          <ChatDetailScreen 
            user={selectedUser} 
            onBack={() => setScreen(AppScreen.CHAT_LIST)} 
          />
        )}
        {screen === AppScreen.PROFILE && (
          <ProfileScreen 
            user={currentUser} 
            isDarkMode={isDarkMode}
            likesCount={likedBy.length}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onToggleInvisibility={toggleInvisibility}
            onOpenSettings={() => setScreen(AppScreen.SETTINGS)}
            onEdit={() => setScreen(AppScreen.EDIT_PROFILE)}
          />
        )}
        {screen === AppScreen.SETTINGS && (
          <SettingsScreen 
            onBack={() => setScreen(AppScreen.PROFILE)}
            onLogout={() => setScreen(AppScreen.WELCOME)}
            onOpenAdmin={() => setScreen(AppScreen.ADMIN)}
          />
        )}
        {screen === AppScreen.EDIT_PROFILE && (
          <EditProfileScreen 
            user={currentUser}
            onSave={(updated) => {
              setCurrentUser(updated);
              setScreen(AppScreen.PROFILE);
            }}
            onCancel={() => setScreen(AppScreen.PROFILE)}
          />
        )}
        {screen === AppScreen.FILTERS && (
          <FilterScreen onApply={() => setScreen(AppScreen.DISCOVERY)} />
        )}
        {screen === AppScreen.ADMIN && (
          <AdminPanel onBack={() => setScreen(AppScreen.SETTINGS)} />
        )}
      </div>

      {isAnimatingMatch && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-primary/40 backdrop-blur-sm pointer-events-none">
          <div className="animate-zoom-match flex flex-col items-center">
             <div className="animate-heart-beat">
                <span className="material-symbols-outlined text-[120px] text-white filled shadow-2xl">favorite</span>
             </div>
             <p className="text-white font-black text-2xl uppercase tracking-widest mt-4 drop-shadow-md">Match!</p>
          </div>
        </div>
      )}

      {showMatch && selectedUser && (
        <MatchOverlay 
          user={selectedUser} 
          currentUser={currentUser}
          onClose={() => setShowMatch(false)} 
          onChat={() => {
            setShowMatch(false);
            setScreen(AppScreen.CHAT_DETAIL);
          }}
        />
      )}

      {screen !== AppScreen.CHAT_DETAIL && 
       screen !== AppScreen.FILTERS && 
       screen !== AppScreen.SETTINGS && 
       screen !== AppScreen.EDIT_PROFILE && (
        <BottomNav currentScreen={screen} onNavigate={setScreen} likesCount={likedBy.length} />
      )}
    </div>
  );
};

export default App;
