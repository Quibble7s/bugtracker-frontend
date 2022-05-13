import { FeatureCard } from 'src/Components/Cards';
import { Container } from 'src/Components/Layout';

export const FeaturesSection = () => {
  return (
    <section className='mt-64'>
      <Container id='features' className='flex flex-col gap-32'>
        <FeatureCard
          title='Focus on teamwork'
          theme='left'
          imageSrc='/static/images/teamwork.svg'>
          The tools we provide facilitate teamwork. The administrators and
          moderators of the team are responsible for adding the problems and
          tasks that individuals will work on.
        </FeatureCard>
        <FeatureCard
          title='Divide problems in small tasks'
          theme='right'
          imageSrc='/static/images/task.svg'>
          Solve complex problems by break it down into smaller tasks that you
          can accomplish over time.
        </FeatureCard>
      </Container>
    </section>
  );
};