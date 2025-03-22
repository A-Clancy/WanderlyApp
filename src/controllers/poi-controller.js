import { db } from "../models/db.js";

export const poiController = {
  async index(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }

    const categoryId = request.params.id;
    const category = await db.categoryStore.getCategoryById(categoryId);
    const pois = await db.poiStore.getPOIsByCategoryId(categoryId);

    const viewData = {
      title: "Category Details",
      category: category,
      pois: pois,
    };
    return h.view("category-view", viewData);
  },

  async addPOI(request, h) {
    const categoryId = request.params.id;
    const newPOI = {
      name: request.payload.name,
      description: request.payload.description,
      latitude: Number(request.payload.latitude),
      longitude: Number(request.payload.longitude),
      categoryId: categoryId,
    };
  
    await db.poiStore.addPOI(newPOI);
    return h.redirect(`/category/${categoryId}`);
  },

  async deletePOI(request, h) {
    const categoryId = request.params.id;
    const poiId = request.params.poiid;
    await db.poiStore.deletePOI(poiId);
    return h.redirect(`/category/${categoryId}`);
  },
};
