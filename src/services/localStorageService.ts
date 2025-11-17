// Local Storage Service - Fallback when Supabase is not configured
import { TeamMember, Interview, Event } from '../config/supabase';

const STORAGE_KEYS = {
  TEAM_MEMBERS: 'cms_team_members',
  INTERVIEWS: 'cms_interviews',
  EVENTS: 'cms_events',
  AUTH_USER: 'cms_auth_user',
};

// Helper to generate UUIDs
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Generic storage functions
const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Silently fail
  }
};

// Team Members
export const localGetAllTeamMembers = (): TeamMember[] => {
  return getFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
};

export const localGetTeamMemberById = (id: string): TeamMember | null => {
  const members = getFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
  return members.find((m) => m.id === id) || null;
};

export const localGetTeamMemberByName = (name: string): TeamMember | null => {
  const members = getFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
  return members.find((m) => m.name.toLowerCase() === name.toLowerCase()) || null;
};

export const localCreateTeamMember = (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): TeamMember => {
  const members = getFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
  const newMember: TeamMember = {
    ...member,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  members.push(newMember);
  saveToStorage(STORAGE_KEYS.TEAM_MEMBERS, members);
  return newMember;
};

export const localUpdateTeamMember = (id: string, updates: Partial<TeamMember>): TeamMember | null => {
  const members = getFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;

  members[index] = {
    ...members[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveToStorage(STORAGE_KEYS.TEAM_MEMBERS, members);
  return members[index];
};

export const localDeleteTeamMember = (id: string): void => {
  const members = getFromStorage<TeamMember>(STORAGE_KEYS.TEAM_MEMBERS);
  const filtered = members.filter((m) => m.id !== id);
  saveToStorage(STORAGE_KEYS.TEAM_MEMBERS, filtered);
};

// Interviews
export const localGetAllInterviews = (): Interview[] => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  return interviews.sort((a, b) => {
    if (a.season !== b.season) return a.season - b.season;
    return a.order_number - b.order_number;
  });
};

export const localGetInterviewById = (id: string): Interview | null => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  return interviews.find((i) => i.id === id) || null;
};

export const localGetInterviewsBySeason = (season: number): Interview[] => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  return interviews
    .filter((i) => i.season === season)
    .sort((a, b) => a.order_number - b.order_number);
};

export const localGetSeasons = (): number[] => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  const seasonSet = new Set(interviews.map((i) => i.season));
  return Array.from(seasonSet).sort((a, b) => a - b);
};

export const localCreateInterview = (interview: Omit<Interview, 'id' | 'created_at' | 'updated_at'>): Interview => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  const newInterview: Interview = {
    ...interview,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  interviews.push(newInterview);
  saveToStorage(STORAGE_KEYS.INTERVIEWS, interviews);
  return newInterview;
};

export const localUpdateInterview = (id: string, updates: Partial<Interview>): Interview | null => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  const index = interviews.findIndex((i) => i.id === id);
  if (index === -1) return null;

  interviews[index] = {
    ...interviews[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveToStorage(STORAGE_KEYS.INTERVIEWS, interviews);
  return interviews[index];
};

export const localDeleteInterview = (id: string): void => {
  const interviews = getFromStorage<Interview>(STORAGE_KEYS.INTERVIEWS);
  const filtered = interviews.filter((i) => i.id !== id);
  saveToStorage(STORAGE_KEYS.INTERVIEWS, filtered);
};

// Events
export const localGetAllEvents = (): Event[] => {
  return getFromStorage<Event>(STORAGE_KEYS.EVENTS);
};

export const localGetEventById = (id: string): Event | null => {
  const events = getFromStorage<Event>(STORAGE_KEYS.EVENTS);
  return events.find((e) => e.id === id) || null;
};

export const localCreateEvent = (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Event => {
  const events = getFromStorage<Event>(STORAGE_KEYS.EVENTS);
  const newEvent: Event = {
    ...event,
    id: generateId(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  events.push(newEvent);
  saveToStorage(STORAGE_KEYS.EVENTS, events);
  return newEvent;
};

export const localUpdateEvent = (id: string, updates: Partial<Event>): Event | null => {
  const events = getFromStorage<Event>(STORAGE_KEYS.EVENTS);
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  events[index] = {
    ...events[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveToStorage(STORAGE_KEYS.EVENTS, events);
  return events[index];
};

export const localDeleteEvent = (id: string): void => {
  const events = getFromStorage<Event>(STORAGE_KEYS.EVENTS);
  const filtered = events.filter((e) => e.id !== id);
  saveToStorage(STORAGE_KEYS.EVENTS, filtered);
};

// Image handling for local mode
export const localUploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.readAsDataURL(file);
  });
};

// Auth (mock for local mode)
export const localGetAuthUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  return user ? JSON.parse(user) : null;
};

export const localSetAuthUser = (user: any) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
};

export const localClearAuthUser = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
};

// Initialize with sample data from JSON files if empty
export const initializeLocalStorage = () => {
  const teamMembers = localGetAllTeamMembers();
  const interviews = localGetAllInterviews();
  const events = localGetAllEvents();

  // Only initialize if all are empty
  if (teamMembers.length === 0 && interviews.length === 0 && events.length === 0) {
    // Import and convert JSON data
    import('../assets/data/team.json').then((teamData) => {
      const members = teamData.default.map((member: any) => ({
        id: member.id,
        name: member.name,
        image_url: member.image,
        audio_url: member.audio || '',
        role: member.role,
        social_handle: member.socialHandle,
        fun_facts: member.funFacts || [],
        favorite_artists: member.favoriteArtists || [],
        favorite_albums: member.favoriteAlbums || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      saveToStorage(STORAGE_KEYS.TEAM_MEMBERS, members);
    });

    import('../assets/data/interviews.json').then((interviewData) => {
      const allInterviews: Interview[] = [];
      interviewData.default.forEach((seasonData: any) => {
        seasonData.interviews.forEach((interview: any) => {
          allInterviews.push({
            id: `${seasonData.season}-${interview.id}`,
            season: seasonData.season,
            order_number: interview.id, // Use the id from JSON as order_number
            name: interview.name,
            image_url: interview.image,
            link: interview.link,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        });
      });
      saveToStorage(STORAGE_KEYS.INTERVIEWS, allInterviews);
    });

    import('../assets/data/events.json').then((eventData) => {
      const events = eventData.default.map((event: any) => ({
        id: event.id.toString(),
        name: event.name,
        location: event.location,
        date: event.date,
        time: event.time,
        attending_members: event.attendingMembers || [],
        description: event.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      saveToStorage(STORAGE_KEYS.EVENTS, events);
    });
  }
};

