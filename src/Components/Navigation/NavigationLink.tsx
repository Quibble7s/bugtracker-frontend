import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PS } from '../Typography';
import './Styles/NavigationLink.css';

interface Props {
  to: string;
  children: ReactNode;
}

export const NavigationLink = ({ to, children }: Props) => {
  const onClickHandler = () => {
    const element: HTMLElement | null = document.getElementById(
      to.replace('#', ''),
    );
    if (element !== null) {
      const offset = 72;
      window.scrollTo({ top: element.offsetTop - offset });
      return;
    }
    window.scrollTo({ top: 0 });
  };
  return (
    <li className='list-none'>
      <Link onClick={onClickHandler} to={to}>
        <PS className='text-themeGray hover:text-themeBlack transition-colors duration-500 relative navlink'>
          {children}
        </PS>
      </Link>
    </li>
  );
};
