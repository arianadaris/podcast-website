export interface Episode {
  id: string;
  title: string;
  description: string;
  date: string;
  length: string;
  audioUrl: string;
  imageUrl?: string;
  duration?: string;
  pubDate?: string;
}

export interface RSSItem {
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  enclosure?: {
    url: string;
    type: string;
    length: string;
  };
  guid: string;
}

export interface RSSFeed {
  title: string;
  description: string;
  items: RSSItem[];
}

// Cache interface for storing episodes
interface EpisodeCache {
  episodes: Episode[];
  timestamp: number;
  expiresAt: number;
}

// Cache configuration
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds (RSS feeds don't update frequently)
const CACHE_KEY = 'rss_episodes_cache';
const REQUEST_TIMEOUT = 15000; // 15 seconds timeout
const MAX_RETRIES = 3;

// In-memory cache
let memoryCache: EpisodeCache | null = null;

// Cache management functions
const getCachedEpisodes = (): Episode[] | null => {
  const now = Date.now();
  
  // Check in-memory cache first
  if (memoryCache && now < memoryCache.expiresAt) {
    return memoryCache.episodes;
  }
  
  // Check localStorage cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const cacheData: EpisodeCache = JSON.parse(cached);
      if (now < cacheData.expiresAt) {
        // Update memory cache
        memoryCache = cacheData;
        return cacheData.episodes;
      } else {
        // Cache expired, remove it
        localStorage.removeItem(CACHE_KEY);
      }
    }
  } catch (error) {
    localStorage.removeItem(CACHE_KEY);
  }
  
  return null;
};

const setCachedEpisodes = (episodes: Episode[]): void => {
  const now = Date.now();
  const cacheData: EpisodeCache = {
    episodes,
    timestamp: now,
    expiresAt: now + CACHE_DURATION
  };
  
  // Update memory cache
  memoryCache = cacheData;
  
  // Update localStorage cache
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    // Silently fail
  }
};

const clearCache = (): void => {
  memoryCache = null;
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    // Silently fail
  }
};

// Function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  // Common HTML entities mapping
  const entityMap: Record<string, string> = {
    '&apos;': "'",
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' ',
    '&#39;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
  };
  
  // First decode numeric entities (&#39;, &#x27;, etc.)
  let decoded = text.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // Then decode named entities
  for (const [entity, char] of Object.entries(entityMap)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  
  return decoded;
};

