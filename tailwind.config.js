/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm": "0px"
      },
      fontFamily: {
        "stretch": ["stretch", "cursive"],
        "gotham": ["gotham", "cursive"],
        "gotham-bold": ["gotham-bold", "cursive"],
        "gotham-bolder": ["gotham-bolder", "cursive"],
      },
      borderWidth: {
        1: '1px'
      },
      borderRadius: {
        50: '50px'
      },
      keyframes: {
        growShadow: {
          '0%, 100%': {
            boxShadow: "0 0 0 5px rgba(1, 165, 252, 0.5), 0 0 0 10px rgba(1, 165, 252, 0.25), 0 0 0 20px rgba(1, 165, 252, 0.1)"
          },
          '50%': {
            boxShadow: "0 0 0 7px rgba(1, 165, 252, 0.75), 0 0 0 14px rgba(1, 165, 252, 0.4), 0 0 0 21px rgba(1, 165, 252, 0.2);"
          }
        },
        openMenu: {
          '0%': {
            transform: "translateX(-100px)"
          },
          '100%': {
            transform: "translateX(0)"
          }
        }
      },
      animation: {
        growShadow: "growShadow 5s linear infinite",
        openMenu: "openMenu 0.1s ease 1"
      },
      colors: {
        blue: "rgb(1, 165, 252)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}