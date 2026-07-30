export interface SeedEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'in-person' | 'online';
  price: number;
  currency: string;
  category: string;
  hostName: string;
  hostAvatar: string;
  hostBio: string;
  coverImage: string;
  capacity: number;
  attendees: number;
  tags: string[];
  featured: boolean;
}

export const categories = [
  { name: 'Music', icon: '🎵', color: 'from-pink-500 to-rose-500' },
  { name: 'Tech', icon: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Business', icon: '💼', color: 'from-emerald-500 to-teal-500' },
  { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-amber-500' },
  { name: 'Arts', icon: '🎨', color: 'from-purple-500 to-violet-500' },
  { name: 'Food & Drink', icon: '🍷', color: 'from-red-500 to-pink-500' },
  { name: 'Education', icon: '📚', color: 'from-indigo-500 to-blue-500' },
  { name: 'Networking', icon: '🤝', color: 'from-teal-500 to-emerald-500' },
];

export const seedEvents: SeedEvent[] = [
  {
    id: 'evt-001',
    title: 'AI Innovate Summit 2026',
    description: 'Join 2,000+ innovators, researchers, and tech leaders for the most anticipated AI conference of the year. Featuring keynotes from leading AI labs, hands-on workshops on generative AI, responsible AI panels, and unparalleled networking opportunities. Explore the future of artificial intelligence across healthcare, finance, creative industries, and more.',
    date: '2026-09-15',
    time: '09:00 AM - 06:00 PM',
    location: 'Bengaluru International Exhibition Centre, Bengaluru',
    locationType: 'in-person',
    price: 2999,
    currency: '₹',
    category: 'Tech',
    hostName: 'TechForward India',
    hostAvatar: 'https://picsum.photos/seed/host1/100/100',
    hostBio: 'India\'s premier technology events organizer, hosting 50+ conferences annually across AI, Cloud, and DevOps.',
    coverImage: 'https://picsum.photos/seed/ai-summit/800/400',
    capacity: 2000,
    attendees: 1847,
    tags: ['Tech', 'AI', 'Machine Learning', 'Conference'],
    featured: true,
  },
  {
    id: 'evt-002',
    title: 'Sunset Sounds Music Festival',
    description: 'Experience three days of incredible live music across 4 stages featuring over 30 artists spanning indie rock, electronic, hip-hop, and world music. Set against the stunning backdrop of the Goa coastline with curated food courts, art installations, and sunset DJ sessions. VIP packages include backstage access and exclusive lounges.',
    date: '2026-10-22',
    time: '04:00 PM - 11:00 PM',
    location: 'Vagator Beach, Goa',
    locationType: 'in-person',
    price: 4500,
    currency: '₹',
    category: 'Music',
    hostName: 'SoundWave Productions',
    hostAvatar: 'https://picsum.photos/seed/host2/100/100',
    hostBio: 'Curating unforgettable music experiences since 2018. Over 200K+ happy festival-goers.',
    coverImage: 'https://picsum.photos/seed/music-fest/800/400',
    capacity: 5000,
    attendees: 4231,
    tags: ['Music', 'Festival', 'Live Music', 'Outdoor'],
    featured: true,
  },
  {
    id: 'evt-003',
    title: 'Startup Founders Mixer',
    description: 'Connect with 200+ startup founders, angel investors, and VCs in an intimate evening of curated networking. Featuring lightning pitch rounds, a fireside chat with a unicorn founder, and structured speed-networking sessions. Whether you\'re pre-seed or Series B, this is where your next partnership begins.',
    date: '2026-08-28',
    time: '06:30 PM - 10:00 PM',
    location: 'WeWork Galaxy, Residency Road, Bengaluru',
    locationType: 'in-person',
    price: 999,
    currency: '₹',
    category: 'Networking',
    hostName: 'StartupHub Bengaluru',
    hostAvatar: 'https://picsum.photos/seed/host3/100/100',
    hostBio: 'Building the largest startup community in South India. 15K+ members strong.',
    coverImage: 'https://picsum.photos/seed/startup-mixer/800/400',
    capacity: 200,
    attendees: 178,
    tags: ['Networking', 'Startup', 'Investors', 'Pitch'],
    featured: true,
  },
  {
    id: 'evt-004',
    title: 'Zen Flow Yoga Retreat',
    description: 'Escape the city for a transformative weekend of yoga, meditation, and holistic wellness. Set in a serene hilltop retreat surrounded by nature, enjoy daily sunrise yoga, guided meditation, Ayurvedic cooking classes, sound healing sessions, and nature walks. All meals included — fully organic, plant-based cuisine.',
    date: '2026-09-05',
    time: '06:00 AM - 08:00 PM',
    location: 'Atmantan Wellness Centre, Pune',
    locationType: 'in-person',
    price: 7500,
    currency: '₹',
    category: 'Sports',
    hostName: 'MindBody Collective',
    hostAvatar: 'https://picsum.photos/seed/host4/100/100',
    hostBio: 'Certified yoga instructors and wellness coaches dedicated to mindful living.',
    coverImage: 'https://picsum.photos/seed/yoga-retreat/800/400',
    capacity: 50,
    attendees: 42,
    tags: ['Sports', 'Yoga', 'Wellness', 'Meditation'],
    featured: true,
  },
  {
    id: 'evt-005',
    title: 'Wine & Dine Experience',
    description: 'An exclusive evening of premium wine tasting paired with a 7-course gourmet meal crafted by Michelin-starred Chef Rahul Sharma. Sample rare vintages from Sula, Grover, and international estates while learning about terroir, tasting techniques, and food-wine harmony. Limited to 60 guests for an intimate experience.',
    date: '2026-09-20',
    time: '07:00 PM - 11:00 PM',
    location: 'The Leela Palace, New Delhi',
    locationType: 'in-person',
    price: 5500,
    currency: '₹',
    category: 'Food & Drink',
    hostName: 'Epicurean Society',
    hostAvatar: 'https://picsum.photos/seed/host5/100/100',
    hostBio: 'Premium food & wine experiences for discerning palates. Every event is a celebration.',
    coverImage: 'https://picsum.photos/seed/wine-dine/800/400',
    capacity: 60,
    attendees: 54,
    tags: ['Food & Drink', 'Wine', 'Gourmet', 'Fine Dining'],
    featured: true,
  },
  {
    id: 'evt-006',
    title: 'Mumbai Marathon 2026',
    description: 'Lace up for Mumbai\'s biggest charity marathon! Choose from Full Marathon (42.195 km), Half Marathon (21.1 km), or Fun Run (5 km). All proceeds support education initiatives for underprivileged children. Includes race kit, timing chip, finisher medal, and post-race celebration with live music and refreshments.',
    date: '2026-11-10',
    time: '05:30 AM - 12:00 PM',
    location: 'Starting Line: Chhatrapati Shivaji Terminus, Mumbai',
    locationType: 'in-person',
    price: 1200,
    currency: '₹',
    category: 'Sports',
    hostName: 'RunIndia Foundation',
    hostAvatar: 'https://picsum.photos/seed/host6/100/100',
    hostBio: 'Promoting fitness and philanthropy through running events across India since 2012.',
    coverImage: 'https://picsum.photos/seed/marathon/800/400',
    capacity: 10000,
    attendees: 8456,
    tags: ['Sports', 'Marathon', 'Charity', 'Fitness'],
    featured: true,
  },
  {
    id: 'evt-007',
    title: 'Future of Design Webinar',
    description: 'A free online masterclass on the intersection of AI and design. Learn how designers at Google, Apple, and Figma are using generative AI to supercharge their workflows. Topics include AI-assisted prototyping, prompt-driven UI generation, ethical design in the AI era, and the evolving role of the designer. Live Q&A included.',
    date: '2026-08-18',
    time: '11:00 AM - 01:00 PM',
    location: 'Zoom (Link sent upon registration)',
    locationType: 'online',
    price: 0,
    currency: '₹',
    category: 'Education',
    hostName: 'DesignLab Academy',
    hostAvatar: 'https://picsum.photos/seed/host7/100/100',
    hostBio: 'Online design education platform with 50K+ students worldwide.',
    coverImage: 'https://picsum.photos/seed/design-webinar/800/400',
    capacity: 500,
    attendees: 312,
    tags: ['Education', 'Design', 'AI', 'Webinar', 'Free'],
    featured: false,
  },
  {
    id: 'evt-008',
    title: 'Canvas & Colors Art Exhibition',
    description: 'Step into a curated world of contemporary Indian art featuring 40+ works by emerging and established artists. From abstract expressionism to digital art installations, this exhibition celebrates the diversity of Indian creative expression. Opening night includes a guided tour by curator Priya Menon, cocktails, and a live painting performance.',
    date: '2026-09-12',
    time: '05:00 PM - 09:00 PM',
    location: 'National Gallery of Modern Art, Mumbai',
    locationType: 'in-person',
    price: 800,
    currency: '₹',
    category: 'Arts',
    hostName: 'ArtVista Collective',
    hostAvatar: 'https://picsum.photos/seed/host8/100/100',
    hostBio: 'Connecting art lovers with emerging Indian artists through immersive gallery experiences.',
    coverImage: 'https://picsum.photos/seed/art-exhibit/800/400',
    capacity: 150,
    attendees: 98,
    tags: ['Arts', 'Exhibition', 'Contemporary', 'Gallery'],
    featured: false,
  },
  {
    id: 'evt-009',
    title: 'Cloud Native DevOps Bootcamp',
    description: 'An intensive 2-day hands-on bootcamp covering Kubernetes, Docker, CI/CD pipelines, Infrastructure as Code (Terraform), and GitOps. Build production-grade deployments from scratch with expert mentors guiding every step. Walk away with a portfolio of real-world projects and a certificate of completion.',
    date: '2026-10-05',
    time: '09:00 AM - 05:00 PM',
    location: 'T-Hub, Hyderabad',
    locationType: 'in-person',
    price: 3500,
    currency: '₹',
    category: 'Education',
    hostName: 'CloudCraft Academy',
    hostAvatar: 'https://picsum.photos/seed/host9/100/100',
    hostBio: 'Hands-on tech education focused on cloud-native technologies. 10K+ engineers trained.',
    coverImage: 'https://picsum.photos/seed/devops-bootcamp/800/400',
    capacity: 100,
    attendees: 76,
    tags: ['Education', 'DevOps', 'Cloud', 'Kubernetes'],
    featured: false,
  },
  {
    id: 'evt-010',
    title: 'Gourmet Street Food Festival',
    description: 'India\'s most loved street food — reimagined! Over 50 vendors serving gourmet versions of pani puri, vada pav, momos, dosa, and more. Live cooking demonstrations, a chili-eating contest, craft beer garden, and a dessert alley. Family-friendly with a dedicated kids\' play zone and live Bollywood music.',
    date: '2026-10-15',
    time: '11:00 AM - 10:00 PM',
    location: 'Jawaharlal Nehru Stadium Grounds, Delhi',
    locationType: 'in-person',
    price: 500,
    currency: '₹',
    category: 'Food & Drink',
    hostName: 'FoodieNation India',
    hostAvatar: 'https://picsum.photos/seed/host10/100/100',
    hostBio: 'India\'s largest food festival organizers. 1M+ foodies served across 30+ cities.',
    coverImage: 'https://picsum.photos/seed/street-food/800/400',
    capacity: 3000,
    attendees: 2156,
    tags: ['Food & Drink', 'Street Food', 'Festival', 'Family'],
    featured: false,
  },
];

export const getEventById = (id: string): SeedEvent | undefined => {
  return seedEvents.find(e => e.id === id);
};

export const getFeaturedEvents = (): SeedEvent[] => {
  return seedEvents.filter(e => e.featured);
};

export const getEventsByCategory = (category: string): SeedEvent[] => {
  if (category === 'All') return seedEvents;
  return seedEvents.filter(e => e.category === category);
};
