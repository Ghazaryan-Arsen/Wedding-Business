'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckSquare, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: CheckSquare,
      titleKey: 'step_1_title',
      descKey: 'step_1_desc',
    },
    {
      num: '02',
      icon: Send,
      titleKey: 'step_2_title',
      descKey: 'step_2_desc',
    },
    {
      num: '03',
      icon: Sparkles,
      titleKey: 'step_3_title',
      descKey: 'step_3_desc',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAF8F4] relative border-y border-[#E8D7BE]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest font-semibold text-[#B89B72] mb-3"
          >
            {t('brand_name')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-[#292723] font-normal tracking-tight mb-4"
          >
            {t('how_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#292723]/70 font-light leading-relaxed"
          >
            {t('how_subtitle')}
          </motion.p>
        </div>

        {/* 3 Step Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white rounded-3xl p-8 border border-[#E8D7BE]/70 shadow-sm hover:shadow-xl hover:border-[#B89B72] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-serif font-bold text-[#E8D7BE]">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#E8D7BE] flex items-center justify-center text-[#B89B72]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#292723] mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-xs text-[#292723]/70 font-light leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8D7BE]/30 flex items-center gap-2 text-[11px] font-semibold text-[#B89B72]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Step {step.num}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
