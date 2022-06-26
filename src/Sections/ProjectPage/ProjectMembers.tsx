import { MemberCard } from 'src/Components/Cards';
import { PXS } from 'src/Components/Typography';
import { useProject } from 'src/Hooks';

export const ProjectMembers = () => {
  const { project } = useProject();
  return (
    <div>
      <PXS className='text-themeGray font-bold'>Members</PXS>
      <div className='flex flex-col gap-4 mt-8 justify-start min-h-[100px] max-h-[200px] overflow-y-auto'>
        {project?.members
          ?.sort((a, b) => {
            if (a.role === 'admin' || b.role === 'admin') {
              return 1;
            }
            if (a.user.userName > b.user.userName) {
              return 1;
            }
            return -1;
          })
          .map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
      </div>
    </div>
  );
};
