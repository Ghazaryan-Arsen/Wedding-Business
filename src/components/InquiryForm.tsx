'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, AlertCircle, Info, Calendar, Phone, User, DollarSign, CheckCircle2, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useServices } from '@/context/ServiceContext';
import { SERVICES } from '@/data/services';
import { InquiryFormData } from '@/types';

export const InquiryForm: React.FC = () => {
  const { t, language } = useLanguage();
  const { selectedServiceIds, deselectService } = useServices();

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    weddingDate: '',
    budgetRange: 'budget_range_2',
    customBudget: '',
    selectedServiceIds: [],
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'demo' | 'success' | 'error';
    title: string;
    description: string;
  } | null>(null);

  const budgetOptions = [
    { key: 'budget_range_1', labelKey: 'budget_range_1' },
    { key: 'budget_range_2', labelKey: 'budget_range_2' },
    { key: 'budget_range_3', labelKey: 'budget_range_3' },
    { key: 'budget_range_4', labelKey: 'budget_range_4' },
    { key: 'budget_range_custom', labelKey: 'budget_range_custom' },
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('error_name_required');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('error_phone_required');
    }

    if (!formData.weddingDate) {
      newErrors.weddingDate = t('error_date_required');
    } else {
      const selectedDate = new Date(formData.weddingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.weddingDate = t('error_date_past');
      }
    }

    if (!formData.budgetRange) {
      newErrors.budgetRange = t('error_budget_required');
    }

    if (selectedServiceIds.length === 0) {
      newErrors.services = t('error_services_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const payload = {
      ...formData,
      selectedServices: SERVICES.filter((s) => selectedServiceIds.includes(s.id)).map((s) => ({
        id: s.id,
        category: s.category,
        nameKey: s.nameKey,
      })),
      submittedAt: new Date().toISOString(),
      language,
    };

    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    try {
      if (webhookUrl && webhookUrl.trim() !== '') {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setStatusMessage({
            type: 'success',
            title: t('status_success_title'),
            description: t('status_success_msg'),
          });
        } else {
          throw new Error('Server returned non-200');
        }
      } else {
        // Webhook URL is not configured: display explicit development / demo status
        await new Promise((resolve) => setTimeout(resolve, 800));
        setStatusMessage({
          type: 'demo',
          title: t('status_demo_title'),
          description: t('status_demo_msg'),
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        title: t('status_error_title'),
        description: t('status_error_msg'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServices = SERVICES.filter((s) => selectedServiceIds.includes(s.id));

  return (
    <section id="inquiry" className="py-24 bg-[#FAF8F4] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest font-semibold text-[#B89B72] mb-3"
          >
            {t('brand_name')} Consultation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-serif text-[#292723] font-normal tracking-tight mb-4"
          >
            {t('form_title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#292723]/70 font-light max-w-2xl mx-auto"
          >
            {t('form_subtitle')}
          </motion.p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8D7BE] shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Selected Services Summary Panel */}
            <div className="p-6 rounded-2xl bg-[#FAF8F4] border border-[#E8D7BE]/70">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-3">
                {t('form_field_services')} <span className="text-red-500">*</span>
              </label>

              {selectedServices.length === 0 ? (
                <p className="text-xs text-red-500 font-medium">
                  {t('form_field_services_empty')}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white border border-[#E8D7BE] text-[#292723] shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B72]" />
                      <span>{t(service.nameKey)}</span>
                      <button
                        type="button"
                        onClick={() => deselectService(service.id)}
                        className="ml-1 text-[#292723]/40 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.services && (
                <p className="text-xs text-red-500 mt-2 font-medium">{errors.services}</p>
              )}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-2">
                  {t('form_field_name')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={t('form_field_name_placeholder')}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF8F4] border text-sm text-[#292723] focus:outline-none focus:ring-2 focus:ring-[#B89B72] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-[#E8D7BE]'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-2">
                  {t('form_field_phone')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('form_field_phone_placeholder')}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF8F4] border text-sm text-[#292723] focus:outline-none focus:ring-2 focus:ring-[#B89B72] transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-[#E8D7BE]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Wedding Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-2">
                  {t('form_field_date')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF8F4] border text-sm text-[#292723] focus:outline-none focus:ring-2 focus:ring-[#B89B72] transition-colors ${
                      errors.weddingDate ? 'border-red-500' : 'border-[#E8D7BE]'
                    }`}
                  />
                </div>
                {errors.weddingDate && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.weddingDate}</p>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-2">
                  {t('form_field_budget')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B89B72]" />
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF8F4] border text-sm text-[#292723] focus:outline-none focus:ring-2 focus:ring-[#B89B72] transition-colors appearance-none ${
                      errors.budgetRange ? 'border-red-500' : 'border-[#E8D7BE]'
                    }`}
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {t(opt.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.budgetRange && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.budgetRange}</p>
                )}
              </div>
            </div>

            {/* Custom Budget input if custom range selected */}
            {formData.budgetRange === 'budget_range_custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-2">
                  {t('form_field_budget_custom')}
                </label>
                <input
                  type="text"
                  value={formData.customBudget}
                  onChange={(e) => setFormData({ ...formData, customBudget: e.target.value })}
                  placeholder="e.g., 15,000,000 AMD"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F4] border border-[#E8D7BE] text-sm text-[#292723] focus:outline-none focus:ring-2 focus:ring-[#B89B72]"
                />
              </motion.div>
            )}

            {/* Optional Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#292723] mb-2">
                {t('form_field_message')}
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('form_field_message_placeholder')}
                className="w-full p-4 rounded-xl bg-[#FAF8F4] border border-[#E8D7BE] text-sm text-[#292723] focus:outline-none focus:ring-2 focus:ring-[#B89B72] transition-colors"
              />
            </div>

            {/* Status Feedback Message Banner */}
            <AnimatePresence>
              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
                    statusMessage.type === 'demo'
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : statusMessage.type === 'success'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-red-50 border-red-300 text-red-900'
                  }`}
                >
                  {statusMessage.type === 'demo' ? (
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  ) : statusMessage.type === 'success' ? (
                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{statusMessage.title}</h4>
                    <p className="text-xs font-light leading-relaxed">{statusMessage.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-full bg-[#292723] text-[#FAF8F4] font-semibold text-xs uppercase tracking-widest hover:bg-[#B89B72] hover:text-[#292723] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t('form_submitting')}</span>
              ) : (
                <>
                  <span>{t('form_submit_btn')}</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
