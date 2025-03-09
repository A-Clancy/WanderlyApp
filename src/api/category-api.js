import { db } from "../models/db.js";

export const categoryApi = {
  find: {
    handler: async (request, h) => {
      const categories = await db.categoryStore.getAllCategories();
      return h.response(categories).code(200);
    }
  },

  create: {
    handler: async (request, h) => {
      const newCategory = {
        name: request.payload.name,
      };
      const category = await db.categoryStore.addCategory(newCategory);
      return h.response(category).code(201);
    }
  },

  deleteOne: {
    handler: async (request, h) => {
      await db.categoryStore.deleteCategory(request.params.id);
      return h.response().code(204);
    }
  },

  deleteAll: {
    handler: async (request, h) => {
      await db.categoryStore.deleteAllCategories();
      return h.response().code(204);
    }
  }
};
