import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const wanderlyService = {
  wanderlyUrl: serviceUrl,

  async getAllCategories() {
    const res = await axios.get(`${this.wanderlyUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.wanderlyUrl}/api/categories/${id}`);
    return res.data;
  },
 
  async createCategory(category) {
    const res = await axios.post(`${this.wanderlyUrl}/api/categories`, category);
    return res.data;
  },

  async deleteCategory(id) {
    const res = await axios.delete(`${this.wanderlyUrl}/api/categories/${id}`);
    return res;
  },

  async deleteAllCategories() {
    const res = await axios.delete(`${this.wanderlyUrl}/api/categories`);
    return res;
  },

  async getAllPOIs() {
    const res = await axios.get(`${this.wanderlyUrl}/api/pois`);
    return res.data;
  },

  async createPOI(poi) {
    const res = await axios.post(`${this.wanderlyUrl}/api/pois`, poi);
    return res.data;
  },

  async deletePOI(id) {
    const res = await axios.delete(`${this.wanderlyUrl}/api/pois/${id}`);
    return res;
  },

  async deleteAllPOIs() {
    const res = await axios.delete(`${this.wanderlyUrl}/api/pois`);
    return res;
  }
};
