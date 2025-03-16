import { Boom } from "@hapi/boom";
import { db } from "../models/db.js";

export const poiApi = {
  find: {
    handler: async (request, h) => {
      const pois = await db.poiStore.getAllPOIs();
      return h.response(pois).code(200);
    }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      console.log("Retrieving POI with ID:", request.params.id); // OPut to the log for debuiggin
      const poi = await db.poiStore.getPOIById(request.params.id);
      if (!poi) {
        return h.response({ error: "POI not found" }).code(404);
      }
      return poi;
    },
  },
  
  create: {
    handler: async (request, h) => {
      console.log("Handling POST /api/pois"); // Debugging
      console.log("Received payload:", request.payload); // Debugging

      const newPOI = {
        name: request.payload.name,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      const poi = await db.poiStore.addPOI(newPOI);
      console.log("POI Created:", poi); // Debugging
      return h.response(poi).code(201);
    }
  },

  update: {
    handler: async (request, h) => {
      console.log("Handling PUT /api/pois/{id}"); // Debugging
  
      const poi = await db.poiStore.getPOIById(request.params.id);
      if (!poi) {
        return h.response({ error: "POI not found" }).code(404);
      }
  
      poi.name = request.payload.name || poi.name;
      poi.description = request.payload.description || poi.description;
      poi.latitude = request.payload.latitude || poi.latitude;
      poi.longitude = request.payload.longitude || poi.longitude;
  
      await db.poiStore.updatePOI(poi);
      console.log("Updated POI:", poi); // Debugging
  
      return h.response(poi).code(200);
    },
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
