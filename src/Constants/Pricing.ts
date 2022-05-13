interface Price {
  title: string;
  price: { monthly: string; yearly: string };
  features: string[];
  theme: 'light' | 'dark';
}

const yearlyDiscountPercentage = 10;
const premiumPrice = 29;
const enterprisePrice = 49;

const calculateYearly = (price: number, discount: number) => {
  const totalYearly = price * 12;
  const totalDiscount = (discount * totalYearly) / 100;
  return Math.round(totalYearly - totalDiscount);
};

export const Pricing: Price[] = [
  {
    title: 'Starter',
    price: { monthly: 'Free', yearly: 'Free' },
    features: ['5 Projects', '10 Members', 'Limited Support'],
    theme: 'light',
  },
  {
    title: 'Premium',
    price: {
      monthly: `$${premiumPrice}/month`,
      yearly: `$${calculateYearly(
        premiumPrice,
        yearlyDiscountPercentage,
      )}/year`,
    },
    features: ['200 Projects', 'Unlimited Members', 'Premium Support'],
    theme: 'dark',
  },
  {
    title: 'Enterprise',
    price: {
      monthly: `$${enterprisePrice}/month`,
      yearly: `$${calculateYearly(
        enterprisePrice,
        yearlyDiscountPercentage,
      )}/year`,
    },
    features: ['Unlimited Projects', 'Unlimited Members', 'Premium Support'],
    theme: 'light',
  },
];
