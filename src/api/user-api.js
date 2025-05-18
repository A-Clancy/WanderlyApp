import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";
import { UserSpec } from "../models/joi-schemas.js"; // Shared schema for user creation, authentication level 1. 

export const userApi = {
  find: {
    auth: "jwt",
    description: "Retrieve all users",
    notes: "Returns a list of all registered users.",
    tags: ["api"],
    handler: async (request, h) => {
      const users = await db.userStore.getAllUsers();
      return h.response(users).code(200);
    }
  },

  authenticate: {
    auth: false,
    description: "Authenticate user and return JWT",
    notes: "Logs in a user and returns a JSON Web Token (JWT).",
    tags: ["api"],
    validate: {
      payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),
      failAction: (request, h, err) => {
        console.log("Validation error during login:", err.message);
        throw Boom.badRequest("Invalid email or password format");
      }
    },
    handler: async function (request, h) {
      try {
        console.log("Received login request for:", request.payload.email);
        const user = await db.userStore.getUserByEmail(request.payload.email);

        if (!user) {
          console.log("User not found");
          return Boom.unauthorized("User not found");
        }
        if (user.password !== request.payload.password) {
          console.log("Invalid password");
          return Boom.unauthorized("Invalid password");
        }

        const token = createToken(user);
        return h.response({ success: true, token: token }).code(201);
      } catch (err) {
        console.log("Database Error", err);
        return Boom.serverUnavailable("Database Error");
      }
    }
  },

  findOne: {
    auth: "jwt",
    description: "Retrieve a user by ID",
    notes: "Returns user details if found.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    handler: async (request, h) => {
      const user = await db.userStore.getUserById(request.params.id);
      return user ? h.response(user).code(200) : h.response().code(404);
    }
  },

  create: {
    auth: false,
    description: "Register a new user",
    notes: "Creates a new user account.",
    tags: ["api"],
    validate: {
      payload: UserSpec,
      failAction: (request, h, err) => {
        console.log("Validation error during signup:", err.message);
        throw Boom.badRequest("Invalid user data");
      }
    },
    handler: async (request, h) => {
      console.log("Payload received:", request.payload);
      const user = await db.userStore.addUser(request.payload);
      return h.response({ success: true, user }).code(201);
    }
  },

  deleteOne: {
    auth: "jwt",
    description: "Delete a user by ID",
    notes: "Removes a user from the database.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    handler: async (request, h) => {
      await db.userStore.deleteUser(request.params.id);
      return h.response().code(204);
    }
  },

  deleteAll: {
    auth: "jwt",
    description: "Delete all users",
    notes: "Removes all users from the database.",
    tags: ["api"],
    handler: async (request, h) => {
      await db.userStore.deleteAllUsers();
      return h.response().code(204);
    }
  }
};
