import { Button } from 'src/Components/Buttons';
import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { H1, PL } from 'src/Components/Typography';

export const HeaderSection = () => {
  return (
    <section>
      <header className='w-full relative'>
        <Container className='grid grid-cols-1 min-h-screen items-center lg:grid-cols-2 relative'>
          <div className='mt-32 relative lg:mt-0'>
            <article>
              <H1 className='text-center lg:text-left text-themeBlack'>
                Increase your productivity
              </H1>
              <PL className='text-center lg:text-left text-themeGray mt-8 mix-blend-multiply'>
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
              className='mx-auto mt-8 lg:mt-0 lg:mx-0 lg:ml-auto'
              width={512}
              height={426.03}
              src='/static/images/hero.svg'
              alt=' '
            />
          </div>
        </Container>
      </header>
    </section>
  );
};
