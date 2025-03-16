import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { Category } from "../../src/models/mongo/category.js";
import { User } from "../../src/models/mongo/user.js";

suite("Category Model Tests", () => {
  let testUser;

  setup(async function () {
    this.timeout(5000);
    await db.init();
    await User.deleteMany({});
    await Category.deleteMany({});

    // Create a test user first (since categories need a userId)
    testUser = await User.create({ email: "user@example.com", password: "password123" });
  });

  test("Create a category", async () => {
    const testCategory = { name: "Landmarks", userId: testUser._id };
    const createdCategory = await Category.create(testCategory);

    assert.isNotNull(createdCategory._id);
    assert.equal(createdCategory.name, "Landmarks");
    assert.equal(createdCategory.userId.toString(), testUser._id.toString());
  });

  test("Retrieve a category", async () => {
    const testCategory = { name: "Parks", userId: testUser._id };
    const createdCategory = await Category.create(testCategory);
    const foundCategory = await Category.findById(createdCategory._id).lean();

    assert.isNotNull(foundCategory);
    assert.equal(foundCategory.name, "Parks");
  });

  test("Delete a category", async () => {
    const testCategory = { name: "Museums", userId: testUser._id };
    const createdCategory = await Category.create(testCategory);
    await Category.deleteOne({ _id: createdCategory._id });

    const deletedCategory = await Category.findById(createdCategory._id);
    assert.isNull(deletedCategory);
  });
});
