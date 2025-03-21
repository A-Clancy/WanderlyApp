import { db } from "../models/db.js";

export const dashboardController = {
  async index(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }
    const userId = user._id;  // Mongo uses _id not id
    const categories = await db.categoryStore.getCategoriesByUserId(userId);
    const viewData = {
      title: "User Categories",
      categories: categories,
    };
    return h.view("dashboard-view", viewData);
  },

  async addCategory(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }
    const userId = user._id;
    const newCategory = {
      name: request.payload.name,
      userid: userId, // Important for querying by user
    };
    await db.categoryStore.addCategory(userId, newCategory);
    return h.redirect("/dashboard");
  },

  async deleteCategory(request, h) {
    await db.categoryStore.deleteCategoryById(request.params.id);
    return h.redirect("/dashboard");
  },
};