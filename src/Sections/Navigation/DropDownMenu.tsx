import { Button } from 'src/Components/Buttons';
import { NavigationLink } from 'src/Components/Navigation';
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
          <Button
            onClick={async () => {
              await signOut();
            }}
            className='mt-4'
            theme='error'>
            Logout
          </Button>
        </div>
      )}
    </>
  );
};
