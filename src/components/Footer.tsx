'use client';

import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';

export const Footer: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'hy', label: 'Հայերեն' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  return (
    <footer className="bg-[#292723] text-[#FAF8F4] pt-20 pb-12 border-t border-[#B89B72]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-2xl font-serif tracking-tight font-bold mb-4"
            >
              <span>
                Wedding<span className="text-[#B89B72]">Day</span>
              </span>
              <Sparkles className="w-4 h-4 text-[#B89B72]" />
            </a>
            <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
              {t('brand_tagline')}
            </p>
            <p className="text-xs text-[#E8D7BE] italic font-serif">
              &quot;{t('footer_tagline')}&quot;
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89B72] mb-6">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-3 text-xs font-light text-white/80">
              {[
                { id: 'services', label: t('nav_services') },
                { id: 'how-it-works', label: t('nav_how_it_works') },
                { id: 'portfolio', label: t('nav_portfolio') },
                { id: 'faq', label: t('nav_faq') },
                { id: 'inquiry', label: t('nav_inquire') },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-[#E8D7BE] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Editable Contact Placeholders */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89B72] mb-6">
              {t('footer_contacts')}
            </h4>
            <ul className="space-y-4 text-xs text-white/80 font-light">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B89B72] shrink-0" />
                <span>+374 10 000000 / +374 91 000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B89B72] shrink-0" />
                <span>concierge@weddingday.am</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#B89B72] shrink-0" />
                <span>{t('footer_address_val')}</span>
              </li>
            </ul>
          </div>

          {/* Languages Options */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89B72] mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Languages</span>
            </h4>
            <div className="flex flex-col space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`py-2 px-4 rounded-xl text-xs font-medium border text-left transition-colors flex items-center justify-between ${
                    language === lang.code
                      ? 'bg-[#E8D7BE] text-[#292723] border-[#E8D7BE] font-semibold'
                      : 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <span>{lang.label}</span>
                  <span className="uppercase text-[10px] opacity-60">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50 font-light">
          <p>
            © {new Date().getFullYear()} WeddingDay. {t('footer_rights')}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
