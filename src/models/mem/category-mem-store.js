import { v4 } from "uuid";

let categories = []; // Store categories in memory

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async addCategory(userId, category) {
    category._id = v4();
    category.userId = userId; // Each category belongs to a user
    categories.push(category);
    return category;
  },

  async getCategoriesByUserId(userId) {
    return categories.filter((category) => category.userId === userId);
  },

  async getCategoryById(id) {
    return categories.find((category) => category._id === id);
  },

  async deleteCategory(id) {
    const index = categories.findIndex((category) => category._id === id);
    if (index !== -1) categories.splice(index, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },

  async updateCategory(category, updatedCategory) {
    category.name = updatedCategory.name;
  },
};
