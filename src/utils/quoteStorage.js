const STORAGE_KEY = 'daily-quote';
const DATE_KEY = 'quote-date';

/**
 * Get today's date as a string (YYYY-MM-DD)
 */
export function getTodayDateString() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Check if we have a stored quote for today
 */
export function getStoredQuote() {
  const storedDate = localStorage.getItem(DATE_KEY);
  const today = getTodayDateString();
  
  if (storedDate === today) {
    const storedQuote = localStorage.getItem(STORAGE_KEY);
    if (storedQuote) {
      try {
        return JSON.parse(storedQuote);
      } catch (e) {
        console.error('Error parsing stored quote:', e);
        return null;
      }
    }
  }
  
  return null;
}

/**
 * Store a quote for today
 */
export function storeQuote(quote) {
  const today = getTodayDateString();
  localStorage.setItem(DATE_KEY, today);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quote));
}

/**
 * Clear stored quote (useful for testing or manual refresh)
 */
export function clearStoredQuote() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(DATE_KEY);
}

