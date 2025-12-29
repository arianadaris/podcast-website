import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create a dummy client for local mode
const dummyClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithOAuth: async () => ({ data: { provider: null, url: null }, error: { message: 'Supabase not configured' } }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ error: null }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ error: null }),
      remove: async () => ({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
} as any;

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : dummyClient;

// Database types
export interface TeamMember {
  id: string;
  name: string;
  image_url: string;
  audio_url?: string;
  role: string;
  social_handle: string;
  fun_facts: string[];
  favorite_artists: Array<{
    name: string;
    image: string;
  }>;
  favorite_albums: Array<{
    name: string;
    artist: string;
    image: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface Interview {
  id: string;
  season: number;
  order_number: number;
  name: string;
  image_url: string;
  link: string;
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  attending_members: string[];
  description: string;
  created_at?: string;
  updated_at?: string;
}

export type NominationCategory = 
  | 'project_of_the_year'
  | 'artist_of_the_year'
  | 'group_of_the_year'
  | 'song_of_the_year'
  | 'producer_of_the_year'
  | 'music_video_of_the_year';

export interface Nomination {
  id: string;
  ip_hash: string;
  category: NominationCategory;
  artist_name: string;
  project_name?: string;
  song_name?: string;
  video_url?: string;
  created_at?: string;
}

export interface NominationSettings {
  id: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  updated_at?: string;
}

export interface NominationSubmission {
  id: string;
  ip_hash: string;
  submitted_at?: string;
}


