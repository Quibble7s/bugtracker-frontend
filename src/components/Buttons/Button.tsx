import { ReactNode } from 'react';
import { ButtonTheme, Themes } from '.';
import { PS } from '../Typography';

interface Props {
  theme: ButtonTheme;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export const Button = ({ theme, onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`p-[12px] rounded-md transition-colors duration-200 ${Themes[theme]}`}>
      <PS>{children}</PS>
    </button>
  );
};
