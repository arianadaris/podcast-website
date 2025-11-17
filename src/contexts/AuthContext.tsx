import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import * as localService from '../services/localStorageService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: AuthError | Error | null; user?: User | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: AuthError | Error | null; needsEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize local storage with sample data if not using Supabase
  useEffect(() => {
    if (!isSupabaseConfigured) {
      localService.initializeLocalStorage();
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    // If Supabase is not configured, use local mode with mock user
    if (!isSupabaseConfigured) {
      const localUser = localService.localGetAuthUser();
      if (localUser) {
        setUser(localUser);
      }
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((err: unknown) => {
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: any, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signInWithPassword = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured) {
        // Mock sign in for local mode
        const mockUser = {
          id: 'local-user',
          email: 'user@local.dev',
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          user_metadata: {
            full_name: 'Local User',
          },
        } as User;
        
        localService.localSetAuthUser(mockUser);
        setUser(mockUser);
        return { error: null, user: mockUser };
      }

      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase sign in error:', error);
        
        // Provide more helpful error messages
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please confirm your email address before signing in.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid request. Please check your email and password format.';
        }
        
        return { error: { ...error, message: errorMessage }, user: null };
      }

      if (!data.user) {
        return { error: new Error('No user returned from sign in'), user: null };
      }

      return { error: null, user: data.user };
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      return { 
        error: err instanceof Error ? err : new Error('An unexpected error occurred'), 
        user: null 
      };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, username: string) => {
    try {
      if (!isSupabaseConfigured) {
        // Mock sign up for local mode
        const mockUser = {
          id: 'local-user',
          email: email,
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          user_metadata: {
            full_name: username,
          },
        } as User;
        
        localService.localSetAuthUser(mockUser);
        setUser(mockUser);
        return { error: null, needsEmailConfirmation: false };
      }

      // Attempt to sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: username,
          },
        },
      });

      if (error) {
        console.error('Supabase sign up error:', error);
        
        // Provide more helpful error messages
        let errorMessage = error.message;
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid request. Please check your email format and password requirements.';
        }
        
        return { error: { ...error, message: errorMessage }, needsEmailConfirmation: false };
      }

      if (!data.user) {
        return { error: new Error('No user returned from sign up'), needsEmailConfirmation: false };
      }

      // Check if email confirmation is required
      const needsConfirmation = !data.session;

      console.log('Sign up successful:', {
        userId: data.user.id,
        email: data.user.email,
        needsConfirmation,
      });

      return { error: null, needsEmailConfirmation: needsConfirmation };
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      return { 
        error: err instanceof Error ? err : new Error('An unexpected error occurred'),
        needsEmailConfirmation: false,
      };
    }
  };

  // Sign out
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localService.localClearAuthUser();
      setUser(null);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signInWithPassword,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
