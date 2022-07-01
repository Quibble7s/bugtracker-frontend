import { ReactNode } from 'react';

export const PM = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={`font-normal font-mulish text-[18px] leading-[20px] tracking-[-0.55px] ${className}`}>
      {children}
    </p>
  );
};
