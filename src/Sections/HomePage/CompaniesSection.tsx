import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { H4, PXS } from 'src/Components/Typography';
import { CompanyImages } from 'src/Constants';

export const CompaniesSection = () => {
  return (
    <section className='mt-64'>
      <Container id='companies'>
        <PXS className='text-themeGray text-center'>Trusted by</PXS>
        <div className='w-full flex flex-row gap-8 justify-between items-center lg:gap-0'>
          {CompanyImages.map((image) => (
            <div key={image.url} className='relative'>
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
