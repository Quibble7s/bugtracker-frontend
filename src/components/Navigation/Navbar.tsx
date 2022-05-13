import { Link, useLocation } from 'react-router-dom';
import { Container } from '../Layout';
import { Image } from '../Image';
import { NavigationLinks } from '.';
import { LoginOrRegisterButtons, MobileMenu, NavDropDown } from 'src/Sections';
import { MutableRefObject, useRef } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const navRef: MutableRefObject<HTMLElement> = useRef(null!);
  const state = location.pathname.includes('/auth') ? 'disabled' : 'active';
  const themes = {
    active: 'fixed bg-light-blue',
    disabled: 'absolute',
  };

  return (
    <nav ref={navRef} className={`w-full left-0 top-0 z-10 ${themes[state]}`}>
      <Container className='flex flex-row justify-between items-center'>
        <Link to='/'>
          <Image
            src='/static/images/logo.svg'
            width={200}
            height={40}
            className='py-[15px]'
          />
        </Link>
        <NavigationLinks className='hidden lg:flex' />
        <LoginOrRegisterButtons className='hidden lg:flex flex-row gap-3 items-center' />
        <MobileMenu />
        <NavDropDown />
      </Container>
    </nav>
  );
};
