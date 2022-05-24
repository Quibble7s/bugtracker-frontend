import { Project } from 'src/Models';
import { Image } from '../Image';
import { Tooltip } from '../Layout';
import { H4, PXS } from '../Typography';

export const ProjectCard = ({ project }: { project: Project }) => {
  const getMembers = () => {
    const maxAvatars = 5;
    const elements = [];
    for (let i = 0; i < project.members.length; i++) {
      const member = project.members[i];
      if (i < maxAvatars) {
        elements.push(
          <Tooltip
            key={member.user.userName}
            text={member.user.userName}
            className='ml-[-10px]'>
            <Image
              onLoad={(e) => {
                e.currentTarget.classList.add('fade-in');
              }}
              className='relative rounded-[100%] bg-themeLightGray'
              width={24}
              height={24}
              src='/static/images/defaultProfilePicture.svg'
            />
          </Tooltip>,
        );
        continue;
      }
      break;
    }
    if (project.members.length > maxAvatars) {
      elements.push(
        <Tooltip text={`And ${project.members.length - maxAvatars} more...`}>
          <PXS
            className='w-[24px] h-[24px] flex flex-row items-center justify-center 
            text-[10px] bg-themeGray text-themeLightGray text-center rounded-[100%]'>
            +{project.members.length - maxAvatars}
          </PXS>
        </Tooltip>,
      );
    }
    return elements;
  };

  return (
    <div
      className='w-full p-4 bg-themeLightGray rounded-md border cursor-pointer
    flex flex-col justify-between min-h-[360px] max-h-[360px]'>
      <div>
        <H4 className='text-center text-themeBlack'>{project.name}</H4>
        <PXS className='mt-8 text-justify text-themeGray min-h-[220px] max-h-[220px] overflow-y-auto'>
          {project.description}
        </PXS>
      </div>
      <div className='flex flex-row items-center justify-between mt-4'>
        <div className='flex flex-row items-center justify-center ml-[10px]'>
          {getMembers()}
        </div>
        <PXS>Active issues ({project.bugs.length})</PXS>
      </div>
    </div>
  );
};
