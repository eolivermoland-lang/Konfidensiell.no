import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Sparkles, Zap, ShieldCheck, Heart, ArrowLeft, MessageSquare, ExternalLink, Globe, Code, Clock, ShoppingCart, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('initial');
  const [messages, setMessages] = useState([
    { text: 'Welcome to Konfidensiell! I am your digital architect. What can we build together?', isBot: true }
  ]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const flow = {
    initial: [
      { label: "Website Solutions", next: "web", icon: <Globe size={14} /> },
      { label: "App Development", next: "app", icon: <Zap size={14} /> },
      { label: "E-commerce / Shop", next: "ecommerce", icon: <ShoppingCart size={14} /> },
      { label: "Technical & Security", next: "technical", icon: <Lock size={14} /> },
      { label: "Pricing & Timeline", next: "pricing", icon: <Clock size={14} /> },
      { label: "About Konfidensiell", next: "about", icon: <Heart size={14} /> }
    ],
    web: [
      { label: "What tech do you use?", answer: "We use the 'Bleeding Edge' stack: React 18, Vite 5, and Tailwind CSS for maximum speed and modern design.", next: "web_deep" },
      { label: "Do you offer SEO?", answer: "Every site is built with technical SEO: SSR (Server Side Rendering), Schema markup, and meta-optimization.", next: "web_deep" },
      { label: "Can you host it?", answer: "Yes! We deploy primarily on Cloudflare's global edge network for 99.9% uptime and zero-latency.", next: "web_deep" },
      { label: "← Back", next: "initial" }
    ],
    web_deep: [
      { label: "Is it mobile friendly?", answer: "Absolutely. We follow a 'Mobile-First' philosophy. Your site will look perfect on every screen size.", next: "more_help" },
      { label: "Can I edit content?", answer: "Yes, we can integrate headless CMS systems so you can update text and images without touching code.", next: "more_help" },
      { label: "← Back to Web", next: "web" }
    ],
    app: [
      { label: "iOS or Android?", answer: "Both! We use React Native to build a single codebase that runs natively on both Apple and Android devices.", next: "app_deep" },
      { label: "Custom Features?", answer: "We handle Push Notifications, GPS Tracking, Biometric Login, and real-time database syncing.", next: "app_deep" },
      { label: "← Back", next: "initial" }
    ],
    app_deep: [
      { label: "App Store Publishing?", answer: "We manage the entire submission process, including metadata, screenshots, and review cycles.", next: "more_help" },
      { label: "App Maintenance?", answer: "We offer long-term support to ensure your app stays compatible with new iOS/Android updates.", next: "more_help" },
      { label: "← Back to Apps", next: "app" }
    ],
    ecommerce: [
      { label: "Which platforms?", answer: "We build custom storefronts or use Shopify/WooCommerce depending on your specific business goals.", next: "ecommerce_deep" },
      { label: "Payment Systems?", answer: "We integrate Stripe, PayPal, Klarna, and Vipps for secure, one-click checkout experiences.", next: "ecommerce_deep" },
      { label: "← Back", next: "initial" }
    ],
    ecommerce_deep: [
      { label: "Inventory Sync?", answer: "Yes, we can sync your online shop with your physical warehouse or POS systems.", next: "more_help" },
      { label: "Global Shipping?", answer: "We set up automated tax and shipping calculations for local or international delivery.", next: "more_help" },
      { label: "← Back to Shop", next: "ecommerce" }
    ],
    technical: [
      { label: "How secure is it?", answer: "We implement rigid Content Security Policies (CSP), SSL encryption, and brute-force protection.", next: "tech_deep" },
      { label: "API Integrations?", answer: "We can connect your site to any 3rd party tool (CRM, ERP, Social Media) via custom API logic.", next: "tech_deep" },
      { label: "← Back", next: "initial" }
    ],
    tech_deep: [
      { label: "Performance Audit?", answer: "We can audit your existing site and fix bottlenecks to achieve 100/100 performance scores.", next: "more_help" },
      { label: "Data Protection?", answer: "We follow GDPR best practices to ensure your customer data is handled with the highest privacy standards.", next: "more_help" },
      { label: "← Back to Tech", next: "technical" }
    ],
    pricing: [
      { label: "How much does it cost?", answer: "Pricing is scope-based. However, we are a fresh agency, so you get premium quality at very competitive rates.", next: "pricing_deep" },
      { label: "Project Timeline?", answer: "Simple sites take 1-2 weeks. Complex apps take 4-8 weeks. We always deliver on time.", next: "pricing_deep" },
      { label: "← Back", next: "initial" }
    ],
    pricing_deep: [
      { label: "Monthly Fees?", answer: "None! Unless you want a maintenance plan. You own 100% of the code and the assets we build.", next: "more_help" },
      { label: "Payment Stages?", answer: "Usually 0% upfront! You only pay when you are happy with the finished product.", next: "more_help" },
      { label: "← Back to Pricing", next: "pricing" }
    ],
    about: [
      { label: "Why Konfidensiell?", answer: "Because we are hungry for success. Every project is a chance for us to prove we are the best in Norway.", next: "more_help" },
      { label: "Where are you?", answer: "We are based in Kristiansand, Norway, but we operate as a fully digital firm serving the world.", next: "more_help" },
      { label: "← Back", next: "initial" }
    ],
    more_help: [
      { label: "I want to start!", answer: "Excellent choice. Let's get you over to the contact page to book your free strategy session.", next: "contact_cta" },
      { label: "I have another question", next: "initial" },
      { label: "Still need more help?", next: "contact_cta" }
    ],
    contact_cta: [
      { label: "Chat with a Developer", isAction: true, action: () => { navigate('/contact'); setIsOpen(false); }, icon: <MessageSquare size={14} /> },
      { label: "Return to Main Menu", next: "initial", icon: <ArrowLeft size={14} /> }
    ]
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { text: option.label, isBot: false }]);

    if (option.answer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { text: option.answer, isBot: true }]);
      }, 400);
    }

    if (option.isAction) {
      option.action();
      return;
    }

    if (option.next) {
      setTimeout(() => {
        setCurrentMenu(option.next);
        if (option.next === 'contact_cta') {
          setMessages(prev => [...prev, { text: "I'd love to connect you with our lead developer for a free session. Shall we?", isBot: true }]);
        }
      }, 600);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-all hover:scale-110 z-50 ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Open Konfidensiell Assistant"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className='fixed bottom-6 right-6 w-80 md:w-96 bg-slate-900 border border-white/10 rounded-[2rem] shadow-2xl z-50 overflow-hidden flex flex-col'
            style={{ maxHeight: '600px' }}
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-emerald-600 to-cyan-600 p-5 flex justify-between items-center'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 bg-emerald-300 rounded-full animate-pulse'></div>
                <h3 className='font-black text-white uppercase tracking-tighter text-sm'>Konfidensiell Expert</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className='text-white/80 hover:text-white' aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className='flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/50 scroll-smooth' 
              style={{ height: '350px' }}
            >
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.isBot ? 'bg-slate-800 text-gray-200 rounded-tl-none border border-white/5 shadow-inner' : 'bg-emerald-600 text-white rounded-tr-none shadow-lg'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Options */}
            <div className='p-4 bg-slate-900 border-t border-white/5 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]'>
              <p className='text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 ml-1'>Knowledge Base</p>
              <div className='flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1'>
                {flow[currentMenu].map((option, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className={`flex items-center justify-between w-full text-left p-3 rounded-xl text-xs transition-all font-bold ${option.isAction ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-800/50 text-gray-300 hover:text-emerald-400 border border-white/5'}`}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon || <Code size={14} className="opacity-50" />}
                      {option.label}
                    </div>
                    {option.isAction && <ExternalLink size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;