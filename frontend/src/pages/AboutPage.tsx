import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineGlobe, HiOutlineUserGroup, HiOutlineLightningBolt, HiOutlineHeart } from 'react-icons/hi';

const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Community First',
      desc: 'We believe events are about bringing people together. Every feature we build is designed to foster connection and belonging.',
      icon: HiOutlineUserGroup,
      color: 'text-primary-500',
      bg: 'bg-primary-50 dark:bg-primary-900/20',
    },
    {
      title: 'Global Reach',
      desc: 'Whether it is a local meetup or a massive international conference, our platform scales to meet the needs of any event.',
      icon: HiOutlineGlobe,
      color: 'text-accent-500',
      bg: 'bg-accent-50 dark:bg-accent-900/20',
    },
    {
      title: 'Seamless Experience',
      desc: 'From discovering an event to scanning a ticket at the door, we strive to make the entire journey frictionless and joyful.',
      icon: HiOutlineLightningBolt,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      title: 'Made with Passion',
      desc: 'We are a team of event lovers building the tools we wish we had. We put our heart into every line of code.',
      icon: HiOutlineHeart,
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
  ];

  const team = [
    { name: 'SYED ABDULLA', role: 'Founder & CEO', img: '/syed.png' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="section-container mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold text-sm mb-6">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-surface-900 dark:text-white mb-6 leading-tight">
              Bringing the world closer through <span className="gradient-text">shared experiences.</span>
            </h1>
            <p className="text-lg md:text-xl text-surface-500 dark:text-surface-400 leading-relaxed">
              EventNexus was founded with a simple idea: it should be incredibly easy to discover what's happening around you and even easier to host your own gathering. 
              Today, we power thousands of events, helping millions of people create memories that last a lifetime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="section-container mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-2 h-full rounded-3xl overflow-hidden relative group">
            <img src="https://picsum.photos/seed/event1/800/600" alt="Concert crowd" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex-1 rounded-3xl overflow-hidden relative group">
              <img src="https://picsum.photos/seed/event2/400/300" alt="Networking event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex-1 rounded-3xl overflow-hidden relative group">
              <img src="https://picsum.photos/seed/event3/400/300" alt="Yoga class" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-surface-50 dark:bg-surface-900/50 py-24 mb-24">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-surface-500 dark:text-surface-400">The principles that guide everything we build and every decision we make.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8">
                <div className={`w-12 h-12 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-surface-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-surface-900 dark:text-white mb-4">Meet the Team</h2>
          <p className="text-surface-500 dark:text-surface-400">Passionate builders dedicated to making event management effortless.</p>
        </div>

        <div className="flex justify-center gap-8">
          {team.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-lg font-display font-bold text-surface-900 dark:text-white">{member.name}</h3>
              <p className="text-primary-500 font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
