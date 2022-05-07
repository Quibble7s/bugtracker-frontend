import { useState } from 'react';
import { NavigationLinks } from 'src/Components/Navigation';
import { LoginOrRegisterSection } from '.';

type ActiveState = 'active' | 'disabled';

export const MobileMenu = () => {
  const [active, setActive] = useState<ActiveState>('disabled');

  const containerTheme = {
    active: 'top-[100%]',
    disabled: 'top-[-500%]',
  };

  const firstChildTheme = {
    active: 'translate-y-[10.5px] rotate-45',
    disabled: 'translate-y-0 rotate-0',
  };

  const secondChildTheme = {
    active: 'bg-transparent',
    disabled: 'bg-themeBlack',
  };

  const thirdChildTheme = {
    active: 'translate-y-[-10.5px] -rotate-45',
    disabled: 'translate-y-0 rotate-0',
  };

  return (
    <div className='block lg:hidden'>
      <div
        role='button'
        onClick={() => setActive(active === 'active' ? 'disabled' : 'active')}
        className='w-[24px] h-[24px] z-10 flex flex-col items-end gap-2 cursor-pointer'>
        <span
          className={`block w-full h-full bg-themeBlack origin-center transition-all duration-200 ${firstChildTheme[active]}`}></span>
        <span
          className={`block w-[75%] h-full transition-all duration-200 ${secondChildTheme[active]}`}></span>
        <span
          className={`block w-full h-full bg-themeBlack origin-center transition-all duration-200 ${thirdChildTheme[active]}`}></span>
      </div>
      <div
        className={`absolute w-full -z-10 ${containerTheme[active]} left-0 mt-8 transition-all ease-in-out`}>
        <NavigationLinks className='flex-col justify-start gap-8' />
        <LoginOrRegisterSection className='flex flex-row justify-center items-center gap-3 mt-4 lg:hidden' />
      </div>
    </div>
  );
};
