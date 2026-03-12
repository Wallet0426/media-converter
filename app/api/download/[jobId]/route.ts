import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getJob } from '@/lib/jobs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  const job = getJob(jobId);

  if (!job) {
    return NextResponse.json(
      { error: '작업을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  if (job.status !== 'done' || !job.filePath) {
    return NextResponse.json(
      { error: '아직 변환이 완료되지 않았습니다.' },
      { status: 400 }
    );
  }

  if (!fs.existsSync(job.filePath)) {
    return NextResponse.json(
      { error: '파일이 만료되었습니다. 다시 변환해주세요.' },
      { status: 410 }
    );
  }

  const fileBuffer = fs.readFileSync(job.filePath);
  const fileName = job.fileName || `download.${job.format}`;
  const contentType = job.format === 'mp3' ? 'audio/mpeg' : 'video/mp4';

  // 다운로드 후 30분 뒤 자동 삭제 예약
  setTimeout(() => {
    try {
      const dir = path.dirname(job.filePath!);
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // 이미 삭제됨
    }
  }, 30 * 60 * 1000);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      'Content-Length': fileBuffer.length.toString(),
    },
  });
}

