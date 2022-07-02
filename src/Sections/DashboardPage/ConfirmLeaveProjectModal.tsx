import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LoadingButton } from 'src/Components/Buttons';
import { Image } from 'src/Components/Image';
import { Modal } from 'src/Components/Layout';
import { H3, PS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { LeaveProject } from 'src/Lib';
import { Project } from 'src/Models';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  projectID: string;
  projects: Project[];
  setProjects: (value: React.SetStateAction<Project[]>) => void;
}

export const ConfirmLeaveProjectModal = ({
  isOpen,
  onClose,
  projectID,
  projects,
  setProjects,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert } = useAlert();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleOnLeave = async () => {
    setIsLoading(true);
    await LeaveProject(projectID, ({ message, status }) => {
      if (status === 204) {
        alert(message, 'success', 2.5);
        setProjects(projects.filter((project) => project.id !== projectID));
        onClose();
        return;
      }
      if (status === 401) {
        alert('Session expired, please login.', 'error', 5);
        signOut();
        navigate('/auth/login', { replace: true });
        return;
      }
      alert(message, 'error', 2.5);
    });
    setIsLoading(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-center mb-8'>
        ¿Are you sure you want to leave this project?
      </H3>
      <Image
        src='/static/images/delete.svg'
        className='mx-auto mb-16 md:max-w-[300px] lg:max-w-[400px]'
        width={512}
        height={303.45}
      />
      <PS className='bg-red-500/20 text-red-500 text-center p-4 mb-16 mx-auto rounded-md border border-red-500 lg:w-max'>
        ¡Warning: If you're the project administrator the project will be
        deleted and all other members will leave the project aswell!
      </PS>
      <div className='grid gap-16 grid-cols-2'>
        <Button onClick={onClose} theme='light'>
          Cancel
        </Button>
        <LoadingButton
          isLoading={isLoading}
          onClick={handleOnLeave}
          theme='error'>
          Leave project
        </LoadingButton>
      </div>
    </Modal>
  );
};
