import { NextRequest, NextResponse } from 'next/server';

// ── In-memory Rate Limiter ──
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/convert': { max: 5, windowMs: 60_000 },       // 분당 5회
  '/api/status': { max: 60, windowMs: 60_000 },       // 분당 60회
  '/api/download': { max: 10, windowMs: 60_000 },     // 분당 10회
};

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}

function checkRateLimit(ip: string, endpoint: string): boolean {
  const config = Object.entries(RATE_LIMITS).find(([path]) =>
    endpoint.startsWith(path)
  );
  if (!config) return true;

  const [, { max, windowMs }] = config;
  const key = `${ip}:${config[0]}`;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= max) {
    return false;
  }

  record.count++;
  return true;
}

// 오래된 엔트리 정리 (메모리 누수 방지)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 60_000);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트만 처리
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = getClientIp(request);

  // ── Rate Limiting ──
  if (!checkRateLimit(ip, pathname)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  // ── CSRF 보호 (POST 요청) ──
  if (request.method === 'POST') {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    if (origin) {
      const originHost = new URL(origin).host;
      if (host && originHost !== host) {
        return NextResponse.json(
          { error: 'Forbidden: Invalid origin.' },
          { status: 403 }
        );
      }
    }
  }

  // ── Content-Length 제한 (POST 요청, 1KB) ──
  if (request.method === 'POST') {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 1024) {
      return NextResponse.json(
        { error: 'Request body too large.' },
        { status: 413 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};

