import React from 'react'
import Link from 'next/link'
import { CalendarDays, MessageCircle, Send, Camera, Briefcase, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <CalendarDays className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                EventNexus
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
              The premier platform for discovering and booking incredible events worldwide. 
              Real-time booking, instant confirmation, and an unforgettable experience.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-indigo-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-indigo-500 transition-colors">
                <Send className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-indigo-500 transition-colors">
                <Camera className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-indigo-500 transition-colors">
                <Briefcase className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">Discover</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Concerts & Gigs</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Festivals</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Sports</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Comedy</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Theater</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">For Organizers</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Sell Tickets</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Event Dashboard</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Scanner App</Link></li>
              <li><Link href="#" className="hover:text-indigo-400 transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">Subscribe</h3>
            <p className="mb-4 text-sm text-muted-foreground">Get weekly updates on the best events near you.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md border border-input bg-background/50 pl-9 pr-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Eventix. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground md:mt-0">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
