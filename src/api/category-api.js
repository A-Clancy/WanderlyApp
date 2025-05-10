import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const categoryApi = {
  find: {
    auth: "jwt",
    description: "Retrieve all categories",
    notes: "Returns a list of all categories stored in the database.",
    tags: ["api"],
    handler: async function (request, h) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return h.response(categories).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error", err);
      }
    },
  },

  findOne: {
    auth: "jwt",
    description: "Retrieve a single category by ID",
    notes: "Returns a category object if found.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        return category ? h.response(category).code(200) : Boom.notFound("No Category with this ID");
      } catch (err) {
        return Boom.serverUnavailable("Database Error", err);
      }
    },
  },

    create: {
      auth: "jwt",
      description: "Create a new category",
      notes: "Adds a new category to the database.",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).required(),
        }),
        failAction: (request, h, err) => {
          console.log("Validation error:", err.message);
          throw err;
        }
      },
      handler: async function (request, h) {
        try {
          console.log("Received category payload:", request.payload);
          const newCategory = await db.categoryStore.addCategory(request.payload);

          if (newCategory) {
            return h.response({ success: true, category: newCategory }).code(200);
          } 
            return Boom.badImplementation("Error creating category");
        } catch (err) {
          console.log("Database error:", err);
          return Boom.serverUnavailable("Database Error");
        }
      }
    }
    ,


  deleteOne: {
    auth: "jwt",
    description: "Delete a category by ID",
    notes: "Removes a category from the database.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this ID");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error", err);
      }
    },
  },

  deleteAll: {
    auth: "jwt",
    description: "Delete all categories",
    notes: "Removes all categories from the database.",
    tags: ["api"],
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error", err);
      }
    },
  },
};