import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { register as apiRegister } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', intent: 'both' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const passwordStrength = (p: string) => {
    if (p.length === 0) return 0;
    if (p.length < 6) return 1;
    if (p.length < 10 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return 2;
    return 3;
  };
  const strength = passwordStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];
  const strengthColors = ['', 'bg-red-500', 'bg-accent-400', 'bg-emerald-500'];

  const validate = () => {
    const errs: any = {};
    if (!form.username.trim()) errs.username = 'Username is required';
    if (form.username.length < 3) errs.username = 'Username must be at least 3 characters';
    if (!form.password) errs.password = 'Password is required';
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await apiRegister({ username: form.username, password: form.password });
      login({ username: form.username, authdata: window.btoa(`${form.username}:${form.password}`) });
      toast.success(`🎉 Account created! Welcome to EventNexus!`);
      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed. Username may already be taken.');
    } finally {
      setLoading(false);
    }
  };

  const intents = [
    { id: 'attend', label: '🎟️ Attend Events', desc: 'Browse and register for events' },
    { id: 'host', label: '🎤 Host Events', desc: 'Create and manage your own events' },
    { id: 'both', label: '⚡ Both', desc: 'Attend and host events' },
  ];

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="section-container py-12">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
              </Link>
              <h1 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-2">Create your account</h1>
              <p className="text-surface-500 dark:text-surface-400">Join 500K+ event lovers on EventNexus</p>
            </div>

            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="input-label">Username</label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input type="text" value={form.username} onChange={e => { setForm(f => ({ ...f, username: e.target.value })); setErrors((er: any) => ({ ...er, username: '' })); }}
                      placeholder="Choose a username" className={`input-field !pl-12 ${errors.username ? '!border-red-500' : ''}`} />
                  </div>
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="input-label">Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors((er: any) => ({ ...er, password: '' })); }}
                      placeholder="Create a strong password" className={`input-field !pl-12 !pr-12 ${errors.password ? '!border-red-500' : ''}`} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
                      {showPass ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                    </button>
                  </div>
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3].map(l => <div key={l} className={`h-1 flex-1 rounded-full transition-all ${strength >= l ? strengthColors[strength] : 'bg-surface-200 dark:bg-surface-700'}`} />)}
                      </div>
                      <p className={`text-xs font-medium ${strength === 3 ? 'text-emerald-500' : strength === 2 ? 'text-accent-500' : 'text-red-500'}`}>{strengthLabels[strength]}</p>
                    </div>
                  )}
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="input-label">Confirm Password</label>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input type="password" value={form.confirm} onChange={e => { setForm(f => ({ ...f, confirm: e.target.value })); setErrors((er: any) => ({ ...er, confirm: '' })); }}
                      placeholder="Repeat your password" className={`input-field !pl-12 ${errors.confirm ? '!border-red-500' : ''}`} />
                    {form.confirm && form.password === form.confirm && (
                      <HiOutlineCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
                </div>

                {/* Intent */}
                <div>
                  <label className="input-label">I want to...</label>
                  <div className="grid grid-cols-3 gap-2">
                    {intents.map(intent => (
                      <button key={intent.id} type="button" onClick={() => setForm(f => ({ ...f, intent: intent.id }))}
                        className={`py-2.5 px-2 rounded-xl border-2 text-xs font-semibold text-center transition-all ${form.intent === intent.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:border-primary-300'}`}
                      >
                        <div>{intent.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 text-base mt-2">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating account...
                    </span>
                  ) : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-600">Sign in</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
