export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    role: 'Event Organizer',
    avatar: 'https://picsum.photos/seed/person1/100/100',
    quote: 'EventNexus transformed how I manage my events. The dashboard analytics and seamless ticketing saved me hours of work. My attendee count doubled within two months!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    role: 'Tech Community Lead',
    avatar: 'https://picsum.photos/seed/person2/100/100',
    quote: 'I discovered my favorite tech conferences and networking events through EventNexus. The search filters are incredibly intuitive, and the booking experience is buttery smooth.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sneha Reddy',
    role: 'Yoga Instructor',
    avatar: 'https://picsum.photos/seed/person3/100/100',
    quote: 'As a wellness coach, I needed a platform that felt premium and trustworthy. EventNexus delivered — my retreat bookings went up 3x and the attendee feedback was phenomenal.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Vikram Singh',
    role: 'Music Producer',
    avatar: 'https://picsum.photos/seed/person4/100/100',
    quote: 'From small gigs to full-scale festivals, EventNexus handles it all. The multi-tier ticketing and real-time seat tracking are game changers for live event management.',
    rating: 5,
  },
];
