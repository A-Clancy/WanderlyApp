import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { POI } from "../../src/models/mongo/poi.js";
import { Category } from "../../src/models/mongo/category.js";
import { User } from "../../src/models/mongo/user.js";

suite("POI Model Tests", () => {
  let testUser;
  let testCategory;

  setup(async function () {
    this.timeout(5000);
    await db.init();
    await User.deleteMany({});
    await Category.deleteMany({});
    await POI.deleteMany({});

    // Create a test user first
    testUser = await User.create({ email: "user@example.com", password: "password123" });

    // Create a test category
    testCategory = await Category.create({ name: "Landmarks", userId: testUser._id });
  });

  test("Create a POI", async () => {
    const testPOI = {
      name: "Eiffel Tower",
      description: "A big old tower in Paris.",
      latitude: 48.8,
      longitude: 2.2,
      categoryId: testCategory._id,
    };
    const createdPOI = await POI.create(testPOI);

    assert.isNotNull(createdPOI._id);
    assert.equal(createdPOI.name, "Eiffel Tower");
    assert.equal(createdPOI.categoryId.toString(), testCategory._id.toString());
  });

  test("Retrieve a POI", async () => {
    const testPOI = {
      name: "Colosseum",
      description: "A historical landmark in Rome.",
      latitude: 41.8,
      longitude: 12.4,
      categoryId: testCategory._id,
    };
    const createdPOI = await POI.create(testPOI);
    const foundPOI = await POI.findById(createdPOI._id).lean();

    assert.isNotNull(foundPOI);
    assert.equal(foundPOI.name, "Colosseum");
  });

  test("Delete a POI", async () => {
    const testPOI = {
      name: "Grand Canyon",
      description: "A natural wonder in the USA.",
      latitude: 36.1,
      longitude: -112.1,
      categoryId: testCategory._id,
    };
    const createdPOI = await POI.create(testPOI);
    await POI.deleteOne({ _id: createdPOI._id });

    const deletedPOI = await POI.findById(createdPOI._id);
    assert.isNull(deletedPOI);
  });
});
