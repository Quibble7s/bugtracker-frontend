import { useState } from 'react';
import { useAlert, useAuth, useProject } from 'src/Hooks';
import { UpdateTaskState, userIsProjectAdmin } from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { Image } from '../Image';
import { ThreeDotsDropDown, Tooltip } from '../Layout';
import { PXS } from '../Typography';
import './Styles/taskcard.css';

export const TaskCard = ({ task, issue }: { task: Task; issue: Bug }) => {
  const [status, setStatus] = useState<TaskState>(task.state);
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
          updateProjectState(state);
          return;
        }
        alert(message, 'error', 2.5);
      },
    );
  };

  const updateProjectState = (state: 'pending' | 'completed'): void => {
    const updatedIssues: Bug[] = project.bugs.map((bug) => {
      if (bug.id === issue.id) {
        return {
          ...bug,
          tasks: bug.tasks.map((tsk) => {
            if (tsk.id === task.id) {
              return { ...tsk, state: TaskState[state] };
            }
            return tsk;
          }),
        };
      }
      return bug;
    });
    setProject({ ...project, bugs: [...updatedIssues] });
  };

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
                <button className='p-2 bg-green-500/20 border border-green-500 rounded-md w-full'>
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
