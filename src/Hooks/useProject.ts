import { useContext } from 'react';
import { ProjectProvider } from 'src/Providers';

export const useProject = () => {
  return useContext(ProjectProvider);
};
