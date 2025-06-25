import { IEpisode } from '../interfaces/IEpisode';
import { useQuery } from '@tanstack/react-query';
import logo from '../assets/logo.png';
import { formatDuration, truncateDescription } from '../utils/functions';

const rssFeedURL = 'https://feeds.buzzsprout.com/1737669.rss';

const fetchEpisodes = async (): Promise<IEpisode[]> => {
  if (!rssFeedURL) {
    throw new Error('RSS Feed URL is not defined');
  }

  const response = await fetch(rssFeedURL);
  const text = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'application/xml');

  const items = Array.from(xmlDoc.querySelectorAll('item'));
  const itunesNamespace = 'http://www.itunes.com/dtds/podcast-1.0.dtd';

  return items.map((item, idx) => {
    const id = idx + 1;
    const title = item.querySelector('title')?.textContent;
    const audioUrl = item.querySelector('enclosure')?.getAttribute('url');
    const imageUrl = item.getElementsByTagNameNS(itunesNamespace, 'image')[0]?.getAttribute('href') ?? logo;
    const description = item.querySelector('description')?.textContent;

    // Format data
    let tags = item.getElementsByTagNameNS(itunesNamespace, 'keywords')[0]?.textContent;
    if (tags) {
      const delimiter = tags.indexOf('hip hop,');
      tags = tags.slice(delimiter + 8).split(',').join(', ');
    }

    let releaseDate = new Date(item.querySelector('pubDate')?.textContent ?? '').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let duration = item.getElementsByTagNameNS(itunesNamespace, 'duration')[0];
    let durationStr = '0';
    if (duration) {
      durationStr = formatDuration(duration.textContent);
    }

    return {
      id,
      title: title ?? '',
      description: truncateDescription(description ?? ''),
      releaseDate,
      audioUrl: audioUrl ?? '',
      imageUrl,
      tags,
      duration: durationStr,
    } as IEpisode;
  });
};

export const useGetEpisodes = () => {
  return useQuery({
    queryKey: ['episodes'],
    queryFn: fetchEpisodes,
  });
};