import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'src/Components/Buttons';
import { IssueCard } from 'src/Components/Cards';
import { Container } from 'src/Components/Layout';
import { H3, PXS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';
import { GetProject, userIsProjectAdmin } from 'src/Lib';
import { Bug, Project, TaskState } from 'src/Models';
import { ProjectProvider } from 'src/Providers';
import { CreateIssueModal } from 'src/Sections';

export const ProjectPage = () => {
  const [createIssueOpen, setCreateIssueOpen] = useState<boolean>(false);
  const [project, setProject] = useState<Project>(null!);
  const params = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const getProject = async () => {
      setProject(await GetProject(params.id!));
    };
    getProject();
  }, [params.id]);

  const providerValues = {
    project,
    setProject,
  };

  return (
    <ProjectProvider.Provider value={providerValues}>
      <CreateIssueModal
        isOpen={createIssueOpen}
        onClose={() => setCreateIssueOpen(false)}
      />
      <main className='w-full min-h-screen'>
        <Container className='pt-20 relative min-h-screen'>
          {project !== null ? (
            <div className='w-full'>
              <div className='w-full'>
                <header className='grid grid-cols-1 md:grid-cols-2'>
                  <div>
                    <H3 className='text-center md:text-left'>{project.name}</H3>
                    <PXS className='text-themeGray mt-4 max-h-[150px] overflow-y-auto'>
                      {project.description}
                    </PXS>
                  </div>
                  <div className='flex flex-row justify-end'>
                    {userIsProjectAdmin(user, project) && (
                      <Button
                        onClick={() => setCreateIssueOpen(true)}
                        className='w-full h-min mt-8 md:mt-0 md:w-max'
                        theme='success'>
                        + Add issue
                      </Button>
                    )}
                  </div>
                </header>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-8'>
                  {project.bugs.map((bug) => (
                    <IssueCard key={bug.id} bug={bug} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </Container>
      </main>
    </ProjectProvider.Provider>
  );
};
