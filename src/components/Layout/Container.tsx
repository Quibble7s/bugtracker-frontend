import { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

const Container = ({ className, children }: Props) => {
  return (
    <div
      className={`max-w-full p-[0.5rem] md:p-0 md:max-w-[800px] lg:max-w-[960px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export { Container };
