interface NavLink {
  label: string;
  to: string;
}

export const NavLinks: NavLink[] = [
  { label: 'Home', to: '#' },
  { label: 'About', to: '#about' },
  { label: 'Pricing', to: '#pricing' },
  { label: 'Contact', to: '#contact' },
];
