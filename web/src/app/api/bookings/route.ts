import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized: Please log in to book tickets." }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { eventId, seats } = await req.json();

    if (!eventId || !seats || seats < 1) {
      return NextResponse.json({ message: "Invalid booking details." }, { status: 400 });
    }

    // Use a transaction to ensure we don't overbook
    const booking = await prisma.$transaction(async (tx) => {
      // 1. Fetch event with current bookings
      const event = await tx.event.findUnique({
        where: { id: eventId },
        include: { bookings: true }
      });

      if (!event) {
        throw new Error("Event not found");
      }

      const bookedSeats = event.bookings.reduce((sum, b) => sum + b.seats, 0);
      const availableSeats = event.capacity - bookedSeats;

      if (seats > availableSeats) {
        throw new Error(`Only ${availableSeats} seats available.`);
      }

      // 2. Create the booking
      const newBooking = await tx.booking.create({
        data: {
          userId,
          eventId,
          seats,
          totalPrice: event.price * seats,
          status: "CONFIRMED", // In a real app, this would be PENDING until payment succeeds
        },
      });

      return newBooking;
    });

    return NextResponse.json({ message: "Booking successful", booking }, { status: 201 });
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json({ message: error.message || "An error occurred during booking." }, { status: 500 });
  }
}
