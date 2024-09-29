/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#B9BCDF",
        100: "#9DA1D3",
        200: "#737BBF",
        300: "#5662B3",
        400: "#46529A",
        500: "#39447E",
        600: "#2C3662",
        700: "#202746",
        800: "#13182A",
        900: "#0E1220",
        950: "#070910",
      },
      secondary: {
        DEFAULT: "#2A669F",
        50: "#E4F7F8",
        100: "#CCEEF2",
        200: "#9CD7E5",
        300: "#6CB9D8",
        400: "#3B94CB",
        500: "#2A669F",
        600: "#234B83",
        700: "#1B3366",
        800: "#14204A",
        900: "#0C102E",
      },
      customOrange: {
        DEFAULT: "#FC6735",
        50: "#FFEFEA",
        100: "#FEE0D6",
        200: "#FEC2AE",
        300: "#FDA485",
        400: "#FD855D",
        500: "#FC6735",
        600: "#F54004",
        700: "#BE3203",
        800: "#872302",
        900: "#4F1501",
        950: "#340E01",
      },
      customVogue: {
        DEFAULT: "#023047",
        50: "#09A8F8",
        100: "#069BE6",
        200: "#0580BE",
        300: "#046696",
        400: "#034B6F",
        500: "#023047",
        600: "#000B10",
        700: "#000000",
        800: "#000000",
        900: "#000000",
        950: "#000000",
      },
      customYellow: {
        DEFAULT: "#FFB703",
        50: "#FFEBBB",
        100: "#FFE6A6",
        200: "#FFDA7D",
        300: "#FFCE55",
        400: "#FFC32C",
        500: "#FFB703",
        600: "#CA9000",
        700: "#926800",
        800: "#5A4000",
        900: "#221800",
        950: "#060400",
      },
      customGreen: {
        DEFAULT: "#A2CA71",
        50: "#FAFCF7",
        100: "#F0F6E8",
        200: "#DCEBCA",
        300: "#C9E0AC",
        400: "#B5D58F",
        500: "#A2CA71",
        600: "#87BB48",
        700: "#6A9437",
        800: "#4D6B28",
        900: "#2F4219",
        950: "#212E11",
      },
      darken: "rgba(0,0,0,0.7)",
      fadedarken: "rgba(0,0,0,0.6)",
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Varela: ["Varela Round", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Rubik: ["Rubik", "sans-serif"],
      TitilliumWeb: ["Titillium Web", "sans-serif"],
    },

    extend: {
      boxShadow: {
        "3xl": "-1px 34px 47px -29px rgb(32 32 32 / 100%)",
        "4xl": " 0vw 0vw 0.5vw 0vw rgb(32 32 32 / 20%)",
        "5xl": " 0vw 0.5vw 0.5vw 0vw rgb(32 32 32 / 16%)",
        glass: "1px 5px 12px 1px rgba( 31, 38, 135, 0.37 )",
        "glass-card": "4px 4px 4px 4px rgba( 32, 32, 32, 0.37 )",
        "card-shadow": "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        "dark-shadow": "10px 10px 5px 0px rgba(130,130,130,0.75)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".ShowDesktopOnly": {
          display: "none",
        },
        "@screen md": {
          ".ShowDesktopOnly": {
            display: "block",
          },
        },
        ".ShowOnMobileOnly": {
          display: "block",
        },
        "@screen md": {
          ".ShowOnMobileOnly": {
            display: "none",
          },
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
    function ({ addComponents }) {
      addComponents({
        ".flex-center": {
          "@apply flex justify-center items-center": {},
        },
        ".overlay-content": {
          "@apply absolute h-full w-full top-0 left-0": {},
        },
      });
    },
  ],
});
