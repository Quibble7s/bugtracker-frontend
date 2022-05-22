interface Themes {
  monthly: string;
  yearly: string;
}

export const textYearlyTheme: Themes = {
  monthly: 'text-themeBlack',
  yearly: 'text-light-blue',
};
export const textMonthlyTheme: Themes = {
  monthly: 'text-light-blue',
  yearly: 'text-themeBlack',
};
export const yearlyTheme: Themes = {
  monthly: 'bg-transparent',
  yearly: 'bg-secondary',
};
export const monthlyTheme: Themes = {
  monthly: 'bg-secondary',
  yearly: 'bg-transparent',
};
