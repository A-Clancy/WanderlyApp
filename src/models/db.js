import mongoose from "mongoose";
import dotenv from "dotenv";

import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { poiMemStore } from "./mem/poi-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";

dotenv.config();
mongoose.set("strictQuery", false);

export const db = {
  userStore: null,
  categoryStore: null,
  poiStore: null,

  async init(storeType = "mongo") {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.categoryStore = categoryJsonStore;
        this.poiStore = poiJsonStore;
        break;

        case "mongo":
          try {
            const { connectMongo } = await import("./mongo/connect.js");
            await connectMongo();
        
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
          break;
        

      default:
        this.userStore = userMemStore;
        this.categoryStore = categoryMemStore;
        this.poiStore = poiMemStore;
    }
  },
};
