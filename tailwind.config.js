module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        open: ['"Open Sans"', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
      colors: {
        primary: '#ff7844',
        secondary: '#5454D4',
        primaryDark: '#9F3919',
        themeBlack: '#19191B',
        themeGray: '#696871',
        themeLightGray: '#f2f2f2',
        'light-blue': 'rgb(248,254,255)',
      },
    },
  },
  plugins: [],
};
