import fs from 'fs';
import path from 'path';
import os from 'os';
import { getAllJobs, deleteJob } from './jobs';

const MAX_AGE_MS = 30 * 60 * 1000; // 30분

export function cleanupOldJobs(): void {
  const now = Date.now();
  const jobs = getAllJobs();

  for (const job of jobs) {
    if (now - job.createdAt > MAX_AGE_MS) {
      // 파일 삭제
      if (job.filePath && fs.existsSync(job.filePath)) {
        const dir = path.dirname(job.filePath);
        fs.rmSync(dir, { recursive: true, force: true });
      }
      deleteJob(job.id);
    }
  }
}

// 정리 인터벌 시작 (5분마다)
let cleanupInterval: ReturnType<typeof setInterval> | null = null;

export function startCleanupScheduler(): void {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(cleanupOldJobs, 5 * 60 * 1000);
}

export function ensureTmpDir(): void {
  const dir = path.join(os.tmpdir(), 'media-converter');
  fs.mkdirSync(dir, { recursive: true });
}

