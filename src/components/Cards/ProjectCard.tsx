import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, useGetProjectMembers } from 'src/Hooks';
import { Project } from 'src/Models';
import { ConfirmLeaveProjectModal } from 'src/Sections';
import { Button } from '../Buttons';
import { ThreeDotsDropDown } from '../Layout';
import { H4, PXS } from '../Typography';

export const ProjectCard = ({
  project,
  projects,
  setProjects,
}: {
  project: Project;
  projects: Project[];
  setProjects: (value: React.SetStateAction<Project[]>) => void;
}) => {
  const navigate = useNavigate();
  const [isLeaveProjectModalOpen, setIsLeaveProjectModalOpen] =
    useState<boolean>(false);
  const getMembers = useGetProjectMembers(project);
  const { alert } = useAlert();

  const copyToClipboard = () => {
    //Get the link and include the port and http protocol if enviroment is development.
    const isDevelopment = process.env.NODE_ENV === 'development';
    //Getting host and protocol data
    const hostName = window.location.hostname;
    const port = window.location.port;
    const protocol = `${isDevelopment ? 'http' : 'https'}`;
    const fullHost = `${hostName}${isDevelopment ? `:${port}` : ''}`;
    //Copying the link
    const link = `${protocol}://${fullHost}/join/${project.id}`;
    navigator.clipboard.writeText(link);
    alert('Invite link copied to clipboard!', 'success', 2.5);
  };

  const handleOnClose = () => {
    setIsLeaveProjectModalOpen(false);
  };

  const handleOnClick = () => {
    navigate(`/project/${project.id}`);
  };
  return (
    <div
      onClick={handleOnClick}
      className='w-full p-4 bg-themeLightGray rounded-md border
      flex flex-col justify-between min-h-[360px] max-h-[360px] relative'>
      <div className='absolute top-[16px] right-[16px] overflow-x-visible'>
        <ThreeDotsDropDown className='!min-w-[160px] gap-4'>
          <Button onClick={copyToClipboard} theme='success'>
            Get invite link
          </Button>
          <Button
            theme='error'
            onClick={() => setIsLeaveProjectModalOpen(true)}>
            Leave project
          </Button>
          <ConfirmLeaveProjectModal
            isOpen={isLeaveProjectModalOpen}
            onClose={handleOnClose}
            projectID={project.id}
            projects={projects}
            setProjects={setProjects}
          />
        </ThreeDotsDropDown>
      </div>
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
