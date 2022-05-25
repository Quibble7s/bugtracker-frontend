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
      className={`text-[18px] md:text-[20px] lg:text-[24px] font-bold font-open ${className}`}>
      {children}
    </h4>
  );
};
