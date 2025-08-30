import { useEffect } from 'react';

type PageType = 'landing' | 'main' | 'episodes' | 'contact' | 'team' | 'interviews' | 'events' | 'person';

const pageTitles: Record<PageType, string> = {
  landing: '808s & COLD TAKES - Welcome',
  main: '808s & COLD TAKES - Home',
  episodes: '808s & COLD TAKES - Episodes',
  contact: '808s & COLD TAKES - Contact',
  team: '808s & COLD TAKES - Team',
  interviews: '808s & COLD TAKES - Interviews',
  events: '808s & COLD TAKES - Events',
  person: '808s & COLD TAKES - Team Member'
};

// Person data for dynamic titles
const personData = {
  person1: { name: 'Alex Johnson', role: 'Host & Producer' },
  person2: { name: 'Sarah Chen', role: 'Co-Host & Music Director' },
  person3: { name: 'Mike Rodriguez', role: 'Technical Producer' },
  person4: { name: 'Emily Davis', role: 'Content Strategist' },
};

export const usePageTitle = (currentPage: PageType, personId?: string) => {
  useEffect(() => {
    let title = pageTitles[currentPage];
    
    // Handle dynamic title for person page
    if (currentPage === 'person' && personId) {
      const person = personData[personId as keyof typeof personData];
      if (person) {
        title = `808s & COLD TAKES - ${person.name} (${person.role})`;
      }
    }
    
    if (title) {
      document.title = title;
    }
  }, [currentPage, personId]);
};
