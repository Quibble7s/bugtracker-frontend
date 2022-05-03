import { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={`max-w-full md:p-0 md:max-w-[800px] lg:max-w-[960px] mx-auto ${className}`}>
      {children}
    </div>
  );
};
