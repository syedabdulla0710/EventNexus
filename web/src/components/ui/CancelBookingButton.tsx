"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface CancelBookingButtonProps {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const router = useRouter();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this ticket? This action cannot be undone.")) {
      return;
    }

    setIsCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel the ticket.");
      setIsCancelling(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleCancel}
      disabled={isCancelling}
      className="text-red-500 hover:text-red-400 hover:bg-transparent px-2 gap-1.5 h-auto py-1"
    >
      <XCircle className="h-4 w-4" />
      {isCancelling ? "Cancelling..." : "Cancel Ticket"}
    </Button>
  );
}
