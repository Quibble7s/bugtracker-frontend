import { useAlert } from 'src/Hooks';
import { PS } from '../Typography';

export const Alert = () => {
  const { alertRef, alertTextRef } = useAlert();
  return (
    <div className='fixed w-full h-screen'>
      <div className='w-full h-screen relative'>
        <div
          ref={alertRef}
          className={`absolute inline min-w-[300px] max-w-[800px] p-4 z-[100] shadow-lg 
          top-[100px] -right-full scale-0 transition-all duration-500 ease-in-out opacity-0`}>
          <PS
            reference={alertTextRef}
            className='text-light-blue text-center truncate'></PS>
        </div>
      </div>
    </div>
  );
};
