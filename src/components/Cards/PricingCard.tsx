import { useNavigate } from 'react-router-dom';
import { PricingCardThemes, yearlyDiscountPercentage } from 'src/Constants';
import { useAuth } from 'src/Hooks';
import { Button } from '../Buttons';
import { H3, PS, PXS } from '../Typography';

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
  const navigate = useNavigate();
  return (
    <div
      className={`p-8 text-center rounded-md shadow-md ${PricingCardThemes.background[theme]}`}>
      <PXS className={`${PricingCardThemes.title[theme]}`}>{title}</PXS>
      <H3 className={`${PricingCardThemes.text[theme]} relative`}>
        {price[selectedPricing]}
        {selectedPricing === 'yearly' && price[selectedPricing] !== 'Free' && (
          <PS className='absolute top-0 right-0 -translate-y-1/2 bg-green-400 text-light-blue p-2 rounded-md'>
            {yearlyDiscountPercentage}% OFF
          </PS>
        )}
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
        onClick={() => {
          navigate('/auth/register', { replace: false });
        }}
        disabled={user !== null}
        className='w-full mt-16 disabled:cursor-not-allowed'
        theme={PricingCardThemes.button[theme]}>
        Get started
      </Button>
    </div>
  );
};
