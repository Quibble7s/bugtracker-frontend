import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationLinks } from 'src/Components/Navigation';
import { LoginOrRegisterButtons, DropDownMenu } from '../';

type ActiveState = 'active' | 'disabled';

export const MobileMenu = () => {
  const location = useLocation();
  const [active, setActive] = useState<ActiveState>('disabled');
  const show = !location.pathname.includes('/auth');

  const containerTheme = {
    active: 'top-[55%] opacity-100',
    disabled: 'top-[50%] opacity-0',
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
    <>
      {show && (
        <div className='block lg:hidden'>
          <div
            role='button'
            onClick={() =>
              setActive(active === 'active' ? 'disabled' : 'active')
            }
            className='w-[24px] h-[24px] z-10 flex flex-col items-end gap-2 cursor-pointer'>
            <span
              className={`block w-full h-full bg-themeBlack origin-center transition-all duration-200 ${firstChildTheme[active]}`}></span>
            <span
              className={`block w-[75%] h-full transition-all duration-200 ${secondChildTheme[active]}`}></span>
            <span
              className={`block w-full h-full bg-themeBlack origin-center transition-all duration-200 ${thirdChildTheme[active]}`}></span>
          </div>
          <div
            className={`absolute w-full bg-light-blue p-4 ${containerTheme[active]} left-0 mt-8 transition-all ease-in-out`}>
            <NavigationLinks className='flex-col justify-start gap-8' />
            <LoginOrRegisterButtons className='flex flex-row justify-center items-center gap-3 mt-4 lg:hidden' />
            <DropDownMenu className='flex flex-col justify-center items-center gap-6 mt-6' />
          </div>
        </div>
      )}
    </>
  );
};
