import { ReactNode } from 'react';
import { ButtonTheme, Themes } from '.';
import { PS } from '../Typography';

interface Props {
  theme: ButtonTheme;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  theme,
  onClick,
  children,
  type = 'button',
  className = '',
  disabled = false,
}: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`p-4 rounded-md transition-colors duration-200 ${Themes[theme]} ${className}`}>
      <PS className='!font-normal'>{children}</PS>
    </button>
  );
};
