import Joi from "joi";
import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { poiApi } from "./api/poi-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },

  { method: "GET", path: "/api/pois", config: poiApi.find },
  { 
    method: "POST", 
    path: "/api/pois", 
    config: {
      handler: poiApi.create.handler,
      description: "Create a new POI",
      notes: "Returns the created POI",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).required(),
          description: Joi.string().optional(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
        }),
        failAction: (request, h, error) => h.response({ error: error.message }).code(400),
      },
    }
  },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },
  { method: "PUT", path: "/api/pois/{id}", config: poiApi.update },
];
