import { useNavigate } from 'react-router-dom';
import { Button } from 'src/Components/Buttons';
import { PXS } from 'src/Components/Typography';

export const LoginOrRegisterButtons = ({
  className,
}: {
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className={`${className}`}>
      <Button
        onClick={() => {
          navigate('/auth/login', { replace: false });
        }}
        theme='secondary'>
        Sign in
      </Button>
      <PXS className='text-gray-400'>Or</PXS>
      <Button
        onClick={() => {
          navigate('/auth/register', { replace: false });
        }}
        theme='primary'>
        Get started
      </Button>
    </div>
  );
};
