import mongoose from "mongoose";

const poiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    latitude: Number,
    longitude: Number,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }  // adds `createdAt` and `updatedAt`
);


export const POI = mongoose.model("POI", poiSchema);