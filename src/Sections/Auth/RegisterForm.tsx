import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from 'src/Components/Buttons';
import { Input } from 'src/Components/Form';
import { H4, PXS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { AuthForm } from './AuthForm';

type Data = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { alert } = useAlert();
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmitHandler = async (data: Data) => {
    if (data.password !== data.confirm) {
      const confirmField = document.getElementById('confirm');
      confirmField?.focus();
      alert('Passwords must match.', 'error', 5);
      return;
    }

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
      <H4 className='text-center text-themeGray mb-4'>Create an account</H4>
      <Input id='username' name='name' placeholder='Username' requiered />
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
      <Input
        type='password'
        id='confirm'
        name='confirm'
        placeholder='Confirm password'
        minLenght={8}
        requiered
      />
      <PXS className='text-center text-themeGray mix-blend-multiply'>
        Already have an account?...{' '}
        <Link
          className='underline transition-colors duration-200 hover:text-secondary'
          to='/auth/login'>
          Login
        </Link>
        .
      </PXS>
      <LoadingButton
        type='submit'
        className='w-fit min-w-[100px] mx-auto'
        theme='secondary'
        isLoading={isLoading}>
        Sign up
      </LoadingButton>
    </AuthForm>
  );
};
