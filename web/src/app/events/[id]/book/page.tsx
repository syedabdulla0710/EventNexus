"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Plus, Minus, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SeatSelectionPage() {
  const [zoom, setZoom] = useState(1)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const toggleSeat = (id: string) => {
    setSelectedSeats(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  // Generate a mock seat map
  const generateRow = (rowId: string, count: number, price: number, isVip = false) => {
    return Array.from({ length: count }).map((_, i) => {
      const id = `${rowId}${i + 1}`
      const isReserved = Math.random() > 0.8
      const isSelected = selectedSeats.includes(id)
      
      let baseClass = "h-8 w-8 m-1 rounded-t-lg transition-all cursor-pointer shadow-sm border-b-4 border-black/20 "
      
      if (isReserved) {
        baseClass += "bg-muted cursor-not-allowed opacity-50"
      } else if (isSelected) {
        baseClass += "bg-indigo-500 scale-110 shadow-indigo-500/50"
      } else if (isVip) {
        baseClass += "bg-amber-400 hover:bg-amber-300 hover:scale-105"
      } else {
        baseClass += "bg-white hover:bg-gray-100 hover:scale-105 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      }

      return (
        <button
          key={id}
          disabled={isReserved}
          onClick={() => toggleSeat(id)}
          className={baseClass}
          title={`${id} - $${price}`}
        />
      )
    })
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/40 px-6">
        <div className="flex items-center gap-4">
          <Link href="/events/1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold">The Eras Tour: Premium Experience</h1>
            <p className="text-xs text-muted-foreground">Madison Square Garden • Oct 24, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">04:59</span>
          <span className="text-xs text-muted-foreground">remaining</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Seat Map Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-muted/20">
          {/* Controls */}
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 rounded-xl border border-border/50 bg-card p-1 shadow-sm">
            <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(z + 0.2, 2))}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}>
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-10 flex gap-4 rounded-xl border border-border/50 bg-card/80 p-3 text-xs backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t bg-white border-b-2 border-black/20 dark:bg-zinc-800" /> Available</div>
            <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t bg-indigo-500 border-b-2 border-black/20" /> Selected</div>
            <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t bg-amber-400 border-b-2 border-black/20" /> VIP</div>
            <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-t bg-muted border-b-2 border-black/20 opacity-50" /> Reserved</div>
          </div>

          {/* Interactive Map (Draggable/Zoomable Canvas Simulator) */}
          <div className="flex h-full w-full items-center justify-center overflow-auto p-12">
            <motion.div 
              drag
              dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
              style={{ scale: zoom }}
              className="flex flex-col items-center gap-8 cursor-grab active:cursor-grabbing"
            >
              {/* Stage */}
              <div className="w-[600px] h-[120px] rounded-b-full bg-gradient-to-b from-indigo-500/20 to-transparent border-t-4 border-indigo-500 flex items-center justify-center font-bold text-indigo-500/50 uppercase tracking-widest text-2xl">
                STAGE
              </div>

              {/* VIP Section */}
              <div className="flex flex-col items-center gap-2 rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 backdrop-blur-sm">
                <span className="mb-2 text-xs font-bold text-amber-500 tracking-widest uppercase">VIP - $450</span>
                <div className="flex">{generateRow('A', 14, 450, true)}</div>
                <div className="flex">{generateRow('B', 16, 450, true)}</div>
                <div className="flex">{generateRow('C', 18, 450, true)}</div>
              </div>

              {/* Premium Section */}
              <div className="flex flex-col items-center gap-2">
                <span className="mb-2 text-xs font-bold text-muted-foreground tracking-widest uppercase">Premium - $220</span>
                <div className="flex">{generateRow('D', 20, 220)}</div>
                <div className="flex">{generateRow('E', 22, 220)}</div>
                <div className="flex">{generateRow('F', 24, 220)}</div>
                <div className="flex">{generateRow('G', 26, 220)}</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sidebar Cart */}
        <div className="w-96 shrink-0 border-l border-border/40 bg-card shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.05)]">
          <div className="flex h-full flex-col p-6">
            <h2 className="text-xl font-bold mb-4">Your Tickets</h2>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <AnimatePresence>
                {selectedSeats.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex h-40 flex-col items-center justify-center text-center text-muted-foreground"
                  >
                    <Info className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">No seats selected yet.<br/>Click on the map to choose your seats.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {selectedSeats.map(seat => {
                      const isVip = seat.startsWith('A') || seat.startsWith('B') || seat.startsWith('C')
                      const price = isVip ? 450 : 220
                      
                      return (
                        <motion.div
                          key={seat}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center justify-between rounded-xl border border-border/50 bg-background p-4 shadow-sm"
                        >
                          <div>
                            <p className="font-semibold text-sm">Row {seat.charAt(0)}, Seat {seat.substring(1)}</p>
                            <p className="text-xs text-muted-foreground">{isVip ? 'VIP Experience' : 'Premium Admission'}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-indigo-500">${price}</span>
                            <button onClick={() => toggleSeat(seat)} className="text-muted-foreground hover:text-red-500 transition-colors">
                              <Minus className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 border-t border-border/50 pt-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ${selectedSeats.reduce((acc, seat) => {
                    return acc + (seat.match(/^[ABC]/) ? 450 : 220)
                  }, 0)}
                </span>
              </div>
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-muted-foreground">Service Fee (10%)</span>
                <span className="font-medium">
                  ${selectedSeats.reduce((acc, seat) => acc + (seat.match(/^[ABC]/) ? 450 : 220), 0) * 0.1}
                </span>
              </div>
              <div className="mb-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-indigo-500">
                  ${selectedSeats.reduce((acc, seat) => acc + (seat.match(/^[ABC]/) ? 450 : 220), 0) * 1.1}
                </span>
              </div>
              <Button 
                size="lg" 
                className="w-full h-14 rounded-xl text-lg font-bold shadow-lg hover:shadow-indigo-500/25"
                disabled={selectedSeats.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
