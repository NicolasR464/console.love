/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'blue-lover': '#5271FF',
        'pink-lover': '#FF66C4',
        'purple-lover': '#BD93F9',
        'black-lover': '#031926',
        'swipeCancel': '#ff4054',
        'swipeLike': '#4debca',
        "background-lover": "#0e172a",
        "btn-pink-lover": "#FF66C4",
      },
      spacing: {
        "h-chat": "580px",
        "w-chat": "90%",
        "h-inner-chat": "410px",
        "w-inner-chat": "90%",
        "w-128": "80%",
        "w-p70": "70%",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#641ae6",

          secondary: "#FF66C4",

          accent: "#1fb2a6",

          neutral: "#2a323c",

          info: "#3abff8",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
