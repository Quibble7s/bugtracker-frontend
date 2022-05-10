import { Link, useLocation } from 'react-router-dom';
import { Container } from '../Layout';
import { Image } from '../Image';
import { NavigationLinks } from '.';
import { LoginOrRegisterButtons, MobileMenu } from 'src/Sections';

export const Navbar = () => {
  const navHiddenLocations: string[] = ['/auth', '/dashboard'];
  const location = useLocation();

  const isLocationHidden = () => {
    for (let i = 0; i < navHiddenLocations.length; i++) {
      const hiddenLocation = navHiddenLocations[i];
      if (location.pathname.includes(hiddenLocation)) return true;
    }
    return false;
  };

  const isHidden = isLocationHidden();

  return (
    <nav className='shadow-sm w-full absolute left-0 top-0 z-10'>
      <Container className='flex flex-row justify-between items-center'>
        <Link to='/'>
          <Image
            src='/static/images/logo.svg'
            width={200}
            height={40}
            className='py-[15px]'
          />
        </Link>
        {!isHidden && <NavigationLinks className='hidden lg:flex' />}
        {!isHidden && (
          <LoginOrRegisterButtons className='hidden lg:flex flex-row gap-3 items-center' />
        )}
        <MobileMenu />
      </Container>
    </nav>
  );
};
