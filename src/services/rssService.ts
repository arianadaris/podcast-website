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

    episodes.push({
      id: guid,
      title: title.replace(/^\d+\.\s*/, ''), // Remove episode numbers from title
      description: description.replace(/<[^>]*>/g, ''), // Remove HTML tags
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

// Function to fetch RSS feed
export const fetchEpisodes = async (): Promise<Episode[]> => {
  try {
    // Use a CORS proxy to avoid CORS issues
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const rssUrl = 'https://feeds.buzzsprout.com/1737669.rss';
    const response = await fetch(corsProxy + encodeURIComponent(rssUrl));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlText = await response.text();
    console.log('RSS XML received:', xmlText.substring(0, 500) + '...'); // Debug log
    
    const episodes = parseRSSXML(xmlText);
    console.log('Parsed episodes:', episodes.length, episodes.slice(0, 2)); // Debug log
    
    // Log image URLs for debugging
    episodes.forEach((episode, index) => {
      if (episode.imageUrl) {
        console.log(`Episode ${index + 1} image:`, episode.imageUrl);
      }
    });
    
    return episodes;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    // Return mock data as fallback
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
