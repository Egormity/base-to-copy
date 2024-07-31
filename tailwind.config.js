/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['Poppins', 'sans-serif'],
        cursive: ['Nothing You Could Do', 'sans-serif'],
      },

      colors: {
        'primary-red': '#ff6240',
        'primary-red-dark': '#5f2e26',
      },

      backgroundColor: {
        'primary-red': '#ff6240',
        'primary-red-dark': '#5f2e26',
      },

      transitionDuration: {
        primary: '400ms',
      },

      screens: {
        // MAX WIDTH
        max100px: { max: '6.25em' },
        max200px: { max: '12.5em' },
        max300px: { max: '18.75em' },
        max400px: { max: '25em' },
        max500px: { max: '31.25em' },
        max600px: { max: '37.5rem' },
        max700px: { max: '43.75rem' },
        max800px: { max: '50em' },
        max900px: { max: '56.25em' },
        max1000px: { max: '62.5em' },
        max1100px: { max: '68.75em' },
        max1200px: { max: '75em' },
        max1300px: { max: '81.25em' },
        max1400px: { max: '87.5em' },
        max1500px: { max: '93.75em' },
        max1600px: { max: '100em' },
        max1700px: { max: '106.25em' },
        max1800px: { max: '112.5em' },
        max1900px: { max: '118.75em' },
        max2000px: { max: '125em' },

        //--- MIN WIDTH ---//
        min100px: '6.25em',
        min200px: '12.5em',
        min300px: '18.75em',
        min400px: '25em',
        min500px: '31.25em',
        min600px: '37.5rem',
        min700px: '43.75rem',
        min800px: '50em',
        min900px: '56.25em',
        min1000px: '62.5em',
        min1100px: '68.75em',
        min1200px: '75em',
        min1300px: '81.25em',
        min1400px: '87.5em',
        min1500px: '93.75em',
        min1600px: '100em',
        min1700px: '106.25em',
        min1800px: '112.5em',
        min1900px: '118.75em',
        min2000px: '125em',
      },
    },
  },
  plugins: [],
};
