import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineViewGrid, HiOutlineViewList, HiOutlineAdjustments } from 'react-icons/hi';
import EventCard from '../components/events/EventCard';
import EventAIChatbot from '../components/events/EventAIChatbot';
import { seedEvents, categories } from '../data/seedEvents';
import { getEvents } from '../services/api';

const BrowseEventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceFilter, setPriceFilter] = useState<'All' | 'Free' | 'Paid'>('All');
  const [locationFilter, setLocationFilter] = useState<'All' | 'online' | 'in-person'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [eventsList, setEventsList] = useState<any[]>([...seedEvents]);

  React.useEffect(() => {
    // Fetch all events from backend to get accurate attendee counts
    getEvents().then(res => {
      const backendEvents = res.data;
      if (!backendEvents || backendEvents.length === 0) return;

      setEventsList(prev => {
        const merged = [...prev];
        backendEvents.forEach((be: any) => {
          const index = merged.findIndex(e => e.id === be.eventId || e.eventId === be.eventId);
          if (index !== -1) {
            // Update existing seed event with accurate backend attendees
            merged[index] = { 
              ...merged[index], 
              attendees: be.totalSeats - be.availableSeats,
              capacity: be.totalSeats 
            };
          } else {
            // Add new custom hosted event to explore page
            merged.push({
              id: be.eventId,
              eventId: be.eventId,
              title: be.name,
              date: be.date,
              time: '12:00 PM - 02:00 PM', // Fallback time since backend doesn't store time explicitly
              location: be.location,
              capacity: be.totalSeats,
              attendees: be.totalSeats - be.availableSeats,
              price: 0,
              currency: '₹',
              category: 'Community',
              tags: ['Community'],
              hostName: 'Organizer',
              hostAvatar: `https://ui-avatars.com/api/?name=Organizer&background=7C3AED&color=fff&size=64`,
              coverImage: `https://picsum.photos/seed/${be.eventId}/1200/500`
            });
          }
        });
        return merged;
      });
    }).catch(err => console.error("Failed to sync backend events", err));
  }, []);

  const filtered = useMemo(() => {
    let result = [...eventsList];
    if (query.trim()) {
      const lq = query.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(lq) ||
        e.category.toLowerCase().includes(lq) ||
        e.location.toLowerCase().includes(lq) ||
        e.tags?.some((t: string) => t.toLowerCase().includes(lq))
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.category === selectedCategory);
    }
    if (priceFilter === 'Free') result = result.filter(e => e.price === 0);
    if (priceFilter === 'Paid') result = result.filter(e => e.price > 0);
    if (locationFilter !== 'All') result = result.filter(e => e.locationType === locationFilter);
    if (sortBy === 'popularity') result.sort((a, b) => b.attendees - a.attendees);
    else result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return result;
  }, [eventsList, query, selectedCategory, priceFilter, locationFilter, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-display font-bold text-surface-900 dark:text-white mb-2">Explore Events</h1>
          <p className="text-surface-500 dark:text-surface-400">Discover {seedEvents.length}+ events happening near you</p>
        </motion.div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search events, categories, or cities..."
            className="input-field !pl-12 !py-4 text-base"
            aria-label="Search events"
          />
        </form>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`category-chip ${selectedCategory === 'All' ? 'category-chip-active' : ''}`}
            >
              All Events
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`category-chip ${selectedCategory === cat.name ? 'category-chip-active' : ''}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* More filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-auto btn-secondary !px-4 !py-2 text-sm flex items-center gap-2"
          >
            <HiOutlineAdjustments className="w-4 h-4" />
            Filters
          </button>

          {/* View Toggle */}
          <div className="flex items-center border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'}`}
              aria-label="Grid view"
            >
              <HiOutlineViewGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'}`}
              aria-label="List view"
            >
              <HiOutlineViewList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card p-5 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div>
              <label className="input-label">Price</label>
              <select value={priceFilter} onChange={e => setPriceFilter(e.target.value as any)} className="input-field !py-2.5">
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div>
              <label className="input-label">Location Type</label>
              <select value={locationFilter} onChange={e => setLocationFilter(e.target.value as any)} className="input-field !py-2.5">
                <option value="All">All</option>
                <option value="in-person">In-Person</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div>
              <label className="input-label">Sort By</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="input-field !py-2.5">
                <option value="date">Date (Soonest)</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setSelectedCategory('All'); setPriceFilter('All'); setLocationFilter('All'); setSortBy('date'); setQuery(''); }}
                className="btn-ghost text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
          Showing <span className="font-semibold text-surface-900 dark:text-white">{filtered.length}</span> events
        </p>

        {/* Events Grid / Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-2">No events found</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button onClick={() => { setQuery(''); setSelectedCategory('All'); setPriceFilter('All'); setLocationFilter('All'); }} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Global AI Chatbot */}
      <EventAIChatbot eventsList={eventsList} />
    </div>
  );
};

export default BrowseEventsPage;
