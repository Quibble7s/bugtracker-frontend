import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'src/Components/Buttons';
import { PS, PXS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';

export const LoginOrRegisterButtons = ({
  className,
}: {
  className?: string;
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const show = location.pathname === '/';
  const navigate = useNavigate();
  return (
    <>
      {show && user === null && (
        <div className={`${className}`}>
          <Link to='/auth/login'>
            <PS className='text-secondary hover:text-secondary/70'>Login</PS>
          </Link>
          <PXS className='text-themeGray'>Or</PXS>
          <Button
            onClick={() => {
              navigate('/auth/register', { replace: false });
            }}
            theme='primary'>
            Get started
          </Button>
        </div>
      )}
    </>
  );
};
