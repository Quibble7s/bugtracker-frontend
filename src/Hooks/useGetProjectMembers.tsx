import { Image } from 'src/Components/Image';
import { Tooltip } from 'src/Components/Layout';
import { PXS } from 'src/Components/Typography';
import { Project } from 'src/Models';

export const useGetProjectMembers = (project: Project) => {
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
  return getMembers;
};
