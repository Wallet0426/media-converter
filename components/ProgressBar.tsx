'use client';

import { motion } from 'motion/react';
import { useI18n } from '@/lib/i18n/context';

interface ProgressBarProps {
  progress: number;
  status: string;
}

export default function ProgressBar({ progress, status }: ProgressBarProps) {
  const { t } = useI18n();

  const statusLabel = {
    pending: t('progress.pending'),
    downloading: t('progress.downloading'),
    converting: t('progress.converting'),
    done: t('progress.done'),
    error: t('progress.error'),
  }[status] || status;

  const barColor = {
    pending: 'from-slate-400 to-slate-500',
    downloading: 'from-blue-500 to-blue-600',
    converting: 'from-red-500 to-rose-500',
    done: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-red-600',
  }[status] || 'from-red-500 to-rose-500';

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-600 font-medium">{statusLabel}</span>
        <span className="text-slate-500 font-mono text-xs">{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
