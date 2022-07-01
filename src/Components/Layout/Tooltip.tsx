import { ReactNode } from 'react';
import { PXS } from '../Typography';
import './Styles/tooltip.css';

interface Props {
  children: ReactNode;
  text: string;
  className?: string;
}

export const Tooltip = ({ text, children, className }: Props) => {
  return (
    <div className={`tooltip-box relative ${className}`}>
      {children}
      <PXS className='tooltip z-10 bg-themeBlack rounded-md p-2 text-themeGray text-center invisible absolute max-w-[130px] truncate'>
        {text}
      </PXS>
    </div>
  );
};
