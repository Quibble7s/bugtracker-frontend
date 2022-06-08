import { ChangeEvent, ReactNode } from 'react';
import { FormProvider } from 'src/Providers';

interface Props {
  className?: string;
  children: ReactNode;
  onSubmit: ({ ...data }: any) => void;
  onInvalid?: ({ id, value }: { id: string; value: string | boolean }) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTextAreaChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Form = ({
  onSubmit,
  onInvalid,
  onChange,
  onSelectChange,
  onTextAreaChange,
  children,
  className = '',
}: Props) => {
  return (
    <FormProvider
      className={className}
      onSubmit={onSubmit}
      onInvalid={onInvalid}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onTextAreaChange={onTextAreaChange}>
      {children}
    </FormProvider>
  );
};
