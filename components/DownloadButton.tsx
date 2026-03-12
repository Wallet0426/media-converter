'use client';

import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface DownloadButtonProps {
  jobId: string;
  fileName: string;
}

export default function DownloadButton({ jobId, fileName }: DownloadButtonProps) {
  const { t } = useI18n();

  return (
    <motion.a
      href={`/api/download/${jobId}`}
      download={fileName}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all mt-1"
    >
      <Download className="w-4 h-4 shrink-0" />
      {t('download.button')}
    </motion.a>
  );
}
