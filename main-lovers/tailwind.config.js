/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'blue-lover': '#5271FF',
        'pink-lover': '#FF66C4',
        'purple-lover': '#BD93F9',
        'black-lover': '#031926',
      },
      spacing: {
        'h-chat': '580px',
        'w-chat': '90%',
        'h-inner-chat': '410px',
        'w-inner-chat': '90%',
        'w-128': '80%',
        'w-p70': '70%',
      },
    },
  },
  plugins: [require("daisyui")],
}
