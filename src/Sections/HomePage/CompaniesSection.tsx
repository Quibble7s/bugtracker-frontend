import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { H4 } from 'src/Components/Typography';
import { CompanyImages } from 'src/Constants';

export const CompaniesSection = () => {
  return (
    <section className='mt-64 lg:mt-0'>
      <Container id='companies'>
        <H4 className='text-themeGray/20 text-center'>trusted by...</H4>
        <div className='w-full flex flex-row gap-8 justify-between items-center lg:gap-0'>
          {CompanyImages.map((image) => (
            <div key={image.url} className='relative'>
              <span
                className='block absolute left-0 right-0 bottom-0 top-0 bg-themeBlack 
              z-[5] mix-blend-color transition-all duration-200 hover:opacity-0'
              />
              <Image
                className='lg:w-max'
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
