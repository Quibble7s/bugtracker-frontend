import { Link } from 'react-router-dom';
import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { PS, PXS } from 'src/Components/Typography';
import { NavLinks } from 'src/Constants';

export const Footer = () => {
  return (
    <footer className='mt-64'>
      <Container>
        <div className='border-b border-themeGray py-4 flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-4 items-center'>
            <div className='relative'>
              <span className='block absolute top-0 right-0 bottom-0 left-0 bg-themeBlack mix-blend-color' />
              <Image src='/static/images/logo.svg' width={140} height={30} />
            </div>
            <div className='flex flex-row gap-4'>
              {NavLinks.map((link, index) => (
                <PS className='text-themeGray'>
                  <Link to={link.to}>{link.label}</Link>
                </PS>
              ))}
            </div>
          </div>
        </div>
        <div className='py-4 flex flex-row items-center justify-between'>
          <PXS className='text-center'>
            &copy; bugtracker - {new Date().getFullYear()}
          </PXS>
          <PXS className='text-red-500 text-center'>THIS IS A DEMO WEBSITE</PXS>
        </div>
      </Container>
    </footer>
  );
};
