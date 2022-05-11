import { useState } from 'react';
import { DropDown } from 'src/Components/Layout';
import { useAuth } from 'src/Hooks';
import { DropDownMenu } from '.';

type DropDownState = 'active' | 'disabled';

export const NavDropDown = () => {
  const [dropDownState, setDropDownState] = useState<DropDownState>('disabled');
  const { user } = useAuth();

  const onClickHandler = () => {
    setDropDownState(dropDownState === 'active' ? 'disabled' : 'active');
  };

  return (
    <>
      {user !== null && (
        <div
          onClick={onClickHandler}
          role='button'
          className='hidden w-[38px] h-[38px] rounded-[50%] border border-primary cursor-pointer relative lg:block'>
          <img src='/static/images/defaultProfilePicture.svg' alt=' ' />
          <DropDown state={dropDownState}>
            <DropDownMenu className='flex flex-col justify-center items-center gap-6' />
          </DropDown>
        </div>
      )}
    </>
  );
};
