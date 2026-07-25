import React from 'react'
import Link from 'next/link'
import { CalendarDays, Search, MapPin, Menu, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import UserMenu from './UserMenu'

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 glass-dark">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <CalendarDays className="h-5 w-5 text-white" />
          </div>
          <span className="hidden font-bold text-xl tracking-tight sm:inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            EventNexus
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="flex w-full max-w-lg items-center overflow-hidden rounded-full border border-border/50 bg-background/50 pl-4 shadow-sm backdrop-blur transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events, categories..."
              className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <div className="hidden h-6 w-[1px] bg-border sm:block" />
            <div className="hidden items-center px-3 sm:flex">
              <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Anywhere</span>
            </div>
            <button className="h-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              Find
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link href="/organizer">
              <Button variant="ghost" className="text-sm">Create Event</Button>
            </Link>
            
            {!session ? (
              <>
                <Link href="/login">
                  <Button variant="outline" className="text-sm">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button className="text-sm">Sign up</Button>
                </Link>
              </>
            ) : (
              <UserMenu user={session.user || {}} />
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
