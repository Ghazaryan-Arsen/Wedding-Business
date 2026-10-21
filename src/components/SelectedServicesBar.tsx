'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useServices } from '@/context/ServiceContext';
import { SERVICES } from '@/data/services';

export const SelectedServicesBar: React.FC = () => {
  const { t } = useLanguage();
  const { selectedServiceIds, deselectService, clearSelections } = useServices();

  if (selectedServiceIds.length === 0) {
    return null;
  }

  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-xl z-40 bg-[#292723] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#B89B72]/40 backdrop-blur-xl bg-opacity-95"
      >
        <div className="flex flex-col gap-3">
          {/* Top Bar Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B89B72]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E8D7BE]">
                {t('selected_bar_title')} ({selectedServiceIds.length})
              </span>
            </div>
            <button
              onClick={clearSelections}
              className="text-[11px] text-white/60 hover:text-white underline transition-colors"
            >
              {t('selected_bar_clear')}
            </button>
          </div>

          {/* Selected Chips List */}
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto no-scrollbar">
            {selectedServices.map((service) => (
              <motion.span
                key={service.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/90"
              >
                <span>{t(service.nameKey)}</span>
                <button
                  onClick={() => deselectService(service.id)}
                  className="p-0.5 rounded-full hover:bg-white/20 transition-colors text-white/60 hover:text-white"
                  aria-label="Remove service"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToInquiry}
            className="w-full mt-1 py-2.5 px-4 rounded-xl bg-[#E8D7BE] text-[#292723] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all duration-300 shadow-md group"
          >
            <span>{t('selected_bar_cta')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
