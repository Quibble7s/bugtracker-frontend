import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { H4 } from 'src/Components/Typography';
import { CompanyImages } from 'src/Constants';

export const CompaniesSection = () => {
  return (
    <section>
      <Container id='companies' className='my-16'>
        <H4>Used by companies like...</H4>
        <div className='w-full mt-4 flex flex-row gap-4 justify-between items-center lg:gap-0'>
          {CompanyImages.map((image) => (
            <div className='relative'>
              <span
                className='block absolute left-0 right-0 bottom-0 top-0 bg-themeBlack 
              z-10 mix-blend-color transition-all duration-200 hover:opacity-0'
              />
              <Image
                className='w-[calc((100%/5)-16px)] lg:w-max'
                onLoad={(e) => {
                  e.currentTarget.classList.add('fade-in');
                }}
                src={image.url}
                width={125}
                height={28}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
