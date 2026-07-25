import React from "react";
import { PrismaClient } from "@prisma/client";
import { Calendar, MapPin, Tag, Users, Clock } from "lucide-react";
import BookingForm from "./BookingForm";

const prisma = new PrismaClient();

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = await prisma.event.findUnique({
    where: { id: resolvedParams.id },
    include: {
      organizer: {
        select: { name: true }
      },
      bookings: {
        select: { seats: true }
      }
    }
  });

  if (!event) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground">The event you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const bookedSeats = event.bookings.reduce((sum, booking) => sum + booking.seats, 0);
  const availableSeats = event.capacity - bookedSeats;

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Event Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video w-full rounded-3xl bg-muted overflow-hidden relative shadow-lg">
             {event.imageUrl ? (
               <img src={event.imageUrl} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
             ) : (
               <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
             <div className="absolute bottom-6 left-6 z-20">
               <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-indigo-500 text-white shadow-sm backdrop-blur-md">
                 {event.category}
               </span>
             </div>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{event.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card border border-border/40 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Date and Time</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">About the Organizer</h3>
            <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-border/40">
              <div className="h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {event.organizer.name?.charAt(0) || "O"}
              </div>
              <div>
                <p className="font-semibold text-lg">{event.organizer.name}</p>
                <p className="text-sm text-muted-foreground">Verified Organizer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border/40 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
            <div className="mb-6 pb-6 border-b border-border/50">
              <h3 className="text-3xl font-bold tracking-tight mb-2">${event.price.toFixed(2)}</h3>
              <p className="text-muted-foreground">per person</p>
            </div>
            
            <BookingForm eventId={event.id} price={event.price} availableSeats={availableSeats} />
            
            <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Capacity
                </span>
                <span className="font-medium">{event.capacity} seats</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Available
                </span>
                <span className={`font-medium ${availableSeats < 10 ? 'text-red-400' : 'text-green-400'}`}>
                  {availableSeats} left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
