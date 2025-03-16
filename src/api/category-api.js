import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const categoryApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id:", err);
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const category = request.payload;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("Error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id:", err);
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error:", err);
      }
    },
  },
};
