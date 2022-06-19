import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, useGetProjectMembers } from 'src/Hooks';
import { Bug, Project, Task, TaskState } from 'src/Models';
import { ConfirmLeaveProjectModal } from 'src/Sections';
import { Button } from '../Buttons';
import { Image } from '../Image';
import { ThreeDotsDropDown, Tooltip } from '../Layout';
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

  const getActiveIssueCount = (): number => {
    let activeCount = 0;
    for (let i = 0; i < project.bugs.length; i++) {
      const bug: Bug = project.bugs[i];
      for (let j = 0; j < bug.tasks.length; j++) {
        const task: Task = bug.tasks[j];
        if (task.state !== TaskState.completed) {
          activeCount++;
          break;
        }
      }
    }
    return project.bugs.length > 0 ? activeCount : 0;
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
      className='w-full min-h-[300px] max-h-[300px] bg-themeLightGray rounded-md overflow-y-auto p-4 cursor-pointer issue-container overflow-x-hidden'>
      <div className='bg-light-blue w-full h-full rounded-md border-b border-themeGray/25 grid grid-rows-6 p-4 relative overflow-y-auto'>
        <div className='absolute top-[16px] right-0 overflow-x-visible'>
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
        <div className='row-span-4'></div>
        <div className='flex flex-col justify-between row-span-2 gap-4'>
          <div>
            <H4 className='text-left text-themeGray font-normal'>
              {project.name}
            </H4>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <Tooltip text={project.description}>
              <Image width={16} height={16} src='/static/images/details.svg' />
            </Tooltip>
            <Tooltip
              className='flex flex-row items-center'
              text={`${getActiveIssueCount()} active issue(s).`}>
              <Image
                width={16}
                height={16}
                src='/static/images/checkmark-checked.svg'
              />
              <PXS className='text-themeGray'>
                {getActiveIssueCount()}/{project.bugs.length}
              </PXS>
            </Tooltip>
            <div className='flex flex-row items-center justify-center ml-[8px]'>
              {getMembers()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
