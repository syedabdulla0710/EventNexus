import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineArrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';

const plans = [
  {
    name: 'Free', price: '₹0', period: '/month', cta: 'Get Started Free', primary: false,
    desc: 'Perfect for individuals hosting occasional events.',
    features: ['Up to 3 events/month', '100 attendees per event', 'Basic analytics', 'Standard support', 'EventNexus branding'],
  },
  {
    name: 'Pro', price: '₹999', period: '/month', cta: 'Start Pro Trial', primary: true,
    desc: 'For serious hosts who want powerful tools and more reach.',
    features: ['Unlimited events', '1,000 attendees per event', 'Advanced analytics & reports', 'Priority support', 'Custom event page', 'Remove EventNexus branding', 'Email marketing tools'],
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', cta: 'Contact Sales', primary: false,
    desc: 'For large organizations with complex requirements.',
    features: ['Unlimited everything', 'Dedicated account manager', 'White-label solution', 'API access', 'SLA guarantee', 'Custom integrations', 'On-site support'],
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-surface-900 dark:text-white mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
            Start for free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative glass-card p-8 flex flex-col ${plan.primary ? 'ring-2 ring-primary-500 shadow-glow' : ''}`}
            >
              {plan.primary && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-accent-400 text-white text-xs font-bold rounded-full">Most Popular</span>
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-1">{plan.name}</h2>
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold text-surface-900 dark:text-white">{plan.price}</span>
                  <span className="text-surface-400 dark:text-surface-500">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <HiOutlineCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-surface-600 dark:text-surface-300">{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => toast.success(`${plan.name} plan selected!`)}
                className={plan.primary ? 'btn-primary w-full' : 'btn-outline w-full'}>
                {plan.cta} <HiOutlineArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-4">Questions? We've got answers.</h2>
          <p className="text-surface-500 dark:text-surface-400 mb-6">Can't find what you're looking for?</p>
          <Link to="/contact" className="btn-primary">Contact Support <HiOutlineArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
