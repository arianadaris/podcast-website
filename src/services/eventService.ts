import { supabase, Event, isSupabaseConfigured } from '../config/supabase';
import * as localService from './localStorageService';

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
  if (!isSupabaseConfigured) {
    return localService.localGetAllEvents();
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

// Get single event by ID
export const getEventById = async (id: string): Promise<Event | null> => {
  if (!isSupabaseConfigured) {
    return localService.localGetEventById(id);
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Get upcoming events (from today onwards)
export const getUpcomingEvents = async (): Promise<Event[]> => {
  if (!isSupabaseConfigured) {
    const allEvents = localService.localGetAllEvents();
    const today = new Date().toISOString().split('T')[0];
    return allEvents
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', today)
      .order('date', { ascending: true });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

// Get past events
export const getPastEvents = async (): Promise<Event[]> => {
  if (!isSupabaseConfigured) {
    const allEvents = localService.localGetAllEvents();
    const today = new Date().toISOString().split('T')[0];
    return allEvents
      .filter(event => event.date < today)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .lt('date', today)
      .order('date', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    throw error;
  }
};

// Create new event
export const createEvent = async (
  event: Omit<Event, 'id' | 'created_at' | 'updated_at'>
): Promise<Event> => {
  if (!isSupabaseConfigured) {
    return localService.localCreateEvent(event);
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// Update event
export const updateEvent = async (
  id: string,
  updates: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>
): Promise<Event> => {
  if (!isSupabaseConfigured) {
    const updated = localService.localUpdateEvent(id, updates);
    if (!updated) throw new Error('Event not found');
    return updated;
  }

  try {
    const { data, error } = await supabase
      .from('events')
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

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured) {
    localService.localDeleteEvent(id);
    return;
  }

  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

