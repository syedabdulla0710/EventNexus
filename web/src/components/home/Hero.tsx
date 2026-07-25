"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-6 flex items-center justify-center">
            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-md">
              Discover the world's best events
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
            Experiences that <br className="hidden sm:block" /> last a lifetime.
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Book tickets for concerts, sports, theater, and family events in real-time. Unforgettable moments are just a click away.
          </p>

          {/* Search Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl bg-background/50 px-4 py-3 transition-colors hover:bg-background/80 focus-within:bg-background/80">
                <Search className="h-5 w-5 text-indigo-400" />
                <div className="flex w-full flex-col items-start">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Search</span>
                  <input
                    type="text"
                    placeholder="Event, artist, or venue"
                    className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>

              <div className="hidden h-14 w-[1px] bg-white/10 sm:block" />

              <div className="flex flex-1 items-center gap-3 rounded-xl bg-background/50 px-4 py-3 transition-colors hover:bg-background/80 focus-within:bg-background/80">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <div className="flex w-full flex-col items-start">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Location</span>
                  <input
                    type="text"
                    placeholder="New York, NY"
                    className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>

              <div className="hidden h-14 w-[1px] bg-white/10 md:block" />

              <div className="hidden flex-1 items-center gap-3 rounded-xl bg-background/50 px-4 py-3 transition-colors hover:bg-background/80 md:flex">
                <Calendar className="h-5 w-5 text-indigo-400" />
                <div className="flex w-full flex-col items-start">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Date</span>
                  <span className="text-sm font-medium text-muted-foreground/70">Any date</span>
                </div>
              </div>

              <Button size="lg" className="h-auto rounded-xl px-8 text-base font-semibold shadow-lg hover:shadow-indigo-500/25">
                Find Tickets
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground"
          >
            <span>Popular:</span>
            <span className="cursor-pointer hover:text-indigo-400 transition-colors">Taylor Swift</span>
            <span className="cursor-pointer hover:text-indigo-400 transition-colors">Coachella</span>
            <span className="cursor-pointer hover:text-indigo-400 transition-colors">Formula 1</span>
            <span className="cursor-pointer hover:text-indigo-400 transition-colors">Hamilton</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
