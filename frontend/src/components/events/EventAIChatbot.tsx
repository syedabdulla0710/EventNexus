import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlinePaperAirplane, HiOutlineSparkles } from 'react-icons/hi';

interface EventAIChatbotProps {
  event?: any;
  eventsList?: any[];
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`;

const EventAIChatbot: React.FC<EventAIChatbotProps> = ({ event, eventsList }) => {
  const isGlobal = !event && eventsList;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: isGlobal 
      ? `Hi there! I'm the **EventNexus AI Guide**. Looking for something to do? Tell me what you're interested in, and I'll recommend the perfect event from our catalog!`
      : `Hi there! I'm your AI assistant for **${event?.name || event?.title || 'this event'}**. Ask me anything about this event or why you should attend!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const userText = (overrideText || input).trim();
    if (!userText || isLoading) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', text: userText } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Build conversation history for real API
      const contents = newMessages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const systemInstructionText = isGlobal
        ? `You are a friendly, enthusiastic, and helpful AI assistant for an event booking platform called EventNexus. Your goal is to help users find the perfect event from the catalog below based on their interests, location, or budget. Use formatting like bolding and bullet points to make your answers easy to read.
        
Available Events:
${eventsList?.map(e => `- **${e.title || e.name}** | ${e.category} | ${new Date(e.date).toLocaleDateString()} | ${e.location} | ${e.price === 0 || e.isFree ? 'Free' : `₹${e.price}`} | ${e.attendees || 0} attending`).join('\n')}

Only recommend events from the provided catalog. Be persuasive but honest. Keep responses concise.`
        : `You are a friendly, enthusiastic, and helpful AI assistant for an event booking platform called EventNexus. Your goal is to answer questions about the specific event the user is viewing and convince them why they should attend. Use formatting like bolding and bullet points to make your answers easy to read.

Event Details:
- Title: ${event?.name || event?.title}
- Description: ${event?.description}
- Category: ${event?.category}
- Date: ${event?.date ? new Date(event.date).toLocaleDateString() : 'TBD'}
- Location: ${event?.location}
- Price: ${event?.price === 0 || event?.isFree ? 'Free' : `₹${event?.price}`}
- Capacity: ${event?.totalSeats || event?.capacity} seats total

Only answer questions based on the event details provided. Be persuasive but honest. Keep responses concise (under 3 paragraphs).`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': API_KEY
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstructionText }] },
          contents: contents
        })
      });

      const data = await response.json();
      
      if (data.error) {
        console.error("API Error:", data.error);
        throw new Error(data.error.message || 'API Error');
      }
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const reply = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
        setIsLoading(false);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error: any) {
      console.error('Error generating AI response:', error);
      
      // Fallback to Smart Mock Response if API fails (e.g. invalid API key)
      setTimeout(() => {
        let reply = '';
        const lText = userText.toLowerCase();
        
        if (lText.includes('free') || lText.includes('price') || lText.includes('cost')) {
          reply = isGlobal 
            ? "We have lots of free events! Filter by 'Free' in the price dropdown above."
            : (event?.price === 0 || event?.isFree ? "Yes, this event is completely **Free** to attend! Spots fill up fast though, so make sure to book your ticket!" : `This event costs **₹${event?.price}**. It's well worth the price for the incredible experience!`);
        } else if (lText.includes('location') || lText.includes('where')) {
          reply = isGlobal
            ? "Our events are hosted globally, both online and in-person! Click on any event to see its specific location."
            : `This event is located at **${event?.location}**. You can find full directions on your ticket!`;
        } else if (lText.includes('why') || lText.includes('attend')) {
          reply = isGlobal
            ? "Attending events is a great way to network, learn new skills, and meet like-minded people in your community!"
            : `You should definitely attend **${event?.name || event?.title}**! It's a fantastic opportunity to dive into ${event?.category} and connect with others. Plus, it's going to be a lot of fun!`;
        } else if (lText.includes('recommend') || lText.includes('tech') || lText.includes('popular')) {
          reply = "I highly recommend checking out the **Future of Design Webinar** or the **Tech Innovators Summit**. They are our most popular events right now and packed with value!";
        } else {
          reply = isGlobal 
            ? "That's a great question! I'm still learning, but I highly recommend browsing our categories above to find something you love."
            : `That's a great question about **${event?.name || event?.title}**! I don't have the exact details for that right now, but I highly recommend securing your spot before it sells out!`;
        }
        
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
        setIsLoading(false);
      }, 600);
    }
  };

  return (
    <>
      {/* Floating Button with Pulse Ring & Tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        
        {/* Premium Floating Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute right-[115%] mr-1 whitespace-nowrap animate-float"
              style={{ pointerEvents: 'none' }}
            >
              <div 
                className="relative px-4 py-2.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-center gap-2.5 backdrop-blur-md"
                style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', color: '#ffffff' }}
              >
                <span className="text-sm font-semibold tracking-wide">
                  {isGlobal ? "Need event ideas?" : "Have questions?"}
                </span>
                
                {/* Glowing dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                
                {/* Triangle pointing right */}
                <div 
                  className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px]"
                  style={{ borderLeftColor: 'rgba(15, 23, 42, 0.95)' }}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary-400 opacity-40 animate-ping" style={{ animationDuration: '3s' }}></span>
        )}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: isOpen ? 0 : 1 }}
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-4 rounded-full bg-gradient-to-br from-primary-500 via-fuchsia-500 to-orange-400 text-white shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)] transition-shadow"
        >
          <HiOutlineSparkles className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] max-h-[85vh] flex flex-col glass-card border border-surface-200 dark:border-surface-700 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
              <div className="flex items-center gap-2">
                <HiOutlineSparkles className="w-5 h-5 text-accent-100" />
                <div>
                  <h3 className="font-semibold text-sm">EventNexus AI Guide</h3>
                  <p className="text-xs text-primary-100 opacity-90">Ask me about this event!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-50 dark:bg-surface-900/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary-500 text-white rounded-br-sm shadow-md'
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-surface-100 border border-surface-200 dark:border-surface-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'model' ? (
                      <div 
                        className="[&>strong]:font-bold [&>strong]:text-primary-600 dark:[&>strong]:text-primary-400 [&>em]:italic"
                        dangerouslySetInnerHTML={{ 
                          __html: msg.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/\n/g, '<br />')
                        }} 
                      />
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !isLoading && (
              <div 
                className="px-4 pb-3 pt-1 bg-surface-50 dark:bg-surface-900/50 flex gap-2 overflow-x-auto snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Hide webkit scrollbar via a style tag for this specific block */}
                <style>{`
                  .quick-reply-container::-webkit-scrollbar { display: none; }
                `}</style>
                <div className="flex gap-2 quick-reply-container overflow-x-auto">
                  {(isGlobal 
                    ? ['Recommend a tech event', 'What free events do you have?', 'What is popular right now?']
                    : ['Why should I attend?', 'Is this free?', 'What is the location?']
                  ).map(q => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => handleSend(undefined, q), 10);
                      }}
                      className="shrink-0 px-4 py-2 bg-surface-200 dark:bg-surface-800 text-surface-800 dark:text-surface-200 text-xs font-semibold rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/50 hover:text-primary-600 transition-colors shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-surface-50 dark:bg-surface-900/50 border-t border-surface-200 dark:border-surface-700/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-surface-100 dark:bg-surface-900 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 text-surface-900 dark:text-white placeholder:text-surface-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:hover:bg-primary-500 text-white transition-colors"
              >
                <HiOutlinePaperAirplane className="w-5 h-5 rotate-90" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventAIChatbot;
