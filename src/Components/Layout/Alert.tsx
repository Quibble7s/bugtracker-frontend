import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

export const Alert = ({ children }: Props) => {
  return createPortal(
    <div className='w-full h-screen relative mt-[150px]'>{children}</div>,
    document.getElementById('notf')!,
  );
};
