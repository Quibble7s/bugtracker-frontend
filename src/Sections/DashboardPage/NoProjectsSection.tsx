import { Button } from 'src/Components/Buttons';
import { Image } from 'src/Components/Image';
import { H3, PXS } from 'src/Components/Typography';

interface Props {
  onJoinOpen: VoidFunction;
  onCreateOpen: VoidFunction;
}

export const NoProjectsSection = ({ onJoinOpen, onCreateOpen }: Props) => {
  return (
    <div className='absolute pointer-events-none top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center'>
      <Image
        className='mt-8'
        width={512}
        height={512}
        src='/static/images/warning.svg'
      />
      <H3 className='mt-8'>Nothing to show here</H3>
      <PXS className='text-themeGray'>No projects found but you can...</PXS>
      <div className=' pointer-events-auto flex flex-row items-center gap-4 mt-16 z-10'>
        <Button onClick={onJoinOpen} theme='secondary'>
          Join project
        </Button>{' '}
        <PXS className='text-themeGray'>or</PXS>
        <Button onClick={onCreateOpen} theme='success'>
          + Create project
        </Button>
      </div>
    </div>
  );
};
