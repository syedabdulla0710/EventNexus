"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BookingFormProps {
  eventId: string;
  price: number;
  availableSeats: number;
}

export default function BookingForm({ eventId, price, availableSeats }: BookingFormProps) {
  const router = useRouter();
  const [seats, setSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBook = async () => {
    if (seats > availableSeats) {
      setError(`Only ${availableSeats} seats available.`);
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, seats }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to book event");
      }

      // In a real app, this would redirect to Stripe Checkout
      // For now, redirect to the user dashboard
      router.push("/dashboard?success=true");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Number of Tickets</label>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSeats(Math.max(1, seats - 1))}
            disabled={seats <= 1}
            className="w-10 h-10 p-0 rounded-full"
          >
            -
          </Button>
          <span className="font-semibold text-xl w-8 text-center">{seats}</span>
          <Button 
            variant="outline" 
            onClick={() => setSeats(Math.min(availableSeats, seats + 1))}
            disabled={seats >= availableSeats}
            className="w-10 h-10 p-0 rounded-full"
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-b border-border/50">
        <span className="font-medium">Total</span>
        <span className="font-bold text-2xl">${(price * seats).toFixed(2)}</span>
      </div>

      <Button 
        onClick={handleBook} 
        disabled={isLoading || availableSeats === 0}
        className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg rounded-xl shadow-lg shadow-indigo-500/20"
      >
        {isLoading ? "Processing..." : availableSeats === 0 ? "Sold Out" : "Book Tickets"}
      </Button>
      
      <p className="text-center text-xs text-muted-foreground">
        Powered by secure checkout. You won't be charged yet.
      </p>
    </div>
  );
}
