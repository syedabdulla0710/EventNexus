"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OrganizerDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
    category: "Music",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create event");
      }

      setMessage("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        capacity: "",
        category: "Music",
        imageUrl: "",
      });
      
      // Optionally redirect or refresh
      router.refresh();
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Organizer Dashboard</h1>
      
      <div className="rounded-2xl border border-border/40 bg-background/60 p-8 shadow-xl backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-6">Create New Event</h2>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.includes("success") ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <input name="title" value={formData.title} onChange={handleChange} required className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" placeholder="E.g. Summer Music Festival" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500">
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location / Venue</label>
              <input name="location" value={formData.location} onChange={handleChange} required className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" placeholder="Central Park, NY" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ticket Price ($)</label>
              <input type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} required className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" placeholder="49.99" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Total Capacity (Seats)</label>
              <input type="number" min="1" name="capacity" value={formData.capacity} onChange={handleChange} required className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" placeholder="500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" placeholder="https://example.com/image.jpg" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full rounded-lg border border-input bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500" placeholder="Describe your event..." />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
