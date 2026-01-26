/**
 * Utility for detecting video platform types from URLs
 */

export type VideoPlatform = 'youtube' | 'instagram' | 'tiktok' | 'other' | null;

/**
 * Detects the platform type from a video URL
 * @param url - The video URL to analyze
 * @returns The platform type or null if URL is empty/invalid
 */
export function detectVideoPlatform(url: string | undefined | null): VideoPlatform {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return null;
  }

  const normalizedUrl = url.toLowerCase().trim();

  // YouTube patterns
  if (
    normalizedUrl.includes('youtube.com') ||
    normalizedUrl.includes('youtu.be') ||
    normalizedUrl.includes('youtube-nocookie.com')
  ) {
    return 'youtube';
  }

  // Instagram patterns
  if (
    normalizedUrl.includes('instagram.com') ||
    normalizedUrl.includes('instagr.am')
  ) {
    return 'instagram';
  }

  // TikTok patterns
  if (
    normalizedUrl.includes('tiktok.com') ||
    normalizedUrl.includes('vm.tiktok.com')
  ) {
    return 'tiktok';
  }

  // If it's a valid URL but not one of the above, return 'other'
  try {
    new URL(url);
    return 'other';
  } catch {
    return null;
  }
}
