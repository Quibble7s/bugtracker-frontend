import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/Hooks';

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (auth.user !== null && localStorage.getItem('authenticated') === 'true') {
    //Send the current location to the login page so the user can be redirected back where it was before.
    return <Navigate to='/' replace />;
  }

  return children;
};
