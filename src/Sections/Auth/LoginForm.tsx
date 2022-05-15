import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Input } from 'src/Components/Form';
import { H4, PXS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';
import { AuthForm } from './AuthForm';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const locationState: any = useLocation().state;
  const prevLocation: string = locationState?.from || '/';

  const onSubmitHandler = async (data: any) => {
    const params = { email: data.email, password: data.password };
    setIsLoading(true);
    await auth.logIn(params, () => {
      setIsLoading(false);
      navigate(prevLocation, { replace: true });
    });
  };
  return (
    <AuthForm onSubmitHandler={onSubmitHandler}>
      <H4 className='text-center mb-4'>Login</H4>
      <Input
        id='email'
        name='email'
        placeholder='email'
        type='email'
        requiered
      />
      <Input
        type='password'
        id='password'
        name='password'
        placeholder='password'
        minLenght={8}
        requiered
      />
      <PXS className='text-center text-themeGray mix-blend-multiply'>
        Don't have an account?...{' '}
        <Link
          className='underline transition-colors duration-200 hover:text-blue-400'
          to='/auth/register'>
          Sign in
        </Link>
        .
      </PXS>
      <LoadingButton
        type='submit'
        className='w-fit min-w-[100px] mx-auto'
        theme='secondary'
        isLoading={isLoading}>
        Log in
      </LoadingButton>
    </AuthForm>
  );
};
