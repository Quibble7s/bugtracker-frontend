import { ReactNode } from 'react';

export const H3 = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={`text-[32px] md:text-[42px] lg:text-[50px] font-bold tracking-[-1.56px] font-open ${className}`}>
      {children}
    </h3>
  );
};
