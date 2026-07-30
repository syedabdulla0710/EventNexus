import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineChat, HiOutlineLightningBolt } from 'react-icons/hi';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in all required fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Message sent! We\'ll get back to you within 24 hours. 🙌');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-surface-900 dark:text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
            Have a question or need help? We'd love to hear from you. Our team responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: HiOutlineMail, title: 'Email Us', desc: 'hello@eventnexus.in', sub: 'We reply within 24 hours' },
              { icon: HiOutlineChat, title: 'Live Chat', desc: 'Available 9am–6pm IST', sub: 'Mon–Sat on our website' },
              { icon: HiOutlineLightningBolt, title: 'Quick Help', desc: 'Check our Help Center', sub: 'Most answers are there' },
            ].map(item => (
              <div key={item.title} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white text-sm mb-0.5">{item.title}</h3>
                  <p className="text-sm text-primary-500 font-medium">{item.desc}</p>
                  <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Your Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Priya Sharma" className="input-field" />
                </div>
                <div>
                  <label className="input-label">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="priya@example.com" className="input-field" />
                </div>
              </div>
              <div>
                <label className="input-label">Subject</label>
                <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="How can we help you?" className="input-field" />
              </div>
              <div>
                <label className="input-label">Message *</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={6} placeholder="Describe your question or issue in detail..." className="input-field resize-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
