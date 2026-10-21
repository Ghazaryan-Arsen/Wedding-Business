'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { useLanguage } from '@/context/LanguageContext';
import { useServices } from '@/context/ServiceContext';
import { ServiceCategory } from '@/types';

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();
  const { isServiceSelected, toggleService } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');

  const categories: { id: ServiceCategory; labelKey: string }[] = [
    { id: 'all', labelKey: 'cat_all' },
    { id: 'photography', labelKey: 'cat_photography' },
    { id: 'videography', labelKey: 'cat_videography' },
    { id: 'venue', labelKey: 'cat_venue' },
    { id: 'decoration', labelKey: 'cat_decoration' },
    { id: 'planning', labelKey: 'cat_planning' },
    { id: 'music', labelKey: 'cat_music' },
    { id: 'catering', labelKey: 'cat_catering' },
    { id: 'makeup', labelKey: 'cat_makeup' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-24 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            {t('services_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#292723]/70 font-light leading-relaxed"
          >
            {t('services_subtitle')}
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 mb-12 pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#292723] text-[#FAF8F4] shadow-md border border-[#292723]'
                    : 'bg-white text-[#292723]/80 border border-[#E8D7BE] hover:border-[#B89B72] hover:bg-[#E8D7BE]/20'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredServices.map((service, index) => {
              const selected = isServiceSelected(service.id);
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative rounded-2xl overflow-hidden bg-white border transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between ${
                    selected
                      ? 'border-[#B89B72] ring-2 ring-[#B89B72]/50'
                      : 'border-[#E8D7BE]/70 hover:border-[#B89B72]/60'
                  }`}
                >
                  {/* Card Image Container with Hover Zoom */}
                  <div className="relative h-64 overflow-hidden bg-[#292723]">
                    <img
                      src={service.image}
                      alt={t(service.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Category Tag Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#292723] shadow-sm">
                        {t(`cat_${service.category}`)}
                      </span>
                    </div>

                    {/* Selected Badge Overlay */}
                    {selected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 z-10 bg-[#B89B72] text-white p-1.5 rounded-full shadow-lg"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </motion.div>
                    )}

                    {/* Price tag on image bottom left */}
                    <div className="absolute bottom-4 left-4 z-10 text-white">
                      <span className="text-[11px] text-white/80 font-light block">
                        {t('service_from')}
                      </span>
                      <span className="text-lg font-bold font-serif text-[#E8D7BE]">
                        {service.indicativePriceAMD.toLocaleString()} {t('service_amd')}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-[#292723] mb-2 group-hover:text-[#B89B72] transition-colors">
                        {t(service.nameKey)}
                      </h3>
                      <p className="text-xs text-[#292723]/70 font-light leading-relaxed mb-6">
                        {t(service.descKey)}
                      </p>
                    </div>

                    {/* Interactive Selection Toggle Button */}
                    <button
                      onClick={() => toggleService(service.id)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        selected
                          ? 'bg-[#B89B72] text-white shadow-md hover:bg-[#292723]'
                          : 'bg-[#FAF8F4] text-[#292723] border border-[#E8D7BE] hover:bg-[#292723] hover:text-white hover:border-[#292723]'
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t('service_selected')}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-[#B89B72] group-hover:text-white" />
                          <span>{t('service_select')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
