import { ReactNode } from 'react';

export const PXS = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`font-normal font-mulish text-[16px] leading-[18px] tracking-[-0.5px] ${className}`}>
      {children}
    </p>
  );
};
