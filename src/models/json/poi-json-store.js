import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const poiJsonStore = {
  async getAllPOIs() {
    await db.read();
    return db.data.pois;
  },

  async addPOI(categoryId, poi) {
    await db.read();
    poi._id = v4();
    poi.categoryId = categoryId;
    db.data.pois.push(poi);
    await db.write();
    return poi;
  },

  async getPOIsByCategoryId(id) {
    await db.read();
    return db.data.pois.filter((poi) => poi.categoryId === id);
  },

  async getPOIById(id) {
    await db.read();
    return db.data.pois.find((poi) => poi._id === id);
  },

  async deletePOI(id) {
    await db.read();
    const index = db.data.pois.findIndex((poi) => poi._id === id);
    db.data.pois.splice(index, 1);
    await db.write();
  },

  async deleteAllPOIs() {
    db.data.pois = [];
    await db.write();
  },

  async updatePOI(poi, updatedPOI) {
    poi.name = updatedPOI.name;
    poi.description = updatedPOI.description;
    poi.latitude = updatedPOI.latitude;
    poi.longitude = updatedPOI.longitude;
    await db.write();
  },
};
