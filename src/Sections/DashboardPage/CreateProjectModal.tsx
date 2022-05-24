import { useState } from 'react';
import { Button, LoadingButton } from 'src/Components/Buttons';
import { Form, Input } from 'src/Components/Form';
import { Modal } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { useAlert } from 'src/Hooks';
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
    alert(result.message, 'error', 2.5);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <H3 className='text-center mb-8'>Create a project</H3>
      <Form className='grid grid-cols-3 gap-8' onSubmit={onSubmitHandler}>
        <Input id='name' name='name' placeholder='Project name' requiered />
        <Input
          id='description'
          name='description'
          placeholder='Project description'
          requiered
        />
        <LoadingButton isLoading={isLoading} type='submit' theme='secondary'>
          Create
        </LoadingButton>
      </Form>
    </Modal>
  );
};
