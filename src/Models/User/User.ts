import { UserRole } from '..';

export interface User {
  id: string;
  userName: string;
  email: string;
  profilePictureUrl: string;
  role: UserRole;
  createdAt: string;
  editedAt: string;
  projects: string[];
}
