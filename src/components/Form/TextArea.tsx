import { useForm } from 'src/Hooks';

interface Props {
  name: string;
  id: string;
  className?: string;
  placeholder?: string;
  requiered?: boolean;
}

export const TextArea = ({
  name,
  id,
  className = '',
  placeholder = '',
  requiered = false,
}: Props) => {
  const { onTextAreaChangeHandler } = useForm();
  return (
    <textarea
      onChange={onTextAreaChangeHandler}
      className={`rounded-md border resize-none border-secondary/30 hover:border-secondary/50 focus:border-secondary 
      outline-none p-4 bg-light-blue ${className}`}
      name={name}
      id={id}
      placeholder={`${placeholder}${requiered ? '*' : ''}`}
      required={requiered}
    />
  );
};
