const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  {
    env: {
      // API: "http://localhost:1337",
      PRODUCTION: true,
      APP_NAME: "SNEAKER STORE",
      DOMAIN: "http://localhost:3000",
      API: "",
      FB_APP_ID: "",
      STRIPE_PUBLISHABLE_KEY: "",
      STRIPE_SECRET_KEY: "",
      CAPTCHA_SITE_KEY: "",
    },
    exportPathMap: function () {
      return {
        "/": { page: "/" },
      };
    },
  },
]);
