export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export const getAuthToken = (): string | null => localStorage.getItem('health_token');

export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
