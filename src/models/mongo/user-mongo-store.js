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
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  },

  async deleteUser(id) {
    await User.findByIdAndDelete(id);
  },

  async deleteAllUsers() {
    await User.deleteMany({});
  }
};
