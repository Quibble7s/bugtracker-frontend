import { useState } from 'react';
import { useAuth, useProject } from 'src/Hooks';
import { InverseLerp, Lerp, userIsProjectAdmin } from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { IssueModal } from 'src/Sections';
import { Image } from '../Image';
import { ThreeDotsDropDown, Tooltip } from '../Layout';
import { PXS } from '../Typography';
import './Styles/issuecard.css';

export const IssueCard = ({ bug }: { bug: Bug }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const { project } = useProject();

  const theme = {
    normal: 'bg-green-500',
    medium: 'bg-yellow-300',
    high: 'bg-red-500',
  };

  const priority = {
    normal: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  const getCompletedPercentage = (): number => {
    if (bug.tasks.length <= 0) return 0;

    let completedCount = 0;
    for (let i = 0; i < bug.tasks.length; i++) {
      const task: Task = bug.tasks[i];
      if (task.state === TaskState.completed) {
        completedCount++;
      }
    }

    const calculatedPercentage = (completedCount / bug.tasks.length) * 100;
    return Math.round(calculatedPercentage);
  };

  const getCompletedCount = (): number => {
    if (bug.tasks.length <= 0) return 0;

    let completedCount = 0;
    for (let i = 0; i < bug.tasks.length; i++) {
      const task: Task = bug.tasks[i];
      if (task.state === TaskState.completed) {
        completedCount++;
      }
    }

    return completedCount;
  };

  const getProgressBarColor = () => {
    const targetColor = { r: 34, g: 197, b: 94 };
    const baseColor = { r: 239, g: 68, b: 68 };

    const step = InverseLerp(0, 100, getCompletedPercentage());
    const r = Lerp(baseColor.r, targetColor.r, step);
    const g = Lerp(baseColor.g, targetColor.g, step);
    const b = Lerp(baseColor.b, targetColor.b, step);

    return `rgb(${r},${g},${b})`;
  };

  return (
    <>
      <IssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bug={bug}
      />
      <div
        role='button'
        onClick={() => {
          setIsModalOpen(true);
        }}
        className='w-full min-h-[250px] max-h-[250px] bg-themeLightGray rounded-md overflow-y-auto p-4 cursor-pointer issue-container overflow-x-hidden'>
        <div className='bg-light-blue w-full h-full rounded-md border-b border-themeGray/25 grid grid-rows-6 p-4 relative'>
          {userIsProjectAdmin(user, project) && (
            <div className='absolute right-[4px] top-[16px] opacity-0 transition-opacity duration-200 issue-drop'>
              <ThreeDotsDropDown className='min-w-[140px]'>
                <PXS className='p-2 border border-red-500 bg-red-500/20 text-red-500 rounded-md'>
                  Delete issue
                </PXS>
              </ThreeDotsDropDown>
            </div>
          )}
          <div className='row-span-4'></div>
          <div className='row-span-2 flex flex-col justify-between'>
            <div>
              <Tooltip
                className=''
                text={`${priority[bug.priority]} priority.`}>
                <span
                  className={`block w-[12.5%] min-h-[6px] rounded-xl ${
                    theme[bug.priority]
                  }`}
                />
              </Tooltip>
              <PXS className='mt-2 text-themeGray'>{bug.name}</PXS>
            </div>
            <div className='w-full flex flex-row mt-2'>
              <div className='flex w-max flex-row items-center'>
                <Tooltip text='Description.'>
                  <Image
                    width={16}
                    height={16}
                    src='/static/images/details.svg'
                  />
                </Tooltip>
                <div className='flex flex-row items-center justify-center w-max ml-2'>
                  <Image
                    width={16}
                    height={16}
                    src='/static/images/checkmark-checked.svg'
                  />
                  <PXS className='text-themeGray'>
                    {getCompletedCount()}/{bug.tasks.length}
                  </PXS>
                </div>
              </div>
              <div className='flex-auto p-2 rounded-md'>
                <Tooltip text={`${getCompletedPercentage()}% completed.`}>
                  <div
                    style={{
                      width: `${getCompletedPercentage()}%`,
                      backgroundColor: getProgressBarColor(),
                    }}
                    className='h-[6px] my-auto rounded-md transition-all duration-500'
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
