import { useEffect, useState } from 'react';
import { useAlert, useAuth, useProject } from 'src/Hooks';
import {
  UpdateTaskDescription,
  UpdateTaskState,
  userIsProjectAdmin,
} from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { ActionLoadingAnimation } from '../Animations';
import { Button } from '../Buttons';
import { Form, Input, TextArea } from '../Form';
import { Image } from '../Image';
import { ThreeDotsDropDown, Tooltip } from '../Layout';
import { PXS } from '../Typography';
import './Styles/taskcard.css';

export const TaskCard = ({ task, issue }: { task: Task; issue: Bug }) => {
  const [status, setStatus] = useState<TaskState>(task.state);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { project, setProject } = useProject();
  const { user } = useAuth();
  const { alert } = useAlert();

  const text = {
    pending: '',
    inProgress: '',
    completed: 'line-through',
  };

  const image = {
    pending: '/static/images/checkmark-unchecked.svg',
    inProgress: '',
    completed: '/static/images/checkmark-checked.svg',
  };

  const handleOnChange = async (): Promise<void> => {
    const state = task.state === TaskState.completed ? 'pending' : 'completed';
    setStatus(TaskState[state]);
    await UpdateTaskState(
      { taskID: task.id, projectID: project.id, issueID: issue.id, state },
      ({ message, status }) => {
        if (status === 204) {
          updateTaskInProject('state', state);
          return;
        }
        alert(message, 'error', 2.5);
      },
    );
  };

  const handleOnEdit = async (data: any): Promise<void> => {
    setIsLoading(true);
    await UpdateTaskDescription(
      {
        taskID: task.id,
        issueID: issue.id,
        projectID: project.id,
        description: data.description,
      },
      ({ message, status }) => {
        if (status === 204) {
          alert(message, 'success', 2.5);
          updateTaskInProject('description', data.description);
          setEditMode(false);
          return;
        }
        alert(message, 'error', 2.5);
      },
    );
    setIsLoading(false);
  };

  const updateTaskInProject = (property: string, value: any): void => {
    const updatedIssues: Bug[] = project.bugs.map((bug) => {
      if (bug.id === issue.id) {
        return {
          ...bug,
          tasks: bug.tasks.map((tsk) => {
            if (tsk.id === task.id) {
              return { ...tsk, [property]: value };
            }
            return tsk;
          }),
        };
      }
      return bug;
    });
    setProject({ ...project, bugs: [...updatedIssues] });
  };

  useEffect(() => {}, []);

  if (editMode) {
    return (
      <Form
        className='w-full flex flex-col lg:flex-row lg:items-center gap-2'
        onSubmit={handleOnEdit}>
        <TextArea
          defaultValue={task.description}
          className='w-[min(100%,900px)]'
          id='description'
          name='description'
          placeholder='Description'
          requiered
        />
        {isLoading ? (
          <div className='bg-secondary p-4 rounded-md h-full cursor-not-allowed'>
            <ActionLoadingAnimation />
          </div>
        ) : (
          <div className='flex flex-row gap-2'>
            <Button type='submit' theme='success'>
              +
            </Button>
            <Button onClick={() => setEditMode(false)} theme='error'>
              x
            </Button>
          </div>
        )}
      </Form>
    );
  }

  return (
    <div className={`w-full items-center justify-between`}>
      <div
        className={`rounded-md flex flex-row items-start gap-2 description-container`}>
        <Tooltip
          className='mt-[6px]'
          text={`Mark as ${
            task.state === 'completed' ? 'pending.' : 'completed.'
          }`}>
          <button
            onClick={() => {
              handleOnChange();
            }}>
            <Image width={16} height={16} src={image[status]} />
          </button>
        </Tooltip>
        <div className='w-full hover:bg-themeLightGray relative'>
          <PXS
            className={`text-themeGray text-left max-w-[900px] p-2 ${text[status]}`}>
            {task.description}
          </PXS>
          <div className='absolute right-[-8px] lg:right-0 top-[6px] opacity-0 buttons'>
            {userIsProjectAdmin(user, project) && (
              <ThreeDotsDropDown>
                <button
                  onClick={() => setEditMode(true)}
                  className='p-2 bg-green-500/20 border border-green-500 rounded-md w-full'>
                  <PXS className='text-left text-green-500'>Edit</PXS>
                </button>
                <button className='p-2 bg-red-500/20 border border-red-500 rounded-md w-full'>
                  <PXS className='text-left text-red-500'>Delete</PXS>
                </button>
              </ThreeDotsDropDown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
