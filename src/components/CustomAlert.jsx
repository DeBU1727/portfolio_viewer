import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const CustomAlert = ({ message, type, isVisible, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-10 right-10 z-[100] pointer-events-none p-4 w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`
              relative w-full bg-black/60 backdrop-blur-2xl border rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center space-x-5
              ${type === 'success' ? 'border-green-500/30' : 'border-red-500/30'}
            `}
          >
            {/* Background Glow */}
            <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-10 pointer-events-none transition-colors duration-500 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />

            <div className={`flex-shrink-0 p-2 rounded-full ${type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {type === 'success' ? (
                <CheckCircle2 size={24} strokeWidth={2} />
              ) : (
                <AlertCircle size={24} strokeWidth={2} />
              )}
            </div>

            <div className="flex flex-col text-left">
              <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">
                {type === 'success' ? 'Success' : 'Error'}
              </h3>
              <p className="text-neutral-400 text-[11px] leading-tight font-medium">
                {message}
              </p>
            </div>

            {/* Progress bar effect to show dismissal time */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${type === 'success' ? 'bg-green-500/50' : 'bg-red-500/50'}`}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
