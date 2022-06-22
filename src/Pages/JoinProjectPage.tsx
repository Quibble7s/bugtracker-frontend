import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActionLoadingAnimation } from 'src/Components/Animations';
import { Image } from 'src/Components/Image';
import { Container } from 'src/Components/Layout';
import { PXS, H3 } from 'src/Components/Typography';
import { useAlert } from 'src/Hooks';
import { JoinProject } from 'src/Lib';

export const JoinProjectPage = () => {
  const { alert } = useAlert();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Error, setIsError] = useState<{ isError: boolean; message: string }>({
    isError: false,
    message: '',
  });

  useEffect(() => {
    const join = async () => {
      setIsLoading(true);
      await JoinProject(params.id!, ({ message, status }) => {
        if (status === 204) {
          navigate(`/project/${params.id}`, { replace: false });
          alert(message, 'success', 2.5);
          return;
        }
        setIsError({ isError: true, message: message });
      });
      setIsLoading(false);
    };
    join();
  }, [params]);

  return (
    <Container className='min-h-screen flex flex-col items-center justify-center gap-8'>
      <H3
        className={`${
          Error.isError ? 'text-red-500' : 'text-themeGray'
        } mb-16`}>
        {Error.isError ? 'Joining error' : 'Joining project'}
      </H3>
      <Image width={512} height={394} src='/static/images/join.svg' alt=' ' />
      {isLoading && (
        <div className='bg-secondary p-4 rounded-md pop-in'>
          <ActionLoadingAnimation />
        </div>
      )}
      {Error.isError && (
        <div>
          <PXS className='text-light-blue bg-red-500 p-4 rounded-md pop-in'>
            {Error.message}
          </PXS>
          <Link to='/dashboard'>
            <PXS className='text-secondary/70 hover:text-secondary mt-8 text-center underline'>
              Go to dashboard...
            </PXS>
          </Link>
        </div>
      )}
    </Container>
  );
};
