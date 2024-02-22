/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#f5f3f3",
        headingColor: "#2e2e2e",
        cartNumBg: "#e80013",
        textColor: "#515151",
        cardOverlay: "rgba(256, 256, 256, 0.4)",
        btnOverlay: "rgba(255, 255, 255, 0.8)",
        lightGray: "#9ca0ab",
        containerbg: "rgba(255, 131, 0, 0.04)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
        customOrange: {
          500: "#d28c03",
        },
      },
      display: ["group-hover"],
    },
  },

  plugins: [],
};

// colors: {
//         headingColor: "#2e2e2e",
//         textColor: "#515151",
//         primary: "#f3f3f3",
//         darkOverlay: "rgba(0,0,0,0.2)",
//         lightOverlay: "rgba(255,255,255,0.4)",
//         lighttextGray: "#9ca0ab",
//         card: "rgba(256,256,256,0.8)",
//         cartBg: "#282a2c",
//         cartItem: "#2e3033",
//         cartTotal: "#343739",
//         filterSection: "rgb(244,238,235)",
//       },
