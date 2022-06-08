import { ReactNode } from 'react';

export const Option = ({
  value,
  selected = false,
  className = '',
  children,
}: {
  value: string;
  selected?: boolean;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <option className={`${className}`} value={value}>
      {children}
    </option>
  );
};
