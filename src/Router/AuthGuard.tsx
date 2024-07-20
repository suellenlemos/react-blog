import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks';

interface AuthGuardProps {
  isPrivate: boolean;
}

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { accessToken } = useAuth();

  if (!accessToken && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (accessToken && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
