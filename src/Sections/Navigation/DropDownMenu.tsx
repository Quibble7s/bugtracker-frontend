import { Image } from 'src/Components/Image';
import { NavigationLink } from 'src/Components/Navigation';
import { PS } from 'src/Components/Typography';
import { useAuth } from 'src/Hooks';

export const DropDownMenu = ({ className }: { className?: string }) => {
  const { signOut, user } = useAuth();
  const show: boolean = user !== null;
  return (
    <>
      {show && (
        <div className={`${className}`}>
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
          <div
            role='button'
            className='cursor-pointer flex flex-row items-center gap-2'
            onClick={async () => {
              await signOut();
            }}>
            <Image width={16} height={16} src='/static/images/logout.svg' />
            <PS className='text-red-500'>Logout</PS>
          </div>
        </div>
      )}
    </>
  );
};
