import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { HiOutlineSearch, HiOutlineArrowRight, HiOutlineStar, HiOutlineLightningBolt, HiOutlineTicket, HiOutlineUserGroup } from 'react-icons/hi';
import EventCard from '../components/events/EventCard';
import { seedEvents, categories, getFeaturedEvents } from '../data/seedEvents';
import { testimonials } from '../data/seedTestimonials';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const featured = getFeaturedEvents();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const stats = [
    { value: 10000, suffix: '+', label: 'Events Hosted', icon: HiOutlineLightningBolt },
    { value: 500000, suffix: '+', label: 'Happy Attendees', icon: HiOutlineUserGroup },
    { value: 120, suffix: '+', label: 'Cities', icon: HiOutlineTicket },
    { value: 4.9, suffix: '★', label: 'Avg. Rating', decimals: 1, icon: HiOutlineStar },
  ];

  const steps = [
    { step: '01', title: 'Discover', desc: 'Browse thousands of curated events across categories, cities, and dates.' },
    { step: '02', title: 'Register', desc: 'Secure your spot in seconds with seamless ticketing and instant confirmation.' },
    { step: '03', title: 'Experience', desc: 'Attend unforgettable events and connect with like-minded people.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-500/10 to-accent-400/10 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
                <HiOutlineLightningBolt className="w-4 h-4" />
                India's #1 Event Platform
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Discover{' '}
              <span className="gradient-text">Extraordinary</span>
              <br />
              Events Near You
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From tech conferences to music festivals, yoga retreats to food fairs — find your next unforgettable experience or host one of your own.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative flex items-center glass-card !rounded-2xl p-2">
                <HiOutlineSearch className="absolute left-5 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search events, categories, or cities..."
                  className="flex-1 pl-12 pr-4 py-3.5 bg-transparent text-surface-900 dark:text-white placeholder-surface-400 focus:outline-none text-base"
                  aria-label="Search events"
                />
                <button type="submit" className="btn-primary !rounded-xl !px-6 !py-3">
                  Search
                </button>
              </div>
            </motion.form>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/explore" className="btn-primary text-base !px-8 !py-3.5">
                Explore Events <HiOutlineArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/create" className="btn-outline text-base !px-8 !py-3.5">
                Host an Event
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-surface-50 dark:bg-surface-900/50">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-3">Browse by Category</h2>
            <p className="text-surface-500 dark:text-surface-400">Find events that match your passion</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={`/explore?category=${encodeURIComponent(cat.name)}`}
                  className="category-chip group !px-5 !py-3 hover:!scale-105 transition-transform"
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED EVENTS ===== */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-2">Featured Events</h2>
              <p className="text-surface-500 dark:text-surface-400">Handpicked experiences you don't want to miss</p>
            </div>
            <Link to="/explore" className="hidden sm:inline-flex btn-ghost text-primary-500 hover:text-primary-600">
              View all <HiOutlineArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/explore" className="btn-outline">View all events</Link>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-3">How It Works</h2>
            <p className="text-surface-500 dark:text-surface-400 max-w-lg mx-auto">Getting started is simple — whether you're attending or hosting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center shadow-glow">
                  <span className="text-white font-display font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white">
                    <CountUp end={stat.value} duration={2.5} separator="," decimals={stat.decimals || 0} enableScrollSpy scrollSpyOnce />
                  </span>
                  <span className="text-2xl sm:text-3xl font-display font-bold text-white/80">{stat.suffix}</span>
                </div>
                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-3">Loved by Thousands</h2>
            <p className="text-surface-500 dark:text-surface-400">Here's what our community has to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="flex text-accent-400 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <HiOutlineStar key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-surface-600 dark:text-surface-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=7C3AED&color=fff`;
                  }} />
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 bg-surface-50 dark:bg-surface-900/50">
        <div className="section-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-12 md:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Create Your Own Event?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                Join thousands of hosts using EventNexus to create, manage, and grow unforgettable events.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/create" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-surface-100 transition-all hover:-translate-y-0.5 shadow-lg">
                  Start Hosting <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/explore" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all">
                  Browse Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
