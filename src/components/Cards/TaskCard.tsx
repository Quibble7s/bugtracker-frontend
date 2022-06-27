import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert, useAuth, useProject } from 'src/Hooks';
import {
  DeleteTask,
  UpdateTaskDescription,
  UpdateTaskState,
  userIsProjectAdmin,
} from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { ActionLoadingAnimation } from '../Animations';
import { Button } from '../Buttons';
import { Form, TextArea } from '../Form';
import { Image } from '../Image';
import { ThreeDotsDropDown, Tooltip } from '../Layout';
import { PXS } from '../Typography';
import './Styles/taskcard.css';

export const TaskCard = ({ task, issue }: { task: Task; issue: Bug }) => {
  const [status, setStatus] = useState<TaskState>(task.state);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { project, setProject } = useProject();
  const { user } = useAuth();
  const { alert } = useAlert();
  const { signOut } = useAuth();

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
        if (status === 401) {
          alert('Session expired, please login.', 'error', 5);
          signOut();
          navigate('/auth/login', { replace: true });
          return;
        }
        alert(message, 'error', 2.5);
      },
    );
  };

  const handleOnDelete = async (): Promise<void> => {
    await DeleteTask(
      { taskID: task.id, issueID: issue.id, projectID: project.id },
      ({ message, status }) => {
        if (status === 204) {
          updateProjectWithoutDeletedTask();
          alert(message, 'success', 2.5);
          return;
        }
        if (status === 401) {
          alert('Session expired, please login.', 'error', 5);
          signOut();
          navigate('/auth/login', { replace: true });
          return;
        }
        alert(message, 'error', 2.5);
      },
    );
  };

  const handleOnEdit = async (data: any): Promise<void> => {
    if (
      data.description === task.description ||
      data.description === '' ||
      data.description === undefined
    ) {
      alert('You need to make a change.', 'error', 2.5);
      return;
    }
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
        if (status === 401) {
          alert('Session expired, please login.', 'error', 5);
          signOut();
          navigate('/auth/login', { replace: true });
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

  const updateProjectWithoutDeletedTask = () => {
    const updatedIssues: Bug[] = project.bugs.map((bug) => {
      if (bug.id === issue.id) {
        return { ...bug, tasks: bug.tasks.filter((tsk) => tsk.id !== task.id) };
      }
      return bug;
    });
    setProject({ ...project, bugs: updatedIssues });
  };

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
              <Image
                width={16}
                height={16}
                src='/static/images/checkmark.svg'
                alt='Edit'
              />
            </Button>
            <Button onClick={() => setEditMode(false)} theme='error'>
              <Image
                width={16}
                height={16}
                src='/static/images/cancel.svg'
                alt='Edit'
              />
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
                <Button
                  className='w-full'
                  theme='success'
                  onClick={() => setEditMode(true)}>
                  Edit
                </Button>
                <Button
                  className='w-full'
                  theme='error'
                  onClick={handleOnDelete}>
                  Delete
                </Button>
              </ThreeDotsDropDown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
