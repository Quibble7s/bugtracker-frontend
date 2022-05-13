import { ReactNode } from 'react';
import { Image } from '../Image';
import { H3, PL } from '../Typography';

interface Props {
  theme: 'left' | 'right';
  title: string;
  children: ReactNode;
  imageSrc: string;
}

export const FeatureCard = ({
  theme = 'left',
  title,
  children,
  imageSrc,
}: Props) => {
  const containerThemes = {
    left: 'flex-row',
    right: 'flex-row-reverse',
  };
  const textThemes = {
    left: 'lg:text-left',
    right: 'lg:text-right',
  };
  const imageThemes = {
    left: 'lg:ml-auto',
    right: 'lg:mr-auto',
  };
  return (
    <div className={`flex flex-wrap ${containerThemes[theme]}`}>
      <div className='w-full my-auto lg:w-1/2'>
        <H3 className={`text-center ${textThemes[theme]}`}>{title}</H3>
        <PL className={`text-themeGray text-center ${textThemes[theme]}`}>
          {children}
        </PL>
      </div>
      <div className='w-full lg:w-1/2'>
        <Image
          className={`mx-auto mt-8 md:mt-16 lg:mt-0 lg:mx-0 ${imageThemes[theme]}`}
          src={imageSrc}
          width={512}
          height={512}
          onLoad={(e) => {
            e.currentTarget.classList.add('fade-in');
          }}
        />
      </div>
    </div>
  );
};
