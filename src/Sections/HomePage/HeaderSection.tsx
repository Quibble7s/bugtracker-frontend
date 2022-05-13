import { Button } from 'src/Components/Buttons';
import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { H1, PL } from 'src/Components/Typography';

export const HeaderSection = () => {
  return (
    <section>
      <header className='w-full relative'>
        <Container className='grid grid-cols-1 min-h-screen items-center lg:grid-cols-2'>
          <div className='mt-32 lg:mt-0'>
            <article>
              <H1 className='text-center lg:text-left text-themeBlack'>
                Increase your productivity
              </H1>
              <PL className='text-center lg:text-left text-themeGray mt-8'>
                When problems arise, don't panic. Organize yourself and your
                team to achieve common goals.
              </PL>
              <div className='mt-8 flex flex-row justify-center lg:justify-start'>
                <Button
                  onClick={() => {
                    const target = document.getElementById('pricing');
                    if (target !== null) {
                      window.scrollTo({
                        top: target.offsetTop - 64,
                      });
                    }
                  }}
                  theme='secondary'>
                  Get started
                </Button>
              </div>
            </article>
          </div>
          <div>
            <Image
              onLoad={(e) => {
                e.currentTarget.classList.add('fade-in');
              }}
              className='mx-auto mt-4 lg:mt-0 lg:mx-0 lg:ml-auto'
              width={512}
              height={512}
              src='/static/images/hero.svg'
            />
          </div>
        </Container>
      </header>
    </section>
  );
};
