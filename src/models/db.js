import mongoose from "mongoose";
import dotenv from "dotenv";

// JSON Store (Fallback)
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";

dotenv.config();
mongoose.set("strictQuery", false);

export const db = {
  userStore: null,
  categoryStore: null,
  poiStore: null,

  async init() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected to:", process.env.MONGO_URL);

      // Import MongoDB stores dynamically
      const { userMongoStore } = await import("./mongo/user-mongo-store.js");
      const { categoryMongoStore } = await import("./mongo/category-mongo-store.js");
      const { poiMongoStore } = await import("./mongo/poi-mongo-store.js");

      this.userStore = userMongoStore;
      this.categoryStore = categoryMongoStore;
      this.poiStore = poiMongoStore;

    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1);
    }
  },
};
