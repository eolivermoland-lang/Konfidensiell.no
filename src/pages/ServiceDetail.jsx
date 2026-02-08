import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, CheckCircle2, Cpu, Rocket, ShieldCheck } from 'lucide-react';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 font-bold transition-colors"
        >
          <ArrowLeft size={20} /> Back to Services
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 sm:mb-16 text-center lg:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tight px-4 sm:px-0">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto lg:mx-0 px-4 sm:px-0">
            {service.fullDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 sm:space-y-16 px-4 sm:px-0">
            
            {/* Process */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <Rocket className="text-blue-500" /> Our Process
              </h2>
              <div className="space-y-4">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-800/50 p-4 sm:p-5 rounded-2xl border border-slate-700">
                    <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-gray-200 font-medium text-sm sm:text-base">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <ShieldCheck className="text-green-500" /> Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
            <div className="bg-slate-900 border border-slate-700 p-6 sm:p-8 rounded-3xl shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Cpu className="text-purple-500" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-800 text-purple-300 rounded-xl text-xs sm:text-sm font-bold border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 p-6 sm:p-8 rounded-3xl text-center text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Interested in this service?</h3>
              <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base">Let's discuss how we can help your business grow.</p>
              <Link to="/contact" className="block w-full py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-colors text-sm sm:text-base">
                Contact Us Now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
