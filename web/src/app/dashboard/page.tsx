import React from "react";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import CancelBookingButton from "@/components/ui/CancelBookingButton";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: {
      event: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">My Tickets</h1>
          <p className="text-muted-foreground text-lg">Manage your upcoming events and bookings.</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-card border border-border/50 rounded-3xl">
          <div className="h-16 w-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 text-indigo-500">
            <Ticket className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
          <p className="text-muted-foreground mb-6">Looks like you haven't booked any events.</p>
          <Link href="/events" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex flex-col sm:flex-row bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors shadow-sm">
              <div className="sm:w-1/3 bg-indigo-500/10 flex flex-col items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-border/50">
                <span className="text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-1">
                  {new Date(booking.event.date).toLocaleDateString(undefined, { month: 'short' })}
                </span>
                <span className="text-4xl font-bold text-foreground">
                  {new Date(booking.event.date).getDate()}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                      {booking.status}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {booking.seats} {booking.seats === 1 ? 'Ticket' : 'Tickets'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-1">
                    {booking.event.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" />
                      {new Date(booking.event.date).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="line-clamp-1">{booking.event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-semibold">${booking.totalPrice.toFixed(2)}</span>
                  <div className="flex items-center gap-3">
                    <CancelBookingButton bookingId={booking.id} />
                    <Link href={`/events/${booking.eventId}`} className="text-sm font-medium text-indigo-500 hover:text-indigo-400">
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
