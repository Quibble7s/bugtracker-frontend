export const IssueCardLoadingAnimation = () => {
  return (
    <div className='w-full min-h-[250px] max-h-[250px] bg-themeLightGray rounded-md overflow-y-auto p-4 cursor-pointer issue-container overflow-x-hidden'>
      <div className='bg-light-blue w-full h-full rounded-md border-b border-themeGray/25 grid grid-rows-6 p-4 relative overflow-y-auto'>
        <div className='row-span-4'></div>
        <div className='row-span-2 flex flex-col justify-between'>
          <div className='w-[12.5%] h-[6px] rounded-md field-loading'></div>
          <div className='w-3/4 h-[16px] rounded-md field-loading' />
          <div className='w-2/4 h-[16px] rounded-md field-loading' />
        </div>
      </div>
    </div>
  );
};
