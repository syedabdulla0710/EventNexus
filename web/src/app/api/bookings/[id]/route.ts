import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const userId = (session.user as any).id;
    const bookingId = resolvedParams.id;

    // Verify the booking belongs to the user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (booking.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId }
    });

    return NextResponse.json({ message: "Booking cancelled successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Cancel booking error:", error);
    return NextResponse.json({ message: "An error occurred while cancelling." }, { status: 500 });
  }
}
