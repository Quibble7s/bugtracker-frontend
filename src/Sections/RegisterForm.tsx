import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'src/Components/Buttons';
import { Input } from 'src/Components/Form';
import { H4, PXS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';
import { AuthForm } from './AuthForm';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const onSubmitHandler = async (data: any) => {
    const params = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    await auth.register(params, ({ message, status }) => {
      if (status === 200) {
        navigate('/dashboard', { replace: true });
      }
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
      <Button type='submit' className='w-fit mx-auto' theme='secondary'>
        Create account
      </Button>
    </AuthForm>
  );
};
