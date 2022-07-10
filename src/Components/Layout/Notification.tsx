import { useEffect, useRef } from 'react';
import { Image } from '../Image';
import { PXS } from '../Typography';

interface Props {
  duration: number;
  message: string;
  type: 'error' | 'warning' | 'success';
}

export const Notification = ({ duration, message, type }: Props) => {
  const notificationRef = useRef<HTMLDivElement>(null!);

  const theme = {
    success: 'green-500',
    warning: 'yellow-300',
    error: 'red-500',
  };

  useEffect(() => {
    setTimeout(() => {
      notificationRef.current?.classList.add('translate-x-[calc(100%+18px)]');
      setTimeout(() => {
        notificationRef.current?.classList.add('hidden');
      }, 500);
    }, 1000 * duration);
  }, [duration]);

  return (
    <div
      ref={notificationRef}
      className={`w-full !transition-all duration-500 rounded-md p-2 shadow-md bg-light-blue fade-in`}>
      <div
        className={`p-2 w-full border border-${theme[type]} rounded-md flex flex-row items-center gap-4`}>
        <div className='min-w-[48px]'>
          <Image
            width={48}
            height={48}
            src={`/static/images/${type}-noti.svg`}
          />
        </div>
        <div>
          <PXS className='text-themeGray truncate'>{message}</PXS>
        </div>
      </div>
    </div>
  );
};
