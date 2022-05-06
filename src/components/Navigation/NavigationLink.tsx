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
      <PS className='text-gray-400 hover:text-black/70 transition-colors duration-500 relative navlink'>
        {children}
      </PS>
    </Link>
  );
};
