import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Input } from 'src/Components/Form';
import { H4, PXS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { AuthForm } from './AuthForm';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();
  const { alert } = useAlert();
  const navigate = useNavigate();
  const locationState: any = useLocation().state;
  const prevLocation: string = locationState?.from || '/';

  const onSubmitHandler = async (data: any) => {
    const params = { email: data.email, password: data.password };
    setIsLoading(true);
    await auth.logIn(params, ({ message, status }) => {
      setIsLoading(false);
      if (status === 200) {
        alert(message, 'success', 2.5);
        navigate(prevLocation, { replace: true });
        return;
      }
      alert(message, 'error', 2.5);
    });
  };
  return (
    <AuthForm onSubmitHandler={onSubmitHandler}>
      <H4 className='text-center text-themeGray mb-4'>Login</H4>
      <Input
        id='email'
        name='email'
        placeholder='Email'
        type='email'
        requiered
      />
      <Input
        type='password'
        id='password'
        name='password'
        placeholder='Password'
        minLenght={8}
        requiered
      />
      <PXS className='text-center text-themeGray mix-blend-multiply'>
        Don't have an account?...{' '}
        <Link
          className='underline transition-colors duration-200 hover:text-secondary'
          to='/auth/register'>
          Sign up
        </Link>
        .
      </PXS>
      <LoadingButton
        type='submit'
        className='w-fit min-w-[100px] mx-auto'
        theme='secondary'
        isLoading={isLoading}>
        Login
      </LoadingButton>
    </AuthForm>
  );
};
