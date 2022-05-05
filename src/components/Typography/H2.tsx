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
      className={`text-[60px] font-bold tracking-[-1.88px] leading-[56px] font-open ${className}`}>
      {children}
    </h2>
  );
};
