import { useForm } from 'src/Hooks';

interface Props {
  id: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'url';
  minLenght?: number;
  className?: string;
  requiered?: boolean;
  placeholder?: string;
}

export const Input = ({
  id,
  name,
  type = 'text',
  minLenght = 0,
  className = '',
  placeholder = '',
  requiered = false,
}: Props) => {
  const { onChangeHandler, onInvalidHandler } = useForm();
  return (
    <>
      <label className='hidden capitalize' htmlFor={id}>
        {placeholder}
      </label>
      <input
        onChange={onChangeHandler}
        onInvalid={onInvalidHandler}
        className={`outline-none border border-secondary/30 rounded-md p-[13px] font-mulish tex-[16px] 
        transition-all duration-200 hover:border-secondary/50 focus:border-secondary bg-light-blue
        ${className}`}
        placeholder={`${placeholder}${requiered ? '*' : ''}`}
        type={type}
        name={name}
        minLength={minLenght}
        id={id}
        required={requiered}
      />
    </>
  );
};
