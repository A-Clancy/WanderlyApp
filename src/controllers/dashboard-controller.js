import { categoryMemStore } from "../models/mem/category-mem-store.js";

export const dashboardController = {
  async index(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }
    const userId = user.id;
    const categories = await categoryMemStore.getCategoriesByUserId(userId);
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
    const userId = user.id;
    const newCategory = {
      name: request.payload.name,
    };
    await categoryMemStore.addCategory(userId, newCategory);
    return h.redirect("/dashboard");
  },
  

  async deleteCategory(request, h) {
    await categoryMemStore.deleteCategory(request.params.id);
    return h.redirect("/dashboard");
  },
};
