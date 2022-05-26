import { ReactNode, useRef } from 'react';

export const DropDown = ({
  state,
  children,
  className = '',
}: {
  state: 'active' | 'disabled';
  children: ReactNode;
  className?: string;
}) => {
  const dropDownRef = useRef<HTMLDivElement>(null!);

  const dropDownThemes = {
    active: 'top-[150%] opacity-100',
    disabled: 'top-[130%] opacity-0 pointer-events-none',
  };

  return (
    <div
      ref={dropDownRef}
      className={`absolute rounded-md min-w-[120px] max-w-[400px] bg-light-blue shadow-md right-0 
      p-4 flex flex-col items-center gap-2 origin-top-right transition-all duration-200
      ${dropDownThemes[state]} ${className}`}>
      {children}
    </div>
  );
};
