import { db } from "../models/db.js";

export const adminController = {
    async index(request, h) {
        const user = request.auth.credentials;
      
        // Restrict access to the hardcoded admin - password is "admin"
        if (!user || user.email !== "admin@example.com") {
            return h.view("access-denied").code(403);
        }
      
        const users = await db.userStore.getAllUsers();
        const userCount = (await db.userStore.getAllUsers()).length;
        const categoryCount = (await db.categoryStore.getAllCategories()).length;
        const poiCount = (await db.poiStore.getAllPOIs()).length;

    const viewData = {
      title: "Admin Dashboard",
      users,
      userCount,
      categoryCount,
      poiCount,
    };

    return h.view("admin-view", viewData);
  },

  async deleteUser(request, h) {
    const user = request.auth.credentials;
    if(!user || user.email !=="admin@example.com") {
        return h.view("access-denied").code(403);
    }
    
    await db.userStore.deleteUser(request.params.id);
    return h.redirect("/admin");
    },

};
