import mongoose from "mongoose";
import { POI } from "./poi.js";

export const poiMongoStore = {
  async getAllPOIs() {
    return POI.find().lean();
  },

  async getPOIById(id) {
    if (id) {
      return POI.findOne({ _id: id }).lean();
    }
    return null;
  },

  async getPOIsByCategoryId(categoryId) {
    return POI.find({ categoryId: new mongoose.Types.ObjectId(categoryId) }).lean();
  },

  async addPOI(poi) {
    console.log("POI PAYLOAD RECEIVED:", poi);
    const newPOI = new POI(poi);
    const poiObj = await newPOI.save();
    return this.getPOIById(poiObj._id);
  },

  async deletePOIById(id) {
    try {
      await POI.deleteOne({ _id: id });
    } catch (error) {
      console.log("Invalid POI ID");
    }
  },

  async deleteAllPOIs() {
    await POI.deleteMany({});
  }
};
