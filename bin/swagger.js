const config = require("../config/appconfig");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const Interfaces = require("../interfaces");
const outputFile = "./utils/swagger_output.json";
const endpointsFiles = ["./router/index.js"];
const doc = {
  info: {
    title: "modelVault API",
    version: "1.0.0",
    description: "modelVault API with Swagger doc",
    contact: {
      email: "podonolanasumanth@gmail.com",
    },
  },

  host:`localhost:${process.env.PORT || 3000}/api`,
  // basePath: "/api/v1/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "x-access-token",
      in: "header",
    },
  },
  definitions: Interfaces,
};
swaggerAutogen(outputFile, endpointsFiles, doc);
