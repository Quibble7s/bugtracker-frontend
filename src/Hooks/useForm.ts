import { useContext } from 'react';
import { FormContext } from 'src/Providers';

export const useForm = () => {
  return useContext(FormContext);
};
