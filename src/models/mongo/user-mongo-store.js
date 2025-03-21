import { User } from "./user.js";

export const userMongoStore = {
  async getUserByEmail(email) {
    return User.findOne({ email }).lean();
  },

  async getUserById(id) {
    return User.findById(id).lean();
  },

  async getAllUsers() {
    return User.find().lean();
  },

  async addUser(user) {
    try {
      console.log("ADD USER PAYLOAD:", user);
      const newUser = new User(user);
      await newUser.save();
      console.log("USER CREATED:", newUser);
      return newUser;
    } catch (error) {
      console.error("MONGO ADD USER ERROR:", error.message);
      throw error;
    }
  },
  

  async deleteUser(id) {
    await User.findByIdAndDelete(id);
  },

  async deleteAllUsers() {
    await User.deleteMany({});
  }
};
