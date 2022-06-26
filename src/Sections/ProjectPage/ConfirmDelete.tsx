import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LoadingButton } from 'src/Components/Buttons';
import { Form, Input } from 'src/Components/Form';
import { PXS } from 'src/Components/Typography';
import { useAlert, useAuth, useProject } from 'src/Hooks';
import { DeleteProject } from 'src/Lib';

type Data = {
  name: string;
};

interface Props {
  onCancel: VoidFunction;
}

export const ConfirmDelete = ({ onCancel }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, signOut } = useAuth();
  const { project } = useProject();
  const { alert } = useAlert();
  const navigate = useNavigate();

  const onSubmitHandler = async (data: Data) => {
    setIsLoading(true);
    if (data.name !== user.userName) {
      alert("Usernames don't match", 'error', 5);
      setIsLoading(false);
      return;
    }
    await DeleteProject(project.id, ({ message, status }) => {
      if (status === 204) {
        alert(message, 'success', 2.5);
        navigate('/dashboard', { replace: false });
        return;
      }
      if (status === 401) {
        signOut();
        alert('Session expired, please login.', 'error', 5);
        navigate('/auth/login', { replace: false });
        return;
      }
      alert(message, 'error', 2.5);
    });
    setIsLoading(false);
  };

  return (
    <div className='w-full'>
      <PXS className='text-themeGray'>
        Are you sure you want to delete this project? Write your username
        <span className='font-bold'> ({user.userName})</span> below to confirm.
        There is no going back. Please be certain.
      </PXS>
      <Form
        className='grid grid-cols-1 gap-8 mt-8 w-full md:grid-cols-4'
        onSubmit={onSubmitHandler}>
        <Input
          className='md:col-span-2'
          id='name'
          name='name'
          placeholder='Username'
          requiered
        />
        <Button onClick={onCancel} theme='light'>
          Cancel
        </Button>
        <LoadingButton isLoading={isLoading} type='submit' theme='error'>
          Delete
        </LoadingButton>
      </Form>
    </div>
  );
};
