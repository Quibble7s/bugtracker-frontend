import { ReactNode } from 'react';
import { useForm } from 'src/Hooks';

interface Props {
  name: string;
  id: string;
  children: ReactNode;
  requiered?: boolean;
  className?: string;
}

export const Select = ({
  name,
  id,
  className,
  children,
  requiered = false,
}: Props) => {
  const { onSelectChangeHandler } = useForm();
  return (
    <select
      required={requiered}
      onChange={onSelectChangeHandler}
      className={`bg-light-blue border text-themeGray/70 font-open border-secondary/30 hover:border-secondary/50
     focus:border-secondary outline-none rounded-md p-4 ${className}`}
      name={name}
      id={id}>
      {children}
    </select>
  );
};
