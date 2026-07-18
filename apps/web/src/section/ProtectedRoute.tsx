import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../types';

interface ProtectedRouteProps {
  user: User | null | undefined;
  children: ReactNode;
  /** When `true`, only unauthenticated users may visit this route (e.g. login). */
  guestOnly?: boolean;
}

/**
 * Wraps a route and enforces authentication.
 *
 * - If `guestOnly` is set and the user is authenticated → redirect to dashboard.
 * - If the route requires auth and the user is not authenticated → redirect to login.
 * - While user state is loading (undefined) → render nothing (or a spinner).
 */
const ProtectedRoute = ({
  user,
  children,
  guestOnly = false,
}: ProtectedRouteProps) => {
  // Still loading — avoid a premature redirect
  if (user === undefined) return null;

  if (guestOnly) {
    return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
