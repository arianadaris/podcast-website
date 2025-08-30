import { fetchEpisodes, Episode, clearEpisodeCache, getCacheInfo, forceRefreshEpisodes } from './rssService';

// Mock fetch globally
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('RSS Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearEpisodeCache();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('fetchEpisodes', () => {
    it('should fetch episodes from RSS feed', async () => {
      const mockResponse = `
        <rss version="2.0">
          <channel>
            <title>808's & Cold Takes</title>
            <item>
              <title>Test Episode | 808s & Cold Takes Ep. 1</title>
              <description>Test description</description>
              <pubDate>Fri, 22 Aug 2025 14:40:02 -0700</pubDate>
              <itunes:duration>3600</itunes:duration>
              <enclosure url="https://example.com/episode1.mp3" type="audio/mpeg" length="123456"/>
              <guid>test-episode-1</guid>
            </item>
          </channel>
        </rss>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockResponse),
      });

      const episodes = await fetchEpisodes();

      expect(episodes).toHaveLength(1);
      expect(episodes[0].title).toBe('Test Episode | 808s & Cold Takes Ep. 1');
      expect(episodes[0].description).toBe('Test description');
      expect(episodes[0].length).toBe('60:00');
    });

    it('should return mock episodes when RSS fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const episodes = await fetchEpisodes();

      expect(episodes).toHaveLength(6); // Mock episodes count
      expect(episodes[0].title).toContain('Vices and Vietnam');
    });
  });

  describe('Caching', () => {
    it('should cache episodes after successful fetch', async () => {
      const mockResponse = `
        <rss version="2.0">
          <channel>
            <title>808's & Cold Takes</title>
            <item>
              <title>Test Episode | 808s & Cold Takes Ep. 1</title>
              <description>Test description</description>
              <pubDate>Fri, 22 Aug 2025 14:40:02 -0700</pubDate>
              <itunes:duration>3600</itunes:duration>
              <enclosure url="https://example.com/episode1.mp3" type="audio/mpeg" length="123456"/>
              <guid>test-episode-1</guid>
            </item>
          </channel>
        </rss>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockResponse),
      });

      await fetchEpisodes();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'rss_episodes_cache',
        expect.stringContaining('"episodes"')
      );
    });

    it('should return cached episodes on subsequent calls', async () => {
      const cachedData = {
        episodes: [
          {
            id: 'cached-episode',
            title: 'Cached Episode',
            description: 'Cached description',
            date: '2025-08-22',
            length: '30:00',
            audioUrl: 'https://example.com/cached.mp3',
          },
        ],
        timestamp: Date.now(),
        expiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes from now
      };

      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(cachedData));

      const episodes = await fetchEpisodes();

      expect(episodes).toHaveLength(1);
      expect(episodes[0].title).toBe('Cached Episode');
      expect(fetch).not.toHaveBeenCalled(); // Should not make network request
    });

    it('should force refresh when forceRefreshEpisodes is called', async () => {
      const mockResponse = `
        <rss version="2.0">
          <channel>
            <title>808's & Cold Takes</title>
            <item>
              <title>Fresh Episode | 808s & Cold Takes Ep. 1</title>
              <description>Fresh description</description>
              <pubDate>Fri, 22 Aug 2025 14:40:02 -0700</pubDate>
              <itunes:duration>3600</itunes:duration>
              <enclosure url="https://example.com/fresh.mp3" type="audio/mpeg" length="123456"/>
              <guid>fresh-episode-1</guid>
            </item>
          </channel>
        </rss>
      `;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockResponse),
      });

      const episodes = await forceRefreshEpisodes();

      expect(episodes).toHaveLength(1);
      expect(episodes[0].title).toBe('Fresh Episode | 808s & Cold Takes Ep. 1');
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe('Cache Management', () => {
    it('should clear cache when clearEpisodeCache is called', () => {
      clearEpisodeCache();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('rss_episodes_cache');
    });

    it('should return cache info correctly', () => {
      const cacheInfo = getCacheInfo();
      expect(cacheInfo.hasCache).toBe(false);
    });

    it('should return cache info when cache exists', () => {
      const cachedData = {
        episodes: [],
        timestamp: Date.now(),
        expiresAt: Date.now() + 30 * 60 * 1000,
      };

      localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(cachedData));

      const cacheInfo = getCacheInfo();
      expect(cacheInfo.hasCache).toBe(true);
      expect(cacheInfo.expiresAt).toBeDefined();
      expect(cacheInfo.cacheAge).toBeDefined();
    });
  });
});
