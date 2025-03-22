import { db } from "../models/db.js";

export const adminController = {
    async index(request, h) {
        const user = request.auth.credentials;
      
        // Restrict access to the hardcoded admin - password is "admin"
        if (!user || user.email !== "admin@example.com") {
            return h.view("access-denied").code(403);
        }
      
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
