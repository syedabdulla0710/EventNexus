import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';

const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="section-container text-center py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-8xl mb-6">🎪</div>
        <h1 className="text-7xl font-display font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-display font-bold text-surface-900 dark:text-white mb-3">Lost in the event?</h2>
        <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Back to Home <HiOutlineArrowRight className="w-4 h-4" /></Link>
          <Link to="/explore" className="btn-secondary">Explore Events</Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default NotFoundPage;
