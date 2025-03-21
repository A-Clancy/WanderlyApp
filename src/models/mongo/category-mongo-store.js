import { Category } from "./category.js";

export const categoryMongoStore = {
  async getAllCategories() {
    return Category.find().lean();
  },

  async getCategoryById(id) {
    if (id) {
      return Category.findOne({ _id: id }).lean();
    }
    return null;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getUserCategories(userId) {
    return Category.find({ userId }).lean();
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.error("Invalid category ID:", error);
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },

  async getCategoriesByUserId(userId) {
    return Category.find({ userId }).lean();
  }

};
