import { createContext, Dispatch } from 'react';
import { Project } from 'src/Models';

type ProjectProviderType = {
  project: Project;
  setProject: Dispatch<React.SetStateAction<Project>>;
};

export const ProjectProvider = createContext<ProjectProviderType>(null!);
ProjectProvider.displayName = 'Project';
