// JSON Store (Active)
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";

// Mongoose (Commented Out for Future Use)
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
// mongoose.set("strictQuery", false");

export const db = {
  userStore: null,
  categoryStore: null, // Renaming playlists to categories
  poiStore: null, // Renaming tracks to POIs

  init() {
    // Using JSON Store for Now
    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore;
    this.poiStore = poiJsonStore;

    // Mongoose Setup (Commented Out)
    /*
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      // Import MongoDB stores
      const { userMongoStore } = await import("./mongo/user-mongo-store.js");
      const { categoryMongoStore } = await import("./mongo/category-mongo-store.js");
      const { poiMongoStore } = await import("./mongo/poi-mongo-store.js");

      this.userStore = userMongoStore;
      this.categoryStore = categoryMongoStore;
      this.poiStore = poiMongoStore;
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
    */
  },
};
