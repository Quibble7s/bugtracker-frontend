import { useContext } from 'react';
import { AuthContext } from 'src/Routes';

export const useAuth = () => {
  return useContext(AuthContext);
};
