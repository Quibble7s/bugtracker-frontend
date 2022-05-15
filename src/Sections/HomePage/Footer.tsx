import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { NavigationLink } from 'src/Components/Navigation';
import { PXS } from 'src/Components/Typography';
import { NavLinks } from 'src/Constants';

export const Footer = () => {
  return (
    <footer className='mt-64'>
      <Container>
        <div className='border-b border-themeGray py-4 flex flex-row justify-between items-center'>
          <div className='flex flex-col-reverse w-full gap-4 justify-between items-center lg:flex-row'>
            <div className='relative'>
              <span className='block absolute top-0 right-0 bottom-0 left-0 bg-themeBlack mix-blend-color' />
              <Image src='/static/images/logo.svg' width={140} height={30} />
            </div>
            <div className='flex flex-col items-center gap-4 lg:flex-row'>
              {NavLinks.map((link) => (
                <NavigationLink key={`footer-${link.label}`} to={link.to}>
                  {link.label}
                </NavigationLink>
              ))}
            </div>
          </div>
        </div>
        <div className='py-4 flex flex-row items-center justify-center'>
          <PXS className='text-center'>
            &copy; bugtracker - {new Date().getFullYear()} |{' '}
            <span className='text-red-500'>this is a demo website</span>
          </PXS>
        </div>
      </Container>
    </footer>
  );
};
