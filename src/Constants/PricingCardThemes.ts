interface CardTheme {
  background: {
    light: string;
    dark: string;
  };
  title: {
    light: string;
    dark: string;
  };
  text: {
    light: string;
    dark: string;
  };
  button: {
    light: 'light';
    dark: 'dark';
  };
}

export const PricingCardThemes: CardTheme = {
  background: {
    light: 'bg-themeLightGray',
    dark: 'bg-primary lg:scale-[1.1]',
  },
  title: {
    light: 'text-themeGray',
    dark: 'text-light-blue',
  },
  text: {
    light: 'text-themeGray',
    dark: 'text-light-blue',
  },
  button: {
    light: 'light',
    dark: 'dark',
  },
};
