import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Form, Input, TextArea } from 'src/Components/Form';
import { Image } from 'src/Components/Image';
import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { CreateProject } from 'src/Lib';
import { Project } from 'src/Models';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  projects: Project[];
  setProjects: (value: React.SetStateAction<Project[]>) => void;
}

type FromData = {
  description: string;
  name: string;
};

export const CreateProjectModal = ({
  isOpen,
  onClose,
  projects,
  setProjects,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert } = useAlert();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const onSubmitHandler = async (data: FromData) => {
    setIsLoading(true);
    const result = await CreateProject(data);
    if (result.status === 201) {
      setProjects([...projects, result.project!]);
      alert(result.message, 'success', 2.5);
      setIsLoading(false);
      onClose();
      return;
    }
    if (result.status === 401) {
      signOut();
      alert('Session expired, please login.', 'error', 5);
      navigate('/auth/login', { replace: true });
      setIsLoading(false);
      return;
    }
    alert(result.message, 'error', 2.5);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-center mb-16'>Create a project</H3>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <Image
          className='my-8 max-w-[250px] max-h-[250px] md:max-w-[300px] md:max-h-[300px] lg:max-w-[400px] lg:max-h-[400px] opacity-0 mx-auto'
          onLoad={(e) => {
            e.currentTarget.classList.add('fade-in');
          }}
          width={400}
          height={400}
          src='/static/images/create.svg'
        />
        <Form
          className='flex flex-col justify-center gap-8'
          onSubmit={onSubmitHandler}>
          <Input id='name' name='name' placeholder='Project name' requiered />
          <TextArea
            id='description'
            name='description'
            placeholder='Project description'
            requiered
          />
          <LoadingButton isLoading={isLoading} type='submit' theme='secondary'>
            Create
          </LoadingButton>
        </Form>
      </div>
    </Modal>
  );
};
