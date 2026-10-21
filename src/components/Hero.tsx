'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#292723]">
      {/* Cinematic Background Image with Parallax Scale Reveal */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
          alt="Wedding Cinematic Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Editorial Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#292723] via-[#292723]/60 to-black/40" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24 pb-16 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8D7BE] text-xs uppercase tracking-widest font-semibold mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
          <span>{t('hero_badge')}</span>
        </motion.div>

        {/* Headline with Masked Staggered Entrance */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[1.1]"
          >
            <span className="block italic text-[#FAF8F4]">{t('hero_title_1')}</span>
            <span className="block font-semibold bg-gradient-to-r from-[#E8D7BE] via-[#FAF8F4] to-[#B89B72] bg-clip-text text-transparent">
              {t('hero_title_2')}
            </span>
          </motion.h1>
        </div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10"
        >
          {t('hero_desc')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            onClick={() => scrollToSection('inquiry')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E8D7BE] text-[#292723] font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 active:scale-95"
          >
            {t('hero_cta_primary')}
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => scrollToSection('services')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-xs sm:text-sm uppercase tracking-wider hover:bg-white/20 hover:border-white transition-all duration-300"
          >
            {t('hero_cta_secondary')}
          </button>
        </motion.div>
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 cursor-pointer"
        onClick={() => scrollToSection('services')}
      >
        <span className="text-[10px] uppercase tracking-widest text-white/60 font-light">
          {t('hero_scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#E8D7BE]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
