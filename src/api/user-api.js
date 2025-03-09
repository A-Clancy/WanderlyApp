import { db } from "../models/db.js";

export const userApi = {
  find: {
    handler: async (request, h) => {
      const users = await db.userStore.getAllUsers();
      return h.response(users).code(200);
    }
  },

  findOne: {
    handler: async (request, h) => {
      const user = await db.userStore.getUserById(request.params.id);
      return user ? h.response(user).code(200) : h.response().code(404);
    }
  },

  create: {
    handler: async (request, h) => {
      const newUser = {
        email: request.payload.email,
        password: request.payload.password,
      };
      const user = await db.userStore.addUser(newUser);
      return h.response(user).code(201);
    }
  },

  deleteOne: {
    handler: async (request, h) => {
      await db.userStore.deleteUser(request.params.id);
      return h.response().code(204);
    }
  },

  deleteAll: {
    handler: async (request, h) => {
      await db.userStore.deleteAllUsers();
      return h.response().code(204);
    }
  }
};
