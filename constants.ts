
import { User, ChatThread, Advertisement } from './types';

export const CIDADES_BICO = [
  "Araguatins", "Araguanã", "Augustinópolis", "Axixá do Tocantins", 
  "Buriti do Tocantins", "Carrasco Bonito", "Esperantina", 
  "Luzinópolis", "Maurilândia do Tocantins", "Nazaré", 
  "Praia Norte", "São Sebastião do Tocantins", "Tocantinópolis"
];

export const MOCK_ADS: Advertisement[] = [
  {
    id: 'ad1',
    title: 'Campori de Unidade 2024',
    imageUrl: 'https://picsum.photos/seed/campori/800/400',
    link: 'https://iasd.org.br/campori',
    type: 'event',
    active: true,
    clicks: 452,
    views: 12500
  },
  {
    id: 'ad2',
    title: 'Livraria CPB Araguatins',
    imageUrl: 'https://picsum.photos/seed/cpb/800/400',
    link: 'https://cpb.com.br',
    type: 'sponsor',
    active: true,
    clicks: 120,
    views: 3400
  }
];

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Maria Clara',
    email: 'maria.clara@iasd.org.br',
    age: 24,
    city: 'Augustinópolis',
    distance: '15 km',
    images: [
      'https://picsum.photos/seed/maria1/600/800',
      'https://picsum.photos/seed/maria2/600/800',
      'https://picsum.photos/seed/maria3/600/800'
    ],
    testimony: 'Nasci em berço adventista e amo o trabalho com Desbravadores. Procuro alguém para servir a Deus juntos.',
    church: 'IASD Central de Augustinópolis',
    role: 'Diretora de Desbravadores',
    tags: ['Música', 'Culinária Veg', 'Missão'],
    verified: true,
    isInvisible: false,
    likesCount: 124
  },
  {
    id: '2',
    name: 'Ricardo Silva',
    email: 'ricardo.silva@adv.com.br',
    age: 29,
    city: 'Araguatins',
    distance: '32 km',
    images: [
      'https://picsum.photos/seed/ricardo1/600/800',
      'https://picsum.photos/seed/ricardo2/600/800',
      'https://picsum.photos/seed/ricardo3/600/800'
    ],
    testimony: 'Software engineer apaixonado pela mensagem do terceiro anjo. Atuo como ancião na minha igreja local.',
    church: 'IASD Araguatins II',
    role: 'Ancião',
    tags: ['Tecnologia', 'Trilha', 'Leitura'],
    verified: true,
    isInvisible: false,
    likesCount: 87
  },
  {
    id: '3',
    name: 'Ana Beatriz',
    email: 'ana.beatriz@educacao.adventista.edu.br',
    age: 22,
    city: 'Tocantinópolis',
    distance: '45 km',
    images: [
      'https://picsum.photos/seed/ana1/600/800',
      'https://picsum.photos/seed/ana2/600/800',
      'https://picsum.photos/seed/ana3/600/800'
    ],
    testimony: 'Estudante de enfermagem e líder de jovens. Acredito que o amor deve ser baseado em princípios celestiais.',
    church: 'IASD Tocantinópolis',
    role: 'Líder de Jovens',
    tags: ['Saúde', 'Voluntariado', 'Piano'],
    verified: false,
    isInvisible: false,
    likesCount: 56
  }
];

export const MOCK_CHATS: ChatThread[] = [
  {
    id: 'chat1',
    user: MOCK_USERS[0],
    lastMessage: 'Feliz Sábado! Você vai no JA hoje?',
    timestamp: '10:42',
    unreadCount: 2
  }
];
