const withPlugins = require("next-compose-plugins");

// sitemap({
//   baseUrl: "http://localhost:3000",
//   pagesDirectory: __dirname + "\\pages",
//   targetDirectory: "static/",
//   nextConfigPath: __dirname + "\\next.config.js",
// });

module.exports = withPlugins([
  // your other plugins here
  // your config for other plugins or the general next.js here...
  {
    env: {
      PRODUCTION: false,
      APP_NAME: "SNEAKER STORE",
      DOMAIN: "http://localhost:3000",
      API: "http://localhost:1337",
      FB_APP_ID: "583748508881710",
      STRIPE_PUBLISHABLE_KEY: "pk_test_V21yfeKrKtV8xjeePk0xp0eE00UIJ7Pbxa",
      STRIPE_SECRET_KEY: "sk_test_SONNWVV64TB5JsNmusgGpZCp00V9HRM1IJ",
      CAPTCHA_SITE_KEY: "6LceENYZAAAAAGsvVH6nJKB6KGMeDn2gJYWnK8JV",
      MAILGUN_API_KEY: "17874fe2adf82c8016c8714e605de941-us19",
      MAILGUN_MAILLIST_DOMAIN:
        "sneaker-store@sandbox9746b86a432b427d896519841d5ea96a.mailgun.org",
    },
    exportPathMap: function () {
      return {
        "/": { page: "/" },
      };
    },
  },
]);
