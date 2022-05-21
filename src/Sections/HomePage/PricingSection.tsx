import { useState } from 'react';
import { PricingCard } from 'src/Components/Cards';
import { Container } from 'src/Components/Layout';
import { H3 } from 'src/Components/Typography';
import { Pricing } from 'src/Constants';
import { PricingSelection } from './PricingSelection';

type PricingType = 'monthly' | 'yearly';

export const PricingSection = () => {
  const [activePricing, setActivePricing] = useState<PricingType>('monthly');
  const onMonthly = () => {
    setActivePricing('monthly');
  };
  const onYearly = () => {
    setActivePricing('yearly');
  };
  return (
    <section className='mt-64'>
      <Container id='pricing'>
        <div className='grid grid-cols-1 items-center lg:grid-cols-2'>
          <div>
            <H3 className='text-center lg:text-left'>
              Choose the right plan for your organization
            </H3>
          </div>
          <div className='mx-auto mt-8 lg:mx-0 lg:mt-0 lg:ml-auto'>
            <PricingSelection
              onMonthlyClickHandler={onMonthly}
              onYearlyClickHandler={onYearly}
              pricingType={activePricing}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-32'>
          {Pricing.map((price) => (
            <PricingCard
              key={price.title + '-key'}
              title={price.title}
              features={price.features}
              price={price.price}
              theme={price.theme}
              selectedPricing={activePricing}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
