import { categoryMemStore } from "../models/mem/category-mem-store.js";
import { poiMemStore } from "../models/mem/poi-mem-store.js";

export const categoryController = {
  async index(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }
    const categoryId = request.params.id;
    const category = await categoryMemStore.getCategoryById(categoryId);
    const pois = await poiMemStore.getPOIsByCategoryId(categoryId);
    const viewData = {
      title: "Category Details",
      category: category,
      pois: pois,
    };
    return h.view("category-view", viewData);
  },
  

  async addPOI(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }
    const categoryId = request.params.id;
    const newPOI = {
      name: request.payload.name,
      description: request.payload.description,
      latitude: request.payload.latitude,
      longitude: request.payload.longitude,
    };
    await poiMemStore.addPOI(categoryId, newPOI);
    return h.redirect(`/category/${categoryId}`);
  },

  async deletePOI(request, h) {
    const user = request.auth.credentials;
    if (!user) {
      return h.redirect("/login");
    }
    await poiMemStore.deletePOI(request.params.poiid);
    return h.redirect(`/category/${request.params.id}`);
  },
};
