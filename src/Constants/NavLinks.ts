interface NavLink {
  label: string;
  to: string;
}

export const NavLinks: NavLink[] = [
  { label: 'Home', to: '#' },
  { label: 'Companies', to: '#companies' },
  { label: 'Features', to: '#features' },
  { label: 'Pricing', to: '#pricing' },
];
