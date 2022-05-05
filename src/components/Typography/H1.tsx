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
      className={`text-[80px] font-bold tracking-[-2.5px] leading-[76px] font-open ${className}`}>
      {children}
    </h1>
  );
};
