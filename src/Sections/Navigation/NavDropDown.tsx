import { useState } from 'react';
import { DropDown } from 'src/Components/Layout';
import { PS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';
import { DropDownMenu } from '..';

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
          className='hidden cursor-pointer relative flex-row gap-2 items-center lg:flex'>
          <img
            className='max-w-[16px] max-h-[16px]'
            src='/static/images/defaultProfilePicture.svg'
            alt=' '
          />
          <PS className='text-themeGray'>{user.userName}</PS>
          <DropDown state={dropDownState}>
            <DropDownMenu className='flex flex-col justify-center items-start gap-6' />
          </DropDown>
        </div>
      )}
    </>
  );
};
