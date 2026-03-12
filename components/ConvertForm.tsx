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
  Download,
  X,
} from 'lucide-react';
import ProgressBar from './ProgressBar';
import { useI18n } from '@/lib/i18n/context';

type Format = 'mp3' | 'mp4';

interface JobItem {
  id: string;
  url: string;
  format: Format;
  quality: string;
  status: 'converting' | 'done' | 'error';
  progress: number;
  statusText: string;
  title: string;
  thumbnail: string;
  fileName: string;
  errorMsg: string;
}

export default function ConvertForm() {
  const { t } = useI18n();
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<Format>('mp3');
  const [quality, setQuality] = useState('best');
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const pollingRefs = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const stopPolling = useCallback((jobId: string) => {
    const interval = pollingRefs.current.get(jobId);
    if (interval) {
      clearInterval(interval);
      pollingRefs.current.delete(jobId);
    }
  }, []);

  useEffect(() => {
    return () => {
      pollingRefs.current.forEach((interval) => clearInterval(interval));
      pollingRefs.current.clear();
    };
  }, []);

  const updateJob = useCallback((jobId: string, updates: Partial<JobItem>) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, ...updates } : j)));
  }, []);

  const pollStatus = useCallback(
    (jobId: string) => {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/status/${jobId}`);
          const data = await res.json();

          if (data.error && data.status === undefined) {
            stopPolling(jobId);
            updateJob(jobId, { status: 'error', errorMsg: data.error });
            return;
          }

          const updates: Partial<JobItem> = {
            progress: data.progress || 0,
            statusText: data.status || '',
          };
          if (data.title) updates.title = data.title;
          if (data.thumbnail) updates.thumbnail = data.thumbnail;

          if (data.status === 'done') {
            stopPolling(jobId);
            updates.status = 'done';
            updates.fileName = data.fileName || 'download';
            updates.progress = 100;
          } else if (data.status === 'error') {
            stopPolling(jobId);
            updates.status = 'error';
            updates.errorMsg = data.error || t('converter.requestFailed');
          }

          updateJob(jobId, updates);
        } catch {
          stopPolling(jobId);
          updateJob(jobId, { status: 'error', errorMsg: t('converter.serverError') });
        }
      }, 1000);

      pollingRefs.current.set(jobId, interval);
    },
    [stopPolling, updateJob, t]
  );

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const activeJobs = jobs.filter((j) => j.status === 'converting').length;
    if (activeJobs >= 3) {
      const limitJob: JobItem = {
        id: crypto.randomUUID(),
        url,
        format,
        quality,
        status: 'error',
        progress: 0,
        statusText: '',
        title: '',
        thumbnail: '',
        fileName: '',
        errorMsg: t('converter.maxJobs'),
      };
      setJobs((prev) => [limitJob, ...prev]);
      return;
    }

    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format, quality }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorJob: JobItem = {
          id: crypto.randomUUID(),
          url,
          format,
          quality,
          status: 'error',
          progress: 0,
          statusText: '',
          title: '',
          thumbnail: '',
          fileName: '',
          errorMsg: data.error || t('converter.requestFailed'),
        };
        setJobs((prev) => [errorJob, ...prev]);
        return;
      }

      const newJob: JobItem = {
        id: data.jobId,
        url,
        format,
        quality,
        status: 'converting',
        progress: 0,
        statusText: 'pending',
        title: '',
        thumbnail: '',
        fileName: '',
        errorMsg: '',
      };

      setJobs((prev) => [newJob, ...prev]);
      setUrl('');
      pollStatus(data.jobId);
    } catch {
      const errorJob: JobItem = {
        id: crypto.randomUUID(),
        url,
        format,
        quality,
        status: 'error',
        progress: 0,
        statusText: '',
        title: '',
        thumbnail: '',
        fileName: '',
        errorMsg: t('converter.serverError'),
      };
      setJobs((prev) => [errorJob, ...prev]);
    }
  };

  const removeJob = (jobId: string) => {
    stopPolling(jobId);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const isConverting = jobs.some((j) => j.status === 'converting');

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
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            <button
              type="submit"
              disabled={!url}
              className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setFormat('mp3'); setQuality('best'); }}
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

      {/* Job 리스트 */}
      {jobs.length > 0 && (
        <div className="mt-5 space-y-3">
          {jobs.map((job) => (
            <div key={job.id}>
              {job.status === 'error' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-700 text-sm font-medium">{job.errorMsg}</p>
                  </div>
                  <button onClick={() => removeJob(job.id)} className="text-red-300 hover:text-red-500 transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    {job.thumbnail ? (
                      <img
                        src={job.thumbnail}
                        alt={job.title}
                        className="w-28 h-20 md:w-36 md:h-24 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-28 h-20 md:w-36 md:h-24 rounded-lg bg-slate-200 shrink-0 animate-pulse" />
                    )}
                    <div className="min-w-0 flex-1">
                      {job.title ? (
                        <p className="text-sm font-semibold text-slate-900 line-clamp-2">{job.title}</p>
                      ) : (
                        <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        {job.format.toUpperCase()} · {job.quality === 'best' ? '320kbps' : job.quality + (job.format === 'mp3' ? 'kbps' : 'p')}
                      </p>

                      {job.status === 'converting' && (
                        <ProgressBar progress={job.progress} status={job.statusText} />
                      )}

                      {job.status === 'done' && (
                        <a
                          href={`/api/download/${job.id}`}
                          download={job.fileName}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors mt-2"
                        >
                          <Download className="w-4 h-4" />
                          {t('download.button')}
                        </a>
                      )}
                    </div>
                    {job.status === 'done' && (
                      <button onClick={() => removeJob(job.id)} className="text-slate-300 hover:text-slate-500 transition-colors shrink-0 self-start">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 하단 배지 */}
      {jobs.length === 0 && (
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

