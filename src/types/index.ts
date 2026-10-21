export type Language = 'hy' | 'en' | 'ru';

export type ServiceCategory =
  | 'all'
  | 'photography'
  | 'videography'
  | 'venue'
  | 'catering'
  | 'decoration'
  | 'music'
  | 'makeup'
  | 'planning';

export interface Service {
  id: string;
  category: ServiceCategory;
  nameKey: string;
  descKey: string;
  image: string;
  indicativePriceAMD: number;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  titleKey: string;
  categoryKey: string;
  image: string;
  aspectRatio?: string;
}

export interface FAQItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  weddingDate: string;
  budgetRange: string;
  customBudget: string;
  selectedServiceIds: string[];
  message: string;
}
