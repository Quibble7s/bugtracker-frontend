import { useContext } from 'react';
import { AlertContext } from 'src/Providers';

export const useAlert = () => {
  return useContext(AlertContext);
};
