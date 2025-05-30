import mongoose from "mongoose";

const poiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    latitude: Number,
    longitude: Number,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    imageUrls: [String]
  },
  { timestamps: true }
);

export const POI = mongoose.model("POI", poiSchema);
