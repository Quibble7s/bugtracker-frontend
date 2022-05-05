import { ReactNode } from 'react';

export const PL = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`font-normal font-open text-[20px] leading-[22px] tracking-[-0.65px] ${className}`}>
      {children}
    </p>
  );
};
