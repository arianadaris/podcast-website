import { supabase, TeamMember, isSupabaseConfigured } from '../config/supabase';
import * as localService from './localStorageService';

// Upload image to Supabase Storage or convert to base64 for local storage
export const uploadTeamImage = async (file: File, teamMemberId: string): Promise<string> => {
  if (!isSupabaseConfigured) {
    return await localService.localUploadImage(file);
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${teamMemberId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('team-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('team-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    throw error;
  }
};

// Delete image from Supabase Storage
export const deleteTeamImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/team-images/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    await supabase.storage
      .from('team-images')
      .remove([filePath]);
  } catch (error) {
    // Silently fail
  }
};

// Get all team members
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
  if (!isSupabaseConfigured) {
    return localService.localGetAllTeamMembers();
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Raw data from Supabase:', data);
    return data || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Get single team member by ID
export const getTeamMemberById = async (id: string): Promise<TeamMember | null> => {
  if (!isSupabaseConfigured) {
    return localService.localGetTeamMemberById(id);
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Get team member by name
export const getTeamMemberByName = async (name: string): Promise<TeamMember | null> => {
  if (!isSupabaseConfigured) {
    return localService.localGetTeamMemberByName(name);
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('name', name)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Create new team member
export const createTeamMember = async (
  teamMember: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>
): Promise<TeamMember> => {
  if (!isSupabaseConfigured) {
    return localService.localCreateTeamMember(teamMember);
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert([teamMember])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Update team member
export const updateTeamMember = async (
  id: string,
  updates: Partial<Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>>
): Promise<TeamMember> => {
  if (!isSupabaseConfigured) {
    const updated = localService.localUpdateTeamMember(id, updates);
    if (!updated) throw new Error('Team member not found');
    return updated;
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
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

// Delete team member
export const deleteTeamMember = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured) {
    localService.localDeleteTeamMember(id);
    return;
  }

  try {
    // First get the team member to delete their image
    const teamMember = await getTeamMemberById(id);
    
    if (teamMember?.image_url) {
      await deleteTeamImage(teamMember.image_url);
    }

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

