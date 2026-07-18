import axios from 'axios';

/** Base Axios instance — configure `baseURL` to point at your API. */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------------------------------------------------------------------------
// Request interceptor — attach Bearer token if present
// ---------------------------------------------------------------------------

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Response interceptor — handle 401 Unauthorized
// ---------------------------------------------------------------------------

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth-changed'));
    }
    return Promise.reject(error);
  },
);

/**
 * SWR-compatible fetcher that uses the shared Axios instance.
 * Pass this as the global `fetcher` in `<SWRConfig>`.
 */
export const axiosFetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
