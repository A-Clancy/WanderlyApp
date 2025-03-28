import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import jwt from "hapi-auth-jwt2";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const swaggerOptions = {
  info: {
    title: "Wanderly API",
    version: "2.0",
  },
};

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  await server.register([Cookie, jwt, Inert, Vision, { plugin: HapiSwagger, options: swaggerOptions }]);

  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.auth.default("session");
  
  await db.init("mongo");

  server.route(webRoutes);
  server.route(apiRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);

  server.route({
    method: "GET",
    path: "/images/{param*}",
    handler: {
      directory: {
        path: "./public/images",
        listing: false,
      },
    },
  });

  server.route({
    method: "GET",
    path: "/styles/{param*}",
    handler: {
      directory: {
        path: "./public/styles",
        listing: false,
      },
    },
  });

}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

export async function createServer() {
  const server = Hapi.server({ port: 3000 });

  await db.init();

  await server.register(jwt);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.auth.default("jwt");

  server.route(apiRoutes);

  return server;
}

