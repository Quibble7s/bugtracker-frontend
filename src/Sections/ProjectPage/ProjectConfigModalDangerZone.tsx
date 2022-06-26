import { Button } from 'src/Components/Buttons';
import { PXS } from 'src/Components/Typography';
import { useState } from 'react';
import { ConfirmLeave } from './ConfirmLeave';
import { ConfirmDelete } from './ConfirmDelete';

export const ProjectConfigModalDangerZone = ({
  userIsAdmin,
}: {
  userIsAdmin: boolean;
}) => {
  const [actionMode, setActionMode] = useState<boolean>(false);
  return (
    <>
      <PXS className='text-red-500 font-bold mt-16'>Danger zone</PXS>
      <span className='block w-full h-[1px] mt-2 bg-themeGray' />
      <div className='mt-4 flex flex-col gap-4 items-center md:flex-row'>
        {!userIsAdmin && actionMode && (
          <ConfirmLeave onCancel={() => setActionMode(false)} />
        )}
        {userIsAdmin && actionMode && (
          <ConfirmDelete onCancel={() => setActionMode(false)} />
        )}
        {!userIsAdmin && !actionMode && (
          <Button
            onClick={() => setActionMode(true)}
            className='w-full md:w-max'
            theme='error'>
            Leave project
          </Button>
        )}
        {userIsAdmin && !actionMode && (
          <Button
            onClick={() => setActionMode(true)}
            className='w-full md:w-max'
            theme='error'>
            Delete project
          </Button>
        )}
      </div>
    </>
  );
};
