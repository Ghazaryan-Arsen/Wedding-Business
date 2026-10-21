'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sparkles, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'hy', label: 'Հայերեն' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F4]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#E8D7BE]/50'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Wordmark Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 text-2xl font-serif tracking-tight font-bold"
        >
          <span className={isScrolled ? 'text-[#292723]' : 'text-white'}>
            Wedding<span className="text-[#B89B72]">Day</span>
          </span>
          <Sparkles className="w-4 h-4 text-[#B89B72] opacity-80 group-hover:scale-110 transition-transform duration-300" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {[
            { id: 'services', label: t('nav_services') },
            { id: 'how-it-works', label: t('nav_how_it_works') },
            { id: 'portfolio', label: t('nav_portfolio') },
            { id: 'faq', label: t('nav_faq') },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-colors relative py-1 hover:text-[#B89B72] ${
                isScrolled ? 'text-[#292723]' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Section: Language Selector & CTA */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                isScrolled
                  ? 'border-[#E8D7BE] text-[#292723] hover:bg-[#E8D7BE]/20'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#B89B72]" />
              <span className="uppercase tracking-wider font-semibold">{language}</span>
            </button>

            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-[#E8D7BE] py-1.5 z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors hover:bg-[#FAF8F4] ${
                        language === lang.code
                          ? 'text-[#B89B72] font-bold'
                          : 'text-[#292723]'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <Check className="w-3.5 h-3.5 text-[#B89B72]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prominent CTA */}
          <button
            onClick={() => scrollToSection('inquiry')}
            className="relative group overflow-hidden px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md bg-[#292723] text-[#FAF8F4] hover:bg-[#B89B72] hover:text-[#292723] border border-[#B89B72]/40"
          >
            <span className="relative z-10">{t('nav_inquire')}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Quick Language Switcher for Mobile Header */}
          <button
            onClick={() => {
              const nextLang: Record<Language, Language> = {
                hy: 'en',
                en: 'ru',
                ru: 'hy',
              };
              setLanguage(nextLang[language]);
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${
              isScrolled
                ? 'border-[#E8D7BE] text-[#292723]'
                : 'border-white/40 text-white'
            }`}
          >
            {language}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#292723]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#FAF8F4] border-b border-[#E8D7BE] text-[#292723] px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {[
                { id: 'services', label: t('nav_services') },
                { id: 'how-it-works', label: t('nav_how_it_works') },
                { id: 'portfolio', label: t('nav_portfolio') },
                { id: 'faq', label: t('nav_faq') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left font-serif text-lg py-2 border-b border-[#E8D7BE]/40 text-[#292723] hover:text-[#B89B72]"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#B89B72] font-semibold">
                  Language / Լեզու
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                      }}
                      className={`py-2 text-xs rounded-lg font-medium border text-center transition-colors ${
                        language === lang.code
                          ? 'bg-[#292723] text-white border-[#292723]'
                          : 'border-[#E8D7BE] text-[#292723] bg-white'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollToSection('inquiry')}
                  className="w-full mt-4 py-3 bg-[#292723] text-white rounded-full font-semibold text-xs uppercase tracking-wider text-center shadow-lg hover:bg-[#B89B72] hover:text-[#292723] transition-colors"
                >
                  {t('nav_inquire')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
