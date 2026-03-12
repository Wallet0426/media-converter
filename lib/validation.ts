const YOUTUBE_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]+/;

const TWITCH_REGEX =
  /^(https?:\/\/)?(www\.)?twitch\.tv\/videos\/\d+/;

export type Platform = 'youtube' | 'twitch' | 'unknown';

export function detectPlatform(url: string): Platform {
  if (YOUTUBE_REGEX.test(url)) return 'youtube';
  if (TWITCH_REGEX.test(url)) return 'twitch';
  return 'unknown';
}

export function isValidUrl(url: string): boolean {
  return detectPlatform(url) !== 'unknown';
}

