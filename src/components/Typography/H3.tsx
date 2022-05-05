import { ReactNode } from 'react';

export const H3 = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={`text-[50px] font-bold tracking-[-1.56px] leading-[46px] font-open ${className}`}>
      {children}
    </h2>
  );
};
