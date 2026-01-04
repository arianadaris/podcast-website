import { NominationSettings } from '../config/supabase';

/**
 * Check if nominations are currently open based on settings
 */
export function areNominationsOpen(settings: NominationSettings | null): {
  isOpen: boolean;
  message?: string;
} {
  if (!settings) {
    return {
      isOpen: false,
      message: 'Nomination settings not configured. Please contact the administrator.',
    };
  }

  // Check if nominations are active
  if (!settings.is_active) {
    return {
      isOpen: false,
      message: 'Nominations are currently closed.',
    };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Check start date
  if (settings.start_date) {
    const startDate = new Date(settings.start_date);
    if (today < startDate) {
      return {
        isOpen: false,
        message: `Nominations will open on ${startDate.toLocaleDateString()}.`,
      };
    }
  }

  // Check end date
  if (settings.end_date) {
    const endDate = new Date(settings.end_date);
    if (today > endDate) {
      return {
        isOpen: false,
        message: `Nominations closed on ${endDate.toLocaleDateString()}.`,
      };
    }
  }

  return { isOpen: true };
}

/**
 * Validate a URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty is valid (optional field)
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get display name for a category
 */
export function getCategoryDisplayName(category: string): string {
  const names: Record<string, string> = {
    project_of_the_year: 'Project of the Year',
    artist_of_the_year: 'Artist of the Year',
    group_of_the_year: 'Group of the Year',
    song_of_the_year: 'Song of the Year',
    producer_of_the_year: 'Producer of the Year',
    music_video_of_the_year: 'Music Video of the Year',
  };
  
  return names[category] || category;
}

/**
 * Get description for a category
 */
export function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    project_of_the_year: 'Submit your standout project (album, EP, mixtape, etc.)',
    artist_of_the_year: 'Put yourself forward with your best album or project from this year',
    group_of_the_year: 'Enter your group and highlight your best album or project',
    song_of_the_year: 'Submit your best track from this year',
    producer_of_the_year: 'Showcase your production skills with a standout song you produced',
    music_video_of_the_year: 'Submit your best music video from this year',
  };
  
  return descriptions[category] || '';
}






