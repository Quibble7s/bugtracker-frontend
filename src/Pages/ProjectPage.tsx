import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IssueCardLoadingAnimation } from 'src/Components/Animations';
import { Button } from 'src/Components/Buttons';
import { IssueCard } from 'src/Components/Cards';
import { Container } from 'src/Components/Layout';
import { H3, PXS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';
import { GetProject, userIsProjectAdmin } from 'src/Lib';
import { Project } from 'src/Models';
import { ProjectProvider } from 'src/Providers';
import { CreateIssueModal, ProjectConfigModal } from 'src/Sections';

export const ProjectPage = () => {
  const [createIssueOpen, setCreateIssueOpen] = useState<boolean>(false);
  const [projectConfigOpen, setProjectConfigOpen] = useState<boolean>(false);
  const [project, setProject] = useState<Project>(null!);
  const params = useParams();
  const { user, signOut } = useAuth();
  const { alert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      setProject(
        await GetProject(params.id!, ({ status }) => {
          if (status === 401) {
            alert('Session expired, please login.', 'error', 5);
            signOut();
            navigate('/auth/login', { replace: true });
          }
        }),
      );
    };
    getProject();
  }, [params, alert, signOut, navigate]);

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
      <ProjectConfigModal
        isOpen={projectConfigOpen}
        onClose={() => setProjectConfigOpen(false)}
      />
      <main className='w-full min-h-screen'>
        <Container className='pt-20 relative min-h-screen'>
          {project !== null ? (
            <div className='w-full'>
              <div className='w-full'>
                <header className='grid grid-cols-1 md:grid-cols-2'>
                  <div>
                    <H3 className='text-center text-themeGray md:text-left'>
                      {project.name}
                    </H3>
                    <PXS className='text-themeGray mt-4 min-h-[20px] max-h-[150px] overflow-y-auto'>
                      {project.description}
                    </PXS>
                  </div>
                  <div className='flex flex-col gap-8 justify-end md:flex-row'>
                    <Button
                      onClick={() => setProjectConfigOpen(true)}
                      theme='light'
                      className='w-full h-min mt-8 md:mt-0 md:w-max'>
                      Settings
                    </Button>
                    {userIsProjectAdmin(user, project) && (
                      <Button
                        onClick={() => setCreateIssueOpen(true)}
                        className='w-full h-min md:w-max'
                        theme='success'>
                        + Add issue
                      </Button>
                    )}
                  </div>
                </header>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-8'>
                  {project.bugs.map((bug) => (
                    <IssueCard key={bug.id} bug={bug} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className='mx-auto lg:mx-0 w-[min(100%,768px)] min-h-[32px] md:min-h-[42px] lg:min-h-[50px] rounded-md field-loading'></div>
              <div className='w-full md:w-[min(100%,250px)] min-h-[16px] rounded-md mt-4 field-loading'></div>
              <div className='w-[min(80%,230px)] min-h-[16px] rounded-md mt-2 field-loading'></div>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-8'>
                {[0, 1, 2].map((i) => (
                  <IssueCardLoadingAnimation key={`issue-loading-${i}`} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
    </ProjectProvider.Provider>
  );
};
