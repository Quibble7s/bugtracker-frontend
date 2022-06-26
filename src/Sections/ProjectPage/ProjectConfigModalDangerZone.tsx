import { Button } from 'src/Components/Buttons';
import { PXS } from 'src/Components/Typography';

export const ProjectConfigModalDangerZone = ({
  userIsAdmin,
}: {
  userIsAdmin: boolean;
}) => {
  return (
    <>
      <PXS className='text-red-500 font-bold mt-16'>Danger zone</PXS>
      <span className='block w-full h-[1px] mt-2 bg-themeGray' />
      <div className='mt-4 flex flex-col gap-4 items-center md:flex-row'>
        {!userIsAdmin ? (
          <Button className='w-full md:w-max' theme='error'>
            Leave project
          </Button>
        ) : (
          <Button className='w-full md:w-max' theme='error'>
            Delete project
          </Button>
        )}
      </div>
    </>
  );
};
