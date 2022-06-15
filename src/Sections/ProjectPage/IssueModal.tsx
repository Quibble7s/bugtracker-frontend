import { useState } from 'react';
import { Button } from 'src/Components/Buttons';
import { TaskCard } from 'src/Components/Cards';
import { Image } from 'src/Components/Image';
import { Modal, Tooltip } from 'src/Components/Layout';
import { H4, PXS } from 'src/Components/Typography';
import { useAuth, useProject } from 'src/Hooks';
import { userIsProjectAdmin } from 'src/Lib';
import { Bug } from 'src/Models';
import { AddTaskFrom } from './AddTaskFrom';

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  bug: Bug;
}

export const IssueModal = ({ isOpen, onClose, bug }: Props) => {
  const [isAddTaskActive, setIsAddTaskActive] = useState<boolean>(false);
  const { user } = useAuth();
  const { project } = useProject();

  const priority = {
    normal: 'Low priority.',
    medium: 'Medium priority.',
    high: 'High priority.',
  };

  const theme = {
    normal: 'bg-green-500',
    medium: 'bg-yellow-300',
    high: 'bg-red-500',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setIsAddTaskActive(false);
      }}>
      <div className='flex flex-row gap-2'>
        <Image width={16} height={16} src='/static/images/title.svg' />
        <H4 className='text-themeGray'>{bug.name}</H4>
      </div>
      <div className='w-full mt-4'>
        <Tooltip
          className='min-w-[100px] max-w-[6.25%]'
          text={`${priority[bug.priority]}`}>
          <span
            className={`block w-full min-h-[6px] rounded-xl ${
              theme[bug.priority]
            }`}
          />
        </Tooltip>
      </div>
      <div className='flex flex-row gap-2 mt-16'>
        <Image width={16} height={16} src='/static/images/details.svg' />
        <H4 className='text-themeGray'>Description</H4>
      </div>
      <PXS className='text-themeGray mt-4 max-w-[900px]'>{bug.description}</PXS>
      <div className='flex flex-row gap-2 mt-16'>
        <Image width={16} height={16} src='/static/images/checkmark-list.svg' />
        <H4 className='text-themeGray'>Task(s)</H4>
      </div>
      <div className='flex flex-col mt-4 gap-4'>
        {bug.tasks.map((task) => (
          <TaskCard key={task.id} task={task} issue={bug} />
        ))}
        <AddTaskFrom
          isActive={isAddTaskActive}
          setIsActive={setIsAddTaskActive}
          bug={bug}
        />
        {userIsProjectAdmin(user, project) && !isAddTaskActive && (
          <Button
            onClick={() => setIsAddTaskActive(true)}
            className='w-max mt-2'
            theme='success'>
            +Add task
          </Button>
        )}
      </div>
    </Modal>
  );
};
