import { createContext, Dispatch } from 'react';
import { Project } from 'src/Models';

type ProjectContextType = {
  project: Project;
  setProject: Dispatch<React.SetStateAction<Project>>;
};

export const ProjectProvider = createContext<ProjectContextType>(null!);
ProjectProvider.displayName = 'Project';
