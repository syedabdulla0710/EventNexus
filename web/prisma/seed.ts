import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create an organizer
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {},
    create: {
      email: 'organizer@example.com',
      name: 'Event Live LLC',
      password: hashedPassword,
      role: 'ORGANIZER',
    },
  })
  // Clear existing events so we don't create duplicates
  await prisma.event.deleteMany({})

  // Create sample events
  const events = [
    {
      title: 'Neon Nights Festival',
      description: 'The biggest electronic music festival of the year featuring top DJs from around the world.',
      date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      location: 'Miami, FL',
      price: 199.99,
      capacity: 5000,
      category: 'Music',
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c092bce2848?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      organizerId: organizer.id,
    },
    {
      title: 'Tech Summit 2026',
      description: 'Explore the latest in AI, robotics, and software engineering.',
      date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      location: 'San Jose, CA',
      price: 299.99,
      capacity: 2000,
      category: 'Technology',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      organizerId: organizer.id,
    },
    {
      title: 'Global Marathon',
      description: 'Annual city marathon for professionals and amateurs alike.',
      date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      location: 'Boston, MA',
      price: 45.00,
      capacity: 10000,
      category: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      organizerId: organizer.id,
    },
    {
      title: 'Comedy Central Live',
      description: 'A night of non-stop laughter with the best stand-up comedians.',
      date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      location: 'New York, NY',
      price: 75.00,
      capacity: 500,
      category: 'Comedy',
      imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      organizerId: organizer.id,
    }
  ]

  for (const event of events) {
    await prisma.event.create({
      data: event
    })
  }

  console.log('Database seeded with sample events!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
