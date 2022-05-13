import { ReactNode } from 'react';

export const H4 = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <h4
      className={`text-[24px] font-bold tracking-[-0.75px] leading-[20px] font-open ${className}`}>
      {children}
    </h4>
  );
};
