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
          <NavigationLink to='/dashboard'>Dashboard</NavigationLink>
          <NavigationLink to='/profile'>Profile</NavigationLink>
          <div
            onClick={async () => {
              await signOut();
            }}>
            <PS className='text-red-500'>Logout</PS>
          </div>
        </div>
      )}
    </>
  );
};
