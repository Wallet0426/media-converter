import { spawn } from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { updateJob } from './jobs';

function getTmpDir(jobId: string): string {
  const dir = path.join(os.tmpdir(), 'media-converter', jobId);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function parseProgress(line: string): number | null {
  // yt-dlp outputs lines like: [download]  45.2% of ~10.00MiB ...
  const match = line.match(/\[download\]\s+([\d.]+)%/);
  if (match) {
    return parseFloat(match[1]);
  }
  return null;
}

export function startDownload(
  jobId: string,
  url: string,
  format: 'mp3' | 'mp4',
  quality: string
): void {
  const tmpDir = getTmpDir(jobId);
  const outputTemplate = path.join(tmpDir, '%(title)s.%(ext)s');

  const args: string[] = ['-m', 'yt_dlp', '--newline', '--no-playlist'];

  if (format === 'mp3') {
    args.push('-x', '--audio-format', 'mp3');
    // 비트레이트 설정
    if (quality === '256') {
      args.push('--audio-quality', '256K');
    } else if (quality === '192') {
      args.push('--audio-quality', '192K');
    } else if (quality === '128') {
      args.push('--audio-quality', '128K');
    } else {
      args.push('--audio-quality', '0'); // best
    }
    args.push('-o', outputTemplate);
  } else {
    // MP4
    if (quality === 'best') {
      args.push(
        '-f',
        'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
      );
    } else if (quality === '2160') {
      args.push(
        '-f',
        'bestvideo[height<=2160][ext=mp4]+bestaudio[ext=m4a]/best[height<=2160][ext=mp4]/best'
      );
    } else if (quality === '1440') {
      args.push(
        '-f',
        'bestvideo[height<=1440][ext=mp4]+bestaudio[ext=m4a]/best[height<=1440][ext=mp4]/best'
      );
    } else if (quality === '1080') {
      args.push(
        '-f',
        'bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080][ext=mp4]/best'
      );
    } else if (quality === '720') {
      args.push(
        '-f',
        'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best'
      );
    } else if (quality === '480') {
      args.push(
        '-f',
        'bestvideo[height<=480][ext=mp4]+bestaudio[ext=m4a]/best[height<=480][ext=mp4]/best'
      );
    } else {
      args.push('-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best');
    }
    args.push('--merge-output-format', 'mp4');
    args.push('-o', outputTemplate);
  }

  args.push(url);

  updateJob(jobId, { status: 'downloading', progress: 0 });

  const proc = spawn('python3', args, {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  proc.stdout.on('data', (data: Buffer) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      const progress = parseProgress(line);
      if (progress !== null) {
        updateJob(jobId, { progress: Math.min(progress, 99) });
      }
      // Detect conversion phase
      if (line.includes('[ExtractAudio]') || line.includes('[Merger]') || line.includes('[ffmpeg]')) {
        updateJob(jobId, { status: 'converting' });
      }
    }
  });

  proc.stderr.on('data', (data: Buffer) => {
    const text = data.toString();
    console.error(`[yt-dlp stderr] ${text}`);
  });

  proc.on('close', (code) => {
    if (code === 0) {
      // Find the output file
      const files = fs.readdirSync(tmpDir);
      const targetExt = format === 'mp3' ? '.mp3' : '.mp4';
      const outputFile = files.find((f) => f.endsWith(targetExt)) || files[0];

      if (outputFile) {
        updateJob(jobId, {
          status: 'done',
          progress: 100,
          filePath: path.join(tmpDir, outputFile),
          fileName: outputFile,
        });
      } else {
        updateJob(jobId, {
          status: 'error',
          error: '변환된 파일을 찾을 수 없습니다.',
        });
      }
    } else {
      updateJob(jobId, {
        status: 'error',
        error: `변환에 실패했습니다. (코드: ${code}). URL을 확인해주세요.`,
      });
    }
  });

  proc.on('error', (err) => {
    updateJob(jobId, {
      status: 'error',
      error: `프로세스 실행 오류: ${err.message}`,
    });
  });
}

