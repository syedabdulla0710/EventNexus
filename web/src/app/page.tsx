import Hero from "@/components/home/Hero";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const featuredEvents = await prisma.event.findMany({
    take: 4,
    orderBy: { date: 'asc' },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      
      {/* Featured Events Section placeholder */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Events</h2>
              <p className="text-muted-foreground">Discover the most anticipated events happening soon.</p>
            </div>
            <a href="#" className="hidden text-sm font-semibold text-indigo-500 hover:text-indigo-400 sm:block transition-colors">
              View all events &rarr;
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEvents.length > 0 ? featuredEvents.map((event) => (
              <div key={event.id} className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md">
                <div className="aspect-[4/3] w-full bg-muted/50 overflow-hidden relative">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center text-muted-foreground text-xs">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded-md">{event.category}</span>
                    <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="mb-1 font-semibold text-lg line-clamp-1 group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {event.location}
                  </p>
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <span className="font-semibold text-lg">From ${event.price.toFixed(2)}</span>
                    <button className="text-sm font-medium text-indigo-500 hover:text-indigo-400">Get Tickets</button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-4 text-center py-12 text-muted-foreground">
                No events found. Be the first to create one!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section placeholder */}
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Music', 'Sports', 'Arts & Theater', 'Family', 'Comedy', 'Festivals'].map((cat) => (
              <div key={cat} className="flex h-32 w-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-card shadow-sm transition-all hover:border-indigo-500/50 hover:shadow-md hover:-translate-y-1">
                <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <span className="font-semibold text-sm">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
