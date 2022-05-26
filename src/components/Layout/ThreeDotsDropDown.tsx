import { ReactNode, useState } from 'react';
import { DropDown } from './DropDown';

export const ThreeDotsDropDown = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [isActive, setIsActive] = useState<'active' | 'disabled'>('disabled');
  return (
    <div
      onClick={() =>
        setIsActive(isActive === 'disabled' ? 'active' : 'disabled')
      }
      className='relative min-w-[10px] flex flex-col gap-[4px] items-end z-[100] cursor-pointer'>
      <div className='bg-themeGray w-[5px] h-[5px] rounded-[100%]' />
      <div className='bg-themeGray w-[5px] h-[5px] rounded-[100%]' />
      <div className='bg-themeGray w-[5px] h-[5px] rounded-[100%]' />
      <DropDown state={isActive} className={className}>
        {children}
      </DropDown>
    </div>
  );
};
