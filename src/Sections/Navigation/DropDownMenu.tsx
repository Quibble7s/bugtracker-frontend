import { Image } from 'src/Components/Image';
import { NavigationLink } from 'src/Components/Navigation';
import { PS } from 'src/Components/Typography';
import { useAlert, useAuth } from 'src/Hooks';

export const DropDownMenu = ({ className }: { className?: string }) => {
  const { signOut, user } = useAuth();
  const { alert } = useAlert();
  const show: boolean = user !== null;
  return (
    <>
      {show && (
        <ul className={`${className}`}>
          <NavigationLink to='/dashboard'>
            <div className='flex flex-row items-center gap-2'>
              <Image
                width={16}
                height={16}
                src='/static/images/dashboard.svg'
              />
              Dashboard
            </div>
          </NavigationLink>
          <NavigationLink to='/profile'>
            <div className='flex flex-row items-center gap-2'>
              <Image
                width={16}
                height={16}
                src='/static/images/defaultProfilePicture.svg'
              />
              Profile
            </div>
          </NavigationLink>
          <li
            role='button'
            className='cursor-pointer flex flex-row items-center gap-2 list-none'
            onClick={async () => {
              await signOut();
              alert('Session closed.', 'error', 5);
            }}>
            <Image width={16} height={16} src='/static/images/logout.svg' />
            <PS className='text-red-500'>Logout</PS>
          </li>
        </ul>
      )}
    </>
  );
};
