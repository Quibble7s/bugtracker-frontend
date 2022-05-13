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
      className={`font-normal font-open text-[16px] md:text-[18px] lg:text-[20px] tracking-[-0.65px] ${className}`}>
      {children}
    </p>
  );
};
