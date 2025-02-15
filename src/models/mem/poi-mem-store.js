import { v4 } from "uuid";

let pois = []; // POIs storage #todo update in later version. 

export const poiMemStore = {
  async getAllPOIs() {
    return pois;
  },

  async addPOI(categoryId, poi) {
    poi._id = v4();
    poi.categoryId = categoryId; // Link to category
    pois.push(poi);
    return poi;
  },

  async getPOIsByCategoryId(categoryId) {
    return pois.filter((poi) => poi.categoryId === categoryId);
  },

  async getPOIById(id) {
    return pois.find((poi) => poi._id === id);
  },

  async deletePOI(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    if (index !== -1) pois.splice(index, 1);
  },

  async deleteAllPOIs() {
    pois = [];
  },

  async updatePOI(poi, updatedPOI) {
    poi.name = updatedPOI.name;
    poi.description = updatedPOI.description;
    poi.latitude = updatedPOI.latitude;
    poi.longitude = updatedPOI.longitude;
  },
};
