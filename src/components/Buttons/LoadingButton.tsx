import { ReactNode } from 'react';
import { ActionLoadingAnimation } from '../Animations';
import { Button } from './Button';
import { ButtonTheme } from './ButtonTheme';

interface Props {
  theme: ButtonTheme;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const LoadingButton = ({
  theme = 'primary',
  onClick,
  children,
  type = 'button',
  className = '',
  disabled = false,
  isLoading = false,
}: Props) => {
  return (
    <Button
      theme={theme}
      onClick={onClick}
      type={type}
      className={`disabled:cursor-not-allowed !transition-all !duration-300 ${className}`}
      disabled={disabled || isLoading}>
      {isLoading ? <ActionLoadingAnimation /> : children}
    </Button>
  );
};
