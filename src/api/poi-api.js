import { db } from "../models/db.js";

export const poiApi = {
  find: {
    handler: async (request, h) => {
      const pois = await db.poiStore.getAllPOIs();
      return h.response(pois).code(200);
    }
  },

  create: {
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

  deleteOne: {
    handler: async (request, h) => {
      await db.poiStore.deletePOI(request.params.id);
      return h.response().code(204);
    }
  },

  deleteAll: {
    handler: async (request, h) => {
      await db.poiStore.deleteAllPOIs();
      return h.response().code(204);
    }
  }
};
