import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineHeart } from 'react-icons/hi';
import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thanks for subscribing! 🎉');
      setEmail('');
    }
  };

  const footerLinks = {
    Product: [
      { label: 'Explore Events', to: '/explore' },
      { label: 'Host an Event', to: '/create' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/about' },
      { label: 'Blog', to: '/about' },
    ],
    Resources: [
      { label: 'Help Center', to: '/contact' },
      { label: 'Community', to: '/about' },
      { label: 'API Docs', to: '/about' },
      { label: 'Status', to: '/about' },
    ],
    Legal: [
      { label: 'Privacy Policy', to: '/about' },
      { label: 'Terms of Service', to: '/about' },
      { label: 'Cookie Policy', to: '/about' },
      { label: 'Refund Policy', to: '/about' },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300 mt-auto">
      {/* Gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500" />

      <div className="section-container py-10 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-display font-bold text-white">
                Event<span className="gradient-text">Nexus</span>
              </span>
            </Link>
            <p className="text-surface-400 text-sm mb-6 leading-relaxed">
              Discover extraordinary events or host your own. Join thousands of creators and attendees on India's most loved event platform.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <div className="relative flex-1">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-800 border border-surface-700 rounded-xl text-sm text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                />
              </div>
              <button type="submit" className="px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5">
                Subscribe
              </button>
            </form>
          </div>

          {/* Link Columns — 2x2 grid on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-white font-display font-semibold text-sm mb-3 md:mb-4 uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2 md:space-y-3">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-surface-400 hover:text-primary-400 transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-surface-800 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-500">
            © {new Date().getFullYear()} EventNexus. Made with <HiOutlineHeart className="inline w-4 h-4 text-red-400 mx-1" /> in India.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-primary-500 flex items-center justify-center text-surface-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
