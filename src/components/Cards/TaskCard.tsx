import { ChangeEvent } from 'react';
import { useAlert, useProject } from 'src/Hooks';
import { UpdateTask } from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { PXS } from '../Typography';

export const TaskCard = ({ task, issue }: { task: Task; issue: Bug }) => {
  const { project, setProject } = useProject();
  const { alert } = useAlert();
  const theme = {
    pending: 'bg-red-500',
    inProgress: 'bg-yellow-300',
    completed: 'bg-green-500',
  };

  const handleOnChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const val = e.currentTarget.value;
    const state: 'pending' | 'inProgress' | 'completed' =
      val === 'pending'
        ? 'pending'
        : val === 'inProgress'
        ? 'inProgress'
        : 'completed';
    await UpdateTask(
      { taskID: task.id, projectID: project.id, issueID: issue.id, state },
      ({ message, status }) => {
        if (status === 204) {
          alert('Task state updated.', 'success', 2.5);
          updateProjectState(state);
          return;
        }
        alert(message, 'error', 2.5);
      },
    );
  };

  const updateProjectState = (
    state: 'pending' | 'inProgress' | 'completed',
  ): void => {
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
    <div
      className={`w-full p-2 bg-light-blue rounded-md items-center justify-between transition-colors duration-200 relative`}>
      <div
        className={`p-2 max-h-[250px] min-h-[200px] overflow-y-auto rounded-md flex flex-col justify-between`}>
        <div className='w-full'>
          <PXS className='text-themeBlack text-left'>{task.description}</PXS>
        </div>
        <div className='mr-auto mt-2 p-[2px] rounded-md'>
          <form className='flex flex-col justify-between gap-2'>
            <div>
              <input
                onChange={handleOnChange}
                className='cursor-pointer'
                type='radio'
                name='state'
                value='pending'
                defaultChecked={task.state === TaskState.pending}
              />
              <PXS className='inline ml-2'>Pending</PXS>
            </div>
            <div>
              <input
                onChange={handleOnChange}
                className='cursor-pointer'
                type='radio'
                name='state'
                value='inProgress'
                defaultChecked={task.state === TaskState.inProgress}
              />
              <PXS className='inline ml-2'>In progress</PXS>
            </div>
            <div>
              <input
                onChange={handleOnChange}
                className='cursor-pointer'
                type='radio'
                name='state'
                value='completed'
                defaultChecked={task.state === TaskState.completed}
              />
              <PXS className='inline ml-2'>Completed</PXS>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`absolute w-full min-h-[12px] left-0 bottom-0 rounded-b-md transition-colors duration-500 ${
          theme[task.state]
        }`}
      />
    </div>
  );
};
