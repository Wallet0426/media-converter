import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { convertSchema, isValidUrl, sanitizeUrl } from '@/lib/validation';
import { createJob, getAllJobs } from '@/lib/jobs';
import { startDownload, fetchVideoInfo } from '@/lib/ytdlp';
import { startCleanupScheduler, ensureTmpDir } from '@/lib/cleanup';

// 서버 시작 시 정리 스케줄러 및 임시 디렉토리 초기화
startCleanupScheduler();
ensureTmpDir();

const MAX_ACTIVE_JOBS = 10; // 전체 동시 작업 제한

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Zod 스키마 검증 ──
    const parsed = convertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request parameters.' },
        { status: 400 }
      );
    }

    const { url, format, quality } = parsed.data;

    // ── URL 플랫폼 검증 ──
    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL. Please use a YouTube or Twitch VOD link.' },
        { status: 400 }
      );
    }

    // ── URL Sanitize (명령어 인젝션 방지) ──
    let safeUrl: string;
    try {
      safeUrl = sanitizeUrl(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format.' },
        { status: 400 }
      );
    }

    // ── 전체 동시 작업 제한 ──
    const allJobs = getAllJobs();
    const activeCount = allJobs.filter(
      (j) => j.status === 'pending' || j.status === 'downloading' || j.status === 'converting'
    ).length;
    if (activeCount >= MAX_ACTIVE_JOBS) {
      return NextResponse.json(
        { error: 'Server is busy. Please try again later.' },
        { status: 429 }
      );
    }

    const jobId = uuidv4();

    createJob({
      id: jobId,
      url: safeUrl,
      format,
      quality,
      status: 'pending',
      progress: 0,
      createdAt: Date.now(),
    });

    // 비동기로 영상 정보 가져오기 + 다운로드 시작 (fire-and-forget)
    fetchVideoInfo(jobId, safeUrl);
    startDownload(jobId, safeUrl, format, quality);

    return NextResponse.json({ jobId });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
