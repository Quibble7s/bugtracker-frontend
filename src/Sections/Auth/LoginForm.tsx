import { Link } from 'react-router-dom';
import { Button } from 'src/Components/Buttons';
import { Input } from 'src/Components/Form';
import { H4, PXS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';
import { AuthForm } from './AuthForm';

export const LoginForm = () => {
  const auth = useAuth();
  const onSubmitHandler = async (data: any) => {
    const params = { email: data.email, password: data.password };
    await auth.logIn(params, () => {});
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
      <Button
        type='submit'
        className='w-fit min-w-[100px] mx-auto'
        theme='secondary'>
        Login
      </Button>
    </AuthForm>
  );
};
