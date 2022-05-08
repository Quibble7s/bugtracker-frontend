import { useContext } from 'react';
import { AuthContext } from 'src/Providers';

export const useAuth = () => {
  return useContext(AuthContext);
};
