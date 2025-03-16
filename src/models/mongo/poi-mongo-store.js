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

  async addPOI(poi) {
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
