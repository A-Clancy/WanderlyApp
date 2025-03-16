import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { User } from "../../src/models/mongo/user.js";

suite("User Model Tests", () => {
  setup(async () => {
    await db.init(); // Ensure MongoDB is connected
    await User.deleteMany({}); // Clear existing users before each test
  });

  test("Create a user", async () => {
    const testUser = { email: "test@example.com", password: "password123" };
    const createdUser = await User.create(testUser);

    assert.isNotNull(createdUser._id);
    assert.equal(createdUser.email, "test@example.com");
  });

  test("Retrieve a user", async () => {
    const testUser = { email: "retrieve@example.com", password: "password123" };
    const createdUser = await User.create(testUser);
    const foundUser = await User.findById(createdUser._id).lean();

    assert.isNotNull(foundUser);
    assert.equal(foundUser.email, "retrieve@example.com");
  });

  test("Delete a user", async () => {
    const testUser = { email: "delete@example.com", password: "password123" };
    const createdUser = await User.create(testUser);
    await User.deleteOne({ _id: createdUser._id });

    const deletedUser = await User.findById(createdUser._id);
    assert.isNull(deletedUser);
  });
});
