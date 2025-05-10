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
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Authorization", "Content-Type"]
      }
    }
  });

  await server.register([
    Cookie,
    jwt,
    Inert,
    Vision,
    { plugin: HapiSwagger, options: swaggerOptions }
  ]);

  server.validator(Joi);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false
    },
    redirectTo: "/",
    validate: accountsController.validate
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("session");

  await db.init("mongo");

  // CORS preflight handler (must come before other routes)
  server.route({
    method: "OPTIONS",
    path: "/{any*}",
    options: { auth: false },
    handler: (request, h) => {
      console.log("OPTIONS route hit");
      return h
        .response()
        .code(204)
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    }
  });

  server.route(webRoutes);
  server.route(apiRoutes);

  // Static assets
  server.route({
    method: "GET",
    path: "/images/{param*}",
    handler: {
      directory: {
        path: "./public/images",
        listing: false
      }
    }
  });

  server.route({
    method: "GET",
    path: "/styles/{param*}",
    handler: {
      directory: {
        path: "./public/styles",
        listing: false
      }
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

// For unit tests
export async function createServer() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Authorization", "Content-Type"]
      }
    }
  });

  await db.init();
  await server.register(jwt);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("jwt");

  // CORS preflight handler for tests too
  server.route({
    method: "OPTIONS",
    path: "/{any*}",
    options: { auth: false },
    handler: (request, h) => h
        .response()
        .code(204)
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  });

  server.route(apiRoutes);

  return server;
}
