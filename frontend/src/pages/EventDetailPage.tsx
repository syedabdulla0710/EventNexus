import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineUsers, HiOutlineTicket,
  HiOutlineHeart, HiHeart, HiOutlineShare, HiOutlineGlobe, HiOutlineArrowLeft,
  HiOutlineClock, HiOutlineTag
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { getEventById, seedEvents } from '../data/seedEvents';
import EventCard from '../components/events/EventCard';
import EventAIChatbot from '../components/events/EventAIChatbot';
import { useAuth } from '../contexts/AuthContext';
import { getEvent, createEvent, bookSeats, cancelSeats } from '../services/api';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cancelQuantity, setCancelQuantity] = useState(1);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [userBookedSeats, setUserBookedSeats] = useState(0);

  React.useEffect(() => {
    let baseEvent = getEventById(eventId || '');
    
    getEvent(eventId || '').then(res => {
      const be = res.data;
      const userSeats = be.bookings ? Object.values(be.bookings).filter(v => v === user?.username).length : 0;
      
      if (baseEvent) {
        // Merge backend data with seed data
        setEvent({
          ...baseEvent,
          attendees: be.totalSeats - be.availableSeats,
          capacity: be.totalSeats
        });
      } else {
        // Use purely backend data
        setEvent({
          id: be.eventId,
          eventId: be.eventId,
          title: be.name,
          date: be.date,
          location: be.location,
          capacity: be.totalSeats,
          attendees: be.totalSeats - be.availableSeats,
          price: 0,
          currency: '₹',
          description: 'An exciting event hosted by a community member.',
          hostName: 'Organizer',
          hostAvatar: `https://ui-avatars.com/api/?name=Organizer&background=7C3AED&color=fff&size=64`,
          tags: ['Community'],
          category: 'Community',
          coverImage: `https://picsum.photos/seed/${be.eventId}/1200/500`
        });
      }
      
      if (userSeats > 0) {
        setRegistered(true);
        setUserBookedSeats(userSeats);
        setCancelQuantity(userSeats);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Event not found in backend", err);
      // Fallback to purely seed data if backend event doesn't exist yet
      if (baseEvent) {
        setEvent(baseEvent);
      }
      setLoading(false);
    });
  }, [eventId, user]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><span className="text-surface-500">Loading...</span></div>;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-3">Event Not Found</h2>
          <p className="text-surface-500 dark:text-surface-400 mb-6">This event may have been removed or never existed.</p>
          <Link to="/explore" className="btn-primary">Browse Events</Link>
        </div>
      </div>
    );
  }

  const seatsLeft = event.capacity - event.attendees;
  const fillPercent = (event.attendees / event.capacity) * 100;
  const related = seedEvents.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);
  const totalPrice = event.price * quantity;

  const handleRegister = async () => {
    if (!user) {
      toast.error('Please log in to register for events');
      navigate('/login');
      return;
    }
    setRegistering(true);
    try {
      const eId = event.eventId || event.id;
      
      // 1. Ensure event exists in backend database (for seed events)
      try {
        await getEvent(eId);
      } catch (err: any) {
        if (err.response?.status === 404 || err.response?.status === 500) {
          await createEvent({
            eventId: eId,
            name: event.title || event.name,
            date: event.date,
            location: event.locationType === 'online' ? 'Online' : event.location,
            totalSeats: event.capacity || 100,
            availableSeats: event.capacity || 100
          });
        } else {
          throw err;
        }
      }

      // 2. Book the ticket
      const res = await bookSeats(eId, {
        username: user.username,
        seats: quantity
      });

      if (res.data && res.data.success === false) {
        toast.error(`Waitlisted: ${res.data.message}`);
        return;
      }

      setRegistered(true);
      setUserBookedSeats(prev => prev + quantity);
      setCancelQuantity(prev => prev + quantity);
      // Update local event state to reflect new booking
      setEvent((prev: any) => ({
        ...prev,
        attendees: prev.attendees + quantity
      }));
      toast.success(`🎉 You're registered! Check your dashboard for your ticket.`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  const handleCancel = async () => {
    if (!user) return;
    setRegistering(true);
    try {
      const eId = event.eventId || event.id;
      const res = await cancelSeats(eId, {
        username: user.username,
        seats: cancelQuantity
      });

      if (res.data && res.data.success === false) {
        toast.error(`Failed to cancel: ${res.data.message}`);
        return;
      }

      const remaining = userBookedSeats - cancelQuantity;
      setUserBookedSeats(remaining);
      setCancelQuantity(remaining > 0 ? remaining : 1);
      
      if (remaining <= 0) {
        setRegistered(false);
      }

      setEvent((prev: any) => ({
        ...prev,
        attendees: prev.attendees - cancelQuantity
      }));
      toast.success(`Successfully cancelled ${cancelQuantity} seat(s).`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel tickets.');
    } finally {
      setRegistering(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${event.id}/1200/500`; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="section-container">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white mb-3 text-sm transition-colors">
              <HiOutlineArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge bg-primary-500/90 text-white">{event.category}</span>
              {event.locationType === 'online' && (
                <span className="badge bg-emerald-500/90 text-white"><HiOutlineGlobe className="w-3 h-3 mr-1" />Online</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Actions */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white">{event.title}</h1>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setSaved(!saved)} className="p-2.5 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-red-300 transition-colors" aria-label="Save">
                    {saved ? <HiHeart className="w-5 h-5 text-red-500" /> : <HiOutlineHeart className="w-5 h-5 text-surface-500" />}
                  </button>
                  <button onClick={handleShare} className="p-2.5 rounded-xl border border-surface-200 dark:border-surface-700 hover:border-primary-300 transition-colors" aria-label="Share">
                    <HiOutlineShare className="w-5 h-5 text-surface-500" />
                  </button>
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 text-sm">
                <HiOutlineUsers className="w-4 h-4" />
                <span><strong className="text-surface-900 dark:text-white">{event.attendees.toLocaleString()}</strong> people going</span>
              </div>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: HiOutlineCalendar, label: 'Date', value: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                { icon: HiOutlineClock, label: 'Time', value: event.time },
                { icon: HiOutlineLocationMarker, label: 'Location', value: event.location },
                { icon: HiOutlineTag, label: 'Price', value: event.price === 0 ? 'Free' : `${event.currency}${event.price.toLocaleString()} per ticket` },
              ].map(item => (
                <div key={item.label} className="glass-card p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs text-surface-400 dark:text-surface-500 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-4">About This Event</h2>
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>

            {/* Host Card */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-4">Hosted By</h2>
              <div className="flex items-start gap-4">
                <img
                  src={event.hostAvatar}
                  alt={event.hostName}
                  className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.hostName)}&background=7C3AED&color=fff&size=64`; }}
                />
                <div>
                  <h3 className="text-lg font-display font-bold text-surface-900 dark:text-white mb-1">{event.hostName}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{event.hostBio}</p>
                  <button className="mt-3 text-sm text-primary-500 hover:text-primary-600 font-semibold transition-colors">
                    View all events by this host →
                  </button>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.tags?.map((tag: string) => (
                  <span key={tag} className="badge badge-primary px-3 py-1.5 text-sm">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Ticket Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card p-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-display font-bold text-surface-900 dark:text-white">
                  {event.price === 0 ? 'Free' : `${event.currency}${event.price.toLocaleString()}`}
                </p>
                {event.price > 0 && <p className="text-sm text-surface-500 dark:text-surface-400">per ticket</p>}
              </div>

              {/* Capacity indicator */}
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-surface-500 dark:text-surface-400">{event.attendees} going</span>
                  <span className={seatsLeft > 0 ? 'text-emerald-500' : 'text-red-500'}>
                    {seatsLeft > 0 ? `${seatsLeft} spots left` : 'Sold out'}
                  </span>
                </div>
                <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${fillPercent > 90 ? 'bg-red-500' : fillPercent > 70 ? 'bg-accent-400' : 'bg-primary-500'}`}
                    style={{ width: `${Math.min(fillPercent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Quantity selector (Only show if not registered OR if they want to book MORE seats) */}
              {event.price > 0 && seatsLeft > 0 && !registered && (
                <div className="mb-4">
                  <label className="input-label">Quantity</label>
                  <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-11 h-11 flex items-center justify-center text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 text-xl transition-colors">−</button>
                    <span className="flex-1 text-center text-surface-900 dark:text-white font-semibold">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(seatsLeft, Math.min(10, quantity + 1)))} className="w-11 h-11 flex items-center justify-center text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 text-xl transition-colors">+</button>
                  </div>
                </div>
              )}

              {/* Total */}
              {event.price > 0 && !registered && (
                <div className="flex justify-between items-center py-3 border-t border-b border-surface-200 dark:border-surface-700 mb-5">
                  <span className="text-surface-600 dark:text-surface-300 font-medium">Total</span>
                  <span className="text-xl font-display font-bold text-surface-900 dark:text-white">{event.currency}{totalPrice.toLocaleString()}</span>
                </div>
              )}

              {registered ? (
                <div className="text-center py-2">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="font-semibold text-emerald-500 mb-1">You have {userBookedSeats} ticket(s)!</p>
                  
                  <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
                    <label className="input-label text-left">Cancel Tickets</label>
                    <div className="flex gap-2 items-center mb-3">
                      <div className="flex flex-1 items-center border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
                        <button onClick={() => setCancelQuantity(Math.max(1, cancelQuantity - 1))} className="w-10 h-10 flex items-center justify-center text-surface-600 dark:hover:bg-surface-700 transition-colors">−</button>
                        <span className="flex-1 text-center text-surface-900 dark:text-white font-semibold">{cancelQuantity}</span>
                        <button onClick={() => setCancelQuantity(Math.min(userBookedSeats, cancelQuantity + 1))} className="w-10 h-10 flex items-center justify-center text-surface-600 dark:hover:bg-surface-700 transition-colors">+</button>
                      </div>
                      <button onClick={handleCancel} disabled={registering} className="btn-ghost text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 text-sm h-10 rounded-xl">
                        Cancel
                      </button>
                    </div>
                    {seatsLeft > 0 && (
                      <div className="pt-3 border-t border-surface-200 dark:border-surface-700 mt-2">
                        <label className="input-label text-left">Book More</label>
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-1 items-center border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-surface-600 dark:hover:bg-surface-700 transition-colors">−</button>
                            <span className="flex-1 text-center text-surface-900 dark:text-white font-semibold">{quantity}</span>
                            <button onClick={() => setQuantity(Math.min(seatsLeft, Math.min(10, quantity + 1)))} className="w-10 h-10 flex items-center justify-center text-surface-600 dark:hover:bg-surface-700 transition-colors">+</button>
                          </div>
                          <button onClick={handleRegister} disabled={registering} className="btn-primary px-4 py-2 text-sm h-10 rounded-xl">
                            Book
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link to="/dashboard" className="mt-4 btn-secondary w-full text-center text-sm">View in Dashboard</Link>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering || seatsLeft <= 0}
                  className="btn-primary w-full !py-4 text-base"
                >
                  {registering ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : seatsLeft <= 0 ? 'Sold Out' : event.price === 0 ? 'Register for Free' : `Get Tickets`}
                </button>
              )}

              <p className="text-center text-xs text-surface-400 dark:text-surface-500 mt-3">
                <HiOutlineTicket className="inline w-3.5 h-3.5 mr-1" />
                Instant confirmation • No hidden fees
              </p>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-6">Similar Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((ev, i) => <EventCard key={ev.id} event={ev} index={i} />)}
            </div>
          </div>
        )}
      </div>
      
      {/* AI Chatbot */}
      <EventAIChatbot event={event} />
    </div>
  );
};

export default EventDetailPage;
