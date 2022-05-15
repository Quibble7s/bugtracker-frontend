import {
  ChangeEvent,
  createContext,
  FormEvent,
  InvalidEvent,
  ReactNode,
  useState,
} from 'react';

interface Props {
  className?: string;
  children: ReactNode;
  onSubmit: ({ ...data }: any) => void;
  onInvalid?: ({ id, value }: { id: string; value: string | boolean }) => void;
}

interface FromContextType {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onInvalidHandler: (e: InvalidEvent<HTMLInputElement>) => void;
}

export const FormContext = createContext<FromContextType>(null!);
FormContext.displayName = 'Form';

export const FormProvider = ({
  className,
  children,
  onSubmit,
  onInvalid,
}: Props) => {
  const [data, setData] = useState({});

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const id = e.target.id;
    const value =
      type === 'checkbox' || type === 'radio'
        ? e.target.checked
        : e.target.value;
    setData({ ...data, [id]: value });
  };

  const onInvalidHandler = (e: InvalidEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const id = e.target.id;
    const value =
      type === 'checkbox' || type === 'radio'
        ? e.target.checked
        : e.target.value;
    if (onInvalid) {
      onInvalid({ id, value });
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
  };

  const values = { onChangeHandler, onInvalidHandler };

  return (
    <form className={className} onSubmit={onSubmitHandler}>
      <FormContext.Provider value={values}>{children}</FormContext.Provider>
    </form>
  );
};
