'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const FAQ_KEYS = ['faq.q1', 'faq.q2', 'faq.q3', 'faq.q4', 'faq.q5', 'faq.q6'];

export default function FaqSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-slate-500">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-3">
          {FAQ_KEYS.map((qKey, index) => {
            const aKey = qKey.replace('.q', '.a');
            const isOpen = openIndex === index;

            return (
              <div
                key={qKey}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-100/50"
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {t(qKey)}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                        {t(aKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

