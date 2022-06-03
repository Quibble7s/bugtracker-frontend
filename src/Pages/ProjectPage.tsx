import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'src/Components/Buttons';
import { IssueCard } from 'src/Components/Cards';
import { Container } from 'src/Components/Layout';
import { H3, H4 } from 'src/Components/Typography';
import { GetProject } from 'src/Lib';
import { Bug, Project, TaskState } from 'src/Models';
import { ProjectProvider } from 'src/Providers';

export const ProjectPage = () => {
  const [project, setProject] = useState<Project>(null!);
  const params = useParams();

  const isIssueActive = (bug: Bug): boolean => {
    for (let i = 0; i < bug.tasks.length; i++) {
      const task = bug.tasks[i];
      if (task.state !== TaskState.completed) {
        return true;
      }
    }
    return false;
  };

  const getActiveIssueCount = (): number => {
    let activeCount: number = 0;
    for (let i = 0; i < project.bugs.length; i++) {
      const bug: Bug = project.bugs[i];
      if (isIssueActive(bug)) {
        activeCount++;
      }
    }
    return activeCount;
  };

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
      <main className='w-full min-h-screen'>
        <Container className='pt-20 relative min-h-screen'>
          {project !== null ? (
            <div className='w-full'>
              <div className='w-full'>
                <header className='grid grid-cols-1 md:grid-cols-2'>
                  <div>
                    <H3 className='text-center md:text-left'>{project.name}</H3>
                    <H4 className='text-center md:text-left text-themeGray'>
                      Active issues:{' '}
                      {`${getActiveIssueCount()}/${project.bugs.length}`}
                    </H4>
                  </div>
                  <div className='flex flex-row justify-end'>
                    <Button className='h-min' theme='success'>
                      +Create issue
                    </Button>
                  </div>
                </header>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-8'>
                  {project.bugs.map((bug) => (
                    <IssueCard bug={bug} />
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
