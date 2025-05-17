import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { poiApi } from "./api/poi-api.js";

export const apiRoutes = [
  // **Public Routes (No JWT Required)**
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "POST", path: "/api/users", config: userApi.create },

  // **Protected User Routes (Require JWT)**
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },

  // **Protected Category Routes (Require JWT)**
  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },

  // **Protected POI Routes (Require JWT)**
  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "POST", path: "/api/pois", config: poiApi.create },
  { method: "PUT", path: "/api/pois/{id}", config: poiApi.update },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "POST", path: "/api/pois/{id}/images", config: poiApi.uploadImages },
  { method: "DELETE", path: "/api/pois/{id}/images/{index}", config: poiApi.deleteImage },
];
