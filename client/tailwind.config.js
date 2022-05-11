module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        "114px": "114px",
      },
      fontFamily: {
        roboto: ["Roboto", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "blue-1": "#012A4A",
        "blue-2": "#013A63",
        "blue-3": "#01497C",
        "blue-4": "#014F86",
        "blue-5": "#2A6F97",
        "blue-6": "#2C7DA0",
        "blue-7": "#468FAF",
        "blue-8": "#61A5C2",
        "blue-9": "#89C2D9",
        "blue-10": "#A9D6E5",
        "pink-mj": "#ff0099",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
