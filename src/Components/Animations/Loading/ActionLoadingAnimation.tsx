import './Styles/ActionLoadingAnimation.css';

export const ActionLoadingAnimation = () => {
  return (
    <span className='flex flex-row justify-center gap-2'>
      <span className='block action-anim' />
      <span className='block action-anim' />
      <span className='block action-anim' />
    </span>
  );
};
