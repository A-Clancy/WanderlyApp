import { db } from "../models/db.js";

export const adminController = {
  async index(request, h) {
    const userCount = (await db.userStore.getAllUsers()).length;
    const categoryCount = (await db.categoryStore.getAllCategories()).length;
    const poiCount = (await db.poiStore.getAllPOIs()).length;

    const viewData = {
      title: "Admin Dashboard",
      userCount,
      categoryCount,
      poiCount,
    };

    return h.view("admin-view", viewData);
  },
};
