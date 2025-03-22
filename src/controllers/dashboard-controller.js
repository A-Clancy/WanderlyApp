import { db } from "../models/db.js";

export const dashboardController = {
  async index(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }

    const userId = user._id;
    const categories = await db.categoryStore.getCategoriesByUserId(userId);

    // Add POI counts
    await Promise.all(
      categories.map(async (category) => {
        const pois = await db.poiStore.getPOIsByCategoryId(category._id);
        category.poiCount = pois.length;
      })
    );

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
      userId: userId,
    };

    console.log("ADD CATEGORY ATTEMPT:", newCategory);

    try {
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    } catch (error) {
      console.error("ADD CATEGORY ERROR:", error.message);
      return h.view("dashboard-view", {
        title: "Dashboard Error",
        categories: [],
        error: "Unable to add category.",
      }).code(500);
    }
  },

  async deleteCategory(request, h) {
    await db.categoryStore.deleteCategoryById(request.params.id);
    return h.redirect("/dashboard");
  },
};
