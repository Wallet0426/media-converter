import { NextRequest, NextResponse } from 'next/server';
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

  return NextResponse.json({
    status: job.status,
    progress: job.progress,
    fileName: job.fileName,
    error: job.error,
  });
}