// Function to parse duration from seconds to MM:SS format
const formatDuration = (seconds: string): string => {
  const totalSeconds = parseInt(seconds, 10);
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Helper function to fetch with timeout
const fetchWithTimeout = (url: string, timeout: number = REQUEST_TIMEOUT): Promise<Response> => {
  return Promise.race([
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
    }),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timeout after ${timeout}ms`)), timeout)
    )
  ]);
};

// Helper function to fetch with retry logic
const fetchWithRetry = async (
  url: string,
  maxRetries: number = MAX_RETRIES,
  delay: number = 1000
): Promise<Response> => {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, REQUEST_TIMEOUT);
      if (response.ok) {
        return response;
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const waitTime = delay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
};

// Function to fetch fresh episodes from RSS feed
const fetchFreshEpisodes = async (): Promise<Episode[]> => {
  const rssUrl = 'https://feeds.buzzsprout.com/1737669.rss';
  const corsProxy = 'https://api.allorigins.win/raw?url=';
  
  let response: Response;
  
  // Try direct access first (some RSS feeds allow direct CORS access)
  try {
    response = await fetchWithRetry(rssUrl);
  } catch (directError) {
    // Fallback to CORS proxy
    try {
      response = await fetchWithRetry(corsProxy + encodeURIComponent(rssUrl));
    } catch (proxyError) {
      throw new Error(`Failed to fetch RSS feed: ${proxyError instanceof Error ? proxyError.message : 'Unknown error'}`);
    }
  }
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const xmlText = await response.text();
  
  const episodes = parseRSSXML(xmlText);
  
  // Cache the episodes
  setCachedEpisodes(episodes);
  
  return episodes;
};

// Function to refresh episodes in background (for stale-while-revalidate)
let backgroundRefreshPromise: Promise<Episode[]> | null = null;

const refreshEpisodesInBackground = async (): Promise<void> => {
  // Prevent multiple simultaneous background refreshes
  if (backgroundRefreshPromise) {
    return;
  }
  
  backgroundRefreshPromise = fetchFreshEpisodes().catch(error => {
    return [];
  }).finally(() => {
    backgroundRefreshPromise = null;
  });
  
  await backgroundRefreshPromise;
};

// Function to parse RSS XML and extract episode data
const parseRSSXML = (xmlText: string): Episode[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  const items = xmlDoc.querySelectorAll('item');
  const episodes: Episode[] = [];

  items.forEach((item, index) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    
    // Try different duration selectors for Buzzsprout
    let duration = '';
    const durationElement = item.querySelector('itunes\\:duration') || 
                           item.querySelector('duration') ||
                           item.querySelector('[duration]');
    if (durationElement) {
      duration = durationElement.textContent || durationElement.getAttribute('duration') || '';
    }
    
    const enclosure = item.querySelector('enclosure');
    const guid = item.querySelector('guid')?.textContent || `episode-${index}`;

    // Extract image URL from various possible sources
    let imageUrl = '';
    const imageElement = item.querySelector('itunes\\:image') || 
                        item.querySelector('image') ||
                        item.querySelector('media\\:content') ||
                        item.querySelector('media\\:thumbnail');
    
    if (imageElement) {
      imageUrl = imageElement.getAttribute('href') || 
                 imageElement.getAttribute('url') || 
                 imageElement.getAttribute('src') || '';
    }

    // Parse the date
    const date = new Date(pubDate);
    const formattedDate = isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Format duration - handle both seconds and MM:SS format
    let formattedDuration = '0:00';
    if (duration) {
      if (duration.includes(':')) {
        // Already in MM:SS format
        formattedDuration = duration;
      } else {
        // Convert seconds to MM:SS
        formattedDuration = formatDuration(duration);
      }
    }

    // Get audio URL from enclosure
    const audioUrl = enclosure?.getAttribute('url') || '#';

    // Clean and decode the description
    let cleanedDescription = description.replace(/<[^>]*>/g, ''); // Remove HTML tags
    cleanedDescription = decodeHtmlEntities(cleanedDescription); // Decode HTML entities
    
    // Clean and decode the title
    let cleanedTitle = title.replace(/^\d+\.\s*/, ''); // Remove episode numbers from title
    cleanedTitle = decodeHtmlEntities(cleanedTitle); // Decode HTML entities

    episodes.push({
      id: guid,
      title: cleanedTitle,
      description: cleanedDescription,
      date: formattedDate,
      length: formattedDuration,
      audioUrl,
      imageUrl,
      duration,
      pubDate,
    });
  });

  return episodes;
};

// Function to fetch RSS feed with caching and stale-while-revalidate pattern
export const fetchEpisodes = async (forceRefresh: boolean = false): Promise<Episode[]> => {
  const cachedEpisodes = getCachedEpisodes();
  
  // If we have cache and not forcing refresh, use stale-while-revalidate pattern
  if (cachedEpisodes && !forceRefresh) {
    // Return cached data immediately
    // Refresh in background (don't await - fire and forget)
    refreshEpisodesInBackground().catch(err => {
      // Silently fail
    });
    
    return cachedEpisodes;
  }
  
  // No cache or force refresh - fetch normally
  try {
    return await fetchFreshEpisodes();
  } catch (error) {
    // Try to return cached data as fallback (even if expired)
    if (cachedEpisodes) {
      return cachedEpisodes;
    }
    
    // Return mock data as final fallback
    return getMockEpisodes();
  }
};

// Fallback mock data
const getMockEpisodes = (): Episode[] => [
  {
    id: '1',
    title: 'Vices and Vietnam | 808s & Cold Takes Ep. 123',
    description: 'Top 5 favorite vapes, ranking vices, songs for sexy-time, holding homies up when they catching it, media we consumed this week, and The Vietnam War',
    date: '2025-08-22',
    length: '58:12',
    audioUrl: '#',
    imageUrl: '/logo.png',
  },
  {
    id: '2',
    title: 'Rappers In Movies | 808s & Cold Takes Ep. 122',
    description: 'Rappers in movies, new JID album review, our favorite movie trilogies, movies that make us cry, favorite Scorsese movies.',
    date: '2025-08-16',
    length: '1:25:51',
    audioUrl: '#',
    imageUrl: '/logo.png',
  },
  {
    id: '3',
    title: 'Soundcloud Reminiscing | 808s & Cold Takes Ep. 121',
    description: 'Talking about our history and experience with Soundcloud',
    date: '2025-08-09',
    length: '1:10:08',
    audioUrl: '#',
    imageUrl: '/logo.png',
  },
  {
    id: '4',
    title: 'XXL Freshmen Live Reaction & Bracket | 808s & Cold Takes Ep. 120',
    description: 'listening to a XXL freshmen cypher live on the show, best XXL freshmen bracket, hiding monthly listener count, Brayden faking it to get bitches, is Sinners a musical?',
    date: '2025-08-01',
    length: '1:02:10',
    audioUrl: '#',
    imageUrl: '/logo.png',
  },
  {
    id: '5',
    title: 'Favorite Features & Superman Review | 808s & Cold Takes Ep. 119',
    description: 'Fabolous Blasphemy, our best, worst, and favorite rap features, Superman (2025) review, and Scorsese talk',
    date: '2025-07-22',
    length: '1:32:28',
    audioUrl: '#',
    imageUrl: '/logo.png',
  },
  {
    id: '6',
    title: 'The Return of ALBUMPALOOZA: Clipse & Justin Bieber Album Reviews | 808s & Cold Takes Ep. 118',
    description: 'Our reviews for Let God Sort Em Out by Clips and SWAG by Justin Bieber',
    date: '2025-07-19',
    length: '58:34',
    audioUrl: '#',
    imageUrl: '/logo.png',
  },
];

// Cache utility functions
export const clearEpisodeCache = (): void => {
  clearCache();
};

export const getCacheInfo = (): { hasCache: boolean; expiresAt?: number; cacheAge?: number } => {
  const now = Date.now();
  
  if (memoryCache && now < memoryCache.expiresAt) {
    return {
      hasCache: true,
      expiresAt: memoryCache.expiresAt,
      cacheAge: now - memoryCache.timestamp
    };
  }
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const cacheData: EpisodeCache = JSON.parse(cached);
      if (now < cacheData.expiresAt) {
        return {
          hasCache: true,
          expiresAt: cacheData.expiresAt,
          cacheAge: now - cacheData.timestamp
        };
      }
    }
  } catch (error) {
    // Silently fail
  }
  
  return { hasCache: false };
};

export const forceRefreshEpisodes = async (): Promise<Episode[]> => {
  return fetchEpisodes(true);
};
