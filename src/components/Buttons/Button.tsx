import { ReactNode } from 'react';
import { ButtonTheme, Themes } from '.';
import { PS } from '../Typography';

interface Props {
  theme: ButtonTheme;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
}

export const Button = ({
  theme,
  onClick,
  children,
  type = 'button',
  className = '',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-[10px] rounded-md transition-colors duration-200 ${Themes[theme]} ${className}`}>
      <PS>{children}</PS>
    </button>
  );
};
