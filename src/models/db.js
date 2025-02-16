// import { userMemStore } from "./mem/user-mem-store.ts";
// import { categoryMemStore } from "./mem/category-mem-store.ts";
// import { poiMemStore } from "./mem/poi-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { poiJsonStore } from "./json/poi-json-store.js";



export const db = {
  userStore: null,
  categoryStore: null, // Renaming playlists to categories
  poiStore: null, // Renaming tracks to POIs

  init() {
    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore; 
    this.poiStore = poiJsonStore;
  },
};
