import { ReactNode } from 'react';

export const H1 = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`text-[64px] tracking-[-1.5px] leading-[68px] font-bold font-open  
      md:text-[72px] md:tracking-[-2px] md:leading-[76px] 
      lg:text-[80px] lg:tracking-[-2.5px] lg:leading-[84px] ${className}`}>
      {children}
    </h1>
  );
};
