import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'src/Components/Layout';
import { H3, H4, PXS } from 'src/Components/Typography';
import { GetProject } from 'src/Lib';
import { Project } from 'src/Models';

export const ProjectPage = () => {
  const [project, setProject] = useState<Project>(null!);
  const params = useParams();
  useEffect(() => {
    const getProject = async () => {
      setProject(await GetProject(params.id!));
    };
    getProject();
  }, []);
  return (
    <main>
      <Container className='pt-20 relative min-h-screen'>
        {project !== null ? (
          <div className='w-full'>
            <div className='w-full flex flex-row items-center justify-between'>
              <H3 className='text-themeBlack text-center md:text-left'>
                {project.name}
              </H3>
              <H4>
                Active issues:{' '}
                {`${project.bugs.length} / ${project.bugs.length}`}
              </H4>
            </div>

            <span className='block w-full h-[1px] bg-themeLightGray' />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Container>
    </main>
  );
};
