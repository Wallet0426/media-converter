import { z } from 'zod';

const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]+/;

const TWITCH_REGEX =
  /^(https?:\/\/)?(www\.)?twitch\.tv\/videos\/\d+/;

const ALLOWED_HOSTS = [
  'youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com',
  'twitch.tv', 'www.twitch.tv',
];

const ALLOWED_QUALITIES = ['best', '128', '192', '256', '480', '720', '1080', '1440', '2160'];

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// ── Zod 스키마 ──
export const convertSchema = z.object({
  url: z.string().min(1).max(500),
  format: z.enum(['mp3', 'mp4']),
  quality: z.string().refine((val) => ALLOWED_QUALITIES.includes(val), {
    message: 'Invalid quality value',
  }).optional().default('best'),
});

export type Platform = 'youtube' | 'twitch' | 'unknown';

export function detectPlatform(url: string): Platform {
  if (YOUTUBE_REGEX.test(url)) return 'youtube';
  if (TWITCH_REGEX.test(url)) return 'twitch';
  return 'unknown';
}

export function isValidUrl(url: string): boolean {
  if (detectPlatform(url) === 'unknown') return false;

  // 호스트 화이트리스트 검증
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return ALLOWED_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

export function isValidJobId(jobId: string): boolean {
  return UUID_V4_REGEX.test(jobId);
}

export function sanitizeUrl(url: string): string {
  // 프로토콜 없으면 추가
  const withProtocol = url.startsWith('http') ? url : `https://${url}`;
  try {
    const parsed = new URL(withProtocol);
    // 허용된 호스트만 통과
    if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
      throw new Error('Invalid host');
    }
    return parsed.toString();
  } catch {
    throw new Error('Invalid URL');
  }
}
