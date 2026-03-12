'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Youtube,
  Music,
  Video,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import DownloadButton from './DownloadButton';
import { useI18n } from '@/lib/i18n/context';

type Format = 'mp3' | 'mp4';
type ConvertState = 'idle' | 'converting' | 'done' | 'error';

export default function ConvertForm() {
  const { t } = useI18n();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<Format>('mp3');
  const [quality, setQuality] = useState('best');
  const [state, setState] = useState<ConvertState>('idle');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [jobId, setJobId] = useState('');
  const [fileName, setFileName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const pollStatus = useCallback(
    (id: string) => {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/status/${id}`);
          const data = await res.json();

          if (data.error && data.status === undefined) {
            stopPolling();
            setState('error');
            setErrorMsg(data.error);
            return;
          }

          setProgress(data.progress || 0);
          setStatusText(data.status || '');

          if (data.status === 'done') {
            stopPolling();
            setState('done');
            setFileName(data.fileName || 'download');
            setProgress(100);
          } else if (data.status === 'error') {
            stopPolling();
            setState('error');
            setErrorMsg(data.error || t('converter.requestFailed'));
          }
        } catch {
          stopPolling();
          setState('error');
          setErrorMsg(t('converter.serverError'));
        }
      }, 1000);
    },
    [stopPolling, t]
  );

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setState('converting');
    setProgress(0);
    setErrorMsg('');
    setFileName('');
    setStatusText('pending');

    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format, quality }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState('error');
        setErrorMsg(data.error || t('converter.requestFailed'));
        return;
      }

      setJobId(data.jobId);
      pollStatus(data.jobId);
    } catch {
      setState('error');
      setErrorMsg(t('converter.serverError'));
    }
  };

  const handleReset = () => {
    stopPolling();
    setState('idle');
    setUrl('');
    setProgress(0);
    setErrorMsg('');
    setFileName('');
    setJobId('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-xl p-4 md:p-8 rounded-2xl md:rounded-3xl">
      <form onSubmit={handleConvert} className="space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 md:pl-5 flex items-center pointer-events-none">
            <Youtube className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder={t('converter.placeholder')}
            className="block w-full pl-11 md:pl-12 pr-16 py-4 md:py-5 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none text-slate-900 text-sm md:text-base"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={state === 'converting'}
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button
              type="submit"
              disabled={state === 'converting' || !url}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {state === 'converting' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setFormat('mp3'); setQuality('best'); }}
              disabled={state === 'converting'}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                format === 'mp3'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Music className="w-4 h-4" />
              {t('converter.mp3')}
            </button>
            <button
              type="button"
              onClick={() => { setFormat('mp4'); setQuality('2160'); }}
              disabled={state === 'converting'}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${
                format === 'mp4'
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Video className="w-4 h-4" />
              {t('converter.mp4')}
            </button>
          </div>

          {format === 'mp3' ? (
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={state === 'converting'}
              className="w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="best">{t('converter.bestAudio')}</option>
              <option value="256">{t('converter.256kbps')}</option>
              <option value="192">{t('converter.192kbps')}</option>
              <option value="128">{t('converter.128kbps')}</option>
            </select>
          ) : (
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={state === 'converting'}
              className="w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="2160">{t('converter.4k')}</option>
              <option value="1440">{t('converter.1440p')}</option>
              <option value="1080">{t('converter.1080p')}</option>
              <option value="720">{t('converter.720p')}</option>
              <option value="480">{t('converter.480p')}</option>
            </select>
          )}
        </div>
      </form>

      {/* 진행률 바 */}
      {state === 'converting' && (
        <ProgressBar progress={progress} status={statusText} />
      )}

      {/* 완료 - 다운로드 버튼 */}
      {state === 'done' && jobId && (
        <div className="mt-5 space-y-3">
          <DownloadButton jobId={jobId} fileName={fileName} />
          <button
            onClick={handleReset}
            className="w-full text-sm text-slate-500 hover:text-slate-700 py-2 transition-colors"
          >
            {t('converter.convertAnother')}
          </button>
        </div>
      )}

      {/* 에러 */}
      {state === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
            <button
              onClick={handleReset}
              className="text-red-600 text-sm underline mt-1.5 hover:text-red-800"
            >
              {t('converter.tryAgain')}
            </button>
          </div>
        </motion.div>
      )}

      {/* 하단 배지 */}
      {state === 'idle' && (
        <div className="mt-6 flex items-center justify-center gap-4 md:gap-6 text-xs text-slate-400 font-medium uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            {t('converter.highQuality')}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            {t('converter.noAds')}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            {t('converter.secure')}
          </span>
        </div>
      )}
    </div>
  );
}

