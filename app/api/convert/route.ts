import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { isValidUrl } from '@/lib/validation';
import { createJob } from '@/lib/jobs';
import { startDownload } from '@/lib/ytdlp';
import { startCleanupScheduler, ensureTmpDir } from '@/lib/cleanup';

// 서버 시작 시 정리 스케줄러 및 임시 디렉토리 초기화
startCleanupScheduler();
ensureTmpDir();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, format, quality } = body;

    if (!url || !format) {
      return NextResponse.json(
        { error: 'URL과 포맷을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: '유효하지 않은 URL입니다. YouTube 또는 Twitch VOD 링크를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!['mp3', 'mp4'].includes(format)) {
      return NextResponse.json(
        { error: '포맷은 mp3 또는 mp4만 가능합니다.' },
        { status: 400 }
      );
    }

    const jobId = uuidv4();

    createJob({
      id: jobId,
      url,
      format,
      quality: quality || 'best',
      status: 'pending',
      progress: 0,
      createdAt: Date.now(),
    });

    // 비동기로 다운로드 시작 (fire-and-forget)
    startDownload(jobId, url, format, quality || 'best');

    return NextResponse.json({ jobId });
  } catch (error) {
    console.error('Convert API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

