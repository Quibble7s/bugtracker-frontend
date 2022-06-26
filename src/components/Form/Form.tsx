import { ChangeEvent, ReactNode } from 'react';
import { FormProvider } from 'src/Providers';

interface Props {
  className?: string;
  children: ReactNode;
  onSubmit: ({ ...data }: any) => void;
  onInvalid?: ({ id, value }: { id: string; value: string | boolean }) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onDataChange?: (data: any) => void;
  onSelectChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onTextAreaChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Form = ({
  onSubmit,
  onInvalid,
  onChange,
  onDataChange,
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
      onDataChange={onDataChange}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onTextAreaChange={onTextAreaChange}>
      {children}
    </FormProvider>
  );
};
