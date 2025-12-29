import { supabase, Nomination, NominationSettings, NominationCategory, isSupabaseConfigured } from '../config/supabase';
import { getCachedUserFingerprint } from '../utils/ipHash';

// ==================== Nomination Settings ====================

/**
 * Get the current nomination settings
 */
export const getNominationSettings = async (): Promise<NominationSettings | null> => {
  if (!isSupabaseConfigured) {
    // Return default settings for local development
    return {
      id: 'local',
      is_active: true,
      start_date: undefined,
      end_date: undefined,
      updated_at: new Date().toISOString(),
    };
  }

  try {
    const { data, error } = await supabase
      .from('nomination_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching nomination settings:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching nomination settings:', error);
    return null;
  }
};

/**
 * Update nomination settings (admin only)
 */
export const updateNominationSettings = async (
  id: string,
  updates: Partial<Omit<NominationSettings, 'id' | 'updated_at'>>
): Promise<NominationSettings> => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    const { data, error } = await supabase
      .from('nomination_settings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create initial nomination settings (admin only)
 */
export const createNominationSettings = async (
  settings: Omit<NominationSettings, 'id' | 'updated_at'>
): Promise<NominationSettings> => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase not configured');
  }

  try {
    const { data, error } = await supabase
      .from('nomination_settings')
      .insert([settings])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// ==================== Nomination Submissions ====================

/**
 * Check if the current user has already submitted nominations
 */
export const hasUserSubmitted = async (): Promise<boolean> => {
  if (!isSupabaseConfigured) {
    // Check local storage for development
    return localStorage.getItem('has_submitted_nominations') === 'true';
  }

  try {
    const ipHash = await getCachedUserFingerprint();

    const { data, error } = await supabase
      .from('nomination_submissions')
      .select('id')
      .eq('ip_hash', ipHash)
      .limit(1);

    if (error) {
      console.error('Error checking submission status:', error);
      return false;
    }

    return (data && data.length > 0) || false;
  } catch (error) {
    console.error('Error checking submission status:', error);
    return false;
  }
};

/**
 * Record that the user has submitted nominations
 */
const recordSubmission = async (ipHash: string): Promise<void> => {
  if (!isSupabaseConfigured) {
    // Store in local storage for development
    localStorage.setItem('has_submitted_nominations', 'true');
    return;
  }

  try {
    const { error } = await supabase
      .from('nomination_submissions')
      .insert([{ ip_hash: ipHash }]);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

// ==================== Nominations ====================

/**
 * Submit nominations for multiple categories
 */
export const submitNominations = async (
  nominations: Array<{
    category: NominationCategory;
    artist_name: string;
    project_name?: string;
    song_name?: string;
    video_url?: string;
  }>
): Promise<void> => {
  if (nominations.length === 0) {
    throw new Error('At least one nomination is required');
  }

  const ipHash = await getCachedUserFingerprint();

  // Check if user already submitted
  const alreadySubmitted = await hasUserSubmitted();
  if (alreadySubmitted) {
    throw new Error('You have already submitted your nominations');
  }

  if (!isSupabaseConfigured) {
    // Store in local storage for development
    const existing = localStorage.getItem('nominations');
    const allNominations = existing ? JSON.parse(existing) : [];
    allNominations.push(...nominations.map(n => ({ ...n, ip_hash: ipHash, id: crypto.randomUUID() })));
    localStorage.setItem('nominations', JSON.stringify(allNominations));
    localStorage.setItem('has_submitted_nominations', 'true');
    return;
  }

  try {
    // Add ip_hash to each nomination
    const nominationsWithHash = nominations.map(n => ({
      ...n,
      ip_hash: ipHash,
    }));

    // Insert all nominations
    const { error: nominationsError } = await supabase
      .from('nominations')
      .insert(nominationsWithHash);

    if (nominationsError) throw nominationsError;

    // Record the submission
    await recordSubmission(ipHash);
  } catch (error) {
    throw error;
  }
};

/**
 * Get all nominations (admin only)
 */
export const getAllNominations = async (): Promise<Nomination[]> => {
  if (!isSupabaseConfigured) {
    // Get from local storage for development
    const stored = localStorage.getItem('nominations');
    return stored ? JSON.parse(stored) : [];
  }

  try {
    const { data, error } = await supabase
      .from('nominations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

/**
 * Get nominations by category (admin only)
 */
export const getNominationsByCategory = async (
  category: NominationCategory
): Promise<Nomination[]> => {
  if (!isSupabaseConfigured) {
    // Get from local storage for development
    const stored = localStorage.getItem('nominations');
    const all: Nomination[] = stored ? JSON.parse(stored) : [];
    return all.filter(n => n.category === category);
  }

  try {
    const { data, error } = await supabase
      .from('nominations')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

/**
 * Get nomination statistics (admin only)
 */
export const getNominationStats = async (): Promise<{
  totalSubmissions: number;
  nominationsByCategory: Record<NominationCategory, number>;
}> => {
  if (!isSupabaseConfigured) {
    // Get from local storage for development
    const stored = localStorage.getItem('nominations');
    const nominations: Nomination[] = stored ? JSON.parse(stored) : [];
    
    const stats = {
      totalSubmissions: new Set(nominations.map(n => n.ip_hash)).size,
      nominationsByCategory: {
        project_of_the_year: 0,
        artist_of_the_year: 0,
        group_of_the_year: 0,
        song_of_the_year: 0,
        producer_of_the_year: 0,
        music_video_of_the_year: 0,
      } as Record<NominationCategory, number>,
    };

    nominations.forEach(n => {
      stats.nominationsByCategory[n.category]++;
    });

    return stats;
  }

  try {
    // Get total submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from('nomination_submissions')
      .select('id');

    if (submissionsError) throw submissionsError;

    // Get nominations by category
    const { data: nominations, error: nominationsError } = await supabase
      .from('nominations')
      .select('category');

    if (nominationsError) throw nominationsError;

    const nominationsByCategory = {
      project_of_the_year: 0,
      artist_of_the_year: 0,
      group_of_the_year: 0,
      song_of_the_year: 0,
      producer_of_the_year: 0,
      music_video_of_the_year: 0,
    } as Record<NominationCategory, number>;

    nominations?.forEach((n: { category: NominationCategory }) => {
      nominationsByCategory[n.category]++;
    });

    return {
      totalSubmissions: submissions?.length || 0,
      nominationsByCategory,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a nomination (admin only)
 */
export const deleteNomination = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured) {
    // Remove from local storage for development
    const stored = localStorage.getItem('nominations');
    if (stored) {
      const nominations: Nomination[] = JSON.parse(stored);
      const filtered = nominations.filter(n => n.id !== id);
      localStorage.setItem('nominations', JSON.stringify(filtered));
    }
    return;
  }

  try {
    const { error } = await supabase
      .from('nominations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

