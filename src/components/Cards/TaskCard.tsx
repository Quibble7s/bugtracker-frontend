import { useAlert, useAuth, useProject } from 'src/Hooks';
import { UpdateTaskState, userIsProjectAdmin } from 'src/Lib';
import { Bug, Member, ProjectRole, Task, TaskState } from 'src/Models';
import { Image } from '../Image';
import { PXS } from '../Typography';
import './Styles/taskcard.css';

export const TaskCard = ({ task, issue }: { task: Task; issue: Bug }) => {
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
    await UpdateTaskState(
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
      <div
        className={`rounded-md flex flex-row items-start gap-2 description-container`}>
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
          {userIsProjectAdmin(user, project) && (
            <div className='flex flex-row items-center justify-center w-max gap-4 opacity-0 transition-opacity duration-200 buttons'>
              <button>
                <Image
                  width={16}
                  height={16}
                  src='/static/images/checkmark-checked.svg'
                />
              </button>
              <button>
                <Image
                  width={16}
                  height={16}
                  src='/static/images/checkmark-unchecked.svg'
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
