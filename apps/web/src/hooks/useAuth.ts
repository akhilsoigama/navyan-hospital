import useSWR from 'swr';
import type { User } from '../types';

interface AuthState {
  user: User | null | undefined;
  token: string | null;
  mutateUser: (
    data?: User,
    opts?: { revalidate?: boolean },
  ) => Promise<User | null | undefined>;
}

export const useAuth = (): AuthState => {
  const { data: user, isLoading, mutate } = useSWR<User | null>('/auth/me', {
    revalidateOnFocus: false,
    // Do not throw / retry when the API is unreachable — treat as logged-out
    onErrorRetry: () => undefined,
    shouldRetryOnError: false,
  });

  const token = localStorage.getItem('token');

  return {
    // undefined  → still in-flight  → ProtectedRoute renders null (no flash)
    // null       → settled, no user → ProtectedRoute redirects to /login
    // User       → authenticated    → render protected content
    user: isLoading ? undefined : (user ?? null),
    token,
    mutateUser: mutate as AuthState['mutateUser'],
  };
};
