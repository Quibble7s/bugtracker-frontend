import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PS } from '../Typography';
import './Styles/NavigationLink.css';

interface Props {
  to: string;
  children: ReactNode;
}

export const NavigationLink = ({ to, children }: Props) => {
  return (
    <Link to={to}>
      <PS className='text-themeGray hover:text-themeBlack transition-colors duration-500 relative navlink'>
        {children}
      </PS>
    </Link>
  );
};
