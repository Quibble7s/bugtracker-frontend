import { useState } from 'react';
import { Button, LoadingButton } from 'src/Components/Buttons';
import { Form, Input } from 'src/Components/Form';
import { Image } from 'src/Components/Image';
import { Modal } from 'src/Components/Layout';
import { H3, PXS } from 'src/Components/Typography';
import { useAlert } from 'src/Hooks';
import { GetProject, JoinProject } from 'src/Lib';
import { Project } from 'src/Models';

interface Props {
  projects: Project[];
  setProjects: (value: React.SetStateAction<Project[]>) => void;
  setIsJoinOpen: (value: React.SetStateAction<boolean>) => void;
  isOpen: boolean;
}

export const JoinProjectModal = ({
  projects,
  setProjects,
  setIsJoinOpen,
  isOpen,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert } = useAlert();

  //Handles the submit event of the form
  const onSubmitHandler = async (data: any) => {
    const splitData: string[] = data.join.trim().split('/');
    const projectID = splitData[splitData.length - 1];
    setIsLoading(true);
    await JoinProject(projectID, async ({ message, status }) => {
      //If the operation is successful send a success alert and update the project list with the project added.
      if (status === 204) {
        alert(message, 'success', 2.5);
        setProjects([...projects, await GetProject(projectID)]);
        setIsJoinOpen(false);
        return;
      }
      alert(message, 'error', 2.5);
    });
    setIsLoading(false);
  };

  return (
    <Modal onClose={() => setIsJoinOpen(false)} isOpen={isOpen}>
      <H3 className='text-center mb-8'>Join a project</H3>
      <Image
        className='my-8 max-w-full md:max-w-[300px] lg:max-w-[400px] opacity-0 mx-auto'
        onLoad={(e) => {
          e.currentTarget.classList.add('fade-in');
        }}
        width={512}
        height={512}
        src='/static/images/join.svg'
      />
      <Form
        onSubmit={onSubmitHandler}
        className='grid grid-cols-1 md:grid-cols-6 gap-8'>
        <Input
          className='md:col-span-5'
          id='join'
          name='join'
          type='url'
          requiered
          placeholder={`https://${window.location.hostname}/join/00000000-0000-0000-0000-000000000000`}
        />
        <LoadingButton
          type='submit'
          className='md:col-span-1'
          theme='secondary'
          isLoading={isLoading}>
          Join
        </LoadingButton>
      </Form>
      <PXS className='text-themeGray mt-8 text-center'>
        Your project join link should look something like this "
        {`https://${window.location.hostname}/join/00000000-0000-0000-0000-000000000000`}
        "
      </PXS>
    </Modal>
  );
};
