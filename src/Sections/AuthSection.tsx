import { ReactNode } from 'react';
import { Container } from 'src/Components/Layout';
import { H1, H2 } from 'src/Components/Typography';

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
      <div className='absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-[300px] md:w-[500px] lg:w-[800px] h-auto z-[-1] opacity-[0.4]'>
        <img src='/static/images/background.png' alt=' ' />
      </div>
      <div className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] lg:w-[800px] h-auto z-[-1] opacity-[0.4]'>
        <img src='/static/images/background.png' alt=' ' />
      </div>
      <Container className='min-h-screen flex flex-col justify-center items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div>
            <H1 className='text-center mt-20 md:mt-0 fade-in lg:text-left'>
              {title}
            </H1>
            <H2 className='text-themeGray mix-blend-multiply font-normal mt-8 text-center fade-in lg:text-left'>
              {subtitle}
            </H2>
          </div>
          <div className='w-full'>{children}</div>
        </div>
      </Container>
    </main>
  );
};
