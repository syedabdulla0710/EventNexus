import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Search, Filter, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.query === 'string' ? resolvedSearchParams.query : '';
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : '';
  
  const where: any = {};
  
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { location: { contains: query } },
    ];
  }
  
  if (category && category !== 'All') {
    where.category = category;
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: { date: 'asc' },
    include: {
      organizer: {
        select: { name: true }
      }
    }
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Browse Events</h1>
          <p className="text-muted-foreground text-lg">Discover and book the best events around you.</p>
        </div>
        
        {/* Search & Filter Form (Server Action or basic GET form) */}
        <form method="GET" action="/events" className="flex w-full md:w-auto items-center gap-3 bg-background/50 backdrop-blur-xl border border-border/50 p-2 rounded-2xl shadow-sm">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              name="query" 
              defaultValue={query}
              placeholder="Search events, locations..." 
              className="w-full bg-transparent border-none pl-9 pr-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div className="h-8 w-px bg-border/50 hidden md:block"></div>
          <div className="relative flex-1 md:w-40">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select name="category" defaultValue={category} className="w-full bg-transparent border-none pl-9 pr-4 py-2 text-sm focus:outline-none appearance-none">
              <option value="All">All Categories</option>
              <option value="Music">Music</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Comedy">Comedy</option>
            </select>
          </div>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl">
            Search
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? events.map((event) => (
          <div key={event.id} className="group relative overflow-hidden rounded-3xl bg-card border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="aspect-video w-full bg-muted/50 overflow-hidden relative">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 transition-transform duration-700 group-hover:scale-110" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500 text-white shadow-sm backdrop-blur-md">
                  {event.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-500/70" />
                  {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-500/70" />
                  {event.location}
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Starting from</span>
                  <span className="font-bold text-lg">${event.price.toFixed(2)}</span>
                </div>
                <Link href={`/events/${event.id}`}>
                  <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground max-w-md">Try adjusting your search filters or check back later for new events.</p>
          </div>
        )}
      </div>
    </div>
  );
}
