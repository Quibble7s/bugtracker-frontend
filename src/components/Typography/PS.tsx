import { MutableRefObject, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  reference?: MutableRefObject<HTMLParagraphElement>;
}

export const PS = ({ children, className, reference }: Props) => {
  return (
    <p
      ref={reference}
      className={`font-bold font-open text-[16px] leading-[18px] tracking-[-0.5px] ${className}`}>
      {children}
    </p>
  );
};
