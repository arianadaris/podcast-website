import { isSupabaseConfigured } from '../config/supabase';

export interface GeneralContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface InterviewRequestPayload {
  officialName: string;
  email: string;
  musicWorkExample?: string;
  availability?: string;
  specificTopics?: string;
  previousInterviews?: string;
  additionalDetails?: string;
}

export interface ContactResponse {
  success: boolean;
  error?: string;
}

const CONTACT_ENDPOINT = '/api/contact';
const INTERVIEW_ENDPOINT = '/api/interview';

export const sendGeneralContactMessage = async (
  payload: GeneralContactPayload
): Promise<ContactResponse> => {
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return {
      success: false,
      error: 'All fields are required.',
    };
  }

  // Basic client-side email shape validation
  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(payload.email)) {
    return {
      success: false,
      error: 'Please enter a valid email address.',
    };
  }

  // Allow local development without a backend configured
  if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
    // Simulate successful submission in local/dev mode
    console.info('Contact message (dev mode, not actually sent):', payload);
    return { success: true };
  }

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const message =
        (errorBody && (errorBody.error || errorBody.message)) ||
        'Failed to send message. Please try again later.';

      return {
        success: false,
        error: message,
      };
    }

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; error?: string }
      | null;

    if (data && data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: (data && data.error) || 'Failed to send message. Please try again later.',
    };
  } catch (error) {
    console.error('Error sending contact message:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while sending your message.',
    };
  }
};

export const sendInterviewRequest = async (
  payload: InterviewRequestPayload
): Promise<ContactResponse> => {
  if (!payload.officialName.trim()) {
    return { success: false, error: 'Name or stage name is required.' };
  }
  if (!payload.email.trim()) {
    return { success: false, error: 'Email address is required.' };
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(payload.email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!isSupabaseConfigured && process.env.NODE_ENV === 'development') {
    console.info('Interview request (dev mode, not actually sent):', payload);
    return { success: true };
  }

  try {
    const response = await fetch(INTERVIEW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const message =
        (errorBody && (errorBody.error || errorBody.message)) ||
        'Failed to submit request. Please try again later.';
      return { success: false, error: message };
    }

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; error?: string }
      | null;

    if (data && data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: (data && data.error) || 'Failed to submit request. Please try again later.',
    };
  } catch (error) {
    console.error('Error sending interview request:', error);
    return {
      success: false,
      error: 'An unexpected error occurred while submitting your request.',
    };
  }
};

