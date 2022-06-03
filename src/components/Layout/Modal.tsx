import './Styles/modal.css';
import { createPortal } from 'react-dom';
import { Container } from '.';
import { ReactNode, useEffect } from 'react';
import { Button } from '../Buttons';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: VoidFunction;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  return createPortal(
    isOpen ? (
      <div
        className='fixed left-0 top-0 bottom-0 right-0 bg-opacity-70 bg-themeBlack z-[500] modal-container
        flex flex-col items-center justify-center'>
        <Container className='max-h-screen overflow-y-auto overflow-x-hidden bg-light-blue p-8 rounded-md pop-in'>
          <div className='flex flex-row justify-end mb-16'>
            <Button onClick={onClose} className='w-[52px]' theme='error'>
              X
            </Button>
          </div>
          {children}
        </Container>
      </div>
    ) : (
      <></>
    ),
    document.getElementById('modal')!,
  );
};
