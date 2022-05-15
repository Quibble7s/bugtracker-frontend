import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Input } from 'src/Components/Form';
import { H4, PXS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { AuthForm } from './AuthForm';

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert } = useAlert();
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmitHandler = async (data: any) => {
    const params = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    await auth.register(params, ({ message, status }) => {
      setIsLoading(true);
      if (status === 200) {
        alert(message, 'success', 2.5);
        navigate('/dashboard', { replace: true });
        setIsLoading(false);
        return;
      }
      alert(message, 'error', 2.5);
      setIsLoading(false);
    });
  };

  return (
    <AuthForm onSubmitHandler={onSubmitHandler}>
      <H4 className='text-center mb-4'>Create an account</H4>
      <Input id='username' name='name' placeholder='username' requiered />
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
      <Input
        type='password'
        id='confirm'
        name='confirm'
        placeholder='confirm password'
        minLenght={8}
        requiered
      />
      <PXS className='text-center text-themeGray mix-blend-multiply'>
        Already have an account?...{' '}
        <Link
          className='underline transition-colors duration-200 hover:text-blue-400'
          to='/auth/login'>
          Log in
        </Link>
        .
      </PXS>
      <LoadingButton
        type='submit'
        className='w-fit min-w-[100px] mx-auto'
        theme='secondary'
        isLoading={isLoading}>
        Sign in
      </LoadingButton>
    </AuthForm>
  );
};
