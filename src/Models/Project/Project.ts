import { TaskState, ProjectRole, BugPriority } from '../';

export interface Task {
  id: string;
  description: string;
  state: TaskState;
}

export interface Bug {
  id: string;
  name: string;
  description: string;
  priority: BugPriority;
  createdAt: string;
  tasks: Task[];
}

export interface MemberUser {
  id: string;
  userName: string;
  profilePictureUrl: string;
}

export interface Member {
  id: string;
  user: MemberUser;
  role: ProjectRole;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  members: Member[];
  bugs: Bug[];
  createdAt: string;
  editedAt: string;
}
