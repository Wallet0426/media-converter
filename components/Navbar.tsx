'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import SpinningLogo from './SpinningLogo';
import { useI18n } from '@/lib/i18n/context';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#converter" className="flex items-center gap-2">
            <SpinningLogo />
            <span className="font-display text-xl font-bold tracking-tight">
              Media-Converter
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              {t('nav.features')}
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              {t('nav.faq')}
            </a>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a
                href="#features"
                onClick={closeMenu}
                className="block px-3 py-2.5 text-base font-medium text-slate-600 hover:text-red-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t('nav.features')}
              </a>
              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="block px-3 py-2.5 text-base font-medium text-slate-600 hover:text-red-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t('nav.howItWorks')}
              </a>
              <a
                href="#faq"
                onClick={closeMenu}
                className="block px-3 py-2.5 text-base font-medium text-slate-600 hover:text-red-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t('nav.faq')}
              </a>
              <div className="pt-4">
                <a
                  href="#converter"
                  onClick={closeMenu}
                  className="block w-full text-center bg-red-600 text-white px-5 py-3 rounded-xl text-base font-medium"
                >
                  {t('nav.convertNow')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
