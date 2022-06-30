import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Form, Input, Option, Select, TextArea } from 'src/Components/Form';
import { useAlert, useAuth, useProject } from 'src/Hooks';
import { EditIssue } from 'src/Lib';
import { Bug, BugPriority } from 'src/Models';

type Data = {
  name: string;
  description: string;
  priority: 'normal' | 'medium' | 'high';
};

export const EditIssueForm = ({ issue }: { issue: Bug }) => {
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { project, setProject } = useProject();
  const { alert } = useAlert();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const onDataChangeHandler = (data: Data) => {
    data = {
      name: data.name ?? issue.name,
      description: data.description ?? issue.description,
      priority: data.priority ?? issue.priority,
    };

    //Checking if all data is equal to the original data
    const allDataEqualToOriginal: boolean =
      data.name === issue.name &&
      data.description === issue.description &&
      data.priority === issue.priority;

    //Checking if one of the text field is empty and the other fields are equal to the originals.
    const oneIsEmptyOtherEquals: boolean =
      (data.name === '' &&
        data.description === issue.description &&
        data.priority === issue.priority) ||
      (data.description === '' &&
        data.name === issue.name &&
        data.priority === issue.priority);

    //Checking if both fields are empty and the priority hasn't changed.
    const bothEmptyAndSamePriority: boolean =
      data.name === '' &&
      data.description === '' &&
      data.priority === issue.priority;

    if (
      allDataEqualToOriginal ||
      oneIsEmptyOtherEquals ||
      bothEmptyAndSamePriority
    ) {
      setIsSaveButtonDisabled(true);
      return;
    }
    setIsSaveButtonDisabled(false);
  };

  const onSubmitHandler = async (data: Data) => {
    setIsLoading(true);
    data = {
      name: data.name ?? issue.name,
      description: data.description ?? issue.description,
      priority: data.priority ?? issue.priority,
    };
    await EditIssue(issue.id, project.id, data, ({ message, status }) => {
      if (status === 204) {
        alert(message, 'success', 2.5);
        setProject({
          ...project,
          bugs: project.bugs.map((bug) => {
            if (bug.id === issue.id) {
              return {
                ...bug,
                name: data.name,
                description: data.description,
                priority: BugPriority[data.priority],
              };
            }
            return bug;
          }),
        });
        return;
      }
      if (status === 401) {
        signOut();
        alert('Session expired, please login.', 'error', 5);
        navigate('/auth/login', { replace: true });
        return;
      }
      alert(message, 'error', 2.5);
    });
    setIsLoading(false);
  };

  return (
    <Form
      onDataChange={onDataChangeHandler}
      className='flex flex-col gap-8'
      onSubmit={onSubmitHandler}>
      <Input
        id='name'
        name='name'
        placeholder='Issue name'
        defaultValue={issue.name}
      />
      <TextArea
        id='description'
        name='description'
        placeholder='Issue description'
        defaultValue={issue.description}
      />
      <Select className='' name='priority' id='priority'>
        <Option selected={issue.priority === BugPriority.normal} value='normal'>
          Low
        </Option>
        <Option selected={issue.priority === BugPriority.medium} value='medium'>
          Medium
        </Option>
        <Option selected={issue.priority === BugPriority.high} value='high'>
          High
        </Option>
      </Select>
      <LoadingButton
        disabled={isSaveButtonDisabled}
        type='submit'
        isLoading={isLoading}
        theme='success'>
        Save changes
      </LoadingButton>
    </Form>
  );
};
