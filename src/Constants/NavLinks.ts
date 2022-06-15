interface NavLink {
  label: string;
  to: string;
}

export const NavLinks: NavLink[] = [
  { label: 'Home', to: '#' },
  { label: 'About', to: '#features' },
  { label: 'Pricing', to: '#pricing' },
];
