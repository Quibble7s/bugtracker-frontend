import { Link } from 'react-router-dom';
import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { NavigationLinks } from 'src/Components/Navigation';
import { LoginOrRegisterSection, MobileMenu } from '.';

export const HeaderSection = () => {
  return (
    <header className='min-h-screen w-full relative'>
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
          <NavigationLinks className='hidden lg:flex' />
          <MobileMenu />
          <LoginOrRegisterSection className='hidden lg:flex flex-row gap-3' />
        </Container>
      </nav>
    </header>
  );
};
