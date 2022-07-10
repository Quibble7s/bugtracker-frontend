import { Modal } from 'src/Components/Layout';
import { H3, PXS } from 'src/Components/Typography';
import { useAuth, useProject } from 'src/Hooks';
import { userIsProjectAdmin } from 'src/Lib';
import { EditProjectForm } from './EditProjectForm';
import { ProjectActivity } from './ProjectActivity';
import { ProjectConfigModalDangerZone } from './ProjectConfigModalDangerZone';
import { ProjectMembers } from './ProjectMembers';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const ProjectConfigModal = ({ isOpen, onClose }: Props) => {
  const { user } = useAuth();
  const { project } = useProject();
  const userIsAdmin = userIsProjectAdmin(user, project);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-themeGray'>Project settings</H3>
      <span className='w-full h-[1px] block bg-themeGray' />
      <div className='grid mt-16 gap-8 grid-cols-1 md:grid-cols-2'>
        <EditProjectForm userIsAdmin={userIsAdmin} />
        <ProjectMembers />
      </div>
      <ProjectConfigModalDangerZone userIsAdmin={userIsAdmin} />
      <PXS className='text-themeGray font-bold mt-4'>Activity</PXS>
      <span className='w-full h-[1px] block mt-2 bg-themeGray' />
      <ProjectActivity logID={project?.id} dependency={project} />
    </Modal>
  );
};
