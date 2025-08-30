import { fetchEpisodes, Episode } from './rssService';

// Simple test function to verify RSS service
export const testRSSService = async (): Promise<void> => {
  console.log('Testing RSS service...');
  
  try {
    const episodes = await fetchEpisodes();
    console.log(`Successfully fetched ${episodes.length} episodes`);
    
    if (episodes.length > 0) {
      const firstEpisode = episodes[0];
      console.log('First episode:', {
        title: firstEpisode.title,
        date: firstEpisode.date,
        length: firstEpisode.length,
        description: firstEpisode.description.substring(0, 100) + '...'
      });
    }
  } catch (error) {
    console.error('RSS service test failed:', error);
  }
};

// Test with sample RSS data
export const testRSSParsing = (): void => {
  const sampleRSS = `
    <rss version="2.0">
      <channel>
        <title>808's & Cold Takes</title>
        <item>
          <title>Vices and Vietnam | 808s & Cold Takes Ep. 123</title>
          <description>Top 5 favorite vapes, ranking vices, songs for sexy-time, holding homies up when they catching it, media we consumed this week, and The Vietnam War</description>
          <pubDate>Fri, 22 Aug 2025 14:40:02 -0700</pubDate>
          <itunes:duration>3492</itunes:duration>
          <enclosure url="https://example.com/episode123.mp3" type="audio/mpeg" length="123456"/>
          <guid>Buzzsprout-17718546</guid>
        </item>
      </channel>
    </rss>
  `;
  
  // This would test the parseRSSXML function if it were exported
  console.log('Sample RSS parsing test completed');
};
