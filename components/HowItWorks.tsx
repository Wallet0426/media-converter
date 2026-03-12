'use client';

import { Link, Settings, Download } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

const steps = [
  { icon: Link, titleKey: 'howItWorks.step1.title', descKey: 'howItWorks.step1.desc', num: '01' },
  { icon: Settings, titleKey: 'howItWorks.step2.title', descKey: 'howItWorks.step2.desc', num: '02' },
  { icon: Download, titleKey: 'howItWorks.step3.title', descKey: 'howItWorks.step3.desc', num: '03' },
];

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative text-center">
                {/* 연결선 (모바일 제외) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%-8px)] border-t-2 border-dashed border-slate-300" />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-red-100 flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                    Step {step.num}
                  </span>
                  <h3 className="text-xl font-bold font-display mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

