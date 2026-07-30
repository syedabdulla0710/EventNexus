import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { HiOutlineTicket, HiOutlineLightningBolt, HiOutlineUser, HiOutlineQrcode, HiOutlinePencil, HiOutlineTrash, HiOutlineCalendar, HiOutlineLocationMarker } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getBookedEvents, deleteEvent } from '../services/api';
import toast from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'tickets' | 'hosted' | 'profile'>('tickets');

  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [myHostedEvents, setMyHostedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (user) {
      // Fetch booked tickets from real backend
      getBookedEvents(user.username)
        .then(res => setMyTickets(res.data))
        .catch(err => console.error("Failed to load tickets", err))
        .finally(() => setLoading(false));

      // Fetch hosted events from localStorage (simulated backend for hosting)
      const hosted = JSON.parse(localStorage.getItem(`hosted_${user.username}`) || '[]');
      setMyHostedEvents(hosted);
    }
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  if (loading) {
    return <div className="min-h-screen pt-32 text-center text-surface-500">Loading your dashboard...</div>;
  }

  const handleDeleteEvent = async (eventId: string, index: number) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    try {
      // 1. Delete from PostgreSQL backend
      await deleteEvent(eventId);
      
      // 2. Remove from LocalStorage (My Events view)
      const hostedKey = `hosted_${user?.username}`;
      const updated = myHostedEvents.filter((_, i) => i !== index);
      localStorage.setItem(hostedKey, JSON.stringify(updated));
      setMyHostedEvents(updated);
      
      toast.success("Event deleted successfully!");
    } catch (err: any) {
      if (err.response?.status === 404) {
        // If it wasn't in the backend for some reason, just clean up localstorage
        const hostedKey = `hosted_${user?.username}`;
        const updated = myHostedEvents.filter((_, i) => i !== index);
        localStorage.setItem(hostedKey, JSON.stringify(updated));
        setMyHostedEvents(updated);
        toast.success("Event removed locally.");
      } else {
        console.error("Failed to delete event:", err);
        toast.error("Failed to delete event.");
      }
    }
  };

  const tabs = [
    { id: 'tickets', label: 'My Tickets', icon: HiOutlineTicket },
    { id: 'hosted', label: 'My Events', icon: HiOutlineLightningBolt },
    { id: 'profile', label: 'Profile', icon: HiOutlineUser },
  ] as const;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white text-2xl font-bold font-display">
              {user.username?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-surface-900 dark:text-white">Welcome back, {user.username}! 👋</h1>
              <p className="text-surface-500 dark:text-surface-400">Manage your events and tickets</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Nav */}
        <div className="flex gap-2 mb-8 border-b border-surface-200 dark:border-surface-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-all ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* My Tickets Tab */}
        {activeTab === 'tickets' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {myTickets.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">No tickets yet</h3>
                <p className="text-surface-500 dark:text-surface-400 mb-6">Discover amazing events and grab your first ticket!</p>
                <Link to="/explore" className="btn-primary">Explore Events</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {myTickets.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="glass-card overflow-hidden"
                  >
                    <div className="h-32 overflow-hidden">
                      <img src={event.coverImageUrl || `https://picsum.photos/seed/${event.eventId || event.id}/400/200`} alt={event.name || event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <span className="badge badge-primary text-xs mb-2">{event.category || 'Event'}</span>
                      <h3 className="font-display font-bold text-surface-900 dark:text-white mb-2 line-clamp-1">{event.name || event.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 mb-1">
                        <HiOutlineCalendar className="w-3.5 h-3.5" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400 mb-4">
                        <HiOutlineLocationMarker className="w-3.5 h-3.5" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                          <HiOutlineQrcode className="w-4 h-4" /> View Ticket
                        </div>
                        <Link to={`/events/${event.eventId || event.id}`} className="text-xs text-primary-500 hover:text-primary-600 font-semibold">Details →</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* My Hosted Events Tab */}
        {activeTab === 'hosted' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-surface-500 dark:text-surface-400">{myHostedEvents.length} events hosted</p>
              <Link to="/create" className="btn-primary text-sm">+ Create New Event</Link>
            </div>
            {myHostedEvents.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">No events hosted yet</h3>
                <p className="text-surface-500 dark:text-surface-400 mb-6">Create your first event and start building your audience!</p>
                <Link to="/create" className="btn-primary">Create Event</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myHostedEvents.map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    <Link to={`/events/${event.eventId || event.id}`} className="flex-shrink-0">
                      <img src={event.coverImageUrl || `https://picsum.photos/seed/${event.eventId || event.id}/200/100`} alt={event.name || event.title} className="w-full sm:w-24 h-20 sm:h-16 object-cover rounded-xl hover:opacity-80 transition-opacity" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/events/${event.eventId || event.id}`} className="hover:text-primary-500 transition-colors">
                        <h3 className="font-display font-bold text-surface-900 dark:text-white mb-1 truncate">{event.name || event.title}</h3>
                      </Link>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-surface-500 dark:text-surface-400">
                        <span><HiOutlineCalendar className="inline w-3.5 h-3.5 mr-1" />{new Date(event.date).toLocaleDateString()}</span>
                        <span><HiOutlineUser className="inline w-3.5 h-3.5 mr-1" />0 / {event.totalSeats || event.capacity} registered</span>
                        <span className="text-emerald-500 font-semibold">
                          {event.price === 0 || event.isFree ? 'Free' : `₹0 revenue`}
                        </span>
                      </div>
                      {/* Mini progress bar */}
                      <div className="w-full max-w-xs h-1 bg-surface-100 dark:bg-surface-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `0%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toast.success("Event editing coming soon!")} className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 text-primary-500 transition-colors" aria-label="Edit">
                        <HiOutlinePencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteEvent(event.eventId || event.id, i)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors" aria-label="Delete">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <div className="glass-card p-8 space-y-6">
              <div>
                <label className="input-label">Username</label>
                <input defaultValue={user.username} className="input-field" />
              </div>
              <div>
                <label className="input-label">Bio</label>
                <textarea rows={3} placeholder="Tell attendees a bit about yourself..." className="input-field resize-none" />
              </div>
              <div>
                <label className="input-label">Twitter / X</label>
                <input placeholder="@username" className="input-field" />
              </div>
              <div>
                <label className="input-label">LinkedIn</label>
                <input placeholder="https://linkedin.com/in/..." className="input-field" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-700">
                <button className="btn-primary">Save Changes</button>
                <button onClick={logout} className="btn-ghost text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Sign Out</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
