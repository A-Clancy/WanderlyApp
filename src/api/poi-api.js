import Joi from "joi";
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

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
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        categoryId: Joi.string().required()
      }),
      failAction: (request, h, err) => {
        console.log("POI validation error:", err.message);
        throw err;
      }
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
      const poi = await db.poiStore.getPOIById(request.params.id);
      if (!poi) {
        return Boom.notFound("POI not found");
      }
  
      if (request.payload.name) poi.name = request.payload.name;
      if (request.payload.description) poi.description = request.payload.description;
      if (request.payload.latitude) poi.latitude = request.payload.latitude;
      if (request.payload.longitude) poi.longitude = request.payload.longitude;
  
      await poi.save(); 
      return h.response(poi).code(200); 
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
      await db.poiStore.deletePOIById(request.params.id); 
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
  },

  uploadImages: {
  auth: "jwt",
  description: "Upload an image for a POI and store the Cloudinary URL",
  tags: ["api"],
  validate: {
    params: Joi.object({
      id: Joi.string().required()
    }),
  },
  handler: async function (request, h) {
    try {
      const poi = await db.poiStore.getPOIById(request.params.id);
      const file = request.payload.images;

      if (!poi) {
        return Boom.notFound("POI not found");
      }

      if (file && Object.keys(file).length > 0) {
        const url = await imageStore.uploadImage(file);
        const updatedPoi = {
          ...poi,
          imageUrls: [...(poi.imageUrls || []), url],
        };
        await db.poiStore.updatePOI(poi._id, updatedPoi);
        return h.response({ success: true, url }).code(200);
      }

      return h.response({ success: false, message: "No image uploaded" }).code(400);
    } catch (err) {
      console.log("Image upload error:", err);
      return h.response({ success: false, message: "Error uploading image" }).code(500);
    }
  },
  payload: {
    multipart: true,
    output: "data",
    maxBytes: 2097152,
    parse: true,
  }
}, 
deleteImage: {
  auth: "jwt",
  description: "Delete a single image from a POI",
  tags: ["api"],
  validate: {
    params: Joi.object({
      id: Joi.string().required(),
      index: Joi.number().min(0).required()
    }),
  },
  handler: async function (request, h) {
    const { id, index } = request.params;
    const poi = await db.poiStore.getPOIById(id);

    if (!poi) {
      return Boom.notFound("POI not found");
    }

    if (!poi.imageUrls || index >= poi.imageUrls.length) {
      return Boom.badRequest("Invalid image index");
    }

    const imageToDelete = poi.imageUrls[index];

    try {
      // Remove from Cloudinary
      const publicId = imageToDelete.split("/").pop()?.split(".")[0];
      await imageStore.deleteImage(publicId);

      // Remove from POI
      poi.imageUrls.splice(index, 1);
      await db.poiStore.updatePOI(poi._id, poi);

      return h.response({ success: true }).code(200);
    } catch (err) {
      console.log("Error deleting image:", err);
      return h.response({ success: false, message: "Error deleting image" }).code(500);
    }
  }
}


};
