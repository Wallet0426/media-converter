import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { getJob } from '@/lib/jobs';
import { isValidJobId } from '@/lib/validation';
import { Readable } from 'stream';

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
const TMP_BASE = path.join(os.tmpdir(), 'media-converter');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  // ── UUID 검증 ──
  if (!isValidJobId(jobId)) {
    return NextResponse.json({ error: 'Invalid job ID.' }, { status: 400 });
  }

  const job = getJob(jobId);

  if (!job) {
    return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
  }

  if (job.status !== 'done' || !job.filePath) {
    return NextResponse.json({ error: 'Conversion not complete.' }, { status: 400 });
  }

  // ── Path Traversal 방지 ──
  const resolvedPath = path.resolve(job.filePath);
  if (!resolvedPath.startsWith(TMP_BASE)) {
    return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
  }

  if (!fs.existsSync(resolvedPath)) {
    return NextResponse.json({ error: 'File expired. Please convert again.' }, { status: 410 });
  }

  // ── 파일 크기 제한 (5GB) ──
  const stat = fs.statSync(resolvedPath);
  if (stat.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large.' }, { status: 413 });
  }

  const fileName = job.fileName || `download.${job.format}`;
  const contentType = job.format === 'mp3' ? 'audio/mpeg' : 'video/mp4';

  // ── 스트리밍 응답 (메모리 절약) ──
  const nodeStream = fs.createReadStream(resolvedPath);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream;

  // 다운로드 후 30분 뒤 자동 삭제 예약
  setTimeout(() => {
    try {
      const dir = path.dirname(resolvedPath);
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // 이미 삭제됨
    }
  }, 30 * 60 * 1000);

  return new NextResponse(webStream, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'Content-Length': stat.size.toString(),
    },
  });
}
