import { ReactNode } from 'react';
import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { H1, H2, PXS } from 'src/Components/Typography';

export const AuthSection = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) => {
  return (
    <main className='relative overflow-x-hidden h-fit overflow-y-hidden'>
      <Container className='my-[40px] min-h-screen flex flex-col justify-center items-center lg:my-0'>
        <div className='w-full mt-8 grid grid-cols-1 lg:mt-0 lg:grid-cols-2'>
          <div>
            <H1 className='text-themeGray text-center mt-16 md:mt-0 fade-in'>
              {title}
            </H1>
            <PXS className='text-themeGray text-center mt-8'>{subtitle}</PXS>
            <Image
              className='mx-auto mt-8 fade-in'
              width={350}
              height={423.05}
              src='/static/images/authbg.svg'
            />
          </div>
          <div className='w-full flex flex-col justify-center'>{children}</div>
        </div>
      </Container>
    </main>
  );
};
