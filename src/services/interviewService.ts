import { supabase, Interview, isSupabaseConfigured } from '../config/supabase';
import * as localService from './localStorageService';

// Upload image to Supabase Storage or convert to base64 for local storage
export const uploadInterviewImage = async (file: File, interviewId: string): Promise<string> => {
  if (!isSupabaseConfigured) {
    return await localService.localUploadImage(file);
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${interviewId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('interview-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('interview-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    throw error;
  }
};

// Delete image from Supabase Storage
export const deleteInterviewImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/interview-images/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    await supabase.storage
      .from('interview-images')
      .remove([filePath]);
  } catch (error) {
    // Silently fail
  }
};

// Get all interviews
export const getAllInterviews = async (): Promise<Interview[]> => {
  if (!isSupabaseConfigured) {
    return localService.localGetAllInterviews();
  }

  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .order('season', { ascending: true })
      .order('order_number', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

// Get interviews by season
export const getInterviewsBySeason = async (season: number): Promise<Interview[]> => {
  if (!isSupabaseConfigured) {
    return localService.localGetInterviewsBySeason(season);
  }

  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('season', season)
      .order('order_number', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

// Get single interview by ID
export const getInterviewById = async (id: string): Promise<Interview | null> => {
  if (!isSupabaseConfigured) {
    return localService.localGetInterviewById(id);
  }

  try {
    const { data, error} = await supabase
      .from('interviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Create new interview
export const createInterview = async (
  interview: Omit<Interview, 'id' | 'created_at' | 'updated_at'>
): Promise<Interview> => {
  if (!isSupabaseConfigured) {
    return localService.localCreateInterview(interview);
  }

  try {
    const { data, error } = await supabase
      .from('interviews')
      .insert([interview])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Update interview
export const updateInterview = async (
  id: string,
  updates: Partial<Omit<Interview, 'id' | 'created_at' | 'updated_at'>>
): Promise<Interview> => {
  if (!isSupabaseConfigured) {
    const updated = localService.localUpdateInterview(id, updates);
    if (!updated) throw new Error('Interview not found');
    return updated;
  }

  try {
    const { data, error } = await supabase
      .from('interviews')
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

// Delete interview
export const deleteInterview = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured) {
    localService.localDeleteInterview(id);
    return;
  }

  try {
    // First get the interview to delete their image
    const interview = await getInterviewById(id);
    
    if (interview?.image_url) {
      await deleteInterviewImage(interview.image_url);
    }

    const { error } = await supabase
      .from('interviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

// Get unique seasons
export const getSeasons = async (): Promise<number[]> => {
  if (!isSupabaseConfigured) {
    return localService.localGetSeasons();
  }

  try {
    const { data, error } = await supabase
      .from('interviews')
      .select('season')
      .order('season', { ascending: true });

    if (error) throw error;

    // Get unique seasons
    const seasonSet = new Set(data?.map((item: Interview) => item.season) || []);
    const seasons = Array.from(seasonSet) as number[];
    return seasons;
  } catch (error) {
    throw error;
  }
};

