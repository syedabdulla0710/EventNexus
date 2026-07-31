import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { login as apiLogin } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const errs: any = {};
    if (!form.username.trim()) errs.username = 'Username is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await apiLogin(form);
      const data = res.data;

      if (data.success) {
        // Login successful
        login({ username: form.username, authdata: window.btoa(`${form.username}:${form.password}`) });
        toast.success(`Welcome back, ${form.username}! 🎉`);
        navigate('/');
      } else {
        // Login failed — check the message from backend
        const msg = (data.message || '').toLowerCase();
        if (msg.includes('not found') || msg.includes('register')) {
          toast.error('Account not found. Please sign up first! 🚀', { duration: 4000 });
          setTimeout(() => navigate('/register'), 2000);
        } else if (msg.includes('invalid password')) {
          toast.error('Invalid password. Please try again.', { duration: 4000 });
        } else {
          toast.error(data.message || 'Invalid credentials. Please try again.');
        }
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error('Invalid credentials. Please try again.', { duration: 4000 });
      } else {
        // Network / CORS error
        toast.error('Unable to connect to server. Please try again later.', { duration: 4000 });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="section-container py-12">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
              </Link>
              <h1 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-2">Welcome back</h1>
              <p className="text-surface-500 dark:text-surface-400">Sign in to your EventNexus account</p>
            </div>

            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="input-label">Username</label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input
                      type="text"
                      value={form.username}
                      onChange={e => { setForm(f => ({ ...f, username: e.target.value })); setErrors((er: any) => ({ ...er, username: '' })); }}
                      placeholder="Your username"
                      className={`input-field !pl-12 ${errors.username ? '!border-red-500 !ring-red-500/20' : ''}`}
                      aria-label="Username"
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="input-label">Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors((er: any) => ({ ...er, password: '' })); }}
                      placeholder="Your password"
                      className={`input-field !pl-12 !pr-12 ${errors.password ? '!border-red-500 !ring-red-500/20' : ''}`}
                      aria-label="Password"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors" aria-label="Toggle password">
                      {showPass ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  <div className="text-right mt-1">
                    <button type="button" className="text-xs text-primary-500 hover:text-primary-600 font-semibold">Forgot password?</button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 text-base mt-2">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign In'}
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200 dark:border-surface-700" /></div>
                  <div className="relative flex justify-center"><span className="px-4 text-xs text-surface-400 bg-white dark:bg-surface-800">or continue with</span></div>
                </div>

                <button type="button" className="btn-secondary w-full flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
              </form>

              <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-6">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-500 font-semibold hover:text-primary-600">Sign up for free</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
