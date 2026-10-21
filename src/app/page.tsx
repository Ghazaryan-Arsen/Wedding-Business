'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { SelectedServicesBar } from '@/components/SelectedServicesBar';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { HowItWorks } from '@/components/HowItWorks';
import { InquiryForm } from '@/components/InquiryForm';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <LanguageProvider>
      <ServiceProvider>
        <div className="min-h-screen bg-[#FAF8F4] text-[#292723] flex flex-col font-sans selection:bg-[#E8D7BE] selection:text-[#292723]">
          <Header />
          <main className="flex-grow">
            <Hero />
            <ServicesSection />
            <PortfolioGallery />
            <HowItWorks />
            <InquiryForm />
            <FAQSection />
          </main>
          <SelectedServicesBar />
          <Footer />
        </div>
      </ServiceProvider>
    </LanguageProvider>
  );
}
