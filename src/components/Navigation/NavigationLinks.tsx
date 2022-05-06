import { NavLinks } from 'src/Constants';
import { NavigationLink } from '.';

export const NavigationLinks = ({ className }: { className?: string }) => {
  return (
    <ul
      className={`flex flex-row items-center justify-center gap-6 ${className}`}>
      {NavLinks.map((link) => (
        <NavigationLink key={link.label + '-key'} to={link.to}>
          {link.label}
        </NavigationLink>
      ))}
    </ul>
  );
};
