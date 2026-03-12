export type JobStatus = 'pending' | 'downloading' | 'converting' | 'done' | 'error';

export interface Job {
  id: string;
  url: string;
  format: 'mp3' | 'mp4';
  quality: string;
  status: JobStatus;
  progress: number;
  filePath?: string;
  fileName?: string;
  error?: string;
  createdAt: number;
}

const jobs = new Map<string, Job>();

export function createJob(job: Job): void {
  jobs.set(job.id, job);
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id);
}

export function updateJob(id: string, updates: Partial<Job>): void {
  const job = jobs.get(id);
  if (job) {
    Object.assign(job, updates);
  }
}

export function deleteJob(id: string): void {
  jobs.delete(id);
}

export function getAllJobs(): Job[] {
  return Array.from(jobs.values());
}

