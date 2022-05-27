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
      onClick={(e) => {
        e.stopPropagation();
        setIsActive(isActive === 'disabled' ? 'active' : 'disabled');
      }}
      className='relative min-w-[32px] flex flex-col gap-[4px] items-center z-[100] cursor-pointer'>
      <div className='bg-themeGray w-[5px] h-[5px] rounded-[100%]' />
      <div className='bg-themeGray w-[5px] h-[5px] rounded-[100%]' />
      <div className='bg-themeGray w-[5px] h-[5px] rounded-[100%]' />
      <DropDown state={isActive} className={className}>
        {children}
      </DropDown>
    </div>
  );
};
