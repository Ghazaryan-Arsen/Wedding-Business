'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Sparkles } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '@/data/services';
import { useLanguage } from '@/context/LanguageContext';
import { PortfolioItem } from '@/types';

export const PortfolioGallery: React.FC = () => {
  const { t } = useLanguage();
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-[#292723] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E8D7BE] text-xs uppercase tracking-widest font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
            <span>{t('brand_name')} Gallery</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif font-normal tracking-tight mb-4 text-[#FAF8F4]"
          >
            {t('portfolio_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/70 font-light leading-relaxed"
          >
            {t('portfolio_subtitle')}
          </motion.p>
        </div>

        {/* Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#B89B72] transition-all duration-500 shadow-xl"
            >
              <img
                src={item.image}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Hover Text Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
                <span className="text-xs uppercase tracking-widest text-[#E8D7BE] font-semibold mb-1">
                  {t(item.categoryKey)}
                </span>
                <h3 className="text-xl font-serif text-white font-medium mb-2">
                  {t(item.titleKey)}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/70 group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B89B72]" />
                  <span>Expand View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#292723] rounded-3xl overflow-hidden border border-[#E8D7BE]/30 shadow-2xl cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#B89B72] hover:text-[#292723] transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/3 h-[50vh] lg:h-[70vh] bg-black">
                  <img
                    src={activeLightboxItem.image}
                    alt={t(activeLightboxItem.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/3 p-8 flex flex-col justify-center bg-[#292723]">
                  <span className="text-xs uppercase tracking-widest text-[#B89B72] font-semibold mb-2">
                    {t(activeLightboxItem.categoryKey)}
                  </span>
                  <h3 className="text-2xl font-serif text-white mb-4">
                    {t(activeLightboxItem.titleKey)}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                    {t('brand_tagline')}
                  </p>
                  <button
                    onClick={() => {
                      setActiveLightboxItem(null);
                      const el = document.getElementById('inquiry');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-3 px-6 rounded-full bg-[#E8D7BE] text-[#292723] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    {t('nav_inquire')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
