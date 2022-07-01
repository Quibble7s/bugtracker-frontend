import { ReactNode } from 'react';

export const H2 = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={`font-bold font-open text-[44px] tracking-[-1.22px] leading-[48px] 
      md:text-[52px] md:tracking-[-1.55px] md:leading-[56px] 
      lg:text-[60px] lg:tracking-[-1.88px] lg:leading-[64px] ${className}`}>
      {children}
    </h2>
  );
};
