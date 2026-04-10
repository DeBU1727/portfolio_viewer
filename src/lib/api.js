const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/api';

/**
 * Enhanced fetch wrapper for the portfolio
 */
export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response;
}

export default API_BASE_URL;
