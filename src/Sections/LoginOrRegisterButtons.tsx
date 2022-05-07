import { Button } from 'src/Components/Buttons';
import { PXS } from 'src/Components/Typography';

export const LoginOrRegisterButtons = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={`${className}`}>
      <Button onClick={() => {}} theme='secondary'>
        Sign in
      </Button>
      <PXS className='text-gray-400'>Or</PXS>
      <Button onClick={() => {}} theme='primary'>
        Get started
      </Button>
    </div>
  );
};
