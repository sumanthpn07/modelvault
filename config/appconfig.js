require("dotenv").config();

// config.js
module.exports = {
  app: {
    port: process.env.PORT || 3000,
    appName: process.env.APP_NAME || "modelVault",
    env: process.env.NODE_ENV || "development",
  },
};
