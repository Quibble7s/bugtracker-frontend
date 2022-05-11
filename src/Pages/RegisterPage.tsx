import { AuthSection, RegisterForm } from 'src/Sections';

export const RegisterPage = () => {
  return (
    <AuthSection
      title='Register'
      subtitle='Stop wasting time and start organizing yourself and your team.'>
      <RegisterForm />
    </AuthSection>
  );
};
