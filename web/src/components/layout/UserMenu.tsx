"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Ticket, Settings, CalendarRange, LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-all md:flex
          ${isOpen ? "bg-indigo-600/20 border-indigo-500 text-indigo-400 scale-105 shadow-md shadow-indigo-500/20" : "bg-indigo-600/10 border-indigo-500/20 text-indigo-400 hover:scale-105 hover:border-indigo-500/50"}`}
        title={user?.name || "User"}
      >
        <User className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-card border border-border/50 shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
          <div className="p-4 border-b border-border/50 bg-background/50">
            <p className="font-semibold text-sm truncate">{user.name || "User Account"}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email || ""}</p>
          </div>
          
          <div className="p-2 space-y-1">
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              <Ticket className="h-4 w-4" />
              My Tickets
            </Link>
            
            <Link 
              href="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              <User className="h-4 w-4" />
              Profile Settings
            </Link>
            
            <Link 
              href="/organizer" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              <LayoutDashboard className="h-4 w-4" />
              Organizer Dashboard
            </Link>
          </div>
          
          <div className="p-2 border-t border-border/50 bg-background/30">
            <button 
              onClick={() => signOut()}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
