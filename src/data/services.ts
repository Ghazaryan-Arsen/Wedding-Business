import { Service, PortfolioItem, FAQItem } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'photo-1',
    category: 'photography',
    nameKey: 'service_photo_1_name',
    descKey: 'service_photo_1_desc',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 350000,
    featured: true,
  },
  {
    id: 'video-1',
    category: 'videography',
    nameKey: 'service_video_1_name',
    descKey: 'service_video_1_desc',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 450000,
    featured: true,
  },
  {
    id: 'venue-1',
    category: 'venue',
    nameKey: 'service_venue_1_name',
    descKey: 'service_venue_1_desc',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 1200000,
    featured: true,
  },
  {
    id: 'decor-1',
    category: 'decoration',
    nameKey: 'service_decor_1_name',
    descKey: 'service_decor_1_desc',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 600000,
    featured: true,
  },
  {
    id: 'planning-1',
    category: 'planning',
    nameKey: 'service_plan_1_name',
    descKey: 'service_plan_1_desc',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 800000,
    featured: true,
  },
  {
    id: 'music-1',
    category: 'music',
    nameKey: 'service_music_1_name',
    descKey: 'service_music_1_desc',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 500000,
  },
  {
    id: 'catering-1',
    category: 'catering',
    nameKey: 'service_cater_1_name',
    descKey: 'service_cater_1_desc',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 900000,
  },
  {
    id: 'makeup-1',
    category: 'makeup',
    nameKey: 'service_makeup_1_name',
    descKey: 'service_makeup_1_desc',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop',
    indicativePriceAMD: 200000,
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    titleKey: 'port_1_title',
    categoryKey: 'port_1_cat',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'port-2',
    titleKey: 'port_2_title',
    categoryKey: 'port_2_cat',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'port-3',
    titleKey: 'port_3_title',
    categoryKey: 'port_3_cat',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'port-4',
    titleKey: 'port_4_title',
    categoryKey: 'port_4_cat',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'port-5',
    titleKey: 'port_5_title',
    categoryKey: 'port_5_cat',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'port-6',
    titleKey: 'port_6_title',
    categoryKey: 'port_6_cat',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    questionKey: 'faq_1_q',
    answerKey: 'faq_1_a',
  },
  {
    id: 'faq-2',
    questionKey: 'faq_2_q',
    answerKey: 'faq_2_a',
  },
  {
    id: 'faq-3',
    questionKey: 'faq_3_q',
    answerKey: 'faq_3_a',
  },
  {
    id: 'faq-4',
    questionKey: 'faq_4_q',
    answerKey: 'faq_4_a',
  },
  {
    id: 'faq-5',
    questionKey: 'faq_5_q',
    answerKey: 'faq_5_a',
  },
];
