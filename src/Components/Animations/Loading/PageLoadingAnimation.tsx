import { Image } from 'src/Components/Image';
import './Styles/PageLoadingAnimation.css';

export const PageLoadingAnimation = () => {
  return (
    <div className='absolute z-20 bg-light-blue w-full min-h-screen flex flex-col justify-between p-4 items-center'>
      <div />
      <div className='flex flex-row gap-8 items-center'>
        <div className='w-[24px] h-[24px] rounded-[50%] bg-primary loading-ball'></div>
        <div className='w-[24px] h-[24px] rounded-[50%] bg-secondary loading-ball'></div>
        <div className='w-[24px] h-[24px] rounded-[50%] bg-primary loading-ball'></div>
      </div>
      <Image
        src='/static/images/logo.svg'
        width={200}
        height={40}
        className='py-[15px]'
      />
    </div>
  );
};
