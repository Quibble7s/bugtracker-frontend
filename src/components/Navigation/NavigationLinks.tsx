import { NavLinks } from 'src/Constants';
import { NavigationLink } from '.';

export const NavigationLinks = () => {
  return (
    <ul className='flex flex-row items-center justify-center gap-6'>
      {NavLinks.map((link) => (
        <NavigationLink key={link.label + '-key'} to={link.to}>
          {link.label}
        </NavigationLink>
      ))}
    </ul>
  );
};
