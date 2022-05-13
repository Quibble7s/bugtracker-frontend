import { PS } from 'src/Components/Typography';
import {
  monthlyTheme,
  textMonthlyTheme,
  textYearlyTheme,
  yearlyTheme,
} from 'src/Constants';

type PricingType = 'monthly' | 'yearly';

interface Props {
  onYearlyClickHandler: () => void;
  onMonthlyClickHandler: () => void;
  pricingType: PricingType;
}

export const PricingSelection = ({
  onYearlyClickHandler,
  onMonthlyClickHandler,
  pricingType = 'monthly',
}: Props) => {
  return (
    <div className='flex flex-row p-[6px] bg-themeLightGray w-fit rounded-md'>
      <div
        role='button'
        onClick={onYearlyClickHandler}
        className={`p-4 rounded-tl-md rounded-bl-md min-w-[100px] cursor-pointer  transition-all duration-200 ${yearlyTheme[pricingType]}`}>
        <PS
          className={`text-center  transition-all duration-200 ${textYearlyTheme[pricingType]}`}>
          Yearly
        </PS>
      </div>
      <div
        role='button'
        onClick={onMonthlyClickHandler}
        className={`p-4 rounded-tr-md rounded-br-md min-w-[100px] cursor-pointer  transition-all duration-200 ${monthlyTheme[pricingType]}`}>
        <PS
          className={`text-center  transition-all duration-200 ${textMonthlyTheme[pricingType]}`}>
          Monthly
        </PS>
      </div>
    </div>
  );
};
