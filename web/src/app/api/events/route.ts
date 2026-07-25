import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Check if user is organizer or admin (Optional logic based on role)
    // if ((session.user as any).role !== "ORGANIZER" && (session.user as any).role !== "ADMIN") {
    //   return NextResponse.json({ message: "Forbidden: Organizers only" }, { status: 403 });
    // }

    const body = await req.json();
    const { title, description, date, location, price, capacity, category, imageUrl } = body;

    if (!title || !description || !date || !location || price === undefined || !capacity || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        price: parseFloat(price),
        capacity: parseInt(capacity, 10),
        category,
        imageUrl,
        organizerId: userId,
      },
    });

    return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: {
        date: "asc",
      },
      include: {
        organizer: {
          select: {
            name: true,
          }
        }
      }
    });

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
