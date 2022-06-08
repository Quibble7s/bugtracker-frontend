import { Member, Project, ProjectRole, User } from 'src/Models';

export const userIsProjectAdmin = (user: User, project: Project): boolean => {
  for (let i = 0; i < project.members.length; i++) {
    const member: Member = project.members[i];
    if (member.id === user.id && member.role === ProjectRole.admin) return true;
  }
  return false;
};
