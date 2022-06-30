export const Background = () => {
  return (
    <div className='w-full h-screen fixed z-[-1] opacity-[0.1] left-0 top-0'>
      <div className='relative w-full h-screen'>
        <div className='w-[20%] h-[20%] left-[10%] top-[10%] absolute bg-primary rounded-[100%] blur-3xl' />
        <div className='w-[20%] h-[20%] left-[70%] top-[60%] absolute bg-secondary rounded-[100%] blur-3xl' />
        <div className='w-[25%] h-[25%] left-[10%] top-[70%] absolute bg-primary rounded-[100%] blur-3xl' />
      </div>
    </div>
  );
};
