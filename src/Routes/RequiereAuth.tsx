import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/Hooks';

export const RequiereAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const currentLocation = useLocation().pathname;

  if (!auth.user) {
    //Send the current location to the login page so the user can be redirected back where it was before.
    return (
      <Navigate to='/auth/login' state={{ from: currentLocation }} replace />
    );
  }

  return children;
};
