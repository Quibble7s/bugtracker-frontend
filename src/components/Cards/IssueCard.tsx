import { InverseLerp, Lerp } from 'src/Lib';
import { Bug, Task, TaskState } from 'src/Models';
import { Button } from '../Buttons';
import { H4, PXS } from '../Typography';
import { TaskCard } from './TaskCard';

export const IssueCard = ({ bug }: { bug: Bug }) => {
  const theme = {
    normal: 'bg-green-500',
    medium: 'bg-yellow-300',
    high: 'bg-red-500',
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

  const getProgressBarColor = () => {
    const green = { r: 34, g: 197, b: 94 };
    const red = { r: 239, g: 68, b: 68 };
    const step = InverseLerp(0, 100, getCompletedPercentage());
    const r = Lerp(red.r, green.r, step);
    const g = Lerp(red.g, green.g, step);
    const b = Lerp(red.b, green.b, step);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div
      className='w-full bg-themeLightGray rounded-md border
      grid grid-rows-3 min-h-[480px] max-h-[480px] relative overflow-clip'>
      <div className='p-4 row-span-1 overflow-y-auto'>
        <H4 className='mt-8 text-center text-themeBlack'>{bug.name}</H4>
        <PXS className='mt-8 text-justify text-themeGray min-h-[20px] max-h-[200px]'>
          {bug.description}
        </PXS>
      </div>
      <div className='p-4 row-span-2 w-full flex flex-col gap-4 overflow-y-auto'>
        {bug.tasks.map((task) => (
          <TaskCard task={task} issue={bug} />
        ))}
        <Button className='ml-auto mb-12' theme='success'>
          Add new task
        </Button>
      </div>
      <div
        className={`absolute w-full top-0 left-0 h-[24px] ${
          theme[bug.priority]
        }`}
      />
      <div className='absolute bg-themeGray w-full grid grid-cols-12 bottom-0 left-0 p-4'>
        <div className='col-span-10'>
          <div
            style={{
              transform: `scale(${InverseLerp(
                0,
                100,
                getCompletedPercentage(),
              )}, 1)`,
              backgroundColor: getProgressBarColor(),
            }}
            className={`w-[100%] h-[12px] my-[3px] rounded-md col-span-1 transition-all duration-500 origin-left`}
          />
        </div>
        <div className='col-span-2'>
          <PXS className='text-light-blue text-right'>
            {getCompletedPercentage()}%
          </PXS>
        </div>
      </div>
    </div>
  );
};
