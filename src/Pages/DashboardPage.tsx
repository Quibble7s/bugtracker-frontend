import { useEffect, useState } from 'react';
import { Button } from 'src/Components/Buttons';
import { ProjectCard } from 'src/Components/Cards';
import { Form, Input } from 'src/Components/Form';
import { Container } from 'src/Components/Layout';
import { H1 } from 'src/Components/Typography';
import { GetProjects } from 'src/Lib';
import { Project } from 'src/Models';

export const DashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const getProjects = async () => {
      setProjects(await GetProjects());
    };
    getProjects();
  }, []);
  return (
    <main className='w-full min-h-screen'>
      <Container className='pt-20 min-h-screen'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 items-center justify-between'>
          <div className='mb-4 md:mb-0'>
            <Form
              className='grid grid-cols-2 gap-8 items-center'
              onSubmit={(data) => {
                console.log(data.search);
              }}>
              <Input
                placeholder='search...'
                id='search'
                name='search'
                type='text'
              />
              <Button className='md:w-fit' type='submit' theme='primary'>
                Search
              </Button>
            </Form>
          </div>
          <div className='flex flex-col gap-8 md:justify-end md:flex-row'>
            <Button theme='secondary'>Join project</Button>
            <Button theme='success'>+ Create project</Button>
          </div>
        </div>
        {projects.length > 0 ? (
          <div className='w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className='w-full h-full'>
            <H1>OooOops, nothing to show here.</H1>
          </div>
        )}
      </Container>
    </main>
  );
};
