import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi there! How can I help you today?', isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages([...messages, { text: inputText, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response = 'Thanks for your message! Our team will get back to you shortly.';
      if (inputText.toLowerCase().includes('price') || inputText.toLowerCase().includes('cost')) {
        response = 'Our pricing depends on the scope of the project. Please contact us for a quote!';
      } else if (inputText.toLowerCase().includes('service')) {
        response = 'We offer Web Design, App Development, and IT Consulting.';
      }
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 1000);

    setInputText('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className='fixed bottom-6 right-6 w-80 md:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col'
            style={{ maxHeight: '500px' }}
          >
            {/* Header */}
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <h3 className='font-bold text-white'>CodeNext Support</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className='text-white/80 hover:text-white'>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className='flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/50' style={{ height: '300px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.isBot ? 'bg-slate-700 text-gray-200 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className='p-4 bg-slate-800 border-t border-slate-700 flex gap-2'>
              <input 
                type='text' 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Type a message...' 
                className='flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500'
              />
              <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors'>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
