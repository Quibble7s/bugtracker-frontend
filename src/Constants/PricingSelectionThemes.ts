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
  yearly: 'bg-blue-400',
};
export const monthlyTheme: Themes = {
  monthly: 'bg-blue-400',
  yearly: 'bg-transparent',
};
