import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiHeart, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineUsers, HiOutlineGlobe } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { SeedEvent } from '../../data/seedEvents';

interface EventCardProps {
  event: SeedEvent;
  index?: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index = 0 }) => {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const seatsLeft = event.capacity - event.attendees;
  const fillPercent = (event.attendees / event.capacity) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/events/${event.id}`} className="block group">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1.5">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={imgError ? `https://picsum.photos/seed/${event.id}/800/400` : event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgError(true)}
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="badge bg-white/90 dark:bg-surface-900/90 text-surface-800 dark:text-surface-200 backdrop-blur-sm">
                {event.category}
              </span>
              {event.locationType === 'online' && (
                <span className="badge bg-emerald-500/90 text-white backdrop-blur-sm">
                  <HiOutlineGlobe className="w-3 h-3 mr-1" /> Online
                </span>
              )}
            </div>

            {/* Price tag */}
            <div className="absolute top-3 right-3">
              <span className="badge bg-primary-500/90 text-white backdrop-blur-sm text-sm font-bold">
                {event.price === 0 ? 'Free' : `${event.currency}${event.price.toLocaleString()}`}
              </span>
            </div>

            {/* Save button */}
            <button
              onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
              aria-label={saved ? 'Unsave event' : 'Save event'}
            >
              {saved ? (
                <HiHeart className="w-5 h-5 text-red-500" />
              ) : (
                <HiOutlineHeart className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Date */}
            <div className="flex items-center gap-1.5 text-primary-500 text-sm font-semibold mb-2">
              <HiOutlineCalendar className="w-4 h-4" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
              <span className="text-surface-400 dark:text-surface-500 font-normal">·</span>
              <span className="text-surface-500 dark:text-surface-400 font-normal">{event.time.split(' - ')[0]}</span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
              {event.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-surface-500 dark:text-surface-400 text-sm mb-4">
              <HiOutlineLocationMarker className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-surface-100 dark:border-surface-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={event.hostAvatar}
                    alt={event.hostName}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.hostName)}&background=7C3AED&color=fff&size=24`;
                    }}
                  />
                  <span className="text-xs text-surface-500 dark:text-surface-400">{event.hostName}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-surface-500 dark:text-surface-400">
                  <HiOutlineUsers className="w-3.5 h-3.5" />
                  <span>{seatsLeft > 0 ? `${seatsLeft} spots left` : 'Sold out'}</span>
                </div>
              </div>

              {/* Capacity bar */}
              <div className="w-full h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    fillPercent > 90 ? 'bg-red-500' : fillPercent > 70 ? 'bg-accent-400' : 'bg-primary-500'
                  }`}
                  style={{ width: `${Math.min(fillPercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
