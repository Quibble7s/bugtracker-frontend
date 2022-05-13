interface NavLink {
  label: string;
  to: string;
}

export const NavLinks: NavLink[] = [
  { label: 'Home', to: '#' },
  { label: 'Companies', to: '#companies' },
  { label: 'About', to: '#features' },
  { label: 'Pricing', to: '#pricing' },
];
