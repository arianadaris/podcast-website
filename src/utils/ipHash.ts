/**
 * Utility for hashing IP addresses for privacy-compliant duplicate prevention
 */

/**
 * Hash a string using SHA-256 (browser-compatible)
 */
export async function hashString(input: string): Promise<string> {
  // Convert string to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  // Hash the data
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert buffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Get a unique identifier for the current user's browser/session
 * This creates a fingerprint based on available browser information
 * Note: This is not foolproof but provides reasonable duplicate prevention
 */
export async function getUserFingerprint(): Promise<string> {
  const components: string[] = [];
  
  // Browser info
  components.push(navigator.userAgent);
  components.push(navigator.language);
  components.push(String(navigator.hardwareConcurrency || ''));
  components.push(String(navigator.maxTouchPoints || ''));
  
  // Screen info
  // eslint-disable-next-line no-restricted-globals
  components.push(String(screen.width));
  // eslint-disable-next-line no-restricted-globals
  components.push(String(screen.height));
  // eslint-disable-next-line no-restricted-globals
  components.push(String(screen.colorDepth));
  
  // Timezone
  components.push(String(new Date().getTimezoneOffset()));
  
  // Combine all components
  const fingerprint = components.join('|');
  
  // Hash the fingerprint
  return hashString(fingerprint);
}

/**
 * Get user fingerprint with session storage caching
 * This ensures the same hash is used throughout the session
 */
export async function getCachedUserFingerprint(): Promise<string> {
  const STORAGE_KEY = 'user_fingerprint_hash';
  
  // Check if we already have a fingerprint for this session
  const cached = sessionStorage.getItem(STORAGE_KEY);
  if (cached) {
    return cached;
  }
  
  // Generate new fingerprint
  const fingerprint = await getUserFingerprint();
  
  // Cache it for this session
  sessionStorage.setItem(STORAGE_KEY, fingerprint);
  
  return fingerprint;
}

