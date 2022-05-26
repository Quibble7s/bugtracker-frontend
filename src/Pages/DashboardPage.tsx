import { ChangeEvent, useEffect, useState } from 'react';
import { ProjectCardLoadingAnimation } from 'src/Components/Animations';
import { Button } from 'src/Components/Buttons';
import { ProjectCard } from 'src/Components/Cards';
import { Form, Input } from 'src/Components/Form';
import { Container } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { GetProjects } from 'src/Lib';
import { Project } from 'src/Models';
import { CreateProjectModal, JoinProjectModal } from 'src/Sections';

export const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isJoinOpen, setIsJoinOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      setIsLoading(true);
      setProjects(await GetProjects());
      setIsLoading(false);
    };
    getProjects();
  }, []);

  const getProjectCards = () => {
    return projects.length > 0 ? (
      <div className='w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects
          .filter((project) => {
            if (search === '' || search === undefined) return true;
            return (
              project.name.includes(search) ||
              project.description.includes(search)
            );
          })
          .map((project) => (
            <ProjectCard
              setProjects={setProjects}
              key={project.id}
              projects={projects}
              project={project}
            />
          ))}
      </div>
    ) : (
      <div className='absolute pointer-events-none top-0 right-0 bottom-0 left-0 flex flex-row items-center justify-center'>
        <H3>Nothing to show here...</H3>
      </div>
    );
  };

  return (
    <main className='w-full min-h-screen'>
      <Container className='pt-20 relative min-h-screen'>
        <JoinProjectModal
          isOpen={isJoinOpen}
          projects={projects}
          setIsJoinOpen={setIsJoinOpen}
          setProjects={setProjects}
        />
        <CreateProjectModal
          isOpen={isCreateOpen}
          projects={projects}
          setProjects={setProjects}
          onClose={() => setIsCreateOpen(false)}
        />
        <div className='w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between'>
          <div className='mb-8 md:mb-0'>
            <Form
              className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSearch(e.currentTarget.value);
              }}
              onSubmit={(data) => {
                setSearch(data.search);
              }}>
              <Input
                placeholder='search...'
                id='search'
                name='search'
                type='text'
              />
            </Form>
          </div>
          <div className='flex flex-col gap-8 md:justify-end md:flex-row'>
            <Button onClick={() => setIsJoinOpen(true)} theme='secondary'>
              Join project
            </Button>
            <Button onClick={() => setIsCreateOpen(true)} theme='success'>
              + Create project
            </Button>
          </div>
        </div>
        {!isLoading ? (
          getProjectCards()
        ) : (
          <div className='w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {[0, 1, 2].map((index) => (
              <ProjectCardLoadingAnimation key={`loading-${index}`} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};
