import './Styles/ProjectCardLoadingAnimation.css';

export const ProjectCardLoadingAnimation = () => {
  return (
    <div
      className='w-full p-4 bg-themeLightGray rounded-md border cursor-pointer
    flex flex-col justify-between min-h-[360px] max-h-[360px] overflow-y-auto'>
      <div>
        <div className='w-3/4 mx-auto rounded-md h-[24px] field-loading'></div>
        <div className='mt-8 rounded-md flex flex-col gap-2'>
          <div className='w-full h-[16px] rounded-md field-loading' />
          <div className='w-full h-[16px] rounded-md field-loading' />
          <div className='w-3/4 h-[16px] rounded-md field-loading' />
          <div className='w-full h-[16px] rounded-md field-loading' />
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='w-3/4 h-[16px] rounded-md field-loading' />
        <div className='w-2/4 ml-auto h-[16px] rounded-md field-loading' />
      </div>
    </div>
  );
};
