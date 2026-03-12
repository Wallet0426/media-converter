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
      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200"
    >
      <Download className="w-5 h-5 shrink-0" />
      <span className="truncate max-w-[200px]">{fileName}</span>
      <span className="shrink-0">{t('download.button')}</span>
    </motion.a>
  );
}
