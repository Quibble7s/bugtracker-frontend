import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Form, Input, TextArea } from 'src/Components/Form';
import { useAlert, useAuth, useProject } from 'src/Hooks';
import { UpdateProject } from 'src/Lib';

type Data = {
  name: string;
  description: string;
};

export const EditProjectForm = ({ userIsAdmin }: { userIsAdmin: boolean }) => {
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { project, setProject } = useProject();
  const { signOut } = useAuth();
  const { alert } = useAlert();
  const navigate = useNavigate();

  const onDataChangeHandler = (data: Data) => {
    //Checking if both fields are empty strings.
    const bothEmpty: boolean = data.description === '' && data.name === '';

    //Checking if one of the fields is empty and the other is undefined (not changed).
    const oneEmptyOtherUndefined: boolean =
      (data.description === '' && data.name === undefined) ||
      (data.description === undefined && data.name === '');

    //Checking if both fields are equals to the originals.
    const dataIsEqualToOriginal: boolean =
      data.description === project.description && data.name === project.name;

    //Checking if one of the fields is equal to the original and the other is undefined (not changed).
    const oneFieldIsEqualToOriginalOtherUndefined: boolean =
      (data.description === project.description && data.name === undefined) ||
      (data.name === project.name && data.description === undefined);

    if (
      bothEmpty ||
      oneEmptyOtherUndefined ||
      dataIsEqualToOriginal ||
      oneFieldIsEqualToOriginalOtherUndefined
    ) {
      setIsSaveButtonDisabled(true);
      return;
    }
    setIsSaveButtonDisabled(false);
  };

  const onSubmit = async (data: Data) => {
    setIsLoading(true);
    await UpdateProject(data, project.id, ({ message, status }) => {
      if (status === 204) {
        alert(message, 'success', 2.5);
        //Checking if the name field is empty.
        const name: string =
          data.name === '' || data.name === undefined
            ? project.name
            : data.name;
        //Checking if the description field is empty.
        const description: string =
          data.description === '' || data.description === undefined
            ? project.description
            : data.description;
        setProject({ ...project, name, description });
        return;
      }
      if (status === 401) {
        alert(message, 'error', 5);
        signOut();
        navigate('/auth/login', { replace: true });
        return;
      }
    });
    setIsLoading(false);
  };

  return (
    <Form
      onDataChange={onDataChangeHandler}
      className='flex flex-col gap-8'
      onSubmit={onSubmit}>
      <Input
        disabled={!userIsAdmin}
        id='name'
        name='name'
        placeholder='Project name'
        defaultValue={project?.name}
      />
      <TextArea
        disabled={!userIsAdmin}
        id='description'
        name='description'
        placeholder='Project description'
        defaultValue={project?.description}
      />
      {userIsAdmin && (
        <LoadingButton
          className='w-full md:w-max'
          disabled={isSaveButtonDisabled}
          type='submit'
          theme='success'
          isLoading={isLoading}>
          Save changes
        </LoadingButton>
      )}
    </Form>
  );
};
