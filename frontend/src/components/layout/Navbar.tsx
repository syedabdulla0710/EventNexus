import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX, HiOutlineSun, HiOutlineMoon, HiOutlineUser, HiOutlineLogout, HiOutlineTicket, HiOutlinePlusCircle } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/create', label: 'Host Event' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-lg py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="section-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            {/* Custom Logo Icon */}
            <div className="relative w-[52px] h-[52px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-orange-400 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg overflow-hidden shrink-0">
              {/* Network background lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <path d="M 10 50 L 35 25 L 35 75 Z" fill="none" stroke="white" strokeWidth="1" />
                <path d="M 35 25 L 80 15" fill="none" stroke="white" strokeWidth="1" />
                <path d="M 35 75 L 80 85" fill="none" stroke="white" strokeWidth="1" />
                <circle cx="35" cy="25" r="3" fill="white" />
                <circle cx="35" cy="75" r="3" fill="white" />
                <circle cx="10" cy="50" r="3" fill="white" />
              </svg>
              {/* Custom 'E' SVG with dot terminals */}
              <svg className="relative w-7 h-7 ml-1 z-10" viewBox="0 0 24 24" fill="white">
                <rect x="3" y="2" width="3" height="20" />
                <rect x="3" y="2" width="12" height="3" />
                <circle cx="15" cy="3.5" r="3" />
                <rect x="3" y="10.5" width="8" height="3" />
                <rect x="3" y="19" width="12" height="3" />
                <circle cx="15" cy="20.5" r="3" />
              </svg>
            </div>
            
            {/* Logo Text */}
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-sans tracking-tight font-medium leading-none mb-1">
                <span className="text-surface-600 dark:text-surface-300">Event</span>
                <span className="text-purple-600 dark:text-[#a855f7]">Nexus</span>
              </div>
              <div className="h-[2px] w-full bg-[#06b6d4] rounded-full mb-1"></div>
              <div className="text-[0.7rem] font-sans font-medium text-surface-500 dark:text-surface-400 tracking-wide">
                The Hub of Global Events
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.username?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                    {user.username}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card p-2 animate-slide-down">
                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 text-sm transition-colors">
                      <HiOutlineTicket className="w-4 h-4" /> My Dashboard
                    </Link>
                    <Link to="/create" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 text-sm transition-colors">
                      <HiOutlinePlusCircle className="w-4 h-4" /> Create Event
                    </Link>
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 text-sm transition-colors">
                      <HiOutlineUser className="w-4 h-4" /> Profile
                    </Link>
                    <hr className="my-2 border-surface-200 dark:border-surface-700" />
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 text-sm transition-colors"
                    >
                      <HiOutlineLogout className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm">Log In</Link>
                <Link to="/register" className="btn-primary text-sm !px-5 !py-2.5">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-surface-500" aria-label="Toggle theme">
              {isDark ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-surface-700 dark:text-surface-300" aria-label="Menu">
              {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-surface-200 dark:border-surface-700" />
              {user ? (
                <>
                  <Link to="/dashboard" className="px-4 py-3 rounded-lg text-sm font-medium text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                    Dashboard
                  </Link>
                  <button onClick={logout} className="px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 text-left hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-4 pt-2">
                  <Link to="/login" className="btn-secondary text-sm text-center">Log In</Link>
                  <Link to="/register" className="btn-primary text-sm text-center">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
