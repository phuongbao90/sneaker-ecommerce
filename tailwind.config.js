module.exports = {
  theme: {
    extend: {
      screens: {
        xxl: "1920px",
        xs: "375px",
      },
      maxHeight: {
        "90rem": "90rem",
        "25rem": "25rem",
      },
      rotate: {
        "-25": "-25deg",
      },
      borderRadius: {
        xl: "1.5rem",
        xxl: "3rem",
      },
      maxHeight: {
        0: "0",
        auto: "auto",
      },
      boxShadow: {
        neu:
          "inset 0 0 15px rgba(55, 84, 170,0), inset 0 0 20px rgba(255, 255, 255,0), 7px 7px 15px rgba(55, 84, 170,.15), -7px -7px 20px rgba(255, 255, 255,1), inset 0px 0px 4px rgba(255, 255, 255,.2)",
        neuInner:
          "inset 7px 7px 15px rgba(55, 84, 170,.15), inset -7px -7px 20px rgba(255, 255, 255,1), 0px 0px 4px rgba(255, 255, 255,.2);",
        neuFlat: "20px 20px 60px #c8c9cc, -20px -20px 60px #ffffff",
      },
      translate: {
        center: "-50%,-50%",
      },
    },
  },
  variants: {
    display: ["responsive", "hover", "focus"],
    backgroundColor: ["responsive", "hover", "focus", "active", "group-hover"],
    textColor: ["responsive", "hover", "focus", "group-hover"],
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
  },
  // important: true,
  plugins: [],
  purge: [
    "./pages/**/*.js",
    "./components/**/*.js",
    "./plugins/**/*.js",
    "./static/**/*.js",
    "./store/**/*.js",
  ],
};
