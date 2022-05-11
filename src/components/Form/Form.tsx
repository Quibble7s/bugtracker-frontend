import { ReactNode } from 'react';
import { FormProvider } from 'src/Providers';

interface Props {
  className?: string;
  children: ReactNode;
  onSubmit: ({ ...data }: any) => void;
  onInvalid?: ({ id, value }: { id: string; value: string | boolean }) => void;
}

export const Form = ({
  onSubmit,
  onInvalid,
  children,
  className = '',
}: Props) => {
  return (
    <FormProvider
      className={className}
      onSubmit={onSubmit}
      onInvalid={onInvalid}>
      {children}
    </FormProvider>
  );
};
