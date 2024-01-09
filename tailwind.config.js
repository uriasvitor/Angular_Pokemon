module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/index.html"],
  theme: {
    fontFamily:{
      inter: '"Inter", sans-serif',
      'jockey-one':['Jockey One','sans-serif']
    },
    screens: {
      'smm': '500px',
      'sm': '676px',
      'md': '880px',
      'lg': '1024px',
      'xl': '1380px',
      '2xl': '1440px',
      '2x2': '1900px',
    },
    container: false,
    extend: {},
  },
  plugins: [],
}
