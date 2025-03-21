import mongoose from "mongoose";

delete mongoose.connection.models.Category;

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Category = mongoose.model("Category", categorySchema);
