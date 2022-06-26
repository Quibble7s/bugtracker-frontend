import { useForm } from 'src/Hooks';

interface Props {
  name: string;
  id: string;
  className?: string;
  placeholder?: string;
  requiered?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export const TextArea = ({
  name,
  id,
  className = '',
  placeholder = '',
  requiered = false,
  defaultValue = '',
  disabled = false,
  value,
}: Props) => {
  const { onTextAreaChangeHandler } = useForm();
  return (
    <textarea
      disabled={disabled}
      defaultValue={defaultValue}
      value={value ?? undefined!}
      onChange={onTextAreaChangeHandler}
      className={`rounded-md border resize-none border-secondary/30 hover:border-secondary/50 focus:border-secondary 
      outline-none p-4 bg-light-blue disabled:opacity-50 ${className}`}
      name={name}
      id={id}
      placeholder={`${placeholder}${requiered ? '*' : ''}`}
      required={requiered}
    />
  );
};
