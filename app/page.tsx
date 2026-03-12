'use client';

import { Zap, ShieldCheck, Smartphone, Github, Twitter, Music, Film } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ConvertForm from '@/components/ConvertForm';
import FeatureCard from '@/components/FeatureCard';
import HowItWorks from '@/components/HowItWorks';
import FaqSection from '@/components/FaqSection';
import ScrollToTop from '@/components/ScrollToTop';
import SpinningLogo from '@/components/SpinningLogo';
import { useI18n } from '@/lib/i18n/context';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen selection:bg-red-100 selection:text-red-900">
      <Navbar />
      <ScrollToTop />

      {/* Hero Section */}
      <section
        id="converter"
        className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden"
      >
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-6 border border-red-100">
              <Zap className="w-4 h-4" />
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              {t('hero.title1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                {t('hero.title2')}
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              {t('hero.description')}
            </p>
          </div>

          {/* Converter Box */}
          <div className="max-w-3xl mx-auto">
            <ConvertForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title={t('features.fast.title')}
              description={t('features.fast.desc')}
            />
            <FeatureCard
              icon={ShieldCheck}
              title={t('features.secure.title')}
              description={t('features.secure.desc')}
            />
            <FeatureCard
              icon={Smartphone}
              title={t('features.mobile.title')}
              description={t('features.mobile.desc')}
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <HowItWorks />

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <Music className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-2xl md:text-3xl font-display font-bold mb-1">
                {t('stats.formats')}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {t('stats.formatsLabel')}
              </div>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <Film className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-2xl md:text-3xl font-display font-bold mb-1">
                {t('stats.platforms')}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {t('stats.platformsLabel')}
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-1 mt-3">
                {t('stats.price')}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {t('stats.priceLabel')}
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-1 mt-3">
                {t('stats.quality')}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {t('stats.qualityLabel')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <SpinningLogo />
                <span className="font-display text-xl font-bold tracking-tight">
                  Media-Converter
                </span>
              </div>
              <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 max-w-sm">
                {t('footer.personalUse')}
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-5 text-slate-900">{t('footer.product')}</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#converter" className="hover:text-red-600 transition-colors">{t('footer.mp3')}</a></li>
                <li><a href="#converter" className="hover:text-red-600 transition-colors">{t('footer.mp4')}</a></li>
                <li><a href="#how-it-works" className="hover:text-red-600 transition-colors">{t('footer.howItWorks')}</a></li>
                <li><a href="#faq" className="hover:text-red-600 transition-colors">{t('footer.faq')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-5 text-slate-900">{t('footer.legal')}</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-red-600 transition-colors">{t('footer.terms')}</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-red-600 transition-colors">{t('footer.disclaimer')}</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-400 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear().toString() })}
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              {t('footer.madeWith')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
