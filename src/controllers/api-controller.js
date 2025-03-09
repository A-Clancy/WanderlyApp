import { db } from "../models/db.js";

export const apiController = {
  getCategories: {
    handler: async (request, h) => {
      const categories = await db.categoryStore.getAllCategories();
      return h.response(categories).code(200);
    }
  },

  getPOIs: {
    handler: async (request, h) => {
      const pois = await db.poiStore.getAllPOIs();
      return h.response(pois).code(200);
    }
  },

  addPOI: {
    handler: async (request, h) => {
      const newPOI = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      const poi = await db.poiStore.addPOI(newPOI);
      return h.response(poi).code(201);
    }
  },

  deletePOI: {
    handler: async (request, h) => {
      await db.poiStore.deletePOI(request.params.id);
      return h.response().code(204);
    }
  }
};
