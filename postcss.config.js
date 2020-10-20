module.exports = {
  plugins: {
    tailwindcss: {},
    "postcss-preset-env": {
      stage: 1,
      autoprefixer: {
        flexbox: "no-2009",
      },

      features: {
        "custom-properties": false,
      },
    },
    ...(process.env.PRODUCTION
      ? [
          [
            "@fullhuman/postcss-purgecss",
            {
              content: [
                "./pages/**/*.{js,jsx,ts,tsx}",
                "./components/**/*.{js,jsx,ts,tsx}",
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          ],
        ]
      : []),
  },
};
