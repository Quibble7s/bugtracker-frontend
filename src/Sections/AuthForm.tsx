import { ReactNode } from 'react';
import { Form } from 'src/Components/Form';

export const AuthForm = ({
  onSubmitHandler,
  children,
}: {
  onSubmitHandler: (data: any) => void;
  children: ReactNode;
}) => {
  return (
    <Form
      className='w-[100%] shadow-md rounded-md mx-auto p-4 flex flex-col gap-8 mt-16 pop-in md:w-[80%] lg:mt-0 lg:w-[60%]'
      onSubmit={onSubmitHandler}>
      {children}
    </Form>
  );
};
