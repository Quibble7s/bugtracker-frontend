import { PricingCardThemes } from 'src/Constants';
import { useAuth } from 'src/Hooks';
import { Button } from '../Buttons';
import { H3, PXS } from '../Typography';

interface Props {
  title: string;
  price: { monthly: string; yearly: string };
  features: string[];
  theme: 'light' | 'dark';
  selectedPricing: 'monthly' | 'yearly';
}

export const PricingCard = ({
  title,
  price,
  features,
  theme,
  selectedPricing,
}: Props) => {
  const { user } = useAuth();
  return (
    <div
      className={`p-8 text-center rounded-md ${PricingCardThemes.background[theme]}`}>
      <PXS className={`${PricingCardThemes.title[theme]}`}>{title}</PXS>
      <H3 className={`${PricingCardThemes.text[theme]}`}>
        {price[selectedPricing]}
      </H3>
      <div className='mt-8'>
        {features.map((feature) => (
          <PXS
            key={feature + '-key'}
            className={`${PricingCardThemes.text[theme]} mt-8`}>
            {feature}
          </PXS>
        ))}
      </div>
      <Button
        disabled={user !== null}
        className='w-full mt-16 disabled:hover:!bg-themeGray disabled:hover:!text-light-blue disabled:cursor-not-allowed'
        theme={PricingCardThemes.button[theme]}>
        Get started
      </Button>
    </div>
  );
};