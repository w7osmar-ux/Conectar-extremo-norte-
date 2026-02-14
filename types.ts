
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  city: string;
  distance: string;
  images: string[];
  testimony: string;
  church: string;
  role: string;
  tags: string[];
  verified: boolean;
  isInvisible: boolean;
  likesCount?: number;
}

export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  type: 'event' | 'sponsor' | 'system';
  active: boolean;
  clicks: number;
  views: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface ChatThread {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export enum AppScreen {
  WELCOME = 'welcome',
  AUTH = 'auth',
  DISCOVERY = 'discovery',
  LIKES = 'likes',
  CHAT_LIST = 'chat_list',
  CHAT_DETAIL = 'chat_detail',
  PROFILE = 'profile',
  FILTERS = 'filters',
  MATCH = 'match',
  ADMIN = 'admin',
  SETTINGS = 'settings',
  EDIT_PROFILE = 'edit_profile'
}
