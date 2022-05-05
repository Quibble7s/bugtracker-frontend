import { ReactNode } from 'react';

export const PS = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`font-bold font-open text-[16px] leading-[18px] tracking-[-0.5px] ${className}`}>
      {children}
    </p>
  );
};
