import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const poiApi = {
  find: {
    auth: "jwt",
    description: "Retrieve all POIs",
    notes: "Returns an array of all stored POIs.",
    tags: ["api"],
    handler: async (request, h) => {
      const pois = await db.poiStore.getAllPOIs();
      return h.response(pois).code(200);
    }
  },

  findOne: {
    auth: "jwt",
    description: "Retrieve a single POI by ID",
    notes: "Returns a single POI object if found.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    handler: async function (request, h) {
      console.log("Retrieving POI with ID:", request.params.id);
      const poi = await db.poiStore.getPOIById(request.params.id);
      return poi ? h.response(poi).code(200) : Boom.notFound("POI not found");
    },
  },
  
  create: {
    auth: "jwt",
    description: "Create a new POI",
    notes: "Returns the newly created POI.",
    tags: ["api"],
    validate: {
      payload: Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().optional(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    },
    handler: async (request, h) => {
      console.log("Handling POST /api/pois");
      console.log("Received payload:", request.payload);
      
      const poi = await db.poiStore.addPOI(request.payload);
      console.log("POI Created:", poi);
      return h.response(poi).code(201);
    }
  },

  update: {
    auth: "jwt",
    description: "Update a POI by ID",
    notes: "Modifies an existing POI with new data.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
      payload: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        latitude: Joi.number().optional(),
        longitude: Joi.number().optional(),
      }),
    },
    handler: async (request, h) => {
      console.log("Handling PUT /api/pois/{id}");
      
      const poi = await db.poiStore.getPOIById(request.params.id);
      if (!poi) {
        return Boom.notFound("POI not found");
      }

      await db.poiStore.updatePOI(request.params.id, request.payload);
      console.log("Updated POI:", request.payload);
      return h.response({ success: true }).code(200);
    },
  }, 

  deleteOne: {
    auth: "jwt",
    description: "Delete a POI by ID",
    notes: "Removes a POI from the database.",
    tags: ["api"],
    validate: {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    },
    handler: async (request, h) => {
      await db.poiStore.deletePOI(request.params.id);
      return h.response().code(204);
    }
  },

  deleteAll: {
    auth: "jwt",
    description: "Delete all POIs",
    notes: "Removes all POIs from the database.",
    tags: ["api"],
    handler: async (request, h) => {
      await db.poiStore.deleteAllPOIs();
      return h.response().code(204);
    }
  }
};
