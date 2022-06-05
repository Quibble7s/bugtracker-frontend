import { useAlert, useProject } from 'src/Hooks';
import { UpdateTask } from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { Image } from '../Image';
import { PXS } from '../Typography';

export const TaskCard = ({ task, issue }: { task: Task; issue: Bug }) => {
  const { project, setProject } = useProject();
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
    <div
      className={`w-full bg-light-blue rounded-md items-center justify-between transition-colors duration-200 relative`}>
      <div className={`rounded-md flex flex-row items-start gap-2`}>
        <button
          onClick={() => {
            handleOnChange();
          }}>
          <Image width={16} height={16} src={image[task.state]} />
        </button>
        <div className='w-full'>
          <PXS
            className={`text-themeGray text-left max-w-[900px] ${
              text[task.state]
            }`}>
            {task.description}
          </PXS>
        </div>
      </div>
    </div>
  );
};
