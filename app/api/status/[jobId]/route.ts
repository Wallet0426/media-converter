import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/jobs';
import { isValidJobId } from '@/lib/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  if (!isValidJobId(jobId)) {
    return NextResponse.json({ error: 'Invalid job ID.' }, { status: 400 });
  }

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
    title: job.title,
    thumbnail: job.thumbnail,
    error: job.error,
  });
}

