import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineArrowLeft, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/seedEvents';
import { createEvent } from '../services/api';

const steps = ['Basic Info', 'Date & Location', 'Tickets', 'Review & Publish'];

const CreateEventPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [publishing, setPublishing] = useState(false);

  const [form, setForm] = useState({
    title: '', category: '', description: '', tags: '',
    date: '', time: '', endTime: '', locationType: 'in-person', location: '', onlineLink: '',
    isFree: true, price: '', capacity: '',
    coverImageUrl: '',
  });

  const update = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-3">Sign In Required</h2>
          <p className="text-surface-500 dark:text-surface-400 mb-6">You need to be signed in to create an event.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="btn-primary">Log In</Link>
            <Link to="/register" className="btn-secondary">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePublish = async () => {
    if (!form.title || !form.date || !form.location) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setPublishing(true);
    try {
      const eventId = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
      
      // 1. Save to real backend
      await createEvent({
        eventId: eventId,
        name: form.title,
        date: form.date,
        location: form.locationType === 'online' ? 'Online' : form.location,
        totalSeats: parseInt(form.capacity) || 100,
        availableSeats: parseInt(form.capacity) || 100
      });

      // 2. Save to local storage for "My Events" display
      const key = `hosted_${user?.username}`;
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({
        id: eventId,
        eventId: eventId,
        title: form.title,
        name: form.title,
        date: form.date,
        location: form.locationType === 'online' ? 'Online' : form.location,
        capacity: parseInt(form.capacity) || 100,
        price: form.isFree ? 0 : parseFloat(form.price) || 0,
        isFree: form.isFree,
        attendees: 0,
        coverImage: `https://picsum.photos/seed/${eventId}/800/400`,
        category: form.category
      });
      localStorage.setItem(key, JSON.stringify(existing));

      toast.success('🎉 Your event has been published!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to publish event. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const stepContent = [
    // Step 0: Basic Info
    <div className="space-y-5" key="step0">
      <div>
        <label className="input-label">Event Title *</label>
        <input value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. AI Innovate Summit 2026" className="input-field" />
      </div>
      <div>
        <label className="input-label">Category *</label>
        <select value={form.category} onChange={e => update('category', e.target.value)} className="input-field">
          <option value="">Select a category</option>
          {categories.map(c => <option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="input-label">Description *</label>
        <textarea value={form.description} onChange={e => update('description', e.target.value)} rows={6} placeholder="Describe your event in detail — what will attendees experience?" className="input-field resize-none" />
      </div>
      <div>
        <label className="input-label">Tags (comma separated)</label>
        <input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="e.g. AI, Networking, Tech" className="input-field" />
      </div>
    </div>,

    // Step 1: Date & Location
    <div className="space-y-5" key="step1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="input-label">Event Date *</label>
          <input type="date" value={form.date} onChange={e => update('date', e.target.value)} className="input-field" min={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <label className="input-label">Start Time *</label>
          <input type="time" value={form.time} onChange={e => update('time', e.target.value)} className="input-field" />
        </div>
      </div>
      <div>
        <label className="input-label">Location Type</label>
        <div className="grid grid-cols-2 gap-3">
          {['in-person', 'online'].map(type => (
            <button key={type} onClick={() => update('locationType', type)}
              className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.locationType === type ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-primary-300'}`}
            >
              {type === 'in-person' ? '📍 In-Person' : '🌐 Online'}
            </button>
          ))}
        </div>
      </div>
      {form.locationType === 'in-person' ? (
        <div>
          <label className="input-label">Venue / Address *</label>
          <input value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g. Bengaluru International Exhibition Centre" className="input-field" />
        </div>
      ) : (
        <div>
          <label className="input-label">Meeting Link</label>
          <input value={form.onlineLink} onChange={e => update('onlineLink', e.target.value)} placeholder="e.g. https://zoom.us/j/..." className="input-field" />
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">This link will be shared with registered attendees only</p>
        </div>
      )}
    </div>,

    // Step 2: Tickets
    <div className="space-y-5" key="step2">
      <div>
        <label className="input-label">Ticket Type</label>
        <div className="grid grid-cols-2 gap-3">
          {[{ label: '🎟️ Free', value: true }, { label: '💳 Paid', value: false }].map(opt => (
            <button key={String(opt.value)} onClick={() => update('isFree', opt.value)}
              className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.isFree === opt.value ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-primary-300'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      {!form.isFree && (
        <div>
          <label className="input-label">Ticket Price (₹)</label>
          <input type="number" min="1" value={form.price} onChange={e => update('price', e.target.value)} placeholder="e.g. 999" className="input-field" />
        </div>
      )}
      <div>
        <label className="input-label">Total Capacity *</label>
        <input type="number" min="1" value={form.capacity} onChange={e => update('capacity', e.target.value)} placeholder="e.g. 200" className="input-field" />
      </div>
    </div>,

    // Step 3: Review
    <div className="space-y-4" key="step3">
      <div className="glass-card p-6">
        <h3 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-4">Event Preview</h3>
        <div className="space-y-3">
          {[
            { label: 'Title', value: form.title || '—' },
            { label: 'Category', value: form.category || '—' },
            { label: 'Date', value: form.date ? new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
            { label: 'Time', value: form.time || '—' },
            { label: 'Location', value: form.locationType === 'online' ? `Online: ${form.onlineLink || '—'}` : (form.location || '—') },
            { label: 'Price', value: form.isFree ? 'Free' : `₹${form.price || '—'}` },
            { label: 'Capacity', value: form.capacity ? `${form.capacity} attendees` : '—' },
          ].map(item => (
            <div key={item.label} className="flex items-start justify-between py-2 border-b border-surface-100 dark:border-surface-700 last:border-0">
              <span className="text-sm text-surface-500 dark:text-surface-400">{item.label}</span>
              <span className="text-sm font-semibold text-surface-900 dark:text-white text-right max-w-xs">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-card p-4 border-l-4 border-primary-500">
        <p className="text-sm text-surface-600 dark:text-surface-300">
          By publishing, your event will be visible to all EventNexus users. You can edit event details until the first ticket is sold.
        </p>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-display font-bold text-surface-900 dark:text-white mb-2">Create an Event</h1>
          <p className="text-surface-500 dark:text-surface-400 mb-8">Share your event with thousands of potential attendees</p>

          {/* Step Indicator */}
          <div className="flex items-center mb-10">
            {steps.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i < currentStep ? 'bg-emerald-500 text-white' : i === currentStep ? 'bg-primary-500 text-white ring-4 ring-primary-500/20' : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'
                  }`}>
                    {i < currentStep ? <HiOutlineCheck className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1 font-medium hidden sm:block ${i === currentStep ? 'text-primary-500' : 'text-surface-400 dark:text-surface-500'}`}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${i < currentStep ? 'bg-emerald-500' : 'bg-surface-200 dark:bg-surface-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="glass-card p-8 mb-6">
            <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-6">{steps[currentStep]}</h2>
            {stepContent[currentStep]}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50"
            >
              <HiOutlineArrowLeft className="w-4 h-4" /> Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button onClick={() => setCurrentStep(s => s + 1)} className="btn-primary">
                Continue <HiOutlineArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handlePublish} disabled={publishing} className="btn-primary !bg-emerald-500 hover:!bg-emerald-600">
                {publishing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  <><HiOutlineCheck className="w-4 h-4" /> Publish Event</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEventPage;
